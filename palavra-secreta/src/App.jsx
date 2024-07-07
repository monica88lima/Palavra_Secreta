import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/play.svg";
import "./App.css";
import StartScreen from "./components/StartScreen";
import { useCallback, useEffect } from "react";
import { bancoPalavrasfacil } from "./data/data";
import { bancoPalavrasmedio } from "./data/data";
import { bancoPalavrasdificil } from "./data/data";
import JogandoPalavraSecreta from "./components/JogandoPalavraSecreta";
import FinalPartida from "./components/FinalPartida";
import Acertou from "./components/Acertou";

const nivelJogo = [
  { id: 1, nome: "facil" },
  { id: 2, nome: "medio" },
  { id: 3, nome: "dificil" },
];
const statusPartida = [
  { id: 1, nome: "iniciar" },
  { id: 2, nome: "jogando" },
  { id: 3, nome: "finalizado" },
];

function App() {
  // const [count, setCount] = useState(0);
  let banco = bancoPalavrasfacil;
  console.log(statusPartida[0].nome);
  const [statusJogo, setStatusJogo] = useState(statusPartida[0].nome);

  // const [palavrasfacil] = useState(bancoPalavrasfacil);
  // const [palavrasmedia] = useState(bancoPalavrasmedio);
  // const [palavrasdificil] = useState(bancoPalavrasdificil);
  // const [bancoPalavras, setBancopalavras] = useState(palavrasfacil);

  const [palavras] = useState(banco);

  const [palavraescolhida, setPalavraescolhida] = useState("");
  const [categoriaescolhida, setcategoriaescolhida] = useState("");
  const [letras, setletras] = useState([]);
  const [letrasAdvinhadas, setletrasAdvinhadas] = useState([]);
  const [tentativas, setTentativas] = useState(5);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [pontuacao, setPontuacao] = useState(0);

  //function determinar categoria e palavra
  const escolherPalavraECategoria = useCallback(() => {
    const categorias = Object.keys(banco);
    const categoria =
      categorias[Math.floor(Math.random() * Object.keys(categorias).length)];

    const palavra =
      banco[categoria][
        Math.floor(Math.random() * banco[categoria].length)
      ];
    console.log(palavra, categoria);
    return { palavra, categoria };
  }, [palavras]);

  function escolherNivel (nivel) {
    console.log(nivel);

    if (nivel === undefined) return;

    if (nivel === "facil") {
      // setBancopalavras(palavrasfacil);
      banco = bancoPalavrasfacil;
    } else if (nivel === "medio") {
      // setBancopalavras(palavrasmedia);
      banco = bancoPalavrasmedio;
      console.log("entrou aqui2 " + nivel);
    } else {
      // setBancopalavras(palavrasdificil);
      console.log("entrou aqui3 " + nivel);
      banco = bancoPalavrasdificil;
    }
    console.log(nivel);
    console.log(banco);
  };
  const desistir = () => {
    setTentativas(0);
  };

  const comecarJogo = useCallback(
    (nivel) => {
      
      if (nivel === undefined) return;
      
      console.log(nivel);
      setGanhou(false);
      escolherNivel(nivel);
      const { palavra, categoria } = escolherPalavraECategoria();
      let letras = palavra.toUpperCase().split("");
      limpaListaLetras();
      setTentativas(5);
      setcategoriaescolhida(categoria);
      setPalavraescolhida(palavra);
      setletras(letras);

      setStatusJogo(statusPartida[1].nome);
    },
    [escolherPalavraECategoria]
  );

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
      setTentativas((tentativaAtual) => tentativaAtual - 1);
    }
  };
  const limpaListaLetras = () => {
    setLetrasErradas([]);
    setletrasAdvinhadas([]);
  };
  useEffect(() => {
    if (tentativas <= 0) {
      setStatusJogo(statusPartida[2].nome);
    }
  }, [tentativas]);

  const [ganhou, setGanhou] = useState(false);

  useEffect(() => {
    const letrasUnicas = [...new Set(letras)];

    console.log(letrasUnicas,  letrasAdvinhadas)
    if (letrasUnicas.length > 0 && letrasUnicas.length === letrasAdvinhadas.length) {
      setPontuacao((pontuacaoAtual) => pontuacaoAtual + 10);
      setGanhou(true);
    }
    console.log(pontuacao);
  }, [letrasAdvinhadas, letras]);

  const reiniciar = () => {
    // setBancopalavras([]);
    setPontuacao(0);
    setTentativas(5);
   
  };

  if(ganhou){
     return <Acertou comecarJogo={comecarJogo}/>
     
  }
    


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
            desistir={desistir}
          />
        )}
        {statusJogo === "finalizado" && (
          <FinalPartida reiniciar={reiniciar} pontuacao={pontuacao} />
        )}
      </div>
    </>
  );
}

export default App;
