let url_string = window.location.href
let url = new URL(url_string)
let urlid = url.searchParams.get("id")

function showCampProducts(){

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
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/produto/'+urlid, settings)
                const data = await fetchResponse.json()
                datapro = data.objeto
                
                document.querySelector("#Codigo").value = datapro.codigo
                document.querySelector("#Nome").value = datapro.nome
                document.querySelector("#Datavalidade").value = datapro.data_de_validade
                document.querySelector("#Quantidade").value = datapro.quantidade
                document.querySelector("#tipoquantidade").value = datapro.tipo_de_quantidade
                document.querySelector("#peso").value = datapro.peso
                document.querySelector("#tipopeso").value = datapro.tipo_de_peso
                document.querySelector("#fabricante").value = datapro.fabricante
                document.querySelector("#preco").value = datapro.preco
                
                
            } catch (e) {
                return e
            }
        }

        requestApi()
}

function updateProduct() {

    document.querySelector("#atualizar").addEventListener("click", function (e) {
        e.preventDefault()
        let codigo = document.querySelector("#Codigo").value
        let nome = document.querySelector("#Nome").value
        let dataval = document.querySelector("#Datavalidade").value
        let quant = document.querySelector("#Quantidade").value
        let tipoquant = document.querySelector("#tipoquantidade").value
        let peso = document.querySelector("#peso").value
        let tipopeso = document.querySelector("#tipopeso").value
        let fab = document.querySelector("#fabricante").value
        let preco = document.querySelector("#preco").value
        let tipocate = document.querySelector("#tipocategoria").value
        
        const product = {
            codigo: codigo,
            nome: nome,
            data_de_validade: dataval,
            quantidade: quant,
            tipo_de_quantidade: tipoquant,
            peso: peso,
            tipo_de_peso: tipopeso,
            fabricante: fab,
            preco: preco,
            categoria_id: tipocate
        }

        requestApi = async () => {
            const settings = {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("token")
                },
                body: JSON.stringify(product)
            }
            try {
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/produto/'+urlid, settings)
                const data = await fetchResponse.json()
                alert(data.message)
            } catch (e) {
                return e
            }
        }
        requestApi()
    })
}

updateProduct()

function showCategory(){
    const select = document.querySelector('#tipocategoria')
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
            const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/categoria', settings)
            const data = await fetchResponse.json()
            let datapro = data.objeto
            for(let num = 0; num<=datapro.length; num++){
                select.options[select.options.length] = new Option(datapro[num].nome, datapro[num].id);
            }
        } catch (e) {
            return e
        }
    }
    requestApi()
}