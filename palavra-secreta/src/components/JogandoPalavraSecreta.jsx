import { useState,useRef } from "react";
import "./JogandoPalavraSecreta.css";

const JogandoPalavraSecreta = ({
  verificaLetra,
  categoria,
  palavra,
  letras,
  letraserradas,
  letrasAdvinhadas,
  tentativas,
  pontuacao,
  desistir,
}) => {
  console.log(categoria);
  const [letraDigitada,setLetraDigitada]=useState("");
  const letraDigRef = useRef(null);
  const handleSubmit =(e)=>{
    e.preventDefault();
    verificaLetra(letraDigitada);
    setLetraDigitada("");
    letraDigRef.current.focus();
  };
  return (
    <div className="game">
      <p className="pontuacao">
        <span>Pontuação: {pontuacao}</span>
      </p>
      <h1>Advinhe a Palavra </h1>
      <h3 className="dica">
        Dica sobre a palavra:
        <span> {categoria}</span>
      </h3>
      <p>Você ainda tem {tentativas} tentativa(s)</p>
      <div className="containerPalavra">
        {letras.map((letra, i) =>
          letrasAdvinhadas.includes(letra) ? (
            <span key={i} className="letra">
              {letra}
            </span>
          ) : (
            <span key={i} className="quadrovazio"></span>
          )
        )}
      </div>
      <div className="containerLetra">
        <p>Tente Advinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letra" maxLength={1} required onChange={(e) => setLetraDigitada(e.target.value)}
          value={letraDigitada}
          ref={letraDigRef}/>
          <button type="submit">Jogar</button>
        </form>
      </div>
      <div className="letrasUsadas">
        <p>Letras já utilizadas!</p>
        {letraserradas.map((letra, i) => (
          <span key={i}>{letra} - </span>
        ))}
      </div>
      <button onClick={()=>desistir()}>Reiniciar</button>
    </div>
  );
};

export default JogandoPalavraSecreta;
