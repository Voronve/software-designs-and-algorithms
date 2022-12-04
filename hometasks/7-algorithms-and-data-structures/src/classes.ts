import { Type } from 'typescript';
import { VertexInt, EdgeInt, WeightedGraphInt, GraphMapInt } from './interfaces';

export class Vertex implements VertexInt {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}

export class Edge implements EdgeInt {
    firstVertex: VertexInt;
    secondVertex: VertexInt;
    weight: number;

    constructor(vertex1: Vertex, vertex2: Vertex, weight: number) {
        this.firstVertex = vertex1;
        this.secondVertex = vertex2;
        this.weight = weight;
    }
}

export class WeightedGraph implements WeightedGraphInt {
    vertexes: {
        [key: string]: {
            [key: string]: number
        }
    } = {};

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

    private initGraphMap(): GraphMapInt {
        const graphMap: GraphMapInt = {};

        Object.keys(this.vertexes).forEach( key => {
            graphMap[key] = {
                vertex: key,
                visited: false,
                path: [],
                weigth: Infinity
            }
        });

        return graphMap;
    }

    private findCheapestWeight(graphMap: GraphMapInt, visitedVertex: string ) {

        graphMap[visitedVertex].visited = true;
        const filteredVertexes = this.filterVisited(graphMap);
        
        this.updatePathes(graphMap, visitedVertex);

        if(!filteredVertexes.length) return null;

        return filteredVertexes.sort(
            (vertex1, vertex2) => graphMap[vertex1].weigth - graphMap[vertex2].weigth)[0][0];
    }


    private filterVisited(graphMap: GraphMapInt){
        return Object.entries(graphMap)
            .filter( entry => !entry[1].visited)
            .map( entry => entry[0]);
    }

    private updatePathes(graphMap: GraphMapInt, visitedVertex: string): void {

        Object.entries(this.vertexes[visitedVertex]).forEach( vertex => {
            const newWeigth = vertex[1] + graphMap[visitedVertex].weigth;
            if (graphMap[vertex[0]].weigth > newWeigth) {

                const newPath = [...graphMap[visitedVertex].path];
                newPath.push(vertex[0]);

                graphMap[vertex[0]].weigth = newWeigth;
                graphMap[vertex[0]].path = newPath;
            }
        })
    }

    public findShortestPath( start: Vertex, finish: Vertex ) {
        if (!this.vertexes[start.value] || !this.vertexes[finish.value]) return `Such vertex is not exist!`;

        const graphMap: GraphMapInt = this.initGraphMap();
        graphMap[start.value].path.push(start.value);
        graphMap[start.value].weigth = 0;

        let cheepest = this.findCheapestWeight(graphMap, start.value);
        
        while(cheepest && cheepest[0] !== finish.value) {
            cheepest = this.findCheapestWeight(graphMap, cheepest);
        }

        if(!cheepest) return { path: [], distance: Infinity }
        
        return { path: graphMap[cheepest].path, distance: graphMap[cheepest].weigth }
    }

    public findAllShortestPaths(vertex: Vertex) {
        if (!this.vertexes[vertex.value]) return `Such vertex is not exist!`;

        const graphMap: GraphMapInt = this.initGraphMap();
        graphMap[vertex.value].path.push(vertex.value);
        graphMap[vertex.value].weigth = 0;

        let cheepest = this.findCheapestWeight(graphMap, vertex.value);

        while(cheepest) {
            cheepest = this.findCheapestWeight(graphMap, cheepest);
        }

        const results: { [type: string]: { path: string[], distance: number } }= {};

        Object.values(graphMap).map(value => results[value.vertex] = { path: value.path, distance: value.weigth });

        return results;
    }
}