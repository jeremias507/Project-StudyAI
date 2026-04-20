"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  User,
  LogOut,
  Sparkles,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const sidebarItems = [
  {
    name: "Panel",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Documentos",
    href: "/documents",
    icon: FileText,
  },
  {
    name: "Cuestionarios",
    href: "/quizzes",
    icon: BookOpen,
  },
  {
    name: "Cuenta",
    href: "/profile",
    icon: User,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed right-4 top-4 z-50 rounded-full border border-border/40 bg-card/80 backdrop-blur-sm lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-20 border-r border-border/60 bg-background/80 backdrop-blur-xl transition-all duration-300 lg:hover:w-72 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="group flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-border/60 px-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden text-lg font-semibold tracking-tight text-foreground lg:group-hover:block">
              StudyAI
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-3">
            {sidebarItems.map((item) => {
              const isActive =
                pathname === item.href || item.children?.some((child) => pathname === child.href)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/15 text-foreground ring-1 ring-primary/30"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="hidden lg:group-hover:block">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="border-t border-border/60 p-3">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/70 hover:text-foreground"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span className="hidden lg:group-hover:block">Cerrar Sesion</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
