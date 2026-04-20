"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { 
  FileText, 
  Upload, 
  Search, 
  ArrowLeft,
  MoreVertical,
  Trash2,
  Download,
  Eye,
  Clock,
  File
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Datos de ejemplo - documentos por materia
const documentsData: Record<string, Array<{
  id: string
  title: string
  pages: number
  uploadedAt: string
  size: string
  type: string
}>> = {
  matematicas: [
    { id: "1", title: "Introduccion al Calculo Diferencial", pages: 24, uploadedAt: "8 Mar, 2026", size: "2.4 MB", type: "PDF" },
    { id: "2", title: "Notas de Calculo II", pages: 18, uploadedAt: "6 Mar, 2026", size: "1.8 MB", type: "PDF" },
    { id: "3", title: "Ejercicios de Integrales", pages: 12, uploadedAt: "5 Mar, 2026", size: "980 KB", type: "PDF" },
    { id: "4", title: "Formulas y Teoremas", pages: 8, uploadedAt: "3 Mar, 2026", size: "540 KB", type: "PDF" },
  ],
  fisica: [
    { id: "5", title: "Termodinamica - Conceptos Basicos", pages: 32, uploadedAt: "7 Mar, 2026", size: "3.2 MB", type: "PDF" },
    { id: "6", title: "Mecanica Clasica", pages: 28, uploadedAt: "4 Mar, 2026", size: "2.8 MB", type: "PDF" },
    { id: "7", title: "Problemas de Cinematica", pages: 15, uploadedAt: "2 Mar, 2026", size: "1.2 MB", type: "PDF" },
  ],
  quimica: [
    { id: "8", title: "Quimica Organica - Introduccion", pages: 40, uploadedAt: "6 Mar, 2026", size: "4.1 MB", type: "PDF" },
    { id: "9", title: "Tabla Periodica y Propiedades", pages: 12, uploadedAt: "3 Mar, 2026", size: "890 KB", type: "PDF" },
  ],
  biologia: [
    { id: "10", title: "Biologia Celular", pages: 35, uploadedAt: "8 Mar, 2026", size: "3.5 MB", type: "PDF" },
    { id: "11", title: "Genetica Molecular", pages: 28, uploadedAt: "7 Mar, 2026", size: "2.9 MB", type: "PDF" },
    { id: "12", title: "Evolucion y Seleccion Natural", pages: 22, uploadedAt: "5 Mar, 2026", size: "2.2 MB", type: "PDF" },
    { id: "13", title: "Ecologia y Ecosistemas", pages: 18, uploadedAt: "4 Mar, 2026", size: "1.8 MB", type: "PDF" },
    { id: "14", title: "Anatomia Humana", pages: 45, uploadedAt: "2 Mar, 2026", size: "4.5 MB", type: "PDF" },
  ],
  historia: [
    { id: "15", title: "Historia de la Antigua Roma", pages: 45, uploadedAt: "1 Mar, 2026", size: "4.2 MB", type: "PDF" },
    { id: "16", title: "Revolucion Francesa", pages: 30, uploadedAt: "28 Feb, 2026", size: "3.0 MB", type: "PDF" },
    { id: "17", title: "Segunda Guerra Mundial", pages: 52, uploadedAt: "25 Feb, 2026", size: "5.1 MB", type: "PDF" },
  ],
  programacion: [
    { id: "18", title: "Introduccion a Python", pages: 60, uploadedAt: "9 Mar, 2026", size: "5.8 MB", type: "PDF" },
    { id: "19", title: "Estructuras de Datos", pages: 45, uploadedAt: "8 Mar, 2026", size: "4.2 MB", type: "PDF" },
    { id: "20", title: "Algoritmos de Ordenamiento", pages: 25, uploadedAt: "7 Mar, 2026", size: "2.3 MB", type: "PDF" },
    { id: "21", title: "POO en Java", pages: 38, uploadedAt: "6 Mar, 2026", size: "3.6 MB", type: "PDF" },
    { id: "22", title: "Bases de Datos SQL", pages: 42, uploadedAt: "5 Mar, 2026", size: "4.0 MB", type: "PDF" },
    { id: "23", title: "React y Next.js", pages: 55, uploadedAt: "4 Mar, 2026", size: "5.2 MB", type: "PDF" },
    { id: "24", title: "APIs RESTful", pages: 30, uploadedAt: "3 Mar, 2026", size: "2.8 MB", type: "PDF" },
    { id: "25", title: "Git y Control de Versiones", pages: 20, uploadedAt: "2 Mar, 2026", size: "1.9 MB", type: "PDF" },
  ],
}

const subjectNames: Record<string, string> = {
  matematicas: "Matematicas",
  fisica: "Fisica",
  quimica: "Quimica",
  biologia: "Biologia",
  historia: "Historia",
  programacion: "Programacion",
}

export default function SubjectDocumentsPage() {
  const params = useParams()
  const subjectId = params.subjectId as string
  const subjectName = subjectNames[subjectId] || subjectId.charAt(0).toUpperCase() + subjectId.slice(1)
  
  const [searchQuery, setSearchQuery] = useState("")
  const [documents, setDocuments] = useState(documentsData[subjectId] || [])

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id))
  }

  const totalPages = documents.reduce((acc, doc) => acc + doc.pages, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Link 
          href="/documents" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Materias
        </Link>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              {subjectName}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {documents.length} {documents.length === 1 ? "documento" : "documentos"} &middot; {totalPages} paginas en total
            </p>
          </div>
          <Button asChild className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
            <Link href={`/upload?subject=${subjectId}`}>
              <Upload className="mr-2 h-4 w-4" />
              Subir a {subjectName}
            </Link>
          </Button>
        </div>
      </div>

      {/* Search */}
      <InputGroup className="max-w-md">
        <InputGroupAddon>
          <Search className="h-4 w-4 text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          placeholder="Buscar documentos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-11 rounded-xl"
        />
      </InputGroup>

      {/* Documents List */}
      {filteredDocuments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 py-16">
          <FileText className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium text-foreground">No hay documentos</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchQuery ? "No se encontraron documentos con ese nombre" : "Sube tu primer documento a esta materia"}
          </p>
          {!searchQuery && (
            <Button 
              asChild
              className="mt-4 rounded-xl bg-emerald-600 hover:bg-emerald-700"
            >
              <Link href={`/upload?subject=${subjectId}`}>
                <Upload className="mr-2 h-4 w-4" />
                Subir Documento
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDocuments.map((doc) => (
            <Card 
              key={doc.id} 
              className="group border-border/50 transition-all hover:border-border hover:shadow-md"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
                    <File className="h-6 w-6 text-emerald-500" />
                  </div>
                  
                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-base font-medium text-foreground">
                        {doc.title}
                      </h3>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {doc.type}
                      </Badge>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span>{doc.pages} paginas</span>
                      <span>{doc.size}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {doc.uploadedAt}
                      </span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button 
                      asChild
                      variant="ghost" 
                      size="sm"
                      className="hidden rounded-lg sm:flex"
                    >
                      <Link href={`/summary/${doc.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver
                      </Link>
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-border/60 bg-card">
                        <DropdownMenuItem asChild className="cursor-pointer sm:hidden">
                          <Link href={`/summary/${doc.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Documento
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          Descargar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border/60" />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="cursor-pointer text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
