import { useState, FormEvent } from "react"; // Added FormEvent here
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, Mail, Lock, LayoutDashboard, Send, LogOut, ArrowLeft, UserPlus, Shield, Copy, Trash2, ShieldAlert, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Defined types to fix the "Property does not exist" errors
type Volunteer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  skills: string;
  availability: string; // This was missing before!
  date: string;
};

const Admin = () => {
  const [view, setView] = useState<'login' | 'forgot' | 'reset' | 'dashboard'>('login');
  
  // Auth
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [recoveryInput, setRecoveryInput] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  // Data - Typed correctly now
  const [activeTab, setActiveTab] = useState("overview");
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);

  // Newsletter
  const [newsSubject, setNewsSubject] = useState("");
  const [newsMessage, setNewsMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // New Admin
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });

  const handleLogout = () => {
    setCurrentUser(""); setCurrentRole(""); setVolunteers([]); setMessages([]);
    setView('login');
  };

  const handleLogin = async (e: FormEvent) => { // Using FormEvent directly
    e.preventDefault();
    try {
      const res = await fetch("https://heartofhopeserver1.vercel.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setCurrentUser(data.username);
      setCurrentRole(data.role);
      setUsername(""); setPassword("");
      fetchData(); 
    } catch (err: any) { toast.error(err.message); }
  };

  const fetchData = async () => {
    const res = await fetch("https://heartofhopeserver1.vercel.app/admin/data", { method: "POST" });
    const data = await res.json();
    setVolunteers(data.volunteers);
    setMessages(data.messages);
    setSubscribers(data.subscribers);
    setAdmins(data.admins);
    setView('dashboard');
  };

  const requestApproval = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const res = await fetch("https://heartofhopeserver1.vercel.app/admin/request-broadcast-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUser, subject: newsSubject }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Approval requested! Ask Super Admin for the code.");
      setShowOtpInput(true);
    } catch (err) { toast.error("Error requesting approval"); }
    finally { setIsSending(false); }
  };

  const sendNewsletter = async () => {
    if (!window.confirm("Send to ALL subscribers?")) return;
    setIsSending(true);
    try {
      const res = await fetch("https://heartofhopeserver1.vercel.app/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUser, subject: newsSubject, message: newsMessage, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      toast.success(`Sent to ${data.count} people!`);
      setNewsSubject(""); setNewsMessage(""); setOtp(""); setShowOtpInput(false);
    } catch (err: any) { toast.error(err.message); }
    finally { setIsSending(false); }
  };

  const handleAddAdmin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://heartofhopeserver1.vercel.app/admin/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUser, newUsername: newUser.username, newEmail: newUser.email, newPassword: newUser.password }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Admin Added");
      setNewUser({ username: "", email: "", password: "" });
      fetchData();
    } catch (err) { toast.error("Error adding admin"); }
  };

  const handleDeleteAdmin = async (id: string) => {
    if(!window.confirm("Delete User?")) return;
    try {
      const res = await fetch("https://heartofhopeserver1.vercel.app/admin/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUser, targetId: id }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("User deleted");
      fetchData();
    } catch (err) { toast.error("Error deleting"); }
  };

  const requestReset = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://heartofhopeserver1.vercel.app/auth/forgot-password", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: recoveryInput }) 
      });
      if (!res.ok) throw new Error("Error");
      toast.success("Code sent!");
      setView('reset'); setRecoveryInput("");
    } catch (err) { toast.error("Account not found"); }
  };

  const confirmReset = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://heartofhopeserver1.vercel.app/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: resetCode, newPassword }),
      });
      if (!res.ok) throw new Error("Error");
      toast.success("Password changed!");
      setView('login'); setResetCode(""); setNewPassword("");
    } catch (err) { toast.error("Invalid code"); }
  };

  if (view !== 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6"><Lock className="w-8 h-8 text-slate-900" /></div>
          {view === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <h1 className="text-2xl font-bold text-center">Admin Login</h1>
              <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
              <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <Button type="submit" size="lg" className="w-full">Login</Button>
              <button type="button" onClick={() => setView('forgot')} className="text-sm text-primary w-full text-center hover:underline">Forgot Password?</button>
            </form>
          )}
          {view === 'forgot' && (
             <form onSubmit={requestReset} className="space-y-4 text-center">
               <h1 className="text-2xl font-bold">Recovery</h1>
               <Input placeholder="Username or Email" value={recoveryInput} onChange={e => setRecoveryInput(e.target.value)} />
               <Button type="submit" size="lg" className="w-full">Send Code</Button>
               <button type="button" onClick={() => setView('login')} className="flex items-center gap-2 justify-center text-sm text-slate-500 w-full"><ArrowLeft className="w-4 h-4"/> Back</button>
             </form>
          )}
          {view === 'reset' && (
            <form onSubmit={confirmReset} className="space-y-4">
              <h1 className="text-2xl font-bold text-center">New Password</h1>
              <Input placeholder="Code" value={resetCode} onChange={e => setResetCode(e.target.value)} />
              <Input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              <Button type="submit" size="lg" className="w-full">Change</Button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block shrink-0">
        <div className="mb-8">
           <h2 className="text-xl font-bold flex items-center gap-2"><LayoutDashboard className="text-primary" /> Dashboard</h2>
           <p className="text-xs text-slate-400 mt-2">User: {currentUser}</p>
           {currentRole === 'superadmin' && <span className="bg-primary text-xs px-2 py-0.5 rounded text-white mt-1 inline-block">Super Admin</span>}
        </div>
        <nav className="space-y-2">
          {['overview', 'volunteers', 'messages', 'newsletter', 'team'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={cn("w-full text-left p-3 rounded capitalize flex items-center gap-3", activeTab === tab ? "bg-primary text-white" : "hover:bg-slate-800")}>
              {tab === 'team' ? <Shield className="w-4 h-4"/> : tab === 'newsletter' ? <Send className="w-4 h-4"/> : <Users className="w-4 h-4"/>} {tab}
            </button>
          ))}
          <button onClick={handleLogout} className="w-full text-left p-3 text-red-400 hover:bg-slate-800 rounded mt-8 flex items-center gap-3"><LogOut className="w-4 h-4"/> Logout</button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-4 gap-6">
             {[
               {label: 'Volunteers', count: volunteers.length}, 
               {label: 'Messages', count: messages.length}, 
               {label: 'Subscribers', count: subscribers.length}, 
               {label: 'Admins', count: admins.length}
             ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow border">
                  <h3 className="text-4xl font-bold">{stat.count}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
             ))}
          </div>
        )}

        {activeTab === 'newsletter' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl border shadow-sm h-fit">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Send className="w-5 h-5 text-primary"/> Broadcast</h2>
              <div className="space-y-4">
                <Input value={newsSubject} onChange={e => setNewsSubject(e.target.value)} placeholder="Subject" />
                <Textarea value={newsMessage} onChange={e => setNewsMessage(e.target.value)} placeholder="Message (HTML supported)" rows={8} />
                
                {currentRole === 'superadmin' ? (
                  <Button onClick={sendNewsletter} disabled={isSending} className="w-full">{isSending ? "Sending..." : "Send Now"}</Button>
                ) : (
                  <div className="space-y-3">
                    {!showOtpInput ? (
                      <Button onClick={requestApproval} disabled={isSending} variant="secondary" className="w-full">{isSending ? "Requesting..." : "Request Approval"}</Button>
                    ) : (
                      <div className="bg-slate-50 p-4 rounded-xl border">
                        <label className="text-sm font-bold block mb-2">Enter Approval Code</label>
                        <div className="flex gap-2">
                          <Input value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456" className="text-center" />
                          <Button onClick={sendNewsletter} disabled={isSending}>{isSending ? "..." : "Confirm"}</Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h2 className="text-xl font-bold mb-4">Subscribers</h2>
              <div className="max-h-[500px] overflow-y-auto">
                {subscribers.map((sub: any) => (
                  <div key={sub._id} className="p-3 border-b flex justify-between group">
                    <span>{sub.email}</span>
                    <button onClick={() => {navigator.clipboard.writeText(sub.email); toast.success("Copied")}} className="opacity-0 group-hover:opacity-100"><Copy className="w-4 h-4"/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="max-w-4xl">
            {currentRole === 'superadmin' ? (
              <div className="bg-white p-6 rounded-2xl shadow border mb-8">
                <h2 className="font-bold mb-4 flex items-center gap-2"><UserPlus className="w-5 h-5"/> Add Admin</h2>
                <form onSubmit={handleAddAdmin} className="grid grid-cols-3 gap-4">
                  <Input placeholder="Username" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} required />
                  <Input placeholder="Email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} required />
                  <div className="flex gap-2">
                    <Input placeholder="Password" type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} required />
                    <Button type="submit">Add</Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl mb-8 flex items-center gap-3"><ShieldAlert className="w-5 h-5"/> Super Admin access required to add/remove users.</div>
            )}
            <div className="bg-white rounded-xl shadow border">
              {admins.map((admin: any) => (
                <div key={admin._id} className="p-4 border-b last:border-0 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold">{admin.username[0]}</div>
                    <div><p className="font-bold">{admin.username} {admin.role === 'superadmin' && <Shield className="w-3 h-3 inline text-primary"/>}</p><p className="text-sm text-muted-foreground">{admin.email}</p></div>
                  </div>
                  {currentRole === 'superadmin' && admin.role !== 'superadmin' && <Button variant="destructive" size="sm" onClick={() => handleDeleteAdmin(admin._id)}><Trash2 className="w-4 h-4"/></Button>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'volunteers' && (
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Volunteers</h1>
            {volunteers.map(v => (
              <div key={v._id} className="bg-white p-4 rounded-xl shadow border">
                <div className="flex justify-between">
                  <span className="font-bold">{v.firstName} {v.lastName}</span>
                  <span className="text-sm text-muted-foreground">{new Date(v.date).toLocaleDateString()}</span>
                </div>
                <div className="text-sm mt-1">{v.email} | {v.phone}</div>
                <div className="text-sm text-muted-foreground mt-2"><strong>Skills:</strong> {v.skills}</div>
                <div className="text-sm text-muted-foreground"><strong>Availability:</strong> {v.availability}</div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Inbox</h1>
            {messages.map(m => (
              <div key={m._id} className="bg-white p-6 rounded-xl shadow border">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold">{m.subject}</h3>
                  <span className="text-sm text-muted-foreground">{new Date(m.date).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">From: {m.firstName} {m.lastName} ({m.email})</p>
                <div className="bg-slate-50 p-4 rounded text-slate-700">{m.message}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
