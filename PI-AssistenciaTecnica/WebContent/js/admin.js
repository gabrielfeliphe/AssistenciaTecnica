BRIQUETE = new Object();

BRIQUETE.funcionario = new Object();

console.log("script entrou !!")


$(document).ready(function(){
	
	BRIQUETE.PATH = "/PI-AssistenciaTecnica/rest/";
	
	$("header").load("/PI-AssistenciaTecnica/pages/adm/geral/cabecalho.html")
	
	
	BRIQUETE.carregaPagina= function(pagename){
		//Remove o contúdo criado na abertura de uma janela pelo modal JQueryUI
		//if($(".ui-dialog"))
		//	$(".ui-dialog").remove();
		//limpa a tag section, excluindo todo o conteúdo de dentro dela
		$("section").empty();
		//carrega a página solicitada dentro da tag section
		$("section").load(pagename+"/",function(response,status,info){
			if(status=="error"){
				var msg = "Houve um erro ao encontrar a página: "+ info.status + " - " + info.statusText;
				$("section").html(msg);
				}
			});
	}
	
	BRIQUETE.funcionario.cadastrar = function(){
		
		let novoFuncionario = new Object();
		
		novoFuncionario.matricula = document.frmAddFuncionario.matricula.value;
		novoFuncionario.email = document.frmAddFuncionario.email.value;
		novoFuncionario.funcao = document.frmAddFuncionario.funcao.value;
		novoFuncionario.senha = document.frmAddFuncionario.senha.value;
		
		$.ajax({
			type: "POST",
			url: "/PI-AssistenciaTecnica/rest/funcionario/cadastrar",
			data: JSON.stringify(novoFuncionario),
			success: function(msg){
				console.log("adicionado novoFuncionario: "+novoFuncionario);
			},
			error: function(info){
				console.log("error= "+info.status+" --- "+info.statusText);
			}
		});
		
	}
	
	BRIQUETE.funcionario.buscarFuncionarios = function(){ // PRIMEIRO PARTO FEITO, ESTOU RECEBENDO AS MARCAS DA BACKEND
		
		$.ajax({
			
			type: "GET",
			url: BRIQUETE.PATH + "funcionario/buscar",
			success: function(dados){
				console.log(dados);
				$("#lista-funcionarios").html(BRIQUETE.funcionario.exibirFuncionarios(dados));
			},
			error: function(info){
				console.log("erro : "+info);
				//BRIQUETE.exibirAviso("Erro ao consultar os contatos: "+ info.status+" - " + info.statusText+ " - " + info.responseText);
			},
				
		});	
	};
	
	BRIQUETE.funcionario.buscarFuncionarios(); // Fazer a instancia para a página sempre carregar a marca
	
	
	BRIQUETE.funcionario.exibirFuncionarios = function(listaDeFuncionarios){
		
		var tabela = "<table>"+
		"<tr>"+
		"<th>Matricula</th>"+
		"<th>Função</th>"+
		"<th>E-mail</th>"
		"</tr>";
		
		if(listaDeFuncionarios != undefined && listaDeFuncionarios.length > 0){
			
			
			for(var i=0; i<listaDeFuncionarios.length; i++){	
				
				tabela += "<tr>"+
					"<td>"+listaDeFuncionarios[i].matricula+"</td>" +
					"<td>"+listaDeFuncionarios[i].funcao+"</td>" +
					"<td>"+listaDeFuncionarios[i].email+"</td>" +
					"</tr>"
	                
					
			}
			
		}else if(listaDeFuncionarios ==""){
			tabela +="<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
		}
		tabela += "</table>";
		
		return tabela;
		
	};
	
	
	
});


