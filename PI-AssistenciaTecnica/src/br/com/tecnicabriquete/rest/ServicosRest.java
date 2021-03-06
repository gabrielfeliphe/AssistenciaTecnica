package br.com.tecnicabriquete.rest;

import javax.ws.rs.Path;

import java.sql.Date;
import java.text.SimpleDateFormat;

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
import com.google.gson.JsonObject;

import java.util.List;

import br.com.tecnicabriquete.bd.Conexao;
import br.com.tecnicabriquete.jdbc.JDBCClienteDAO;
import br.com.tecnicabriquete.jdbc.JDBCFuncionarioDAO;
import br.com.tecnicabriquete.jdbc.JDBCServicosDAO;
import br.com.tecnicabriquete.modelo.Cliente;
import br.com.tecnicabriquete.modelo.Funcionario;
import br.com.tecnicabriquete.modelo.Orcamento;
import br.com.tecnicabriquete.modelo.Servicos;


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
	
	@GET
	@Path("/buscarOrcamentoId")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarPorId(@QueryParam("idorcamento") int idorcamento) {

		try {
			Orcamento orcamento = new Orcamento();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCServicosDAO jdbcServicos= new JDBCServicosDAO(conexao);

			orcamento = jdbcServicos.buscarOrcamentoId(idorcamento);

			conec.fecharConexao();
					
			return this.buildResponse(orcamento);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}

	}
	
	@GET
	@Path("/buscarOrcamentosRelatorio")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarOrcamentosRelatorio() {

		try {
			List<Orcamento> listaOrcamentos = new ArrayList<Orcamento>();

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCServicosDAO jdbcServicos = new JDBCServicosDAO(conexao);
			listaOrcamentos = jdbcServicos.buscarOrcamentosRelatorio();
			conec.fecharConexao();
			return this.buildResponse(listaOrcamentos);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/buscaRelatorioDetalhado")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscaRelatorioDetalhado(@QueryParam("idorcamento") int idorcamento) {

		try {
			Orcamento orcamento = new Orcamento();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCServicosDAO jdbcServicos= new JDBCServicosDAO(conexao);

			orcamento = jdbcServicos.buscaRelatorioDetalhado(idorcamento);

			conec.fecharConexao();
					
			return this.buildResponse(orcamento);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}

	}
	
	@PUT
	@Path("/realizaOrcamento")
	@Consumes("application/*")
	public Response alterarOrcamento(String orcamentoParam) {
		System.out.println("realiza orcamento: ");	
		System.out.println(orcamentoParam);
		
		try {
			
			Gson gson =  new GsonBuilder().setDateFormat("yyyy/MM/dd").create();
			Orcamento orcamento = gson.fromJson(orcamentoParam,Orcamento.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCServicosDAO jdbcServicos = new JDBCServicosDAO(conexao);

			boolean retorno = jdbcServicos.realizaOrcamento(orcamento);
			
			for(Servicos servicos: orcamento.getServicos()) {
				JDBCServicosDAO jdbcServico = new JDBCServicosDAO(conexao);
				jdbcServico.inserirServicos(servicos);
				}

			String msg = "";
			
			if (retorno == true) {
				msg = "Orçamento realizado com sucesso!";
			} else {
				msg = "Erro ao realizar Orçamento";
			}


			conec.fecharConexao();
			return this.buildResponse(msg);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@PUT
	@Path("/editarOrcamento")
	@Consumes("application/*")
	public Response alterarOrcamentoItens(String orcamentoParam) {
		
		
		try {
			
			Gson gson =  new GsonBuilder().setDateFormat("yyyy/MM/dd").create();
			Orcamento orcamento = gson.fromJson(orcamentoParam,Orcamento.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCServicosDAO jdbcServicos = new JDBCServicosDAO(conexao);
			
			boolean retorno = jdbcServicos.realizaOrcamento(orcamento);
			
			for(Servicos servicos: orcamento.getServicos()) {
				JDBCServicosDAO jdbcServico = new JDBCServicosDAO(conexao);
				jdbcServico.alterarServicos(servicos);
				}

			String msg = "";
			
			if (retorno == true) {
				msg = "Orçamento editado com sucesso!";
			} else {
				msg = "Erro ao editar Orçamento";
			}


			conec.fecharConexao();
			return this.buildResponse(msg);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	
	@DELETE
	@Path("/excluir/{idservico}")
	@Consumes("application/*")

	public Response excluir(@PathParam("idservico") int idservico) {
		
		try {

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCServicosDAO jdbcServico = new JDBCServicosDAO(conexao);

					boolean retorno = jdbcServico.deletarServicos(idservico);

					String msg = "";
					if (retorno) {
						msg = "Serviço excluido com sucesso!";
						conec.fecharConexao();

						return this.buildResponse(msg);
					} else {
						msg = "Erro ao excluir o Serviço!";
						conec.fecharConexao();

						return this.buildErrorResponse(msg);
					}
					


		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	
	@GET
	@Path("/buscarServicosOrcamento")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarServicosOrcamento(@QueryParam("idorcamento") int idorcamento) {

		try {
			Orcamento orcamento = new Orcamento();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCServicosDAO jdbcServicos= new JDBCServicosDAO(conexao);
			
			
			
			jdbcServicos.buscarServicos(idorcamento);

			conec.fecharConexao();

			return this.buildResponse(orcamento);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}

	}
	
	
	@PUT
	@Path("/aprovarOrcamento/{idOrcamento}/{operacao}")
	@Consumes("application/*")
	public Response aprovarOrcamento(@PathParam("idOrcamento")int idOrcamento,@PathParam("operacao") int operacao) {
		
		try {
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCServicosDAO jdbcServicos = new JDBCServicosDAO(conexao);
			
			boolean retorno = jdbcServicos.aprovarOrcamento(idOrcamento, operacao);
			

			String msg = "";
			
			if (retorno == true) {
				msg = "Status alterado com sucesso!";
			} else {
				msg = "Erro ao alterar Orçamento";
			}


			conec.fecharConexao();
			return this.buildResponse(msg);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@PUT
	@Path("/reiniciarOrcamento/{idOrcamento}")
	@Consumes("application/*")
	public Response reiniciarOrcamento(@PathParam("idOrcamento")int idOrcamento) {
		
		System.out.println("Entrou no reiniciar orçamento");
		
		try {
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCServicosDAO jdbcServicos = new JDBCServicosDAO(conexao);
			boolean retorno = jdbcServicos.reiniciarOrcamento(idOrcamento);
			boolean retornoDeletar = jdbcServicos.deletarServicos(idOrcamento);
			

			String msg = "";
			
			if (retorno == true && retornoDeletar == true) {
				msg = "Status alterado com sucesso!";
			} else {
				msg = "Erro ao alterar Orçamento";
			}


			conec.fecharConexao();
			return this.buildResponse(msg);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

}
