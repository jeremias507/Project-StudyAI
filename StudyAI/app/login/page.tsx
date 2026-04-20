import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export default function LoginPage() {
  return (
    <div className="relative min-h-screen">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[oklch(0.85_0.08_280)] opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[oklch(0.88_0.06_220)] opacity-20 blur-3xl" />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-semibold text-foreground">StudyAI</span>
        </Link>

        {/* Login Card */}
        <Card className="w-full max-w-md border-border/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Bienvenido de nuevo</CardTitle>
            <CardDescription>
              Inicia sesión en tu cuenta para continuar aprendiendo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@ejemplo.com"
                    className="h-11 rounded-xl"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    className="h-11 rounded-xl"
                  />
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-xl shadow-sm"
              >
                Iniciar Sesión
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {"¿No tienes una cuenta? "}
                <Link
                  href="/register"
                  className="font-medium text-primary hover:underline"
                >
                  Regístrate
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
