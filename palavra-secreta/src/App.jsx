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
  
  const [palavraescolhida, setPalavraescolhida] = useState("");
  const [categoriaescolhida, setcategoriaescolhida] = useState("");
  const [letras, setletras] = useState([]);

  //function determinar categoria e palavra
  const escolherPalavraECategoria =() => {
   const categorias = Object.keys(bancoPalavras);
   const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)];

   const palavra = bancoPalavras[categoria][Math.floor(Math.random() * bancoPalavras[categoria].length)];
  return {palavra, categoria};
  }

  const comecarJogo = ()=>{
    const {palavra, categoria} = escolherPalavraECategoria();
     let letras = palavra.toUpperCase().split("");
     
    setcategoriaescolhida(categoria);
    setPalavraescolhida(palavra);
    setletras(letras);
   
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
