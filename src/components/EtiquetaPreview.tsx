import type { Etiqueta } from '@/types/etiquetas'
import type { RefObject } from 'react'
import React from 'react'

type Props = {
    fila: Etiqueta[]
    setFila: React.Dispatch<React.SetStateAction<Etiqueta[]>>
    printRef: RefObject<HTMLDivElement | null>
}

export function EtiquetaPreview({ fila, setFila, printRef }: Props) {
    function removerEtiqueta(id: number) {
        setFila((prev) => prev.filter((e) => e.id !== id))
    }

    function formatarDataBR(dataISO: string) {
        const [ano, mes, dia] = dataISO.split('-')
        return `${dia}/${mes}/${ano}`
    }

    return (
        <div className="flex flex-col h-full">
            <p className="text-sm mb-2 font-medium">
                Fila de etiquetas ({fila.length})
            </p>

            <div
                ref={printRef}
                className="flex flex-col gap-4 overflow-y-auto pr-2 h-[480px] rounded-md border p-3 print:overflow-visible print:h-auto print:border-none print:p-0"
            >
                {fila.map((e) => (
                    <div
                        key={e.id}
                        className="relative rounded-md border p-4 text-sm"
                    >
                        <button
                            onClick={() => removerEtiqueta(e.id)}
                            className="absolute top-1 right-1 text-xs print:hidden"
                        >
                            ❌
                        </button>

                        <p className="font-bold text-center text-base">
                            Autorização de Refeição
                        </p>
                        <p className="text-center font-semibold text-lg">
                            {e.tipo}
                        </p>
                        <p className="text-center">
                            Validade: {formatarDataBR(e.data)}
                        </p>

                        <div className="mt-2">
                            <p>
                                <strong>Setor:</strong> {e.setor}
                            </p>
                            <p>
                                <strong>Coord.:</strong> {e.coordenador}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
