import "./FinalPartida.css"

const FinalPartida = ({reiniciar, pontuacao} ) => {
  return (
    <div className="containerFimJogo">
      <p>Fim de Jogo</p>
      <h2>Sua Pontuação foi: <span>{pontuacao}</span></h2>

      <button onClick={reiniciar}>Início</button>
    </div>
  )
}

export default FinalPartida