import "./StartScreen.css"

const StartScreen = ({comecar}) => {
  return (
    <div className="star">
        <h2>JOGO DAS PALAVRAS</h2>
        <p>Clique no botão para começar a jogar</p>
        <button onClick={comecar}>Iniciar </button>
    </div>
  )
}

export default StartScreen