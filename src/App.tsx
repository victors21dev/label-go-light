'use client'

import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { EtiquetaForm } from '@/components/EtiquetaForm'
import { EtiquetaPreview } from '@/components/EtiquetaPreview'
import { SetorManager } from '@/components/SetorManager'

import type { Etiqueta, Setor } from '@/types/etiquetas'

export default function Page() {
    const printRef = useRef<HTMLDivElement | null>(null)

    const [fila, setFila] = useState<Etiqueta[]>([])
    const [setores, setSetores] = useState<Setor[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const salvo = localStorage.getItem('setores')
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (salvo) setSetores(JSON.parse(salvo))
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        localStorage.setItem('setores', JSON.stringify(setores))
    }, [setores, mounted])

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: 'etiquetas',
    })

    if (!mounted) return null

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-muted p-6">
            <div className="w-full max-w-6xl">
                <Card>
                    <CardHeader>
                        <CardTitle>🖨️ Gerador de Etiquetas</CardTitle>
                    </CardHeader>

                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <EtiquetaForm
                            setores={setores}
                            onAddFila={setFila}
                            onPrint={handlePrint}
                        />
                        <EtiquetaPreview
                            fila={fila}
                            setFila={setFila}
                            printRef={printRef}
                        />
                        <SetorManager
                            setores={setores}
                            setSetores={setSetores}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
