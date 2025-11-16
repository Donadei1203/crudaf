fetch('http://localhost:3000/usuarios')
  .then(response => response.json())
  .then(data => {
    const tabelaCorpo = document.getElementById('tabela-corpo');
    tabelaCorpo.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

    data.forEach(obj => {
      const tr = document.createElement('tr');

      const tdNome = document.createElement('td');
      const tdCpf = document.createElement('td');
      const tdEmail = document.createElement('td');
      const tdCep = document.createElement('td');
      const tdCidade = document.createElement('td');
      const tdEstado = document.createElement('td');
      const tdRua = document.createElement('td');
      const tdTelefone = document.createElement('td');

      tdNome.innerText = obj.nome;
      tdCpf.innerText = obj.cpf;
      tdEmail.innerText = obj.email;
      tdCidade.innerText = obj.cidade;
      tdCep.innerText = obj.cep;
      tdEstado.innerText = obj.estado;
      tdRua.innerText = obj.rua;
      tdTelefone.innerText = obj.telefone;

      tr.appendChild(tdNome);
      tr.appendChild(tdCpf);
      tr.appendChild(tdEmail);
      tr.appendChild(tdCep);
      tr.appendChild(tdCidade);
      tr.appendChild(tdEstado);
      tr.appendChild(tdRua);
      tr.appendChild(tdTelefone);

      tabelaCorpo.appendChild(tr);
    });
  });

    function buscarDados() {
    var cpf = document.getElementById('cpfsearch').value;

    fetch('http://localhost:3000/usuarios')
    .then(resposta => resposta.json())
    .then(dados => {
      let pessoa = dados.find(p => p.cpf == cpf);

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
      } else {
        alert('Pessoa não encontrada!');
      }
    });
}

function check(){
  var loginls = localStorage.getItem('loginLS')
  var senhals = localStorage.getItem('senhaLS')
  
  fetch('http://localhost:3000/usuarios').then(resposta => resposta.json()).then(data => {
      
      const isAdmin = data.find(usuarios => usuarios.papel === "admin")
      
      const admin = data.find(usuarios => usuarios.nome === loginls && usuarios.senha === senhals && isAdmin)

      if(!admin){
          window.location.href = "../index.html"
      }
  })
}

  window.onload = check()

function logout(){
  localStorage.removeItem('loginLS');
  localStorage.removeItem('senhaLS');
  window.location.href = '../index.html'
}

function atualizarDados(){
  var usuarioAtualizado = {
    nome: document.getElementById("nome").value,
    senha: document.getElementById("senha").value,
    cpf: document.getElementById("cpf").value,
    email: document.getElementById("email").value,
    cep:document.getElementById('cep').value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
    rua: document.getElementById("rua").value,
    telefone: document.getElementById("telefone").value
  };


  fetch('http://localhost:3000/usuarios')
    .then(resposta => resposta.json())
    .then(dados => {
      var cpf = document.getElementById('cpfsearch').value;
      let pessoa = dados.find(p => p.cpf == cpf);

      const id = pessoa.id
    
    fetch(`http://localhost:3000/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuarioAtualizado)
  })
    .then(resposta => resposta.json())
    .then(data => {
      alert('Dados atualizados com sucesso!');
    })
    .catch(erro => {
      alert('Erro ao atualizar os dados.');
      console.error(erro);
    });
})
}

function deletarDados(){
  fetch('http://localhost:3000/usuarios')
    .then(resposta => resposta.json())
    .then(dados => {
      var cpf = document.getElementById('cpfsearch').value;
      let pessoa = dados.find(p => p.cpf == cpf);

      const id = pessoa.id

  fetch(`http://localhost:3000/usuarios/${id}`, {
    method: 'DELETE'
    
  }).then(resposta => resposta.json())
})
}