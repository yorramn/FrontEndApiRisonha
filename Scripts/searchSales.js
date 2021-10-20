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
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/venda', settings)
                const data = await fetchResponse.json()
                let datapro = data.objeto
                
                console.log(data)
                console.log(datapro[2].codigos)
                for (let num = 0; num <= datapro.length; num++) {
                    if (datapro[num].codigos[0] == searchdata) {
                        document.querySelector("#resultado").innerHTML = ""
                        let content = ""
                        content += "<tr>"
                        content += "<td>" + datapro[num].codigos + "</td>"
                        content += "<td>" + datapro[num].nomes + "</td>"
                        content += "<td>" + datapro[num].quantidade_itens + "</td>"
                        content += "<td>" + datapro[num].precos + "</td>"
                        content += "<td>" + datapro[num].promocao_id + "</td>"
                        content += "<td>" + datapro[num].total + "</td>"
                        content += "<td>" + datapro[num].cliente_id + "</td>"
                        
                    
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