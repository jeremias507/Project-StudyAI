import Link from "next/link"
import { FileUp, Sparkles, Brain, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { FeatureCard } from "@/components/feature-card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[oklch(0.85_0.08_280)] opacity-30 blur-3xl" />
          <div className="absolute right-1/4 top-32 h-96 w-96 rounded-full bg-[oklch(0.88_0.06_220)] opacity-30 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[oklch(0.9_0.06_340)] opacity-20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              Impulsado por IA
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Estudia Mejor con{" "}
              <span className="bg-gradient-to-r from-primary to-[oklch(0.75_0.1_200)] bg-clip-text text-transparent">
                IA
              </span>
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Sube PDFs, obtén resúmenes instantáneos con IA y pon a prueba tus
              conocimientos con cuestionarios inteligentes. Transforma tu forma de aprender.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="rounded-full px-8 shadow-md">
                <Link href="/register">
                  Comenzar Gratis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-full px-8"
              >
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border bg-card/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Todo lo que necesitas para estudiar efectivamente
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Nuestras herramientas impulsadas por IA te ayudan a entender, retener y
              dominar cualquier tema más rápido que nunca.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={FileUp}
              title="Subir PDF"
              description="Simplemente arrastra y suelta tus materiales de estudio. Soportamos PDFs, documentos y archivos de texto de cualquier tamaño."
              iconClassName="bg-[oklch(0.85_0.08_280)]"
            />
            <FeatureCard
              icon={Sparkles}
              title="Resumen con IA"
              description="Obtén resúmenes instantáneos e inteligentes que capturan conceptos clave, definiciones y detalles importantes."
              iconClassName="bg-[oklch(0.75_0.1_200)]"
            />
            <FeatureCard
              icon={Brain}
              title="Cuestionarios Inteligentes"
              description="Pon a prueba tus conocimientos con cuestionarios generados por IA adaptados a tus materiales y progreso."
              iconClassName="bg-[oklch(0.9_0.06_340)]"
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Cómo funciona
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tres simples pasos para transformar tu experiencia de estudio
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Sube tus materiales",
                description:
                  "Sube cualquier PDF o documento. Nuestra IA lo procesa en segundos.",
              },
              {
                step: "02",
                title: "Obtén resúmenes con IA",
                description:
                  "Recibe resúmenes claros y concisos destacando la información clave.",
              },
              {
                step: "03",
                title: "Realiza cuestionarios inteligentes",
                description:
                  "Ponte a prueba con cuestionarios personalizados y sigue tu progreso.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-sm">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center shadow-xl sm:px-16">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
                ¿Listo para estudiar mejor?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
                Únete a miles de estudiantes que ya están mejorando sus
                calificaciones con StudyAI.
              </p>
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="mt-8 rounded-full px-8 shadow-md"
              >
                <Link href="/register">
                  Comenzar Gratis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">StudyAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              2026 StudyAI. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
