import { useState, useEffect, useRef } from 'react';
import { FaBomb } from "react-icons/fa6";
import Graph from './Graph';
import './App.css';
const play = '/svg/play.svg';
const pause = '/svg/pause.svg';
const flag = '/svg/flag.svg';
const select = '/sounds/select.wav';
const cloth = '/sounds/cloth.mp3';
const music = '/music/piano.mp3';

const generateBomba = (diff) => {
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
      const topExists = (i - 1 >= 0);
      const bottomExists = (i + 1 < rows);
      const leftExists = (j - 1 >= 0);
      const rightExists = (j + 1 < columns);
      if (topExists && bottomExists && leftExists && rightExists) {
        bombsAround += newGrid[i - 1][j - 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i - 1][j] === -1 ? 1 : 0;
        bombsAround += newGrid[i - 1][j + 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i][j - 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i][j + 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i + 1][j - 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i + 1][j] === -1 ? 1 : 0;
        bombsAround += newGrid[i + 1][j + 1] === -1 ? 1 : 0;
      }
      else if (topExists && leftExists && rightExists) {
        bombsAround += newGrid[i - 1][j - 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i - 1][j] === -1 ? 1 : 0;
        bombsAround += newGrid[i - 1][j + 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i][j - 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i][j + 1] === -1 ? 1 : 0;
      }
      else if (topExists && bottomExists && rightExists) {
        bombsAround += newGrid[i - 1][j] === -1 ? 1 : 0;
        bombsAround += newGrid[i - 1][j + 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i][j + 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i + 1][j] === -1 ? 1 : 0;
        bombsAround += newGrid[i + 1][j + 1] === -1 ? 1 : 0;
      }
      else if (topExists && bottomExists && leftExists) {
        bombsAround += newGrid[i - 1][j - 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i - 1][j] === -1 ? 1 : 0;
        bombsAround += newGrid[i][j - 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i + 1][j - 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i + 1][j] === -1 ? 1 : 0;
      }
      else if (bottomExists && leftExists && rightExists) {
        bombsAround += newGrid[i][j - 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i][j + 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i + 1][j - 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i + 1][j] === -1 ? 1 : 0;
        bombsAround += newGrid[i + 1][j + 1] === -1 ? 1 : 0;
      }
      else if (bottomExists && rightExists) {
        bombsAround += newGrid[i][j + 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i + 1][j] === -1 ? 1 : 0;
        bombsAround += newGrid[i + 1][j + 1] === -1 ? 1 : 0;
      }
      else if (bottomExists && leftExists) {
        bombsAround += newGrid[i][j - 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i + 1][j - 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i + 1][j] === -1 ? 1 : 0;
      }
      else if (topExists && rightExists) {
        bombsAround += newGrid[i - 1][j] === -1 ? 1 : 0;
        bombsAround += newGrid[i - 1][j + 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i][j + 1] === -1 ? 1 : 0;
      }
      else if (topExists && leftExists) {
        bombsAround += newGrid[i - 1][j - 1] === -1 ? 1 : 0;
        bombsAround += newGrid[i - 1][j] === -1 ? 1 : 0;
        bombsAround += newGrid[i][j - 1] === -1 ? 1 : 0;
      }
      newGrid[i][j] = bombsAround;
    }
  }
  return newGrid;
}

const deepCopy = (arr) => {
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

function App() {
  const [diff, setDiff] = useState(1);
  const writtenDiff = diff == 0 ? 'easy' : diff == 1 ? 'mid' : 'hard';
  const rows = diff == 0 ? 8 : diff == 1 ? 14 : 20;
  const columns = diff == 0 ? 10 : diff == 1 ? 18 : 24;
  const bombs = diff == 0 ? 10 : diff == 1 ? 40 : 99;
  const ost = useRef(new Audio(music));
  ost.current.loop = true;
  const clickSound = new Audio(select);
  const clothSound = new Audio(cloth);

  const [gameGrid, setGameGrid] = useState(generateBomba(1));
  const [clickedGrid, setclickedGrid] = useState(Array.from({ length: rows }, () => Array(columns).fill(0)));
  const [flagsGrid, setFlagsGrid] = useState(Array.from({ length: rows }, () => Array(columns).fill(0)));

  const [firstClick, setFirstClick] = useState(true);
  const [lost, setLost] = useState(false);
  const [isOstOn, setIsOstOn] = useState(false);
  const [isFlagSoundOn, setIsFlagSoundOn] = useState(true);

  useEffect(() => {
    console.log("GameGrid:", gameGrid);
  }, [gameGrid]);

  const changeDiff = (e) => {
    let newDiff = parseInt(e.target.value);
    const rows = newDiff === 0 ? 8 : newDiff === 1 ? 14 : 20;
    const columns = newDiff === 0 ? 10 : newDiff === 1 ? 18 : 24;
    setDiff(newDiff);
    setGameGrid(generateBomba(newDiff));
    setclickedGrid(Array(rows).fill(0).map(() => Array(columns).fill(0)));
  }

  const clickCell = (e, i, j) => {
    e.preventDefault();
    if (e.button === 0) {
      ost.current.play();
      setIsOstOn(true);
      if (flagsGrid[i][j]) {
        return;
      }
      clickSound.play();
      if (gameGrid[i][j] === -1) {
        setLost(true);
      }
      if (firstClick) {
        let g = new Graph(i, j, rows, columns, gameGrid);
        const bfsResult = g.bfs(`${[i]}-${[j]}`)
        //g.showAdjacencyList()
        //console.log("BFS: ", bfsResult);
        bfsResult.map(val => {
          const [x, y] = val.split('-');
          setclickedGrid(prevGrid => {
            const newArr = deepCopy(prevGrid);
            newArr[x][y] = 1;
            return newArr;
          })
        })
        setFirstClick(false);
      } else {
        setclickedGrid(prevGrid => {
          const newArr = deepCopy(prevGrid);
          newArr[i][j] = 1;
          return newArr;
        })
      }
    } else if (e.button === 2) {
      isFlagSoundOn && clothSound.play();
      if (flagsGrid[i][j] === 0 && clickedGrid[i][j] === 0) {
        setFlagsGrid(prevFlags => {
          const newFlags = deepCopy(prevFlags);
          newFlags[i][j] = 1;
          return newFlags;
        })
      } else if (flagsGrid[i][j] === 1) {
        setFlagsGrid(prevFlags => {
          const newFlags = deepCopy(prevFlags);
          newFlags[i][j] = 0;
          return newFlags;
        })
      }
    }
  }

  const retryClick = () => {
    window.location.reload()
  }

  const toggleOst = () => {
    if (ost.current.paused) {
      ost.current.play();
    } else {
      ost.current.pause();
    }
    setIsOstOn(prev => !prev);
  }

  const toggleFlagSoundEffect = () => {
    setIsFlagSoundOn(prev => !prev);
  }

  return (
    <div className='gameContainer'>
      {lost &&
        <>
          <div className='clickStopper'></div>
          <div className='gameOver'>
            <button className='retry' onClick={retryClick}>
              <img src={play} alt="play button" width="25px" height="25px" className='coloredPlay' /> <span className='retryText'>Try Again</span>
            </button>
          </div>
        </>
      }
      <div className='diffContainer'>
        <label htmlFor='difficulty'>Difficulty: </label>
        <select id='difficulty' onChange={changeDiff} name='difficulty'>
          <option value="0" key="0">Easy</option>
          <option value="1" key="1" selected>Medium</option>
          <option value="2" key="2">Hard</option>
        </select>
        <p>Number of Bombs: <span className='bombsNumber'>{bombs}</span></p>
        <p className='musicControl'>Music:
          <button className='musicButton' onClick={toggleOst}>
            <img className="ostControl" src={isOstOn ? pause : play} alt="pause/play icons" />
          </button>
        </p>
        <p className='musicControl'>Flag Sound:
          <button className='musicButton' onClick={toggleFlagSoundEffect}>
            <img className="ostControl" src={isFlagSoundOn ? pause : play} alt="pause/play icons" />
          </button>
        </p>
      </div>
      <div className='mines container'>
        <div className={`grid ${writtenDiff}`}>
          {gameGrid.map((row, i) => row.map((value, j) =>
            <div className='cell' key={`${i}${j}`}>
              {flagsGrid[i][j] ?
                <button onMouseDown={(e) => clickCell(e, i, j)} onContextMenu={(e) => e.preventDefault()} className='flagButton'>
                  <img className='flagCell' src={flag} alt="flag icon" />
                </button>
                : !clickedGrid[i][j] ?
                  <button onMouseDown={(e) => clickCell(e, i, j)} onContextMenu={(e) => e.preventDefault()}></button>
                  : <span>{value === -1 ? <FaBomb /> : value === 0 ? null : value}</span>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
// tasks to do: 
// 1-if user first clicks and only blank square appears, when that happens the game should search for nearest squares with numbers and open them.

// 2-after game starts, if user clicks on empty square, the game should open newarest square with numbers 
// 3-add timer and flags number decreasing after each flag put.
// 4-enhance adjacency detection and bfs.