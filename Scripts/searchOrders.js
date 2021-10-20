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
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/encomenda', settings)
                const data = await fetchResponse.json()
                let datapro = data.objeto
                console.log(data)

                for (let num = 0; num <= datapro.length; num++) {
                    if (datapro[num].nome == searchdata) {
                        document.querySelector("#resultado").innerHTML = ""
                        let content = ""
                        content += "<tr>"
                        content += "<td>" + datapro[num].codigo + "</td>"
                        content += "<td>" + datapro[num].nome + "</td>"
                        content += "<td>" + datapro[num].quantidade + "</td>"
                        content += "<td>" + datapro[num].preço + "</td>"
                        content += "<td>" + datapro[num].desconto + "</td>"
                        content += "<td>" + datapro[num].total + "</td>"
                        content += "<td>" + datapro[num].prestador + "</td>"
                        content += "<td>" + datapro[num].data_do_pagamento + "</td>"
                        content += "<td>" + datapro[num].data_de_recebimento + "</td>"
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

