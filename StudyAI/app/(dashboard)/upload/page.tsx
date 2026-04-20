"use client"

import { useState } from "react"
import Link from "next/link"
import { Upload, FileText, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const removeFile = () => {
    setFile(null)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Subir PDF
        </h1>
        <p className="mt-1 text-muted-foreground">
          Sube tus materiales de estudio para obtener resúmenes con IA
        </p>
      </div>

      {/* Upload Card */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Subir Documento</CardTitle>
          <CardDescription>
            Arrastra y suelta tu archivo PDF o haz clic para explorar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Dropzone */}
          <div
            className={cn(
              "relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all",
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/30",
              file && "border-solid border-primary/30 bg-primary/5"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleChange}
              className="absolute inset-0 z-10 cursor-pointer opacity-0"
            />

            {file ? (
              <div className="flex flex-col items-center gap-4 p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[oklch(0.85_0.08_280)]">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{file.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile()
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="mr-1 h-4 w-4" />
                  Eliminar
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">
                    Suelta tu PDF aquí
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    o haz clic para explorar desde tu computadora
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Soporta archivos PDF hasta 50MB
                </p>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <Button
            size="lg"
            className="mt-6 w-full rounded-xl shadow-sm"
            disabled={!file}
            asChild={!!file}
          >
            {file ? (
              <Link href="/summary/1">
                <Sparkles className="mr-2 h-4 w-4" />
                Generar Resumen
              </Link>
            ) : (
              <span>
                <Sparkles className="mr-2 h-4 w-4" />
                Generar Resumen
              </span>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
