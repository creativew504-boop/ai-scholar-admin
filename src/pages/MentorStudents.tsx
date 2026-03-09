import { useState } from "react";
import { Search, MessageSquare, Calendar, TrendingUp } from "lucide-react";

const students = [
  { name: "Alex Johnson", course: "Advanced React", progress: 72, lastActive: "2h ago", avatar: "AJ", email: "alex@example.com", sessions: 12, grade: "A" },
  { name: "Priya Sharma", course: "Python ML", progress: 85, lastActive: "1h ago", avatar: "PS", email: "priya@example.com", sessions: 15, grade: "A+" },
  { name: "Michael Lee", course: "Node.js Services", progress: 60, lastActive: "3h ago", avatar: "ML", email: "michael@example.com", sessions: 8, grade: "B+" },
  { name: "Emma Wilson", course: "UI/UX Design", progress: 45, lastActive: "5h ago", avatar: "EW", email: "emma@example.com", sessions: 6, grade: "A" },
  { name: "Carlos Rodriguez", course: "Advanced React", progress: 92, lastActive: "30m ago", avatar: "CR", email: "carlos@example.com", sessions: 18, grade: "A+" },
  { name: "Sarah Kim", course: "Python ML", progress: 38, lastActive: "1d ago", avatar: "SK", email: "sarah@example.com", sessions: 4, grade: "B" },
];

export default function MentorStudents() {
  const [search, setSearch] = useState("");
  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">My Students</h1>
        <p className="page-subtitle">View and manage your assigned students</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input className="form-input pl-9" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s, i) => (
          <div key={i} className="card-premium p-4 hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold">{s.avatar}</div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{s.name}</h3>
                <p className="text-xs text-muted-foreground">{s.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Course</span><span className="font-medium text-foreground">{s.course}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sessions</span><span className="font-medium text-foreground">{s.sessions}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Grade</span><span className="badge-success">{s.grade}</span></div>
              <div className="flex justify-between items-center"><span className="text-muted-foreground">Progress</span><span className="font-medium text-foreground">{s.progress}%</span></div>
              <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full gradient-primary" style={{ width: `${s.progress}%` }} />
              </div>
              <p className="text-muted-foreground">Last active: {s.lastActive}</p>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 btn-secondary text-xs justify-center py-1.5"><MessageSquare className="w-3 h-3" /> Message</button>
              <button className="flex-1 btn-primary text-xs justify-center py-1.5"><Calendar className="w-3 h-3" /> Session</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
