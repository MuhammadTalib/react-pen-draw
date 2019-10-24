import React, { Component } from 'react'

import PenDraw from 'react-pen-draw'

export default class App extends Component {
  state={
    clear:0
  }
  render () {
    return (
      <div>
        <button onClick={()=>{this.setState({clear:1})}}>clear</button>
        <PenDraw 
          clearScreen={this.state.clear}
          lineWidth={2}
          lineColor="#000"
          style={{
            border:"1px solid",
            width:"400px",
            height:"400px"
          }}
        />
      </div>
    )
  }
}
