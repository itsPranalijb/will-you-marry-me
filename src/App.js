import { useState, useEffect, useRef } from "react";
import BG from "./components/BG";
import Particle from "./components/Particle";
import { Heart, Ring } from "./components/Icons";

  const STAGES = ["name","envelope","open","letter","proposal","answer"];

export default function App() {
  const [stage, setStage] = useState("name");
  const [name, setName] = useState("");
  const [particles, setParticles] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [noPos, setNoPos] = useState({x:null,y:null});
  const [noCount, setNoCount] = useState(0);
  const pId = useRef(0);
  const nameRef = useRef();

  const addParticles = (n=8) => setParticles(p=>[...p,...Array.from({length:n},()=>({id:pId.current++}))]);
  const removePart = id => setParticles(p=>p.filter(x=>x.id!==id));

  useEffect(()=>{
    if(stage==="proposal"){
      const t=setInterval(()=>addParticles(2),900);
      return ()=>clearInterval(t);
    }
  },[stage]);

  const advance = () => {
    const idx=STAGES.indexOf(stage);
    if(idx<STAGES.length-1) setStage(STAGES[idx+1]);
  };

  const containerRef = useRef();
  const scamperNo = () => {
    setNoCount(c=>c+1);
    if(!containerRef.current) return;
    const box = containerRef.current.getBoundingClientRect();
    const maxX = box.width - 140;
    const maxY = box.height - 55;
    setNoPos({x: 20 + Math.random()*Math.max(maxX-20,10), y: 20 + Math.random()*Math.max(maxY-20,10)});
  };

  return (
    <div style={{
      minHeight:580,display:"flex",alignItems:"center",ref:containerRef,
      justifyContent:"center",position:"relative",
      overflow:"hidden",fontFamily:"Georgia,serif",
      background: stage==="answer"&&answer==="yes"
        ? "linear-gradient(135deg,#fff0f5 0%,#fce4ec 50%,#fff0f5 100%)"
        : "linear-gradient(135deg,#fff5f8 0%,#fce4ec 40%,#fdf2f8 100%)",
      transition:"background 1s ease",
    }}>
      <style>{`
        @keyframes floatUp {
          0%   { transform:translateY(0) scale(1) rotate(0deg); opacity:.9; }
          80%  { opacity:.6; }
          100% { transform:translateY(-400px) scale(.25) rotate(40deg); opacity:0; }
        }
        @keyframes bgFloat {
          from { transform:translateY(0) rotate(-5deg); }
          to   { transform:translateY(-18px) rotate(5deg); }
        }
        @keyframes blobDrift1 {
          0%,100% { transform:translate(0,0) scale(1); }
          50%     { transform:translate(30px,20px) scale(1.1); }
        }
        @keyframes blobDrift2 {
          0%,100% { transform:translate(0,0) scale(1); }
          50%     { transform:translate(-25px,-18px) scale(1.08); }
        }
        @keyframes sway {
          0%,100% { transform:rotate(-5deg) scale(1); }
          50%     { transform:rotate(5deg) scale(1.04); }
        }
        @keyframes popIn {
          0%   { transform:scale(.15) rotate(-12deg); opacity:0; }
          65%  { transform:scale(1.1) rotate(3deg); opacity:1; }
          100% { transform:scale(1) rotate(0deg); opacity:1; }
        }
        @keyframes fadeSlide {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes bounce {
          0%,100% { transform:translateY(0) scale(1); }
          50%     { transform:translateY(-9px) scale(1.04); }
        }
        @keyframes pulse {
          0%,100% { transform:scale(1); }
          50%     { transform:scale(1.14); }
        }
        @keyframes shimmer {
          0%   { color:#c2185b; }
          33%  { color:#e91e8c; }
          66%  { color:#ad1457; }
          100% { color:#c2185b; }
        }
        @keyframes twinkle {
          0%,100% { opacity:1; transform:scale(1) rotate(0deg); }
          50%     { opacity:.3; transform:scale(.5) rotate(20deg); }
        }
        @keyframes yesStamp {
          0%   { transform:scale(0) rotate(-15deg); opacity:0; }
          60%  { transform:scale(1.25) rotate(4deg); opacity:1; }
          80%  { transform:scale(0.95) rotate(-2deg); }
          100% { transform:scale(1) rotate(0deg); opacity:1; }
        }
        @keyframes burst0 {
          0%   { transform:translate(0,0) scale(1); opacity:1; }
          100% { transform:translate(var(--tx),var(--ty)) scale(0); opacity:0; }
        }
        @keyframes burst1 {
          0%   { transform:translate(0,0) scale(1.2); opacity:1; }
          100% { transform:translate(var(--tx),var(--ty)) scale(0); opacity:0; }
        }
        @keyframes confettiFall {
          0%   { transform:translateY(-30px) rotate(0deg) scale(0.5); opacity:1; }
          100% { transform:translateY(120px) rotate(360deg) scale(1); opacity:0; }
        }
          0%   { transform:scale(0) rotate(0deg); opacity:1; }
          100% { transform:scale(2.2) rotate(200deg); opacity:0; }
        }
        @keyframes heartbeat {
          0%,100% { transform:scale(1); }
          14%     { transform:scale(1.32); }
          28%     { transform:scale(1); }
          42%     { transform:scale(1.2); }
          56%     { transform:scale(1); }
        }
        @keyframes rainbowBorder {
          0%   { border-color:#f48fb1; }
          25%  { border-color:#e91e8c; }
          50%  { border-color:#f06292; }
          75%  { border-color:#c2185b; }
          100% { border-color:#f48fb1; }
        }
        @keyframes slideEnv {
          from { transform:translateY(30px); opacity:0; }
          to   { transform:translateY(0); opacity:1; }
        }
        @keyframes ripple {
          0%   { transform:scale(1); opacity:.5; }
          100% { transform:scale(2.5); opacity:0; }
        }
        .sway   { animation:sway 3.2s ease-in-out infinite; }
        .pop-in { animation:popIn .58s cubic-bezier(.34,1.56,.64,1) both; }
        .bounce-btn { animation:bounce 1.8s ease-in-out infinite; }
        .heartbeat  { animation:heartbeat 1.4s ease-in-out infinite; }
        .pulse      { animation:pulse 2s ease-in-out infinite; }
        .twinkle    { animation:twinkle 2.2s ease-in-out infinite; }
        .slideEnv   { animation:slideEnv .7s cubic-bezier(.34,1.36,.64,1) both; }
      `}</style>

      <BG stage={stage}/>

      {particles.map(p=>(
        <Particle key={p.id} onDone={()=>removePart(p.id)}/>
      ))}

      <div style={{position:"relative",zIndex:1,width:"100%",display:"flex",justifyContent:"center"}}>

        {/* ── NAME INPUT ── */}
        {stage==="name" && (
          <div className="slideEnv" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:20}}>
            <div style={{
              background:"white",borderRadius:22,padding:"36px 30px",
              maxWidth:310,width:"100%",textAlign:"center",
              border:"1.5px solid #f48fb1",
              boxShadow:"0 0 0 6px #fce4ec50, 0 8px 40px #e91e8c18",
              position:"relative",overflow:"hidden",
            }}>
              <div style={{
                position:"absolute",top:0,left:0,right:0,height:5,
                background:"linear-gradient(90deg,#e91e8c,#f48fb1,#c2185b,#f48fb1,#e91e8c)",
              }}/>
              <div style={{fontSize:48,marginBottom:8,animation:"heartbeat 1.4s ease-in-out infinite"}}>🤫</div>
              <h2 style={{margin:"0 0 6px",fontSize:22,color:"#c2185b",fontWeight:700,letterSpacing:"0.03em"}}>
                Psst… a secret awaits!
              </h2>
              <p style={{margin:"0 0 6px",fontSize:15,color:"#555",lineHeight:1.75}}>
                We have a very special secret message,<br/>just for you. 💌
              </p>
              <p style={{margin:"0 0 20px",fontSize:13,color:"#aaa",fontStyle:"italic"}}>
                Put your name to reveal it…
              </p>
              <input
                ref={nameRef}
                value={name}
                onChange={e=>setName(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&name.trim()&&advance()}
                placeholder="your name…"
                style={{
                  width:"100%",boxSizing:"border-box",
                  padding:"12px 18px",fontSize:16,
                  border:"1.5px solid #f48fb1",borderRadius:28,
                  outline:"none",fontFamily:"Georgia,serif",
                  color:"#c2185b",textAlign:"center",
                  background:"#fff5f8",
                  marginBottom:16,
                }}
              />
              <button
                onClick={()=>name.trim()&&advance()}
                className="bounce-btn"
                style={{
                  background: name.trim()
                    ? "linear-gradient(135deg,#e91e8c,#c2185b)"
                    : "#eee",
                  color: name.trim() ? "white" : "#bbb",
                  border:"none",borderRadius:28,
                  padding:"11px 32px",fontSize:15,
                  cursor: name.trim() ? "pointer" : "default",
                  fontFamily:"Georgia,serif",letterSpacing:"0.05em",
                  boxShadow: name.trim() ? "0 4px 18px #e91e8c40" : "none",
                  transition:"all 0.3s ease",
                }}>
                open the letter 💌
              </button>

            </div>
          </div>
        )}

        {/* ── ENVELOPE ── */}
        {stage==="envelope" && (
          <div className="slideEnv" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:20}}>
            {/* ripple rings */}
            <div style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center"}}>
              {[0,1,2].map(i=>(
                <div key={i} style={{
                  position:"absolute",width:160,height:160,borderRadius:"50%",
                  border:"1.5px solid #f48fb1",
                  animation:`ripple 2.4s ease-out ${i*0.8}s infinite`,
                  pointerEvents:"none",
                }}/>
              ))}
              <div className="sway" onClick={advance} style={{cursor:"pointer",zIndex:1}}>
                <svg viewBox="0 0 200 145" width="195" height="145">
                  <defs>
                    <linearGradient id="eg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fce4ec"/>
                      <stop offset="100%" stopColor="#f8bbd0"/>
                    </linearGradient>
                  </defs>
                  <rect x="4" y="32" width="192" height="109" rx="8" fill="url(#eg)" stroke="#f48fb1" strokeWidth="1.5"/>
                  <polygon points="4,32 100,95 196,32" fill="#f8bbd0" stroke="#f48fb1" strokeWidth="1"/>
                  <line x1="4" y1="141" x2="100" y2="85" stroke="#f48fb1" strokeWidth="1"/>
                  <line x1="196" y1="141" x2="100" y2="85" stroke="#f48fb1" strokeWidth="1"/>
                  <polygon points="4,32 100,5 196,32" fill="#f48fb1" stroke="#e91e8c" strokeWidth="1"/>
                  <g style={{color:"#e91e8c"}} transform="translate(84,52)">
                    <Heart style={{width:32,height:32}}/>
                  </g>
                </svg>
              </div>
            </div>
            <div style={{textAlign:"center"}}>
              <p className="pulse" style={{
                margin:"0 0 4px",fontSize:14,color:"#e91e8c",
                letterSpacing:"0.12em",fontStyle:"italic",
              }}>something special awaits you…</p>
              <p style={{margin:0,fontSize:12,color:"#f48fb1",letterSpacing:"0.06em"}}>tap to open ✉</p>
            </div>
          </div>
        )}

        {/* ── OPEN ── */}
        {stage==="open" && (
          <div className="pop-in" onClick={advance} style={{cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
            <div style={{position:"relative"}}>
              <svg viewBox="0 0 200 175" width="200" height="175">
                <defs>
                  <linearGradient id="eg2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fce4ec"/>
                    <stop offset="100%" stopColor="#f8bbd0"/>
                  </linearGradient>
                </defs>
                <rect x="4" y="60" width="192" height="111" rx="8" fill="url(#eg2)" stroke="#f48fb1" strokeWidth="1.5"/>
                <polygon points="4,60 100,60 196,60 100,14" fill="#f8bbd0" stroke="#f48fb1" strokeWidth="1"/>
                <line x1="4" y1="171" x2="100" y2="118" stroke="#f48fb1" strokeWidth="1"/>
                <line x1="196" y1="171" x2="100" y2="118" stroke="#f48fb1" strokeWidth="1"/>
                <rect x="46" y="22" width="108" height="76" rx="6" fill="white" stroke="#fce4ec" strokeWidth="1"/>
                <text x="100" y="46" textAnchor="middle" fontFamily="Georgia" fontSize="9.5" fill="#e91e8c">a secret message…</text>
                <line x1="58" y1="56" x2="142" y2="56" stroke="#fce4ec" strokeWidth="1.5"/>
                <line x1="58" y1="65" x2="142" y2="65" stroke="#fce4ec" strokeWidth="1.5"/>
                <line x1="58" y1="74" x2="124" y2="74" stroke="#fce4ec" strokeWidth="1.5"/>
              </svg>
              <div style={{
                position:"absolute",top:-8,right:-8,
                background:"#e91e8c",color:"white",borderRadius:"50%",
                width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:13,animation:"pulse 2s ease-in-out infinite",
              }}>💌</div>
            </div>
            <p style={{margin:0,fontSize:13,color:"#e91e8c",letterSpacing:"0.1em",fontStyle:"italic"}}>
              tap to read 💌
            </p>
          </div>
        )}

        {/* ── LETTER ── */}
        {stage==="letter" && (
          <div className="pop-in" style={{
            background:"white",
            borderRadius:18,padding:"32px 30px",maxWidth:308,
            textAlign:"center",
            border:"1.5px solid #f48fb1",
            boxShadow:"0 0 0 6px #fce4ec60, 0 8px 40px #e91e8c18",
            animation:"rainbowBorder 4s ease-in-out infinite",
            position:"relative",overflow:"hidden",
          }}>
            <div style={{
              position:"absolute",top:0,left:0,right:0,height:5,
              background:"linear-gradient(90deg,#e91e8c,#f48fb1,#c2185b,#f48fb1,#e91e8c)",
              backgroundSize:"300% 100%",
            }}/>
            {/* corner hearts */}
            {[[0,0],[1,0],[0,1],[1,1]].map(([r,b],i)=>(
              <div key={i} className="twinkle" style={{
                position:"absolute",
                [r?"right":"left"]:10,[b?"bottom":"top"]:10,
                color:"#f48fb1",fontSize:14,animationDelay:`${i*0.35}s`,
              }}>♥</div>
            ))}
            <p style={{margin:"0 0 8px",fontSize:13,color:"#f48fb1",fontStyle:"italic",letterSpacing:"0.06em",
              animation:"fadeSlide .5s ease both",animationDelay:"0s"}}>
              To my dearest {name},
            </p>
            <p style={{margin:"0 0 14px",fontSize:15.5,color:"#444",lineHeight:1.85,
              animation:"fadeSlide .5s ease both",animationDelay:"0.2s"}}>
              You walked into my life<br/>and quietly became my whole world.
            </p>
            <p style={{margin:"0 0 14px",fontSize:15.5,color:"#444",lineHeight:1.85,
              animation:"fadeSlide .5s ease both",animationDelay:"0.38s"}}>
              Every laugh, every silence,<br/>every little moment — all of it<br/>feels complete with you.
            </p>
            <p style={{margin:"0 0 22px",fontSize:14,color:"#e91e8c",fontStyle:"italic",
              animation:"fadeSlide .5s ease both",animationDelay:"0.54s"}}>
              — your girl 🩷
            </p>
            <button onClick={advance} className="bounce-btn" style={{
              background:"linear-gradient(135deg,#e91e8c,#c2185b)",
              color:"white",border:"none",borderRadius:28,
              padding:"11px 32px",fontSize:15,cursor:"pointer",
              letterSpacing:"0.05em",boxShadow:"0 4px 18px #e91e8c40",
            }}>keep reading&nbsp;→</button>
          </div>
        )}

        {/* ── PROPOSAL ── */}
        {stage==="proposal" && (
          <div className="pop-in" style={{
            textAlign:"center",padding:"36px 28px",maxWidth:338,
            background:"white",borderRadius:22,
            border:"1.5px solid #f48fb1",
            boxShadow:"0 0 0 6px #fce4ec50, 0 8px 48px #e91e8c20",
            animation:"rainbowBorder 4s ease-in-out infinite",
            position:"relative",overflow:"hidden",
          }}>
            <div style={{
              position:"absolute",top:0,left:0,right:0,height:5,
              background:"linear-gradient(90deg,#e91e8c,#f48fb1,#c2185b,#f48fb1,#e91e8c)",
              backgroundSize:"300% 100%",
            }}/>
            {[[8,8],[92,8],[8,92],[92,92]].map(([l,t],i)=>(
              <div key={i} className="twinkle" style={{
                position:"absolute",left:`${l}%`,top:`${t}%`,
                color:["#e91e8c","#f06292","#d81b60","#ff4081"][i],
                fontSize:12,animationDelay:`${i*0.3}s`,
              }}>✦</div>
            ))}

            <div className="heartbeat" style={{marginBottom:8}}><Ring/></div>

            <h2 style={{
              margin:"0 0 6px",fontSize:30,fontWeight:700,letterSpacing:"0.04em",
              animation:"shimmer 3s ease-in-out infinite",
            }}>I love you, {name}</h2>

            <p style={{margin:"0 0 8px",fontSize:16,color:"#555",lineHeight:1.8,
              animation:"fadeSlide .5s ease both",animationDelay:"0.2s"}}>
              You're my safe place, my adventure,<br/>my best friend all in one.
            </p>
            <p style={{margin:"0 0 8px",fontSize:16,color:"#555",lineHeight:1.8,
              animation:"fadeSlide .5s ease both",animationDelay:"0.38s"}}>
              I can't imagine my future<br/>without you in every single part of it.
            </p>
            <p style={{margin:"0 0 28px",fontSize:24,color:"#c2185b",fontWeight:700,
              animation:"fadeSlide .5s ease both",animationDelay:"0.55s",
              letterSpacing:"0.02em"}}>
              {name}, will you marry me? 💍
            </p>

            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <button onClick={()=>{addParticles(16);setAnswer("yes");advance();}} style={{
                background:"linear-gradient(135deg,#e91e8c,#c2185b)",
                color:"white",border:"none",borderRadius:28,
                padding:"13px 32px",fontSize:16,cursor:"pointer",
                fontFamily:"Georgia,serif",fontWeight:600,
                boxShadow:"0 4px 18px #e91e8c50",
                animation:"bounce 1.6s ease-in-out infinite",
                letterSpacing:"0.04em",
              }}>Yes, always! 🥹</button>
              <button
                onMouseEnter={scamperNo}
                onClick={()=>{ scamperNo(); setAnswer("no"); advance(); }}
                style={{
                  background:"white",color:"#bbb",
                  border:"1px solid #eee",borderRadius:28,
                  padding:"13px 32px",fontSize:16,
                  cursor:"pointer",fontFamily:"Georgia,serif",
                  position:noPos.x!==null?"absolute":"relative",
                  left:noPos.x!==null?noPos.x:undefined,
                  top:noPos.y!==null?noPos.y:undefined,
                  transition:"left 0.07s, top 0.07s",zIndex:99,
                }}>No</button>
            </div>
            {noCount>2&&(
              <p style={{marginTop:10,fontSize:12,color:"#f48fb1",fontStyle:"italic"}}>
                😏 that button has no plans to stay still…
              </p>
            )}
            <button onClick={()=>{setStage("name");setAnswer(null);setNoPos({x:null,y:null});setNoCount(0);setName("");}} style={{
              position:"absolute",top:14,right:14,
              background:"#fce4ec",color:"#c2185b",border:"none",
              borderRadius:"50%",width:32,height:32,
              fontSize:15,cursor:"pointer",fontWeight:700,
              display:"flex",alignItems:"center",justifyContent:"center",zIndex:10,
            }}>✕</button>
          </div>
        )}

        {/* ── SAD ANSWER ── */}
        {stage==="answer"&&answer==="no"&&(
          <div className="pop-in" style={{
            textAlign:"center",padding:"36px 28px",maxWidth:338,
            background:"white",borderRadius:22,
            border:"1.5px solid #cfd8dc",
            boxShadow:"0 0 0 8px #eceff160, 0 10px 48px #90a4ae20",
            position:"relative",overflow:"hidden",
          }}>
            <div style={{
              position:"absolute",top:0,left:0,right:0,height:5,
              background:"linear-gradient(90deg,#b0bec5,#90a4ae,#78909c,#90a4ae,#b0bec5)",
            }}/>
            {/* falling tear drops */}
            {[...Array(7)].map((_,i)=>(
              <div key={i} style={{
                position:"absolute",
                left:`${10+i*13}%`,top:0,
                fontSize:16+Math.floor(Math.random()*10),
                animation:`floatUp ${2+i*0.4}s ease-in ${i*0.3}s infinite`,
                pointerEvents:"none",transform:"scaleY(-1)",
              }}>💧</div>
            ))}
            <div style={{fontSize:72,marginBottom:8,animation:"heartbeat 2s ease-in-out infinite"}}>💔</div>
            <h2 style={{
              margin:"0 0 8px",fontSize:26,
              color:"#78909c",fontWeight:700,
            }}>Oh no… 😔</h2>
            <p style={{fontSize:16,color:"#888",lineHeight:1.85,margin:"0 0 10px"}}>
              That's okay.<br/>
              My heart is a little broken,<br/>
              but I understand. 🥀
            </p>
            <p style={{fontSize:14,color:"#aaa",fontStyle:"italic",margin:"0 0 20px"}}>
              "Some love stories are just…<br/>not meant to be written yet."
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:10,alignItems:"center"}}>
            <button onClick={()=>{setStage("proposal");setAnswer(null);setNoPos({x:null,y:null});setNoCount(0);}} style={{
              background:"linear-gradient(135deg,#e91e8c,#c2185b)",
              color:"white",border:"none",borderRadius:28,
              padding:"11px 28px",fontSize:14,cursor:"pointer",
              fontFamily:"Georgia,serif",
              boxShadow:"0 4px 14px #e91e8c30",
            }}>let me ask again 🥺</button>
            <button onClick={()=>{setStage("name");setAnswer(null);setNoPos({x:null,y:null});setNoCount(0);setName("");}} style={{
              background:"white",color:"#bbb",border:"1px solid #eee",
              borderRadius:28,padding:"10px 24px",fontSize:13,
              cursor:"pointer",fontFamily:"Georgia,serif",
            }}>back to start 🏠</button>
            </div>
          </div>
        )}

        {/* ── ANSWER YES ── */}
        {stage==="answer"&&answer==="yes"&&(
          <div style={{position:"relative",width:"100%",display:"flex",justifyContent:"center"}}>
            {/* big burst particles outside card */}
            {[...Array(24)].map((_,i)=>{
              const angle=(i/24)*360;
              const dist=120+Math.random()*80;
              const rad=angle*Math.PI/180;
              const tx=Math.cos(rad)*dist, ty=Math.sin(rad)*dist;
              const icons=["❤️","💗","🌸","💖","✨","🌺","💝"];
              return (
                <div key={i} style={{
                  position:"absolute",top:"50%",left:"50%",
                  fontSize:14+Math.floor(Math.random()*14),
                  pointerEvents:"none",
                  animation:`burst${i%2} ${0.7+Math.random()*0.5}s ease-out ${Math.random()*0.4}s both`,
                  "--tx":`${tx}px`,"--ty":`${ty}px`,
                }}>
                  {icons[i%icons.length]}
                </div>
              );
            })}

            <div className="pop-in" style={{
              textAlign:"center",padding:"36px 28px",maxWidth:338,width:"100%",
              background:"white",borderRadius:22,
              border:"1.5px solid #f48fb1",
              boxShadow:"0 0 0 8px #fce4ec60, 0 10px 60px #e91e8c28",
              animation:"rainbowBorder 3s ease-in-out infinite",
              position:"relative",overflow:"hidden",zIndex:2,
            }}>
              <button onClick={()=>{setStage("name");setAnswer(null);setNoPos({x:null,y:null});setNoCount(0);setName("");}} style={{
                position:"absolute",top:14,right:14,
                background:"#fce4ec",color:"#c2185b",border:"none",
                borderRadius:"50%",width:32,height:32,
                fontSize:15,cursor:"pointer",fontWeight:700,
                display:"flex",alignItems:"center",justifyContent:"center",zIndex:10,
              }}>✕</button>
              <div style={{
                position:"absolute",top:0,left:0,right:0,height:5,
                background:"linear-gradient(90deg,#e91e8c,#f48fb1,#c2185b,#f48fb1,#e91e8c)",
                backgroundSize:"300% 100%",
              }}/>

              {/* confetti inside card */}
              {[...Array(22)].map((_,i)=>(
                <div key={i} style={{
                  position:"absolute",
                  left:`${5+Math.random()*90}%`,
                  top:`${Math.random()*100}%`,
                  fontSize:13+Math.floor(Math.random()*16),
                  animation:`confettiFall ${1+Math.random()*1.2}s ease-out ${Math.random()*0.8}s both`,
                  pointerEvents:"none",
                }}>{"❤️✦🌸💗🌺💖💝"[Math.floor(Math.random()*7)]}</div>
              ))}

              {/* YES text stamp */}
              <div style={{
                fontSize:72,fontWeight:900,letterSpacing:"-2px",
                background:"linear-gradient(135deg,#e91e8c,#ff4081,#c2185b)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                backgroundClip:"text",
                animation:"yesStamp .6s cubic-bezier(.36,1.6,.64,1) both",
                lineHeight:1,marginBottom:4,fontFamily:"Georgia,serif",
              }}>YES!</div>

              <div style={{fontSize:52,marginBottom:6,animation:"heartbeat 1.1s ease-in-out infinite"}}>💍</div>

              <h2 style={{
                margin:"0 0 8px",fontSize:26,
                background:"linear-gradient(135deg,#e91e8c,#c2185b)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                backgroundClip:"text",fontWeight:700,
              }}>He said YES! 🎉</h2>

              <p style={{fontSize:15,color:"#555",lineHeight:1.85,margin:"0 0 8px"}}>
                From this moment, every sunrise<br/>belongs to both of us. 🌅
              </p>
              <p style={{fontSize:14,color:"#e91e8c",fontStyle:"italic",margin:"0 0 18px"}}>
                "In all the world, there is no heart for me like yours." 💞
              </p>
              <div style={{display:"flex",justifyContent:"center",gap:8,fontSize:28,marginBottom:12}}>
                <span className="heartbeat" style={{animationDelay:"0s"}}>❤️</span>
                <span className="heartbeat" style={{animationDelay:"0.2s"}}>🤵</span>
                <span className="heartbeat" style={{animationDelay:"0.4s"}}>👰</span>
                <span className="heartbeat" style={{animationDelay:"0.6s"}}>❤️</span>
              </div>
              <div style={{display:"flex",justifyContent:"center",gap:10}}>
                {["0s","0.22s","0.44s","0.66s","0.88s"].map((d,i)=>(
                  <span key={i} style={{animationDelay:d,color:"#e91e8c",display:"inline-block",
                    animation:`heartbeat 1.4s ease-in-out ${d} infinite`}}>
                    <Heart style={{width:["22px","17px","28px","16px","22px"][i],height:["22px","17px","28px","16px","22px"][i]}}/>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}