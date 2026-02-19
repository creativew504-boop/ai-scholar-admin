import { useState } from "react";
import {
  Search, Filter, Download, Eye, X, RefreshCw,
  CheckCircle, XCircle, Clock, CreditCard, DollarSign,
  TrendingUp, AlertCircle
} from "lucide-react";

const gateways = ["All", "Stripe", "Razorpay", "PayPal"];
const statusList = ["All", "Completed", "Pending", "Failed", "Refunded"];

const transactions = Array.from({ length: 20 }, (_, i) => ({
  id: `TXN-${String(8001 + i).padStart(6, "0")}`,
  student: ["Sarah Chen", "Marcus Johnson", "Priya Patel", "David Kim", "Emma Wilson",
    "James Rodriguez", "Aisha Mohamed", "Tyler Brooks", "Yuki Tanaka", "Fatima Al-Rashid",
    "Noah Williams", "Isabella Garcia", "Ethan Brown", "Olivia Martinez", "Liam Anderson",
    "Sophia Taylor", "Benjamin Thomas", "Mia Jackson", "Mason White", "Charlotte Harris"][i],
  course: ["ML Fundamentals", "React Patterns", "Data Science", "UI/UX Mastery", "Node.js Micro",
    "iOS Dev", "Python Basics", "Cloud Arch", "Cybersecurity", "Blockchain Dev",
    "GraphQL API", "DevOps CI/CD", "Vue.js 3", "Django REST", "Flutter Dev",
    "MongoDB Expert", "Redis Caching", "WebAssembly", "Rust Systems", "Go Microservices"][i],
  amount: [199, 149, 299, 129, 179, 219, 99, 249, 189, 239, 159, 139, 119, 169, 229, 209, 189, 259, 279, 199][i],
  gateway: (["Stripe", "Razorpay", "PayPal", "Stripe", "Stripe"][i % 5]),
  status: (["Completed", "Completed", "Completed", "Pending", "Failed", "Refunded"][i % 6]),
  date: new Date(2025, 0, 10 + (i * 2)).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  refId: `REF-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
}));

const statusIcon: Record<string, JSX.Element> = {
  Completed: <CheckCircle className="w-3.5 h-3.5 text-success" />,
  Pending: <Clock className="w-3.5 h-3.5 text-warning" />,
  Failed: <XCircle className="w-3.5 h-3.5 text-destructive" />,
  Refunded: <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />,
};

const statusStyle: Record<string, string> = {
  Completed: "badge-success",
  Pending: "badge-warning",
  Failed: "badge-destructive",
  Refunded: "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground",
};

const gwStyle: Record<string, string> = {
  Stripe: "text-[#635bff] bg-[#635bff]/10",
  Razorpay: "text-[#3395ff] bg-[#3395ff]/10",
  PayPal: "text-[#003087] bg-[#003087]/10",
};

const summaryCards = [
  { label: "Total Revenue", value: "$38,420", change: "+12%", icon: DollarSign, positive: true },
  { label: "Transactions", value: "20", change: "+8%", icon: CreditCard, positive: true },
  { label: "Pending", value: "$1,940", change: "3 txns", icon: Clock, positive: false },
  { label: "Refunded", value: "$448", change: "2 txns", icon: RefreshCw, positive: false },
];

const isAdmin = true;

export default function Payments() {
  const [search, setSearch] = useState("");
  const [gatewayFilter, setGatewayFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTxn, setSelectedTxn] = useState<typeof transactions[0] | null>(null);
  const [refundConfirm, setRefundConfirm] = useState(false);

  const filtered = transactions.filter((t) => {
    const matchSearch = t.student.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.course.toLowerCase().includes(search.toLowerCase());
    const matchGw = gatewayFilter === "All" || t.gateway === gatewayFilter;
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchGw && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="page-title">Payment Management</h1>
          <p className="page-subtitle">Track transactions, refunds and gateway performance</p>
        </div>
        <button className="btn-primary">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryCards.map((c, i) => (
          <div key={c.label} className="stat-card animate-fade-in-up" style={{ animationDelay: `${i * 70}ms`, opacity: 0 }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <c.icon className="w-5 h-5 text-primary" />
              </div>
              <span className={`text-xs font-semibold ${c.positive ? "text-success" : "text-muted-foreground"}`}>
                {c.change}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">{c.label}</p>
            <p className="text-xl font-bold text-foreground mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="form-input pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {gateways.map((g) => (
            <button key={g} onClick={() => setGatewayFilter(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${gatewayFilter === g ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}>
              {g}
            </button>
          ))}
          <div className="w-px h-7 bg-border self-center mx-1" />
          {statusList.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}>
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
                <th className="text-left px-5 py-3.5 table-header">Transaction ID</th>
                <th className="text-left px-4 py-3.5 table-header">Student</th>
                <th className="text-left px-4 py-3.5 table-header">Course</th>
                <th className="text-left px-4 py-3.5 table-header">Amount</th>
                <th className="text-left px-4 py-3.5 table-header">Gateway</th>
                <th className="text-left px-4 py-3.5 table-header">Status</th>
                <th className="text-left px-4 py-3.5 table-header">Date</th>
                <th className="text-right px-5 py-3.5 table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((txn) => (
                <tr key={txn.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-md">
                      {txn.id}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-foreground">{txn.student}</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground max-w-[140px] truncate">{txn.course}</td>
                  <td className="px-4 py-4 text-sm font-bold text-foreground">${txn.amount}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${gwStyle[txn.gateway]}`}>
                      {txn.gateway}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`${statusStyle[txn.status]} flex items-center gap-1 w-fit`}>
                      {statusIcon[txn.status]}{txn.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{txn.date}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedTxn(txn)}
                        className="w-7 h-7 rounded-md hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border bg-muted/20">
          <p className="text-sm text-muted-foreground">Showing {filtered.length} of {transactions.length} transactions</p>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-semibold text-foreground">Transaction Details</h2>
              <button onClick={() => { setSelectedTxn(null); setRefundConfirm(false); }} className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-5 p-3 bg-muted/40 rounded-xl">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {selectedTxn.student.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{selectedTxn.student}</p>
                  <p className="text-xs text-muted-foreground">{selectedTxn.course}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-lg font-bold text-foreground">${selectedTxn.amount}</p>
                  <span className={`${statusStyle[selectedTxn.status]} text-xs`}>{selectedTxn.status}</span>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Transaction ID", value: selectedTxn.id },
                  { label: "Reference", value: selectedTxn.refId },
                  { label: "Gateway", value: selectedTxn.gateway },
                  { label: "Date", value: selectedTxn.date },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-2 border-b border-border/60 last:border-0">
                    <span className="text-xs font-semibold text-muted-foreground">{row.label}</span>
                    <span className="text-sm font-mono font-medium text-foreground">{row.value}</span>
                  </div>
                ))}
              </div>

              {isAdmin && selectedTxn.status === "Completed" && (
                <div className="mt-5">
                  {!refundConfirm ? (
                    <button
                      onClick={() => setRefundConfirm(true)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-destructive/50 text-destructive text-sm font-semibold hover:bg-destructive/10 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" /> Process Refund (Admin Only)
                    </button>
                  ) : (
                    <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        <p className="text-sm font-semibold text-destructive">Confirm Refund?</p>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        This will refund ${selectedTxn.amount} to the student. This action cannot be undone.
                      </p>
                      <div className="flex gap-2">
                        <button onClick={() => setRefundConfirm(false)} className="flex-1 py-1.5 text-xs font-semibold border border-border rounded-lg hover:bg-accent cursor-pointer">
                          Cancel
                        </button>
                        <button onClick={() => { setSelectedTxn(null); setRefundConfirm(false); }}
                          className="flex-1 py-1.5 text-xs font-semibold bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 cursor-pointer">
                          Confirm Refund
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
