import { useState } from "react";
import { Send, Search, Paperclip } from "lucide-react";

const conversations = [
  { name: "Alex Johnson", avatar: "AJ", lastMsg: "Thanks for the feedback on my hooks!", time: "5m ago", unread: 1, online: true },
  { name: "Priya Sharma", avatar: "PS", lastMsg: "Can we reschedule tomorrow's session?", time: "20m ago", unread: 1, online: true },
  { name: "Michael Lee", avatar: "ML", lastMsg: "I've pushed the updated API code", time: "2h ago", unread: 0, online: false },
  { name: "Emma Wilson", avatar: "EW", lastMsg: "Please review my latest submission", time: "4h ago", unread: 0, online: false },
  { name: "Carlos Rodriguez", avatar: "CR", lastMsg: "The custom hook is working now!", time: "1d ago", unread: 0, online: true },
];

const messages = [
  { sender: "Alex Johnson", text: "Hi Dr. Chen! I finished the custom hooks assignment.", time: "3:15 PM", mine: false },
  { sender: "You", text: "Great job! I saw your useDebounce implementation - very clean. One suggestion: consider adding a cleanup function.", time: "3:18 PM", mine: true },
  { sender: "Alex Johnson", text: "Thanks for the feedback on my hooks! I'll add the cleanup function and resubmit.", time: "3:20 PM", mine: false },
  { sender: "You", text: "Perfect. Also, let's discuss React.memo optimization patterns in our next session.", time: "3:22 PM", mine: true },
];

export default function MentorMessages() {
  const [selected, setSelected] = useState(0);
  const [msg, setMsg] = useState("");

  return (
    <div className="space-y-4">
      <div className="parallax-section">
        <h1 className="page-title">Messages</h1>
        <p className="page-subtitle">Communicate with your students</p>
      </div>

      <div className="card-premium overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
        <div className="flex h-full">
          <div className="w-72 border-r border-border flex flex-col">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input className="form-input pl-9 text-xs" placeholder="Search students..." />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {conversations.map((c, i) => (
                <button key={i} onClick={() => setSelected(i)} className={`w-full flex items-center gap-3 p-3 text-left transition-colors ${selected === i ? "bg-primary/10" : "hover:bg-accent"}`}>
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">{c.avatar}</div>
                    {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-card" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between"><span className="text-sm font-medium text-foreground">{c.name}</span><span className="text-[10px] text-muted-foreground">{c.time}</span></div>
                    <p className="text-xs text-muted-foreground truncate">{c.lastMsg}</p>
                  </div>
                  {c.unread > 0 && <span className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">{c.unread}</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="p-3 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">{conversations[selected].avatar}</div>
              <div><p className="text-sm font-semibold text-foreground">{conversations[selected].name}</p><p className="text-[10px] text-success">{conversations[selected].online ? "Online" : "Offline"}</p></div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${m.mine ? "gradient-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                    <p className="text-sm">{m.text}</p>
                    <p className={`text-[10px] mt-1 ${m.mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-accent"><Paperclip className="w-4 h-4 text-muted-foreground" /></button>
              <input className="form-input flex-1 text-sm" placeholder="Type a message..." value={msg} onChange={e => setMsg(e.target.value)} />
              <button className="btn-primary text-xs py-2 px-3"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
