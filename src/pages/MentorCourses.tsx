import { BookOpen, Users, Clock, Star, TrendingUp } from "lucide-react";

const courses = [
  { title: "Advanced React Patterns", students: 18, lessons: 25, duration: "32h", rating: 4.9, completion: 67, category: "Frontend", thumb: "🔵" },
  { title: "React Performance Workshop", students: 12, lessons: 15, duration: "18h", rating: 4.8, completion: 72, category: "Frontend", thumb: "🔵" },
  { title: "Full Stack Project", students: 10, lessons: 30, duration: "40h", rating: 4.9, completion: 55, category: "Full Stack", thumb: "🟡" },
  { title: "TypeScript Masterclass", students: 8, lessons: 20, duration: "24h", rating: 4.7, completion: 80, category: "Frontend", thumb: "🟢" },
];

export default function MentorCourses() {
  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">My Courses</h1>
        <p className="page-subtitle">Courses you're currently mentoring</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {courses.map((c, i) => (
          <div key={i} className="card-premium overflow-hidden hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="h-28 gradient-primary flex items-center justify-center text-4xl relative">
              {c.thumb}
              <span className="absolute top-2 right-2 badge-primary bg-primary-foreground/20 text-primary-foreground">{c.category}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground">{c.title}</h3>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {c.students} students</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {c.lessons} lessons</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {c.duration}</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-xs"><Star className="w-3 h-3 text-warning fill-warning" /> {c.rating}</span>
                <span className="flex items-center gap-1 text-xs"><TrendingUp className="w-3 h-3 text-success" /> {c.completion}% completion</span>
              </div>
              <div className="mt-3">
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full gradient-primary" style={{ width: `${c.completion}%` }} />
                </div>
              </div>
              <button className="mt-3 w-full btn-secondary text-xs justify-center py-1.5">Manage Course</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
