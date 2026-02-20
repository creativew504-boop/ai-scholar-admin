import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize,
  Settings, Search, Bell, Moon, Sun, Crown, ChevronDown, ChevronRight,
  ChevronLeft, Code2, BookOpen, Brain, FileText, MessageSquare,
  Download, Star, Clock, Users, Lock, Check, CheckCheck,
  HelpCircle, Mail, Headphones, Ticket, CreditCard, Award,
  Shield, AlertTriangle, Zap, GripVertical, X, Filter,
  Terminal, Copy, RotateCcw, Sparkles, Folder, File,
  Play as PlayIcon, Square, Minus, Plus, Monitor,
  User, LogOut, Settings as SettingsIcon, BookMarked
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────
type LayoutMode = "course" | "ide" | "notes";
type NavTab = "overview" | "notes" | "resources" | "discussion";
type HelpCategory = "account" | "courses" | "payments" | "certificates" | "technical" | "instructor" | null;
type NotifFilter = "all" | "courses" | "system" | "payments" | "certificates" | "messages";

interface Notification {
  id: number;
  type: NotifFilter;
  icon: any;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  locked?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────
const lessons: Lesson[] = [
  { id: 1, title: "Introduction to React Hooks", duration: "12:30", completed: true },
  { id: 2, title: "useState Deep Dive", duration: "18:45", completed: true },
  { id: 3, title: "useEffect & Side Effects", duration: "22:10", completed: false },
  { id: 4, title: "Custom Hooks Pattern", duration: "15:20", completed: false },
  { id: 5, title: "useContext & State Mgmt", duration: "20:00", completed: false, locked: true },
  { id: 6, title: "Performance with useMemo", duration: "16:35", completed: false, locked: true },
  { id: 7, title: "useRef & DOM Access", duration: "14:50", completed: false, locked: true },
  { id: 8, title: "Advanced Patterns", duration: "25:00", completed: false, locked: true },
];

const notifications: Notification[] = [
  { id: 1, type: "courses", icon: BookOpen, title: "New Lesson Available", message: "React Advanced Patterns has been published", time: "2m ago", read: false },
  { id: 2, type: "system", icon: AlertTriangle, title: "System Maintenance", message: "Scheduled downtime tonight 2-4 AM UTC", time: "15m ago", read: false },
  { id: 3, type: "payments", icon: CreditCard, title: "Payment Confirmed", message: "Your Pro subscription has been renewed", time: "1h ago", read: false },
  { id: 4, type: "certificates", icon: Award, title: "Certificate Ready!", message: "Download your React Fundamentals certificate", time: "3h ago", read: true },
  { id: 5, type: "courses", icon: Zap, title: "Assignment Due", message: "React Hooks project due in 2 days", time: "5h ago", read: true },
  { id: 6, type: "messages", icon: MessageSquare, title: "Instructor Reply", message: "Dr. Sarah responded to your question", time: "1d ago", read: true },
];

const helpCategories = [
  { key: "account", icon: User, title: "Account", desc: "Profile, settings & security", color: "from-blue-500 to-cyan-500" },
  { key: "courses", icon: BookOpen, title: "Courses", desc: "Enrollment & progress", color: "from-violet-500 to-purple-500" },
  { key: "payments", icon: CreditCard, title: "Payments", desc: "Billing & subscriptions", color: "from-emerald-500 to-teal-500" },
  { key: "certificates", icon: Award, title: "Certificates", desc: "Verification & download", color: "from-amber-500 to-orange-500" },
  { key: "technical", icon: Shield, title: "Technical", desc: "Bugs & troubleshooting", color: "from-rose-500 to-pink-500" },
  { key: "instructor", icon: Headphones, title: "Instructor Help", desc: "Teaching tools & support", color: "from-indigo-500 to-blue-500" },
];

const faqs = [
  { q: "How do I reset my password?", a: "Go to Account Settings > Security > Change Password." },
  { q: "Can I download course videos?", a: "Pro subscribers can download videos for offline viewing." },
  { q: "How do certificates work?", a: "Complete all lessons and pass the final quiz to earn a certificate." },
  { q: "What payment methods are accepted?", a: "We accept Visa, Mastercard, PayPal, and crypto." },
  { q: "How to contact my instructor?", a: "Use the Discussion tab on any course page." },
];

const defaultCode = `// Welcome to AIScholar IDE
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
    console.log('Count:', count + 1);
  };

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`;

// ─── Component ───────────────────────────────────────────────────
export default function VideoPlayer() {
  // Layout
  const [mode, setMode] = useState<LayoutMode>("ide");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  // Video
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(35);
  const [activeLesson, setActiveLesson] = useState(2);
  const [navTab, setNavTab] = useState<NavTab>("overview");

  // Editor
  const [code, setCode] = useState(defaultCode);
  const [editorTab, setEditorTab] = useState("App.jsx");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [compiling, setCompiling] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [editorWidth, setEditorWidth] = useState(45);

  // Notifications
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const [notifFilter, setNotifFilter] = useState<NotifFilter>("all");

  // User menu
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Help
  const [helpCategory, setHelpCategory] = useState<HelpCategory>(null);
  const [helpSearch, setHelpSearch] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showTicketForm, setShowTicketForm] = useState(false);

  // Notes
  const [notesContent, setNotesContent] = useState("# My Course Notes\n\n- React hooks simplify state management\n- useEffect handles side effects\n- Custom hooks promote reusability\n");

  // Drag resize
  const dragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(45);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    startWidth.current = editorWidth;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [editorWidth]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const delta = ((e.clientX - startX.current) / window.innerWidth) * 100;
      const newWidth = Math.max(25, Math.min(65, startWidth.current + delta));
      setEditorWidth(newWidth);
    };
    const handleMouseUp = () => {
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const runCode = () => {
    setCompiling(true);
    setTerminalOpen(true);
    setTerminalOutput(["⚡ Compiling..."]);
    setTimeout(() => {
      const logs: string[] = [];
      const lines = code.split("\n");
      lines.forEach((line) => {
        const match = line.match(/console\.log\(['"`](.+?)['"`](?:,\s*(.+?))?\)/);
        if (match) {
          logs.push(`> ${match[1]}${match[2] ? " " + match[2].trim() : ""}`);
        }
      });
      setTerminalOutput([
        "✓ Compiled successfully in 1.2s",
        "─────────────────────────",
        ...(logs.length ? logs : ["> No console output"]),
        "─────────────────────────",
        "✓ Process exited with code 0",
      ]);
      setCompiling(false);
    }, 1500);
  };

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const unreadCount = notifs.filter((n) => !n.read).length;
  const filteredNotifs = notifFilter === "all" ? notifs : notifs.filter((n) => n.type === notifFilter);

  // Glassmorphism base
  const glass = "backdrop-blur-xl border border-white/[0.06]";
  const glassBg = "bg-[#0d1117]/80";
  const cardBg = "bg-[#161b22]";
  const cardBorder = "border border-white/[0.06]";

  // ─── HELP CENTER ─────────────────────────────────────────────
  if (showHelp) {
    return (
      <div className="min-h-screen bg-[#0a0e14] text-gray-100 font-sans">
        {/* Help Navbar */}
        <nav className={cn("sticky top-0 z-50 h-14 px-6 flex items-center gap-4", glass, glassBg)}>
          <button onClick={() => setShowHelp(false)} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Learning</span>
          </button>
          <div className="flex-1" />
          <HelpCircle className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Help Center</span>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Search */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">How can we help?</h1>
            <p className="text-gray-400 text-sm mb-6">Search our knowledge base or browse categories below</p>
            <div className={cn("max-w-xl mx-auto relative", glass, "bg-[#161b22]/80 rounded-2xl")}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                value={helpSearch}
                onChange={(e) => setHelpSearch(e.target.value)}
                placeholder="Search articles, FAQs, guides..."
                className="w-full h-12 pl-11 pr-4 bg-transparent text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none rounded-2xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Categories + Articles */}
            <div className="lg:col-span-2 space-y-8">
              {!helpCategory ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {helpCategories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setHelpCategory(cat.key as HelpCategory)}
                      className={cn("p-5 rounded-2xl text-left group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/5", cardBg, cardBorder)}
                    >
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br", cat.color)}>
                        <cat.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm text-gray-100">{cat.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{cat.desc}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <button onClick={() => setHelpCategory(null)} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors">
                    <ChevronLeft className="w-3 h-3" />
                    All Categories
                  </button>
                  {/* Article view */}
                  <div className={cn("p-6 rounded-2xl", cardBg, cardBorder)}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-400">Guide</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-400">{helpCategory}</span>
                      <span className="text-[10px] text-gray-500 ml-auto">Updated 2 days ago</span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-100 mb-3">Getting Started with {helpCategories.find(c => c.key === helpCategory)?.title}</h2>
                    <div className="text-sm text-gray-400 space-y-3 leading-relaxed">
                      <p>Welcome to AIScholar's {helpCategory} support. Here you'll find everything you need to manage your {helpCategory} settings and resolve common issues.</p>
                      <p>Our platform is designed to be intuitive, but we understand that questions can arise. Browse the FAQ section or contact our support team for personalized assistance.</p>
                      <h3 className="text-gray-200 font-semibold pt-2">Quick Steps</h3>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Navigate to your dashboard settings</li>
                        <li>Select the relevant {helpCategory} section</li>
                        <li>Follow the on-screen instructions</li>
                        <li>Save your changes</li>
                      </ol>
                    </div>
                    {/* Feedback */}
                    <div className={cn("mt-6 p-4 rounded-xl flex items-center gap-4", "bg-white/[0.03]", "border border-white/[0.04]")}>
                      <span className="text-sm text-gray-400">Was this helpful?</span>
                      <button className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/30 transition-colors">👍 Yes</button>
                      <button className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 text-xs font-medium hover:bg-rose-500/30 transition-colors">👎 No</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: MessageSquare, title: "Live Chat", desc: "Chat with us now", action: "Start Chat", color: "from-blue-500 to-cyan-500" },
                  { icon: Mail, title: "Email Support", desc: "support@aischolar.io", action: "Send Email", color: "from-violet-500 to-purple-500" },
                  { icon: Ticket, title: "Submit Ticket", desc: "We'll respond in 24h", action: "Create Ticket", color: "from-amber-500 to-orange-500" },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => item.title === "Submit Ticket" && setShowTicketForm(true)}
                    className={cn("p-5 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02]", cardBg, cardBorder)}
                  >
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br", item.color)}>
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    <span className="inline-block mt-3 text-xs font-medium text-blue-400">{item.action} →</span>
                  </button>
                ))}
              </div>

              {/* Ticket Form */}
              {showTicketForm && (
                <div className={cn("p-6 rounded-2xl space-y-4", cardBg, cardBorder)}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Submit a Ticket</h3>
                    <button onClick={() => setShowTicketForm(false)} className="text-gray-500 hover:text-gray-300"><X className="w-4 h-4" /></button>
                  </div>
                  <input placeholder="Subject" className="w-full h-10 px-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50" />
                  <select className="w-full h-10 px-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-gray-400 focus:outline-none">
                    <option>Select Category</option>
                    {helpCategories.map((c) => <option key={c.key}>{c.title}</option>)}
                  </select>
                  <textarea rows={4} placeholder="Describe your issue..." className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 resize-none" />
                  <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity">Submit Ticket</button>
                </div>
              )}
            </div>

            {/* Right: FAQ Sidebar */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-gray-300">Frequently Asked</h3>
              {faqs.map((faq, i) => (
                <button
                  key={i}
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className={cn("w-full p-4 rounded-xl text-left transition-all duration-200", cardBg, cardBorder, expandedFaq === i && "ring-1 ring-blue-500/30")}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200 font-medium pr-2">{faq.q}</span>
                    <ChevronDown className={cn("w-3.5 h-3.5 text-gray-500 flex-shrink-0 transition-transform", expandedFaq === i && "rotate-180")} />
                  </div>
                  {expandedFaq === i && <p className="text-xs text-gray-400 mt-3 leading-relaxed">{faq.a}</p>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── MAIN LMS INTERFACE ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0e14] text-gray-100 font-sans flex flex-col overflow-hidden">
      {/* ── NAVBAR ──────────────────────────────────────────────── */}
      <nav className={cn("relative z-50 h-12 px-4 flex items-center gap-3 flex-shrink-0", glass, glassBg)}>
        {/* Logo */}
        <div className="flex items-center gap-2 mr-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight hidden sm:block">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI</span>
            <span className="text-gray-200">Scholar</span>
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white hidden md:block">PRO</span>
        </div>

        {/* Mode Tabs */}
        <div className={cn("flex h-8 rounded-xl p-0.5", "bg-white/[0.04]", "border border-white/[0.06]")}>
          {(["course", "ide", "notes"] as LayoutMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "px-3 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1.5",
                mode === m ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-sm shadow-blue-500/10" : "text-gray-500 hover:text-gray-300"
              )}
            >
              {m === "course" && <BookOpen className="w-3 h-3" />}
              {m === "ide" && <Code2 className="w-3 h-3" />}
              {m === "notes" && <FileText className="w-3 h-3" />}
              <span className="hidden sm:inline capitalize">{m === "ide" ? "IDE" : m}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className={cn("flex-1 max-w-xs relative hidden md:block")}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input
            placeholder="Search lessons, docs..."
            className={cn("w-full h-8 pl-9 pr-3 rounded-xl text-xs bg-white/[0.04] border border-white/[0.06] text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/30 transition-colors")}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-gray-600 font-mono">⌘K</kbd>
        </div>

        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowHelp(true)} className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-300 hover:bg-white/[0.04] transition-all">
            <HelpCircle className="w-4 h-4" />
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-300 hover:bg-white/[0.04] transition-all">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => { setShowNotifs(!showNotifs); setShowUserMenu(false); }} className="relative w-8 h-8 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-300 hover:bg-white/[0.04] transition-all">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-[9px] text-white font-bold flex items-center justify-center animate-pulse">{unreadCount}</span>
              )}
            </button>
            {showNotifs && (
              <div className={cn("absolute right-0 top-full mt-2 w-80 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 z-50 animate-scale-in", glass, "bg-[#0d1117]/95")}>
                <div className="p-4 border-b border-white/[0.06]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">Notifications</h3>
                    <button onClick={markAllRead} className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors">Mark All Read</button>
                  </div>
                  <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                    {(["all", "courses", "system", "payments", "certificates", "messages"] as NotifFilter[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => setNotifFilter(f)}
                        className={cn("px-2.5 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all",
                          notifFilter === f ? "bg-blue-500/20 text-blue-400" : "text-gray-500 hover:text-gray-300"
                        )}
                      >
                        {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {filteredNotifs.map((n) => (
                    <div key={n.id} className={cn("px-4 py-3 flex gap-3 hover:bg-white/[0.02] transition-colors border-b border-white/[0.03] last:border-0", !n.read && "bg-blue-500/[0.03]")}>
                      <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0", !n.read ? "bg-blue-500/20 text-blue-400" : "bg-white/[0.04] text-gray-500")}>
                        <n.icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-gray-200 truncate">{n.title}</span>
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />}
                        </div>
                        <p className="text-[10px] text-gray-500 mt-0.5 truncate">{n.message}</p>
                        <span className="text-[9px] text-gray-600 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Upgrade */}
          <button className="hidden sm:flex h-8 px-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-[11px] font-semibold text-white items-center gap-1.5 hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20">
            <Crown className="w-3 h-3" />
            Upgrade
          </button>

          {/* Avatar */}
          <div className="relative">
            <button onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifs(false); }} className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold hover:opacity-90 transition-opacity">
              A
            </button>
            {showUserMenu && (
              <div className={cn("absolute right-0 top-full mt-2 w-48 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 z-50 animate-scale-in py-1", glass, "bg-[#0d1117]/95")}>
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <p className="text-sm font-semibold">Admin Chief</p>
                  <p className="text-[10px] text-gray-500">admin@aischolar.io</p>
                </div>
                {[
                  { icon: User, label: "Profile" },
                  { icon: SettingsIcon, label: "Account Settings" },
                  { icon: BookMarked, label: "My Courses" },
                ].map((item) => (
                  <button key={item.label} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.04] transition-colors">
                    <item.icon className="w-3.5 h-3.5 text-gray-500" />
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-white/[0.06] mt-1 pt-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors">
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Click-away */}
      {(showNotifs || showUserMenu) && <div className="fixed inset-0 z-40" onClick={() => { setShowNotifs(false); setShowUserMenu(false); }} />}

      {/* ── MAIN CONTENT ───────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Course Sidebar (course mode) */}
        {mode === "course" && sidebarOpen && (
          <div className={cn("w-64 flex-shrink-0 flex flex-col border-r border-white/[0.06] transition-all duration-300", glassBg)}>
            <div className="p-4 border-b border-white/[0.06]">
              <h2 className="text-sm font-bold text-gray-200">React Masterclass</h2>
              <p className="text-[10px] text-gray-500 mt-1">8 lessons • 2h 25m</p>
              <div className="mt-3 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" style={{ width: "25%" }} />
              </div>
              <span className="text-[10px] text-gray-500 mt-1 block">25% complete</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => !lesson.locked && setActiveLesson(lesson.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200",
                    activeLesson === lesson.id ? "bg-blue-500/10 border border-blue-500/20" : "hover:bg-white/[0.03]",
                    lesson.locked && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold",
                    lesson.completed ? "bg-emerald-500/20 text-emerald-400" : activeLesson === lesson.id ? "bg-blue-500/20 text-blue-400" : "bg-white/[0.04] text-gray-500"
                  )}>
                    {lesson.completed ? <Check className="w-3.5 h-3.5" /> : lesson.locked ? <Lock className="w-3 h-3" /> : lesson.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-xs font-medium truncate", activeLesson === lesson.id ? "text-blue-400" : "text-gray-300")}>{lesson.title}</p>
                    <span className="text-[10px] text-gray-600">{lesson.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Notes Mode */}
        {mode === "notes" && (
          <div className={cn("w-72 flex-shrink-0 flex flex-col border-r border-white/[0.06]", glassBg)}>
            <div className="p-4 border-b border-white/[0.06]">
              <h3 className="text-sm font-semibold text-gray-200">📝 Course Notes</h3>
              <p className="text-[10px] text-gray-500 mt-1">Auto-saved</p>
            </div>
            <textarea
              value={notesContent}
              onChange={(e) => setNotesContent(e.target.value)}
              className="flex-1 p-4 bg-transparent text-sm text-gray-300 placeholder:text-gray-600 focus:outline-none resize-none font-mono leading-relaxed"
              placeholder="Start typing your notes..."
            />
          </div>
        )}

        {/* Video Area */}
        <div className={cn("flex flex-col transition-all duration-300", mode === "ide" ? "flex-1" : mode === "notes" ? "flex-1" : "flex-1")}
          style={mode === "ide" ? { width: `${100 - editorWidth}%`, flexShrink: 0, flexGrow: 0 } : undefined}
        >
          {/* Video Player */}
          <div className="relative bg-black flex-1 min-h-0 flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-4 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-110 group/play"
                  onClick={() => setPlaying(!playing)}
                >
                  {playing ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
                </div>
                <h3 className="text-white font-semibold text-sm">{lessons[activeLesson]?.title || "Select a lesson"}</h3>
                <div className="flex items-center gap-2 justify-center mt-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-blue-500/20 text-blue-400">HD 1080p</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-purple-500/20 text-purple-400">React</span>
                </div>
              </div>
            </div>
            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="h-1 rounded-full bg-white/20 mb-3 cursor-pointer group/progress relative" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setProgress(((e.clientX - rect.left) / rect.width) * 100);
              }}>
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 relative transition-all" style={{ width: `${progress}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg shadow-blue-500/50 opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-white/70 hover:text-white transition-colors"><SkipBack className="w-4 h-4" /></button>
                <button onClick={() => setPlaying(!playing)} className="text-white hover:scale-110 transition-transform">
                  {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button className="text-white/70 hover:text-white transition-colors"><SkipForward className="w-4 h-4" /></button>
                <button onClick={() => setMuted(!muted)} className="text-white/70 hover:text-white transition-colors">
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-[10px] text-white/50 font-mono">{Math.floor(progress * 0.22)}:00 / 22:10</span>
                <div className="flex-1" />
                <button className="text-white/70 hover:text-white transition-colors"><Settings className="w-4 h-4" /></button>
                <button className="text-white/70 hover:text-white transition-colors"><Maximize className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* Tabs below video */}
          <div className={cn("border-t border-white/[0.06]", glassBg)}>
            <div className="flex gap-0 px-4 border-b border-white/[0.06]">
              {(["overview", "notes", "resources", "discussion"] as NavTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setNavTab(tab)}
                  className={cn("px-4 py-2.5 text-xs font-medium transition-all relative",
                    navTab === tab ? "text-blue-400" : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {navTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />}
                </button>
              ))}
              {mode !== "course" && (
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-gray-500 hover:text-gray-300 text-xs flex items-center gap-1">
                  {sidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  Lessons
                </button>
              )}
            </div>
            <div className="p-4 max-h-32 overflow-y-auto text-xs text-gray-400">
              {navTab === "overview" && <p>Master React Hooks from the ground up. This comprehensive module covers useState, useEffect, useContext, useReducer, and custom hooks with real-world projects.</p>}
              {navTab === "notes" && <textarea value={notesContent} onChange={(e) => setNotesContent(e.target.value)} className="w-full h-20 bg-transparent text-gray-300 focus:outline-none resize-none font-mono" placeholder="Take notes..." />}
              {navTab === "resources" && (
                <div className="space-y-2">
                  {["Lecture Slides.pdf", "Code Samples.zip", "Cheat Sheet.md"].map((f) => (
                    <div key={f} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer transition-colors">
                      <Download className="w-3 h-3 text-blue-400" />
                      <span className="text-gray-300">{f}</span>
                    </div>
                  ))}
                </div>
              )}
              {navTab === "discussion" && (
                <div className="space-y-2">
                  <div className="flex gap-2 items-start p-2 rounded-lg bg-white/[0.02]">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-[9px] text-white font-bold flex-shrink-0">J</div>
                    <div>
                      <span className="text-gray-200 font-medium">Jane</span>
                      <p className="text-gray-500 mt-0.5">Great explanation of useEffect cleanup!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Drag Handle */}
        {mode === "ide" && (
          <div onMouseDown={handleMouseDown} className="w-1.5 flex-shrink-0 cursor-col-resize flex items-center justify-center hover:bg-blue-500/20 transition-colors group/drag relative z-10">
            <div className="w-0.5 h-8 rounded-full bg-white/10 group-hover/drag:bg-blue-400/50 transition-colors" />
          </div>
        )}

        {/* Code Editor (IDE mode) */}
        {mode === "ide" && (
          <div className="flex flex-col border-l border-white/[0.06]" style={{ width: `${editorWidth}%` }}>
            {/* Editor Tabs */}
            <div className={cn("flex items-center h-9 border-b border-white/[0.06] px-2 gap-1", glassBg)}>
              {["App.jsx", "styles.css", "utils.js"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setEditorTab(tab)}
                  className={cn("px-3 py-1.5 rounded-lg text-[10px] font-medium flex items-center gap-1.5 transition-all",
                    editorTab === tab ? "bg-white/[0.06] text-gray-200" : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  <File className="w-3 h-3" />
                  {tab}
                  {editorTab === tab && <X className="w-2.5 h-2.5 text-gray-600 hover:text-gray-300" />}
                </button>
              ))}
              <div className="flex-1" />
              <button className="text-gray-500 hover:text-gray-300 transition-colors"><Plus className="w-3.5 h-3.5" /></button>
            </div>

            {/* Code Area */}
            <div className="flex-1 overflow-auto relative" style={{ background: "#0d1117" }}>
              <div className="flex">
                {/* Line numbers */}
                <div className="py-3 px-3 text-right select-none flex-shrink-0">
                  {code.split("\n").map((_, i) => (
                    <div key={i} className="text-[10px] leading-5 text-gray-600 font-mono">{i + 1}</div>
                  ))}
                </div>
                {/* Code */}
                <div className="flex-1 relative">
                  <textarea
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      // mock autocomplete
                      if (e.target.value.endsWith("use")) setShowAutocomplete(true);
                      else setShowAutocomplete(false);
                    }}
                    className="absolute inset-0 w-full h-full py-3 pr-4 bg-transparent text-[11px] leading-5 text-gray-300 font-mono focus:outline-none resize-none caret-blue-400"
                    spellCheck={false}
                  />
                  {/* Autocomplete Mock */}
                  {showAutocomplete && (
                    <div className={cn("absolute left-32 top-20 w-52 rounded-xl overflow-hidden shadow-2xl shadow-black/60 z-20 animate-scale-in", glass, "bg-[#161b22]/95")}>
                      <div className="px-3 py-1.5 border-b border-white/[0.06] flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span className="text-[9px] text-purple-400 font-medium">AI Suggest</span>
                      </div>
                      {["useState", "useEffect", "useCallback", "useMemo", "useRef"].map((h) => (
                        <button
                          key={h}
                          onClick={() => { setShowAutocomplete(false); }}
                          className="w-full px-3 py-1.5 text-[11px] text-left text-gray-300 hover:bg-blue-500/10 flex items-center gap-2 font-mono transition-colors"
                        >
                          <span className="text-blue-400">⨍</span> {h}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Compile Button */}
            <div className={cn("px-3 py-2 border-t border-white/[0.06] flex items-center gap-2", glassBg)}>
              <button
                onClick={runCode}
                disabled={compiling}
                className={cn(
                  "h-8 px-5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-300",
                  compiling
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02]"
                )}
              >
                {compiling ? <RotateCcw className="w-3 h-3 animate-spin" /> : <PlayIcon className="w-3 h-3" />}
                {compiling ? "Compiling..." : "Compile & Run"}
              </button>
              <button onClick={() => setTerminalOpen(!terminalOpen)} className="h-8 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-gray-400 text-xs font-medium hover:text-gray-200 flex items-center gap-1.5 transition-colors">
                <Terminal className="w-3 h-3" />
                Terminal
              </button>
              <div className="flex-1" />
              <button className="text-gray-500 hover:text-gray-300 transition-colors"><Copy className="w-3.5 h-3.5" /></button>
            </div>

            {/* Terminal */}
            {terminalOpen && (
              <div className={cn("border-t border-white/[0.06] transition-all duration-300", "bg-[#0a0e14]")} style={{ height: 160 }}>
                <div className="flex items-center h-7 px-3 border-b border-white/[0.06] bg-white/[0.02]">
                  <Terminal className="w-3 h-3 text-gray-500 mr-2" />
                  <span className="text-[10px] text-gray-500 font-medium">Output</span>
                  <div className="flex-1" />
                  <button onClick={() => setTerminalOutput([])} className="text-gray-600 hover:text-gray-300 transition-colors"><RotateCcw className="w-3 h-3" /></button>
                  <button onClick={() => setTerminalOpen(false)} className="text-gray-600 hover:text-gray-300 ml-2 transition-colors"><X className="w-3 h-3" /></button>
                </div>
                <div className="p-3 overflow-y-auto h-[calc(100%-28px)] font-mono text-[10px] leading-5">
                  {terminalOutput.length === 0 ? (
                    <span className="text-gray-600">Ready. Click "Compile & Run" to execute.</span>
                  ) : (
                    terminalOutput.map((line, i) => (
                      <div key={i} className={cn(
                        line.startsWith("✓") ? "text-emerald-400" :
                        line.startsWith("⚡") ? "text-amber-400 animate-pulse" :
                        line.startsWith(">") ? "text-cyan-400" :
                        "text-gray-500"
                      )}>
                        {line}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
