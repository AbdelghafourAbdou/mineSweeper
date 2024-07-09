/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { FaBomb } from "react-icons/fa6";
import Graph from './Graph';
import { generateBomba, deepCopy, checkWin, cellColor } from './functions';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import './App.css';
const play = '/svg/play.svg';
const pause = '/svg/pause.svg';
const flag = '/svg/flag.svg';
const select = '/sounds/select.wav';
const cloth = '/sounds/cloth.mp3';
const music = '/music/piano.mp3';
//const naruto = '/music/naruto.mp3';
const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1]
];

function App() {
  const [diff, setDiff] = useState(1);
  const writtenDiff = diff == 0 ? 'easy' : diff == 1 ? 'mid' : 'hard';
  const rows = diff == 0 ? 8 : diff == 1 ? 14 : 20;
  const columns = diff == 0 ? 10 : diff == 1 ? 18 : 24;
  const [bombs, setBombs] = useState(diff == 0 ? 10 : diff == 1 ? 40 : 99)
  const ost = useRef(new Audio(music));
  ost.current.loop = true;
  const clickSound = new Audio(select);
  const clothSound = new Audio(cloth);

  const [gameGrid, setGameGrid] = useState(generateBomba(1));
  const [clickedGrid, setclickedGrid] = useState(Array.from({ length: rows }, () => Array(columns).fill(0)));
  const [flagsGrid, setFlagsGrid] = useState(Array.from({ length: rows }, () => Array(columns).fill(0)));

  const [firstClick, setFirstClick] = useState(true);
  const [musicFirstClick, setMusicFirstClick] = useState(true);
  const [lost, setLost] = useState(false);
  const [win, setWin] = useState(false);
  const [isOstOn, setIsOstOn] = useState(false);
  const [isFlagSoundOn, setIsFlagSoundOn] = useState(true);
  const gameStartTime = useRef(null);
  const [time, setTime] = useState(['00', '00']);

  const { width, height } = useWindowSize();

  useEffect(() => {
    console.log("GameGrid:", gameGrid);
  }, [gameGrid]);

  const changeDiff = (e) => {
    let newDiff = parseInt(e.target.value);
    const rows = newDiff === 0 ? 8 : newDiff === 1 ? 14 : 20;
    const columns = newDiff === 0 ? 10 : newDiff === 1 ? 18 : 24;
    setDiff(newDiff);
    setBombs(newDiff == 0 ? 10 : newDiff == 1 ? 40 : 99);
    setFirstClick(true);
    setTime(['00', '00']);
    setGameGrid(generateBomba(newDiff));
    setclickedGrid(Array(rows).fill(0).map(() => Array(columns).fill(0)));
    setFlagsGrid(Array(rows).fill(0).map(() => Array(columns).fill(0)));
  }

  const clickCell = (e, i, j) => {
    e.preventDefault();
    if (e.button === 0) {
      if (flagsGrid[i][j]) {
        return;
      }
      clickSound.play();
      if (gameGrid[i][j] === -1) {
        setLost(true);
      }
      updateSurroundings(i, j);
      if (musicFirstClick) {
        ost.current.play();
        setIsOstOn(true);
        setMusicFirstClick(false);
      }
      if (firstClick) {
        gameStartTime.current = Date.now();
        let g = new Graph(i, j, rows, columns, gameGrid);
        const bfsResult = g.bfs(`${[i]}-${[j]}`);
        console.log("BFS: ", bfsResult);
        bfsResult.map(val => {
          const [x, y] = val.split('-');
          updateSurroundings(x, y);
          setclickedGrid(prevGrid => {
            const newArr = deepCopy(prevGrid);
            newArr[x][y] = 1;
            return newArr;
          });
        });
        setFirstClick(false);
      } else {
        setclickedGrid(prevGrid => {
          const newArr = deepCopy(prevGrid);
          newArr[i][j] = 1;
          return newArr;
        });
      }
    } else if (e.button === 2) {
      isFlagSoundOn && clothSound.play();
      if (flagsGrid[i][j] === 0 && clickedGrid[i][j] === 0) {
        setFlagsGrid(prevFlags => {
          const newFlags = deepCopy(prevFlags);
          newFlags[i][j] = 1;
          return newFlags;
        });
        setBombs(prevBombs => --prevBombs);
      } else if (flagsGrid[i][j] === 1) {
        setFlagsGrid(prevFlags => {
          const newFlags = deepCopy(prevFlags);
          newFlags[i][j] = 0;
          return newFlags;
        });
        setBombs(prevBombs => ++prevBombs);
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!firstClick && !lost && !win) {
        const elapsedTime = Date.now() - gameStartTime.current;
        const seconds = String(Math.floor((elapsedTime / 1000) % 60)).padStart(2, '0');
        const minutes = String(Math.floor(elapsedTime / 60000)).padStart(2, '0');
        setTime([minutes, seconds]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [firstClick, lost, win]);

  useEffect(() => {
    checkWin(gameGrid, clickedGrid) && setWin(true);
  }, [gameGrid, clickedGrid]);


  const updateSurroundings = (i, j) => {
    i = parseInt(i, 10);
    j = parseInt(j, 10);
    if (gameGrid[i][j] === 0) {
      setclickedGrid(prevGrid => {
        const newArr = deepCopy(prevGrid);
        directions.forEach(val => {
          const [x, y] = val;
          const newX = i + x;
          const newY = j + y;
          if (newX >= 0 && newX < rows && newY >= 0 && newY < columns) {
            newArr[newX][newY] = 1;
            if (gameGrid[newX][newY] === 0 && prevGrid[newX][newY] !== 1) {
              updateSurroundings(newX, newY);
            }
          }
        });
        return newArr;
      })
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

  const gameDisplay = gameGrid.map((row, i) => row.map((value, j) =>
    <div className='cell' key={`${i}${j}`}>
      {flagsGrid[i][j] ?
        <button onMouseDown={(e) => clickCell(e, i, j)} onContextMenu={(e) => e.preventDefault()} className='flagButton'>
          <img className='flagCell' src={flag} alt="flag icon" />
        </button>
        : !clickedGrid[i][j] ?
          <button onMouseDown={(e) => clickCell(e, i, j)} onContextMenu={(e) => e.preventDefault()}></button>
          : value === -1 ? <FaBomb /> : value === 0 ? null : <span className={cellColor(value)}>{value}</span>
      }
    </div>
  ));

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
      {win &&
        <>
          <Confetti height={height} width={width} />
          <div className='clickStopper'></div>
          <div className='gameOver'>
            <button className='retry' onClick={retryClick}>
              <p>Congratulations!</p>
              <img src={play} alt="play button" width="25px" height="25px" className='coloredPlay' /> <span className='retryText'>Play Again?</span>
            </button>
          </div>
        </>
      }
      <div className='diffContainer'>
        <label htmlFor='difficulty'>Difficulty: </label>
        <select id='difficulty' onChange={changeDiff} name='difficulty' value={diff}>
          <option value="0" key="0">Easy</option>
          <option value="1" key="1">Medium</option>
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
        <p>Time: <span className='timeControl'>{time[0]}</span>:<span className='timeControl'>{time[1]}</span></p>
      </div>
      <div className='mines container'>
        <div className={`grid ${writtenDiff}`}>
          {gameDisplay}
        </div>
      </div>
    </div>
  )
}

export default App
// tasks to do: 
// 1-if user first clicks and only blank square appears, when that happens the game should search for nearest squares with numbers and open them: maybe done, to check.
// 2-after game starts, if user clicks on empty square, the game should open newarest square with numbers: maybe done, to check.
// 3-enhance win screen and remove overflow on x and y, also add this game's time and best time.
// 4-enhance adjacency detection and bfs.
// 5-keep ost settings between games.
// 6-use a fringe to enhance performance of check surroudings.
// 7-each diff has a bfs limit and you get to choose dificulty on lose and win screen.
// 8-allow user to choose track to play.