let codigos = []
let nomes = []
let quantidade_itens = []
let precos = []
let total = 0

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
            console.log(data)
        } catch (e) {
            return e
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
                    codigos.push(datapro[num].codigo)
                    quantidade_itens.push(quant)
                    nomes.push(datapro[num].nome)
                    precos.push(datapro[num].preco)
                    document.querySelector("#tablecontent").innerHTML +=
                        `<tr>
                        <td>${datapro[num].codigo}</td>
                        <td>${datapro[num].nome}</td>
                        <td>R$ ${datapro[num].preco}</td>
                        <td>${quant}</td>
                    </tr>`
                    total += datapro[num].preco * quant
                    resultado.innerHTML = total
                }
            }
            alert(data.mensagem)
        } catch (e) {
            return e
        }
    }
    requestApi()
}
document.querySelector("#btncadastrar").addEventListener("click", function (e) {
    e.preventDefault()
    registerOrder()
})

document.querySelector("#btnpesquisar").addEventListener("click", function (e) {
    e.preventDefault()
    showProduct()
})