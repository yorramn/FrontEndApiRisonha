function register() {

    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault()
        let username = document.querySelector("#nome").value
        let useremail = document.querySelector("#login").value
        let userpassword = document.querySelector("#password").value
        let userpasswordconfirm = document.querySelector("#passwordconfirm").value

        if (userpassword != userpasswordconfirm) {
            e.stopPropagation
        } else {

            const registerdata = {
                name: username,
                email: useremail,
                password: userpassword,
                password_confirmation: userpasswordconfirm
            }

            requestApi = async () => {
                const settings = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.getItem("token")
                    },

                    body: JSON.stringify(registerdata)
                }
                try {
                    const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/store', settings)
                    const data = await fetchResponse.json()

                    document.querySelector("#nome").value = ""
                    document.querySelector("#login").value = ""
                    document.querySelector("#password").value = ""
                    document.querySelector("#passwordconfirm").value = ""

                } catch (e) {
                    return e
                }
            }

            requestApi()
        }





    })

}
register()
