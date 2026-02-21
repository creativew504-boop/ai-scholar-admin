import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import Schedule from "./pages/Schedule";
import Reports from "./pages/Reports";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import VideoPlayer from "./pages/VideoPlayer";
import NotFound from "./pages/NotFound";
import AddCourse from "./pages/AddCourse";
import CourseCategories from "./pages/CourseCategories";
import Batches from "./pages/Batches";
import StudentIdCards from "./pages/StudentIdCards";
import StudentPayments from "./pages/StudentPayments";
import HelpCenter from "./pages/HelpCenter";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/courses/add" element={<Layout><AddCourse /></Layout>} />
          <Route path="/courses/categories" element={<Layout><CourseCategories /></Layout>} />
          <Route path="/courses/batches" element={<Layout><Batches /></Layout>} />
          <Route path="/students" element={<Layout><Students /></Layout>} />
          <Route path="/students/id-cards" element={<Layout><StudentIdCards /></Layout>} />
          <Route path="/students/payments" element={<Layout><StudentPayments /></Layout>} />
          <Route path="/schedule" element={<Layout><Schedule /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/payments" element={<Layout><Payments /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
          <Route path="/help" element={<Layout><HelpCenter /></Layout>} />
          <Route path="/player" element={<VideoPlayer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
