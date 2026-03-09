import { useState } from "react";
import { MessageSquare, ThumbsUp, Clock, Search } from "lucide-react";

const discussions = [
  { title: "Best practices for React custom hooks?", course: "Advanced React", author: "Alex J.", replies: 12, likes: 24, time: "2h ago", resolved: false },
  { title: "How to handle imbalanced datasets in ML?", course: "Python ML", author: "Priya S.", replies: 8, likes: 15, time: "5h ago", resolved: true },
  { title: "Microservices vs Monolith - when to choose?", course: "Node.js Services", author: "Michael L.", replies: 18, likes: 32, time: "1d ago", resolved: false },
  { title: "Figma auto-layout tips for design systems", course: "UI/UX Design", author: "Emma W.", replies: 6, likes: 11, time: "2d ago", resolved: true },
  { title: "Docker networking explained simply", course: "Docker & K8s", author: "Carlos R.", replies: 14, likes: 28, time: "3d ago", resolved: false },
];

export default function StudentDiscussions() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">Discussions</h1>
        <p className="page-subtitle">Participate in course discussions and Q&A</p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input className="form-input pl-9" placeholder="Search discussions..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn-primary text-xs">New Discussion</button>
      </div>

      <div className="space-y-3">
        {discussions.map((d, i) => (
          <div key={i} className="card-premium p-4 hover-lift animate-fade-in-up cursor-pointer" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-foreground text-sm">{d.title}</h3>
                  {d.resolved && <span className="badge-success text-[10px]">✓ Resolved</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{d.course} · {d.author}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {d.replies} replies</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {d.likes}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {d.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
