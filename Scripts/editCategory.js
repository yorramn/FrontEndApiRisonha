let url_string = window.location.href
let url = new URL(url_string)
let urlid = url.searchParams.get("id")

function showCategory(){

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
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/categoria/'+urlid, settings)
                const data = await fetchResponse.json()
                document.querySelector("#Codigo").value = data.objeto.nome
                document.querySelector("#descricao").value = data.objeto.descricao
                
            } catch (e) {
                return e
            }
        }

        requestApi()
}

function updateCategory() {

    document.querySelector("#atualizar").addEventListener("click", function (e) {
        e.preventDefault()
        let name = document.querySelector("#Codigo").value 
        let description = document.querySelector("#descricao").value 

        const category = {
            nome: name,
            descricao: description
        }

        

        requestApi = async () => {
            const settings = {
                method: 'PUT',
                headers: {

                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("token")
                },

                body: JSON.stringify(category)
            }
            try {
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/categoria/'+urlid, settings)
                const data = await fetchResponse.json()
                
            } catch (e) {
                return e
            }
        }

        requestApi()

    })

}

updateCategory()


