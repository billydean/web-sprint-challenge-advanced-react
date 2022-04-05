// import React from 'react'
// import axios from 'axios';

// const dummyArray = [0,0,0,0,0,0,0,0]
// const initialState = {
//   grid: [0,0,0,0,1,0,0,0,0],
//   active: 4,
//   steps: 0,
//   email: "",
//   message: ""
// }

// export default class AppClass extends React.Component {
//   state = initialState;

//   squareClasser = (num) => {
//     switch(num) {
//       case 0: return "square";
//       case 1: return "square active";
//     }
//   }
//   squareFiller = (num) => {
//     switch(num) {
//       case 0: return "";
//       case 1: return "B";
//     }
//   }
//   getCoordinates = () => {
//     let a = this.state.numGrid.indexOf(1);
//     switch (a) {
//       case 0: return [1,1];
//       case 1: return [1,2];
//       case 2: return [1,3];
//       case 3: return [2,1];
//       case 4: return [2,2];
//       case 5: return [2,3];
//       case 6: return [3,1];
//       case 7: return [3,2];
//       case 8: return [3,3];
//     }
//   }

//   checkUp = (y) => {
//     if (y < 4 && y > 1) {
//       return true;
//     } else {return false;}
//   }
//   checkDown = (y) => {
//     if (y < 3 && y > 0) {
//       return true;
//     } else {return false;}
//   }
//   checkLeft = (x) => {
//     if (x < 4 && x > 1) {
//       return true;
//     } else {return false;}
//   }
//   checkRight = (x) => {
//     if (x < 3 && x > 0) {
//       return true;
//     } else {return false;}
//   }
//   changeActive = (direction) => {
//     let a = this.state.numGrid.indexOf(1);
//     let trackActive = null;
//     let newGrid = [...this.state.grid];
//     let newNumGrid = [...this.state.numGrid];
//     if (direction === "up") {
//       trackActive = a - 3;
//     } else if (direction === "down") {
//       trackActive = a + 3;
//     } else if (direction === "left") {
//       trackActive = a - 1;
//     } else {trackActive = a + 1;}
//     newGrid[a] = [null,""];
//     newGrid[trackActive] = ["active","B"];
//     newNumGrid[a] = 0;
//     newNumGrid[trackActive] = 1;
//     this.setState({
//       ...this.state,
//       grid: newGrid,
//       numGrid: newNumGrid,
//     });
//     console.log(this.state);
//   }

//     takeStep = (direction) => {
//       let [x,y] = this.getCoordinates();
//       if (direction === "up") {
//         y -= 1;
//       } else if (direction === "down") {
//         y += 1;
//       } else if (direction === "left") {
//         x -= 1;
//       } else if (direction === "right") {
//         x += 1;
//       } else { }
//       this.setState({
//         ...this.state,
//         steps: this.state.steps + 1, 
//       });
//     }
    
//     step = (direction, checkDir, axis) => {
//         if (checkDir(axis) === false) {
//         this.setState({
//           ...this.state,
//           message: 'You cannot',
//         }) } else {
//         this.takeStep(direction);
//         this.changeActive(direction);
//     }
//   }

  
//   // changeGridTest = () => {
//   //   let a = this.state.numGrid.indexOf(1);
//   //   let b = null;
//   //   let newNumGrid = [...this.state.numGrid];
//   //   let newGrid = [...this.state.grid];
//   //   if (a === 8) {
//   //     b = 0;
//   //   } else { b = (a + 1) }
//   //   newGrid[a] = [null,""];
//   //   newGrid[b] = ["active","B"];
//   //   newNumGrid[a] = 0;
//   //   newNumGrid[b] = 1;
//   //   this.setState({
//   //     ...this.state,
//   //     grid: newGrid,
//   //     numGrid: newNumGrid,
//   //   })
//   // 
//   //  grid in STATE
//   //    0,0,0,0,1,0,0,0,0
//   //  coordinategetter HELPER

//   //  count steps in STATE
//   //  email in STATE
//   //  message in STATE
//   //  reset position/counter HELPER
//   //  change active square HELPER
//   //  set active class and textcontent HELPER


//   render() {
//     const { className } = this.props;
//     const { grid } = this.state;
//     const zoob = this.getCoordinates();
//     return (
//       <div id="wrapper" className={className}>
//         <div className="info">
//           <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
//           <h3 id="steps">You moved {this.state.steps} times</h3>
//         </div>

//         <div id="grid">
//           {
//             grid.map(each=>{
//               <div className={squareClasser(each)}>{squareFiller(each)}</div>
//             })
//           }
//           {/* <div className={`square ${grid[0][0]}`}>{grid[0][1]}</div>
//           <div className={`square ${grid[1][0]}`}>{grid[1][1]}</div>
//           <div className={`square ${grid[2][0]}`}>{grid[2][1]}</div>
//           <div className={`square ${grid[3][0]}`}>{grid[3][1]}</div>
//           <div className={`square ${grid[4][0]}`}>{grid[4][1]}</div>
//           <div className={`square ${grid[5][0]}`}>{grid[5][1]}</div>
//           <div className={`square ${grid[6][0]}`}>{grid[6][1]}</div>
//           <div className={`square ${grid[7][0]}`}>{grid[7][1]}</div>
//           <div className={`square ${grid[8][0]}`}>{grid[8][1]}</div> */}
//         </div>
//         <div className="info">
//           <h3 id="message"></h3>
//         </div>
//         <div id="keypad">
//           <button id="left" onClick={()=>{this.step("left",this.checkLeft,zoob[0])}}>LEFT</button>
//           <button id="up" onClick={()=>{this.step("up",this.checkUp,zoob[1])}}>UP</button>
//           <button id="right" onClick={()=>{this.step("right",this.checkRight,zoob[0])}}>RIGHT</button>
//           <button id="down" onClick={()=>{this.step("down",this.checkDown,zoob[1])}}>DOWN</button>
//           <button id="reset">reset</button>
//         </div>
//         <form>
//           <input id="email" type="email" placeholder="type email"></input>
//           <input id="submit" type="submit"></input>
//         </form>
//       </div>
//     )
//     }
//   }


//   /**
//    * [[null, null, null], [null, "B", null], [null, null, null]]
//    *  1,1 1,2 1,3   2,1 2,2 2,3   3,1 3,2 3,3
//    *  0   1   2     3   4   5     6   7   8
//    * 
//    * 
//    * 
//    */