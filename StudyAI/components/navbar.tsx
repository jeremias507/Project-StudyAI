"use client"

import Link from "next/link"
import { BookOpen, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  showAuthButtons?: boolean
}

export function Navbar({ showAuthButtons = true }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">StudyAI</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Funciones
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Cómo Funciona
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Precios
          </Link>
        </div>

        {showAuthButtons && (
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild className="rounded-full px-6">
              <Link href="/register">Comenzar</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
