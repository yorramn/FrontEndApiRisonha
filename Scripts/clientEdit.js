let url_string = window.location.href
let url = new URL(url_string)
let urlid = url.searchParams.get("id")

function showClient() {

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
            const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/cliente/' + urlid, settings)
            const data = await fetchResponse.json()
            document.querySelector("#Nome").value = data.objeto.nome
            document.querySelector("#CPF").value = data.objeto.cpf
            document.querySelector("#CEP").value = data.objeto.cep
            document.querySelector("#Logradouro").value = data.objeto.logradouro
            document.querySelector("#Numero").value = data.objeto.numero
            document.querySelector("#Cidade").value = data.objeto.cidade
            document.querySelector("#Telefone").value = data.objeto.telefone
            document.querySelector("#Email").value = data.objeto.email
        } catch (e) {
        }
    }

    requestApi()
}



function updateClient() {

    document.querySelector("#btncadastrar").addEventListener("click", function (e) {
        e.preventDefault()
        let name = document.querySelector("#Nome").value
        let cpf = document.querySelector("#CPF").value
        let email = document.querySelector("#Email").value
        let cep = document.querySelector("#CEP").value
        let log = document.querySelector("#Logradouro").value
        let num = document.querySelector("#Numero").value
        let cidade = document.querySelector("#Cidade").value
        let tel = document.querySelector("#Telefone").value

        const client = {
            nome: name,
            cpf: cpf,
            email: email,
            cep: cep,
            logradouro: log,
            numero: num,
            cidade: cidade,
            telefone: tel
        }

        requestApi = async () => {
            const settings = {
                method: 'PUT',
                headers: {

                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("token")
                },

                body: JSON.stringify(client)
            }
            try {
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/cliente/' + urlid, settings)
                const data = await fetchResponse.json()
                alert(data.message)
            } catch (e) {
                alert(data.message)
            }
        }

        requestApi()

    })

}

updateClient()

function cleanInput() {
    document.querySelector("#limpar").addEventListener("click", () => {
        document.querySelector("#Nome").value = ""
        document.querySelector("#CPF").value = ""
        document.querySelector("#Email").value = ""
        document.querySelector("#CEP").value = ""
        document.querySelector("#Logradouro").value = ""
        document.querySelector("#Numero").value = ""
        document.querySelector("#Cidade").value = ""
        document.querySelector("#Telefone").value = ""
    })
}

cleanInput()