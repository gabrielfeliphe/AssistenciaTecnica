BRIQUETE.recepcao = new Object();

console.log("entrou script consulta os")

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
	
	BRIQUETE.recepcao.exibirOS = function(listaDeOS){

		
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
				case 4:
					statusOrcamento = "Aguardando Manutenção"
					break;
				case 5:
					statusOrcamento = "Contatar Cliente"
					break;
			}
			
			if(listaDeOS[i].status >= 4){

			tabela += "<tr id='tabelaExibeOrcamentos'>" +
				"<td class='exibeInformacoes' onclick='BRIQUETE.recepcao.aprovarOS("+listaDeOS[i].idorcamento+")'>" + statusOrcamento + "</td>" +
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
	
	

	BRIQUETE.recepcao.aprovarOS = function(idorcamento){
		
		$.ajax({
			
			type: "GET",
			url: BRIQUETE.PATH + "servicos/buscarOrcamentoId",
			data: "idorcamento="+idorcamento,
			success: function(dados) {
				
				//CARREGAMENTO DOS ITENS NA LABEL VIA DADOS
				console.log("dados do idorcamento consultaos")
				console.log(dados)
				
				document.getElementById('clienteNameModal').innerHTML  = dados.cliente.nome;
				document.getElementById('equipamento').innerHTML  = dados.equipamentoNome;
				document.getElementById('observacoes').innerHTML  = dados.observacao;
				document.getElementById('mod-cod').innerHTML  = dados.equipamentoModeloCodigo;
				document.getElementById('defeito').innerHTML  = dados.defeito;
				document.getElementById('telefone').innerHTML = dados.cliente.telefone;
				
				if((dados.status == 2) || (dados.status == 3)){ // FAZ O CARREGAMENTO SE A ORDEM DE SERVIÇO JÁ FOI PREENCHIDA
					
					
					document.getElementById('validadeOrcamento').innerHTML = dados.validade;
					document.getElementById('observacoes').innerHTML = dados.observacao;
					document.getElementById("tabelaValor").hidden = false;
					
					console.log(document.getElementById("tabelaValor").hidden)
					
					$("#tabela-orcamento").html(BRIQUETE.orcamento.exibirOrcamentoModal(dados.servicos));
					
				}else{
				
				}
					
				var modalRealizaOrcamento = { // CRIAÇÃO DA MODAL
						title: "Orçamento",
						height:450,
						width:900,
						modal: true,
						buttons:{
							"Cancelar": function(){
								$(this).dialog("close");
								//BRIQUETE.orcamento.limparFrm();	
							},
							"Finalizar": function(){
								
								
								$.ajax({
									type: "PUT",
									url: BRIQUETE.PATH + "servicos/aprovarOrcamento/"+idorcamento+"/"+valorStatus,
									success: function(msg) {
										BRIQUETE.exibirAviso(msg);
										BRIQUETE.orcamento.consultaOrcamento();
										//BRIQUETE.orcamento.limparFrm();
										$("#modalRealizaOS").dialog( "close" );
									},
									error: function(info) {
										BRIQUETE.exibirAviso(info.responseText);
									}
								});
							
								
							},
							"Abandono":function(){
								
								$.ajax({
									type: "PUT",
									url: BRIQUETE.PATH + "servicos/aprovarOrcamento/"+idorcamento+"/"+"-1",
									success: function(msg) {
										BRIQUETE.exibirAviso(msg);
										BRIQUETE.orcamento.consultaOrcamento();
										//BRIQUETE.orcamento.limparFrm();
										$("#modalRealizaOS").dialog( "close" );
									},
									error: function(info) {
										BRIQUETE.exibirAviso(info.responseText);
									}
								});
								
							}
						},
						close: function(){
							//BRIQUETE.orcamento.limparFrm();
							$(this).dialog('close');
						}
				};
				
				$("#modalRealizaOS").dialog(modalRealizaOrcamento);
				
				if(dados.status !=5){ // desabilita botão quando for diferente de contatar o cliente;
					$(":button:contains('Finalizar')").prop("disabled", true).addClass("ui-state-disabled")
					$(":button:contains('Abandono')").prop("disabled", true).addClass("ui-state-disabled")
				}
				
			},
			error: function(info) {
				console.log("erro : " + info);
				//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
			},

		});
	}
	
	
});