package br.com.tecnicabriquete.rest;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.google.gson.Gson;

public class UtilRest {
	
public Response buildResponse(Object result) {
		
		try {
			/*
			 * Retorna o objeto de resposta com status 200 (ok), tendo
			 * em seu corpo o objeto valorResposta (Que consiste no 
			 * objeto result convertido para JSON)
			 */
			String valorResposta  = new Gson().toJson(result);
			return Response.ok(valorResposta).build();
		}catch(Exception ex){
			ex.printStackTrace();
			//Se algo der errado acima, cria response de erro
			return this.buildErrorResponse(ex.getMessage());
			}
	}
	/*
	 * Abaixo o método responsável por enviar a resposta ao cliente sobre
	 * A transação realizada, inclusao, consulta, edição ou exclusão. ao
	 * cliente, não realizadas com sucesso, ou seja, que contenha algum erro.
	 * Repare que o método em questão aguarda que seja repassado um
	 * conteúdo que será referenciado pelo por um objeto chamado rb.
	 */
	public Response buildErrorResponse(String str) {
		/*
		 * Abaixo o objeto rb recebe o status do erro
		 */
		 ResponseBuilder rb = Response.status(Response.Status.INTERNAL_SERVER_ERROR);
		 
		 /*
		  * Define a entidade(objeto), que nesse caso é uma
		  * mensagem que será retornado para o cliente.
		  */
		 
		 rb = rb.entity(str);
		 
		 rb = rb.type("text/plain");
		 
		 /*
		  * Retorna o objeto de resposta com status 500(erro)
		  * junto com a String contendo a mensagem de erro.
		  */
		 
		 return rb.build();
	}

}
