import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Plus, X, Clock, Users,
  Video, FileText, Check, Calendar as CalIcon
} from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

type CalView = "month" | "week" | "day";

const eventTypes = [
  { label: "Lecture", color: "bg-primary/15 text-primary border-primary/30" },
  { label: "Lab", color: "bg-success/15 text-success border-success/30" },
  { label: "Exam", color: "bg-destructive/15 text-destructive border-destructive/30" },
  { label: "Workshop", color: "bg-warning/15 text-warning border-warning/30" },
];

const initialEvents = [
  { id: 1, title: "ML Fundamentals – Lecture 12", date: new Date(2025, 1, 3), time: "09:00", duration: "2h", type: "Lecture", instructor: "Dr. Sarah Chen", students: 87 },
  { id: 2, title: "React Patterns – Lab Session", date: new Date(2025, 1, 5), time: "14:00", duration: "3h", type: "Lab", instructor: "Marcus Johnson", students: 34 },
  { id: 3, title: "Data Science – Midterm Exam", date: new Date(2025, 1, 7), time: "10:00", duration: "2.5h", type: "Exam", instructor: "Priya Patel", students: 120 },
  { id: 4, title: "UI/UX Design Workshop", date: new Date(2025, 1, 10), time: "13:00", duration: "4h", type: "Workshop", instructor: "Emma Wilson", students: 45 },
  { id: 5, title: "Node.js Advanced – Lecture 8", date: new Date(2025, 1, 12), time: "11:00", duration: "2h", type: "Lecture", instructor: "David Kim", students: 62 },
  { id: 6, title: "iOS Dev – Lab 5", date: new Date(2025, 1, 14), time: "15:00", duration: "3h", type: "Lab", instructor: "Alex Rivera", students: 28 },
  { id: 7, title: "ML Final Exam", date: new Date(2025, 1, 19), time: "09:00", duration: "3h", type: "Exam", instructor: "Dr. Sarah Chen", students: 87 },
  { id: 8, title: "Design Systems Workshop", date: new Date(2025, 1, 21), time: "14:00", duration: "2h", type: "Workshop", instructor: "Emma Wilson", students: 55 },
];

const typeStyle: Record<string, string> = {
  Lecture: "bg-primary/15 text-primary border-primary/30",
  Lab: "bg-success/15 text-success border-success/30",
  Exam: "bg-destructive/15 text-destructive border-destructive/30",
  Workshop: "bg-warning/15 text-warning border-warning/30",
};

export default function Schedule() {
  const today = new Date(2025, 1, 19);
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [view, setView] = useState<CalView>("month");
  const [events, setEvents] = useState(initialEvents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof initialEvents[0] | null>(null);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", type: "Lecture", instructor: "", students: "" });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calDays = [];
  for (let i = 0; i < firstDay; i++) calDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calDays.push(new Date(year, month, d));

  const getEventsForDay = (d: Date) =>
    events.filter(e => e.date.toDateString() === d.toDateString());

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    setEvents([...events, {
      id: events.length + 1,
      title: newEvent.title,
      date: new Date(newEvent.date),
      time: newEvent.time || "09:00",
      duration: "1h",
      type: newEvent.type,
      instructor: newEvent.instructor || "TBD",
      students: Number(newEvent.students) || 0,
    }]);
    setShowAddModal(false);
    setNewEvent({ title: "", date: "", time: "", type: "Lecture", instructor: "", students: "" });
  };

  const upcomingEvents = events
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="page-title">Schedule</h1>
          <p className="page-subtitle">Manage classes, exams and workshops</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="xl:col-span-3 card-premium animate-fade-in-up delay-100" style={{ opacity: 0 }}>
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h2 className="text-base font-semibold text-foreground">
                {MONTHS[month]} {year}
              </h2>
              <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center bg-muted rounded-lg p-1 gap-1">
              {(["month", "week", "day"] as CalView[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all cursor-pointer ${
                    view === v ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-border">
            {DAYS.map((d) => (
              <div key={d} className="py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {calDays.map((d, i) => {
              const isToday = d && d.toDateString() === today.toDateString();
              const dayEvents = d ? getEventsForDay(d) : [];
              return (
                <div
                  key={i}
                  className={`min-h-[90px] p-2 border-b border-r border-border transition-colors ${
                    d ? "hover:bg-accent/30 cursor-pointer" : "bg-muted/20"
                  }`}
                >
                  {d && (
                    <>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold mb-1 transition-colors ${
                        isToday ? "gradient-primary text-primary-foreground" : "text-foreground hover:bg-primary/10"
                      }`}>
                        {d.getDate()}
                      </div>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map((e) => (
                          <button
                            key={e.id}
                            onClick={() => setSelectedEvent(e)}
                            className={`w-full text-left text-[10px] font-semibold px-1.5 py-0.5 rounded border truncate cursor-pointer transition-opacity hover:opacity-80 ${typeStyle[e.type]}`}
                          >
                            {e.time} {e.title}
                          </button>
                        ))}
                        {dayEvents.length > 2 && (
                          <p className="text-[10px] text-muted-foreground px-1">+{dayEvents.length - 2} more</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 px-5 py-3 border-t border-border flex-wrap">
            {eventTypes.map((et) => (
              <div key={et.label} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-sm border ${et.color}`} />
                <span className="text-xs text-muted-foreground">{et.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events Sidebar */}
        <div className="space-y-4">
          <div className="card-premium animate-fade-in-up delay-200" style={{ opacity: 0 }}>
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Upcoming Events</h3>
            </div>
            <div className="divide-y divide-border">
              {upcomingEvents.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setSelectedEvent(e)}
                  className="w-full text-left p-4 hover:bg-accent/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex flex-col items-center justify-center bg-primary/10 flex-shrink-0">
                      <span className="text-[10px] font-bold text-primary">{MONTHS[e.date.getMonth()].slice(0, 3).toUpperCase()}</span>
                      <span className="text-sm font-bold text-primary">{e.date.getDate()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground leading-snug truncate">{e.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{e.time} · {e.duration}</p>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border mt-1 inline-block ${typeStyle[e.type]}`}>
                        {e.type}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card-premium p-4 animate-fade-in-up delay-300" style={{ opacity: 0 }}>
            <h3 className="text-sm font-semibold text-foreground mb-3">This Month</h3>
            <div className="space-y-2.5">
              {[
                { label: "Lectures", count: events.filter(e => e.type === "Lecture").length, icon: Video },
                { label: "Labs", count: events.filter(e => e.type === "Lab").length, icon: Users },
                { label: "Exams", count: events.filter(e => e.type === "Exam").length, icon: FileText },
                { label: "Workshops", count: events.filter(e => e.type === "Workshop").length, icon: CalIcon },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <s.icon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </div>
                  <span className="text-xs font-bold text-foreground">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-sm animate-scale-in">
            <div className={`p-5 rounded-t-2xl border-b border-border ${typeStyle[selectedEvent.type]}`}>
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">{selectedEvent.type}</span>
                <button onClick={() => setSelectedEvent(null)} className="w-6 h-6 rounded-md hover:bg-black/10 flex items-center justify-center cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <h3 className="text-base font-bold mt-2">{selectedEvent.title}</h3>
            </div>
            <div className="p-5 space-y-3">
              {[
                { label: "Date", value: selectedEvent.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) },
                { label: "Time", value: `${selectedEvent.time} (${selectedEvent.duration})` },
                { label: "Instructor", value: selectedEvent.instructor },
                { label: "Students", value: `${selectedEvent.students} registered` },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-2 border-b border-border/60 last:border-0">
                  <span className="text-xs font-semibold text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-medium text-foreground">{row.value}</span>
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button className="btn-secondary flex-1 text-xs cursor-pointer">Edit Event</button>
                <button onClick={() => setSelectedEvent(null)} className="btn-primary flex-1 text-xs cursor-pointer">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="rounded-2xl w-full max-w-md animate-scale-in overflow-hidden"
            style={{ background: "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--primary-light)) 100%)" }}
          >
            <div className="p-5 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Add New Event</h2>
                <button onClick={() => setShowAddModal(false)} className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: "Event Title", key: "title", type: "text", placeholder: "e.g. ML Lecture 13" },
                { label: "Instructor", key: "instructor", type: "text", placeholder: "Instructor name" },
                { label: "Date", key: "date", type: "date", placeholder: "" },
                { label: "Time", key: "time", type: "time", placeholder: "" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">{f.label}</label>
                  <input
                    type={f.type}
                    value={(newEvent as any)[f.key]}
                    onChange={(e) => setNewEvent({ ...newEvent, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="form-input"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Event Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {eventTypes.map((et) => (
                    <button
                      key={et.label}
                      onClick={() => setNewEvent({ ...newEvent, type: et.label })}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        newEvent.type === et.label ? et.color : "border-border text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      {et.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddModal(false)} className="btn-secondary flex-1 cursor-pointer">Cancel</button>
                <button onClick={addEvent} className="btn-primary flex-1 cursor-pointer">
                  <Check className="w-4 h-4" /> Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
