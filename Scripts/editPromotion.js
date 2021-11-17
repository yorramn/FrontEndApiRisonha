let url_string = window.location.href
let url = new URL(url_string)
let urlid = url.searchParams.get("id")

function showPromotion() {

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
            const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/promocao/' + urlid, settings)
            const data = await fetchResponse.json()
            let dataPro = data.objeto
        
            document.querySelector("#Codigo").value = dataPro.codigo
            document.querySelector("#Nome").value = dataPro.descricao
            document.querySelector("#tipoaplicar").value = dataPro.onde_aplicar
            document.querySelector("#desconto").value = dataPro.como_aplicar
            document.querySelector("#Datavalidade").value = dataPro.data_de_validade
            document.querySelector("#valor-desconto").value = dataPro.valor
        } catch (e) {
            return e
        }
    }

    requestApi()
}

function updatePromotion() {

    document.querySelector("#atualizar").addEventListener("click", function (e) {
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
                method: 'PUT',
                headers: {

                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("token")
                },

                body: JSON.stringify(promotion)
            }
            try {
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/promocao/'+urlid, settings)
                const data = await fetchResponse.json()
                alert(data.message)
            } catch (e) {
                alert(data.message)
            }
        }

        requestApi()

    })

}

updatePromotion()