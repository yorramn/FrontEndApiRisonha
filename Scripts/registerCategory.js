function registerCategory() {

    document.querySelector("#cadastrar").addEventListener("click", function (e) {
        e.preventDefault()
        let name = document.querySelector("#Codigo").value
        let description = document.querySelector("#descricao").value

        const category = {
            nome: name,
            descricao: description
        }
        requestApi = async () => {
            const settings = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("token")
                },
                body: JSON.stringify(category)
            }
            try {
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/categoria', settings)
                const data = await fetchResponse.json()
                alert(data.mensagem)
                window.location.reload()
            } catch (e) {
                alert(e)
            }
        }

        requestApi()

    })

}

registerCategory()

