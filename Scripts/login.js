function login(){

    document.querySelector("form").addEventListener("submit", function(e){
        e.preventDefault()
        let user = document.querySelector("#login").value
        let userpassword = document.querySelector("#password").value
    
        const login = {
            email: user,
            password: userpassword
        }
    
        requestApi = async () => {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        }
        try {
            const fetchResponse = await fetch('http://risonhaapi.herokuapp.com/api/login', settings)
            const data = await fetchResponse.json()
            const token = data.token;
            window.localStorage.setItem("token",token)
            if(data.user.email == login.email){
                window.location.replace("Produtos/cadastrar-produtos.html")
            }
        } catch (e) {
            return e
        }}
    
        requestApi()
            
    })

}
login()



    
        




