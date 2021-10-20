let produto = []
function registerOrder() {
let code

    document.querySelector("#btncadastrar").addEventListener("click", function (e) {
        e.preventDefault()
        code = document.querySelector("#Codigo").value
        let quant = document.querySelector("#quant").value
        let codepro = document.querySelector("#CodigoPro").value
        let cpf = document.querySelector("#CPF").value



        const order = {
            codigos: [produto[0]],
            quantidade_itens: [quant],
            precos: [produto[2]],
            nomes: [produto[1]],
            total: produto[2]
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

    })

}

registerOrder()


function showProduct() {
    document.querySelector("#btnpesquisar").addEventListener("click", function () {
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
                code = document.querySelector("#Codigo").value
                let datapro = data.produtos
                console.log(data)
                for (let num = 0; num <= datapro.length; num++) {

                    datapro[num].codigo
                    if (datapro[num].codigo == code) {
                        document.querySelector("#resultado").innerHTML = ""
                        produto = [datapro[num].codigo, datapro[num].nome, datapro[num].preco]
                        document.querySelector("#resultado").innerHTML += `<table style='text-align: center;'><tr><th>Código</th><th>Nome</th><th>Preço</th></tr><tr><td>${produto[0]}</td><td>${produto[1]}</td><td>${produto[2]}</td></tr><table>`
                    }

                }
                
            } catch (e) {
                return e
            }
        }

        requestApi()
    })


}
showProduct()