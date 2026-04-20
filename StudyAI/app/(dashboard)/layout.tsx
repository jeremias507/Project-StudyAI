import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background dark">
      <DashboardSidebar />
      <main className="lg:pl-24">
        <div className="min-h-screen p-4 pt-16 sm:p-6 sm:pt-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
