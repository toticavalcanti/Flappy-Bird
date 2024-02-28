import styled from "styled-components";
import { useEffect, useState } from "react";

/**
 * All the constant values required for the game to work.
 * By changing these values we can effect the working of the game.
 */
const BIRD_HEIGHT = 28;
const BIRD_WIDTH = 33;
const WALL_HEIGHT = 600;
const WALL_WIDTH = 400;
const GRAVITY = 8;
const OBJ_WIDTH = 52;
const OBJ_SPEED = 6;
const OBJ_GAP = 200;

/**
 * This function is the main component which renders all the game objects.
 * @returns None
 */
function App() {

  //Changing the game values based on the activities done in the game.
  const [isStart, setIsStart] = useState(false);
  const [birdpos, setBirdpos] = useState(300);
  const [objHeight, setObjHeight] = useState(0);
  const [objPos, setObjPos] = useState(WALL_WIDTH);
  const [score, setScore] = useState(0);

  //End the game when the player hits the bottom of the screen.
  useEffect(() => {
      let intVal;
      if (isStart && birdpos < WALL_HEIGHT - BIRD_HEIGHT) {
          intVal = setInterval(() => {
              setBirdpos((birdpos) => birdpos + GRAVITY);
          }, 24);
      } else {
          setIsStart(false);
          setBirdpos(300);
          setScore(0);
      }
      return () => clearInterval(intVal);
  }, [isStart, birdpos]);

  //Generating the pipes(obstacles) for the game.
  useEffect(() => {
      let objval;
      if (isStart && objPos >= -OBJ_WIDTH) {
          objval = setInterval(() => {
              setObjPos((objPos) => objPos - OBJ_SPEED);
          }, 24);

          return () => {
              clearInterval(objval);
          };
      } else {
          setObjPos(WALL_WIDTH);
          setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - OBJ_GAP)));
          if (isStart) setScore((score) => score + 1);
      }
  }, [isStart, objPos]);

  //Ends the game of the player hits one of the obstacles.
  useEffect(() => {
      let topObj = birdpos >= 0 && birdpos < objHeight;
      let bottomObj =
          birdpos <= WALL_HEIGHT &&
          birdpos >=
          WALL_HEIGHT - (WALL_HEIGHT - OBJ_GAP - objHeight) - BIRD_HEIGHT;

      if (
          objPos >= OBJ_WIDTH &&
          objPos <= OBJ_WIDTH + 80 &&
          (topObj || bottomObj)
      ) {
          setIsStart(false);
          setBirdpos(300);
          setScore(0);
      }
  }, [isStart, birdpos, objHeight, objPos]);

  useEffect(() => {
      const handleKeyPress = (e) => {
          if (e.code === 'Space') {
              setIsStart(true);
              setBirdpos((prev) => prev - 30);
          }
      };

      window.addEventListener('keypress', handleKeyPress);

      return () => {
          window.removeEventListener('keypress', handleKeyPress);
      };
  }, [isStart, birdpos]); // Add isStart and birdpos to the dependency list  

  //Handles the player movements.
  const handler = () => {
      if (!isStart) setIsStart(true);
      else if (birdpos < BIRD_HEIGHT) setBirdpos(0);
      else setBirdpos((birdpos) => birdpos - 50);
  };

  const handleKeyDown = (event) => {
      // Check if the pressed key is the spacebar
      if (event.key === ' ' || event.key === 'Spacebar') {
          // Prevent the default behavior to avoid scrolling the page
          event.preventDefault();

          // Trigger the click event
          handler();
      }
  };

  return (
      // Whole body of the game.
      <Home onClick = { handler }
        onKeyDown = { handleKeyDown }
        tabIndex = "0" >
        <ScoreShow> Score: { score } </ScoreShow> 
        <Background 
          height = { WALL_HEIGHT }
          width = { WALL_WIDTH } > {!isStart && <Startboard> Click To Start </Startboard>} 
          <Obj
            height = { objHeight }
            width = { OBJ_WIDTH }
            left = { objPos }
            top = { 0 }
            deg = { 180 }
          />
          <
            Bird
            height = { BIRD_HEIGHT }
            width = { BIRD_WIDTH }
            top = { birdpos }
            left = { 100 }
          /> <
            Obj
            height = { WALL_HEIGHT - OBJ_GAP - objHeight }
            width = { OBJ_WIDTH }
            left = { objPos }
            top = { WALL_HEIGHT - (objHeight + (WALL_HEIGHT - OBJ_GAP - objHeight)) }
            deg = { 0 }
          /> 
          </Background> 
        </Home>
      );

  }

  export default App;

  //All the stylesheets required for the game.
  const Home = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Corrected property name */
`;


  const Background = styled.div `
  background-image: url("./images/background-day.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
`;

  const Bird = styled.div `
  position: absolute;
  background-image: url("./images/yellowbird-upflap.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

  const Obj = styled.div `
  position: relative;
  background-image: url("./images/pipe-green.png");
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`;

  const Startboard = styled.div `
  position: relative;
  top: 49%;
  background-color: black;
  padding: 10px;
  width: 100px;
  left: 50%;
  margin-left: -50px;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
`;

    const ScoreShow = styled.div `
  position: absolute;
  top: 10%;
  left: 47%;
  z-index: 1;
  font-weight: bold;
  font-size: 30px;
`;
