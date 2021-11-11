let codigos = []
let nomes = []
let quantidade_itens = []
let precos = []
let total = 0
let codigo = null;

document.querySelector("#tablecontent").innerHTML = ""

function registerOrder() {
    let codepro = document.querySelector("#CodigoPro").value
    let cpf = document.querySelector("#CPF").value
    const order = {
        codigos: codigos,
        nomes: nomes,
        quantidade_itens: quantidade_itens,
        codigo_promocao: codepro,
        cpf_cliente: cpf,
        precos: precos,
        total: total
    }
    requestApi = async () => {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            },
            body: JSON.stringify(order)
        }
        try {
            const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/venda', settings)
            const data = await fetchResponse.json()
            alert(data.message)
        } catch (e) {
            alert(data.message)
        }
    }
    requestApi()
}

function showProduct() {
    requestApi = async () => {
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            },
        }
        try {
            const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/produto', settings)
            const data = await fetchResponse.json()
            let quant = document.querySelector("#quant").value
            let code = document.querySelector("#Codigo").value
            let resultado = document.querySelector("#resultado")
            let datapro = data.produtos
            for (let num = 0; num <= datapro.length; num++) {
                if (datapro[num].codigo == code) {
                    if (codigos.length > 0 && codigos[num] == code) {
                        alert('Produto já inserido! Insira outro ou altere a quantidade desejada')
                    } else {
                        codigos.push(datapro[num].codigo)
                        quantidade_itens.push(quant)
                        nomes.push(datapro[num].nome)
                        precos.push(datapro[num].preco)
                        document.querySelector("#tablecontent").innerHTML +=
                            `<tr id="linha${datapro[num].id}">
                                <td>${datapro[num].codigo}</td>
                                <td>${datapro[num].nome}</td>
                                <td>R$ ${datapro[num].preco}</td>
                                <td>${quant}</td>
                                <td>
                                    <button class="btn btn-outline-danger" id="remove" onclick="remove(${datapro[num].id},${datapro[num].codigo},${datapro[num].preco},${quant})">
                                        Remove
                                    </button>
                                </td>
                            </tr>`
                        total += datapro[num].preco * quant
                        resultado.innerHTML = total
                    }
                }
            }
            alert(data.mensagem)
        } catch (e) {
            return e
        }
    }
    requestApi()
}

function remove(id, codigo, preco, quantidade) {
    document.querySelector("#linha" + id).remove()
    total -= preco * quantidade
    document.querySelector("#resultado").innerHTML = total
    for (let i = 0; i < codigos.length; i++){
        if(codigo == codigos[i]){
            codigos.splice(i,1)
        }
    }
}
document.querySelector("#btncadastrar").addEventListener("click", function (e) {
    e.preventDefault()
    registerOrder()
})

document.querySelector("#btnpesquisar").addEventListener("click", function (e) {
    e.preventDefault()
    showProduct()
})