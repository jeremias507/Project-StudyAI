"use client"

import Link from "next/link"
import { useState } from "react"
import { 
  FileText, 
  BookOpen, 
  TrendingUp, 
  Upload, 
  Activity,
  Clock,
  FolderOpen,
  Check,
  Copy,
  Sparkles,
  User,
  Settings,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

// Simulated data - adapt to your real data
const projectStats = {
  totalDocuments: 12,
  quizzesCompleted: 28,
  studyProgress: 78,
  lastActivity: "Hace 2 horas"
}

const userData = {
  name: "Estudiante",
  email: "estudiante@email.com",
  avatar: null
}

export default function DashboardPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("https://studyai.vercel.app/dashboard")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Top Bar with Profile */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Profile Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-sm font-semibold text-white ring-2 ring-border/40 transition-all hover:ring-emerald-500/50 focus:outline-none focus:ring-emerald-500/50">
                {userData.avatar ? (
                  <img src={userData.avatar} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <span>{userData.name.charAt(0).toUpperCase()}</span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 border-border/60 bg-card">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground">{userData.name}</p>
                <p className="text-xs text-muted-foreground">{userData.email}</p>
              </div>
              <DropdownMenuSeparator className="bg-border/60" />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Mi Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/profile?view=settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Configuracion</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/60" />
              <DropdownMenuItem asChild className="cursor-pointer text-destructive focus:text-destructive">
                <Link href="/" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesion</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Project Name and Badge */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-foreground">StudyAI</h1>
              <Badge variant="outline" className="rounded-md border-border/60 bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                ESTUDIANTE
              </Badge>
            </div>
            {/* Project URL */}
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                studyai.vercel.app/dashboard
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-6 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-500">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copiar</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Right side - Quick Upload */}
        <Button
          asChild
          size="sm"
          className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <Link href="/upload">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Subir Documento</span>
          </Link>
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left Column - Status Cards */}
        <div className="space-y-3">
          {/* Status Card */}
          <div className="flex items-center gap-4 rounded-lg border border-border/40 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border/40 bg-muted/30">
              <div className="grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                ESTADO
              </p>
              <p className="text-lg font-medium text-foreground">Activo</p>
            </div>
          </div>

          {/* Documents Card */}
          <div className="flex items-center gap-4 rounded-lg border border-border/40 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border/40 bg-muted/30">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                DOCUMENTOS
              </p>
              <p className="text-lg font-medium text-foreground">
                {projectStats.totalDocuments} archivos
              </p>
            </div>
          </div>

          {/* Quizzes Card */}
          <div className="flex items-center gap-4 rounded-lg border border-border/40 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border/40 bg-muted/30">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                CUESTIONARIOS
              </p>
              <p className="text-lg font-medium text-foreground">
                {projectStats.quizzesCompleted} completados
              </p>
            </div>
          </div>

          {/* Progress Card with Bar */}
          <div className="rounded-lg border border-border/40 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border/40 bg-muted/30">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  PROGRESO GENERAL
                </p>
                <p className="text-lg font-medium text-foreground">
                  {projectStats.studyProgress}% completado
                </p>
              </div>
            </div>
            <div className="mt-3">
              <Progress value={projectStats.studyProgress} className="h-2 bg-muted/50" />
            </div>
          </div>
        </div>

        {/* Right Column - AI Assistant Card */}
        <div className="space-y-4">
          <div className="rounded-lg border border-border/40 bg-card/50 p-5 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 ring-1 ring-emerald-500/30">
                <Sparkles className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">Asistente IA</p>
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-muted/50">
                    <Activity className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Genera resumenes y cuestionarios
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground/70">
                  Powered by AI
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Acciones Rapidas
            </p>
            <div className="space-y-2">
              <Button
                asChild
                variant="outline"
                className="w-full justify-start gap-3 border-border/40 bg-card/50 hover:bg-muted/50"
              >
                <Link href="/upload">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span>Subir Documento</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start gap-3 border-border/40 bg-card/50 hover:bg-muted/50"
              >
                <Link href="/documents">
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                  <span>Ver Documentos</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start gap-3 border-border/40 bg-card/50 hover:bg-muted/50"
              >
                <Link href="/quizzes">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>Mis Cuestionarios</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Last Activity */}
          <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-muted/20 p-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Ultima actividad: {projectStats.lastActivity}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
