BRIQUETE.admin = new Object();

console.log("entrou script consulta os")

$(document).ready(function(){
	
	BRIQUETE.admin.consultaOS = function(){
		
		$.ajax({
			type: "GET",
			url: BRIQUETE.PATH + "servicos/buscarOrcamentosRelatorio",
			success: function(dados) {
				console.log(dados);
				$("#lista-completa").html(BRIQUETE.admin.exibirOS(dados));
				$("#lista-soma").html(BRIQUETE.admin.totalGeral(dados));
			},
			error: function(info) {
				console.log("erro : " + info);
				//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
			},

		});
	}
	
	BRIQUETE.admin.consultaOS();
	
	BRIQUETE.admin.exibirOS = function(listaDeOS){
		
		console.log(listaDeOS)
		
		var tabela = "<table class='table table-bordered table-dark' id='tabelaExibeClientesOS'>" +
		"<thead>"+
		"<tr>" +
		"<th>Tipo</th>" +
		"<th>Cliente</th>" +
		"<th>Equipamento</th>" +
		"<th>Valor</th>" +
		"<th>Data</th>" +
		"</tr>"+
		"</thead>"+
		"<tbody id='tabelaOrcamentos'>";

	if (listaDeOS != undefined && listaDeOS.length > 0) {
		
		console.log(listaDeOS)

		for (var i = 0; i < listaDeOS.length; i++) {
			let tipo
			
			if (listaDeOS[i].status < 4 && listaDeOS[i].status >=0){
				tipo = "Orçamento"
			}else{
				tipo = "Ordem de serviço"
			}
			tabela += "<td class='exibeInformacoes' onclick='BRIQUETE.admin.exibirRelatorio("+listaDeOS[i].idorcamento+")'>"  
				 + tipo + "</td>" +
				"<td>" + listaDeOS[i].cliente.nome+ "</td>" +
				"<td>" + listaDeOS[i].equipamentoNome + "</td>" +
				"<td>" + currency(listaDeOS[i].valorTotal)+ "</td>" +
				"<td id='dataRelatorio'>" + listaDeOS[i].data + "</td>" +
				"</tr>"

		}

	} else if (listaDeOS == "") {
		tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
	}
	tabela += "</tbody></table>";

	return tabela;

	}
	
	
	const currency = function(number){
	    return new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}).format(number);
	};
	
	BRIQUETE.admin.totalGeral = function(dados){
		var total=0;
		var quantidade = dados.length;
		for (var i=0;i<dados.length;i++){
			total += dados[i].valorTotal
		}
		
		var tabela = "<table class='table table-bordered table-dark'>" +
		"<thead>"+
		"<tr>" +
		"<th>Quantidade</th>" +
		"<th>Valor:</th>" +
		"</tr>"+
		"</thead>"+
		"<tbody id='tabelaOrcamentos'>";

		console.log(total)
		
		tabela += "<tr id='tabelaExibeOrcamentos'>" +
				"<td>" + quantidade  + "</td>" +
				"<td>" + currency(total)+ "</td>" +
				"</tr>"
		tabela += "</tbody></table>";

	return tabela;
		
		
	}

	BRIQUETE.admin.exibirRelatorio = function(idorcamento){
		
		$.ajax({
			
			type: "GET",
			url: BRIQUETE.PATH + "servicos/buscaRelatorioDetalhado",
			data: "idorcamento="+idorcamento,
			success: function(dados) {
				console.log("relatorio detalhado")
				console.log(dados)
				
				$("#tabela-relatorio").html(BRIQUETE.admin.exibirRelatorioModal(dados));
					
				
				var modalRelatorio= { // CRIAÇÃO DA MODAL
						title: "Relatório",
						height:350,
						width:1200,
						modal: true,
						buttons:{
							"fechar": function(){
								$(this).dialog("close");
								//BRIQUETE.orcamento.limparFrm();	
							},			
						},
				};
				
				$("#modalRelatorio").dialog(modalRelatorio);
				
			},
			error: function(info) {
				console.log("erro : " + info);
				//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
			},

		});
	}
	
BRIQUETE.admin.exibirRelatorioModal = function (dadosOrcamento){
		
		console.log(dadosOrcamento)
		
		var pecas ="";
		var servicos="";
		var status="";
		var tipo="";

		var tabela = "<table class='table table-bordered table-dark' >" +
		"<tr>" +
		"<th>Cliente</th>" +
		"<th>Equipamento</th>" +
		"<th>Data de entrada</th>" +
		"<th>Peças</th>" +
		"<th>Serviços</th>" +
		"<th>Tipo</th>" +
		"<th>Status</th>" +
	"</tr>";
		
		
		for(var i=0;i<dadosOrcamento.servicos.length;i++){
			if(dadosOrcamento.servicos[i].tipo == 1){
				pecas = pecas+dadosOrcamento.servicos[i].peca_servico+",";
			}else{
				servicos = servicos+dadosOrcamento.servicos[i].peca_servico+",";
			}
		}
		
		if (dadosOrcamento.status < 4 && dadosOrcamento.status >=0){
			tipo = "Orçamento"
		}else{
			tipo = "Ordem de serviço"
		}
		
		if(dadosOrcamento.status < 6 && dadosOrcamento.status >= 0 ){
			status = "em andamento"
		}else if (dadosOrcamento.status < 0){
			status = "Abandonado"
		}else{
			status = "Finalizado"
		}
		
		// Retira a ultima virgula da string
		pecas = pecas.substring(0, pecas.length - 1);
		servicos = servicos.substring(0, servicos.length - 1)

			tabela += "<tr>" +
				"<td>" + dadosOrcamento.cliente.nome + "</td>" +
				"<td>" + dadosOrcamento.equipamentoNome +"</td>" +
				"<td>" + dadosOrcamento.data + "</td>" +
				"<td>" + pecas + "</td>" +
				"<td>" + servicos + "</td>" +
				"<td>" + tipo + "</td>" +
				"<td>" + status + "</td>" +
				"</tr>"


	tabela += "</table>";

	return tabela;	
		
}

BRIQUETE.admin.filtroOrcamentos = function(){
	
	if(document.querySelector('#orcamento').checked && document.querySelector('#ordemservico').checked){
		console.log("Disparou os dois")
		$("#tabelaExibeClientesOS tr").filter(function() {
			$("tr").show()
		   });
	}else if(document.querySelector('#orcamento').checked){
		  $("#tabelaExibeClientesOS tr").filter(function() {
		      $(this).toggle($(this).text().indexOf('Orçamento') > -1)
		   });
	}else if (document.querySelector('#ordemservico').checked){
		$("#tabelaExibeClientesOS tr").filter(function() {
		      $(this).toggle($(this).text().indexOf('Ordem de serviço') > -1)
		   });
	}else if (!document.querySelector('#orcamento').checked){
		$("#tabelaExibeClientesOS tr").filter(function() {
		      $(this).show()
		   });
	}else if (!document.querySelector('#ordemservico').checked){
		$("#tabelaExibeClientesOS tr").filter(function() {
		      $(this).show()
		   });
	}
}

	$("#procurar").on("keyup", function() {
	    var value = $(this).val().toLowerCase();
	    $("#tabelaExibeClientesOS tr").filter(function() {
	      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	    });
	  });	
		

	function reset(){
		console.log("resetado")
			table = document.getElementById("tabelaExibeClientesOS");
			tr = table.getElementsByTagName("tr");
			for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[4];
			tr[i].style.display = "";
			}
	}
	
	BRIQUETE.admin.filtrarData = function(){
		
		console.log("disparo")
		
		
		if($('#diaa').val() !="" && $('#diab').val() != ""){
		//reset()
		var datea = new Date($('#diaa').val());
		var dateb = new Date($('#diab').val());
		var day1 = datea.getUTCDate();
		var month1 = datea.getUTCMonth()+1;
		var year1 = datea.getFullYear();
		var day2 = dateb.getUTCDate();
		var month2 = dateb.getUTCMonth() + 1;
		var year2 = dateb.getFullYear();
		date1 = [year1, month1, day1].join('-');
		date2 = [year2, month2, day2].join('-');  
		
		console.log("Data 1:"+date1);
		console.log("Data 2:"+date2)
;
		
		var input, filter, table, tr, td, i, txtValue;
		input = Date.parse(date1);
		input2 = Date.parse(date2);
		table = document.getElementById("tabelaExibeClientesOS");
		tr = table.getElementsByTagName("tr");
	  
		for (i = 0; i < tr.length; i++) {
		  td = tr[i].getElementsByTagName("td")[4];
		  if (td) {
			txtValue = Date.parse(td.textContent);
			if (input <= txtValue) {
				if(input2 >= txtValue){
					tr[i].style.display = "";
				}else{
					tr[i].style.display = "none";
				}
			} else {
			  tr[i].style.display = "none";
			}
		  }
		}
	  }
}

	
});