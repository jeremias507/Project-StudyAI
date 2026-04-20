"use client"

import Link from "next/link"
import { useState } from "react"
import { 
  FileText, 
  Upload, 
  Search, 
  FolderOpen, 
  Plus, 
  MoreVertical,
  Pencil,
  Trash2,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"

// Colores para las materias
const subjectColors = [
  { bg: "bg-emerald-500/20", icon: "bg-emerald-500", text: "text-emerald-500" },
  { bg: "bg-blue-500/20", icon: "bg-blue-500", text: "text-blue-500" },
  { bg: "bg-purple-500/20", icon: "bg-purple-500", text: "text-purple-500" },
  { bg: "bg-orange-500/20", icon: "bg-orange-500", text: "text-orange-500" },
  { bg: "bg-pink-500/20", icon: "bg-pink-500", text: "text-pink-500" },
  { bg: "bg-cyan-500/20", icon: "bg-cyan-500", text: "text-cyan-500" },
  { bg: "bg-yellow-500/20", icon: "bg-yellow-500", text: "text-yellow-500" },
  { bg: "bg-red-500/20", icon: "bg-red-500", text: "text-red-500" },
]

// Datos de ejemplo - materias con documentos
const initialSubjects = [
  { 
    id: "matematicas", 
    name: "Matematicas", 
    colorIndex: 0,
    documentsCount: 4,
    lastUpdated: "Hace 2 dias"
  },
  { 
    id: "fisica", 
    name: "Fisica", 
    colorIndex: 1,
    documentsCount: 3,
    lastUpdated: "Hace 1 semana"
  },
  { 
    id: "quimica", 
    name: "Quimica", 
    colorIndex: 2,
    documentsCount: 2,
    lastUpdated: "Hace 3 dias"
  },
  { 
    id: "biologia", 
    name: "Biologia", 
    colorIndex: 3,
    documentsCount: 5,
    lastUpdated: "Ayer"
  },
  { 
    id: "historia", 
    name: "Historia", 
    colorIndex: 4,
    documentsCount: 3,
    lastUpdated: "Hace 5 dias"
  },
  { 
    id: "programacion", 
    name: "Programacion", 
    colorIndex: 5,
    documentsCount: 8,
    lastUpdated: "Hoy"
  },
]

export default function DocumentsPage() {
  const [subjects, setSubjects] = useState(initialSubjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState("")
  const [editingSubject, setEditingSubject] = useState<string | null>(null)
  const [editName, setEditName] = useState("")

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateSubject = () => {
    if (newSubjectName.trim()) {
      const newSubject = {
        id: newSubjectName.toLowerCase().replace(/\s+/g, "-"),
        name: newSubjectName,
        colorIndex: subjects.length % subjectColors.length,
        documentsCount: 0,
        lastUpdated: "Ahora"
      }
      setSubjects([...subjects, newSubject])
      setNewSubjectName("")
      setIsCreateOpen(false)
    }
  }

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id))
  }

  const handleEditSubject = (id: string) => {
    if (editName.trim()) {
      setSubjects(subjects.map(s => 
        s.id === id ? { ...s, name: editName } : s
      ))
      setEditingSubject(null)
      setEditName("")
    }
  }

  const startEditing = (subject: typeof subjects[0]) => {
    setEditingSubject(subject.id)
    setEditName(subject.name)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Mis Documentos
          </h1>
          <p className="mt-1 text-muted-foreground">
            Organiza tus materiales de estudio por materias
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-xl">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Materia
              </Button>
            </DialogTrigger>
            <DialogContent className="border-border/60 bg-card sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Crear Nueva Materia</DialogTitle>
                <DialogDescription>
                  Crea una carpeta para organizar tus documentos por materia.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="subject-name">Nombre de la materia</Label>
                  <Input
                    id="subject-name"
                    placeholder="Ej: Algebra Lineal"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreateSubject()}
                    className="rounded-xl"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateSubject} className="bg-emerald-600 hover:bg-emerald-700">
                  Crear Materia
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button asChild className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
            <Link href="/upload">
              <Upload className="mr-2 h-4 w-4" />
              Subir Documento
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
          placeholder="Buscar materias..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-11 rounded-xl"
        />
      </InputGroup>

      {/* Subjects Grid */}
      {filteredSubjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 py-16">
          <FolderOpen className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium text-foreground">No hay materias</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchQuery ? "No se encontraron materias con ese nombre" : "Crea tu primera materia para organizar tus documentos"}
          </p>
          {!searchQuery && (
            <Button 
              variant="outline" 
              className="mt-4 rounded-xl"
              onClick={() => setIsCreateOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Crear Materia
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSubjects.map((subject) => {
            const colors = subjectColors[subject.colorIndex % subjectColors.length]
            
            return (
              <div key={subject.id} className="group relative">
                {editingSubject === subject.id ? (
                  <Card className="border-border/50 bg-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleEditSubject(subject.id)
                            if (e.key === "Escape") setEditingSubject(null)
                          }}
                          className="h-9 rounded-lg"
                          autoFocus
                        />
                        <Button 
                          size="sm" 
                          onClick={() => handleEditSubject(subject.id)}
                          className="h-9 bg-emerald-600 hover:bg-emerald-700"
                        >
                          Guardar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setEditingSubject(null)}
                          className="h-9"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Link href={`/documents/${subject.id}`}>
                    <Card className="h-full border-border/50 transition-all hover:border-border hover:shadow-lg hover:-translate-y-1">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}>
                            <FolderOpen className={`h-6 w-6 ${colors.text}`} />
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                                onClick={(e) => e.preventDefault()}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="border-border/60 bg-card">
                              <DropdownMenuItem 
                                onClick={(e) => {
                                  e.preventDefault()
                                  startEditing(subject)
                                }}
                                className="cursor-pointer"
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Renombrar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleDeleteSubject(subject.id)
                                }}
                                className="cursor-pointer text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <h3 className="mt-4 text-lg font-semibold text-foreground">
                          {subject.name}
                        </h3>
                        
                        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <FileText className="h-4 w-4" />
                            {subject.documentsCount} {subject.documentsCount === 1 ? "documento" : "documentos"}
                          </span>
                        </div>
                        
                        <p className="mt-2 text-xs text-muted-foreground/70">
                          Actualizado {subject.lastUpdated}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
