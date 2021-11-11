BRIQUETE.cliente = new Object();

console.log("script cliente entrou!");

$(document).ready(function() {
	
	BRIQUETE.cliente.cadastrar = function() {

		let novoCliente = new Object();

		novoCliente.nome = document.frmAddCliente.nome.value;
		novoCliente.email = document.frmAddCliente.email.value;
		novoCliente.cpf = document.frmAddCliente.cpf.value;
		novoCliente.telefone = document.frmAddCliente.telefone.value;

		if (novoCliente.nome == "" || novoCliente.email == "" || novoCliente.cpf == "" || novoCliente.telefone == "") {
			BRIQUETE.exibirAviso("erro : preencha todos os campos!");
		}
		
		else {

			$.ajax({
				type: "POST",
				url: BRIQUETE.PATH + "cliente/cadastrar",
				data: JSON.stringify(novoCliente),
				success: function(msg) {
					console.log("adicionado novoCliente: " + novoCliente);
					BRIQUETE.cliente.buscarClientes();
				},
				error: function(info) {
					BRIQUETE.exibirAviso(info.responseText);
				}
			});
		}
	}	

	
BRIQUETE.cliente.buscarClientes = function() {
		
		$.ajax({
			
			type: "GET",
			url: BRIQUETE.PATH + "cliente/buscar",
			success: function(dados) {
				console.log(dados);
				$("#lista-clientes").html(BRIQUETE.cliente.exibirClientes(dados));
			},
			error: function(info) {
				console.log("erro : " + info);
				//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
			},

		});
	};
	
BRIQUETE.cliente.buscarClientes();

BRIQUETE.cliente.exibirClientes = function(listaClientes){
	
	var tabela = "<table class='table table-bordered table-dark'>" +
	"<tr>" +
	"<th>Nome</th>" +
	"<th>CPF</th>" +
	"<th>E-mail</th>" +
	"<th>Telefone</th>"
	"<th>Ações</th>"
"</tr>";

if (listaClientes != undefined && listaClientes.length > 0) {

	for (var i = 0; i < listaClientes.length; i++) {
		tabela += "<tr>" +
			"<td>" + listaClientes[i].nome + "</td>" +
			"<td>" + listaClientes[i].cpf+ "</td>" +
			"<td>" + listaClientes[i].email + "</td>" +
			"<td>" + listaClientes[i].telefone + "</td>" +
			"<td>" +
			"<a onclick=\"BRIQUETE.cliente.exibirEdicao('" + listaClientes[i].idcliente + "')\"><img src='../../imgs/edit.png' alt='Editar registro'></a>" +
			"<a onclick=\"BRIQUETE.cliente.excluir('" + listaClientes[i].idcliente + "')\"><img src='../../imgs/delete.png' alt='Excluir registro'></a>" +
			"</td>" +
			"</tr>"
			}
	}else if (listaClientes == "") {
	tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
}
tabela += "</table>";

return tabela;
	
};

BRIQUETE.cliente.excluir = function(idcliente) {
	
	console.log("invocado excluir")
	
	var modal = {
		
			title: "Mensagem",
			height: 250,
			width: 400,
			modal: true,
			buttons: {
				"Excluir": function(){
					$(this).dialog("close");
					$.ajax({
						type: "DELETE",
						url: BRIQUETE.PATH + "cliente/excluir/" + idcliente,
						success: function (msg){
							BRIQUETE.cliente.buscarClientes();
						},
						error: function(info){
							BRIQUETE.exibirAviso("Erro ao excluir cliente "+ info.status + " - " + info.statusText+ " - " + info.responseText);
						},
					});
				},
				"Cancelar" : function(){
					$(this).dialog("close");
				}
			}
		};
		console.log("invocado antes modal")

		$("#modalAviso").html("Deseja realmente deletar esse funcionário ?");
		$("#modalAviso").dialog(modal);
};
	
	
});