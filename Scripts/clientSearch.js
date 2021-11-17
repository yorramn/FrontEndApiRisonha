function showClient() {
    document.querySelector("#btnpesquisar").addEventListener("click", function (e) {
        e.preventDefault()
        let searchdata = document.querySelector("#pesqbarra").value
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
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/cliente/listar/' + searchdata, settings)
                const data = await fetchResponse.json()
                let datacli = data.objeto
                for (let num = 0; num <= datacli.length; num++) {
                    document.querySelector("#resultado").innerHTML = ""
                    let content = ""
                    content += "<tr>"
                    content += "<td>" + datacli[num].nome + "</td>"
                    content += "<td>" + datacli[num].cpf + "</td>"
                    content += "<td>" + datacli[num].email + "</td>"
                    content += "<td>" + datacli[num].cep + "</td>"
                    content += "<td>" + datacli[num].logradouro + "</td>"
                    content += "<td>" + datacli[num].numero + "</td>"
                    content += "<td>" + datacli[num].cidade + "</td>"
                    content += "<td>" + datacli[num].telefone + "</td>"
                    content += "<td><a href='../Clientes/editar-clientes.html?id=" + datacli[num].id + "'" + "><Button class='btn btn-warning btn-large'>Editar</Button></a></td>"
                    content += `<td><Button class='btn btn-danger btn-large' onclick='deleteClient(${datacli[num].id})'>Deletar</Button></td>`
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

showClient()

function deleteClient(id) {

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
            const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/cliente/' + id, settings)
            const data = await fetchResponse.json()
            alert(data.message)
        } catch (e) {
            alert(data.message)
        }
    }

    requestApi()

}