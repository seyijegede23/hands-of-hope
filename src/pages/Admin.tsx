import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Mail, MessageSquare, Lock, LayoutDashboard, Send, LogOut, ArrowLeft, UserPlus, Shield } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Admin = () => {
  const [view, setView] = useState<'login' | 'forgot' | 'reset' | 'dashboard'>('login');
  
  // Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryInput, setRecoveryInput] = useState("");
  
  // Reset State
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  // Dashboard Data
  const [activeTab, setActiveTab] = useState("overview");
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]); // List of admins

  // Add User State
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });

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

      fetchData(); // Login success -> Get Data
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
    setAdmins(data.admins); // Store admins
    setView('dashboard');
    toast.success("Welcome back!");
  };

  // 3. CREATE NEW ADMIN
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/admin/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newUsername: newUser.username,
          newEmail: newUser.email,
          newPassword: newUser.password
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("New Admin Added!");
      setNewUser({ username: "", email: "", password: "" }); // Clear form
      fetchData(); // Refresh list
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ... (Keep your existing password reset functions: requestReset, confirmReset) ...
  const requestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/forgot-password", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: recoveryInput }) 
      });
      if (!res.ok) throw new Error("Account not found");
      toast.success("Code sent to email!");
      setView('reset');
    } catch (err) {
      toast.error("Account not found.");
    }
  };

  const confirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: resetCode, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      toast.success("Password changed! Please login.");
      setView('login');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // --- RENDER LOGIN SCREENS (Same as before) ---
  if (view !== 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-slate-900" />
          </div>

          {view === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
              <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
              <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <Button type="submit" size="lg" className="w-full">Login</Button>
              <button type="button" onClick={() => setView('forgot')} className="text-sm text-primary w-full text-center hover:underline">Forgot Password?</button>
            </form>
          )}

          {view === 'forgot' && (
             <form onSubmit={requestReset} className="space-y-4 text-center">
               <h1 className="text-2xl font-bold">Recovery</h1>
               <p className="text-muted-foreground text-sm">Enter Username or Email</p>
               <Input placeholder="Username or Email" value={recoveryInput} onChange={e => setRecoveryInput(e.target.value)} />
               <Button type="submit" size="lg" className="w-full">Send Reset Code</Button>
               <button type="button" onClick={() => setView('login')} className="flex items-center justify-center gap-2 text-sm text-slate-500 w-full hover:text-slate-900"><ArrowLeft className="w-4 h-4" /> Back</button>
             </form>
          )}

          {view === 'reset' && (
            <form onSubmit={confirmReset} className="space-y-4">
              <h1 className="text-2xl font-bold text-center">Set New Password</h1>
              <Input placeholder="6-Digit Code" value={resetCode} onChange={e => setResetCode(e.target.value)} />
              <Input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              <Button type="submit" size="lg" className="w-full">Change Password</Button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // --- DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2"><LayoutDashboard className="text-primary" /> Dashboard</h2>
        <nav className="space-y-2">
          <button onClick={() => setActiveTab('overview')} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all", activeTab === 'overview' ? "bg-primary text-white" : "hover:bg-slate-800")}><LayoutDashboard className="w-5 h-5" /> Overview</button>
          <button onClick={() => setActiveTab('volunteers')} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all", activeTab === 'volunteers' ? "bg-primary text-white" : "hover:bg-slate-800")}><Users className="w-5 h-5" /> Volunteers</button>
          <button onClick={() => setActiveTab('messages')} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all", activeTab === 'messages' ? "bg-primary text-white" : "hover:bg-slate-800")}><Mail className="w-5 h-5" /> Inbox</button>
          
          {/* NEW TEAM TAB */}
          <button onClick={() => setActiveTab('team')} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all", activeTab === 'team' ? "bg-primary text-white" : "hover:bg-slate-800")}><Shield className="w-5 h-5" /> Team</button>
          
          <button onClick={() => setView('login')} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 mt-8"><LogOut className="w-5 h-5" /> Logout</button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
             <h1 className="text-3xl font-bold">Overview</h1>
             <div className="grid grid-cols-4 gap-6">
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

        {/* TEAM MANAGEMENT TAB */}
        {activeTab === 'team' && (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Manage Team</h1>
            
            {/* Create New Admin Form */}
            <div className="bg-white p-6 rounded-2xl shadow border mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><UserPlus className="w-5 h-5" /> Add New Admin</h2>
              <form onSubmit={handleAddAdmin} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input 
                  placeholder="Username" 
                  value={newUser.username} 
                  onChange={e => setNewUser({...newUser, username: e.target.value})}
                  required 
                />
                <Input 
                  placeholder="Email" 
                  type="email"
                  value={newUser.email} 
                  onChange={e => setNewUser({...newUser, email: e.target.value})}
                  required 
                />
                <div className="flex gap-2">
                  <Input 
                    placeholder="Password" 
                    type="password"
                    value={newUser.password} 
                    onChange={e => setNewUser({...newUser, password: e.target.value})}
                    required 
                  />
                  <Button type="submit">Add</Button>
                </div>
              </form>
            </div>

            {/* List Existing Admins */}
            <h2 className="text-lg font-bold mb-4">Current Admins</h2>
            <div className="bg-white rounded-xl shadow border overflow-hidden">
              {admins.map((admin: any) => (
                <div key={admin._id} className="p-4 border-b last:border-0 flex justify-between items-center hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                      {admin.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold">{admin.username}</p>
                      <p className="text-sm text-muted-foreground">{admin.email}</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Active</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VOLUNTEERS TAB */}
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

        {/* MESSAGES TAB */}
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