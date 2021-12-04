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
				
				
				if(dados.status == 2){ // FAZ O CARREGAMENTO SE A ORDEM DE SERVIÇO JÁ FOI PREENCHIDA
					
					document.getElementById('validadeOrcamento').innerHTML = dados.validade;
					document.getElementById('observacoes').innerHTML = dados.observacao;
					document.getElementById('telefone').innerHTML = dados.cliente.telefone;
					
					var campoAntigo= $(".add-itens:last");
					campoAntigo.find("[name='tipo']").val(dados.servicos[0].tipo);
					campoAntigo.find("[name='valor']").val(dados.servicos[0].valor);
					campoAntigo.find("[name='peca_servico']").val(dados.servicos[0].peca_servico);
					campoAntigo.find("[name='idServico']").val(dados.servicos[0].idservico);

				   for(var x=1;x<dados.servicos.length;x++){ //adiciona os itens e gera os campos dinamicos
						var novoCampo = $(".add-itens:last").clone();
						novoCampo.find("[name='valor']").val(dados.servicos[x].valor);
						novoCampo.find("[name='tipo']").val(dados.servicos[x].tipo);
						novoCampo.find("[name='peca_servico']").val(dados.servicos[x].peca_servico);
						novoCampo.find("[name='idServico']").val(dados.servicos[x].idservico);
						novoCampo.insertAfter(".add-itens:last");
				   }
				   
				  // BRIQUETE.orcamento.calculaValor();
					
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
								
								var values = [];
								$('.add-itens').each(function () {// CRIAMOS UM ARRAY COM OS VALORES
								    var valoresDiv = {};
								    $(this).find(':input').each(function() {
								    	valoresDiv[$(this).prop('name')] = $(this).val();
								    });
								    values.push(valoresDiv);
								});
								
								
								json = new Object();
								json.servicos = new Array(values.length)
												
								for(i = 0; i<values.length;i++){ //INSERE EM OBJ PARA PASSAR PRA JSON DPS
									json.servicos[i] = new Object();
									json.servicos[i].tipo = values[i].tipo;
									json.servicos[i].peca_servico = values[i].peca_servico;
									json.servicos[i].valor = values[i].valor;
									json.servicos[i].orcamento_idorcamento = idorcamento;
									if(dados.status == 2){
									json.servicos[i].idservico = values[i].idServico;
									}
								}
											
								json.defeito = document.getElementById('defeito').value;
								json.validade = document.getElementById('diaa').value;
								json.observacao = document.getElementById('observacao').value;
								json.idorcamento = idorcamento;
								
								console.log(BRIQUETE.orcamento.validaMultiCampos());
								
								if($("#diaa").val() ==""){
									BRIQUETE.exibirAviso("A data não foi preenchida!")
								}else if($("#observacao").val()==""){
									BRIQUETE.exibirAviso("A observação não foi preenchida");
								}else if(BRIQUETE.orcamento.validaMultiCampos() == true){
									BRIQUETE.exibirAviso("Os campos de serviços ou peças não foram preenchidos corretamente");
								}
								else{
								
								$.ajax({
									type: "PUT",
									url: BRIQUETE.PATH + "servicos/realizaOrcamento",
									data: JSON.stringify(json),
									success: function(msg) {
										BRIQUETE.exibirAviso(msg);
										BRIQUETE.orcamento.consultaOrcamento();
										$("#modalRealizaOrcamento").dialog('close');
										//BRIQUETE.orcamento.limparFrm();
									},
									error: function(info) {
										BRIQUETE.exibirAviso(info.responseText);
									}
								});
							}
								
							},
							"Rejeitar":function(){
								
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


});