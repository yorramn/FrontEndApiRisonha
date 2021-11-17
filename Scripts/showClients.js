let url_string = window.location.href
let url = new URL(url_string)
let urlid = url.searchParams.get("id")
function showClients() {
    let displayContent = document.querySelector("#displayContent")
    let nonText = document.querySelector("#nonText")
    requestApi = async () => {
        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            },
        }
        try {
            const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/cliente/listar', settings)
            const data = await fetchResponse.json()
            // if(data.message != null || data.message != ""){
            //     alert(data.message)
            //     window.location.replace("../Produtos/mostrar-produtos.html") 
            // }
            console.log(data)
            if(data.mensagem != null){
                displayContent.style.display = "none"
                nonText.textContent = data.mensagem
            }else{
                let clientes = data.objeto
                for(let num = 0; num<=clientes.length; num++){
                    let content = ""
                    content += "<tr>"
                    content += "<td>"+ clientes[num].nome+"</td>"
                    content += "<td>"+ clientes[num].cpf+"</td>"
                    content += "<td>"+ clientes[num].email+"</td>"
                    content += "<td>"+ clientes[num].cep+"</td>"
                    content += "<td>"+ clientes[num].logradouro+"</td>"
                    content += "<td>"+ clientes[num].numero +"</td>"
                    content += "<td>"+ clientes[num].cidade+"</td>"
                    content += "<td>"+ clientes[num].telefone+"</td>"
                    content += "<td><a href='../Clientes/editar-clientes.html?id="+clientes[num].id+"'"+"><Button class='btn btn-warning btn-large'>Editar</Button></a></td>"
                    content += `<td><Button class='btn btn-danger btn-large' onclick='deleteClient(${clientes[num].id})'>Deletar</Button></td>`
                    content += "</tr>"
                    
                    document.querySelector("#tablecontent").innerHTML += content
                }
            }
        } catch (e) {
            return e
        }
    }

    requestApi()

}

function deleteClient(id){
    
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
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/cliente/'+id, settings)
                const data = await fetchResponse.json()             
                alert(data.message)
            } catch (e) {
                alert(data.message)
            }
        }

    requestApi()

}