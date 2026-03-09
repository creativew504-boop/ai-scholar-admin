import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, Users, Calendar, BarChart3,
  CreditCard, Settings, ChevronLeft, ChevronRight, ChevronDown,
  GraduationCap, Bell, HelpCircle, LogOut, Menu,
  ClipboardList, Video, Award, MessageSquare, Mail,
  TrendingUp, UserCheck, Clock, Star, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  children?: { icon: React.ElementType; label: string; path: string }[];
}

const studentNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/student" },
  { icon: BookOpen, label: "My Courses", path: "/student/courses" },
  { icon: ClipboardList, label: "Assignments", path: "/student/assignments" },
  { icon: Video, label: "Live Classes", path: "/student/live-classes" },
  { icon: UserCheck, label: "Mentors", path: "/student/mentors" },
  { icon: Award, label: "Certificates", path: "/student/certificates" },
  { icon: MessageSquare, label: "Discussions", path: "/student/discussions" },
  { icon: Mail, label: "Messages", path: "/student/messages" },
  { icon: Bell, label: "Notifications", path: "/student/notifications" },
  { icon: Calendar, label: "Calendar", path: "/student/calendar" },
  { icon: TrendingUp, label: "Progress", path: "/student/progress" },
  { icon: CreditCard, label: "Payments", path: "/student/payments" },
  { icon: Users, label: "Profile", path: "/student/profile" },
  { icon: Settings, label: "Settings", path: "/student/settings" },
];

const mentorNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/mentor" },
  { icon: Users, label: "My Students", path: "/mentor/students" },
  { icon: BookOpen, label: "Courses", path: "/mentor/courses" },
  { icon: ClipboardList, label: "Assignments Review", path: "/mentor/assignments" },
  { icon: Clock, label: "Sessions", path: "/mentor/sessions" },
  { icon: Mail, label: "Messages", path: "/mentor/messages" },
  { icon: BarChart3, label: "Analytics", path: "/mentor/analytics" },
  { icon: Calendar, label: "Schedule", path: "/mentor/schedule" },
  { icon: Users, label: "Profile", path: "/mentor/profile" },
  { icon: Settings, label: "Settings", path: "/mentor/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState<"student" | "mentor">("student");
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = role === "student" ? studentNav : mentorNav;

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-3 px-4 py-5 border-b border-border min-h-[72px]",
        collapsed && !isMobile && "justify-center px-2"
      )}>
        <div className="flex-shrink-0 w-9 h-9 rounded-xl gradient-primary flex items-center justify-center animate-pulse-blue">
          <GraduationCap className="w-5 h-5 text-primary-foreground" />
        </div>
        {(!collapsed || isMobile) && (
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-foreground leading-tight whitespace-nowrap">AI Scholar</p>
            <p className="text-[10px] text-muted-foreground whitespace-nowrap">Learning Platform</p>
          </div>
        )}
        {isMobile && (
          <button onClick={() => setMobileOpen(false)} className="ml-auto p-1 rounded-lg hover:bg-accent">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Role Toggle */}
      {(!collapsed || isMobile) && (
        <div className="px-3 pt-4 pb-2">
          <div className="flex rounded-lg bg-muted p-1">
            <button
              onClick={() => setRole("student")}
              className={cn(
                "flex-1 text-xs font-semibold py-1.5 rounded-md transition-all duration-200",
                role === "student"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Student
            </button>
            <button
              onClick={() => setRole("mentor")}
              className={cn(
                "flex-1 text-xs font-semibold py-1.5 rounded-md transition-all duration-200",
                role === "mentor"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Mentor
            </button>
          </div>
        </div>
      )}

      {/* Collapse toggle (desktop) */}
      {!isMobile && (
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
      )}

      {/* Nav */}
      <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {(!collapsed || isMobile) && (
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-3">
            {role === "student" ? "Student Menu" : "Mentor Menu"}
          </p>
        )}
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const showExpanded = !collapsed || isMobile;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => isMobile && setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                !showExpanded && "justify-center px-2",
                isActive
                  ? "bg-primary/10 text-primary border-l-4 border-primary rounded-l-none"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
              {showExpanded && <span className="whitespace-nowrap">{item.label}</span>}
              {!showExpanded && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {item.label}
                </div>
              )}
              {isActive && showExpanded && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="py-3 px-3 border-t border-border">
        <button className={cn(
          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium",
          "text-destructive hover:bg-destructive/10 transition-all duration-200",
          !collapsed || isMobile ? "" : "justify-center px-2"
        )}>
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {(!collapsed || isMobile) && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shadow-card"
        >
          <Menu className="w-5 h-5" />
        </button>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <aside className="relative w-72 h-full bg-card border-r border-border flex flex-col animate-slide-in-left z-50">
              {sidebarContent}
            </aside>
          </div>
        )}
      </>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-300 ease-in-out",
        "bg-card border-r border-border",
        collapsed ? "w-16" : "w-64"
      )}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {sidebarContent}
    </aside>
  );
}
