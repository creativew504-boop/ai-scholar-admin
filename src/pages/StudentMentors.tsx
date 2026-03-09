import { useState } from "react";
import { Star, Clock, BookOpen, Calendar, Video, MessageSquare, X, Users } from "lucide-react";

const mentors = [
  { name: "Dr. Sarah Chen", expertise: "Full Stack Development", experience: "8 years", rating: 4.9, courses: 6, sessions: 312, availability: "Mon-Fri", avatar: "SC", bio: "Expert in React, Node.js, and distributed systems. PhD in Computer Science.", skills: ["React", "Node.js", "TypeScript", "System Design"] },
  { name: "Dr. Rajesh Kumar", expertise: "AI & Machine Learning", experience: "12 years", rating: 4.8, courses: 4, sessions: 245, availability: "Tue-Sat", avatar: "RK", bio: "Research scientist specializing in deep learning and NLP.", skills: ["Python", "TensorFlow", "PyTorch", "NLP"] },
  { name: "Maya Johnson", expertise: "UI/UX Design", experience: "6 years", rating: 4.9, courses: 3, sessions: 180, availability: "Mon-Thu", avatar: "MJ", bio: "Lead designer with expertise in design systems and accessibility.", skills: ["Figma", "Design Systems", "CSS", "Accessibility"] },
  { name: "Alex Rivera", expertise: "Backend Engineering", experience: "10 years", rating: 4.7, courses: 5, sessions: 268, availability: "Wed-Sun", avatar: "AR", bio: "Senior architect specializing in microservices and cloud.", skills: ["Go", "Docker", "Kubernetes", "AWS"] },
];

export default function StudentMentors() {
  const [selectedMentor, setSelectedMentor] = useState<typeof mentors[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">Mentors</h1>
        <p className="page-subtitle">Connect with expert mentors for personalized guidance</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mentors.map((m, i) => (
          <div key={i} className="card-premium p-5 hover-lift animate-fade-in-up text-center" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto flex items-center justify-center text-primary-foreground font-bold text-lg">{m.avatar}</div>
            <h3 className="font-semibold text-foreground text-sm mt-3">{m.name}</h3>
            <p className="text-xs text-primary font-medium">{m.expertise}</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Star className="w-3.5 h-3.5 text-warning fill-warning" />
              <span className="text-sm font-bold text-foreground">{m.rating}</span>
            </div>
            <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {m.experience}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {m.sessions}</span>
            </div>
            <div className="mt-4 space-y-2">
              <button onClick={() => setSelectedMentor(m)} className="w-full btn-primary text-xs justify-center py-1.5">View Profile</button>
              <button className="w-full btn-secondary text-xs justify-center py-1.5"><Calendar className="w-3 h-3" /> Book Session</button>
            </div>
          </div>
        ))}
      </div>

      {/* Mentor Profile Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setSelectedMentor(null)} />
          <div className="relative bg-card border border-border rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto animate-scale-in">
            <button onClick={() => setSelectedMentor(null)} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-accent"><X className="w-4 h-4" /></button>
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl gradient-primary mx-auto flex items-center justify-center text-primary-foreground font-bold text-2xl">{selectedMentor.avatar}</div>
              <h2 className="text-lg font-bold text-foreground mt-3">{selectedMentor.name}</h2>
              <p className="text-sm text-primary">{selectedMentor.expertise}</p>
              <div className="flex justify-center gap-1 mt-1"><Star className="w-4 h-4 text-warning fill-warning" /><span className="font-bold">{selectedMentor.rating}</span></div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">{selectedMentor.bio}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedMentor.skills.map(s => <span key={s} className="badge-primary">{s}</span>)}
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center p-3 rounded-lg bg-muted">
                <p className="text-lg font-bold text-foreground">{selectedMentor.experience}</p>
                <p className="text-xs text-muted-foreground">Experience</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted">
                <p className="text-lg font-bold text-foreground">{selectedMentor.courses}</p>
                <p className="text-xs text-muted-foreground">Courses</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted">
                <p className="text-lg font-bold text-foreground">{selectedMentor.sessions}</p>
                <p className="text-xs text-muted-foreground">Sessions</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3"><Clock className="w-3 h-3 inline" /> Available: {selectedMentor.availability}</p>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 btn-primary text-xs justify-center py-2"><Video className="w-3 h-3" /> Book Session</button>
              <button className="flex-1 btn-secondary text-xs justify-center py-2"><MessageSquare className="w-3 h-3" /> Message</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
