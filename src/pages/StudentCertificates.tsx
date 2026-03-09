import { Award, Download, Calendar, ExternalLink } from "lucide-react";

const certificates = [
  { course: "JavaScript Mastery", date: "Feb 28, 2026", id: "CERT-JS-2026-0847", grade: "A+", hours: 40 },
  { course: "React Fundamentals", date: "Jan 15, 2026", id: "CERT-RF-2026-0847", grade: "A", hours: 32 },
  { course: "CSS Advanced Layouts", date: "Dec 20, 2025", id: "CERT-CSS-2025-0847", grade: "A+", hours: 24 },
  { course: "Git & GitHub", date: "Nov 10, 2025", id: "CERT-GIT-2025-0847", grade: "A", hours: 16 },
  { course: "HTML5 & Semantics", date: "Oct 5, 2025", id: "CERT-HTML-2025-0847", grade: "A+", hours: 20 },
];

export default function StudentCertificates() {
  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">Certificates</h1>
        <p className="page-subtitle">Your earned certificates and achievements</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((c, i) => (
          <div key={i} className="card-premium overflow-hidden hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="h-36 gradient-primary relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)" }} />
              <div className="relative text-center text-primary-foreground">
                <Award className="w-10 h-10 mx-auto mb-2" />
                <p className="text-xs font-semibold">Certificate of Completion</p>
                <p className="text-lg font-bold">{c.course}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {c.date}</span>
                <span className="badge-success">Grade: {c.grade}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">ID: {c.id} · {c.hours}h completed</p>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 btn-primary text-xs justify-center py-1.5"><Download className="w-3 h-3" /> Download</button>
                <button className="btn-secondary text-xs py-1.5 px-3"><ExternalLink className="w-3 h-3" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
