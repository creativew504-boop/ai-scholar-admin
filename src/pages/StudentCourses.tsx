import { useState } from "react";
import { BookOpen, Play, Clock, Star, Search, Filter } from "lucide-react";

const categories = ["All", "Frontend", "Backend", "AI/ML", "Design", "DevOps"];

const courses = [
  { title: "Advanced React Patterns", instructor: "Sarah Chen", progress: 72, lessons: "18/25", category: "Frontend", duration: "32h", rating: 4.9, thumb: "🔵", enrolled: true },
  { title: "Python Machine Learning", instructor: "Dr. Kumar", progress: 45, lessons: "9/20", category: "AI/ML", duration: "28h", rating: 4.8, thumb: "🟢", enrolled: true },
  { title: "Node.js Microservices", instructor: "Alex Rivera", progress: 90, lessons: "27/30", category: "Backend", duration: "24h", rating: 4.7, thumb: "🟡", enrolled: true },
  { title: "UI/UX Design Systems", instructor: "Maya Johnson", progress: 30, lessons: "6/20", category: "Design", duration: "20h", rating: 4.9, thumb: "🟣", enrolled: true },
  { title: "Docker & Kubernetes", instructor: "James Park", progress: 15, lessons: "3/20", category: "DevOps", duration: "26h", rating: 4.6, thumb: "🔴", enrolled: true },
  { title: "TypeScript Advanced", instructor: "Lisa Wang", progress: 100, lessons: "20/20", category: "Frontend", duration: "18h", rating: 4.8, thumb: "🔵", enrolled: true },
];

export default function StudentCourses() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = courses.filter(c =>
    (activeCategory === "All" || c.category === activeCategory) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">My Courses</h1>
        <p className="page-subtitle">Track your learning progress across all enrolled courses</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input className="form-input pl-9" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCategory === cat ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c, i) => (
          <div key={i} className="card-premium overflow-hidden hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="h-32 gradient-primary flex items-center justify-center text-4xl relative">
              {c.thumb}
              <span className="absolute top-2 right-2 badge-primary bg-primary-foreground/20 text-primary-foreground">{c.category}</span>
              {c.progress === 100 && <span className="absolute top-2 left-2 badge-success">✓ Completed</span>}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground text-sm">{c.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{c.instructor}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {c.duration}</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning fill-warning" /> {c.rating}</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {c.lessons}</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{c.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full gradient-primary transition-all" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
              <button className="mt-3 w-full btn-primary text-xs justify-center py-1.5">
                <Play className="w-3 h-3" /> {c.progress === 100 ? "Review Course" : "Continue"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
