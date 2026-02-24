import { useState } from 'react'
import './App.css'

type TipoRefeicao = 'Café da manhã' | 'Almoço' | 'Janta'

type Etiqueta = {
    id: number
    data: string
    setor: string
    coordenador: string
    tipo: TipoRefeicao
}

export default function App() {
    const [data, setData] = useState('')
    const [setor, setSetor] = useState('')
    const [coordenador, setCoordenador] = useState('')
    const [tipo, setTipo] = useState<TipoRefeicao>('Café da manhã')
    const [quantidade, setQuantidade] = useState(1)

    const [fila, setFila] = useState<Etiqueta[]>([])

    function adicionarFila() {
        if (!data || !setor || !coordenador) {
            alert('Preencha todos os campos!')
            return
        }

        const novas: Etiqueta[] = Array.from({ length: quantidade }).map(
            (_, i) => ({
                id: Date.now() + i,
                data,
                setor,
                coordenador,
                tipo,
            }),
        )

        setFila((prev) => [...prev, ...novas])
    }

    function imprimirTudo() {
        window.print()
    }

    return (
        <div className="container">
            <h1>🖨️ Gerador de Etiquetas</h1>

            <div className="form">
                <label>
                    Data:
                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                </label>

                <label>
                    Setor:
                    <input
                        value={setor}
                        onChange={(e) => setSetor(e.target.value)}
                    />
                </label>

                <label>
                    Coordenador:
                    <input
                        value={coordenador}
                        onChange={(e) => setCoordenador(e.target.value)}
                    />
                </label>

                <label>
                    Tipo:
                    <select
                        value={tipo}
                        onChange={(e) =>
                            setTipo(e.target.value as TipoRefeicao)
                        }
                    >
                        <option>Café da manhã</option>
                        <option>Almoço</option>
                        <option>Janta</option>
                    </select>
                </label>

                <label>
                    Quantidade:
                    <input
                        type="number"
                        min={1}
                        value={quantidade}
                        onChange={(e) => setQuantidade(Number(e.target.value))}
                    />
                </label>

                <button onClick={adicionarFila}>Adicionar à fila</button>
                <button className="print" onClick={imprimirTudo}>
                    Imprimir tudo
                </button>
            </div>

            <h2>Fila de impressão ({fila.length})</h2>

            <div className="etiquetas">
                {fila.map((e) => (
                    <div className="etiqueta" key={e.id}>
                        <strong>{e.tipo}</strong>
                        <span>
                            {new Date(e.data).toLocaleDateString('pt-BR')}
                        </span>
                        <span>Setor: {e.setor}</span>
                        <span>Coord.: {e.coordenador}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
