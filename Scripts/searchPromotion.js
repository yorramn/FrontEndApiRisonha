// let url_string = window.location.href
// let url = new URL(url_string)
// let urlid = url.searchParams.get("id")
let displayContent = document.querySelector("#displayContent")
let nonText = document.querySelector("#nonText")

function showPromotion() {
    document.querySelector("#btnpesquisar").addEventListener("click", function (e) {
        e.preventDefault()
        let searchdata = document.querySelector("#barpesquisa").value
        requestApi = async () => {
            const settings = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": 'application/json',
                    Authorization: 'Bearer ' + window.localStorage.getItem("token")
                },
            }
            try {
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/promocao/listar/'+searchdata, settings)
                const data = await fetchResponse.json()
                console.log(data.objeto)
                let promocaos = data.objeto
                for (let num = 0; num <= promocaos.length; num++) {
                    document.querySelector("#resultado").innerHTML = ""
                    let content = ""
                    content += "<tr>"
                    content += "<td>" + promocaos[num].codigo + "</td>"
                    content += "<td>" + promocaos[num].descricao + "</td>"
                    content += "<td>" + promocaos[num].onde_aplicar + "</td>"
                    content += "<td>" + promocaos[num].como_aplicar + "</td>"
                    content += "<td>" + promocaos[num].valor + "</td>"
                    content += "<td>" + promocaos[num].data_de_validade + "</td>"
                    content += "<td><a class='btn btn-warning btn-large' href='../Promocoes/editar-promocoes.html?id=" + promocaos[num].id + "'" + ">Editar</a></td>"
                    content += `<td><Button class='btn btn-danger btn-large' onclick='deletePromotion(${promocaos[num].id})'>Deletar</Button></td>`
                    content += "</tr>"
                    document.querySelector("#tablecontent").innerHTML += content
                }
            } catch (e) {
                console.log(e)
            }
        }
        requestApi()
    })
}

showPromotion()

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
            alert(data.message)
        }
    }
    requestApi()
}
