import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, Users, Calendar, BarChart3,
  CreditCard, Settings, ChevronLeft, ChevronRight, ChevronDown,
  GraduationCap, Bell, HelpCircle, LogOut, PlusCircle, FolderOpen,
  Layers, ListChecks, UserCircle, IdCard, Wallet, Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SubItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  children?: SubItem[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  {
    icon: BookOpen, label: "Courses", path: "/courses",
    children: [
      { icon: PlusCircle, label: "Add Course", path: "/courses/add" },
      { icon: FolderOpen, label: "Categories", path: "/courses/categories" },
      { icon: Layers, label: "Batches", path: "/courses/batches" },
      { icon: ListChecks, label: "All Courses", path: "/courses" },
    ],
  },
  {
    icon: Users, label: "Students", path: "/students",
    children: [
      { icon: UserCircle, label: "Student List", path: "/students" },
      { icon: IdCard, label: "ID Cards", path: "/students/id-cards" },
      { icon: Wallet, label: "Payments", path: "/students/payments" },
    ],
  },
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
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isItemActive = (item: NavItem) =>
    location.pathname === item.path ||
    (item.path !== "/" && location.pathname.startsWith(item.path)) ||
    item.children?.some((c) => location.pathname === c.path);

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
          <div className="animate-fade-in-up overflow-hidden">
            <p className="text-sm font-bold text-foreground leading-tight whitespace-nowrap">AI Scholar</p>
            <p className="text-[10px] text-muted-foreground whitespace-nowrap">Admin Portal</p>
          </div>
        )}
        {isMobile && (
          <button onClick={() => setMobileOpen(false)} className="ml-auto p-1 rounded-lg hover:bg-accent">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Toggle Button (desktop) */}
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

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-thin">
        {(!collapsed || isMobile) && (
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-3">
            Main Menu
          </p>
        )}
        {navItems.map((item, index) => {
          const isActive = isItemActive(item);
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openMenus[item.label] || false;
          const showExpanded = !collapsed || isMobile;

          return (
            <div key={item.path + item.label} style={{ animationDelay: `${index * 50}ms` }}>
              {/* Parent item */}
              {hasChildren && showExpanded ? (
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                    "transition-all duration-200 group relative",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 flex-shrink-0 transition-colors", isActive && "text-primary")} />
                  <span className="whitespace-nowrap flex-1 text-left">{item.label}</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  onClick={() => isMobile && setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                    "transition-all duration-200 group relative",
                    !showExpanded && "justify-center px-2",
                    isActive
                      ? "bg-primary/10 text-primary border-l-4 border-primary rounded-l-none"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 flex-shrink-0 transition-colors", isActive && "text-primary")} />
                  {showExpanded && <span className="whitespace-nowrap">{item.label}</span>}
                  {!showExpanded && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-md
                      opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                      {item.label}
                    </div>
                  )}
                  {isActive && showExpanded && !hasChildren && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </NavLink>
              )}

              {/* Children (collapsible) */}
              {hasChildren && showExpanded && (
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-60 opacity-100 mt-1" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="ml-4 pl-3 border-l-2 border-border space-y-0.5">
                    {item.children!.map((child) => {
                      const childActive = location.pathname === child.path;
                      return (
                        <NavLink
                          key={child.path + child.label}
                          to={child.path}
                          onClick={() => isMobile && setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200",
                            childActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-accent hover:text-foreground"
                          )}
                        >
                          <child.icon className={cn("w-4 h-4 flex-shrink-0", childActive && "text-primary")} />
                          <span>{child.label}</span>
                          {childActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Collapsed tooltip for parent with children */}
              {hasChildren && !showExpanded && (
                <NavLink
                  to={item.path}
                  className={cn(
                    "flex items-center justify-center px-2 py-2.5 rounded-lg text-sm font-medium",
                    "transition-all duration-200 group relative",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
                  <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-md
                    opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {item.label}
                  </div>
                </NavLink>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Items */}
      <div className="py-4 px-3 space-y-1 border-t border-border">
        {bottomItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            onClick={() => isMobile && setMobileOpen(false)}
            className={({ isActive }) => cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
              "transition-all duration-200",
              !collapsed || isMobile ? "" : "justify-center px-2",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {(!collapsed || isMobile) && <span>{item.label}</span>}
          </NavLink>
        ))}
        <button
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
            "text-destructive hover:bg-destructive/10 transition-all duration-200",
            !collapsed || isMobile ? "" : "justify-center px-2"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {(!collapsed || isMobile) && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  // Mobile: overlay sidebar
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

  // Desktop
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
