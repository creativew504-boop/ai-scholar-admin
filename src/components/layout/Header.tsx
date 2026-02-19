import { useState } from "react";
import { Search, Bell, MessageSquare, ChevronDown, User, Settings, LogOut, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header
      className="fixed top-0 right-0 left-0 z-30 h-[72px] bg-card/95 backdrop-blur-md border-b border-border flex items-center px-6 gap-4"
      style={{ boxShadow: "0 1px 0 hsl(var(--border)), 0 4px 6px -1px hsl(var(--primary) / 0.04)" }}
    >
      {/* Spacer for sidebar */}
      <div className="w-64 flex-shrink-0 transition-all duration-300" />

      {/* Search */}
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search courses, students, instructors..."
          className="w-full h-9 pl-9 pr-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDark}
          className="w-9 h-9 rounded-lg border border-border hover:bg-accent flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Messages */}
        <button className="relative w-9 h-9 rounded-lg border border-border hover:bg-accent flex items-center justify-center transition-all duration-200 cursor-pointer">
          <MessageSquare className="w-4 h-4 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
            5
          </span>
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-lg border border-border hover:bg-accent flex items-center justify-center transition-all duration-200 cursor-pointer">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
            3
          </span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-border mx-1" />

        {/* Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setAvatarOpen(!avatarOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-accent transition-all duration-200 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold flex-shrink-0">
              A
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-foreground leading-tight">Admin Chief</p>
              <p className="text-[10px] text-muted-foreground">Super Admin</p>
            </div>
            <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200", avatarOpen && "rotate-180")} />
          </button>

          {avatarOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-xl shadow-lg-card py-1.5 z-50 animate-scale-in"
            >
              <div className="px-4 py-2.5 border-b border-border">
                <p className="text-sm font-semibold">Admin Chief</p>
                <p className="text-xs text-muted-foreground">admin@aischolar.io</p>
              </div>
              {[
                { icon: User, label: "Profile" },
                { icon: Settings, label: "Account Settings" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-accent transition-colors cursor-pointer"
                >
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                  {item.label}
                </button>
              ))}
              <div className="border-t border-border mt-1 pt-1">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors cursor-pointer">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {avatarOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setAvatarOpen(false)} />
      )}
    </header>
  );
}
