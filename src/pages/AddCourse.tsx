import { useState } from "react";
import { ArrowLeft, Upload, Plus, X, BookOpen, Video, FileText, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const categories = ["Web Development", "Data Science", "Mobile Development", "AI & Machine Learning", "DevOps", "Design"];
const steps = ["Basic Info", "Curriculum", "Pricing", "Preview"];

export default function AddCourse() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: "", description: "", category: "", level: "Beginner",
    price: "", thumbnail: "", lessons: [{ title: "", duration: "" }],
  });

  const addLesson = () => setForm({ ...form, lessons: [...form.lessons, { title: "", duration: "" }] });
  const removeLesson = (i: number) => setForm({ ...form, lessons: form.lessons.filter((_, idx) => idx !== i) });

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/courses")} className="p-2 rounded-lg hover:bg-accent transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="page-title">Add New Course</h1>
          <p className="page-subtitle">Create a new course for your students</p>
        </div>
      </div>

      {/* Steps */}
      <div className="flex gap-2">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={cn(
              "flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200",
              i === step ? "gradient-primary text-primary-foreground shadow-blue" : "bg-card border border-border text-muted-foreground hover:bg-accent"
            )}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      <div className="card-premium p-6 space-y-5">
        {step === 0 && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Course Title</label>
              <input className="form-input" placeholder="e.g. Advanced React Patterns" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <textarea className="form-input min-h-[100px]" placeholder="Describe your course..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Category</label>
                <select className="form-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Level</label>
                <select className="form-input" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                  {["Beginner", "Intermediate", "Advanced"].map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Thumbnail</label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Course Lessons</h3>
              <button onClick={addLesson} className="btn-primary text-xs"><Plus className="w-3 h-3" /> Add Lesson</button>
            </div>
            <div className="space-y-3">
              {form.lessons.map((lesson, i) => (
                <div key={i} className="flex gap-3 items-center p-3 rounded-lg border border-border bg-card">
                  <Video className="w-4 h-4 text-primary flex-shrink-0" />
                  <input className="form-input flex-1" placeholder={`Lesson ${i + 1} title`} value={lesson.title} onChange={(e) => { const l = [...form.lessons]; l[i].title = e.target.value; setForm({ ...form, lessons: l }); }} />
                  <input className="form-input w-24" placeholder="Duration" value={lesson.duration} onChange={(e) => { const l = [...form.lessons]; l[i].duration = e.target.value; setForm({ ...form, lessons: l }); }} />
                  {form.lessons.length > 1 && (
                    <button onClick={() => removeLesson(i)} className="p-1 rounded hover:bg-destructive/10 text-destructive"><X className="w-4 h-4" /></button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Price ($)</label>
              <input className="form-input" type="number" placeholder="49.99" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Discount (%)</label>
              <input className="form-input" type="number" placeholder="0" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Course Preview</h3>
            <div className="p-4 rounded-xl border border-border space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">{form.title || "Untitled Course"}</span>
              </div>
              <p className="text-sm text-muted-foreground">{form.description || "No description"}</p>
              <div className="flex gap-2 flex-wrap">
                {form.category && <span className="badge-primary">{form.category}</span>}
                <span className="badge-warning">{form.level}</span>
                <span className="badge-success flex items-center gap-1"><Clock className="w-3 h-3" />{form.lessons.length} lessons</span>
              </div>
              {form.price && <p className="text-lg font-bold text-foreground">${form.price}</p>}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={() => setStep(Math.max(0, step - 1))} className="btn-secondary" disabled={step === 0}>Back</button>
        {step < 3 ? (
          <button onClick={() => setStep(step + 1)} className="btn-primary">Next Step</button>
        ) : (
          <button className="btn-primary">Publish Course</button>
        )}
      </div>
    </div>
  );
}
