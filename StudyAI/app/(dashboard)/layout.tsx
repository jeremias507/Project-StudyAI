import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/30">
      <DashboardSidebar />
      <main className="lg:pl-24">
        <div className="min-h-screen p-4 pt-20 sm:p-6 lg:p-10 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  )
}
