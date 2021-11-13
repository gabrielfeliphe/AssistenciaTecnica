BRIQUETE.cliente = new Object();
BRIQUETE.orcamento = new Object();

//$.noConflict(); // ta carregando 2 jquery ?
$(document).ready(function() {
	
	
	BRIQUETE.cliente.cadastrar = function() {

		let novoCliente = new Object();
		
		var expApenasNumeros = new RegExp("^[0-9]+$")
		var email = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        var cpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
        
   
		novoCliente.nome = document.frmAddCliente.nome.value;
		novoCliente.email = document.frmAddCliente.email.value;
		novoCliente.cpf = document.frmAddCliente.cpf.value;
		novoCliente.telefone = document.frmAddCliente.telefone.value;

		if (novoCliente.nome == "" || novoCliente.email == "" || novoCliente.cpf == "" || novoCliente.telefone == "") {
			BRIQUETE.exibirAviso("erro : preencha todos os campos!");
		}else if(email.test(novoCliente.email) == false){
			BRIQUETE.exibirAviso("não é email valido");
		}else if (!expApenasNumeros.test(novoCliente.telefone)){
			BRIQUETE.exibirAviso("Apenas números no telefone");
		}else if (!expApenasNumeros.test(novoCliente.cpf)){
			BRIQUETE.exibirAviso("Apenas números no cpf");
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
	"<th>Telefone</th>"+
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

		$("#modalAviso").html("Deseja realmente deletar esse cliente ?");
		$("#modalAviso").dialog(modal);
};


BRIQUETE.cliente.exibirEdicao = function(idcliente){
		
		console.log("idcliente exibir edição: "+idcliente)
	
		$.ajax({
			type: "GET",
			url: BRIQUETE.PATH + "cliente/buscarPorId",
			data: "idcliente="+idcliente,
			success: function(cliente){
				
				document.frmEditaCliente.nome.value = cliente.nome;
				document.frmEditaCliente.email.value = cliente.email;
				document.frmEditaCliente.cpf.value = cliente.cpf;
				document.frmEditaCliente.telefone.value = cliente.telefone;
				document.frmEditaCliente.idCliente.value = idcliente;
				
				
				var modalEditaCliente = {
						title: "Editar Funcionário",
						height: 400,
						width: 500,
						modal: true,
						buttons:{
							"Salvar": function(){
								BRIQUETE.cliente.editar();
								$(this).dialog("close"); // ADICIONAR ESSA LINHA PARA RETIRAR OS ERRORS DE CLOSE
							},
							"Cancelar": function(){
								$(this).dialog("close");
							}
						},
						close: function(){
							//caso o usuário simplesmente feche a caixa de edição
							// nao deve acontecar nada
						}
				};
				
				$("#modalEditaCliente").dialog(modalEditaCliente);
				
			},
			error: function(info){
				
				BRIQUETE.exibirAviso("Erro ao buscar o funcionário para a edição "+info.status+" - "+info.statusText+ " - " + info.responseText);
			}
		});
		
	};
	
	
BRIQUETE.cliente.editar = function (){
		
		var cliente = new Object();
		cliente.nome = document.frmEditaCliente.nome.value;
		cliente.email = document.frmEditaCliente.email.value;
		cliente.cpf = document.frmEditaCliente.cpf.value;
		cliente.telefone = document.frmEditaCliente.telefone.value;
		cliente.idcliente = document.frmEditaCliente.idCliente.value;

		
		var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
			if(reg.test(cliente.email) == false){
				BRIQUETE.exibirAviso("não é email valido")
			}else{
		
		
		$.ajax({
			type: "PUT",
			url: BRIQUETE.PATH + "cliente/alterar",
			data: JSON.stringify(cliente),
			success: function(msg){
				BRIQUETE.exibirAviso(msg);
				BRIQUETE.cliente.buscarClientes();
				$("#modalEditaCliente").dialog("close");
			},
			error: function(info){
				BRIQUETE.exibirAviso("Erro ao editar cliente: "+info.responseText);
			}
		});
			}
		
	}


BRIQUETE.orcamento.procurarClientes = function(){
	
	$.ajax({
		
		type: "GET",
		url: BRIQUETE.PATH + "cliente/buscar",
		success: function(dados) {
			BRIQUETE.orcamento.exibirClientes(dados)
		},
		error: function(info) {
			console.log("erro : " + info);
			//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
		},

	});
	
}

BRIQUETE.orcamento.exibirClientes = function(clientes){
	
	var option = document.createElement("option");
	
	for(var i = 0 ; i < clientes.length; i++){
		var option = document.createElement("option");
		option.setAttribute("idcliente",clientes[i].idcliente);
		

		option.innerHTML = (clientes[i].nome);
		$(select).append(option);
	}
	
}

BRIQUETE.orcamento.cadastrar = function(){
	let orcamento = new Object();
	
	orcamento.cliente = document.frmAberturaOrcamento.procurarCliente.value;
	orcamento.equipamentoNome = document.frmAberturaOrcamento.equipamento.value;
	orcamento.equipamentoModeloCodigo = document.frmAberturaOrcamento.equipamento.value;
	orcamento.defeito = document.frmAberturaOrcamento.defeito.value;
	orcamento.equipamento = document.frmAberturaOrcamento.equipamento.value;
	orcamento.orcamento = document.frmAberturaOrcamento.orcamento.value;
	orcamento.garantia = document.frmAberturaOrcamento.garantia.value;
	orcamento.data = document.frmAberturaOrcamento.data.value;
	
	console.log(orcamento);
	
	$.ajax({
		type: "POST",
		url: BRIQUETE.PATH + "orcamento/cadastrar",
		data: JSON.stringify(orcamento),
		success: function(msg) {
			console.log("adicionado novo orçamento " + novoCliente);
		},
		error: function(info) {
			BRIQUETE.exibirAviso(info.responseText);
		}
	});


}
	
});