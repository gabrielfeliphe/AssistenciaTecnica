BRIQUETE = new Object();

$(document).ready(function(){


	console.log("script GENERAL")
	
	BRIQUETE.PATH = "/PI-AssistenciaTecnica/rest/";
	
	$("header").load("geral/cabecalho.html")
	
	
	BRIQUETE.carregaPagina= function(pagename){
		//Remove o contúdo criado na abertura de uma janela pelo modal JQueryUI
		if($(".ui-dialog"))
			$(".ui-dialog").remove();
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


BRIQUETE.exibirAviso = function(aviso){
		var modal = {
			title: "Mensagem",
			height: 250,
			width: 400,
			modal: true,
			buttons: {
				"OK": function(){
					$(this).dialog("close");
				}
			}
		};
		$("#modalAviso").html(aviso);
		$("#modalAviso").dialog(modal);
};

});
