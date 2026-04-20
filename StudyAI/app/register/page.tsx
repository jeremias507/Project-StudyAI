"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useUserContext } from "@/context/user-context"
import { signupSchema } from "@/schemas/auth.signup"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from "zod"

type SignupFormData = z.infer<typeof signupSchema>


export default function RegisterPage() {

  const { createUser, error, setError } = useUserContext()

 

  const {   
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = async (data: SignupFormData) => {
    try {
    const response =  await createUser(data)
    
    } catch (error) {
      
    }
  }

  return (
    <div className="relative min-h-screen">

      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">

        <Link href="/" className="mb-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-semibold text-foreground">StudyAI</span>
        </Link>

        <Card className="w-full max-w-md border-border/50 shadow-lg">

          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Crea tu cuenta</CardTitle>
            <CardDescription>
              Comienza tu viaje de aprendizaje hoy
            </CardDescription>
          </CardHeader>

          <CardContent>

            {/* ERROR DEL BACKEND */}
            {error && (
              <div className="mb-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-600 text-center">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

              <FieldGroup>

                {/* FULL NAME */}
                <Field>
                  <FieldLabel>Nombre completo</FieldLabel>
                  <Input
                    placeholder="Juan Pérez"
                    {...register("full_name", {
                      onChange: () => error && setError(null)
                    })}
                  />
                  {errors.full_name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.full_name.message}
                    </p>
                  )}
                </Field>

                {/* EMAIL */}
                <Field>
                  <FieldLabel>Correo electrónico</FieldLabel>
                  <Input
                    type="email"
                    placeholder="tu@ejemplo.com"
                    {...register("email", {
                      onChange: () => error && setError(null)
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </Field>

                {/* PASSWORD */}
                <Field>
                  <FieldLabel>Contraseña</FieldLabel>
                  <Input
                    type="password"
                    placeholder="Crea una contraseña"
                    {...register("password", {
                      onChange: () => error && setError(null)
                    })}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </Field>

                {/* CONFIRM PASSWORD */}
                <Field>
                  <FieldLabel>Confirmar contraseña</FieldLabel>
                  <Input
                    type="password"
                    placeholder="Confirma tu contraseña"
                    {...register("confirm_password", {
                      onChange: () => error && setError(null)
                    })}
                  />
                  {errors.confirm_password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </Field>

              </FieldGroup>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-xl shadow-sm cursor-pointer "
                
              >
                Crear cuenta
              </Button>

            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Iniciar sesión
                </Link>
              </p>
            </div>

          </CardContent>

        </Card>
      </div>
    </div>
  )
}