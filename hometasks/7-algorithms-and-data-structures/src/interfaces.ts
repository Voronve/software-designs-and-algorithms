export interface Ivertex {
    name: string
}

export interface Iedge {
    firstVertex: Ivertex,
    secondVertex: Ivertex,
    weight: number
}

export interface IweightedGraph {
    addVertex(vertex: Ivertex): void;
    addEdge(firstVertex: Ivertex, secondVertex: Ivertex , weight: number): void;
}

export interface GraphData {
    vertex: string,
    previous: string,
    weigth: number
}
