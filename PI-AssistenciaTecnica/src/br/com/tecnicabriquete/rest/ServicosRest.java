package br.com.tecnicabriquete.rest;

import javax.ws.rs.Path;

import java.sql.Date;
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
import com.google.gson.GsonBuilder;

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
			Gson gson=  new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			
			Orcamento orcamento = gson.fromJson(novoOrcamento, Orcamento.class);
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
	
	@GET
	@Path("/buscarOrcamentos")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscar() {

		try {
			List<Orcamento> listaOrcamentos = new ArrayList<Orcamento>();

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCServicosDAO jdbcServicos = new JDBCServicosDAO(conexao);
			listaOrcamentos = jdbcServicos.buscar();
			conec.fecharConexao();
			return this.buildResponse(listaOrcamentos);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

}
