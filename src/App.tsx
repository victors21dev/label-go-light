import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
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
            alert('Preencha todos os campos corretamente!')
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

    function limparFila() {
        if (confirm('Deseja limpar todas as etiquetas da fila?')) {
            setFila([])
        }
    }

    return (
        <div className="app">
            <aside className="sidebar">
                <h1>🖨️ Gerador de Etiquetas</h1>

                <label>
                    Data
                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                </label>

                <label>
                    Setor
                    <input
                        value={setor}
                        onChange={(e) => setSetor(e.target.value)}
                    />
                </label>

                <label>
                    Coordenador
                    <input
                        value={coordenador}
                        onChange={(e) => setCoordenador(e.target.value)}
                    />
                </label>

                <label>
                    Tipo
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
                    Quantidade
                    <input
                        type="number"
                        min={1}
                        value={quantidade}
                        onChange={(e) => setQuantidade(Number(e.target.value))}
                    />
                </label>

                <div className="buttons">
                    <button onClick={adicionarFila}>Adicionar</button>
                    <button className="secondary" onClick={limparFila}>
                        Limpar fila
                    </button>
                    <button className="print" onClick={handlePrint}>
                        Imprimir
                    </button>
                </div>
            </aside>

            <main className="preview">
                <h2>Fila de etiquetas ({fila.length})</h2>

                <div ref={printRef} className="etiquetas">
                    {fila.map((e) => (
                        <div className="etiqueta" key={e.id}>
                            <div className="tipo">{e.tipo}</div>
                            <div className="linha">
                                📅{' '}
                                {new Date(e.data).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="linha">🏷️ {e.setor}</div>
                            <div className="linha">👤 {e.coordenador}</div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
