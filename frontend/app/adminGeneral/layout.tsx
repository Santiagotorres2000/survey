"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar"

export default function AdminGeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar/>
        <main className="flex-1 p-4">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}