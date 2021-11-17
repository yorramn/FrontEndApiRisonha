// let url_string = window.location.href
// let url = new URL(url_string)
// let urlid = url.searchParams.get("id")
let displayContent = document.querySelector("#displayContent")
let nonText = document.querySelector("#nonText")

function showCategories() {
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
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/categoria/listar/'+searchdata, settings)
                const data = await fetchResponse.json()
                console.log(data.objeto)
                let categorias = data.objeto
                for (let num = 0; num <= categorias.length; num++) {
                    document.querySelector("#resultado").innerHTML = ""
                    let content = ""
                    content += "<tr>"
                    content += "<td>" + categorias[num].nome + "</td>"
                    content += "<td>" + categorias[num].descricao + "</td>"
                    content += "<td><a class='btn btn-warning btn-large' href='../Produtos/editar-categoria.html?id=" + categorias[num].id + "'" + ">Editar</a></td>"
                    content += `<td><Button class='btn btn-danger btn-large' onclick='deleteCategoria(${categorias[num].id})'>Deletar</Button></td>`
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

showCategories()

function deleteCategoria(id) {

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
            const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/categoria/' + id, settings)
            const data = await fetchResponse.json()
            alert(data.message)
        } catch (e) {
            alert(data.message)
        }
    }
    requestApi()
}
