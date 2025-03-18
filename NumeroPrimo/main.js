let numero = 1
let divisores = 0

function verificarPrimo(numero){
    if(!Number.isInteger(numero)){
        return console.log("valor invalido detectado")
    }
    
    for(let i=1 ; i<=numero ; i++)
        if(numero % i == 0)
            divisores++;
    
    if(divisores == 2){
        return true
    }else{
        return false
    }
    
}

console.log(verificarPrimo(numero))