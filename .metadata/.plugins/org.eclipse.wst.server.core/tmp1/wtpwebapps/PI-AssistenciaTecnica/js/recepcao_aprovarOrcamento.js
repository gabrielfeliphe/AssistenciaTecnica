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
					"<td class='exibeInformacoes' onclick='BRIQUETE.orcamento.aprovarOrcamento("+listaDeOrcamentos[i].idorcamento+")'>" + statusOrcamento + "</td>" +
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
		
		if(document.querySelector('#pecas').checked && document.querySelector('#orcamento').checked){
			console.log("Disparou os dois")
			$("#tabelaOrcamentos tr").filter(function() {
				$("tr").show()
			   });
		}else if(document.querySelector('#orcamento').checked){
			  $("#tabelaOrcamentos tr").filter(function() {
			      $(this).toggle($(this).text().indexOf('Contatar Cliente') > -1)
			   });
		}else if (document.querySelector('#pecas').checked){
			$("#tabelaOrcamentos tr").filter(function() {
			      $(this).toggle($(this).text().indexOf('Aguardando técnico') > -1)
			   });
		}else if (!document.querySelector('#orcamento').checked){
			$("#tabelaOrcamentos tr").filter(function() {
			      $(this).show()
			   });
		}else if (!document.querySelector('#pecas').checked){
			$("#tabelaOrcamentos tr").filter(function() {
			      $(this).show()
			   });
		}
	}
	
	BRIQUETE.orcamento.aprovarOrcamento = function(idorcamento){
		
		$.ajax({
			
			type: "GET",
			url: BRIQUETE.PATH + "servicos/buscarOrcamentoId",
			data: "idorcamento="+idorcamento,
			success: function(dados) {
				
				//CARREGAMENTO DOS ITENS NA LABEL VIA DADOS
				
				console.log(dados);
				
				document.getElementById('clienteNameModal').innerHTML  = dados.cliente.nome;
				document.getElementById('equipamento').innerHTML  = dados.equipamentoNome;
				document.getElementById('garantia').innerHTML  = dados.garantia == 1 ? 'Sim' : 'Não'; // ternario
				document.getElementById('equipamento').innerHTML  = dados.equipamentoNome;
				document.getElementById('mod-cod').innerHTML  = dados.equipamentoModeloCodigo;
				document.getElementById('data-entrada').innerHTML  = dados.data;
				document.getElementById('defeito').innerHTML  = dados.defeito;
				document.getElementById('telefone').innerHTML = dados.cliente.telefone;
				
				if(dados.status == 2){ // FAZ O CARREGAMENTO SE A ORDEM DE SERVIÇO JÁ FOI PREENCHIDA
					
					document.getElementById('validadeOrcamento').innerHTML = dados.validade;
					document.getElementById('observacoes').innerHTML = dados.observacao;
					
					$("#tabela-orcamento").html(BRIQUETE.orcamento.exibirOrcamentoModal(dados.servicos));
					
				}else{
				
				}
					
				var modalRealizaOrcamento = { // CRIAÇÃO DA MODAL
						title: "Realizar orcamento",
						height: 650,
						width: 1200,
						modal: true,
						buttons:{
							"Cancelar": function(){
								$(this).dialog("close");
							},
							"Aprovar": function(){
								
								$.ajax({
									type: "PUT",
									url: BRIQUETE.PATH + "servicos/aprovarOrcamento",
									data: , // ???
									success: function(msg) {
										BRIQUETE.exibirAviso(msg);
										BRIQUETE.orcamento.consultaOrcamento();
										$("#modalRealizaOrcamento").dialog('close');
									},
									error: function(info) {
										BRIQUETE.exibirAviso(info.responseText);
									}
								});
							
								
							},
							"Rejeitar":function(){
								
								$.ajax({
									type: "PUT",
									url: BRIQUETE.PATH + "servicos/aprovarOrcamento",
									data:(idorcamento,-1),
									success: function(msg) {
										BRIQUETE.exibirAviso(msg);
										BRIQUETE.orcamento.consultaOrcamento();
										$("#modalRealizaOrcamento").dialog('close');
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
				
				$("#modalRealizaOrcamento").dialog(modalRealizaOrcamento);
				
			},
			error: function(info) {
				console.log("erro : " + info);
				//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
			},

		});
	}
	
	
	BRIQUETE.orcamento.exibirOrcamentoModal = function (dadosOrcamento){
		
		console.log("invocado dados orçamento")
		console.log(dadosOrcamento);
		
		var somaValores =0;
		
		var tabela = "<table class='table table-bordered table-dark'>" +
		"<tr>" +
		"<th>Categoria</th>" +
		"<th>Descrição</th>" +
		"<th>Valor</th>" +
	"</tr>";


		for (var i = 0; i < dadosOrcamento.length; i++) {
			
			somaValores += +dadosOrcamento[i].valor;
			
			let categoria
			switch (dadosOrcamento[i].tipo) {
				case 0:
					categoria = "Servico"
					break;
				case 1:
					categoria = "Peça"
					break;
			}

			tabela += "<tr>" +
				"<td>" + categoria + "</td>" +
				"<td>" + dadosOrcamento[i].peca_servico + "</td>" +
				"<td>" + currency(dadosOrcamento[i].valor) + "</td>" +
				"</tr>"


		}

	tabela += "</table>";
	
	console.log(somaValores)
	
	
	$("#valorTotal").html(currency(somaValores));

	return tabela;
		
	}
	
	const currency = function(number){
	    return new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}).format(number);
	};
	



});