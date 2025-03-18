let numeros = [1, 2, 3, 4, 5, -1,"adasda"]
let soma = 0

function somarValores(){
    
    for(let i = 0; i < numeros.length; i++){
    if(typeof numeros[i] !== 'number'){
        return "Valor Inválido detectado"
    }
    }

    for(let i = 0; i < numeros.length; i++){
        soma += numeros[i]
    }

    return soma
}

console.log(somarValores())