import { useState } from "react";
import {
  Search, Filter, Plus, MoreHorizontal, Mail, Phone,
  ChevronLeft, ChevronRight, Edit2, Trash2, Eye, X, Check,
  CreditCard, TrendingUp, AlertCircle, BookOpen
} from "lucide-react";

const statusColors: Record<string, string> = {
  Active: "badge-success",
  Inactive: "badge-warning",
  Overdue: "badge-destructive",
  Graduated: "badge-primary",
};

const paymentColors: Record<string, string> = {
  Paid: "badge-success",
  Pending: "badge-warning",
  Overdue: "badge-destructive",
  Partial: "badge-primary",
};

const students = Array.from({ length: 24 }, (_, i) => ({
  id: `STU-${String(2401 + i).padStart(4, "0")}`,
  name: ["Sarah Chen", "Marcus Johnson", "Priya Patel", "David Kim", "Emma Wilson",
    "James Rodriguez", "Aisha Mohamed", "Tyler Brooks", "Yuki Tanaka", "Fatima Al-Rashid",
    "Noah Williams", "Isabella Garcia", "Ethan Brown", "Olivia Martinez", "Liam Anderson",
    "Sophia Taylor", "Benjamin Thomas", "Mia Jackson", "Mason White", "Charlotte Harris",
    "Elijah Clark", "Amelia Lewis", "William Robinson", "Harper Walker"][i],
  email: ["sarah", "marcus", "priya", "david", "emma",
    "james", "aisha", "tyler", "yuki", "fatima",
    "noah", "isabella", "ethan", "olivia", "liam",
    "sophia", "benjamin", "mia", "mason", "charlotte",
    "elijah", "amelia", "william", "harper"][i] + "@email.com",
  phone: `+1 555-${String(1000 + i * 37).slice(0, 4)}-${String(5000 + i * 13).slice(0, 4)}`,
  courses: Math.floor(Math.random() * 5) + 1,
  status: ["Active", "Active", "Active", "Inactive", "Overdue", "Graduated"][Math.floor(Math.random() * 6)],
  paymentStatus: ["Paid", "Paid", "Pending", "Overdue", "Partial"][Math.floor(Math.random() * 5)],
  balance: Math.floor(Math.random() * 2000),
  totalPaid: Math.floor(Math.random() * 5000) + 500,
  joined: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  avatar: ["SC", "MJ", "PP", "DK", "EW", "JR", "AM", "TB", "YT", "FA",
    "NW", "IG", "EB", "OM", "LA", "ST", "BT", "MJ", "MW", "CH", "EC", "AL", "WR", "HW"][i],
}));

const PAGE_SIZE = 8;

export default function Students() {
  const [tab, setTab] = useState<"directory" | "payments">("directory");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const simulateLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  const stats = [
    { label: "Total Students", value: students.length, icon: Search, color: "primary" },
    { label: "Active", value: students.filter(s => s.status === "Active").length, icon: Check, color: "success" },
    { label: "Overdue Payment", value: students.filter(s => s.paymentStatus === "Overdue").length, icon: AlertCircle, color: "destructive" },
    { label: "Avg. Courses", value: (students.reduce((a, s) => a + s.courses, 0) / students.length).toFixed(1), icon: BookOpen, color: "warning" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="page-title">Students</h1>
          <p className="page-subtitle">Manage student records and payment tracking</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Student
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={s.label} className="stat-card animate-fade-in-up" style={{ animationDelay: `${i * 60}ms`, opacity: 0 }}>
            <p className="text-xs font-semibold text-muted-foreground mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex bg-muted rounded-xl p-1 w-fit gap-1 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
        {(["directory", "payments"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200 cursor-pointer ${
              tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "directory" ? "Student Directory" : "Payment Dashboard"}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); simulateLoad(); }}
            placeholder="Search students..."
            className="form-input pl-9"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Active", "Inactive", "Overdue", "Graduated"].map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1); simulateLoad(); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                statusFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card-premium overflow-hidden animate-fade-in-up delay-300" style={{ opacity: 0 }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3.5 table-header">Student</th>
                <th className="text-left px-4 py-3.5 table-header">ID</th>
                {tab === "directory" ? (
                  <>
                    <th className="text-left px-4 py-3.5 table-header">Contact</th>
                    <th className="text-left px-4 py-3.5 table-header">Courses</th>
                    <th className="text-left px-4 py-3.5 table-header">Status</th>
                    <th className="text-left px-4 py-3.5 table-header">Joined</th>
                  </>
                ) : (
                  <>
                    <th className="text-left px-4 py-3.5 table-header">Total Paid</th>
                    <th className="text-left px-4 py-3.5 table-header">Balance Due</th>
                    <th className="text-left px-4 py-3.5 table-header">Payment Status</th>
                  </>
                )}
                <th className="text-right px-5 py-3.5 table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading
                ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: tab === "directory" ? 7 : 6 }).map((_, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 rounded-md animate-shimmer" style={{ width: `${40 + (j * 13) % 40}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
                : paginated.map((student) => (
                  <tr key={student.id} className="hover:bg-accent/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
                          {student.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-mono font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        {student.id}
                      </span>
                    </td>
                    {tab === "directory" ? (
                      <>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{student.phone}</td>
                        <td className="px-4 py-4">
                          <span className="badge-primary">{student.courses} courses</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={statusColors[student.status]}>{student.status}</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{student.joined}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-4 text-sm font-semibold text-foreground">${student.totalPaid.toLocaleString()}</td>
                        <td className="px-4 py-4">
                          <span className={student.balance > 0 ? "text-sm font-semibold text-destructive" : "text-sm font-semibold text-success"}>
                            ${student.balance.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={paymentColors[student.paymentStatus]}>{student.paymentStatus}</span>
                        </td>
                      </>
                    )}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setSelectedStudent(student)} className="w-7 h-7 rounded-md hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors cursor-pointer">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-md hover:bg-accent flex items-center justify-center transition-colors cursor-pointer">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-md hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-border bg-muted/20">
          <p className="text-sm text-muted-foreground">
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} students
          </p>
          <div className="flex items-center gap-1.5">
            <button
              disabled={page === 1}
              onClick={() => { setPage(p => p - 1); simulateLoad(); }}
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => { setPage(p); simulateLoad(); }}
                className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  p === page ? "bg-primary text-primary-foreground" : "border border-border hover:bg-accent"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => { setPage(p => p + 1); simulateLoad(); }}
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-semibold text-foreground">Student Details</h2>
              <button onClick={() => setSelectedStudent(null)} className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
                  {selectedStudent.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedStudent.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedStudent.id}</p>
                  <span className={statusColors[selectedStudent.status]}>{selectedStudent.status}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Email", value: selectedStudent.email },
                  { label: "Phone", value: selectedStudent.phone },
                  { label: "Courses Enrolled", value: selectedStudent.courses },
                  { label: "Joined", value: selectedStudent.joined },
                  { label: "Total Paid", value: `$${selectedStudent.totalPaid.toLocaleString()}` },
                  { label: "Balance Due", value: `$${selectedStudent.balance.toLocaleString()}` },
                ].map((row) => (
                  <div key={row.label} className="bg-muted/40 rounded-lg p-3">
                    <p className="text-xs font-semibold text-muted-foreground mb-0.5">{row.label}</p>
                    <p className="text-sm font-semibold text-foreground">{row.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button className="btn-secondary flex-1 cursor-pointer"><Mail className="w-4 h-4" /> Email</button>
                <button className="btn-primary flex-1 cursor-pointer"><Edit2 className="w-4 h-4" /> Edit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-semibold text-foreground">Add New Student</h2>
              <button onClick={() => setShowAddModal(false)} className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {["Full Name", "Email Address", "Phone Number"].map((label) => (
                <div key={label}>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">{label}</label>
                  <input className="form-input" placeholder={label} />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Status</label>
                <select className="form-input">
                  {["Active", "Inactive", "Graduated"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddModal(false)} className="btn-secondary flex-1 cursor-pointer">Cancel</button>
                <button onClick={() => setShowAddModal(false)} className="btn-primary flex-1 cursor-pointer">
                  <Check className="w-4 h-4" /> Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
