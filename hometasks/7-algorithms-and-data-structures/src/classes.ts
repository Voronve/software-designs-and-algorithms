import { Ivertex, Iedge, IweightedGraph, GraphData } from './interfaces';

export class Vertex implements Ivertex {
    name: string;

    constructor(value: string) {
        this.name = value;
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
        if(!this.vertexes[vertex.name]) {
            this.vertexes[vertex.name] = {};
        }
        
    }

    public addEdge(firstVertex: Vertex, secondVertex: Vertex, weight: number): void | string {
        if(firstVertex.name === secondVertex.name) return 'You cannot enter equal vertexes';
        if(!this.vertexes[firstVertex.name] || !this.vertexes[secondVertex.name]) return `Such vertex is not exist!`;
        if(this.vertexes[firstVertex.name][secondVertex.name]) return 'This edge is already exist!';
        
        this.vertexes[firstVertex.name][secondVertex.name] = weight;
        this.vertexes[secondVertex.name][firstVertex.name] = weight;
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

        return { graphMap, unvisited };
    }

    private findCheapestWeight(
        graphMap: Record<string, GraphData>,
        unvisited: Set<string> ) {
        
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

    private vertexExistsCheck(vertex: Vertex){
        if (!this.vertexes[vertex.name]){
            throw new Error(`Vertex with name ${vertex.name} is not exist!`);
        };
    }

    private createGraphMap(vertex: Vertex): Record<string, GraphData> {
        this.vertexExistsCheck(vertex);
        const {graphMap, unvisited} = this.initData(vertex.name);
        let cheepest = vertex.name;

        while(unvisited.size) {
            this.updatePathes(graphMap, cheepest);
            cheepest = this.findCheapestWeight(graphMap, unvisited);
            unvisited.delete(cheepest);
        }

        return graphMap;
    }

    public findShortestPath( start: Vertex, finish: Vertex ) {
        this.vertexExistsCheck(finish);
        const graphMap = this.createGraphMap(start);

        const path = this.getPath(graphMap, finish.name);
        
        return { path, distance: graphMap[finish.name].weigth }
    }

    public findAllShortestPaths(start: Vertex) {
        const graphMap = this.createGraphMap(start);

        const results: { [type: string]: { path: string[], distance: number } }= {};
        Object.values(graphMap).map(value => results[value.vertex] = {
            path: this.getPath(graphMap, value.vertex),
            distance: value.weigth });

        return results;
    }
}