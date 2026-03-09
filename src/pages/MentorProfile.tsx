import { Mail, Phone, Star, Clock, Users, BookOpen, Award, Calendar } from "lucide-react";

const reviews = [
  { student: "Alex Johnson", text: "Dr. Chen is an incredible mentor. Her explanations are clear and she goes above and beyond.", rating: 5, date: "Mar 5, 2026" },
  { student: "Priya Sharma", text: "Very knowledgeable and patient. Always provides actionable feedback.", rating: 5, date: "Mar 3, 2026" },
  { student: "Carlos Rodriguez", text: "Best mentor I've had. Her React expertise is unmatched.", rating: 5, date: "Feb 28, 2026" },
];

export default function MentorProfile() {
  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">Manage your mentor profile and availability</p>
      </div>

      <div className="card-premium p-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-3xl">SC</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">Dr. Sarah Chen</h2>
            <p className="text-sm text-primary font-medium">Full Stack Development Expert</p>
            <p className="text-sm text-muted-foreground mt-2">Expert in React, Node.js, and distributed systems. PhD in Computer Science from MIT. 8 years of industry experience at Google and Meta.</p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> sarah.chen@example.com</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +1 (555) 987-6543</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Star className="w-4 h-4 text-warning fill-warning" />
              <span className="text-sm font-bold">4.9</span>
              <span className="text-xs text-muted-foreground">(280 reviews)</span>
            </div>
          </div>
          <button className="btn-secondary text-xs py-2">Edit Profile</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Users, label: "Students", value: "48" },
          { icon: BookOpen, label: "Courses", value: "6" },
          { icon: Clock, label: "Sessions", value: "312" },
          { icon: Award, label: "Certificates", value: "180" },
        ].map((s, i) => (
          <div key={i} className="stat-card text-center">
            <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-premium p-5">
          <h3 className="font-bold text-foreground mb-4">Skills & Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "TypeScript", "Python", "System Design", "Docker", "AWS", "GraphQL", "MongoDB", "PostgreSQL"].map(s => (
              <span key={s} className="badge-primary">{s}</span>
            ))}
          </div>
          <h3 className="font-bold text-foreground mt-6 mb-3">Availability</h3>
          <div className="space-y-2 text-sm">
            {["Monday - Friday: 9:00 AM - 5:00 PM EST", "Saturday: 10:00 AM - 2:00 PM EST", "Sunday: Off"].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground"><Calendar className="w-3 h-3" /> {t}</div>
            ))}
          </div>
        </div>

        <div className="card-premium p-5">
          <h3 className="font-bold text-foreground mb-4">Student Reviews</h3>
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{r.student}</span>
                  <span className="text-warning text-xs">{"★".repeat(r.rating)}</span>
                </div>
                <p className="text-xs text-muted-foreground">{r.text}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{r.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
