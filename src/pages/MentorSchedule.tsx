import { Calendar, Clock, Video, ClipboardList, Users } from "lucide-react";

const events = [
  { title: "Session: Alex Johnson - React Performance", type: "session", time: "2:00 PM", date: "Today", icon: Video, color: "text-primary" },
  { title: "Session: Priya Sharma - Model Training", type: "session", time: "4:30 PM", date: "Today", icon: Video, color: "text-primary" },
  { title: "Assignment Deadline: Custom Hooks", type: "deadline", time: "11:59 PM", date: "Today", icon: ClipboardList, color: "text-warning" },
  { title: "Session: Michael Lee - API Design", type: "session", time: "10:00 AM", date: "Tomorrow", icon: Video, color: "text-primary" },
  { title: "Live Class: System Design Workshop", type: "class", time: "2:00 PM", date: "Mar 11", icon: Users, color: "text-success" },
  { title: "Session: Emma Wilson - Design Review", type: "session", time: "3:00 PM", date: "Mar 11", icon: Video, color: "text-primary" },
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
const today = 9;
const busyDays = [9, 10, 11, 12, 15, 18, 20, 22, 25];

export default function MentorSchedule() {
  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">Schedule</h1>
        <p className="page-subtitle">Manage your mentoring schedule and availability</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
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
            {calendarDays.map(d => (
              <div key={d} className={`py-3 rounded-lg text-sm cursor-pointer transition-all ${d === today ? "gradient-primary text-primary-foreground font-bold" : busyDays.includes(d) ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent text-foreground"}`}>
                {d}
                {busyDays.includes(d) && d !== today && <div className="w-1 h-1 rounded-full bg-primary mx-auto mt-0.5" />}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground">Today's Schedule</h2>
            <button className="btn-primary text-xs py-1.5">+ Add Event</button>
          </div>
          <div className="space-y-2">
            {events.map((e, i) => (
              <div key={i} className="card-premium p-3 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${e.color}`}>
                    <e.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">{e.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-0.5"><Calendar className="w-2.5 h-2.5" /> {e.date}</span>
                      <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" /> {e.time}</span>
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
