let url_string = window.location.href
let url = new URL(url_string)
let urlid = url.searchParams.get("id")

function showProduct() {
    document.querySelector("#btnpesquisar").addEventListener("click", function (e) {
        e.preventDefault()
        let searchdata = document.querySelector("#barpesquisa").value
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
                let datapro = data.produtos
                

                for (let num = 0; num <= datapro.length; num++) {
                    if (datapro[num].nome == searchdata) {
                        document.querySelector("#resultado").innerHTML = ""
                        let content = ""
                        content += "<tr>"
                        content += "<td>" + datapro[num].codigo + "</td>"
                        content += "<td>" + datapro[num].nome + "</td>"
                        content += "<td>" + datapro[num].quantidade + "</td>"
                        content += "<td>" + datapro[num].tipo_de_quantidade + "</td>"
                        content += "<td>" + datapro[num].peso + "</td>"
                        content += "<td>" + datapro[num].tipo_de_peso + "</td>"
                        content += "<td>" + datapro[num].preco + "</td>"
                        content += "<td>" + datapro[num].categoria_id + "</td>"
                        content += "<td><a href='../produto/editar-produtos.html?id=" + datapro[num].id + "'" + "><Button class='btn btn-warning btn-large'>Editar</Button></a></td>"
                        content += "<td><a href='../produto/pesquisar-produtos.html?id=" + datapro[num].id + "'" + "><Button class='btn btn-danger btn-large' onclick='deleteProduct()'>Deletar</Button></a></td>"
                        content += "</tr>"

                        document.querySelector("#tablecontent").innerHTML += content
                    }
                    else { document.querySelector("#resultado").innerHTML = "Sem resultados" }
                }

            } catch (e) {
                return e
            }
        }

        requestApi()

    })

}

showProduct()

function deleteProduct() {

    requestApi = async () => {
        const settings = {
            method: 'DELETE',
            headers: {

                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            },

        }
        try {
            const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/produto/' + urlid, settings)
            const data = await fetchResponse.json()

        } catch (e) {
            return e
        }
    }

    requestApi()

}

deleteProduct()