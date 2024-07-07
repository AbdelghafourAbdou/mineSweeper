class Graph {
    constructor(i, j, rows, columns, grid) {
        this.adjacencyList = {};
        this.createGraphRepresentation(i, j, rows, columns, grid);
        const safeNodeAdjacencyList = this.adjacencyList[`${i}-${j}`] || [];
        safeNodeAdjacencyList.map(val => {
            const [x, y] = val.split('-');
            this.createGraphRepresentation(x, y, rows, columns, grid);
        })
    }

    createGraphRepresentation(i, j, rows, columns, grid) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        i = parseInt(i, 10);
        j = parseInt(j, 10);

        directions.forEach(val => {
            const [x, y] = val;
            const newX = i + x;
            const newY = j + y;
            if (newX >= 0 && newX < rows && newY >= 0 && newY < columns) {
                if (grid[newX][newY] !== 0 && grid[newX][newY] !== -1) {
                    const adjacentCoordinates = `${newX}-${newY}`;
                    this.addVertex(adjacentCoordinates);
                    this.addEdge(`${[i]}-${[j]}`, adjacentCoordinates);
                }
            }
        })
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(v1, v2) {
        if (!this.adjacencyList[v1]) {
            this.addVertex(v1);
        }
        if (!this.adjacencyList[v2]) {
            this.addVertex(v2);
        }
        if (this.adjacencyList[v1].includes(v2) && this.adjacencyList[v2].includes(v1)) {
            return;
        }
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1); // For undirected graph
    }

    showAdjacencyList() {
        console.log(this.adjacencyList);
    }

    bfs(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        let currentVertex;

        visited[start] = true;

        while (queue.length && result.length < 20) {
            currentVertex = queue.shift();
            result.push(currentVertex);

            const safeNodeAdjacencyList = this.adjacencyList[currentVertex] || [];
            safeNodeAdjacencyList.forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }

        return result;
    }
}
export default Graph;