import Link from "next/link"
import { FileText, BookOpen, TrendingUp, Upload, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Datos de ejemplo
const recentDocuments = [
  { id: 1, title: "Introducción al Machine Learning", date: "8 Mar, 2026" },
  { id: 2, title: "Notas de Cálculo II", date: "6 Mar, 2026" },
  { id: 3, title: "Biología Capítulo 5", date: "5 Mar, 2026" },
]

const recentQuizzes = [
  { id: 1, title: "Quiz de Fundamentos de ML", score: 85, date: "8 Mar, 2026" },
  { id: 2, title: "Derivadas de Cálculo", score: 92, date: "7 Mar, 2026" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            ¡Bienvenido de nuevo, Estudiante!
          </h1>
          <p className="mt-1 text-muted-foreground">
            {"Esto es lo que está pasando con tus estudios hoy."}
          </p>
        </div>
        <Button asChild className="rounded-xl shadow-sm">
          <Link href="/upload">
            <Upload className="mr-2 h-4 w-4" />
            Subir Nuevo PDF
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={FileText}
          title="Total Documentos"
          value={12}
          subtitle="3 agregados esta semana"
          iconClassName="bg-[oklch(0.85_0.08_280)]"
        />
        <StatCard
          icon={BookOpen}
          title="Cuestionarios Completados"
          value={28}
          subtitle="5 esta semana"
          iconClassName="bg-[oklch(0.75_0.1_200)]"
        />
        <StatCard
          icon={TrendingUp}
          title="Progreso de Estudio"
          value="78%"
          subtitle="+12% desde la semana pasada"
          iconClassName="bg-[oklch(0.9_0.06_160)]"
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Documents */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Documentos Recientes</CardTitle>
              <CardDescription>Tus materiales de estudio subidos recientemente</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-primary">
              <Link href="/documents">
                Ver todos
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDocuments.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/summary/${doc.id}`}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.85_0.08_280)]">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-foreground">{doc.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{doc.date}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Quizzes */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Cuestionarios Recientes</CardTitle>
              <CardDescription>Tus últimos resultados de cuestionarios</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-primary">
              <Link href="/quizzes">
                Ver todos
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/30 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.75_0.1_200)]">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{quiz.title}</p>
                      <p className="text-sm text-muted-foreground">{quiz.date}</p>
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(0.9_0.06_160)] text-sm font-semibold text-foreground">
                    {quiz.score}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
