import { useState } from "react";
import {
  TrendingUp, Users, BookOpen, DollarSign, Download,
  BarChart2, ArrowUpRight
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";

const enrollmentData = [
  { month: "Jan", enrollments: 320, completions: 210, dropouts: 45 },
  { month: "Feb", enrollments: 410, completions: 280, dropouts: 38 },
  { month: "Mar", enrollments: 380, completions: 260, dropouts: 42 },
  { month: "Apr", enrollments: 520, completions: 380, dropouts: 35 },
  { month: "May", enrollments: 490, completions: 350, dropouts: 40 },
  { month: "Jun", enrollments: 600, completions: 445, dropouts: 32 },
  { month: "Jul", enrollments: 570, completions: 420, dropouts: 36 },
  { month: "Aug", enrollments: 680, completions: 510, dropouts: 28 },
  { month: "Sep", enrollments: 640, completions: 480, dropouts: 31 },
  { month: "Oct", enrollments: 750, completions: 580, dropouts: 25 },
  { month: "Nov", enrollments: 820, completions: 630, dropouts: 22 },
  { month: "Dec", enrollments: 900, completions: 710, dropouts: 18 },
];

const revenueVsTarget = [
  { month: "Jan", revenue: 42000, target: 40000 },
  { month: "Feb", revenue: 51000, target: 45000 },
  { month: "Mar", revenue: 47000, target: 50000 },
  { month: "Apr", revenue: 63000, target: 55000 },
  { month: "May", revenue: 58000, target: 60000 },
  { month: "Jun", revenue: 72000, target: 65000 },
  { month: "Jul", revenue: 68000, target: 70000 },
  { month: "Aug", revenue: 81000, target: 75000 },
  { month: "Sep", revenue: 76000, target: 80000 },
  { month: "Oct", revenue: 89000, target: 85000 },
  { month: "Nov", revenue: 94000, target: 90000 },
  { month: "Dec", revenue: 102000, target: 95000 },
];

const categoryDistribution = [
  { name: "Machine Learning", value: 35, color: "hsl(221,83%,53%)" },
  { name: "Web Development", value: 28, color: "hsl(142,76%,36%)" },
  { name: "Data Science", value: 18, color: "hsl(38,92%,50%)" },
  { name: "Design", value: 12, color: "hsl(280,80%,55%)" },
  { name: "Others", value: 7, color: "hsl(215,16%,47%)" },
];

const topPerformers = [
  { name: "Sarah Chen", course: "Machine Learning", score: 98, revenue: "$8,420", students: 342 },
  { name: "Marcus Johnson", course: "React Patterns", score: 96, revenue: "$6,180", students: 278 },
  { name: "Priya Patel", course: "Data Science", score: 94, revenue: "$11,240", students: 410 },
  { name: "Emma Wilson", course: "UI/UX Design", score: 93, revenue: "$5,360", students: 215 },
  { name: "David Kim", course: "Node.js", score: 91, revenue: "$7,890", students: 298 },
];

const kpis = [
  { label: "Total Revenue", value: "$843,000", change: "+24.8%", positive: true, icon: DollarSign },
  { label: "Total Enrollments", value: "6,480", change: "+18.2%", positive: true, icon: Users },
  { label: "Completion Rate", value: "76.4%", change: "+3.1%", positive: true, icon: TrendingUp },
  { label: "Avg. Rating", value: "4.78", change: "+0.12", positive: true, icon: BarChart2 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg-card text-xs">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: {typeof p.value === "number" && p.value > 1000 ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Reports() {
  const [exportFormat, setExportFormat] = useState<"csv" | "pdf">("csv");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Track performance, revenue, and student outcomes</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-muted rounded-lg p-1 gap-1">
            {(["csv", "pdf"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setExportFormat(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase transition-all cursor-pointer ${
                  exportFormat === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="btn-primary">
            <Download className="w-4 h-4" /> Export {exportFormat.toUpperCase()}
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={kpi.label} className="stat-card animate-fade-in-up" style={{ animationDelay: `${i * 70}ms`, opacity: 0 }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <kpi.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-success">
                <ArrowUpRight className="w-3.5 h-3.5" />{kpi.change}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">{kpi.label}</p>
            <p className="text-xl font-bold text-foreground mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Enrollment Chart */}
        <div className="card-premium p-6 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
          <h2 className="text-sm font-semibold text-foreground mb-1">Enrollment Trends</h2>
          <p className="text-xs text-muted-foreground mb-5">Monthly enrollments, completions & dropouts</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={enrollmentData}>
              <defs>
                <linearGradient id="enGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(221,83%,53%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(221,83%,53%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142,76%,36%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(142,76%,36%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="enrollments" stroke="hsl(221,83%,53%)" strokeWidth={2} fill="url(#enGrad)" name="enrollments" dot={false} />
              <Area type="monotone" dataKey="completions" stroke="hsl(142,76%,36%)" strokeWidth={2} fill="url(#compGrad)" name="completions" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue vs Target */}
        <div className="card-premium p-6 animate-fade-in-up delay-300" style={{ opacity: 0 }}>
          <h2 className="text-sm font-semibold text-foreground mb-1">Revenue vs Target</h2>
          <p className="text-xs text-muted-foreground mb-5">Monthly revenue against set targets</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueVsTarget} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="hsl(221,83%,53%)" radius={[4,4,0,0]} name="revenue" maxBarSize={20} />
              <Bar dataKey="target" fill="hsl(var(--border))" radius={[4,4,0,0]} name="target" maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <div className="card-premium p-6 animate-fade-in-up delay-400" style={{ opacity: 0 }}>
          <h2 className="text-sm font-semibold text-foreground mb-1">Course Categories</h2>
          <p className="text-xs text-muted-foreground mb-4">Distribution by category</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {categoryDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryDistribution.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  <span className="text-muted-foreground">{c.name}</span>
                </div>
                <span className="font-semibold text-foreground">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers Table */}
        <div className="xl:col-span-2 card-premium animate-fade-in-up delay-500" style={{ opacity: 0 }}>
          <div className="p-5 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Top Instructor Performance</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Ranked by student satisfaction score</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left px-5 py-3 table-header">Instructor</th>
                  <th className="text-left px-4 py-3 table-header">Course</th>
                  <th className="text-left px-4 py-3 table-header">Score</th>
                  <th className="text-left px-4 py-3 table-header">Revenue</th>
                  <th className="text-left px-4 py-3 table-header">Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {topPerformers.map((p, i) => (
                  <tr key={p.name} className="hover:bg-accent/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {p.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground">#{i + 1} ranked</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{p.course}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[80px] bg-muted rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-primary" style={{ width: `${p.score}%` }} />
                        </div>
                        <span className="text-xs font-bold text-foreground">{p.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-success">{p.revenue}</td>
                    <td className="px-4 py-3.5 text-sm text-foreground">{p.students.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
