'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Setor } from '@/types/etiquetas'

type Props = {
    setores: Setor[]
    setSetores: React.Dispatch<React.SetStateAction<Setor[]>>
}

export function SetorManager({ setores, setSetores }: Props) {
    const [nome, setNome] = useState('')
    const [coordenador, setCoordenador] = useState('')
    const [editando, setEditando] = useState<string | null>(null)

    function salvar() {
        if (!nome || !coordenador) return alert('Preencha os campos')

        setSetores((prev) =>
            editando
                ? prev.map((s) =>
                      s.nome === editando ? { nome, coordenador } : s,
                  )
                : [...prev, { nome, coordenador }],
        )

        setNome('')
        setCoordenador('')
        setEditando(null)
    }

    function editar(s: Setor) {
        setNome(s.nome)
        setCoordenador(s.coordenador)
        setEditando(s.nome)
    }

    function excluir(nome: string) {
        setSetores((prev) => prev.filter((s) => s.nome !== nome))
    }

    return (
        <div className="flex flex-col gap-3">
            <p className="font-medium">Setores</p>

            <Input
                placeholder="Setor"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <Input
                placeholder="Coordenador"
                value={coordenador}
                onChange={(e) => setCoordenador(e.target.value)}
            />

            <Button onClick={salvar}>
                {editando ? 'Salvar edição' : 'Adicionar setor'}
            </Button>

            <div className="space-y-2">
                {setores.map((s) => (
                    <div
                        key={s.nome}
                        className="flex items-center justify-between text-sm border p-2 rounded"
                    >
                        <span>
                            {s.nome} — {s.coordenador}
                        </span>
                        <div className="flex gap-2">
                            <button onClick={() => editar(s)}>✏️</button>
                            <button onClick={() => excluir(s.nome)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
