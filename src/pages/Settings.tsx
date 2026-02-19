import { useState } from "react";
import {
  Settings as SettingsIcon, Users, CreditCard, BookOpen, Bell, Shield,
  Mail, Zap, Palette, Database, Save, Eye, EyeOff, Check,
  Globe, Smartphone, Upload, Trash2, Download
} from "lucide-react";

const tabs = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "users", label: "Users", icon: Users },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "email", label: "Email / SMTP", icon: Mail },
  { id: "integrations", label: "Integrations", icon: Zap },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "backup", label: "Backup & Logs", icon: Database },
];

type TabId = typeof tabs[number]["id"];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer flex-shrink-0 ${checked ? "bg-primary" : "bg-muted-foreground/30"}`}
    >
      <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-border last:border-0 gap-6">
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {desc && <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>}
      </div>
      <div className="flex-shrink-0 flex items-center">{children}</div>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-premium p-6 mb-5">
      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-primary inline-block" />
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const [toggles, setToggles] = useState({
    maintenanceMode: false,
    studentRegistration: true,
    emailVerification: true,
    twoFactor: false,
    sessionTimeout: true,
    autoBackup: true,
    emailNotify: true,
    smsNotify: false,
    pushNotify: true,
    reviewApproval: true,
    autoEnroll: false,
    certificateGen: true,
    darkMode: false,
    compactMode: false,
  });

  const toggle = (key: keyof typeof toggles) =>
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <>
            <SectionCard title="Platform Identity">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Platform Name</label>
                  <input className="form-input max-w-sm" defaultValue="AI Scholar" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Tagline</label>
                  <input className="form-input max-w-sm" defaultValue="Enterprise LMS for Modern Teams" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Support Email</label>
                  <input className="form-input max-w-sm" defaultValue="support@aischolar.io" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Platform Logo</label>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold">AI</div>
                    <button className="btn-secondary text-xs"><Upload className="w-3.5 h-3.5" /> Upload Logo</button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Timezone</label>
                  <select className="form-input max-w-sm">
                    {["UTC-8 (PST)", "UTC-5 (EST)", "UTC+0 (GMT)", "UTC+5:30 (IST)", "UTC+8 (SGT)"].map(tz => (
                      <option key={tz}>{tz}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="divide-y divide-border mt-4">
                <SettingRow label="Maintenance Mode" desc="Temporarily disable access for all users except admins">
                  <Toggle checked={toggles.maintenanceMode} onChange={() => toggle("maintenanceMode")} />
                </SettingRow>
                <SettingRow label="Student Self-Registration" desc="Allow students to register without admin approval">
                  <Toggle checked={toggles.studentRegistration} onChange={() => toggle("studentRegistration")} />
                </SettingRow>
              </div>
            </SectionCard>
          </>
        );

      case "users":
        return (
          <SectionCard title="User Management">
            <div className="divide-y divide-border">
              <SettingRow label="Email Verification" desc="Require email verification before account activation">
                <Toggle checked={toggles.emailVerification} onChange={() => toggle("emailVerification")} />
              </SettingRow>
              <SettingRow label="Role-Based Access Control" desc="Enable granular permission control per role">
                <Toggle checked={true} onChange={() => {}} />
              </SettingRow>
            </div>
            <div className="mt-5 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Default Role for New Users</p>
              <div className="grid grid-cols-3 gap-3">
                {["Student", "Instructor", "Admin"].map((role) => (
                  <button key={role} className={`py-2.5 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${role === "Student" ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:bg-accent"}`}>
                    {role}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 p-4 bg-muted/40 rounded-xl">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Session Settings</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Session Timeout (minutes)</label>
                  <input type="number" className="form-input max-w-[120px]" defaultValue="30" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Max Login Attempts</label>
                  <input type="number" className="form-input max-w-[120px]" defaultValue="5" />
                </div>
              </div>
            </div>
          </SectionCard>
        );

      case "payments":
        return (
          <>
            <SectionCard title="Payment Gateways">
              {[
                { name: "Stripe", key: "sk_live_•••••••••••••••••••••••••••••••••••••••••", active: true, color: "text-[#635bff]" },
                { name: "Razorpay", key: "rzp_live_•••••••••••••••••", active: false, color: "text-[#3395ff]" },
                { name: "PayPal", key: "AZ••••••••••••••••••••••••••••••••••••••••••••", active: false, color: "text-[#003087]" },
              ].map((gw) => (
                <div key={gw.name} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center bg-card">
                      <CreditCard className={`w-5 h-5 ${gw.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{gw.name}</p>
                      <p className="text-xs font-mono text-muted-foreground">{gw.key}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${gw.active ? "badge-success" : "bg-muted text-muted-foreground"}`}>
                      {gw.active ? "Active" : "Inactive"}
                    </span>
                    <button className="btn-secondary text-xs px-3 py-1.5 cursor-pointer">Configure</button>
                  </div>
                </div>
              ))}
            </SectionCard>
            <SectionCard title="Currency & Tax">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Default Currency</label>
                  <select className="form-input">
                    {["USD ($)", "EUR (€)", "GBP (£)", "INR (₹)", "SGD (S$)"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Tax Rate (%)</label>
                  <input type="number" className="form-input" defaultValue="18" />
                </div>
              </div>
            </SectionCard>
          </>
        );

      case "courses":
        return (
          <SectionCard title="Course Settings">
            <div className="divide-y divide-border">
              <SettingRow label="Review & Approval Required" desc="New courses require admin approval before publishing">
                <Toggle checked={toggles.reviewApproval} onChange={() => toggle("reviewApproval")} />
              </SettingRow>
              <SettingRow label="Auto-Enroll on Payment" desc="Automatically enroll students after successful payment">
                <Toggle checked={toggles.autoEnroll} onChange={() => toggle("autoEnroll")} />
              </SettingRow>
              <SettingRow label="Certificate Generation" desc="Auto-generate completion certificates for students">
                <Toggle checked={toggles.certificateGen} onChange={() => toggle("certificateGen")} />
              </SettingRow>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Max Video Size (MB)</label>
                <input type="number" className="form-input" defaultValue="2048" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Supported Video Formats</label>
                <input className="form-input" defaultValue="mp4, webm, mov" />
              </div>
            </div>
          </SectionCard>
        );

      case "notifications":
        return (
          <SectionCard title="Notification Channels">
            <div className="divide-y divide-border">
              <SettingRow label="Email Notifications" desc="Send transactional and activity emails">
                <Toggle checked={toggles.emailNotify} onChange={() => toggle("emailNotify")} />
              </SettingRow>
              <SettingRow label="SMS Notifications" desc="Send SMS alerts for critical events">
                <Toggle checked={toggles.smsNotify} onChange={() => toggle("smsNotify")} />
              </SettingRow>
              <SettingRow label="Push Notifications" desc="Browser and mobile push notifications">
                <Toggle checked={toggles.pushNotify} onChange={() => toggle("pushNotify")} />
              </SettingRow>
            </div>
            <div className="mt-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Notify on Events</p>
              <div className="grid grid-cols-2 gap-2">
                {["New Enrollment", "Payment Received", "Course Completed", "New Review", "Assignment Submitted", "Exam Scheduled"].map((evt) => (
                  <label key={evt} className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg border border-border hover:bg-accent cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-primary" />
                    <span className="text-xs font-medium text-foreground">{evt}</span>
                  </label>
                ))}
              </div>
            </div>
          </SectionCard>
        );

      case "security":
        return (
          <>
            <SectionCard title="Authentication">
              <div className="divide-y divide-border">
                <SettingRow label="Two-Factor Authentication" desc="Require 2FA for all admin accounts">
                  <Toggle checked={toggles.twoFactor} onChange={() => toggle("twoFactor")} />
                </SettingRow>
                <SettingRow label="Session Timeout" desc="Auto logout after inactivity period">
                  <Toggle checked={toggles.sessionTimeout} onChange={() => toggle("sessionTimeout")} />
                </SettingRow>
              </div>
              {toggles.twoFactor && (
                <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl animate-fade-in-up">
                  <p className="text-sm font-semibold text-foreground mb-2">2FA Configuration</p>
                  <p className="text-xs text-muted-foreground mb-3">Scan this QR code with your authenticator app</p>
                  <div className="w-24 h-24 bg-foreground rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-0.5 p-1">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className={`w-2.5 h-2.5 rounded-sm ${Math.random() > 0.5 ? "bg-background" : "bg-foreground/10"}`} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </SectionCard>
            <SectionCard title="Password Policy">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Minimum Length", value: "8" },
                  { label: "Password Expiry (days)", value: "90" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">{f.label}</label>
                    <input type="number" className="form-input" defaultValue={f.value} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {["Uppercase Required", "Numbers Required", "Special Characters", "No Common Passwords"].map((r) => (
                  <label key={r} className="flex items-center gap-2 py-2">
                    <input type="checkbox" defaultChecked className="accent-primary" />
                    <span className="text-xs text-muted-foreground">{r}</span>
                  </label>
                ))}
              </div>
            </SectionCard>
          </>
        );

      case "email":
        return (
          <SectionCard title="SMTP Configuration">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "SMTP Host", placeholder: "smtp.gmail.com", full: false },
                { label: "SMTP Port", placeholder: "587", full: false },
                { label: "From Name", placeholder: "AI Scholar", full: false },
                { label: "From Email", placeholder: "noreply@aischolar.io", full: false },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">{f.label}</label>
                  <input className="form-input" placeholder={f.placeholder} />
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">SMTP Username</label>
                <input className="form-input max-w-sm" placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">SMTP Password</label>
                <div className="relative max-w-sm">
                  <input
                    type={showKey ? "text" : "password"}
                    className="form-input pr-10"
                    placeholder="••••••••••••"
                  />
                  <button onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Encryption</label>
                <select className="form-input max-w-[160px]">
                  <option>TLS</option><option>SSL</option><option>None</option>
                </select>
              </div>
            </div>
            <button className="btn-secondary mt-4 cursor-pointer">
              <Mail className="w-4 h-4" /> Send Test Email
            </button>
          </SectionCard>
        );

      case "integrations":
        return (
          <SectionCard title="Third-Party Integrations">
            {[
              { name: "Stripe", desc: "Payment processing and subscriptions", icon: CreditCard, connected: true, color: "text-[#635bff]" },
              { name: "Google Analytics", desc: "Website traffic and user behavior analytics", icon: Globe, connected: true, color: "text-[#e37400]" },
              { name: "Zoom", desc: "Video conferencing for live sessions", icon: Smartphone, connected: false, color: "text-[#2d8cff]" },
              { name: "Slack", desc: "Team notifications and alerts", icon: Bell, connected: false, color: "text-[#4a154b]" },
              { name: "AWS S3", desc: "Cloud storage for course media files", icon: Database, connected: true, color: "text-[#ff9900]" },
              { name: "Twilio", desc: "SMS and WhatsApp notifications", icon: Smartphone, connected: false, color: "text-[#f22f46]" },
            ].map((int) => (
              <div key={int.name} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center bg-card">
                    <int.icon className={`w-5 h-5 ${int.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{int.name}</p>
                    <p className="text-xs text-muted-foreground">{int.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${int.connected ? "badge-success" : "bg-muted text-muted-foreground"}`}>
                    {int.connected ? "Connected" : "Not Connected"}
                  </span>
                  <button className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${int.connected ? "border-destructive/50 text-destructive hover:bg-destructive/10" : "border-primary text-primary hover:bg-primary/10"}`}>
                    {int.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              </div>
            ))}
          </SectionCard>
        );

      case "appearance":
        return (
          <>
            <SectionCard title="Theme">
              <div className="divide-y divide-border">
                <SettingRow label="Dark Mode" desc="Switch to dark color scheme">
                  <Toggle checked={toggles.darkMode} onChange={() => { toggle("darkMode"); document.documentElement.classList.toggle("dark"); }} />
                </SettingRow>
                <SettingRow label="Compact Mode" desc="Reduce spacing for information-dense layouts">
                  <Toggle checked={toggles.compactMode} onChange={() => toggle("compactMode")} />
                </SettingRow>
              </div>
              <div className="mt-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Brand Color</p>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { color: "hsl(221,83%,53%)", name: "Blue" },
                    { color: "hsl(142,76%,36%)", name: "Green" },
                    { color: "hsl(280,80%,55%)", name: "Purple" },
                    { color: "hsl(0,84%,60%)", name: "Red" },
                    { color: "hsl(38,92%,50%)", name: "Orange" },
                  ].map((c) => (
                    <button key={c.name} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                      <div
                        className="w-9 h-9 rounded-full border-2 border-transparent group-hover:scale-110 transition-transform"
                        style={{ background: c.color, borderColor: c.name === "Blue" ? c.color : "transparent" }}
                      />
                      <span className="text-[10px] text-muted-foreground">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </SectionCard>
            <SectionCard title="Typography">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Font Family</label>
                <select className="form-input max-w-xs">
                  {["Inter", "Roboto", "Poppins", "DM Sans", "Plus Jakarta Sans"].map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
            </SectionCard>
          </>
        );

      case "backup":
        return (
          <>
            <SectionCard title="Automated Backups">
              <SettingRow label="Auto Backup" desc="Automatically backup database and files daily">
                <Toggle checked={toggles.autoBackup} onChange={() => toggle("autoBackup")} />
              </SettingRow>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Backup Frequency</label>
                  <select className="form-input">
                    <option>Daily</option><option>Weekly</option><option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Retention (days)</label>
                  <input type="number" className="form-input" defaultValue="30" />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button className="btn-primary text-xs cursor-pointer"><Database className="w-4 h-4" /> Backup Now</button>
                <button className="btn-secondary text-xs cursor-pointer"><Download className="w-4 h-4" /> Download Backup</button>
              </div>
            </SectionCard>
            <SectionCard title="System Logs">
              <div className="bg-foreground/95 rounded-xl p-4 font-mono text-xs text-success space-y-1 max-h-48 overflow-y-auto scrollbar-thin">
                {[
                  "[2025-02-19 08:01:14] INFO: Server started on port 3000",
                  "[2025-02-19 08:12:30] INFO: New user registration: sarah@email.com",
                  "[2025-02-19 08:15:44] INFO: Payment processed: TXN-008012 ($199)",
                  "[2025-02-19 08:22:10] WARN: High memory usage detected (82%)",
                  "[2025-02-19 08:31:05] INFO: Course published: ML Fundamentals",
                  "[2025-02-19 08:45:22] INFO: Backup completed successfully",
                  "[2025-02-19 09:00:00] INFO: Scheduled jobs executed",
                  "[2025-02-19 09:12:18] ERROR: Email delivery failed for mason@email.com",
                  "[2025-02-19 09:30:44] INFO: 47 sessions active",
                ].map((log, i) => (
                  <p key={i} className={log.includes("ERROR") ? "text-red-400" : log.includes("WARN") ? "text-yellow-400" : ""}>
                    {log}
                  </p>
                ))}
              </div>
              <button className="btn-secondary text-xs mt-3 cursor-pointer"><Trash2 className="w-4 h-4" /> Clear Logs</button>
            </SectionCard>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Configure your AI Scholar platform</p>
        </div>
        <button onClick={handleSave} className={`btn-primary transition-all ${saved ? "bg-success" : ""} cursor-pointer`}>
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex gap-6 animate-fade-in-up delay-100" style={{ opacity: 0 }}>
        {/* Vertical Tab Sidebar */}
        <div className="w-52 flex-shrink-0">
          <div className="card-premium p-2 space-y-0.5 sticky top-[96px]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabId)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-left ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary border-l-4 border-primary rounded-l-none"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-w-0">
          <div key={activeTab} className="animate-fade-in-up">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
