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
						"Realizar": function(){
							
							var values = [];
							$('.add-itens').each(function () { 
							    var valoresDiv = {};
							    $(this).find(':input').each(function() {
							    	valoresDiv[$(this).prop('name')] = $(this).val();
							    });
							    values.push(valoresDiv);
							});
							
							json = new Object();
							json.servicos = new Array(values.length)
											
							for(i = 0; i<values.length;i++){
								json.servicos[i] = new Object();
								json.servicos[i].tipo = values[i].tipo;
								json.servicos[i].peca_servico = values[i].peca_servico;
								json.servicos[i].valor = values[i].valor;
								json.servicos[i].orcamento_idorcamento = idorcamento;
								
							}
							
							json.defeito = document.getElementById('defeito').value;
							json.validade = document.getElementById('diaa').value;
							
							
							$.ajax({
								type: "PUT",
								url: BRIQUETE.PATH + "servicos/realizaOrcamento",
								data: JSON.stringify(json),
								success: function(msg) {
									BRIQUETE.exibirAviso("Orcamento realizado com sucesso!");
								},
								error: function(info) {
									BRIQUETE.exibirAviso(info.responseText);
								}
							});
							
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


$("#btnAdd").click(function(){
	// clona a primeira linha de detalhe
	var novoCampo = $(".add-itens:last").clone();
	//Esvazia o clone
	novoCampo.find("input").val("");
	//Insere o clone na pagina, apos a ultima linha existente
	novoCampo.insertAfter(".add-itens:last");
	
});

BRIQUETE.manutencao.removeCampo = function(botao){
	
	
	if($(".add-itens").length > 1){
		//remove a linha que contem o botao
		//parent pega o elemento e vê quem é o pai
		// uma escadinha inversa nos elementos do DOM
		$(botao).parent().remove();
		
	}else{
		BRIQUETE.exibirAviso("A última linha não pode ser removida");
	}
}
	
});

