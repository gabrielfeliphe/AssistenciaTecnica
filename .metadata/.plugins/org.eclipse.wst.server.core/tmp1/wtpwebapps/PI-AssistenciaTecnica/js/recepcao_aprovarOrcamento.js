BRIQUETE.orcamento = new Object();


$(document).ready(function(){
	
	BRIQUETE.orcamento.consultaOrcamento = function(){
		
		$.ajax({
			type: "GET",
			url: BRIQUETE.PATH + "servicos/buscarOrcamentos",
			success: function(dados) {
				console.log(dados);
				$("#lista-orcamento").html(BRIQUETE.orcamento.exibirOrcamentos(dados));
			},
			error: function(info) {
				console.log("erro : " + info);
				//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
			},

		});
		
	}
	
	BRIQUETE.orcamento.consultaOrcamento();
	
	BRIQUETE.orcamento.exibirOrcamentos = function(listaDeOrcamentos) {

		var tabela = "<table class='table table-bordered table-dark'>" +
			"<thead>"+
			"<tr>" +
			"<th>Status</th>" +
			"<th>Cliente</th>" +
			"<th>Equipamento</th>" +
			"</tr>"+
			"</thead>"+
			"<tbody id='tabelaOrcamentos'>";

		if (listaDeOrcamentos != undefined && listaDeOrcamentos.length > 0) {
			
			console.log(listaDeOrcamentos)

			for (var i = 0; i < listaDeOrcamentos.length; i++) {
				let statusOrcamento
				switch (listaDeOrcamentos[i].status) {
					case 1:
						statusOrcamento = "Aguardando técnico"
						break;
					case 2:
						statusOrcamento = "Contatar Cliente"
						break;
					case -1:
						statusOrcamento = "Rejeitado"
				}
				

				tabela += "<tr id='tabelaExibeOrcamentos'>" +
					"<td class='exibeInformacoes' onclick='BRIQUETE.orcamento.realizarOrcamento("+listaDeOrcamentos[i].idorcamento+")'>" + statusOrcamento + "</td>" +
					"<td>" + listaDeOrcamentos[i].cliente.nome+ "</td>" +
					"<td>" + listaDeOrcamentos[i].equipamentoNome + "</td>" +
					"</tr>"


			}

		} else if (listaDeOrcamentos == "") {
			tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
		}
		tabela += "</tbody></table>";

		return tabela;

	};
	
	BRIQUETE.orcamento.filtroOrcamentos = function(){
		
		if(document.querySelector('#pecas').checked && document.querySelector('#manutencao').checked){
			console.log("Disparou os dois")
			$("#tabelaOrcamentos tr").filter(function() {
				$("tr").show()
			   });
		}else if(document.querySelector('#manutencao').checked){
			  $("#tabelaOrcamentos tr").filter(function() {
			      $(this).toggle($(this).text().indexOf('Contatar Cliente') > -1)
			   });
		}else if (document.querySelector('#pecas').checked){
			$("#tabelaOrcamentos tr").filter(function() {
			      $(this).toggle($(this).text().indexOf('Aguardando técnico') > -1)
			   });
		}else if (!document.querySelector('#manutencao').checked){
			$("#tabelaOrcamentos tr").filter(function() {
			      $(this).show()
			   });
		}else if (!document.querySelector('#pecas').checked){
			$("#tabelaOrcamentos tr").filter(function() {
			      $(this).show()
			   });
		}
	}


});