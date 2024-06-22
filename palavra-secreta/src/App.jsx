import { useState} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/play.svg";
import "./App.css";
import StartScreen from "./components/StartScreen";
import { useCallback, useEffect } from "react";
import { bancoPalavras } from "./data/data";
import JogandoPalavraSecreta from "./components/JogandoPalavraSecreta";
import FinalPartida from "./components/FinalPartida";

const statusPartida = [
  { id: 1, nome: "iniciar" },
  { id: 2, nome: "jogando" },
  { id: 3, nome: "finalizado" },
];
function App() {
  const [count, setCount] = useState(0);

  const [statusJogo, setStatusJogo] = useState(statusPartida[0].nome);
  const [palavras] = useState(bancoPalavras);

  const [palavraescolhida, setPalavraescolhida] = useState("");
  const [categoriaescolhida, setcategoriaescolhida] = useState("");
  const [letras, setletras] = useState([]);
  const [letrasAdvinhadas, setletrasAdvinhadas] = useState([]);
  const [tentativas, setTentativas] = useState(5);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [pontuacao, setPontuacao] = useState(0);

  //function determinar categoria e palavra
  const escolherPalavraECategoria = () => {
    const categorias = Object.keys(bancoPalavras);
    const categoria =
      categorias[Math.floor(Math.random() * Object.keys(categorias).length)];

    const palavra =
      bancoPalavras[categoria][
        Math.floor(Math.random() * bancoPalavras[categoria].length)
      ];
    console.log(palavra, categoria);
    return { palavra, categoria };
  };

  const comecarJogo = () => {
    const { palavra, categoria } = escolherPalavraECategoria();
    let letras = palavra.toUpperCase().split("");

    setcategoriaescolhida(categoria);
    setPalavraescolhida(palavra);
    setletras(letras);

   setStatusJogo(statusPartida[1].nome);
  };

  const verificaLetra = (letraDigitada) => {
    if (
      letrasAdvinhadas.includes(letraDigitada.toUpperCase()) ||
      letrasErradas.includes(letraDigitada.toUpperCase())
    )
      return;

    if (letras.includes(letraDigitada.toUpperCase())) {
      setletrasAdvinhadas((letraAtualCerta) => [
        ...letraAtualCerta,
        letraDigitada.toUpperCase(),
      ]);
    } else {
      setLetrasErradas((letraAtualErrada) => [
        ...letraAtualErrada,
        letraDigitada.toUpperCase(),
      ]);
    }
    setTentativas((tentativaAtual) => tentativaAtual - 1);
  };
  const limpaListaLetras =() =>{
    setLetrasErradas([]);
    setletrasAdvinhadas([]);
  }
  useEffect(()=> {
    if(tentativas <= 0){
      limpaListaLetras();
      setStatusJogo(statusPartida[2].nome);
    }

  },[tentativas])

  useEffect(()=> {
    if(palavraescolhida.length == letrasAdvinhadas.length){
      setPontuacao((pontuacaoAtual) => pontuacaoAtual + 10)
      
      
    }
    console.log(palavraescolhida.length );
    console.log(letrasAdvinhadas.length)

  },[letrasAdvinhadas])

  const reiniciar = () => {
    setPontuacao(0);
    setTentativas(5);
    setStatusJogo(statusPartida[0].nome);
  };

  return (
    <>
      <div className="App">
        {statusJogo === "iniciar" && <StartScreen comecar={comecarJogo} />}
        {statusJogo === "jogando" && (
          <JogandoPalavraSecreta
            verificaLetra={verificaLetra}
            categoria={categoriaescolhida}
            palavra={palavraescolhida}
            letras={letras}
            letraserradas={letrasErradas}
            letrasAdvinhadas={letrasAdvinhadas}
            tentativas={tentativas}
            pontuacao={pontuacao}
          />
        )}
        {statusJogo === "finalizado" && <FinalPartida reiniciar={reiniciar} pontuacao={pontuacao}/>}
      </div>
    </>
  );
}

export default App;
