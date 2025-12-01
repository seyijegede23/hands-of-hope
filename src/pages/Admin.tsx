import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, Mail, Lock, LayoutDashboard, Send, LogOut, ArrowLeft, UserPlus, Shield, Copy, Trash2, ShieldAlert, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Admin = () => {
  const [view, setView] = useState<'login' | 'forgot' | 'reset' | 'dashboard'>('login');
  
  // Auth State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [recoveryInput, setRecoveryInput] = useState("");
  
  // Reset State
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  // Dashboard Data
  const [activeTab, setActiveTab] = useState("overview");
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);

  // Newsletter State
  const [newsSubject, setNewsSubject] = useState("");
  const [newsMessage, setNewsMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Add User State
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });

  // --- ACTIONS ---

  const handleLogout = () => {
    // Clear ALL sensitive data
    setVolunteers([]);
    setMessages([]);
    setSubscribers([]);
    setAdmins([]);
    setCurrentUser("");
    setCurrentRole("");
    // Clear Forms
    setUsername("");
    setPassword("");
    // Go to login
    setView('login');
    toast.info("Logged out successfully");
  };

  // 1. HANDLE LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setCurrentUser(data.username);
      setCurrentRole(data.role);
      
      // ✅ CLEAR FORM
      setUsername("");
      setPassword("");
      
      fetchData(); 
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // 2. FETCH DATA
  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/admin/data", { method: "POST" });
    const data = await res.json();
    setVolunteers(data.volunteers);
    setMessages(data.messages);
    setSubscribers(data.subscribers);
    setAdmins(data.admins);
    setView('dashboard');
  };

  // 3. SEND NEWSLETTER
  const sendNewsletter = async () => {
    if (!window.confirm(`Send email to ALL ${subscribers.length} subscribers?`)) return;
    setIsSending(true);
    try {
      const res = await fetch("http://localhost:3000/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          currentUser, 
          adminPassword: password, // Note: In a real app, use a session token, not re-sending password
          subject: newsSubject, 
          message: newsMessage 
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success(`Sent to ${data.count} people!`);
      
      // ✅ CLEAR FORM
      setNewsSubject("");
      setNewsMessage("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSending(false);
    }
  };

  // 4. ADD ADMIN
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/admin/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentUser,
          newUsername: newUser.username,
          newEmail: newUser.email,
          newPassword: newUser.password
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("New Admin Added!");
      
      // ✅ CLEAR FORM
      setNewUser({ username: "", email: "", password: "" });
      
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // 5. DELETE ADMIN
  const handleDeleteAdmin = async (id: string) => {
    if(!window.confirm("Delete this admin?")) return;
    try {
      const res = await fetch("http://localhost:3000/admin/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUser, targetId: id }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("User deleted");
      fetchData();
    } catch (err: any) {
      toast.error("Could not delete user");
    }
  };

  // Password Recovery Logic
  const requestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/forgot-password", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: recoveryInput }) 
      });
      if (!res.ok) throw new Error("Error");
      toast.success("Code sent!");
      setView('reset');
      
      // ✅ CLEAR INPUT
      setRecoveryInput("");
    } catch (err) { toast.error("Account not found"); }
  };

  const confirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: resetCode, newPassword }),
      });
      if (!res.ok) throw new Error("Error");
      toast.success("Password changed!");
      
      // ✅ CLEAR FORMS
      setResetCode("");
      setNewPassword("");
      
      setView('login');
    } catch (err) { toast.error("Invalid code"); }
  };

  // --- LOGIN VIEWS ---
  if (view !== 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-slate-900" />
          </div>
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
               <button type="button" onClick={() => setView('login')} className="flex items-center justify-center gap-2 text-sm text-slate-500 w-full"><ArrowLeft className="w-4 h-4" /> Back</button>
             </form>
          )}
          {view === 'reset' && (
            <form onSubmit={confirmReset} className="space-y-4">
              <h1 className="text-2xl font-bold text-center">New Password</h1>
              <Input placeholder="6-Digit Code" value={resetCode} onChange={e => setResetCode(e.target.value)} />
              <Input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              <Button type="submit" size="lg" className="w-full">Change Password</Button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block shrink-0">
        <div className="mb-8">
           <h2 className="text-xl font-bold flex items-center gap-2"><LayoutDashboard className="text-primary" /> Dashboard</h2>
           <p className="text-xs text-slate-400 mt-2">Logged in as: <span className="text-white font-bold">{currentUser}</span></p>
           {currentRole === 'superadmin' && <span className="bg-primary text-xs px-2 py-0.5 rounded text-white mt-1 inline-block">Super Admin</span>}
        </div>
        <nav className="space-y-2">
          <button onClick={() => setActiveTab('overview')} className={cn("w-full text-left p-3 rounded flex items-center gap-3", activeTab === 'overview' ? "bg-primary text-white" : "hover:bg-slate-800")}><LayoutDashboard className="w-4 h-4"/> Overview</button>
          <button onClick={() => setActiveTab('volunteers')} className={cn("w-full text-left p-3 rounded flex items-center gap-3", activeTab === 'volunteers' ? "bg-primary text-white" : "hover:bg-slate-800")}><Users className="w-4 h-4"/> Volunteers</button>
          <button onClick={() => setActiveTab('messages')} className={cn("w-full text-left p-3 rounded flex items-center gap-3", activeTab === 'messages' ? "bg-primary text-white" : "hover:bg-slate-800")}><Mail className="w-4 h-4"/> Inbox</button>
          <button onClick={() => setActiveTab('newsletter')} className={cn("w-full text-left p-3 rounded flex items-center gap-3", activeTab === 'newsletter' ? "bg-primary text-white" : "hover:bg-slate-800")}><Send className="w-4 h-4"/> Newsletter</button>
          <button onClick={() => setActiveTab('team')} className={cn("w-full text-left p-3 rounded flex items-center gap-3", activeTab === 'team' ? "bg-primary text-white" : "hover:bg-slate-800")}><Shield className="w-4 h-4"/> Team</button>
          
          <button onClick={handleLogout} className="w-full text-left p-3 text-red-400 hover:bg-slate-800 rounded mt-8 flex items-center gap-3"><LogOut className="w-4 h-4"/> Logout</button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
             <h1 className="text-3xl font-bold">Overview</h1>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow border">
                  <h3 className="text-4xl font-bold">{volunteers.length}</h3>
                  <p className="text-muted-foreground">Volunteers</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow border">
                  <h3 className="text-4xl font-bold">{messages.length}</h3>
                  <p className="text-muted-foreground">Messages</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow border">
                  <h3 className="text-4xl font-bold">{subscribers.length}</h3>
                  <p className="text-muted-foreground">Subscribers</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow border border-primary/20 bg-primary/5">
                  <h3 className="text-4xl font-bold text-primary">{admins.length}</h3>
                  <p className="text-muted-foreground">Admins</p>
                </div>
             </div>
          </div>
        )}

        {/* NEWSLETTER & SUBSCRIBERS TAB */}
        {activeTab === 'newsletter' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Send Email */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm h-fit">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Send className="w-5 h-5 text-primary"/> Send Broadcast</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input value={newsSubject} onChange={e => setNewsSubject(e.target.value)} placeholder="Monthly Update..." />
                </div>
                <div>
                  <label className="text-sm font-medium">Message (HTML Allowed)</label>
                  <Textarea value={newsMessage} onChange={e => setNewsMessage(e.target.value)} placeholder="<p>Hello everyone...</p>" rows={10} />
                </div>
                <div className="bg-amber-50 text-amber-800 p-3 rounded text-xs border border-amber-200">
                  ⚠️ Warning: This will email {subscribers.length} people immediately.
                </div>
                <Button onClick={sendNewsletter} disabled={isSending} className="w-full">
                  {isSending ? "Sending..." : "Send Broadcast"}
                </Button>
              </div>
            </div>

            {/* Right: Subscriber List */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-primary"/> Subscriber List</h2>
              <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr>
                      <th className="p-3">Email</th>
                      <th className="p-3">Date Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub: any) => (
                      <tr key={sub._id} className="border-b">
                        <td className="p-3 font-medium flex justify-between group">
                          {sub.email}
                          <button onClick={() => {navigator.clipboard.writeText(sub.email); toast.success("Copied")}} className="opacity-0 group-hover:opacity-100"><Copy className="w-3 h-3 text-muted-foreground"/></button>
                        </td>
                        <td className="p-3 text-slate-500">{new Date(sub.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === 'team' && (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Manage Team</h1>
            {currentRole === 'superadmin' ? (
              <div className="bg-white p-6 rounded-2xl shadow border mb-8">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><UserPlus className="w-5 h-5" /> Add New Admin</h2>
                <form onSubmit={handleAddAdmin} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="Username" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} required />
                  <Input placeholder="Email" type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} required />
                  <div className="flex gap-2">
                    <Input placeholder="Password" type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} required />
                    <Button type="submit">Add</Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl mb-8 flex items-center gap-3">
                <ShieldAlert className="w-5 h-5" /> You are a Regular Admin. Contact a Super Admin to add users.
              </div>
            )}
            <div className="bg-white rounded-xl shadow border overflow-hidden">
              {admins.map((admin: any) => (
                <div key={admin._id} className="p-4 border-b last:border-0 flex justify-between items-center hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">{admin.username.charAt(0).toUpperCase()}</div>
                    <div>
                      <p className="font-bold flex items-center gap-2">{admin.username} {admin.role === 'superadmin' && <Shield className="w-3 h-3 text-primary" />}</p>
                      <p className="text-sm text-muted-foreground">{admin.email}</p>
                    </div>
                  </div>
                  {currentRole === 'superadmin' && admin.role !== 'superadmin' && (
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteAdmin(admin._id)}><Trash2 className="w-4 h-4" /></Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OTHER TABS */}
        {activeTab === 'volunteers' && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Volunteers</h1>
            <div className="bg-white rounded-xl shadow border overflow-hidden">
               {volunteers.map(v => (
                 <div key={v._id} className="p-4 border-b last:border-0 hover:bg-slate-50">
                    <p className="font-bold">{v.firstName} {v.lastName}</p>
                    <p className="text-sm">{v.email} | {v.phone}</p>
                    <p className="text-sm text-muted-foreground mt-1">Skills: {v.skills}</p>
                 </div>
               ))}
            </div>
          </div>
        )}
        {activeTab === 'messages' && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Inbox</h1>
            {messages.map(m => (
              <div key={m._id} className="bg-white p-6 mb-4 rounded-xl shadow border">
                <h3 className="font-bold">{m.subject}</h3>
                <p className="text-sm text-muted-foreground mb-2">From: {m.email}</p>
                <p className="bg-slate-50 p-4 rounded">{m.message}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;