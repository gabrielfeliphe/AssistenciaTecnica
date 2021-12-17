BRIQUETE.recepcao = new Object();

$(document).ready(function(){
	
	BRIQUETE.recepcao.consultaOS = function(){
		
		$.ajax({
			type: "GET",
			url: BRIQUETE.PATH + "servicos/buscarOrcamentos",
			success: function(dados) {
				console.log(dados);
				$("#lista-orcamento").html(BRIQUETE.recepcao.exibirOS(dados));
			},
			error: function(info) {
				console.log("erro : " + info);
				//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
			},

		});
	}
	
	BRIQUETE.recepcao.consultaOS();
	
	BRIQUETE.recepcao.exibirOS = function(dados){
		
		var tabela = "<table class='table table-bordered table-dark' id='tabelaExibeClientes'>" +
		"<thead>"+
		"<tr>" +
		"<th>Status</th>" +
		"<th>Cliente</th>" +
		"<th>Equipamento</th>" +
		"</tr>"+
		"</thead>"+
		"<tbody id='tabelaOrcamentos'>";

	if (listaDeOS != undefined && listaDeOS.length > 0) {
		
		console.log(listaDeOS)

		for (var i = 0; i < listaDeOS.length; i++) {
			let statusOrcamento
			switch (listaDeOS[i].status) {
				case 1:
					statusOrcamento = "Aguardando técnico"
					break;
				case 2:
					statusOrcamento = "Contatar Cliente"
					break;
				case -1:
					statusOrcamento = "Rejeitado"
					break;
				case 3:
					statusOrcamento = "Aprovado - Aguardando Peças"
					break;
			}
			
			if(listaDeOS[i].status <= 3){

			tabela += "<tr id='tabelaExibeOrcamentos'>" +
				"<td class='exibeInformacoes' onclick='BRIQUETE.orcamento.aprovarOrcamento("+listaDeOS[i].idorcamento+")'>" + statusOrcamento + "</td>" +
				"<td>" + listaDeOS[i].cliente.nome+ "</td>" +
				"<td>" + listaDeOS[i].equipamentoNome + "</td>" +
				"</tr>"
			}
		}

	} else if (listaDeOS == "") {
		tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
	}
	tabela += "</tbody></table>";

	return tabela;

	}
	
});