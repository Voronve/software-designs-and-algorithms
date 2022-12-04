export interface VertexInt {
    value: string
}

export interface EdgeInt {
    firstVertex: VertexInt,
    secondVertex: VertexInt,
    weight: number
}

export interface WeightedGraphInt {
    addVertex(vertex: VertexInt): void;
    addEdge(firstVertex: VertexInt, secondVertex: VertexInt , weight: number): void;
}

export interface GraphMapInt {
    [type: string]: {
        vertex: string,
        visited: boolean,
        path: string[], 
        weigth: number 
    }}

