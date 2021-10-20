function registerOrder() {
    
    document.querySelector("#quant").value = 0
    document.querySelector("#btncadastrar").addEventListener("click", function (e) {
        e.preventDefault()
        let code = document.querySelector("#Codigo").value
        let quant = document.querySelector("#quant").value
        let codepro = document.querySelector("#CodigoPro").value
        let cpf = document.querySelector("#CPF").value
        let datapag = document.querySelector("#DataPagamento").value
        let datarec = document.querySelector("#DataRecebimento").value
        

        const order = {
            codigo: code,
            quantidade: quant,
            codigo_da_promocao: codepro,
            cpf: cpf,
            data_de_pagamento: datapag,
            data_de_recebimento: datarec
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
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/encomenda', settings)
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

function btnClickNumber(){

    document.querySelector("#btnnumber").addEventListener("click", function () {
        if(isNaN(document.querySelector("#quant").value) == true){
            document.querySelector("#quant").value = 0
        }
        else if(document.querySelector("#quant").value == ""){
            document.querySelector("#quant").value = 0
        }
        document.querySelector("#quant").value = 1+parseInt(document.querySelector("#quant").value)
    })
}

btnClickNumber()

