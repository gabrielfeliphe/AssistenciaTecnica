BRIQUETE.general = new Object();

$(document).ready(function(){
	
BRIQUETE.general.consultaOrcamento = function(){
	
	$.ajax({

		type: "GET",
		url: BRIQUETE.PATH + "servicos/buscarOrcamentos",
		success: function(dados) {
			console.log(dados);
			$("#lista-orcamento").html(BRIQUETE.general.exibirOrcamentos(dados));
		},
		error: function(info) {
			console.log("erro : " + info);
			//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
		},

	});
	
}

BRIQUETE.general.consultaOrcamento()



BRIQUETE.general.exibirOrcamentos = function(listaDeFuncionarios) {

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
	
	
});