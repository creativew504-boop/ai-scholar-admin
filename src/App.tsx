import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import StudentDashboard from "./pages/StudentDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import StudentCourses from "./pages/StudentCourses";
import StudentAssignments from "./pages/StudentAssignments";
import StudentLiveClasses from "./pages/StudentLiveClasses";
import StudentMentors from "./pages/StudentMentors";
import StudentCertificates from "./pages/StudentCertificates";
import StudentDiscussions from "./pages/StudentDiscussions";
import StudentMessages from "./pages/StudentMessages";
import StudentNotifications from "./pages/StudentNotifications";
import StudentCalendar from "./pages/StudentCalendar";
import StudentProgress from "./pages/StudentProgress";
import StudentPaymentsPage from "./pages/StudentPaymentsPage";
import StudentProfile from "./pages/StudentProfile";
import SharedSettings from "./pages/SharedSettings";
import MentorStudents from "./pages/MentorStudents";
import MentorCourses from "./pages/MentorCourses";
import MentorAssignmentsReview from "./pages/MentorAssignmentsReview";
import MentorSessions from "./pages/MentorSessions";
import MentorMessages from "./pages/MentorMessages";
import MentorAnalytics from "./pages/MentorAnalytics";
import MentorSchedule from "./pages/MentorSchedule";
import MentorProfile from "./pages/MentorProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/student" replace />} />
          {/* Student Routes */}
          <Route path="/student" element={<Layout><StudentDashboard /></Layout>} />
          <Route path="/student/courses" element={<Layout><StudentCourses /></Layout>} />
          <Route path="/student/assignments" element={<Layout><StudentAssignments /></Layout>} />
          <Route path="/student/live-classes" element={<Layout><StudentLiveClasses /></Layout>} />
          <Route path="/student/mentors" element={<Layout><StudentMentors /></Layout>} />
          <Route path="/student/certificates" element={<Layout><StudentCertificates /></Layout>} />
          <Route path="/student/discussions" element={<Layout><StudentDiscussions /></Layout>} />
          <Route path="/student/messages" element={<Layout><StudentMessages /></Layout>} />
          <Route path="/student/notifications" element={<Layout><StudentNotifications /></Layout>} />
          <Route path="/student/calendar" element={<Layout><StudentCalendar /></Layout>} />
          <Route path="/student/progress" element={<Layout><StudentProgress /></Layout>} />
          <Route path="/student/payments" element={<Layout><StudentPaymentsPage /></Layout>} />
          <Route path="/student/profile" element={<Layout><StudentProfile /></Layout>} />
          <Route path="/student/settings" element={<Layout><SharedSettings /></Layout>} />
          {/* Mentor Routes */}
          <Route path="/mentor" element={<Layout><MentorDashboard /></Layout>} />
          <Route path="/mentor/students" element={<Layout><MentorStudents /></Layout>} />
          <Route path="/mentor/courses" element={<Layout><MentorCourses /></Layout>} />
          <Route path="/mentor/assignments" element={<Layout><MentorAssignmentsReview /></Layout>} />
          <Route path="/mentor/sessions" element={<Layout><MentorSessions /></Layout>} />
          <Route path="/mentor/messages" element={<Layout><MentorMessages /></Layout>} />
          <Route path="/mentor/analytics" element={<Layout><MentorAnalytics /></Layout>} />
          <Route path="/mentor/schedule" element={<Layout><MentorSchedule /></Layout>} />
          <Route path="/mentor/profile" element={<Layout><MentorProfile /></Layout>} />
          <Route path="/mentor/settings" element={<Layout><SharedSettings /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
