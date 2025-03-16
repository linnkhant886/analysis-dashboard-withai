import { ReactNode } from "react";
import AppSidebar from "../components/AppSidebar";
import TopBar from "../components/Topbar";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <div className="flex  min-h-screen">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <TopBar />
          {children}
        </div>
      </div>
    </div>
  );
}
