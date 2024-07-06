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
        const topExists = (i - 1 >= 0);
        const bottomExists = (i + 1 < rows);
        const leftExists = (j - 1 >= 0);
        const rightExists = (j + 1 < columns);
        i = parseInt(i, 10);
        j = parseInt(j, 10);

        try {
            if (topExists && bottomExists && leftExists && rightExists) {
                if (grid[i - 1][j - 1] !== 0 && grid[i - 1][j - 1] !== -1) {
                    this.addVertex(`${[i - 1]}-${[j - 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i - 1]}-${[j - 1]}`);
                }
                if (grid[i - 1][j] !== 0 && grid[i - 1][j] !== -1) {
                    this.addVertex(`${[i - 1]}-${[j]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i - 1]}-${[j]}`);
                }
                if (grid[i - 1][j + 1] !== 0 && grid[i - 1][j + 1] !== -1) {
                    this.addVertex(`${[i - 1]}-${[j + 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i - 1]}-${[j + 1]}`);
                }
                if (grid[i][j - 1] !== 0 && grid[i][j - 1] !== -1) {
                    this.addVertex(`${[i]}-${[j - 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i]}-${[j - 1]}`);
                }
                if (grid[i][j + 1] !== 0 && grid[i][j + 1] !== -1) {
                    this.addVertex(`${[i]}-${[j + 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i]}-${[j + 1]}`);
                }
                if (grid[i + 1][j - 1] !== 0 && grid[i + 1][j - 1] !== -1) {
                    this.addVertex(`${[i + 1]}-${[j - 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i + 1]}-${[j - 1]}`);
                }
                if (grid[i + 1][j] !== 0 && grid[i + 1][j] !== -1) {
                    this.addVertex(`${[i + 1]}-${[j]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i + 1]}-${[j]}`);
                }
                if (grid[i + 1][j + 1] !== 0 && grid[i + 1][j + 1] !== -1) {
                    this.addVertex(`${[i + 1]}-${[j + 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i + 1]}-${[j + 1]}`);
                }
            }
            else if (topExists && leftExists && rightExists) {
                if (grid[i - 1][j - 1] !== 0 && grid[i - 1][j - 1] !== -1) {
                    this.addVertex(`${[i - 1]}-${[j - 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i - 1]}-${[j - 1]}`);
                }
                if (grid[i - 1][j] !== 0 && grid[i - 1][j] !== -1) {
                    this.addVertex(`${[i - 1]}-${[j]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i - 1]}-${[j]}`);
                }
                if (grid[i - 1][j + 1] !== 0 && grid[i - 1][j + 1] !== -1) {
                    this.addVertex(`${[i - 1]}-${[j + 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i - 1]}-${[j + 1]}`);
                }
                if (grid[i][j - 1] !== 0 && grid[i][j - 1] !== -1) {
                    this.addVertex(`${[i]}-${[j - 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i]}-${[j - 1]}`);
                }
                if (grid[i][j + 1] !== 0 && grid[i][j + 1] !== -1) {
                    this.addVertex(`${[i]}-${[j + 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i]}-${[j + 1]}`);
                }
            }
            else if (topExists && bottomExists && rightExists) {
                if (grid[i - 1][j] !== 0 && grid[i - 1][j] !== -1) {
                    this.addVertex(`${[i - 1]}-${[j]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i - 1]}-${[j]}`);
                }
                if (grid[i - 1][j + 1] !== 0 && grid[i - 1][j + 1] !== -1) {
                    this.addVertex(`${[i - 1]}-${[j + 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i - 1]}-${[j + 1]}`);
                }
                if (grid[i][j + 1] !== 0 && grid[i][j + 1] !== -1) {
                    this.addVertex(`${[i]}-${[j + 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i]}-${[j + 1]}`);
                }
                if (grid[i + 1][j] !== 0 && grid[i + 1][j] !== -1) {
                    this.addVertex(`${[i + 1]}-${[j]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i + 1]}-${[j]}`);
                }
                if (grid[i + 1][j + 1] !== 0 && grid[i + 1][j + 1] !== -1) {
                    this.addVertex(`${[i + 1]}-${[j + 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i + 1]}-${[j + 1]}`);
                }
            }
            else if (topExists && bottomExists && leftExists) {
                if (grid[i - 1][j - 1] !== 0 && grid[i - 1][j - 1] !== -1) {
                    this.addVertex(`${[i - 1]}-${[j - 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i - 1]}-${[j - 1]}`);
                }
                if (grid[i - 1][j] !== 0 && grid[i - 1][j] !== -1) {
                    this.addVertex(`${[i - 1]}-${[j]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i - 1]}-${[j]}`);
                }
                if (grid[i][j - 1] !== 0 && grid[i][j - 1] !== -1) {
                    this.addVertex(`${[i]}-${[j - 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i]}-${[j - 1]}`);
                }
                if (grid[i + 1][j - 1] !== 0 && grid[i + 1][j - 1] !== -1) {
                    this.addVertex(`${[i + 1]}-${[j - 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i + 1]}-${[j - 1]}`);
                }
                if (grid[i + 1][j] !== 0 && grid[i + 1][j] !== -1) {
                    this.addVertex(`${[i + 1]}-${[j]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i + 1]}-${[j]}`);
                }
            }
            else if (bottomExists && leftExists && rightExists) {
                if (grid[i][j - 1] !== 0 && grid[i][j - 1] !== -1) {
                    this.addVertex(`${[i]}-${[j - 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i]}-${[j - 1]}`);
                }
                if (grid[i][j + 1] !== 0 && grid[i][j + 1] !== -1) {
                    this.addVertex(`${[i]}-${[j + 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i]}-${[j + 1]}`);
                }
                if (grid[i + 1][j - 1] !== 0 && grid[i + 1][j - 1] !== -1) {
                    this.addVertex(`${[i + 1]}-${[j - 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i + 1]}-${[j - 1]}`);
                }
                if (grid[i + 1][j] !== 0 && grid[i + 1][j] !== -1) {
                    this.addVertex(`${[i + 1]}-${[j]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i + 1]}-${[j]}`);
                }
                if (grid[i + 1][j + 1] !== 0 && grid[i + 1][j + 1] !== -1) {
                    this.addVertex(`${[i + 1]}-${[j + 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i + 1]}-${[j + 1]}`);
                }
            }
            else if (bottomExists && rightExists) {
                if (grid[i][j + 1] !== 0 && grid[i][j + 1] !== -1) {
                    this.addVertex(`${[i]}-${[j + 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i]}-${[j + 1]}`);
                }
                if (grid[i + 1][j] !== 0 && grid[i + 1][j] !== -1) {
                    this.addVertex(`${[i + 1]}-${[j]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i + 1]}-${[j]}`);
                }
                if (grid[i + 1][j + 1] !== 0 && grid[i + 1][j + 1] !== -1) {
                    this.addVertex(`${[i + 1]}-${[j + 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i + 1]}-${[j + 1]}`);
                }
            }
            else if (bottomExists && leftExists) {
                if (grid[i][j - 1] !== 0 && grid[i][j - 1] !== -1) {
                    this.addVertex(`${[i]}-${[j - 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i]}-${[j - 1]}`);
                }
                if (grid[i + 1][j - 1] !== 0 && grid[i + 1][j - 1] !== -1) {
                    this.addVertex(`${[i + 1]}-${[j - 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i + 1]}-${[j - 1]}`);
                }
                if (grid[i + 1][j] !== 0 && grid[i + 1][j] !== -1) {
                    this.addVertex(`${[i + 1]}-${[j]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i + 1]}-${[j]}`);
                }
            }
            else if (topExists && rightExists) {
                if (grid[i - 1][j] !== 0 && grid[i - 1][j] !== -1) {
                    this.addVertex(`${[i - 1]}-${[j]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i - 1]}-${[j]}`);
                }
                if (grid[i - 1][j + 1] !== 0 && grid[i - 1][j + 1] !== -1) {
                    this.addVertex(`${[i - 1]}-${[j + 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i - 1]}-${[j + 1]}`);
                }
                if (grid[i][j + 1] !== 0 && grid[i][j + 1] !== -1) {
                    this.addVertex(`${[i]}-${[j + 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i]}-${[j + 1]}`);
                }
            }
            else if (topExists && leftExists) {
                if (grid[i - 1][j - 1] !== 0 && grid[i - 1][j - 1] !== -1) {
                    this.addVertex(`${[i - 1]}-${[j - 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i - 1]}-${[j - 1]}`);
                }
                if (grid[i - 1][j] !== 0 && grid[i - 1][j] !== -1) {
                    this.addVertex(`${[i - 1]}-${[j]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i - 1]}-${[j]}`);
                }
                if (grid[i][j - 1] !== 0 && grid[i][j - 1] !== -1) {
                    this.addVertex(`${[i]}-${[j - 1]}`);
                    this.addEdge(`${[i]}-${[j]}`, `${[i]}-${[j - 1]}`);
                }
            }
        } catch (error) {
            console.error(error);
            console.log("Data: I: ", i, "j: ", j, "value: ", grid[i][j]);
        }
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