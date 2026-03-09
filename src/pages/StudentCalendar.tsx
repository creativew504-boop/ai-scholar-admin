import { Calendar, Clock, Video, ClipboardList, BookOpen } from "lucide-react";

const events = [
  { title: "Mentor Session: React Patterns", type: "session", time: "10:00 AM - 11:00 AM", date: "Today", color: "text-primary", icon: Video },
  { title: "Assignment Due: ML Model", type: "assignment", time: "11:59 PM", date: "Today", color: "text-warning", icon: ClipboardList },
  { title: "Live Class: System Design", type: "class", time: "2:00 PM - 3:30 PM", date: "Tomorrow", color: "text-success", icon: BookOpen },
  { title: "Mentor Session: API Design", type: "session", time: "4:00 PM - 5:00 PM", date: "Mar 11", color: "text-primary", icon: Video },
  { title: "Assignment Due: Design System", type: "assignment", time: "11:59 PM", date: "Mar 15", color: "text-warning", icon: ClipboardList },
  { title: "Project Submission", type: "assignment", time: "11:59 PM", date: "Mar 18", color: "text-destructive", icon: ClipboardList },
  { title: "Live Class: Docker Intro", type: "class", time: "10:00 AM", date: "Mar 20", color: "text-success", icon: BookOpen },
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
const today = 9;
const eventDays = [9, 10, 11, 15, 18, 20];

export default function StudentCalendar() {
  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">Calendar</h1>
        <p className="page-subtitle">Your schedule, sessions, and deadlines</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 card-premium p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground">March 2026</h2>
            <div className="flex gap-2">
              <button className="btn-secondary text-xs py-1 px-3">← Prev</button>
              <button className="btn-secondary text-xs py-1 px-3">Next →</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {days.map(d => <div key={d} className="table-header py-2">{d}</div>)}
            {/* Offset for March 2026 starting on Sunday */}
            {calendarDays.map(d => (
              <div key={d} className={`py-3 rounded-lg text-sm transition-all cursor-pointer ${d === today ? "gradient-primary text-primary-foreground font-bold" : eventDays.includes(d) ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent text-foreground"}`}>
                {d}
                {eventDays.includes(d) && d !== today && <div className="w-1 h-1 rounded-full bg-primary mx-auto mt-0.5" />}
              </div>
            ))}
          </div>
        </div>

        {/* Events List */}
        <div>
          <h2 className="font-bold text-foreground mb-4">Upcoming Events</h2>
          <div className="space-y-2">
            {events.map((e, i) => (
              <div key={i} className="card-premium p-3 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${e.color}`}>
                    <e.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{e.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{e.date}</span>
                      <Clock className="w-3 h-3" />
                      <span>{e.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
