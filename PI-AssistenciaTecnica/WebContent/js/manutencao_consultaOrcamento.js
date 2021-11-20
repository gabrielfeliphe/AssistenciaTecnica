BRIQUETE.manutencao = new Object();

$(document).ready(function(){
	
BRIQUETE.manutencao.consultaOrcamento = function(){
	
	$.ajax({

		type: "GET",
		url: BRIQUETE.PATH + "servicos/buscarOrcamentos",
		success: function(dados) {
			console.log(dados);
			$("#lista-orcamento").html(BRIQUETE.manutencao.exibirOrcamentos(dados));
		},
		error: function(info) {
			console.log("erro : " + info);
			//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
		},

	});
	
}

BRIQUETE.manutencao.consultaOrcamento()



BRIQUETE.manutencao.exibirOrcamentos = function(listaDeOrcamentos) {

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
					statusOrcamento = "Aguardando cliente"
					break;
				case -1:
					statusOrcamento = "Rejeitado"
			}
			

			tabela += "<tr id='tabelaExibeOrcamentos'>" +
				"<td class='exibeInformacoes' onclick='BRIQUETE.manutencao.realizarOrcamento("+listaDeOrcamentos[i].idorcamento+")'>" + statusOrcamento + "</td>" +
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


$("#procurarClientesOrcamentos").on("keyup", function() {
		    var value = $(this).val().toLowerCase();
		    $("#tabelaOrcamentos tr").filter(function() {
		      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		    });
		  });


BRIQUETE.manutencao.filtroOrcamentos = function(){
	
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

/*BRIQUETE.manutencao.exibirRealizarOrcamento = function(dados){
	$.ajax({
		type: "GET",
		url: BRIQUETE.PATH + "cliente/buscarPorId",
		data: "idcliente="+idcliente,
		success: function(cliente){
			
			document.cliente.value = dados.nome;
			
			
			var modalEditaOrcamento= {
					title: "Editar Cliente",
					height: 400,
					width: 500,
					modal: true,
					buttons:{
						"Cancelar": function(){
							$(this).dialog("close");
						},
						"Salvar": function(){
							BRIQUETE.cliente.editar();
							$(this).dialog("close"); // ADICIONAR ESSA LINHA PARA RETIRAR OS ERRORS DE CLOSE
						}
					},
					close: function(){
						//caso o usuário simplesmente feche a caixa de edição
						// nao deve acontecar nada
					}
			};
			
			$("#modalRealizaOrcamento").dialog(modalEditaOrcamento);
			
		},
		error: function(info){
			
			BRIQUETE.exibirAviso("Erro ao buscar o funcionário para a edição "+info.status+" - "+info.statusText+ " - " + info.responseText);
		}
	});
}*/

BRIQUETE.manutencao.realizarOrcamento = function(idorcamento){
	
	$.ajax({
		
		

		type: "GET",
		url: BRIQUETE.PATH + "servicos/buscarOrcamentoId",
		data: "idorcamento="+idorcamento,
		success: function(dados) {
			
			console.log(dados);
			
			document.getElementById('clienteNameModal').innerHTML  = dados.cliente.nome;
			document.getElementById('equipamento').innerHTML  = dados.equipamentoNome;
			document.getElementById('garantia').innerHTML  = dados.garantia == 1 ? 'Sim' : 'Não'; // ternario
			document.getElementById('equipamento').innerHTML  = dados.equipamentoNome;
			document.getElementById('mod-cod').innerHTML  = dados.equipamentoModeloCodigo;
			document.getElementById('data-entrada').innerHTML  = dados.data;
			document.getElementById('defeito').innerHTML  = dados.defeito;
			
			
			var modalRealizaOrcamento = {
					title: "Realizar orcamento",
					height: 650,
					width: 1200,
					modal: true,
					buttons:{
						"Cancelar": function(){
							$(this).dialog("close");
						},
						"Salvar": function(){
							$(this).dialog("close"); // ADICIONAR ESSA LINHA PARA RETIRAR OS ERRORS DE CLOSE
						}
					},
					close: function(){
						//caso o usuário simplesmente feche a caixa de edição
						// nao deve acontecar nada
					}
			};
			
			$("#modalRealizaOrcamento").dialog(modalRealizaOrcamento);
		},
		error: function(info) {
			console.log("erro : " + info);
			//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
		},

	});
}

	
});