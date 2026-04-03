import React from "react";

export const Heart = ({ style }) => (
  <svg viewBox="0 0 100 90" style={style}>
    <path d="M50 80 C50 80 10 55 10 30 C10 15 22 5 35 5 C42 5 48 9 50 13 C52 9 58 5 65 5 C78 5 90 15 90 30 C90 55 50 80 50 80Z" fill="currentColor"/>
  </svg>
);

export const Star = ({ style }) => (
  <svg viewBox="0 0 24 24" style={style}>
    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="currentColor"/>
  </svg>
);

export const Ring = () => (
  <svg viewBox="0 0 140 140" width="110" height="110">
    <defs>
      <radialGradient id="rg1" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#fce4ec"/>
        <stop offset="45%" stopColor="#f48fb1"/>
        <stop offset="100%" stopColor="#c2185b"/>
      </radialGradient>
      <radialGradient id="rg2" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#fff8e1"/>
        <stop offset="50%" stopColor="#ffca28"/>
        <stop offset="100%" stopColor="#e65100"/>
      </radialGradient>
    </defs>
    <ellipse cx="70" cy="108" rx="38" ry="10" fill="#00000015"/>
    <path d="M32 70 A38 38 0 1 1 108 70" stroke="url(#rg2)" strokeWidth="13" fill="none" strokeLinecap="round"/>
    <ellipse cx="70" cy="30" rx="20" ry="13" fill="url(#rg2)" stroke="#ffd54f" strokeWidth="1.5"/>
    <polygon points="70,10 84,27 70,33 56,27" fill="url(#rg1)" stroke="#f48fb1" strokeWidth="0.8"/>
    <polygon points="70,10 84,27 70,22" fill="#fce4ec" opacity="0.7"/>
    <polygon points="70,10 56,27 70,22" fill="#f8bbd0" opacity="0.6"/>
    <circle cx="84" cy="18" r="3" fill="#fce4ec" opacity="0.8"/>
    <circle cx="60" cy="14" r="2" fill="#fff" opacity="0.7"/>
  </svg>
);

export default null;
