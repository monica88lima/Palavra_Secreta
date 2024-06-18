import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/play.svg';
import './App.css';
import StartScreen from './components/StartScreen';
import { useCallback, useEffect } from 'react';
import {bancoPalavras} from "./data/data";
import JogandoPalavraSecreta from './components/JogandoPalavraSecreta';
import FinalPartida from './components/FinalPartida';


const statusPartida =[
  {id:1 , nome: "iniciar"},
  {id:2 , nome: "jogando"},
  {id:3, nome: "finalizado"},
]
function App() {
  const [count, setCount] = useState(0);

  const [statusJogo, useStateStatusJogo] = useState(statusPartida[0].nome);
  const [palavras] = useState(bancoPalavras);
  console.log(palavras);

  const comecarJogo = ()=>{
    useStateStatusJogo (statusPartida[1].nome);
  }
 
  const verificaLetra = () => {
    useStateStatusJogo (statusPartida[2].nome);
  }
  const reiniciar =()=>{
    useStateStatusJogo (statusPartida[0].nome);
  }

  return (
    <>
    <div className='App'>
      {statusJogo === 'iniciar' && <StartScreen comecar={comecarJogo}/>}
      {statusJogo === 'jogando' && <JogandoPalavraSecreta verificaLetra = {verificaLetra}/>}
      {statusJogo === 'finalizado' && <FinalPartida reiniciar ={reiniciar }/>}
      
    </div>
   
    </>
  )
}

export default App
