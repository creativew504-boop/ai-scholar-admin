import { useState } from "react";
import { ClipboardList, Clock, CheckCircle, AlertCircle, Upload, Star } from "lucide-react";

const assignments = [
  { title: "Build Custom React Hooks", course: "Advanced React", due: "Mar 12, 2026", status: "pending", marks: null, feedback: null },
  { title: "ML Model Evaluation Report", course: "Python ML", due: "Mar 10, 2026", status: "submitted", marks: null, feedback: null },
  { title: "RESTful API Design", course: "Node.js Microservices", due: "Mar 8, 2026", status: "graded", marks: "92/100", feedback: "Excellent work on error handling!" },
  { title: "Design System Documentation", course: "UI/UX Design", due: "Mar 15, 2026", status: "pending", marks: null, feedback: null },
  { title: "Microservices Architecture", course: "Node.js Microservices", due: "Mar 5, 2026", status: "graded", marks: "88/100", feedback: "Good structure, improve logging." },
  { title: "Neural Network Implementation", course: "Python ML", due: "Mar 3, 2026", status: "graded", marks: "95/100", feedback: "Outstanding implementation!" },
  { title: "Component Library Setup", course: "Advanced React", due: "Mar 18, 2026", status: "overdue", marks: null, feedback: null },
];

const statusConfig: Record<string, { label: string; class: string; icon: React.ElementType }> = {
  pending: { label: "Pending", class: "badge-warning", icon: Clock },
  submitted: { label: "Submitted", class: "badge-primary", icon: Upload },
  graded: { label: "Graded", class: "badge-success", icon: CheckCircle },
  overdue: { label: "Overdue", class: "badge-destructive", icon: AlertCircle },
};

export default function StudentAssignments() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? assignments : assignments.filter(a => a.status === filter);

  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">Assignments</h1>
        <p className="page-subtitle">Track and submit your course assignments</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all", "pending", "submitted", "graded", "overdue"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {f} ({f === "all" ? assignments.length : assignments.filter(a => a.status === f).length})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((a, i) => {
          const sc = statusConfig[a.status];
          return (
            <div key={i} className="card-premium p-4 hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{a.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.course}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Due: {a.due}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {a.marks && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="text-sm font-bold text-foreground">{a.marks}</span>
                    </div>
                  )}
                  <span className={sc.class}><sc.icon className="w-3 h-3" /> {sc.label}</span>
                  {a.status === "pending" && (
                    <button className="btn-primary text-xs py-1.5 px-3"><Upload className="w-3 h-3" /> Submit</button>
                  )}
                </div>
              </div>
              {a.feedback && (
                <div className="mt-3 p-2 rounded-lg bg-success/5 border border-success/20">
                  <p className="text-xs text-success font-medium">Mentor Feedback: {a.feedback}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
