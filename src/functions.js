const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
];

export const generateBomba = (diff) => {
    const bombs = diff == 0 ? 10 : diff == 1 ? 40 : 99;
    const rows = diff == 0 ? 8 : diff == 1 ? 14 : 20;
    const columns = diff == 0 ? 10 : diff == 1 ? 18 : 24;

    const newGrid = Array(rows);
    for (let i = 0; i < rows; i++) {
        newGrid[i] = Array(columns);
        for (let j = 0; j < columns; j++) {
            newGrid[i][j] = 0;
        }
    }

    for (let i = 0; i < bombs; i++) {
        const randRow = Math.floor(Math.random() * rows);
        const randCol = Math.floor(Math.random() * columns);
        if (newGrid[randRow][randCol] === -1) {
            i--;
            continue;
        }
        newGrid[randRow][randCol] = -1;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (newGrid[i][j] === -1) {
                continue;
            }
            let bombsAround = 0;
            directions.forEach(val => {
                const [x, y] = val;
                const newX = i + x;
                const newY = j + y;
                if (newX >= 0 && newX < rows && newY >= 0 && newY < columns) {
                    bombsAround += newGrid[newX][newY] === -1 ? 1 : 0;
                }
            });
            newGrid[i][j] = bombsAround;
        }
    }
    return newGrid;
}

export const deepCopy = (arr) => {
    let copy = [];
    arr.forEach(elem => {
        if (Array.isArray(elem)) {
            copy.push(deepCopy(elem))
        } else {
            copy.push(elem)
        }
    })
    return copy;
}