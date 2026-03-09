import { Video, Clock, Users, Calendar, Play, ExternalLink } from "lucide-react";

const liveClasses = [
  { title: "System Design Fundamentals", instructor: "Dr. Sarah Chen", time: "2:00 PM - 3:30 PM", date: "Today", students: 24, status: "live" },
  { title: "Advanced React Patterns Workshop", instructor: "Lisa Wang", time: "4:00 PM - 5:30 PM", date: "Today", students: 18, status: "upcoming" },
  { title: "ML Pipeline Architecture", instructor: "Dr. Rajesh Kumar", time: "10:00 AM - 11:30 AM", date: "Tomorrow", students: 32, status: "upcoming" },
  { title: "API Security Best Practices", instructor: "Alex Rivera", time: "2:00 PM - 3:00 PM", date: "Mar 11", students: 20, status: "upcoming" },
];

const recordings = [
  { title: "React Performance Optimization", instructor: "Dr. Sarah Chen", date: "Mar 5, 2026", duration: "1h 24m", views: 156 },
  { title: "Neural Network Basics", instructor: "Dr. Kumar", date: "Mar 3, 2026", duration: "1h 45m", views: 203 },
  { title: "CSS Grid Mastery", instructor: "Maya Johnson", date: "Mar 1, 2026", duration: "1h 10m", views: 89 },
];

export default function StudentLiveClasses() {
  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">Live Classes</h1>
        <p className="page-subtitle">Join live sessions and watch recordings</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-foreground">Scheduled Classes</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {liveClasses.map((c, i) => (
            <div key={i} className="card-premium p-4 hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Video className="w-5 h-5 text-primary" />
                </div>
                <span className={c.status === "live" ? "badge-destructive animate-pulse" : "badge-primary"}>{c.status === "live" ? "🔴 LIVE" : "Upcoming"}</span>
              </div>
              <h3 className="font-semibold text-foreground text-sm">{c.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{c.instructor}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {c.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {c.time}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {c.students}</span>
              </div>
              <button className={`mt-3 w-full text-xs justify-center py-1.5 ${c.status === "live" ? "btn-primary" : "btn-secondary"}`}>
                {c.status === "live" ? <><Play className="w-3 h-3" /> Join Now</> : "Set Reminder"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-foreground">Recordings</h2>
        <div className="space-y-2">
          {recordings.map((r, i) => (
            <div key={i} className="card-premium p-4 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"><Play className="w-4 h-4 text-primary" /></div>
                <div>
                  <p className="text-sm font-medium text-foreground">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.instructor} · {r.date} · {r.duration}</p>
                </div>
              </div>
              <button className="btn-secondary text-xs py-1.5"><ExternalLink className="w-3 h-3" /> Watch</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
