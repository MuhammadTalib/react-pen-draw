import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class PenDraw extends Component {
  static propTypes = {
    style: PropTypes.object,
    clearScreen:PropTypes.oneOfType([PropTypes.bool,PropTypes.number]),
    lineWidth:PropTypes.number,
    lineColor:PropTypes.string
  }
  state={
    cvs:null,
    ctx:null,
    mouse:0,
		x1:0,
    y1:0,
    x2:0,
    y2:0,
    clearScreen:0
  }
  componentDidMount(){
    var cvs=document.getElementById("mycanvas")
    var ctx=cvs.getContext("2d");
    this.setState({cvs,ctx})
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.clearScreen){
      this.clearCanvas()
    }
  }
  getMousePos(e){
    var rect=this.state.cvs.getBoundingClientRect();
    return{
        x:e.clientX-rect.left,
        y:e.clientY-rect.top
    }
  }
  clearCanvas(){
    const cvs=document.getElementById("mycanvas")
    const ctx = cvs.getContext("2d")
    ctx.save()
    ctx.globalCompositeOperation ="copy"
    ctx.strokeStyle="transparent"
    ctx.beginPath()
    ctx.lineTo(0,0)
    ctx.stroke()
    ctx.restore()
  }
  onMouseUp=(e)=>{
    this.setState({mouse:0})
  }
  onMouseDown=(e)=>{
    var p=this.getMousePos(e)
    this.setState({
      mouse:1,
			x1:p.x,
      y1:p.y
    })
  }
  drawLine(p,q){
    var ctx=this.state.ctx
    ctx.beginPath()
    ctx.strokeStyle = this.props.lineColor;
    ctx.lineJoin="round";
    ctx.lineCap="round";
    ctx.lineWidth = this.props.lineWidth;
    ctx.moveTo(p.x,p.y);
    ctx.lineTo(q.x,q.y);
    ctx.stroke();
  }
  onMouseMove=(e)=>{
    var {x1,y1,mouse}=this.state
    if(mouse){
      var p= this.getMousePos(e)
		  this.setState({x2:p.x,y2:p.y})
      this.drawLine({x:x1,y:y1},p)
      this.setState({
        x1:p.x,
        y1:p.y
      })
    }
  }
  render() {
    const {
      style
    } = this.props
    
    return (
      <div>
      <canvas 
        id="mycanvas"
        width={style? style.width : "200px"} height={style?style.height: "200px"}
        style={{...style}}
        onMouseUp={this.onMouseUp}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        >

        </canvas>
      </div>
    )
  }
}
