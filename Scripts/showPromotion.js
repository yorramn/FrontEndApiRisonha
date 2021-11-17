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
            const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/promocao/listar', settings)
            const data = await fetchResponse.json()
            console.log(data)
            if (data.objeto != null) {
                let datapro = data.objeto
                for (let num = 0; num < datapro.length; num++) {
                    let content = ""
                    content += "<tr>"
                    content += "<td>" + datapro[num].codigo + "</td>"
                    content += "<td>" + datapro[num].descricao + "</td>"
                    content += "<td>" + datapro[num].onde_aplicar + "</td>"
                    content += "<td>" + datapro[num].como_aplicar + "</td>"
                    content += "<td>" + datapro[num].valor + "</td>"
                    content += "<td>" + datapro[num].data_de_validade + "</td>"
                    content += "<td>" + datapro[num].user_id + "</td>"
                    content += "<td><a href='../Promocoes/editar-promocoes.html?id=" + datapro[num].id + "'" + "><Button class='btn btn-warning btn-large'>Editar</Button></a></td>"
                    content += `<td><Button class='btn btn-danger btn-large' onclick='deletePromotion(${datapro[num].id})'>Deletar</Button></td>`
                    content += "</tr>"
                    document.querySelector("#tablecontent").innerHTML += content
                }
            }else{
                alert(data.message)
                // window.location.replace("../Promocoes/cadastrar-promocoes.html")
            }
        } catch (e) {

        }
    }

    requestApi()

}

function deletePromotion(id) {

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
            const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/promocao/' + id, settings)
            const data = await fetchResponse.json()
            alert(data.message)
        } catch (e) {
            return e
        }
    }

    requestApi()

}