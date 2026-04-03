import React from "react";
import { Heart, Star } from "./Icons";

const Particle = ({ onDone }) => {
  const left = 5 + Math.random() * 90;
  const dur = 2.8 + Math.random() * 2.2;
  const size = 11 + Math.random() * 20;
  const delay = Math.random() * 0.7;
  const type = Math.floor(Math.random() * 3);
  const color = ["#e91e8c","#f06292","#ff4081"][type];
  return (
    <div onAnimationEnd={onDone} style={{
      position:"absolute",left:`${left}%`,bottom:0,
      width:size,height:size,color,pointerEvents:"none",opacity:0,
      animation:`floatUp ${dur}s ease-in ${delay}s forwards`,
    }}>
      {type===0?<Heart style={{width:"100%",height:"100%"}}/>:
       type===1?<Star style={{width:"100%",height:"100%"}}/>:
       <div style={{width:"100%",height:"100%",borderRadius:"50%",background:color}}/>}
    </div>
  );
};

export default Particle;
