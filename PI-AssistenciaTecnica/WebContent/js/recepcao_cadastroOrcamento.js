BRIQUETE.orcamento = new Object();

console.log("script orcamento carregado")

$(document).ready(function() {

BRIQUETE.orcamento.procurarClientes = function(){
	
	console.log("entrou procurar clientes")
	
	$.ajax({
		
		type: "GET",
		url: BRIQUETE.PATH + "cliente/buscar",
		success: function(dados) {
			BRIQUETE.orcamento.exibirClientes(dados)
		},
		error: function(info) {
			console.log("erro : " + info);
			//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
		},

	});
	
}

BRIQUETE.orcamento.procurarClientes();

BRIQUETE.orcamento.exibirClientes = function(clientes){
	
	select = "#listaClientes";
	
	
	if(document.frmAberturaOrcamento.listaClientes.length == 0){
	
	
	var option = document.createElement("option");
	option.value = "";
	option.innerHTML = ("Escolha");
	$(select).append(option);
	
	for(var i = 0 ; i < clientes.length; i++){
		var option = document.createElement("option");
		option.value = clientes[i].idcliente;
		//option.setAttribute("idcliente",clientes[i].idcliente);
		
		option.innerHTML = (clientes[i].nome);
		$(select).append(option);
		

	}
	}
}

BRIQUETE.orcamento.data = function(){
	var data = new Date();
	var dia = String(data.getDate()).padStart(2, '0');
	var mes = String(data.getMonth() + 1).padStart(2, '0');
	var ano = data.getFullYear();
	
	dataAtual = ano + '/' + mes + '/' +  dia;
	
	document.frmAberturaOrcamento.diaa.value = dataAtual;
}

BRIQUETE.orcamento.data();

BRIQUETE.orcamento.cadastrar = function(){
	let orcamento = new Object();
	orcamento.cliente = new Object(); // utilizar essa estrutura
	
	orcamento.cliente.idcliente = document.frmAberturaOrcamento.listaClientes.value;
	orcamento.equipamentoNome = document.frmAberturaOrcamento.equipamento.value;
	orcamento.equipamentoModeloCodigo = document.frmAberturaOrcamento.modelo_codigo.value;
	orcamento.defeito = document.frmAberturaOrcamento.defeito.value;
	orcamento.garantia = document.frmAberturaOrcamento.garantia.value;
	orcamento.data = document.frmAberturaOrcamento.data.value;
	
	
	
	if(orcamento.idcliente==""){
		BRIQUETE.exibirAviso("Selecione um cliente");
	}else if(orcamento.equipamentoNome==""){
		BRIQUETE.exibirAviso("Insira o nome do equipamento")
	}else if(orcamento.equipamentoModeloCodigo==""){
		BRIQUETE.exibirAviso("Insira o modelo ou código do equipamento");
	}else if(orcamento.defeito==""){
		BRIQUETE.exibirAviso("Insira o defeito do equipamento")
	}else if(orcamento.garantia==""){
		BRIQUETE.exibirAviso("Selecione a vigencia da garantia")
	}else if(orcamento.data==""){
		BRIQUETE.exibirAviso("Selecione a data de entrada do equipamento")
	}else{
	
	$.ajax({
		type: "POST",
		url: BRIQUETE.PATH + "servicos/cadastrarOrcamento",
		data: JSON.stringify(orcamento),
		success: function(msg) {
			BRIQUETE.exibirAviso(msg);
			document.getElementById("frm-AberturaOrcamento").reset();
		},
		error: function(info) {
			BRIQUETE.exibirAviso(info.responseText);
		}
	});
  }

}


});