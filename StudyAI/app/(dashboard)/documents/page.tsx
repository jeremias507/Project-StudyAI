import Link from "next/link"
import { FileText, Upload, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"

// Datos de ejemplo
const documents = [
  { id: 1, title: "Introducción al Machine Learning", pages: 24, uploadedAt: "8 Mar, 2026" },
  { id: 2, title: "Notas de Cálculo II", pages: 18, uploadedAt: "6 Mar, 2026" },
  { id: 3, title: "Biología Capítulo 5", pages: 12, uploadedAt: "5 Mar, 2026" },
  { id: 4, title: "Física - Termodinámica", pages: 32, uploadedAt: "3 Mar, 2026" },
  { id: 5, title: "Historia de la Antigua Roma", pages: 45, uploadedAt: "1 Mar, 2026" },
  { id: 6, title: "Química - Compuestos Orgánicos", pages: 28, uploadedAt: "28 Feb, 2026" },
]

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Mis Documentos
          </h1>
          <p className="mt-1 text-muted-foreground">
            Todos tus materiales de estudio subidos
          </p>
        </div>
        <Button asChild className="rounded-xl shadow-sm">
          <Link href="/upload">
            <Upload className="mr-2 h-4 w-4" />
            Subir Nuevo
          </Link>
        </Button>
      </div>

      {/* Search */}
      <InputGroup className="max-w-md">
        <InputGroupAddon>
          <Search className="h-4 w-4 text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          placeholder="Buscar documentos..."
          className="h-11 rounded-xl"
        />
      </InputGroup>

      {/* Documents Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <Link key={doc.id} href={`/summary/${doc.id}`}>
            <Card className="h-full border-border/50 transition-all hover:shadow-md hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.85_0.08_280)]">
                  <FileText className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="line-clamp-2 text-base">{doc.title}</CardTitle>
                <CardDescription className="mt-2">
                  {doc.pages} páginas &middot; {doc.uploadedAt}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
