import ClientSessionProvider from "@/components/ClientSessionProvider";
import { DashboardProvider } from "@/components/custom/adminPanel/dashboard/DashboardContext";
import HeaderWrapper from "@/components/custom/adminPanel/header/HeaderWrapper";
import SidebarWrapper from "@/components/custom/adminPanel/sidebar/SidebarWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <DashboardProvider>
        <ClientSessionProvider>
          <div className="flex flex-row bg-gray-100 h-screen">
            <div className="hidden lg:block">
              <SidebarWrapper />
            </div>
            <div className="min-h-screen  overflow-y-auto grow flex flex-col">
              <div className="lg:hidden">
                <HeaderWrapper />
              </div>
              <main>{children}</main>
            </div>
          </div>
        </ClientSessionProvider>
      </DashboardProvider>
    </div>
  );
}
