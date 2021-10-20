function registerClient() {

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
                method: 'POST',
                headers: {

                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem("token")
                },

                body: JSON.stringify(client)
            }
            try {
                const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/cliente', settings)
                const data = await fetchResponse.json()
                
            } catch (e) {
                return e
            }
        }

        requestApi()

    })

}

registerClient()


