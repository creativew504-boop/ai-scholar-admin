import { useState } from "react";
import { FolderOpen, ChevronRight, BookOpen, Users, Star, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Web Development", count: 24, icon: "🌐",
    playlists: [
      { title: "React Fundamentals", lessons: 12, students: 340, rating: 4.8 },
      { title: "Node.js Masterclass", lessons: 18, students: 280, rating: 4.6 },
      { title: "TypeScript Deep Dive", lessons: 10, students: 190, rating: 4.9 },
    ],
  },
  {
    name: "Data Science", count: 18, icon: "📊",
    playlists: [
      { title: "Python for Data Analysis", lessons: 15, students: 420, rating: 4.7 },
      { title: "Machine Learning Basics", lessons: 20, students: 310, rating: 4.5 },
    ],
  },
  {
    name: "Mobile Development", count: 12, icon: "📱",
    playlists: [
      { title: "React Native Complete", lessons: 22, students: 260, rating: 4.6 },
      { title: "Flutter Crash Course", lessons: 14, students: 180, rating: 4.4 },
    ],
  },
  {
    name: "AI & Machine Learning", count: 15, icon: "🤖",
    playlists: [
      { title: "Deep Learning with PyTorch", lessons: 16, students: 200, rating: 4.8 },
      { title: "NLP Fundamentals", lessons: 11, students: 150, rating: 4.5 },
    ],
  },
  {
    name: "DevOps", count: 9, icon: "⚙️",
    playlists: [
      { title: "Docker & Kubernetes", lessons: 13, students: 220, rating: 4.7 },
      { title: "CI/CD Pipelines", lessons: 8, students: 170, rating: 4.3 },
    ],
  },
  {
    name: "Design", count: 11, icon: "🎨",
    playlists: [
      { title: "UI/UX Principles", lessons: 10, students: 300, rating: 4.9 },
      { title: "Figma Masterclass", lessons: 14, students: 250, rating: 4.6 },
    ],
  },
];

export default function CourseCategories() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const active = categories.find((c) => c.name === activeCategory);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="page-title">Course Categories</h1>
        <p className="page-subtitle">Browse courses by category and explore playlists</p>
      </div>

      {!activeCategory ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className="card-premium p-5 text-left hover-lift group transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{cat.icon}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.count} courses · {cat.playlists.length} playlists</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <button onClick={() => setActiveCategory(null)} className="flex items-center gap-2 text-sm text-primary hover:underline">
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Categories
          </button>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{active?.icon}</span>
            <div>
              <h2 className="text-lg font-bold text-foreground">{activeCategory}</h2>
              <p className="text-xs text-muted-foreground">{active?.playlists.length} playlists available</p>
            </div>
          </div>
          <div className="space-y-3">
            {active?.playlists.map((playlist) => (
              <div key={playlist.title} className="card-premium p-4 flex items-center justify-between gap-4 hover-lift">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Play className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{playlist.title}</h4>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><BookOpen className="w-3 h-3" />{playlist.lessons} lessons</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" />{playlist.students}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Star className="w-3 h-3 text-warning" />{playlist.rating}</span>
                    </div>
                  </div>
                </div>
                <button className="btn-secondary text-xs">View</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
