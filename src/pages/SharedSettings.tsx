import { useState } from "react";
import { Settings, Bell, Shield, Palette, Globe, Save } from "lucide-react";

export default function SharedSettings() {
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains("dark"));

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account preferences</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-premium p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Palette className="w-4 h-4 text-primary" /> Appearance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-foreground">Dark Mode</p><p className="text-xs text-muted-foreground">Toggle dark/light theme</p></div>
              <button onClick={toggleDark} className={`w-12 h-6 rounded-full transition-all ${darkMode ? "bg-primary" : "bg-muted"} relative`}>
                <div className={`w-5 h-5 rounded-full bg-primary-foreground absolute top-0.5 transition-all ${darkMode ? "left-6" : "left-0.5"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-foreground">Compact Mode</p><p className="text-xs text-muted-foreground">Reduce spacing and padding</p></div>
              <button className="w-12 h-6 rounded-full bg-muted relative"><div className="w-5 h-5 rounded-full bg-primary-foreground absolute top-0.5 left-0.5" /></button>
            </div>
          </div>
        </div>

        <div className="card-premium p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> Notifications</h3>
          <div className="space-y-4">
            {["Email notifications", "Push notifications", "Session reminders", "Assignment alerts"].map((label, i) => (
              <div key={i} className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{label}</p>
                <button className={`w-12 h-6 rounded-full transition-all ${i < 3 ? "bg-primary" : "bg-muted"} relative`}>
                  <div className={`w-5 h-5 rounded-full bg-primary-foreground absolute top-0.5 transition-all ${i < 3 ? "left-6" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card-premium p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Security</h3>
          <div className="space-y-3">
            <div><label className="text-xs font-medium text-foreground">Current Password</label><input type="password" className="form-input mt-1" placeholder="••••••••" /></div>
            <div><label className="text-xs font-medium text-foreground">New Password</label><input type="password" className="form-input mt-1" placeholder="••••••••" /></div>
            <button className="btn-primary text-xs py-2"><Save className="w-3 h-3" /> Update Password</button>
          </div>
        </div>

        <div className="card-premium p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> Preferences</h3>
          <div className="space-y-3">
            <div><label className="text-xs font-medium text-foreground">Language</label>
              <select className="form-input mt-1"><option>English</option><option>Spanish</option><option>French</option></select>
            </div>
            <div><label className="text-xs font-medium text-foreground">Timezone</label>
              <select className="form-input mt-1"><option>EST (UTC-5)</option><option>PST (UTC-8)</option><option>UTC</option></select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
