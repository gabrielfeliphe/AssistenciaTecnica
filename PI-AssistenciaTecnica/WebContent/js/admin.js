BRIQUETE.funcionario = new Object();


console.log("script ADMIN")

console.log("path funciona ? " + BRIQUETE.PATH)


$(document).ready(function() {
	
	

	BRIQUETE.funcionario.cadastrar = function() {

		let novoFuncionario = new Object();

		novoFuncionario.matricula = document.frmAddFuncionario.matricula.value;
		novoFuncionario.email = document.frmAddFuncionario.email.value;
		novoFuncionario.funcao = document.frmAddFuncionario.funcao.value;
		novoFuncionario.senha = document.frmAddFuncionario.senha.value;

		if (novoFuncionario.matricula == "" || novoFuncionario.email == "" || novoFuncionario.funcao == "" || novoFuncionario.senha == "") {
			console.log("erro : preencha todos os campos!");
		} else {

			$.ajax({
				type: "POST",
				url: BRIQUETE.PATH + "funcionario/cadastrar",
				data: JSON.stringify(novoFuncionario),
				success: function(msg) {
					console.log("adicionado novoFuncionario: " + novoFuncionario);
					BRIQUETE.funcionario.buscarFuncionarios();
				},
				error: function(info) {
					console.log("error= " + info.status + " --- " + info.statusText);
				}
			});
		}
	}

	BRIQUETE.funcionario.buscarFuncionarios = function() { // PRIMEIRO PARTO FEITO, ESTOU RECEBENDO AS MARCAS DA BACKEND	
		
		$.ajax({

			type: "GET",
			url: BRIQUETE.PATH + "funcionario/buscar",
			success: function(dados) {
				console.log(dados);
				$("#lista-funcionarios").html(BRIQUETE.funcionario.exibirFuncionarios(dados));
			},
			error: function(info) {
				console.log("erro : " + info);
				//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
			},

		});
	};





	BRIQUETE.funcionario.buscarFuncionarios(); // Fazer a instancia para a página sempre carregar a marca


	BRIQUETE.funcionario.exibirFuncionarios = function(listaDeFuncionarios) {

		var tabela = "<table class='table table-bordered table-dark'>" +
			"<tr>" +
			"<th>Matricula</th>" +
			"<th>Função</th>" +
			"<th>E-mail</th>" +
			"<th>Ações</th>"
		"</tr>";

		if (listaDeFuncionarios != undefined && listaDeFuncionarios.length > 0) {


			for (var i = 0; i < listaDeFuncionarios.length; i++) {
				let nomeFuncao
				switch (listaDeFuncionarios[i].funcao) {
					case 0:
						nomeFuncao = "Administrador"
						break;
					case 1:
						nomeFuncao = "Recepção"
						break;
					case 2:
						nomeFuncao = "Manutenção"
						break;
					case 3:
						nomeFuncao = "Almoxarife"
						break;
				}

				tabela += "<tr>" +
					"<td>" + listaDeFuncionarios[i].matricula + "</td>" +
					"<td>" + nomeFuncao + "</td>" +
					"<td>" + listaDeFuncionarios[i].email + "</td>" +
					"<td>" +
					"<a onclick=\"BRIQUETE.funcionario.exibirEdicao('" + listaDeFuncionarios[i].matricula + "')\"><img src='../../imgs/edit.png' alt='Editar registro'></a>" +
					"<a onclick=\"BRIQUETE.funcionario.excluir('" + listaDeFuncionarios[i].matricula + "')\"><img src='../../imgs/delete.png' alt='Excluir registro'></a>" +
					"</td>" +
					"</tr>"


			}

		} else if (listaDeFuncionarios == "") {
			tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
		}
		tabela += "</table>";

		return tabela;

	};


	BRIQUETE.funcionario.excluir = function(matricula) {
		
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
							url: BRIQUETE.PATH + "funcionario/excluir/" + matricula,
							success: function (msg){
								BRIQUETE.funcionario.buscarFuncionarios();
							},
							error: function(info){
								BRIQUETE.exibirAviso("Erro ao excluir funcionário "+ info.status + " - " + info.statusText+ " - " + info.responseText);
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
	
	
BRIQUETE.funcionario.exibirEdicao = function(matricula){
		
		$.ajax({
			type: "GET",
			url: BRIQUETE.PATH + "funcionario/buscarPorMatricula",
			data: "matricula="+matricula,
			success: function(funcionario){
					
				document.frmEditaFuncionario.matricula.value = funcionario.id;
				document.frmEditaFuncionario.email.value = funcionario.nome;
				document.frmEditaFuncionario.senha.value = funcionario.senha;
		
				
				var selFuncao = document.getElementById ('selFuncaoEdicao');
				for(var i=0; i<selFuncao.length; i++){
					if(selFuncao.options[i].value == funcionario.funcao){
						selFuncao.options[i].setAttribute("selected","selected");
					}else{
						selFuncao.options[i].removeAttribute("selected");
					}
				}
				
				
				var modalEditaFuncionario = {
						title: "Editar Funcionário",
						height: 200,
						width: 350,
						modal: true,
						buttons:{
							"Salvar": function(){
								BRIQUETE.funcionario.editar();
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
				
				$("#modalEditaFuncionario").dialog(modalEditaFuncionario);
				
			},
			error: function(info){
				
				COLDIGO.exibirAviso("Erro ao buscar a marca para edição: "+info.status+" - "+info.statusText+ " - " + info.responseText);
			}
		});
		
	};
	
	
BRIQUETE.funcionario.editar = function (){
		
		var funcionario = new Object();
		funcionario.matricula = document.frmEditaFuncionario.matricula.value;
		funcionario.funcao = document.frmEditaProduto.funcao.value;
		funcionario.email = document.frmEditaProduto.email.value;
		funcionario.senha = document.frmEditaProduto.senha.value;

		
		$.ajax({
			type: "PUT",
			url: COLDIGO.PATH + "produto/alterar",
			data: JSON.stringify(produto),
			success: function(msg){
				COLDIGO.exibirAviso(msg);
				COLDIGO.produto.buscar();
				$("#modalEditaProduto").dialog("close");
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao editar produto: "+info.status+" - "+info.statusText);
			}
		});
		
	}



});


