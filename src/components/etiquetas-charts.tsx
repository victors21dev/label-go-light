'use client'

import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts'
import type { Etiqueta } from '@/types/etiquetas'

type Props = {
    fila: Etiqueta[]
}

// Definição de cores constantes para os gráficos
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

export function EtiquetasCharts({ fila }: Props) {
    const total = fila.length

    const porSetor = Object.values(
        fila.reduce(
            (acc, e) => {
                acc[e.setor] = acc[e.setor]
                    ? { name: e.setor, value: acc[e.setor].value + 1 }
                    : { name: e.setor, value: 1 }
                return acc
            },
            {} as Record<string, { name: string; value: number }>,
        ),
    )

    const porTipo = Object.values(
        fila.reduce(
            (acc, e) => {
                acc[e.tipo] = acc[e.tipo]
                    ? { name: e.tipo, value: acc[e.tipo].value + 1 }
                    : { name: e.tipo, value: 1 }
                return acc
            },
            {} as Record<string, { name: string; value: number }>,
        ),
    )

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Total */}
            <div className="rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl p-4 shadow-lg flex flex-col justify-center">
                <p className="text-sm text-muted-foreground font-medium">
                    Total de etiquetas
                </p>
                <p className="text-5xl font-bold mt-2">{total}</p>
            </div>

            {/* Por setor */}
            <div className="rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl p-4 shadow-lg h-64 flex flex-col">
                <p className="text-sm mb-4 font-medium uppercase tracking-wider text-gray-500">
                    Etiquetas por setor
                </p>
                <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={porSetor}>
                            <XAxis
                                dataKey="name"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                allowDecimals={false}
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip cursor={{ fill: 'transparent' }} />
                            <Bar
                                dataKey="value"
                                radius={[4, 4, 0, 0]}
                                fill="#3b82f6"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Por tipo */}
            <div className="rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl p-4 shadow-lg h-64 flex flex-col">
                <p className="text-sm mb-2 font-medium uppercase tracking-wider text-gray-500">
                    Etiquetas por tipo
                </p>
                <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={porTipo}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={60}
                                labelLine={false}
                                label={({ percent }) =>
                                    `${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {porTipo.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                wrapperStyle={{ fontSize: '12px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
