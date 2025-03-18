let frase = prompt("Digite a frase ou palavra: ").toLowerCase()
let fraseInvertida

frase = frase.replace(/\s/g, '')

fraseInvertida = frase.split('').reverse().join('')

function verificarPalindromo(){

    if(frase == fraseInvertida){
        return true
    }else{
        return false
    }

}

console.log(verificarPalindromo())