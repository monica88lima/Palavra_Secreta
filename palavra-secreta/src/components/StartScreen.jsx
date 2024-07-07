import { useState } from "react";
import "./StartScreen.css";

const StartScreen = ({ comecar }) => {
  const [nivel, setNivel] = useState("facil");
  return (
    <div className="star">
      <h2>JOGO DAS PALAVRAS</h2>
      <p>Clique no botão para começar a jogar</p>
      <div className="nivel">
        <select name="nivel" id="nivel" onChange={(e) => setNivel(e.target.value)}>
          <option value="facil">Fácil</option>
          <option value="medio">Médio</option>
          <option value="dificil">Difícil</option>
        </select>
        <button onClick={()=>comecar(nivel)} >Iniciar </button>
      </div>

     
    </div>
  );
};

export default StartScreen;
