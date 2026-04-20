import { User, Mail, Calendar, BookOpen, FileText, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

// Datos de usuario de ejemplo
const userData = {
  name: "Alejandro García",
  email: "alejandro.garcia@universidad.edu",
  joinedAt: "Enero 2026",
  stats: {
    documents: 12,
    quizzes: 28,
    avgScore: 86,
  },
}

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Perfil
        </h1>
        <p className="mt-1 text-muted-foreground">
          Administra la configuración de tu cuenta
        </p>
      </div>

      {/* Profile Card */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
              {userData.name.charAt(0)}
            </div>
            <div>
              <CardTitle>{userData.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Miembro desde {userData.joinedAt}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Stats */}
          <div className="mb-6 grid grid-cols-3 gap-4 rounded-xl bg-muted/30 p-4">
            <div className="text-center">
              <div className="flex justify-center">
                <FileText className="h-5 w-5 text-[oklch(0.72_0.12_280)]" />
              </div>
              <p className="mt-1 text-xl font-bold text-foreground">{userData.stats.documents}</p>
              <p className="text-xs text-muted-foreground">Documentos</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <BookOpen className="h-5 w-5 text-[oklch(0.75_0.1_200)]" />
              </div>
              <p className="mt-1 text-xl font-bold text-foreground">{userData.stats.quizzes}</p>
              <p className="text-xs text-muted-foreground">Cuestionarios</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <TrendingUp className="h-5 w-5 text-[oklch(0.5_0.15_160)]" />
              </div>
              <p className="mt-1 text-xl font-bold text-foreground">{userData.stats.avgScore}%</p>
              <p className="text-xs text-muted-foreground">Promedio</p>
            </div>
          </div>

          {/* Edit Form */}
          <form className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  defaultValue={userData.name}
                  className="h-11 rounded-xl"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  defaultValue={userData.email}
                  className="h-11 rounded-xl"
                />
              </Field>
            </FieldGroup>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" className="rounded-xl">
                Cancelar
              </Button>
              <Button type="submit" className="rounded-xl">
                Guardar Cambios
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Zona de Peligro</CardTitle>
          <CardDescription>
            Acciones irreversibles y destructivas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="rounded-xl">
            Eliminar Cuenta
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
