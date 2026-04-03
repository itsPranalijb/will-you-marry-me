import React from "react";

const BG = ({ stage }) => {
  return (
    <div style={{
      position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0,
    }}>
      <div style={{
        position:"absolute",width:320,height:320,borderRadius:"50%",
        background:"radial-gradient(circle,#fce4ec88 0%,transparent 70%)",
        top:"-80px",left:"-80px",
        animation:"blobDrift1 8s ease-in-out infinite",
      }}/>
      <div style={{
        position:"absolute",width:260,height:260,borderRadius:"50%",
        background:"radial-gradient(circle,#f8bbd066 0%,transparent 70%)",
        bottom:"-60px",right:"-60px",
        animation:"blobDrift2 10s ease-in-out infinite",
      }}/>
      <div style={{
        position:"absolute",width:180,height:180,borderRadius:"50%",
        background:"radial-gradient(circle,#ff80ab44 0%,transparent 70%)",
        top:"40%",left:"60%",
        animation:"blobDrift1 12s ease-in-out infinite reverse",
      }}/>
      {[...Array(10)].map((_,i)=>(
        <div key={i} style={{
          position:"absolute",
          left:`${8+i*9}%`,
          top:`${10+((i*37)%80)}%`,
          color:"#f48fb1",
          opacity:0.13+Math.random()*0.1,
          fontSize:10+Math.floor(i*2.5),
          animation:`bgFloat ${5+i*0.7}s ease-in-out ${i*0.4}s infinite alternate`,
          pointerEvents:"none",
        }}>♥</div>
      ))}
      {[["7%","10%"],["93%","8%"],["4%","78%"],["96%","72%"],["50%","4%"],["20%","90%"],["80%","88%" ]].map(([l,t],i)=>(
        <div key={i} style={{
          position:"absolute",left:l,top:t,
          color:["#e91e8c","#f06292","#d81b60","#ff4081","#e91e8c","#f48fb1","#f06292"][i],
          fontSize:[13,10,12,15,9,11,14][i],
          animation:`twinkle ${1.8+i*0.3}s ease-in-out ${i*0.25}s infinite`,
          pointerEvents:"none",
        }}>✦</div>
      ))}
    </div>
  );
};

export default BG;
