import { useState } from "react";
import { ClipboardList, CheckCircle, XCircle, Clock, Star, MessageSquare } from "lucide-react";

const assignments = [
  { student: "Emma Wilson", title: "Design System Components", course: "UI/UX Design", submitted: "2 hours ago", status: "pending", avatar: "EW" },
  { student: "Carlos Rodriguez", title: "Custom React Hooks Library", course: "Advanced React", submitted: "5 hours ago", status: "pending", avatar: "CR" },
  { student: "Priya Sharma", title: "Feature Engineering Pipeline", course: "Python ML", submitted: "1 day ago", status: "pending", avatar: "PS" },
  { student: "Alex Johnson", title: "RESTful API Design", course: "Node.js Services", submitted: "2 days ago", status: "reviewed", marks: 92, feedback: "Excellent error handling!", avatar: "AJ" },
  { student: "Michael Lee", title: "Database Schema Design", course: "Node.js Services", submitted: "3 days ago", status: "reviewed", marks: 88, feedback: "Good structure, improve indexing.", avatar: "ML" },
];

export default function MentorAssignmentsReview() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? assignments : assignments.filter(a => a.status === filter);

  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">Assignment Reviews</h1>
        <p className="page-subtitle">Review and grade student submissions</p>
      </div>

      <div className="flex gap-2">
        {["all", "pending", "reviewed"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {f} ({f === "all" ? assignments.length : assignments.filter(a => a.status === f).length})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((a, i) => (
          <div key={i} className="card-premium p-4 hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">{a.avatar}</div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{a.title}</h3>
                  <p className="text-xs text-muted-foreground">{a.student} · {a.course}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> Submitted {a.submitted}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {a.status === "reviewed" && a.marks !== undefined ? (
                  <>
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 text-warning fill-warning" /><span className="text-sm font-bold text-foreground">{a.marks}/100</span></div>
                    <span className="badge-success"><CheckCircle className="w-3 h-3" /> Reviewed</span>
                  </>
                ) : (
                  <>
                    <span className="badge-warning"><Clock className="w-3 h-3" /> Pending</span>
                    <button className="btn-primary text-xs py-1.5"><CheckCircle className="w-3 h-3" /> Review</button>
                    <button className="btn-secondary text-xs py-1.5"><XCircle className="w-3 h-3" /> Reject</button>
                  </>
                )}
              </div>
            </div>
            {a.status === "reviewed" && a.feedback && (
              <div className="mt-3 p-2 rounded-lg bg-success/5 border border-success/20 flex items-start gap-2">
                <MessageSquare className="w-3 h-3 text-success mt-0.5" />
                <p className="text-xs text-success">{a.feedback}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
