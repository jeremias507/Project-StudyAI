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
  ChevronDown,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Simulated data - adapt to your real data
const projectStats = {
  totalDocuments: 12,
  quizzesCompleted: 28,
  studyProgress: 78,
  lastActivity: "Hace 2 horas"
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
      {/* Project Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold text-foreground">StudyAI</h1>
          <Badge variant="outline" className="rounded-md border-border/60 bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            ESTUDIANTE
          </Badge>
        </div>
        
        {/* Project URL */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            studyai.vercel.app/dashboard
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-7 gap-1.5 rounded-md border-border/60 bg-muted/30 px-2 text-xs hover:bg-muted/50"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-green-500" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copiar
              </>
            )}
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </div>
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

          {/* Progress Card */}
          <div className="flex items-center gap-4 rounded-lg border border-border/40 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border/40 bg-muted/30">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                PROGRESO
              </p>
              <p className="text-lg font-medium text-foreground">
                {projectStats.studyProgress}% completado
              </p>
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
