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
	var now = new Date();
	 
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
	
	  $('#diaa').val(today);
}

BRIQUETE.orcamento.data();


BRIQUETE.orcamento.cadastrar = function(){
	let orcamento = new Object();
	orcamento.cliente = new Object(); // utilizar essa estrutura
	
	orcamento.cliente.idcliente = document.frmAberturaOrcamento.listaClientes.value;
	orcamento.equipamentoNome = document.frmAberturaOrcamento.equipamento.value;
	orcamento.equipamentoModeloCodigo = document.frmAberturaOrcamento.modelo_codigo.value;
	orcamento.defeito = document.frmAberturaOrcamento.defeito.value;
	orcamento.data = document.frmAberturaOrcamento.data.value;
	
	
	
	if(orcamento.idcliente==""){
		BRIQUETE.exibirAviso("Selecione um cliente");
	}else if(orcamento.equipamentoNome==""){
		BRIQUETE.exibirAviso("Insira o nome do equipamento")
	}else if(orcamento.equipamentoModeloCodigo==""){
		BRIQUETE.exibirAviso("Insira o modelo ou código do equipamento");
	}else if(orcamento.defeito==""){
		BRIQUETE.exibirAviso("Insira o defeito do equipamento")
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
			BRIQUETE.orcamento.data();
		},
		error: function(info) {
			BRIQUETE.exibirAviso(info.responseText);
		}
	});
  }

}


});