let url_string = window.location.href
let url = new URL(url_string)
let urlid = url.searchParams.get("id")

function showClient() {
    document.querySelector("#btnpesquisar").addEventListener("click", function(e){
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
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/cliente', settings)
                const data = await fetchResponse.json()
                let datacli = data.objeto
                
                
                for(let num = 0; num<=datacli.length; num++){
                    if(datacli[num].nome == searchdata){
                        document.querySelector("#resultado").innerHTML = ""
                        let content = ""
                        content += "<tr>"
                        content += "<td>"+ datacli[num].nome +"</td>"
                        content += "<td>"+ datacli[num].cpf +"</td>"
                        content += "<td>"+ datacli[num].email +"</td>"
                        content += "<td>"+ datacli[num].cep +"</td>"
                        content += "<td>"+ datacli[num].logradouro +"</td>"
                        content += "<td>"+ datacli[num].numero +"</td>"
                        content += "<td>"+ datacli[num].cidade +"</td>"
                        content += "<td>"+ datacli[num].telefone +"</td>"
                        content += "<td><a href='../Cliente/editar-cliente.html?id="+datacli[num].id+"'"+"><Button class='btn btn-warning btn-large'>Editar</Button></a></td>"
                        content += "<td><a href='../Cliente/pesquisar-cliente.html?id="+datacli[num].id+"'"+"><Button class='btn btn-danger btn-large' onclick='deleteClient()'>Deletar</Button></a></td>"
                        content += "</tr>"
                    
                        document.querySelector("#tablecontent").innerHTML += content
                    }
                    else{document.querySelector("#resultado").innerHTML = "Sem resultados"}
                }
                
            } catch (e) {
                return e
            }
        }
    
        requestApi()

    })

}

showClient()

function deleteClient(){
    
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
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/cliente/'+urlid, settings)
                const data = await fetchResponse.json()             
                
            } catch (e) {
                return e
            }
        }

    requestApi()

}

deleteClient()
