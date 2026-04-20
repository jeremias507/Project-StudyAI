"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Datos del cuestionario de ejemplo
const quizData = {
  title: "Cuestionario de Introducción al Machine Learning",
  questions: [
    {
      id: 1,
      question: "¿Qué es el Machine Learning?",
      options: [
        "Un lenguaje de programación",
        "Un subconjunto de IA que permite a los sistemas aprender de los datos",
        "Un tipo de hardware de computadora",
        "Un sistema de gestión de bases de datos",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "¿Qué tipo de aprendizaje usa datos de entrenamiento etiquetados?",
      options: [
        "Aprendizaje No Supervisado",
        "Aprendizaje por Refuerzo",
        "Aprendizaje Supervisado",
        "Aprendizaje por Transferencia",
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "¿Qué es el sobreajuste en machine learning?",
      options: [
        "Cuando un modelo es demasiado simple",
        "Cuando un modelo funciona bien con datos de entrenamiento pero mal con datos nuevos",
        "Cuando un modelo se entrena con muy pocos datos",
        "Cuando un modelo es demasiado rápido",
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "¿Cuál de los siguientes NO es un algoritmo común de ML?",
      options: [
        "Regresión Lineal",
        "Árboles de Decisión",
        "Redes Neuronales",
        "Consulta SQL",
      ],
      correctAnswer: 3,
    },
    {
      id: 5,
      question: "¿Qué es una 'característica' en machine learning?",
      options: [
        "Un error en el código",
        "Una propiedad individual medible de los datos",
        "La salida final de un modelo",
        "Un tipo de red neuronal",
      ],
      correctAnswer: 1,
    },
  ],
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quizData.questions.length).fill(null)
  )
  const [showResults, setShowResults] = useState(false)

  const question = quizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = index
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(answers[currentQuestion + 1])
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1])
    }
  }

  const calculateScore = () => {
    let correct = 0
    answers.forEach((answer, index) => {
      if (answer === quizData.questions[index].correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const score = calculateScore()
  const percentage = Math.round((score / quizData.questions.length) * 100)

  if (showResults) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="border-border/50 text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[oklch(0.9_0.06_160)]">
              <Trophy className="h-10 w-10 text-foreground" />
            </div>
            <CardTitle className="text-2xl">¡Cuestionario Completado!</CardTitle>
            <CardDescription>{quizData.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-2xl bg-muted/30 p-8">
              <p className="text-5xl font-bold text-foreground">{percentage}%</p>
              <p className="mt-2 text-muted-foreground">
                Obtuviste {score} de {quizData.questions.length} preguntas correctas
              </p>
            </div>

            {/* Answer Review */}
            <div className="space-y-3 text-left">
              {quizData.questions.map((q, index) => {
                const isCorrect = answers[index] === q.correctAnswer
                return (
                  <div
                    key={q.id}
                    className={cn(
                      "flex items-center gap-3 rounded-xl p-3",
                      isCorrect ? "bg-[oklch(0.9_0.06_160)]/30" : "bg-destructive/10"
                    )}
                  >
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 shrink-0 text-[oklch(0.5_0.15_160)]" />
                    ) : (
                      <XCircle className="h-5 w-5 shrink-0 text-destructive" />
                    )}
                    <span className="text-sm text-foreground">
                      P{index + 1}: {q.question}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => {
                  setCurrentQuestion(0)
                  setSelectedAnswer(null)
                  setAnswers(new Array(quizData.questions.length).fill(null))
                  setShowResults(false)
                }}
              >
                Reintentar Cuestionario
              </Button>
              <Button asChild className="flex-1 rounded-xl">
                <Link href="/dashboard">Volver al Panel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="shrink-0">
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground sm:text-xl">
            {quizData.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Pregunta {currentQuestion + 1} de {quizData.questions.length}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Card */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all",
                selectedAnswer === index
                  ? "border-primary bg-primary/10"
                  : "border-border/50 hover:border-primary/50 hover:bg-muted/30"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold transition-colors",
                  selectedAnswer === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-foreground">{option}</span>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="rounded-xl"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="rounded-xl"
        >
          {currentQuestion === quizData.questions.length - 1 ? (
            "Terminar Cuestionario"
          ) : (
            <>
              Siguiente
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
