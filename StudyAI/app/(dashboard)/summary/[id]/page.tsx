import Link from "next/link"
import { ArrowLeft, FileText, BookOpen, CheckCircle, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Datos de ejemplo
const documentData = {
  id: 1,
  title: "Introducción al Machine Learning",
  uploadedAt: "8 de Marzo, 2026",
  summary: `El Machine Learning (ML) o Aprendizaje Automático es un subconjunto de la inteligencia artificial que permite a los sistemas aprender y mejorar a partir de la experiencia sin ser programados explícitamente. Este documento cubre los conceptos fundamentales, algoritmos y aplicaciones del aprendizaje automático en la computación moderna.

El campo abarca tres tipos principales de aprendizaje: aprendizaje supervisado, donde el algoritmo aprende de datos de entrenamiento etiquetados; aprendizaje no supervisado, que encuentra patrones ocultos en datos no etiquetados; y aprendizaje por refuerzo, donde un agente aprende a tomar decisiones mediante prueba y error.`,
  keyPoints: [
    "El Machine Learning es un subconjunto de la IA enfocado en aprender de los datos",
    "Tres tipos principales: Supervisado, No Supervisado y por Refuerzo",
    "El aprendizaje supervisado usa datos etiquetados para el entrenamiento",
    "El aprendizaje no supervisado descubre patrones ocultos en datos no etiquetados",
    "El aprendizaje por refuerzo optimiza decisiones mediante prueba y error",
    "Los algoritmos comunes incluyen Regresión Lineal, Árboles de Decisión y Redes Neuronales",
    "Las aplicaciones abarcan salud, finanzas, vehículos autónomos y más",
  ],
  importantTerms: [
    { term: "Característica", definition: "Una propiedad individual medible de los datos" },
    { term: "Modelo", definition: "Una representación matemática aprendida de los datos" },
    { term: "Entrenamiento", definition: "El proceso de enseñar a un modelo usando datos" },
    { term: "Sobreajuste", definition: "Cuando un modelo funciona bien con datos de entrenamiento pero mal con datos nuevos" },
  ],
}

export default async function SummaryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="shrink-0">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">
              {documentData.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              Subido el {documentData.uploadedAt}
            </p>
          </div>
        </div>
        <Button asChild className="rounded-xl shadow-sm">
          <Link href={`/quiz/${id}`}>
            <BookOpen className="mr-2 h-4 w-4" />
            Crear Cuestionario
          </Link>
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.85_0.08_280)]">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Resumen con IA</CardTitle>
              <CardDescription>Resumen generado de tu documento</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line leading-relaxed text-foreground">
            {documentData.summary}
          </p>
        </CardContent>
      </Card>

      {/* Key Points Card */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.75_0.1_200)]">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Puntos Clave</CardTitle>
              <CardDescription>Los conceptos más importantes de este documento</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {documentData.keyPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-3 rounded-xl bg-muted/30 p-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Important Terms Card */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.9_0.06_160)]">
              <Lightbulb className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <CardTitle>Términos Importantes</CardTitle>
              <CardDescription>Vocabulario clave y definiciones</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {documentData.importantTerms.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-border/50 bg-muted/20 p-4"
              >
                <p className="font-semibold text-foreground">{item.term}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
