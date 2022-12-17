import { Ivertex, Iedge, IweightedGraph, GraphData } from './interfaces';

export class Vertex implements Ivertex {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}

export class Edge implements Iedge {
    firstVertex: Ivertex;
    secondVertex: Ivertex;
    weight: number;

    constructor(vertex1: Vertex, vertex2: Vertex, weight: number) {
        this.firstVertex = vertex1;
        this.secondVertex = vertex2;
        this.weight = weight;
    }
}

export class WeightedGraph implements IweightedGraph {
    private readonly vertexes: {
        [key: string]: {
            [key: string]: number
        }
    };

    constructor() {
        this.vertexes = {};
    }

    public addVertex(vertex: Vertex) {
        if(!this.vertexes[vertex.value]) {
            this.vertexes[vertex.value] = {};
        }
        
    }

    public addEdge(firstVertex: Vertex, secondVertex: Vertex, weight: number): void | string {
        if(firstVertex.value === secondVertex.value) return 'You cannot enter equal vertexes';
        if(!this.vertexes[firstVertex.value] || !this.vertexes[secondVertex.value]) return `Such vertex is not exist!`;
        if(this.vertexes[firstVertex.value][secondVertex.value]) return 'This edge is already exist!';
        
        this.vertexes[firstVertex.value][secondVertex.value] = weight;
        this.vertexes[secondVertex.value][firstVertex.value] = weight;
    }

    private initData(startValue: string): {
        graphMap: Record<string, GraphData>,
        unvisited: Set<string>
    } {
        const graphMap: Record<string, GraphData> = {};
        const unvisited = new Set<string>();

        Object.keys(this.vertexes).forEach( key => {
            graphMap[key] = {
                vertex: key,
                previous: '',
                weigth: Infinity
            }
            unvisited.add(key);
        });
        graphMap[startValue].weigth = 0;
        unvisited.delete(startValue);

        return { graphMap, unvisited };
    }

    private findCheapestWeight(
        graphMap: Record<string, GraphData>,
        unvisited: Set<string> ) {

        if(!unvisited.size) return null;
        
        return Array.from(unvisited).sort(
            (vertex1, vertex2) => graphMap[vertex1].weigth - graphMap[vertex2].weigth)[0][0];
    }

    private updatePathes(graphMap: Record<string, GraphData>, visitedVertex: string): void {

        Object.entries(this.vertexes[visitedVertex]).forEach( vertex => {
            const newWeigth = vertex[1] + graphMap[visitedVertex].weigth;
            if (graphMap[vertex[0]].weigth > newWeigth) {
                graphMap[vertex[0]].previous = visitedVertex;
                graphMap[vertex[0]].weigth = newWeigth;
            }
        })
    }

    private getPath(
        graphMap: Record<string, GraphData>,
        finishVertex: string,
        path: string[] = []): string[] {

        path.unshift(graphMap[finishVertex].vertex);

        if(graphMap[finishVertex].previous) {
            this.getPath(graphMap, graphMap[finishVertex].previous, path);
        }

        return path;
    }

    public findShortestPath( start: Vertex, finish: Vertex ) {
        if (!this.vertexes[start.value] || !this.vertexes[finish.value]) return `Such vertex is not exist!`;

        const {graphMap, unvisited} = this.initData(start.value);

        this.updatePathes(graphMap, start.value);
        let cheepest = this.findCheapestWeight(graphMap, unvisited);

        while(cheepest && cheepest[0] !== finish.value) {
            unvisited.delete(cheepest);
            this.updatePathes(graphMap, cheepest);
            cheepest = this.findCheapestWeight(graphMap, unvisited);
        }

        if(!cheepest) return { path: [], distance: Infinity };

        const path = this.getPath(graphMap, finish.value);
        
        return { path, distance: graphMap[cheepest].weigth }
    }

    public findAllShortestPaths(vertex: Vertex) {
        const vertexName = vertex.value;
        if (!this.vertexes[vertexName]) return `Such vertex is not exist!`;

        const {graphMap, unvisited} = this.initData(vertexName);

        this.updatePathes(graphMap, vertexName);
        let cheepest = this.findCheapestWeight(graphMap, unvisited);

        while(cheepest) {
            unvisited.delete(cheepest);
            this.updatePathes(graphMap, cheepest);
            cheepest = this.findCheapestWeight(graphMap, unvisited);
        }

        const results: { [type: string]: { path: string[], distance: number } }= {};
        Object.values(graphMap).map(value => results[value.vertex] = {
            path: this.getPath(graphMap, value.vertex),
            distance: value.weigth });

        return results;
    }
}