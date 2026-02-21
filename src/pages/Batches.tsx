import { useState } from "react";
import { Layers, Users, Calendar, Clock, Plus, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const batches = [
  { id: "B-2024-01", name: "Full Stack Bootcamp — Batch 1", students: 45, startDate: "Jan 15, 2024", endDate: "Apr 15, 2024", status: "Active", progress: 68 },
  { id: "B-2024-02", name: "Data Science Intensive — Batch 3", students: 32, startDate: "Feb 1, 2024", endDate: "May 1, 2024", status: "Active", progress: 42 },
  { id: "B-2024-03", name: "React Native — Batch 2", students: 28, startDate: "Mar 10, 2024", endDate: "Jun 10, 2024", status: "Upcoming", progress: 0 },
  { id: "B-2023-12", name: "Python Fundamentals — Batch 5", students: 50, startDate: "Oct 1, 2023", endDate: "Dec 31, 2023", status: "Completed", progress: 100 },
  { id: "B-2024-04", name: "DevOps Mastery — Batch 1", students: 20, startDate: "Apr 1, 2024", endDate: "Jul 1, 2024", status: "Upcoming", progress: 0 },
];

const statusStyle: Record<string, string> = {
  Active: "badge-success",
  Upcoming: "badge-warning",
  Completed: "badge-primary",
};

export default function Batches() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="section-header">
        <div>
          <h1 className="page-title">Batches</h1>
          <p className="page-subtitle">Manage student batches and cohorts</p>
        </div>
        <button className="btn-primary"><Plus className="w-4 h-4" /> New Batch</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Active Batches", value: batches.filter((b) => b.status === "Active").length, color: "text-success" },
          { label: "Upcoming", value: batches.filter((b) => b.status === "Upcoming").length, color: "text-warning" },
          { label: "Total Students", value: batches.reduce((a, b) => a + b.students, 0), color: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={cn("text-2xl font-bold mt-1", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card-premium overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Batch", "Students", "Duration", "Status", "Progress", ""].map((h) => (
                <th key={h} className="table-header text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {batches.map((b) => (
              <tr key={b.id} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-semibold text-foreground">{b.name}</p>
                  <p className="text-xs text-muted-foreground">{b.id}</p>
                </td>
                <td className="px-4 py-3 flex items-center gap-1 text-muted-foreground"><Users className="w-3.5 h-3.5" />{b.students}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{b.startDate} — {b.endDate}</td>
                <td className="px-4 py-3"><span className={statusStyle[b.status]}>{b.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                      <div className="h-full rounded-full gradient-primary transition-all duration-500" style={{ width: `${b.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{b.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3"><button className="p-1 rounded hover:bg-accent"><MoreVertical className="w-4 h-4 text-muted-foreground" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
