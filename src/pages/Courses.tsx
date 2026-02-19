import { useState } from "react";
import {
  Search, Filter, Plus, Star, Play, Code2, X, ChevronRight,
  Clock, Users, DollarSign, BookOpen, Upload, Check
} from "lucide-react";

const categories = ["All", "Machine Learning", "Web Development", "Data Science", "Design", "Business", "Mobile Dev"];

const courses = [
  {
    id: 1, title: "Machine Learning Fundamentals", instructor: "Dr. Sarah Chen",
    rating: 4.9, students: 1240, price: "$199", category: "Machine Learning",
    duration: "42h", level: "Intermediate",
    thumb: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=80",
    tags: ["Python", "TensorFlow", "Neural Networks"],
  },
  {
    id: 2, title: "Advanced React Patterns", instructor: "Marcus Johnson",
    rating: 4.8, students: 980, price: "$149", category: "Web Development",
    duration: "28h", level: "Advanced",
    thumb: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
    tags: ["React", "TypeScript", "State Management"],
  },
  {
    id: 3, title: "Data Science Bootcamp", instructor: "Priya Patel",
    rating: 4.7, students: 870, price: "$299", category: "Data Science",
    duration: "60h", level: "Beginner",
    thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    tags: ["Python", "Pandas", "Visualization"],
  },
  {
    id: 4, title: "UI/UX Design Mastery", instructor: "Emma Wilson",
    rating: 4.8, students: 760, price: "$129", category: "Design",
    duration: "35h", level: "Beginner",
    thumb: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80",
    tags: ["Figma", "Prototyping", "User Research"],
  },
  {
    id: 5, title: "Node.js Microservices", instructor: "David Kim",
    rating: 4.6, students: 640, price: "$179", category: "Web Development",
    duration: "38h", level: "Advanced",
    thumb: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80",
    tags: ["Node.js", "Docker", "Kubernetes"],
  },
  {
    id: 6, title: "iOS App Development", instructor: "Alex Rivera",
    rating: 4.7, students: 520, price: "$219", category: "Mobile Dev",
    duration: "45h", level: "Intermediate",
    thumb: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80",
    tags: ["Swift", "SwiftUI", "Xcode"],
  },
];

const sampleCode = `import numpy as np
import matplotlib.pyplot as plt

# Linear Regression from scratch
class LinearRegression:
    def __init__(self, lr=0.01, epochs=1000):
        self.lr = lr
        self.epochs = epochs
        self.w = None
        self.b = None
    
    def fit(self, X, y):
        self.w = np.zeros(X.shape[1])
        self.b = 0
        for _ in range(self.epochs):
            y_pred = np.dot(X, self.w) + self.b
            dw = (2/len(X)) * np.dot(X.T, (y_pred - y))
            db = (2/len(X)) * np.sum(y_pred - y)
            self.w -= self.lr * dw
            self.b -= self.lr * db
    
    def predict(self, X):
        return np.dot(X, self.w) + self.b

# Example usage
model = LinearRegression()
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 5, 4, 5])
model.fit(X, y)
print("Weights:", model.w)
print("Bias:", model.b)
print("Predictions:", model.predict(X))`;

const stepLabels = ["Course Details", "Content & Media", "Pricing & Publish"];

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [viewingCourse, setViewingCourse] = useState<typeof courses[0] | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addStep, setAddStep] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const filtered = courses.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const runCode = () => {
    setIsRunning(true);
    setConsoleOutput(["Running code..."]);
    setTimeout(() => {
      setConsoleOutput([
        "Weights: [0.6]",
        "Bias: 2.04",
        "Predictions: [2.64 3.24 3.84 4.44 5.04]",
        "",
        "✓ Execution completed in 0.023s",
      ]);
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="page-title">Courses</h1>
          <p className="page-subtitle">{courses.length} courses · {courses.reduce((a, c) => a + c.students, 0).toLocaleString()} students enrolled</p>
        </div>
        <button onClick={() => { setShowAddForm(true); setAddStep(0); }} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-100" style={{ opacity: 0 }}>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="form-input pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((course, i) => (
          <div
            key={course.id}
            className="card-premium overflow-hidden hover-lift animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
          >
            <div className="relative h-44 overflow-hidden">
              <img src={course.thumb} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 flex gap-1.5">
                {course.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] font-semibold bg-black/50 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="absolute top-3 right-3 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-1 rounded-full">
                {course.level}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground text-sm leading-snug mb-1">{course.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">by {course.instructor}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning fill-warning" />{course.rating}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-foreground">{course.price}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewingCourse(course)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer"
                  >
                    <Play className="w-3 h-3" /> Learn
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:bg-accent transition-colors cursor-pointer">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Video Learning Interface Modal ── */}
      {viewingCourse && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h2 className="font-semibold text-foreground text-sm">{viewingCourse.title}</h2>
                <p className="text-xs text-muted-foreground">by {viewingCourse.instructor}</p>
              </div>
              <button onClick={() => setViewingCourse(null)} className="w-8 h-8 rounded-lg hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Split Screen */}
            <div className="flex flex-1 overflow-hidden" style={{ height: "70vh" }}>
              {/* Video Player */}
              <div className="w-1/2 bg-black flex flex-col">
                <div className="flex-1 flex items-center justify-center relative">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 cursor-pointer hover:bg-white/30 transition-colors">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                    <p className="text-sm opacity-70">Lesson 1: Introduction to {viewingCourse.category}</p>
                    <p className="text-xs opacity-50 mt-1">Click to play video</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="w-full bg-white/20 rounded-full h-1 mb-2">
                      <div className="bg-primary h-1 rounded-full w-1/3" />
                    </div>
                    <div className="flex items-center justify-between text-white text-xs">
                      <span>14:32</span><span>42:15</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Editor */}
              <div className="w-1/2 flex flex-col border-l border-border">
                <div className="flex items-center justify-between px-4 py-2.5 bg-muted/50 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">Code Editor</span>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">Python</span>
                  </div>
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-success text-success-foreground text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    {isRunning ? "Running..." : "Run Code"}
                  </button>
                </div>
                <div className="flex-1 overflow-auto bg-[#1e1e2e]">
                  <pre className="p-4 text-xs text-green-300 font-mono leading-relaxed overflow-auto h-full">
                    <code>{sampleCode}</code>
                  </pre>
                </div>
                {/* Console */}
                <div className="h-32 border-t border-border bg-[#0d0d1a] flex flex-col">
                  <div className="px-4 py-2 border-b border-white/10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Console Output</span>
                  </div>
                  <div className="flex-1 p-3 overflow-auto font-mono text-xs text-green-400 space-y-0.5">
                    {consoleOutput.length === 0
                      ? <span className="text-white/30">Run your code to see output...</span>
                      : consoleOutput.map((line, i) => <div key={i}>{line || <br />}</div>)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Course Modal ── */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-lg animate-scale-in">
            {/* Steps */}
            <div className="px-6 pt-6 pb-4 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-foreground">Add New Course</h2>
                <button onClick={() => setShowAddForm(false)} className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                {stepLabels.map((label, i) => (
                  <div key={label} className="flex items-center gap-2 flex-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                      i < addStep ? "bg-success text-success-foreground" :
                      i === addStep ? "bg-primary text-primary-foreground" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {i < addStep ? <Check className="w-3 h-3" /> : i + 1}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${i === addStep ? "text-foreground" : "text-muted-foreground"}`}>
                      {label}
                    </span>
                    {i < stepLabels.length - 1 && <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 space-y-4">
              {addStep === 0 && (
                <div className="space-y-4 animate-fade-in-up">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Course Title *</label>
                    <input className="form-input" placeholder="e.g. Advanced Machine Learning" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Instructor *</label>
                    <input className="form-input" placeholder="Instructor name" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Category</label>
                      <select className="form-input">
                        {categories.slice(1).map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Level</label>
                      <select className="form-input">
                        {["Beginner", "Intermediate", "Advanced"].map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Description</label>
                    <textarea className="form-input resize-none" rows={3} placeholder="Brief course description..." />
                  </div>
                </div>
              )}
              {addStep === 1 && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">Upload Thumbnail</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Video URL / Upload</label>
                    <input className="form-input" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Duration (hours)</label>
                    <input type="number" className="form-input" placeholder="e.g. 24" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Tags (comma separated)</label>
                    <input className="form-input" placeholder="Python, ML, Deep Learning" />
                  </div>
                </div>
              )}
              {addStep === 2 && (
                <div className="space-y-4 animate-fade-in-up">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Price ($)</label>
                    <input type="number" className="form-input" placeholder="e.g. 199" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Discount Price ($)</label>
                    <input type="number" className="form-input" placeholder="Optional" />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-success/5 border border-success/20 rounded-xl">
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Ready to Publish</p>
                      <p className="text-xs text-muted-foreground">Course will be visible to all students</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 pb-6 flex gap-3">
              {addStep > 0 && (
                <button onClick={() => setAddStep(addStep - 1)} className="btn-secondary flex-1 cursor-pointer">Back</button>
              )}
              {addStep < 2 ? (
                <button onClick={() => setAddStep(addStep + 1)} className="btn-primary flex-1 cursor-pointer">
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={() => setShowAddForm(false)} className="btn-primary flex-1 cursor-pointer">
                  <Check className="w-4 h-4" /> Publish Course
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
