import { useState } from "react";
import {
  Bell, BookOpen, CreditCard, Award, AlertTriangle, MessageSquare, Settings,
  Check, CheckCheck, Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

type NotifType = "course" | "payment" | "certificate" | "system" | "message";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const typeConfig: Record<NotifType, { icon: React.ElementType; color: string; bg: string }> = {
  course: { icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
  payment: { icon: CreditCard, color: "text-success", bg: "bg-success/10" },
  certificate: { icon: Award, color: "text-warning", bg: "bg-warning/10" },
  system: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
  message: { icon: MessageSquare, color: "text-primary", bg: "bg-primary/10" },
};

const initialNotifications: Notification[] = [
  { id: "1", type: "course", title: "New Lesson Released", message: "React Hooks Deep Dive — Lesson 8 is now available", time: "2 min ago", read: false },
  { id: "2", type: "payment", title: "Payment Received", message: "Alex Johnson paid $499 for Full Stack Bootcamp", time: "15 min ago", read: false },
  { id: "3", type: "certificate", title: "Certificate Issued", message: "Maria Garcia completed Data Science Fundamentals", time: "1 hour ago", read: false },
  { id: "4", type: "system", title: "System Maintenance", message: "Scheduled maintenance on Feb 25, 2024 at 2:00 AM UTC", time: "3 hours ago", read: false },
  { id: "5", type: "message", title: "New Message", message: "James Wilson: 'Can you review my project submission?'", time: "5 hours ago", read: true },
  { id: "6", type: "course", title: "Assignment Deadline", message: "Python ML Assignment due in 24 hours — 12 submissions pending", time: "6 hours ago", read: true },
  { id: "7", type: "payment", title: "Refund Processed", message: "Refund of $349 processed for Emma Davis", time: "1 day ago", read: true },
  { id: "8", type: "certificate", title: "Certificate Achievement", message: "Raj Patel earned 'DevOps Expert' certificate", time: "1 day ago", read: true },
  { id: "9", type: "system", title: "New Feature", message: "AI Code Assistant is now available in the IDE", time: "2 days ago", read: true },
  { id: "10", type: "course", title: "Course Update", message: "TypeScript Masterclass curriculum updated with 3 new modules", time: "3 days ago", read: true },
];

const filterTabs = ["All", "Courses", "Payments", "Certificates", "System", "Messages"];
const filterMap: Record<string, NotifType | null> = {
  All: null, Courses: "course", Payments: "payment", Certificates: "certificate", System: "system", Messages: "message",
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = notifications.filter((n) => {
    const type = filterMap[activeFilter];
    return type ? n.type === type : true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications(notifications.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id: string) => setNotifications(notifications.filter((n) => n.id !== id));

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="page-title">Notifications</h1>
            <p className="page-subtitle">{unreadCount} unread notifications</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={markAllRead} className="btn-secondary text-xs"><CheckCheck className="w-4 h-4" /> Mark All Read</button>
          <button className="btn-secondary text-xs"><Settings className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {filterTabs.map((tab) => {
          const type = filterMap[tab];
          const count = type ? notifications.filter((n) => n.type === type && !n.read).length : unreadCount;
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5",
                activeFilter === tab
                  ? "gradient-primary text-primary-foreground shadow-blue"
                  : "bg-card border border-border text-muted-foreground hover:bg-accent"
              )}
            >
              {tab}
              {count > 0 && (
                <span className={cn(
                  "w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center",
                  activeFilter === tab ? "bg-primary-foreground/20" : "bg-primary/10 text-primary"
                )}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Notifications list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="card-premium p-12 text-center">
            <Bell className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No notifications in this category</p>
          </div>
        )}
        {filtered.map((notif) => {
          const config = typeConfig[notif.type];
          return (
            <div
              key={notif.id}
              className={cn(
                "card-premium p-4 flex items-start gap-3 transition-all duration-200 hover:shadow-lg-card group",
                !notif.read && "border-l-4 border-l-primary"
              )}
            >
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", config.bg)}>
                <config.icon className={cn("w-4 h-4", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className={cn("text-sm font-semibold", notif.read ? "text-muted-foreground" : "text-foreground")}>{notif.title}</h4>
                  {!notif.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{notif.message}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{notif.time}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {!notif.read && (
                  <button onClick={() => markRead(notif.id)} className="p-1.5 rounded-lg hover:bg-accent" title="Mark as read">
                    <Check className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                )}
                <button onClick={() => deleteNotif(notif.id)} className="p-1.5 rounded-lg hover:bg-destructive/10" title="Delete">
                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
