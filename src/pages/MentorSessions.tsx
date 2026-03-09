import { useState } from "react";
import { Video, Clock, Calendar, X, CheckCircle, XCircle } from "lucide-react";

const sessions = [
  { student: "Alex Johnson", topic: "React Performance Optimization", date: "Today", time: "2:00 PM", status: "upcoming", avatar: "AJ" },
  { student: "Priya Sharma", topic: "Model Training & Validation", date: "Today", time: "4:30 PM", status: "upcoming", avatar: "PS" },
  { student: "Michael Lee", topic: "API Architecture Review", date: "Tomorrow", time: "10:00 AM", status: "scheduled", avatar: "ML" },
  { student: "Emma Wilson", topic: "Design System Review", date: "Mar 11", time: "3:00 PM", status: "scheduled", avatar: "EW" },
  { student: "Carlos Rodriguez", topic: "Custom Hooks Deep Dive", date: "Mar 12", time: "11:00 AM", status: "scheduled", avatar: "CR" },
];

const pastSessions = [
  { student: "Alex Johnson", topic: "State Management", date: "Mar 5", duration: "55 min", rating: 5 },
  { student: "Priya Sharma", topic: "Data Preprocessing", date: "Mar 4", duration: "48 min", rating: 5 },
  { student: "Carlos Rodriguez", topic: "React Router", date: "Mar 3", duration: "60 min", rating: 4 },
];

export default function MentorSessions() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">Mentor Sessions</h1>
        <p className="page-subtitle">Manage your 1-on-1 mentoring sessions</p>
      </div>

      <div className="flex gap-2">
        {(["upcoming", "past"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${tab === t ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {t} Sessions
          </button>
        ))}
      </div>

      {tab === "upcoming" ? (
        <div className="space-y-3">
          {sessions.map((s, i) => (
            <div key={i} className="card-premium p-4 hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">{s.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{s.topic}</h3>
                    <p className="text-xs text-muted-foreground">{s.student}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {s.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {s.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={s.status === "upcoming" ? "badge-warning" : "badge-primary"}>{s.status}</span>
                  <button className="btn-primary text-xs py-1.5"><Video className="w-3 h-3" /> Start</button>
                  <button className="btn-secondary text-xs py-1.5"><XCircle className="w-3 h-3" /> Cancel</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-premium overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-border">
              <th className="table-header text-left p-3">Student</th>
              <th className="table-header text-left p-3">Topic</th>
              <th className="table-header text-left p-3">Date</th>
              <th className="table-header text-left p-3">Duration</th>
              <th className="table-header text-left p-3">Rating</th>
            </tr></thead>
            <tbody>
              {pastSessions.map((s, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                  <td className="p-3 text-sm font-medium text-foreground">{s.student}</td>
                  <td className="p-3 text-sm text-muted-foreground">{s.topic}</td>
                  <td className="p-3 text-sm text-muted-foreground">{s.date}</td>
                  <td className="p-3 text-sm text-muted-foreground">{s.duration}</td>
                  <td className="p-3"><span className="text-warning">{"★".repeat(s.rating)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
