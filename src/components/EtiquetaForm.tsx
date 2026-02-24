'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import type { Etiqueta, Setor, TipoRefeicao } from '@/types/etiquetas'

type Props = {
    setores: Setor[]
    onAddFila: React.Dispatch<React.SetStateAction<Etiqueta[]>>
    onPrint: () => void
}

export function EtiquetaForm({ setores, onAddFila, onPrint }: Props) {
    const [data, setData] = useState('')
    const [setor, setSetor] = useState('')
    const [coordenador, setCoordenador] = useState('')
    const [tipo, setTipo] = useState<TipoRefeicao>('Café da manhã')
    const [quantidade, setQuantidade] = useState(1)

    useEffect(() => {
        const encontrado = setores.find((s) => s.nome === setor)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (encontrado) setCoordenador(encontrado.coordenador)
    }, [setor, setores])

    function adicionarFila() {
        if (!data || !setor || quantidade < 1) {
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

        onAddFila((prev) => [...prev, ...novas])
    }

    return (
        <div className="grid gap-3">
            <div>
                <label className="text-sm">Data de validade</label>
                <Input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            </div>

            <div>
                <label className="text-sm">Setor</label>
                <Select value={setor} onValueChange={setSetor}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione um setor" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        {setores.map((s) => (
                            <SelectItem key={s.nome} value={s.nome}>
                                {s.nome}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="text-sm">Coordenador</label>
                <Input value={coordenador} disabled />
            </div>

            <div>
                <label className="text-sm">Tipo da refeição</label>
                <Select
                    value={tipo}
                    onValueChange={(v) => setTipo(v as TipoRefeicao)}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="Café da manhã">
                            Café da manhã
                        </SelectItem>
                        <SelectItem value="Almoço">Almoço</SelectItem>
                        <SelectItem value="Janta">Janta</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="text-sm">Quantidade</label>
                <Input
                    type="number"
                    min={1}
                    value={quantidade}
                    onChange={(e) => setQuantidade(Number(e.target.value))}
                />
            </div>

            <div className="mt-4 flex gap-2">
                <Button onClick={adicionarFila}>Adicionar</Button>
                <Button variant="secondary" onClick={onPrint}>
                    Imprimir
                </Button>
            </div>
        </div>
    )
}
