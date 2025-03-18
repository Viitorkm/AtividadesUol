jogadaSorteada = 1
const escolhaJogador = prompt("Pedra, Papel ou tesoura?").toLocaleLowerCase()

function sortearJogada(){
    jogadaSorteada = Math.floor(Math.random() * 3) + 1
    switch(jogadaSorteada){
        case 1:
            return "pedra"
        case 2:
            return "tesoura"
        case 3:
            return "papel"
    }
}

jogadaSorteada = sortearJogada()

console.log("O Computador escolheu: " + jogadaSorteada)
console.log("Você escolheu: " + escolhaJogador)

if(escolhaJogador === jogadaSorteada){
    console.log("Empate!")
  }else if(
    (escolhaJogador === "pedra" && jogadaSorteada === "tesoura") ||
    (escolhaJogador === "papel" && jogadaSorteada === "pedra") ||
    (escolhaJogador === "tesoura" && jogadaSorteada === "papel")
  ){
    console.log("Você venceu!")
  }else{
    console.log("Você perdeu!")
  }
