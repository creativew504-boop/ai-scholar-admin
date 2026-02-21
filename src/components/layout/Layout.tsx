import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main className={`${isMobile ? "ml-0 pt-[72px]" : "ml-64 pt-[72px]"} min-h-screen transition-all duration-300`}>
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
