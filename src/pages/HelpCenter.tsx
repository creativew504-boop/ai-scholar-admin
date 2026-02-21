import { useState } from "react";
import {
  Search, User, BookOpen, CreditCard, Award, Wrench, GraduationCap,
  ChevronDown, ChevronRight, MessageCircle, Mail, Send, ThumbsUp, ThumbsDown, ArrowLeft, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { icon: User, label: "Account", desc: "Profile, login, security", count: 12 },
  { icon: BookOpen, label: "Courses", desc: "Enrollment, progress, certificates", count: 18 },
  { icon: CreditCard, label: "Payments", desc: "Billing, refunds, invoices", count: 9 },
  { icon: Award, label: "Certificates", desc: "Verification, downloads", count: 6 },
  { icon: Wrench, label: "Technical", desc: "Browser, app, connectivity", count: 14 },
  { icon: GraduationCap, label: "Instructors", desc: "Teaching tools, analytics", count: 8 },
];

const faqs: Record<string, { q: string; a: string }[]> = {
  Account: [
    { q: "How do I reset my password?", a: "Go to Settings → Security → Change Password. You can also use the 'Forgot Password' link on the login page to receive a reset email." },
    { q: "How do I update my profile picture?", a: "Navigate to Settings → Profile and click on your avatar to upload a new image. Supported formats are JPG, PNG, and WebP." },
    { q: "Can I change my email address?", a: "Yes, go to Settings → Account → Email. You'll need to verify the new email address before the change takes effect." },
  ],
  Courses: [
    { q: "How do I enroll in a course?", a: "Browse the Courses section, select a course, and click 'Enroll Now'. If it's a paid course, you'll be directed to the payment page first." },
    { q: "Can I download course materials?", a: "Yes, most courses allow downloading resources. Look for the download icon in the Resources tab of each lesson." },
    { q: "How is course progress tracked?", a: "Progress is automatically tracked as you complete lessons and quizzes. You can view your progress on the Dashboard or Course page." },
  ],
  Payments: [
    { q: "What payment methods are accepted?", a: "We accept credit/debit cards (Visa, Mastercard, Amex), UPI, net banking, and PayPal." },
    { q: "How do I request a refund?", a: "You can request a refund within 7 days of purchase by going to Payments → Transaction History → Request Refund." },
  ],
  Certificates: [
    { q: "When do I receive my certificate?", a: "Certificates are issued automatically upon completing 100% of the course content and passing the final assessment." },
    { q: "How can I verify a certificate?", a: "Each certificate has a unique verification code. Enter it at aischolar.io/verify to confirm authenticity." },
  ],
  Technical: [
    { q: "The video player isn't working", a: "Try clearing your browser cache, disabling extensions, or switching browsers. Make sure you have a stable internet connection." },
    { q: "Code editor is not loading", a: "The code editor requires a modern browser (Chrome, Firefox, Edge). Disable any ad blockers and try refreshing the page." },
  ],
  Instructors: [
    { q: "How do I create a course?", a: "Go to Courses → Add Course. Follow the step-by-step wizard to set up your course content, pricing, and curriculum." },
    { q: "How do I view my earnings?", a: "Navigate to Reports → Revenue to see your earning breakdown, pending payouts, and payment history." },
  ],
};

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<{ q: string; a: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [showTicket, setShowTicket] = useState(false);

  const currentFaqs = activeCategory ? faqs[activeCategory] || [] : [];

  if (activeArticle) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
        <button onClick={() => { setActiveArticle(null); setFeedback(null); }} className="flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to {activeCategory}
        </button>
        <div className="card-premium p-6 space-y-4">
          <h1 className="text-lg font-bold text-foreground">{activeArticle.q}</h1>
          <div className="flex gap-2 flex-wrap">
            <span className="badge-primary">{activeCategory}</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />Updated 2 days ago</span>
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-sm text-foreground leading-relaxed">{activeArticle.a}</p>
          </div>
          <div className="border-t border-border pt-4 flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Was this helpful?</span>
            <button onClick={() => setFeedback("up")} className={cn("p-2 rounded-lg border transition-all", feedback === "up" ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent text-muted-foreground")}>
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button onClick={() => setFeedback("down")} className={cn("p-2 rounded-lg border transition-all", feedback === "down" ? "border-destructive bg-destructive/10 text-destructive" : "border-border hover:bg-accent text-muted-foreground")}>
              <ThumbsDown className="w-4 h-4" />
            </button>
            {feedback && <span className="text-xs text-muted-foreground">Thanks for your feedback!</span>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="text-center space-y-3 py-4">
        <h1 className="text-2xl font-bold text-foreground">How can we help?</h1>
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-card"
            placeholder="Search for help articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {!activeCategory ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className="card-premium p-5 text-left hover-lift group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{cat.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cat.desc}</p>
                <p className="text-xs text-primary mt-2">{cat.count} articles →</p>
              </button>
            ))}
          </div>

          {/* Contact */}
          <div className="card-premium p-6">
            <h2 className="text-sm font-bold text-foreground mb-4">Still need help?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button className="p-4 rounded-xl border border-border hover:bg-accent transition-all text-center space-y-2">
                <MessageCircle className="w-6 h-6 mx-auto text-primary" />
                <p className="text-xs font-semibold text-foreground">Live Chat</p>
                <p className="text-[10px] text-muted-foreground">Available 24/7</p>
              </button>
              <button className="p-4 rounded-xl border border-border hover:bg-accent transition-all text-center space-y-2">
                <Mail className="w-6 h-6 mx-auto text-primary" />
                <p className="text-xs font-semibold text-foreground">Email Support</p>
                <p className="text-[10px] text-muted-foreground">support@aischolar.io</p>
              </button>
              <button onClick={() => setShowTicket(true)} className="p-4 rounded-xl border border-border hover:bg-accent transition-all text-center space-y-2">
                <Send className="w-6 h-6 mx-auto text-primary" />
                <p className="text-xs font-semibold text-foreground">Submit Ticket</p>
                <p className="text-[10px] text-muted-foreground">Get reply in 24hrs</p>
              </button>
            </div>
          </div>

          {showTicket && (
            <div className="card-premium p-6 space-y-4">
              <h3 className="text-sm font-bold text-foreground">Submit a Support Ticket</h3>
              <input className="form-input" placeholder="Subject" />
              <select className="form-input"><option>Select category</option>{categories.map((c) => <option key={c.label}>{c.label}</option>)}</select>
              <textarea className="form-input min-h-[100px]" placeholder="Describe your issue..." />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowTicket(false)} className="btn-secondary text-xs">Cancel</button>
                <button className="btn-primary text-xs">Submit Ticket</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <button onClick={() => setActiveCategory(null)} className="flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Help Center
          </button>
          <h2 className="text-lg font-bold text-foreground">{activeCategory}</h2>
          <div className="space-y-2">
            {currentFaqs.map((faq, i) => (
              <div key={i} className="card-premium overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-sm font-medium text-foreground">{faq.q}</span>
                  <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", openFaq === i && "rotate-180")} />
                </button>
                <div className={cn("overflow-hidden transition-all duration-300", openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0")}>
                  <div className="px-4 pb-4 flex items-start justify-between gap-4">
                    <p className="text-sm text-muted-foreground flex-1">{faq.a}</p>
                    <button onClick={() => setActiveArticle(faq)} className="text-xs text-primary hover:underline whitespace-nowrap flex items-center gap-1">
                      Full article <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
