package br.com.tecnicabriquete.rest;

import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import java.sql.Connection;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import com.google.gson.Gson;
import java.util.List;

import br.com.tecnicabriquete.bd.Conexao;
import br.com.tecnicabriquete.jdbc.JDBCClienteDAO;
import br.com.tecnicabriquete.jdbc.JDBCServicosDAO;
import br.com.tecnicabriquete.modelo.Cliente;
import br.com.tecnicabriquete.modelo.Orcamento;


@Path("servicos")
public class ServicosRest extends UtilRest{
	
	@POST
	@Path("/cadastrarOrcamento")
	@Consumes("application/*")
	public Response inserirOrcamento(String novoOrcamento) {
		
		try {
			
			System.out.println(novoOrcamento);

			Orcamento orcamento = new Gson().fromJson(novoOrcamento, Orcamento.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCServicosDAO jdbcOrcamento = new JDBCServicosDAO(conexao);
			String msg = "";
	
			
			boolean retorno = jdbcOrcamento.inserir(orcamento);
			if (retorno == true) {
				msg = "Orçamento criado com sucesso!";
			} else {
				msg = "Erro ao criar Orçamento";
			}
			conec.fecharConexao();

			return this.buildResponse(msg);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
		
	}

}
