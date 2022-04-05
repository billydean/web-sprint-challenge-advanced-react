import React from 'react'
import axios from 'axios';

const dummyArray = [0,0,0,0,0,0,0,0]
const initialState = {
  grid: [0,0,0,0,1,0,0,0,0],
  active: 4,
  steps: 0,
  email: "",
  message: ""
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

  render() {
    const { className } = this.props;
    const { grid } = this.state;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (x,y)</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>

        <div id="grid">
          {
            grid.map(each=>{
              return <div className={this.squareClasser(each)}>{this.squareFiller(each)}</div>
            })
          }
          {/* <div className={`square ${grid[0][0]}`}>{grid[0][1]}</div>
          <div className={`square ${grid[1][0]}`}>{grid[1][1]}</div>
          <div className={`square ${grid[2][0]}`}>{grid[2][1]}</div>
          <div className={`square ${grid[3][0]}`}>{grid[3][1]}</div>
          <div className={`square ${grid[4][0]}`}>{grid[4][1]}</div>
          <div className={`square ${grid[5][0]}`}>{grid[5][1]}</div>
          <div className={`square ${grid[6][0]}`}>{grid[6][1]}</div>
          <div className={`square ${grid[7][0]}`}>{grid[7][1]}</div>
          <div className={`square ${grid[8][0]}`}>{grid[8][1]}</div> */}
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={Function.prototype}>LEFT</button>
          <button id="up" onClick={Function.prototype}>UP</button>
          <button id="right" onClick={Function.prototype}>RIGHT</button>
          <button id="down" onClick={Function.prototype}>DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
    }
  }

