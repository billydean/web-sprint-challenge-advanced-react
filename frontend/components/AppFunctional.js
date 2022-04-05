import React, {useState} from 'react'
import axios from 'axios';

export default function AppFunctional(props) {
  let dummyArray = [0,0,0,0,0,0,0,0,0]
  const [grid, setGrid] = useState([0,0,0,0,1,0,0,0,0]);
  const [active, setActive] = useState(4);
  const [steps, setSteps] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const squareClasser = (num) => {
    switch(num) {
      case 0: return "square";
      case 1: return "square active";
    }
  }
  const squareFiller = (num) => {
    switch(num) {
      case 0: return "";
      case 1: return "B";
    }
  }
  const detCriteria = (direction) => {
    switch(direction) {
      case "up":
        return [0,1,2];
      case "down":
        return [6,7,8];
      case "left":
        return [0,3,6];
      case "right":
        return [2,5,8];
    }
  }

  const changeGrid = (position) => {
    dummyArray = [0,0,0,0,0,0,0,0,0];
    dummyArray[position] = 1;
    return dummyArray;
  }

  const onChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  }

  const getX = (position) => {
    switch(position) {
      case 0: return 1;
      case 1: return 2;
      case 2: return 3;
      case 3: return 1;
      case 4: return 2;
      case 5: return 3;
      case 6: return 1;
      case 7: return 2;
      case 8: return 3;
    }
  }

  const getY = (position) => {
    switch(position) {
      case 0: return 1;
      case 1: return 1;
      case 2: return 1;
      case 3: return 2;
      case 4: return 2;
      case 5: return 2;
      case 6: return 3;
      case 7: return 3;
      case 8: return 3;
    }
  }

  const move = (position, direction) => {
    let limits = detCriteria(direction);
    let bucket = active;
    let count = steps;
    let newGrid = [];
    if (limits.includes(position)) {
      setMessage(`You can't go ${direction}`)
    } else {
      switch (direction) {
        case "up":
          bucket -= 3;
          newGrid = changeGrid(bucket);
          count += 1;
          setActive(bucket);
          setSteps(count);
          setGrid(newGrid);
          break;
        case "down":
          bucket += 3;
          newGrid = changeGrid(bucket);
          count += 1;
          setActive(bucket);
          setSteps(count);
          setGrid(newGrid);
          break;
        case "left":
          bucket -= 1;
          newGrid = changeGrid(bucket);
          count += 1;
          setActive(bucket);
          setSteps(count);
          setGrid(newGrid);
          break;
        case "right":
          bucket += 1;
          newGrid = changeGrid(bucket);
          count += 1;
          setActive(bucket);
          setSteps(count);
          setGrid(newGrid);
          break;
      }
    }
  }

  const resetHandler = () => {
    setGrid([0,0,0,0,1,0,0,0,0]);
    setActive(4);
    setSteps(0);
    setEmail("");
    setMessage("");
  }

const onSubmit = (e) => {
  e.preventDefault();
  axios.post(`http://localhost:9000/api/result`, {
    x: getX(active),
    y: getY(active),
    steps: steps,
    email: email
  })
  .then(res => {
    setEmail("");
    setMessage(res.data.message);
    e.preventDefault();
   })
  .catch(err => {
    setEmail("");
    setMessage(err.response.data.message);
    e.preventDefault();
  })
}


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({getX(active)}, {getY(active)})</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
          {
            grid.map(each=>{
              return <div className={squareClasser(each)}>{squareFiller(each)}</div>
            })
          }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={()=>{move(active,"left")}}>LEFT</button>
        <button id="up" onClick={()=>{move(active,"up")}}>UP</button>
        <button id="right" onClick={()=>{move(active,"right")}}>RIGHT</button>
        <button id="down" onClick={()=>{move(active,"down")}}>DOWN</button>
        <button id="reset" onClick={()=>resetHandler()}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
