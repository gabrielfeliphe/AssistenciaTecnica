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
	
	var triggerStatus = 0;
	
	if (listaDeOrcamentos != undefined && listaDeOrcamentos.length > 0) {
		
		console.log(listaDeOrcamentos)

		for (var i = 0; i < listaDeOrcamentos.length; i++) {
			
			
			if(listaDeOrcamentos[i].status <= 2  && listaDeOrcamentos[i].status >=1){
				
			triggerStatus = 1;
			let statusOrcamento = "Aguardando técnico"	

			tabela += "<tr id='tabelaExibeOrcamentos'>" +
				"<td class='exibeInformacoes' onclick='BRIQUETE.manutencao.realizarOrcamento("+listaDeOrcamentos[i].idorcamento+")'>" + statusOrcamento + "</td>" +
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
			
			//CARREGAMENTO DOS ITENS NA LABEL VIA DADOS
			
			
			document.getElementById('clienteNameModal').innerHTML  = dados.cliente.nome;
			document.getElementById('equipamento').innerHTML  = dados.equipamentoNome;
			document.getElementById('equipamento').innerHTML  = dados.equipamentoNome;
			document.getElementById('mod-cod').innerHTML  = dados.equipamentoModeloCodigo;
			document.getElementById('data-entrada').innerHTML  = formatDate(dados.data);
			document.getElementById('defeito').innerHTML  = dados.defeito;
			
			if(dados.status == 2){ // FAZ O CARREGAMENTO SE A ORDEM DE SERVIÇO JÁ FOI PREENCHIDA
				
				document.getElementById("tituloOrcamento").innerHTML = "Editar Orçamento";
				document.getElementById('diaa').value = dados.validade;
				document.getElementById('observacao').value = dados.observacao;
				
				var campoAntigo= $(".add-itens:last");
				campoAntigo.find("[name='tipo']").val(dados.servicos[0].tipo);
				campoAntigo.find("[name='valor']").val(String(dados.servicos[0].valor).replace(".",","));
				campoAntigo.find("[name='peca_servico']").val(dados.servicos[0].peca_servico);
				campoAntigo.find("[name='idServico']").val(dados.servicos[0].idservico);

			   for(var x=1;x<dados.servicos.length;x++){ //adiciona os itens e gera os campos dinamicos
					var novoCampo = $(".add-itens:last").clone();
					novoCampo.find("[name='valor']").val(String(dados.servicos[x].valor).replace(".",","));
					novoCampo.find("[name='tipo']").val(dados.servicos[x].tipo);
					novoCampo.find("[name='peca_servico']").val(dados.servicos[x].peca_servico);
					novoCampo.find("[name='idServico']").val(dados.servicos[x].idservico);
					novoCampo.insertAfter(".add-itens:last");
			   }
			   
			}else{
				document.getElementById("tituloOrcamento").innerHTML = "Realizar Orçamento";
			}
				
			var modalRealizaOrcamento = { // CRIAÇÃO DA MODAL
					title: "Realizar orcamento",
					height: 650,
					width: 1200,
					modal: true,
					buttons:{
						"Cancelar": function(){
							$(this).dialog("close");
							BRIQUETE.manutencao.limparFrm()
						},
						"Salvar": function(){
							
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
								json.servicos[i].valor = BRIQUETE.manutencao.formatarDinheiro(values[i].valor);
								json.servicos[i].orcamento_idorcamento = idorcamento;
								if(dados.status == 2){
								json.servicos[i].idservico = values[i].idServico;
								}
							}
										
							json.defeito = document.getElementById('defeito').value;
							json.validade = document.getElementById('diaa').value;
							json.observacao = document.getElementById('observacao').value;
							json.idorcamento = idorcamento;
							
							
							if($("#diaa").val() ==""){
								BRIQUETE.exibirAviso("A data não foi preenchida!")
							}else if($("#observacao").val()==""){
								BRIQUETE.exibirAviso("A observação não foi preenchida");
							}else if(BRIQUETE.manutencao.validaMultiCampos() == true){
								BRIQUETE.exibirAviso("Os campos de serviços ou peças não foram preenchidos corretamente");
							}
							else{
							
							$.ajax({
								type: "PUT",
								url: BRIQUETE.PATH + "servicos/realizaOrcamento",
								data: JSON.stringify(json),
								success: function(msg) {
									BRIQUETE.exibirAviso(msg);
									BRIQUETE.manutencao.consultaOrcamento();
									$("#modalRealizaOrcamento").dialog('close');
									BRIQUETE.manutencao.limparFrm();
								},
								error: function(info) {
									BRIQUETE.exibirAviso(info.responseText);
								}
							});
						}
							
						}
					},
					close: function(){
						BRIQUETE.manutencao.limparFrm();
						$(this).dialog('close');
					}
			};
			
			$("#modalRealizaOrcamento").dialog(modalRealizaOrcamento);
			BRIQUETE.manutencao.calculaValor();
			
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
		BRIQUETE.manutencao.calculaValor();
		
	}else{
		BRIQUETE.exibirAviso("A última linha não pode ser removida");
	}
}


BRIQUETE.manutencao.limparFrm = function(){	

		$(".add-itens").find("input").val("");
		$("#observacao").val("");
		$("#diaa").val("");
		
		while($(".add-itens").length > 1){
		$(".add-itens").last().remove();
	}
}

BRIQUETE.manutencao.calculaValor = function(){
	
	var valorTotal=0;
	$('.add-itens').each(function () {// CRIAMOS UM ARRAY COM OS VALORES
	    $(this).find("[name='valor']").each(function() {
	    	var a = $(this).val().replace(",",".");
	    	valorTotal += +a;
	    });
	});
	
	const currency = function(number){
	    return new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}).format(number);
	};
	
	
	$("#totalValores").html(currency(valorTotal));
}


BRIQUETE.manutencao.validaMultiCampos = function(){
	
	var retorno = false;
	
	$('.add-itens').each(function () {// CRIAMOS UM ARRAY COM OS VALORES
		
		console.log($(this).find("[name='tipo']").val());
		
	    if($(this).find("[name='tipo']").val()== ""){
	    	console.log("entrou 1")
	    	retorno = true;
	    }else if($(this).find("[name='peca_servico']").val() == ""){
	    	console.log("entrou 2")
	    	retorno = true;
	    }else if($(this).find("[name='valor']").val() == ""){
	    	console.log("entrou 3")
	    	retorno = true;
	    }
	});
	
	return retorno;
}

function formatDate (input) {
	  var datePart = input.match(/\d+/g),
	  year = datePart[0].substring(0,4),
	  month = datePart[1], day = datePart[2];

	  return day+'/'+month+'/'+year;
	}
	
});

BRIQUETE.manutencao.formatarDinheiro = function (valor){
	return valor.replace(',','.')
}