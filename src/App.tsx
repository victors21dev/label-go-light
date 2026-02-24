import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type TipoRefeicao = 'Café da manhã' | 'Almoço' | 'Janta'

type Etiqueta = {
    id: number
    data: string
    setor: string
    coordenador: string
    tipo: TipoRefeicao
}

export default function App() {
    const printRef = useRef<HTMLDivElement>(null)

    const [data, setData] = useState('')
    const [setor, setSetor] = useState('')
    const [coordenador, setCoordenador] = useState('')
    const [tipo, setTipo] = useState<TipoRefeicao>('Café da manhã')
    const [quantidade, setQuantidade] = useState(1)

    const [fila, setFila] = useState<Etiqueta[]>([])

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: 'etiquetas',
    })

    function adicionarFila() {
        if (!data || !setor || !coordenador || quantidade < 1) {
            alert('Preencha todos os campos!')
            return
        }

        const novas = Array.from({ length: quantidade }).map((_, i) => ({
            id: Date.now() + i,
            data,
            setor,
            coordenador,
            tipo,
        }))

        setFila((prev) => [...prev, ...novas])
    }

    function removerEtiqueta(id: number) {
        setFila((prev) => prev.filter((e) => e.id !== id))
    }

    function limparFila() {
        if (confirm('Deseja limpar todas as etiquetas?')) {
            setFila([])
        }
    }

    function formatarDataBR(dataISO: string) {
        const [ano, mes, dia] = dataISO.split('-')
        return `${dia}/${mes}/${ano}`
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-muted p-6">
            <div className="w-full max-w-5xl">
                <Card>
                    <CardHeader>
                        <CardTitle>🖨️ Gerador de Etiquetas</CardTitle>
                    </CardHeader>

                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Formulário */}
                        <div className="grid gap-3">
                            <div>
                                <label className="text-sm">
                                    Data de validade
                                </label>
                                <Input
                                    type="date"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm">Setor</label>
                                <Input
                                    value={setor}
                                    onChange={(e) => setSetor(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm">Coordenador</label>
                                <Input
                                    value={coordenador}
                                    onChange={(e) =>
                                        setCoordenador(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label className="text-sm">
                                    Tipo da refeição
                                </label>
                                <Select
                                    value={tipo}
                                    onValueChange={(v) =>
                                        setTipo(v as TipoRefeicao)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="Café da manhã">
                                            Café da manhã
                                        </SelectItem>
                                        <SelectItem value="Almoço">
                                            Almoço
                                        </SelectItem>
                                        <SelectItem value="Janta">
                                            Janta
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm">Quantidade</label>
                                <Input
                                    type="number"
                                    min={1}
                                    value={quantidade}
                                    onChange={(e) =>
                                        setQuantidade(Number(e.target.value))
                                    }
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                                <Button onClick={adicionarFila}>
                                    Adicionar
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={limparFila}
                                >
                                    Limpar
                                </Button>
                                <Button onClick={handlePrint}>Imprimir</Button>
                            </div>
                        </div>

                        {/* Fila */}
                        <div className="flex flex-col h-full">
                            <p className="text-sm mb-2 font-medium">
                                Fila de etiquetas ({fila.length})
                            </p>

                            <div
                                ref={printRef}
                                className="print-area flex flex-col gap-4 overflow-y-auto pr-2 h-[480px] rounded-md border p-3 print:overflow-visible print:h-auto print:border-none print:p-0"
                            >
                                {fila.map((e) => (
                                    <div
                                        key={e.id}
                                        className="etiqueta relative rounded-md border p-4 text-sm"
                                    >
                                        <button
                                            onClick={() =>
                                                removerEtiqueta(e.id)
                                            }
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
                                                <strong>Setor:</strong>{' '}
                                                {e.setor}
                                            </p>
                                            <p>
                                                <strong>Coord.:</strong>{' '}
                                                {e.coordenador}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
