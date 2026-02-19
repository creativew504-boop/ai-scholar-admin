import { useState } from "react";
import {
  Users, DollarSign, BookOpen, TrendingUp, Download, FileText,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Star, Zap
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 42000, students: 380 },
  { month: "Feb", revenue: 51000, students: 420 },
  { month: "Mar", revenue: 47000, students: 410 },
  { month: "Apr", revenue: 63000, students: 480 },
  { month: "May", revenue: 58000, students: 460 },
  { month: "Jun", revenue: 72000, students: 520 },
  { month: "Jul", revenue: 68000, students: 505 },
  { month: "Aug", revenue: 81000, students: 570 },
  { month: "Sep", revenue: 76000, students: 550 },
  { month: "Oct", revenue: 89000, students: 610 },
  { month: "Nov", revenue: 94000, students: 640 },
  { month: "Dec", revenue: 102000, students: 680 },
];

const yearlyData = [
  { month: "2020", revenue: 420000, students: 2100 },
  { month: "2021", revenue: 580000, students: 3200 },
  { month: "2022", revenue: 740000, students: 4800 },
  { month: "2023", revenue: 920000, students: 6200 },
  { month: "2024", revenue: 1180000, students: 8400 },
  { month: "2025", revenue: 1420000, students: 11200 },
];

const statCards = [
  {
    title: "Total Students",
    value: "12,847",
    change: "+18.2%",
    positive: true,
    icon: Users,
    color: "primary",
    bg: "hsl(var(--primary) / 0.1)",
    iconColor: "hsl(var(--primary))",
  },
  {
    title: "Monthly Revenue",
    value: "$102,000",
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
    color: "success",
    bg: "hsl(var(--success) / 0.1)",
    iconColor: "hsl(var(--success))",
  },
  {
    title: "Active Courses",
    value: "248",
    change: "+6.8%",
    positive: true,
    icon: BookOpen,
    color: "warning",
    bg: "hsl(var(--warning) / 0.1)",
    iconColor: "hsl(var(--warning))",
  },
  {
    title: "Retention Rate",
    value: "94.3%",
    change: "-1.2%",
    positive: false,
    icon: TrendingUp,
    color: "destructive",
    bg: "hsl(var(--destructive) / 0.1)",
    iconColor: "hsl(var(--destructive))",
  },
];

const recentActivities = [
  { user: "Sarah Chen", action: "enrolled in", course: "Machine Learning Fundamentals", time: "2m ago", avatar: "SC" },
  { user: "Marcus Johnson", action: "completed", course: "Advanced React Patterns", time: "15m ago", avatar: "MJ" },
  { user: "Priya Patel", action: "submitted assignment in", course: "Data Science Bootcamp", time: "32m ago", avatar: "PP" },
  { user: "David Kim", action: "left a review on", course: "UI/UX Design Mastery", time: "1h ago", avatar: "DK" },
  { user: "Emma Wilson", action: "enrolled in", course: "Python for Beginners", time: "2h ago", avatar: "EW" },
];

const topCourses = [
  { name: "Machine Learning Fundamentals", students: 1240, revenue: "$24,800", rating: 4.9 },
  { name: "Advanced React Patterns", students: 980, revenue: "$19,600", rating: 4.8 },
  { name: "Data Science Bootcamp", students: 870, revenue: "$34,800", rating: 4.7 },
  { name: "UI/UX Design Mastery", students: 760, revenue: "$15,200", rating: 4.8 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg-card text-sm">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="text-xs">
            {p.name}: {p.name === "revenue" ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [chartMode, setChartMode] = useState<"monthly" | "yearly">("monthly");
  const data = chartMode === "monthly" ? monthlyData : yearlyData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Good Morning, Chief! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with AI Scholar today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Download CSV
          </button>
          <button className="btn-primary">
            <FileText className="w-4 h-4" />
            Create Report
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div
            key={card.title}
            className="stat-card animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: card.bg }}
              >
                <card.icon className="w-5 h-5" style={{ color: card.iconColor }} />
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <p className="text-muted-foreground text-sm font-medium">{card.title}</p>
            <p className="text-2xl font-bold text-foreground mt-1 mb-2">{card.value}</p>
            <div className={`flex items-center gap-1 text-xs font-semibold ${card.positive ? "text-success" : "text-destructive"}`}>
              {card.positive
                ? <ArrowUpRight className="w-3.5 h-3.5" />
                : <ArrowDownRight className="w-3.5 h-3.5" />}
              {card.change} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 card-premium p-6 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">Revenue Analytics</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Track revenue and enrollment trends</p>
            </div>
            <div className="flex items-center bg-muted rounded-lg p-1 gap-1">
              {(["monthly", "yearly"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setChartMode(mode)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 capitalize cursor-pointer ${
                    chartMode === mode
                      ? "bg-card text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(221,83%,53%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(221,83%,53%)" stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="studentsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142,76%,36%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(142,76%,36%)" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(221,83%,53%)" strokeWidth={2.5} fill="url(#revenueGrad)" name="revenue" dot={false} />
              <Area type="monotone" dataKey="students" stroke="hsl(142,76%,36%)" strokeWidth={2} fill="url(#studentsGrad)" name="students" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Highlight Card + Activity */}
        <div className="space-y-4">
          {/* Highlight CTA */}
          <div
            className="rounded-xl p-5 text-primary-foreground relative overflow-hidden animate-fade-in-up delay-300"
            style={{ background: "linear-gradient(135deg, hsl(221,83%,53%) 0%, hsl(221,83%,65%) 100%)", opacity: 0 }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/10 translate-y-6 -translate-x-6" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider opacity-90">Pro Feature</span>
              </div>
              <h3 className="text-lg font-bold mb-1">AI-Powered Insights</h3>
              <p className="text-sm opacity-80 mb-4 leading-relaxed">
                Get predictive analytics and personalized recommendations for your students.
              </p>
              <button className="w-full py-2.5 bg-white text-primary font-semibold rounded-lg text-sm hover:bg-white/90 transition-colors">
                Upgrade to Pro →
              </button>
            </div>
          </div>

          {/* Top Courses */}
          <div className="card-premium p-5 animate-fade-in-up delay-400" style={{ opacity: 0 }}>
            <h3 className="text-sm font-semibold text-foreground mb-4">Top Courses</h3>
            <div className="space-y-3">
              {topCourses.map((c, i) => (
                <div key={c.name} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{c.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Star className="w-3 h-3 text-warning fill-warning" />
                      <span className="text-[10px] text-muted-foreground">{c.rating} · {c.students} students</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-success">{c.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-premium animate-fade-in-up delay-500" style={{ opacity: 0 }}>
        <div className="p-6 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">Recent Activity</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Latest student and course interactions</p>
        </div>
        <div className="divide-y divide-border">
          {recentActivities.map((a) => (
            <div key={a.user + a.time} className="flex items-center gap-4 px-6 py-4 hover:bg-accent/40 transition-colors">
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
                {a.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">{a.user}</span>{" "}
                  <span className="text-muted-foreground">{a.action}</span>{" "}
                  <span className="font-medium text-primary">{a.course}</span>
                </p>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
