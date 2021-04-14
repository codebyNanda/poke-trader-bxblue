const limite = 30
var iptPokemon1 = document.getElementById('idPokemon1')
var iptPokemon2 = document.getElementById('idPokemon2')

var trocar = document.getElementById('trocar')

trocar.setAttribute('onclick', `isRight()`)
var finalParecer = document.getElementById('erro') 
var tabelaHist = document.getElementById('historico') 

async function isRight() {
    finalParecer.innerHTML = ''
    var pokemon1 = iptPokemon1.value
    var pokemon2 = iptPokemon2.value
    
    var dataPokemon1 =  await getPoke(pokemon1)
    var dataPokemon2 =  await getPoke(pokemon2)
    console.log(dataPokemon1, dataPokemon2)

    if(dataPokemon2 == 404 || dataPokemon1 == 404){
        var divResult = document.createElement('div')
        var erromdg = document.createTextNode('Pokemon não encontrado')
        divResult.style.backgroundColor = 'red'
        finalParecer.appendChild(divResult)
        divResult.appendChild(erromdg)
        return
    }


    if(dataPokemon1.base_experience-dataPokemon2.base_experience > limite || dataPokemon2.base_experience-dataPokemon1.base_experience > limite){
        var divResult = document.createElement('div')
        var erromdg = document.createTextNode('Ops! Essa troca não é justa')
        divResult.style.backgroundColor = 'red'
        finalParecer.appendChild(divResult)
        divResult.appendChild(erromdg)
        return
    }
    console.log('Pode')
    var txtPoke1  = document.createTextNode(`${dataPokemon1.forms[0].name} (${dataPokemon1.base_experience})`)
    var txtPoke2 = document.createTextNode(`${dataPokemon2.forms[0].name} (${dataPokemon2.base_experience})`)
    var txtResult
    var divResult = document.createElement('tr')
    var campoPoke1 = document.createElement('td')
    var campoPoke2 = document.createElement('td')
    var resFinal = document.createElement('td')
    var data = new Date()

    campoPoke1.appendChild(txtPoke1)
    campoPoke2.appendChild(txtPoke2)
    tabelaHist.appendChild(divResult)
    tabelaHist.appendChild(campoPoke1)
    tabelaHist.appendChild(campoPoke2)
    tabelaHist.appendChild(resFinal)
    txtResult = document.createTextNode(`${data.getDate()}/${data.getMonth()}/${data.getFullYear()+1}-${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`)
    resFinal.appendChild(txtResult)
}

async function getPoke(pokemon){
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        console.log(response.data.base_experience)
        return response.data
    } catch (error) {
        if(error.response.status == 404){
            console.log('Pokemon não encontrado') 
            return error.response.status
        }
        console.error(error.response.status)
    }
   
}

