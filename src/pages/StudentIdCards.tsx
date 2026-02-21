import { Download, Printer, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const students = [
  { id: "STU-001", name: "Alex Johnson", email: "alex@mail.com", course: "Full Stack Dev", joined: "Jan 2024", avatar: "A", status: "Active" },
  { id: "STU-002", name: "Maria Garcia", email: "maria@mail.com", course: "Data Science", joined: "Feb 2024", avatar: "M", status: "Active" },
  { id: "STU-003", name: "James Wilson", email: "james@mail.com", course: "Mobile Dev", joined: "Mar 2024", avatar: "J", status: "Active" },
  { id: "STU-004", name: "Sarah Chen", email: "sarah@mail.com", course: "AI/ML", joined: "Jan 2024", avatar: "S", status: "Inactive" },
  { id: "STU-005", name: "Raj Patel", email: "raj@mail.com", course: "DevOps", joined: "Feb 2024", avatar: "R", status: "Active" },
  { id: "STU-006", name: "Emma Davis", email: "emma@mail.com", course: "UI/UX Design", joined: "Mar 2024", avatar: "E", status: "Active" },
];

export default function StudentIdCards() {
  const [search, setSearch] = useState("");
  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="section-header">
        <div>
          <h1 className="page-title">Student ID Cards</h1>
          <p className="page-subtitle">Generate and manage student identification cards</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-xs"><Printer className="w-4 h-4" /> Print All</button>
          <button className="btn-primary text-xs"><Download className="w-4 h-4" /> Export</button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input className="form-input pl-9" placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((student) => (
          <div key={student.id} className="card-premium overflow-hidden hover-lift">
            <div className="h-16 gradient-primary relative">
              <div className="absolute -bottom-6 left-4 w-12 h-12 rounded-xl bg-card border-2 border-card flex items-center justify-center text-lg font-bold text-primary shadow-card">
                {student.avatar}
              </div>
            </div>
            <div className="pt-8 px-4 pb-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">{student.name}</h3>
                <span className={student.status === "Active" ? "badge-success" : "badge-destructive"}>{student.status}</span>
              </div>
              <p className="text-xs text-muted-foreground">{student.email}</p>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                <div>
                  <p className="text-muted-foreground">ID</p>
                  <p className="font-mono font-semibold text-foreground">{student.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Course</p>
                  <p className="font-semibold text-foreground">{student.course}</p>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground">Enrolled: {student.joined}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
