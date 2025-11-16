function btologin() {

    const login = document.getElementById('login').value
    const senha = document.getElementById('senha').value
    var erro = document.getElementById('erro')
    
    
    
    fetch('http://localhost:3000/usuarios').then(resposta => resposta.json()).then(data => {
        //busca a pessoa cujo nome e senha estejam corretos

        var usuario = data.find(usuarios => usuarios.nome === login && usuarios.senha === senha )
        const admin = data.find(usuarios => usuarios.nome === login && usuarios.senha === senha && usuarios.papel === "admin")

        if(admin){
            localStorage.setItem('loginLS', login);
            localStorage.setItem('senhaLS', senha);
            window.location.href = "../public/pages/usuarios.html";
            console.log('Admin')
        }else if(usuario){
            localStorage.setItem('loginLS', login);
            localStorage.setItem('senhaLS', senha);
            window.location.href = "../public/pages/boasvindas.html";
            console.log('usuario')
    }
        else{
        erro.textContent = 'Usuário ou Senha Incorretos'
    }
    })
}

function check(){
    var loginls = localStorage.getItem('loginLS')
    var senhals = localStorage.getItem('senhaLS')
    var loginInput = document.getElementById('login')
    var senhaInput = document.getElementById('senha')

    
    console.log(loginls + senhals)
    
    fetch('http://localhost:3000/usuarios').then(resposta => resposta.json()).then(data => {
        
        const isAdmin = data.find(usuarios => usuarios.papel === "admin")
        
        var usuariols = data.find(usuarios => usuarios.nome === loginls && usuarios.senha === senhals && !isAdmin)
        const admin = data.find(usuarios => usuarios.nome === loginls && usuarios.senha === senhals && isAdmin)

        if(admin){
            loginInput.value = `${loginls}`
            senhaInput.value = `${senhals}`
            window.location.href = "../public/pages/usuarios.html"
        }else if(usuariols){
            loginInput.value = `${loginls}`
            senhaInput.value = `${senhals}`
            window.location.href = "../public/pages/boasvindas.html"
        }
        else{
            console.log('não há logins nesse navegador')
        }
    })

}
setTimeout(() => {
    window.onload = check()
}, 1000);