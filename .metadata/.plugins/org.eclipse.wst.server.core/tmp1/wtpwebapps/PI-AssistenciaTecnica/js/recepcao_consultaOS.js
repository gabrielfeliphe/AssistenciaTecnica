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
				case 6:
					statusOrcamento = "Finalizado"
					break;
				case -5:
					statusOrcamento = "Abandonado"
					break;
			}
			
			if(listaDeOS[i].status >= 4){

			tabela += "<tr id='tabelaExibeOrcamentos'>" +
				"<td class='exibeInformacoes' onclick='BRIQUETE.recepcao.tratarOS("+listaDeOS[i].idorcamento+")'>" + statusOrcamento + "</td>" +
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
	
	

	BRIQUETE.recepcao.tratarOS = function(idorcamento){
		
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
				document.getElementById('tabelaValor').hidden = false;
				document.getElementById('valorTotal').innerHTML = BRIQUETE.recepcao.calcularServicos(dados.servicos)
				
				$("#tabela-orcamento").html(BRIQUETE.recepcao.exibirOrcamentoModal(dados.servicos));
					
				
				var modalRealizaOrcamento = { // CRIAÇÃO DA MODAL
						title: "Orçamento",
						height:650,
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
									url: BRIQUETE.PATH + "servicos/aprovarOrcamento/"+idorcamento+"/"+"6",
									success: function(msg) {
										BRIQUETE.exibirAviso(msg);
										BRIQUETE.recepcao.consultaOS();
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
									url: BRIQUETE.PATH + "servicos/aprovarOrcamento/"+idorcamento+"/"+"-5",
									success: function(msg) {
										BRIQUETE.exibirAviso(msg);
										BRIQUETE.recepcao.consultaOS();
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
				
				if(BRIQUETE.recepcao.checkAbandonaProduto(dados.data) > 91){
					BRIQUETE.exibirAviso("O equipamento está abandonado pois excede 90 dias em estoque");
				}
				
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
	
	BRIQUETE.recepcao.calcularServicos = function(servicos){
		
		var valor=0;
		for(let i=0; i<servicos.length; i++){
			valor += servicos[i].valor;
		}
		
		return valor;
		
	}
	
BRIQUETE.recepcao.exibirOrcamentoModal = function (dadosOrcamento){
		
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
	
	
BRIQUETE.recepcao.checkAbandonaProduto = function (dataEntrada){
	
	dataEntrada = dataEntrada.replace("-","/");
	
	
	var dataTeste = new Date().toLocaleDateString();
	
	dataTeste = dataTeste.split("/").reverse();
	
	const date1 = new Date(dataEntrada);
    const date2 = new Date(dataTeste);
    

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
    
	
	return diffInDays;
}

	
	
});