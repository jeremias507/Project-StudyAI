"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Upload,
  FileSearch,
  History,
  BarChart3,
  Settings,
  User,
  LogOut,
  Sparkles,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const sidebarItems = [
  {
    name: "Panel",
    href: "/dashboard",
    icon: LayoutDashboard,
    children: [
      { name: "Vista general", href: "/dashboard", icon: BarChart3 },
      { name: "Actividad reciente", href: "/dashboard?view=activity", icon: History },
    ],
  },
  {
    name: "Documentos",
    href: "/documents",
    icon: FileText,
    children: [
      { name: "Mis documentos", href: "/documents", icon: FileText },
      { name: "Subir PDF", href: "/upload", icon: Upload },
      { name: "Resumir", href: "/documents?view=summary", icon: FileSearch },
    ],
  },
  {
    name: "Cuestionarios",
    href: "/quizzes",
    icon: BookOpen,
    children: [
      { name: "Todos los quizzes", href: "/quizzes", icon: BookOpen },
      { name: "Progreso", href: "/quizzes?view=progress", icon: BarChart3 },
    ],
  },
  {
    name: "Cuenta",
    href: "/profile",
    icon: User,
    children: [
      { name: "Perfil", href: "/profile", icon: User },
      { name: "Configuracion", href: "/profile?view=settings", icon: Settings },
    ],
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
                <div key={item.name} className="group/item relative">
                  <Link
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
                    <ChevronRight className="ml-auto hidden h-4 w-4 opacity-60 lg:group-hover:block" />
                  </Link>

                  {/* Desktop hover menu */}
                  {item.children && (
                    <div className="pointer-events-none absolute left-full top-0 z-50 ml-3 hidden min-w-56 translate-x-2 rounded-2xl border border-border/60 bg-background/95 p-2 opacity-0 shadow-2xl shadow-black/15 backdrop-blur-xl transition-all duration-200 lg:block group-hover/item:pointer-events-auto group-hover/item:translate-x-0 group-hover/item:opacity-100">
                      {item.children.map((child) => {
                        const childActive = pathname === child.href
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                              childActive
                                ? "bg-primary text-primary-foreground"
                                : "text-foreground/85 hover:bg-muted"
                            )}
                          >
                            <child.icon className="h-4 w-4" />
                            {child.name}
                          </Link>
                        )
                      })}
                    </div>
                  )}

                  {/* Mobile inline submenu */}
                  {mobileOpen && item.children && (
                    <div className="mt-1 space-y-1 pl-11 lg:hidden">
                      {item.children.map((child) => {
                        const childActive = pathname === child.href
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-3 py-2 text-xs",
                              childActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                            )}
                          >
                            <child.icon className="h-3.5 w-3.5" />
                            {child.name}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
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
