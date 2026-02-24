export type TipoRefeicao = 'Café da manhã' | 'Almoço' | 'Janta'

export type Etiqueta = {
    id: number
    data: string
    setor: string
    coordenador: string
    tipo: TipoRefeicao
}

export type Setor = {
    nome: string
    coordenador: string
}
