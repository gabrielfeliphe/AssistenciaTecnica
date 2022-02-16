BRIQUETE.manutencao = new Object();

console.log("entrou script consulta os manutencao")

$(document).ready(function(){
	
	BRIQUETE.manutencao.consultaOS = function(){
		
		$.ajax({
			type: "GET",
			url: BRIQUETE.PATH + "servicos/buscarOrcamentos",
			success: function(dados) {
				console.log(dados);
				$("#lista-orcamento").html(BRIQUETE.manutencao.exibirOS(dados));
			},
			error: function(info) {
				console.log("erro : " + info);
				//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
			},

		});
	}
	
	BRIQUETE.manutencao.consultaOS();
	
	BRIQUETE.manutencao.exibirOS = function(listaDeOS){

		
		var tabela = "<table class='table table-bordered table-dark' id='tabelaExibeClientesOS'>" +
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
				"<td class='exibeInformacoes' onclick='BRIQUETE.manutencao.tratarOS("+listaDeOS[i].idorcamento+")'>" + statusOrcamento + "</td>" +
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
	
	

	BRIQUETE.manutencao.tratarOS = function(idorcamento){
		
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
				document.getElementById('data-entrada').innerHTML = dados.data;
				document.getElementById('tabelaValor').hidden = true;
				document.getElementById('valorTotal').innerHTML = BRIQUETE.manutencao.calcularServicos(dados.servicos)
				
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
							"Finalizado": function(){
								
								
								$.ajax({
									type: "PUT",
									url: BRIQUETE.PATH + "servicos/aprovarOrcamento/"+idorcamento+"/"+"5",
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
							"Abortar":function(){
								
								$.ajax({
									type: "PUT",
									url: BRIQUETE.PATH + "servicos/aprovarOrcamento/"+idorcamento+"/"+"-5",
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
	
	BRIQUETE.manutencao.calcularServicos = function(servicos){
		
		var valor=0;
		for(let i=0; i<servicos.length; i++){
			valor += servicos[i].valor;
		}
		
		return valor;
		
	}
	
	
});