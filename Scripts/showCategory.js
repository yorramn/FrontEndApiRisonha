function showCategory() {
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
            let datacat = data.objeto

            for (let num = 0; num <= datacat.length; num++) {
                let content = ""
                content += "<tr>"
                content += "<td>" + datacat[num].nome + "</td>"
                content += "<td>" + datacat[num].descricao + "</td>"
                content += "<td><a href='../Categorias/editar-categorias.html?id=" + datacat[num].id + "'" + "><Button class='btn btn-warning btn-large'>Editar</Button></a></td>"
                content += `<td><Button class='btn btn-danger btn-large' onclick='deleteCategory(${datacat[num].id})'>Deletar</Button></td>`
                content += "</tr>"
                document.querySelector("#tablecontent").innerHTML += content
            }
        } catch (e) {
            return e
        }
    }
    requestApi()
}

function deleteCategory(id) {
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
            window.location.reload()
        } catch (e) {
            return e
        }
    }
    requestApi()
}