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



BRIQUETE.general.exibirOrcamentos = function(listaDeOrcamentos) {

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


		for (var i = 0; i < listaDeOrcamentos.length; i++) {
			let statusOrcamento
			switch (listaDeOrcamentos[i].status) {
				case 1:
					statusOrcamento = "Aguardando técnico"
					break;
				case 2:
					statusOrcamento = "Aguardando cliente"
					break;
				case -1:
					statusOrcamento = "Rejeitado"
			}

			tabela += "<tr id='tabelaExibeOrcamentos'>" +
				"<td>" + statusOrcamento + "</td>" +
				"<td>" + listaDeOrcamentos[i].nomeCliente+ "</td>" +
				"<td>" + listaDeOrcamentos[i].equipamentoNome + "</td>" +
				"</tr>"


		}

	} else if (listaDeOrcamentos == "") {
		tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
	}
	tabela += "</tbody></table>";

	return tabela;

};


$("#procurarClientesOrcamentos").on("keyup", function() {
		    var value = $(this).val().toLowerCase();
		    $("#tabelaOrcamentos tr").filter(function() {
		      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		    });
		  });


BRIQUETE.general.filtroOrcamentos = function(){
	
	if(document.querySelector('#pecas').checked && document.querySelector('#manutencao').checked){
		console.log("Disparou os dois")
		$("#tabelaOrcamentos tr").filter(function() {
			$("tr").show()
		   });
	}else if(document.querySelector('#manutencao').checked){
		  $("#tabelaOrcamentos tr").filter(function() {
		      $(this).toggle($(this).text().indexOf('Aguardando cliente') > -1)
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