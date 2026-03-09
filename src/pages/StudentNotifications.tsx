import { useState } from "react";
import { Bell, MessageSquare, ClipboardList, BookOpen, Video, Check } from "lucide-react";

const notifications = [
  { title: "New message from Dr. Sarah Chen", desc: "Let's review your React hooks assignment", type: "message", time: "2 min ago", read: false, icon: MessageSquare },
  { title: "Assignment due: ML Model Evaluation", desc: "Due in 6 hours - Python Machine Learning", type: "assignment", time: "1 hour ago", read: false, icon: ClipboardList },
  { title: "Live class starting soon", desc: "System Design Fundamentals at 2:00 PM", type: "class", time: "2 hours ago", read: false, icon: Video },
  { title: "Course update: Advanced React", desc: "New lesson added: React Server Components", type: "course", time: "5 hours ago", read: true, icon: BookOpen },
  { title: "Assignment graded: RESTful API Design", desc: "You scored 92/100 - Great work!", type: "assignment", time: "1 day ago", read: true, icon: ClipboardList },
  { title: "Mentor session reminder", desc: "Session with Dr. Kumar tomorrow at 10 AM", type: "message", time: "1 day ago", read: true, icon: Bell },
];

export default function StudentNotifications() {
  const [items, setItems] = useState(notifications);
  const markAllRead = () => setItems(items.map(n => ({ ...n, read: true })));

  return (
    <div className="space-y-6">
      <div className="parallax-section flex items-center justify-between">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">{items.filter(n => !n.read).length} unread notifications</p>
        </div>
        <button onClick={markAllRead} className="btn-secondary text-xs py-1.5"><Check className="w-3 h-3" /> Mark all read</button>
      </div>

      <div className="space-y-2">
        {items.map((n, i) => (
          <div key={i} className={`card-premium p-4 flex items-start gap-3 transition-all animate-fade-in-up ${!n.read ? "border-l-4 border-primary" : "opacity-70"}`} style={{ animationDelay: `${i * 40}ms` }}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${!n.read ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              <n.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${!n.read ? "text-foreground" : "text-muted-foreground"}`}>{n.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}
