function registerPromotion() {

    document.querySelector("#cadastrar").addEventListener("click", function (e) {
        e.preventDefault()
        let code = document.querySelector("#Codigo").value
        let description = document.querySelector("#Nome").value
        let aplication = document.querySelector("#tipoaplicar").value
        let discount = document.querySelector("#desconto").value
        let dataval = document.querySelector("#Datavalidade").value
        let valordes = document.querySelector("#valor-desconto").value

        const promotion = {
            codigo: code,
            onde_aplicar: aplication,
            data_de_validade: dataval,
            descricao: description,
            como_aplicar: discount,
            valor: valordes
        }

        requestApi = async () => {
            const settings = {
                method: 'POST',
                headers: {

                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("token")
                },

                body: JSON.stringify(promotion)
            }
            try {
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/promocao', settings)
                const data = await fetchResponse.json()
                
            } catch (e) {
                return e
            }
        }

        requestApi()

    })

}

registerPromotion()