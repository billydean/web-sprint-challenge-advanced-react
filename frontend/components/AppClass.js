import React from 'react'
import axios from 'axios';

let dummyArray = [0,0,0,0,0,0,0,0,0]

const initialState = {
  grid: [0,0,0,0,1,0,0,0,0],
  active: 4,
  steps: 0,
  email: "",
  message: "",
}

export default class AppClass extends React.Component {
  state = initialState;

  squareClasser = (num) => {
    switch(num) {
      case 0: return "square";
      case 1: return "square active";
    }
  }
  squareFiller = (num) => {
    switch(num) {
      case 0: return "";
      case 1: return "B";
    }
  }
  detCriteria= (direction) => {
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

  changeGrid = (position) => {
    dummyArray = [0,0,0,0,0,0,0,0,0];
    dummyArray[position] = 1;
    return dummyArray;
  }

  onChange = (e) => {
    const { value } = e.target;
    this.setState({
      ...this.state,
      email: value
    })
  }
  getCoordinates = (position) => {
    switch(position) {
      case 0: return [1,1];
      case 1: return [1,2];
      case 2: return [1,3];
      case 3: return [2,1];
      case 4: return [2,2];
      case 5: return [2,3];
      case 6: return [3,1];
      case 7: return [3,2];
      case 8: return [3,3];
    }
  }

  move = (position, direction) => {
    //check limit
    let limits = this.detCriteria(direction);
    let bucket = this.state.active;
    let count = this.state.steps;
    let newGrid = [];
    if (limits.includes(position)) {
      this.setState({
        ...this.state,
        message: `You can't go ${direction}`
      })
    } else {
      switch (direction) {
        case "up":
          bucket -= 3;
          newGrid = this.changeGrid(bucket);
          count += 1;
          this.setState({
            ...this.state,
            active: bucket,
            steps: count,
            grid: newGrid,
          });
          break;
        case "down":
          bucket += 3;
          newGrid = this.changeGrid(bucket);
          count += 1;
          this.setState({
            ...this.state,
            active: bucket,
            steps: count,
            grid: newGrid,
          });
          break;
        case "left":
          bucket -= 1;
          newGrid = this.changeGrid(bucket);
          count += 1;
          this.setState({
            ...this.state,
            active: bucket,
            steps: count,
            grid: newGrid,
          });
          break;
        case "right":
          bucket += 1;
          newGrid = this.changeGrid(bucket);
          count += 1;
          this.setState({
            ...this.state,
            active: bucket,
            steps: count,
            grid: newGrid,
          });
          break;
      }
    }

  }


  render() {
    const { className } = this.props;
    const { grid, active,steps,email,message } = this.state;
    let [x, y] = this.getCoordinates(active);

    const onSubmit = (e) => {
      e.preventDefault();
      axios.post(`http://localhost:9000/api/result`, {
        x:x,
        y:y,
        steps: steps,
        email: email
      })
        .then(res => {
          this.setState({
          ...this.state,
          email: "",
          message: res.data.message,
        })})
        .catch(err => {
          this.setState({
            ...this.state,
            email: "",
            message: err.response.data.message
          })
        })
    }
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({x},{y})</h3>
          <h3 id="steps">You moved {steps} times</h3>
        </div>

        <div id="grid">
          {
            grid.map(each=>{
              return <div className={this.squareClasser(each)}>{this.squareFiller(each)}</div>
            })
          }

        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={()=>{this.move(active,"left")}}>LEFT</button>
          <button id="up" onClick={()=>{this.move(active,"up")}}>UP</button>
          <button id="right" onClick={()=>{this.move(active,"right")}}>RIGHT</button>
          <button id="down" onClick={()=>{this.move(active,"down")}}>DOWN</button>
          <button id="reset" onClick={()=>{this.setState(initialState)}}>reset</button>
        </div>
        <form onSubmit={onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
    }
  }

