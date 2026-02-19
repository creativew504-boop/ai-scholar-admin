import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, Users, Calendar, BarChart3,
  CreditCard, Settings, ChevronLeft, ChevronRight,
  GraduationCap, Bell, HelpCircle, LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: Users, label: "Students", path: "/students" },
  { icon: Calendar, label: "Schedule", path: "/schedule" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: CreditCard, label: "Payments", path: "/payments" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const bottomItems = [
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: HelpCircle, label: "Help Center", path: "/help" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-300 ease-in-out",
        "bg-card border-r border-border",
        collapsed ? "w-16" : "w-64"
      )}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-5 border-b border-border min-h-[72px]",
        collapsed && "justify-center px-2"
      )}>
        <div className="flex-shrink-0 w-9 h-9 rounded-xl gradient-primary flex items-center justify-center animate-pulse-blue">
          <GraduationCap className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in-up overflow-hidden">
            <p className="text-sm font-bold text-foreground leading-tight whitespace-nowrap">AI Scholar</p>
            <p className="text-[10px] text-muted-foreground whitespace-nowrap">Admin Portal</p>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "absolute -right-3 top-[76px] z-50 w-6 h-6 rounded-full bg-card border border-border",
          "flex items-center justify-center shadow-card hover:bg-primary hover:text-primary-foreground",
          "transition-all duration-200 cursor-pointer"
        )}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-thin">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-3">
            Main Menu
          </p>
        )}
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                "transition-all duration-200 group relative",
                collapsed && "justify-center px-2",
                isActive
                  ? "bg-primary/10 text-primary border-l-4 border-primary rounded-l-none"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0 transition-colors", isActive && "text-primary")} />
              {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-md
                  opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {item.label}
                </div>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Items */}
      <div className="py-4 px-3 space-y-1 border-t border-border">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
              "text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200",
              collapsed && "justify-center px-2"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
        <button
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
            "text-destructive hover:bg-destructive/10 transition-all duration-200",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
