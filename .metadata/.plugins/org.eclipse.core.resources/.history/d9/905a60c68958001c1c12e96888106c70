BRIQUETE.almoxarife = new Object();


$(document).ready(function() {
	
	
	BRIQUETE.almoxarife.consultaOrcamento = function(){
		
		$.ajax({

			type: "GET",
			url: BRIQUETE.PATH + "servicos/buscarOrcamentos",
			success: function(dados) {
				console.log(dados);
				$("#lista-orcamento").html(BRIQUETE.almoxarife.exibirOrcamentos(dados));
			},
			error: function(info) {
				console.log("erro : " + info);
				//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
			},

		});
		
	}
	
	BRIQUETE.almoxarife.consultaOrcamento()

	
	
	BRIQUETE.almoxarife.exibirOrcamentos = function(listaDeOrcamentos) {

		var tabela = "<table class='table table-bordered table-dark'>" +
			"<thead>"+
			"<tr>" +
			"<th>Status</th>" +
			"<th>Cliente</th>" +
			"<th>Equipamento</th>" +
			"</tr>"+
			"</thead>"+
			"<tbody id='tabelaOrcamentos'>";
		
		var triggerStatus = 0;
		
		if (listaDeOrcamentos != undefined && listaDeOrcamentos.length > 0) {
			
			console.log(listaDeOrcamentos)

			for (var i = 0; i < listaDeOrcamentos.length; i++) {
				
				
				if(listaDeOrcamentos[i].status == 3){
					
				triggerStatus = 1;
				let statusOrcamento = "Aguardando peças"	

				tabela += "<tr id='tabelaExibeOrcamentos'>" +
					"<td class='exibeInformacoes' onclick='BRIQUETE.almoxarife.verificaItemEstoque("+listaDeOrcamentos[i].idorcamento+")'>" + statusOrcamento + "</td>" +
					"<td>" + listaDeOrcamentos[i].cliente.nome+ "</td>" +
					"<td>" + listaDeOrcamentos[i].equipamentoNome + "</td>" +
					"</tr>"
				}

			}

		} else if (listaDeOrcamentos == "") {
			tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
		}
		tabela += "</tbody></table>";
		
		if(triggerStatus == 0){
			
			console.log("entrou no trigger")
			
			tabela = "<table class='table table-bordered table-dark'>" +
			"<thead>"+
			"<tr>" +
			"<th>Status</th>" +
			"<th>Cliente</th>" +
			"<th>Equipamento</th>" +
			"</tr>"+
			"</thead>"+
			"<tbody id='tabelaOrcamentos'>"+
			"<tr><td colspan='6'>Nenhum registro encontrado</td></tr>"+
			"</tbody></table>";
		}
		
		console.log(triggerStatus)

		return tabela;

	};
	
	
BRIQUETE.almoxarife.verificaItemEstoque = function(idorcamento){
		
		$.ajax({
			
			type: "GET",
			url: BRIQUETE.PATH + "servicos/buscarOrcamentoId",
			data: "idorcamento="+idorcamento,
			success: function(dados) {
				
				//CARREGAMENTO DOS ITENS NA LABEL VIA DADOS
				
				console.log(dados);
				
				document.getElementById('clienteNameModal').innerHTML  = dados.cliente.nome;
				document.getElementById('equipamento').innerHTML  = dados.equipamentoNome;
				document.getElementById('mod-cod').innerHTML  = dados.equipamentoModeloCodigo;
				document.getElementById('defeito').innerHTML  = dados.defeito;
				
				$("#tabela-pecas").html(BRIQUETE.almoxarife.exibirPecasModal(dados.servicos));
					
				var modalOrcamento = { // CRIAÇÃO DA MODAL
						title: "Orçamento",
						height: 600,
						width: 950,
						modal: true,
						buttons:{
							"Cancelar": function(){
								$(this).dialog("close");
							},
							"Liberar": function(){
								$.ajax({
									type: "PUT",
									url: BRIQUETE.PATH + "servicos/aprovarOrcamento/"+idorcamento+"/"+"4",
									success: function(msg) {
										BRIQUETE.exibirAviso(msg);
										BRIQUETE.almoxarife.consultaOrcamento()
										$("#modalOrcamento").dialog('close');
									},
									error: function(info) {
										BRIQUETE.exibirAviso(info.responseText);
									}
								});
								
							},
							"Aguardar":function(){
								BRIQUETE.almoxarife.consultaOrcamento();
								$("#modalOrcamento").dialog('close');
							}
						},
						close: function(){
							$(this).dialog('close');
						}
				};
				
				$("#modalOrcamento").dialog(modalOrcamento);
				
			},
			error: function(info) {
				console.log("erro : " + info);
				//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
			},

		});
	}

		BRIQUETE.almoxarife.exibirPecasModal = function (dadosOrcamento){
			
			

			
			var tabela = "<table class='table table-bordered table-dark'>" +
			"<tr>" +
			"<th>Peca</th>" +
		"</tr>";
		
		
			for (var i = 0; i < dadosOrcamento.length; i++) { // servico = 0 , peça = 1
				
				if(dadosOrcamento[i].tipo == 1){
						tabela += "<tr>" +
							"<td>" + dadosOrcamento[i].peca_servico + "</td>" +
							"</tr>"
				}
			}
		
		tabela += "</table>";
		
		console.log(tabela)
		
		return tabela;
			
		}
	

	
});
