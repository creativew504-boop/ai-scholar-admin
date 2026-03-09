import { Mail, Phone, MapPin, Calendar, BookOpen, Award, Star, TrendingUp, Clock, CreditCard } from "lucide-react";

const skills = [
  { name: "React", level: 85 }, { name: "TypeScript", level: 78 }, { name: "Python", level: 65 },
  { name: "Node.js", level: 72 }, { name: "CSS/Tailwind", level: 90 }, { name: "System Design", level: 55 },
];

const payments = [
  { course: "Advanced React Patterns", amount: "$149", date: "Jan 5, 2026", status: "Paid" },
  { course: "Python Machine Learning", amount: "$199", date: "Feb 1, 2026", status: "Paid" },
  { course: "Node.js Microservices", amount: "$129", date: "Dec 15, 2025", status: "Paid" },
];

export default function StudentProfile() {
  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">Manage your personal and academic information</p>
      </div>

      {/* Profile Header */}
      <div className="card-premium p-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-2xl">AJ</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">Alex Johnson</h2>
            <p className="text-sm text-primary font-medium">Full Stack Development Program</p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> alex@example.com</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +1 (555) 123-4567</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> San Francisco, CA</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> DOB: May 15, 1998</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Student ID: STU-2024-0847 · Enrolled: Jan 2024</p>
          </div>
          <button className="btn-secondary text-xs py-2">Edit Profile</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Academic Info */}
        <div className="card-premium p-5">
          <h3 className="font-bold text-foreground mb-4">Academic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted text-center">
              <BookOpen className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Enrolled</p>
            </div>
            <div className="p-3 rounded-lg bg-muted text-center">
              <Award className="w-5 h-5 text-success mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">7</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="p-3 rounded-lg bg-muted text-center">
              <Award className="w-5 h-5 text-warning mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">5</p>
              <p className="text-xs text-muted-foreground">Certificates</p>
            </div>
            <div className="p-3 rounded-lg bg-muted text-center">
              <Clock className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">248h</p>
              <p className="text-xs text-muted-foreground">Learning Hours</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="card-premium p-5">
          <h3 className="font-bold text-foreground mb-4">Skill Progress</h3>
          <div className="space-y-3">
            {skills.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-foreground">{s.name}</span>
                  <span className="text-muted-foreground">{s.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full gradient-primary transition-all duration-700" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentor Info */}
        <div className="card-premium p-5">
          <h3 className="font-bold text-foreground mb-4">Assigned Mentor</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold">SC</div>
            <div>
              <p className="font-semibold text-foreground">Dr. Sarah Chen</p>
              <p className="text-xs text-muted-foreground">Full Stack Expert</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-3 h-3 text-warning fill-warning" />
                <span className="text-xs">4.9 · 24 sessions completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="card-premium p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4" /> Payment History</h3>
          <div className="space-y-2">
            {payments.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.course}</p>
                  <p className="text-xs text-muted-foreground">{p.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{p.amount}</p>
                  <span className="badge-success text-[10px]">{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
