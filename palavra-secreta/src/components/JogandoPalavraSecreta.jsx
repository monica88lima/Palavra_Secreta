import "./JogandoPalavraSecreta.css";

const JogandoPalavraSecreta = ({ verificaLetra }) => {
  return (
    <div className="game">
      <p className="pontuacao">
        <span>Pontuação: 000</span>
      </p>
      <h1>Advinhe a Palavra </h1>
      <h3 className="dica">
        Dica sobre a palavra:
        <span> dica....</span>
      </h3>
      <div className="containerPalavra">
        <span className="letra">A</span>
        <span className="quadrovazio"></span>
      </div>
      <div className="containerLetra">
        <p>Tente Advinhar uma letra da palavra:</p>
        <form>
          <input type="text" name="letra" maxLength={1} required />
          <button type="submit">Jogar</button>
        </form>
      </div>
      <div className="letrasUsadas">
        <p>Letras já utilizadas!</p>
        <span>A,</span>
        <span>G, </span>
      </div>
    </div>
  );
};

export default JogandoPalavraSecreta;
