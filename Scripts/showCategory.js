let url_string = window.location.href
let url = new URL(url_string)
let urlid = url.searchParams.get("id")

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
            
            for(let num = 0; num<=datacat.length; num++){
                let content = ""
                content += "<tr>"
                content += "<td>"+ datacat[num].nome +"</td>"
                content += "<td>"+ datacat[num].descricao +"</td>"
                content += "<td><a href='../Categoria/editar-categoria.html?id="+datacat[num].id+"'"+"><Button class='btn btn-warning btn-large'>Editar</Button></a></td>"
                content += "<td><a href='../Categoria/mostrar-categoria.html?id="+datacat[num].id+"'"+"><Button class='btn btn-danger btn-large' onclick='deleteCategory()'>Deletar</Button></a></td>"
                content += "</tr>"
                
                document.querySelector("#tablecontent").innerHTML += content
            }
            
        } catch (e) {
            return e
        }
    }

    requestApi()

}

function deleteCategory(){
    
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
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/categoria/'+urlid, settings)
                const data = await fetchResponse.json()             
               
            } catch (e) {
                return e
            }
        }

    requestApi()

}



deleteCategory()