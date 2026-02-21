import { useState } from "react";
import { DollarSign, TrendingUp, AlertCircle, CheckCircle, Search, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const payments = [
  { id: "PAY-001", student: "Alex Johnson", course: "Full Stack Dev", amount: 499, status: "Paid", date: "Feb 15, 2024", method: "Card" },
  { id: "PAY-002", student: "Maria Garcia", course: "Data Science", amount: 599, status: "Paid", date: "Feb 14, 2024", method: "UPI" },
  { id: "PAY-003", student: "James Wilson", course: "Mobile Dev", amount: 449, status: "Pending", date: "Feb 13, 2024", method: "Card" },
  { id: "PAY-004", student: "Sarah Chen", course: "AI/ML", amount: 699, status: "Overdue", date: "Jan 30, 2024", method: "Bank" },
  { id: "PAY-005", student: "Raj Patel", course: "DevOps", amount: 399, status: "Paid", date: "Feb 12, 2024", method: "Card" },
  { id: "PAY-006", student: "Emma Davis", course: "UI/UX Design", amount: 349, status: "Refunded", date: "Feb 10, 2024", method: "Card" },
];

const statusStyle: Record<string, string> = {
  Paid: "badge-success", Pending: "badge-warning", Overdue: "badge-destructive", Refunded: "badge-primary",
};

export default function StudentPayments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const statuses = ["All", "Paid", "Pending", "Overdue", "Refunded"];

  const filtered = payments.filter((p) =>
    (statusFilter === "All" || p.status === statusFilter) &&
    (p.student.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()))
  );

  const totalCollected = payments.filter((p) => p.status === "Paid").reduce((a, p) => a + p.amount, 0);
  const totalPending = payments.filter((p) => p.status === "Pending").reduce((a, p) => a + p.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="section-header">
        <div>
          <h1 className="page-title">Student Payments</h1>
          <p className="page-subtitle">Track and manage student fee payments</p>
        </div>
        <button className="btn-primary text-xs"><Download className="w-4 h-4" /> Export</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Collected", value: `$${totalCollected.toLocaleString()}`, icon: DollarSign, color: "text-success" },
          { label: "Pending", value: `$${totalPending.toLocaleString()}`, icon: AlertCircle, color: "text-warning" },
          { label: "Completion Rate", value: `${Math.round((payments.filter((p) => p.status === "Paid").length / payments.length) * 100)}%`, icon: TrendingUp, color: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="stat-card flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", s.color === "text-success" ? "bg-success/10" : s.color === "text-warning" ? "bg-warning/10" : "bg-primary/10")}>
              <s.icon className={cn("w-5 h-5", s.color)} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input className="form-input pl-9" placeholder="Search payments..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {statuses.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all", statusFilter === s ? "gradient-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:bg-accent")}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="card-premium overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Payment ID", "Student", "Course", "Amount", "Method", "Status", "Date"].map((h) => (
                <th key={h} className="table-header text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                <td className="px-4 py-3 font-semibold text-foreground">{p.student}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.course}</td>
                <td className="px-4 py-3 font-bold text-foreground">${p.amount}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.method}</td>
                <td className="px-4 py-3"><span className={statusStyle[p.status]}>{p.status}</span></td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
