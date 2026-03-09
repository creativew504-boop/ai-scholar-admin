import { CreditCard, Download, Calendar, CheckCircle } from "lucide-react";

const payments = [
  { course: "Advanced React Patterns", amount: "$149.00", date: "Jan 5, 2026", method: "Visa •••• 4242", status: "Paid", invoice: "INV-2026-001" },
  { course: "Python Machine Learning", amount: "$199.00", date: "Feb 1, 2026", method: "Visa •••• 4242", status: "Paid", invoice: "INV-2026-002" },
  { course: "Node.js Microservices", amount: "$129.00", date: "Dec 15, 2025", method: "PayPal", status: "Paid", invoice: "INV-2025-012" },
  { course: "UI/UX Design Systems", amount: "$99.00", date: "Mar 1, 2026", method: "Visa •••• 4242", status: "Paid", invoice: "INV-2026-003" },
  { course: "Docker & Kubernetes", amount: "$149.00", date: "Mar 5, 2026", method: "Visa •••• 4242", status: "Paid", invoice: "INV-2026-004" },
];

const subscription = { plan: "Pro Annual", price: "$199/year", renewal: "Jan 5, 2027", status: "Active" };

export default function StudentPaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="parallax-section">
        <h1 className="page-title">Payments & Billing</h1>
        <p className="page-subtitle">Manage your payments and subscriptions</p>
      </div>

      {/* Subscription */}
      <div className="card-premium p-5 border-l-4 border-primary">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div>
            <h3 className="font-bold text-foreground">Current Plan: {subscription.plan}</h3>
            <p className="text-sm text-muted-foreground mt-1">{subscription.price} · Renews {subscription.renewal}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge-success"><CheckCircle className="w-3 h-3" /> {subscription.status}</span>
            <button className="btn-secondary text-xs py-1.5">Manage Plan</button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="stat-card"><p className="text-xl font-bold text-foreground">$725</p><p className="text-xs text-muted-foreground">Total Spent</p></div>
        <div className="stat-card"><p className="text-xl font-bold text-foreground">5</p><p className="text-xs text-muted-foreground">Courses Purchased</p></div>
        <div className="stat-card"><p className="text-xl font-bold text-foreground">$199</p><p className="text-xs text-muted-foreground">Annual Sub</p></div>
      </div>

      {/* Payment History */}
      <div className="card-premium overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-bold text-foreground">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="table-header text-left p-3">Course</th>
                <th className="table-header text-left p-3">Amount</th>
                <th className="table-header text-left p-3">Date</th>
                <th className="table-header text-left p-3">Method</th>
                <th className="table-header text-left p-3">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                  <td className="p-3 text-sm font-medium text-foreground">{p.course}</td>
                  <td className="p-3 text-sm font-bold text-foreground">{p.amount}</td>
                  <td className="p-3 text-sm text-muted-foreground">{p.date}</td>
                  <td className="p-3 text-sm text-muted-foreground">{p.method}</td>
                  <td className="p-3">
                    <button className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
                      <Download className="w-3 h-3" /> {p.invoice}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
