function check(){
    var loginls = localStorage.getItem('loginLS')
    var senhals = localStorage.getItem('senhaLS')


    
    console.log(loginls + senhals)
    
    fetch('http://localhost:3000/usuarios').then(resposta => resposta.json()).then(data => {
        const pessoa = data.find(p => p.nome == loginls)
        
        if (pessoa) {
        document.getElementById('nome').value = pessoa.nome;
        document.getElementById('senha').value = pessoa.senha;
        document.getElementById('cpf').value = pessoa.cpf;
        document.getElementById('email').value = pessoa.email;
        document.getElementById('cep').value = pessoa.cep;
        document.getElementById('cidade').value = pessoa.cidade;
        document.getElementById('estado').value = pessoa.estado;
        document.getElementById('rua').value = pessoa.rua;
        document.getElementById('telefone').value = pessoa.telefone;
    } else{
        console.log('Não logado')
    }
    })
}

window.onload = check()

function logout(){
  localStorage.removeItem('loginLS');
  localStorage.removeItem('senhaLS');
  window.location.href = '../index.html'
}