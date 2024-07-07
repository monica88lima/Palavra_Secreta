import React from 'react'
import "./Acertou.css";
import ganhouImg from '../assets/ganhou.png';

function Acertou({comecarJogo}) {
  return (
    <div className='acertou'>
       <img src={ganhouImg} alt="Ganhou" />
        <button onClick={()=>comecarJogo('facil')}>Acertou! </button>
    </div>
  )
}

export default Acertou