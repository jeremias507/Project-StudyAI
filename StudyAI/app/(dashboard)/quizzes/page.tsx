import Link from "next/link"
import { BookOpen, Trophy, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Datos de ejemplo
const quizzes = [
  { id: 1, title: "Quiz de Fundamentos de ML", score: 85, questions: 10, completedAt: "8 Mar, 2026", documentId: 1 },
  { id: 2, title: "Derivadas de Cálculo", score: 92, questions: 8, completedAt: "7 Mar, 2026", documentId: 2 },
  { id: 3, title: "Estructura Celular en Biología", score: 78, questions: 12, completedAt: "5 Mar, 2026", documentId: 3 },
  { id: 4, title: "Leyes del Movimiento en Física", score: 88, questions: 10, completedAt: "4 Mar, 2026", documentId: 4 },
  { id: 5, title: "Historia de la Antigua Roma", score: null, questions: 15, completedAt: null, documentId: 5 },
  { id: 6, title: "Química Orgánica Básica", score: null, questions: 10, completedAt: null, documentId: 6 },
]

function getScoreColor(score: number) {
  if (score >= 90) return "bg-[oklch(0.9_0.06_160)] text-[oklch(0.4_0.1_160)]"
  if (score >= 70) return "bg-[oklch(0.88_0.06_220)] text-[oklch(0.4_0.1_220)]"
  return "bg-[oklch(0.9_0.06_340)] text-[oklch(0.5_0.1_340)]"
}

export default function QuizzesPage() {
  const completedQuizzes = quizzes.filter(q => q.score !== null)
  const pendingQuizzes = quizzes.filter(q => q.score === null)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Cuestionarios
        </h1>
        <p className="mt-1 text-muted-foreground">
          Sigue tu progreso y pon a prueba tus conocimientos
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.85_0.08_280)]">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{quizzes.length}</p>
              <p className="text-sm text-muted-foreground">Total Cuestionarios</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.9_0.06_160)]">
              <Trophy className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{completedQuizzes.length}</p>
              <p className="text-sm text-muted-foreground">Completados</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.88_0.06_220)]">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingQuizzes.length}</p>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Quizzes */}
      {pendingQuizzes.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Listos para Realizar</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pendingQuizzes.map((quiz) => (
              <Link key={quiz.id} href={`/quiz/${quiz.documentId}`}>
                <Card className="h-full border-border/50 transition-all hover:shadow-md hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                      <BookOpen className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="line-clamp-2 text-base">{quiz.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {quiz.questions} preguntas
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Completed Quizzes */}
      {completedQuizzes.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Completados</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completedQuizzes.map((quiz) => (
              <Link key={quiz.id} href={`/quiz/${quiz.documentId}`}>
                <Card className="h-full border-border/50 transition-all hover:shadow-md hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-start justify-between pb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.75_0.1_200)]">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-sm font-semibold",
                        getScoreColor(quiz.score!)
                      )}
                    >
                      {quiz.score}%
                    </span>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="line-clamp-2 text-base">{quiz.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {quiz.questions} preguntas &middot; {quiz.completedAt}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
