let url_string = window.location.href
let url = new URL(url_string)
let urlid = url.searchParams.get("id")

function showProduct() {
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
            const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/produto/listar', settings)
            const data = await fetchResponse.json()
            console.log(data)
            if(data.mensagem != null){
                displayContent.style.display = "none"
                nonText.textContent = data.mensagem
            }else{
                let datapro = data.objeto
                for(let num = 0; num<=datapro.length; num++){
                    let content = ""
                    content += "<tr>"
                    content += "<td>"+ datapro[num].codigo +"</td>"
                    content += "<td>"+ datapro[num].nome +"</td>"
                    content += "<td>"+ datapro[num].quantidade +"</td>"
                    content += "<td>"+ datapro[num].tipo_de_quantidade  +"</td>"
                    content += "<td>"+ datapro[num].peso +"</td>"
                    content += "<td>"+ datapro[num].tipo_de_peso +"</td>"
                    content += "<td>"+ datapro[num].preco +"</td>"
                    content += "<td>"+ datapro[num].categoria_id +"</td>"
                    content += "<td><a href='../Produtos/editar-produtos.html?id="+datapro[num].id+"'"+"><Button class='btn btn-warning btn-large'>Editar</Button></a></td>"
                    content += `<td><Button class='btn btn-danger btn-large' onclick='deleteProduct(${datapro[num].id})'>Deletar</Button></td>`
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

function deleteProduct(id){
    
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
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/produto/'+id, settings)
                const data = await fetchResponse.json()             
                alert(data.message)
            } catch (e) {
                alert(data.message)
            }
        }

    requestApi()

}