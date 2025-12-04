function btocadastrar(event) {
  event.preventDefault();

  var usuario = {
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

  fetch("https://crudaf-1.onrender.com/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Usuário cadastrado!");
      console.log("Sucesso:", data);
    })
    .catch((err) => {
      alert("Erro ao cadastrar usuário.");
      console.error("Erro:", err);
    });
}
