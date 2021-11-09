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
import br.com.tecnicabriquete.jdbc.JDBCFuncionarioDAO;
import br.com.tecnicabriquete.modelo.Funcionario;


@Path("funcionario")
public class FuncionarioRest extends UtilRest{
	
	@GET
	@Path("/buscar")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscar() {
		System.out.println("Entrou no funcionario rest");

		try {
			List<Funcionario> listaFuncionarios = new ArrayList<Funcionario>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCFuncionarioDAO jdbcFuncionario = new JDBCFuncionarioDAO(conexao);
			listaFuncionarios = jdbcFuncionario.buscar();
			conec.fecharConexao();
			return this.buildResponse(listaFuncionarios);
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@POST
	@Path("/cadastrar")
	@Consumes("application/*")
	public Response inserir(String novoFuncionario) {
		try {

			Funcionario funcionario = new Gson().fromJson(novoFuncionario, Funcionario.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCFuncionarioDAO jdbcFuncionario = new JDBCFuncionarioDAO(conexao);


	

				boolean retorno = jdbcFuncionario.inserir(funcionario);

				String msg = "";

				if (retorno) {
					msg = "Marca cadastrada com sucesso!";
				} else {
					msg = "Erro ao cadastrar marca.";
				}

				conec.fecharConexao();

				return this.buildResponse(msg);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@DELETE
	@Path("/excluir/{matricula}")
	@Consumes("application/*")

	public Response excluir(@PathParam("matricula") int matricula) {
		
		System.out.println("metodo excluir invocado matricula : "+matricula);

		try {

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCFuncionarioDAO jdbcFuncionario = new JDBCFuncionarioDAO(conexao);


					boolean retorno = jdbcFuncionario.deletar(matricula);

					String msg = "";
					if (retorno) {
						msg = "Funcionario excluido com sucesso!";
					} else {
						msg = "Erro ao excluir o Funcionario!";
					}

					conec.fecharConexao();

					return this.buildResponse(msg);


		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	
	@GET
	@Path("/buscarPorMatricula")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarPorId(@QueryParam("matricula") int matricula) {

		try {
			Funcionario funcionario = new Funcionario();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCFuncionarioDAO jdbcFuncionario = new JDBCFuncionarioDAO(conexao);

			funcionario = jdbcFuncionario.buscarPorMatricula(matricula);

			conec.fecharConexao();

			return this.buildResponse(funcionario);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}

	}

	@PUT
	@Path("/alterar")
	@Consumes("application/*")
	public Response alterar(String funcionarioParam) {
		
		System.out.println("alterar conteúdo : "+funcionarioParam);
		
		try {
			Funcionario funcionario = new Gson().fromJson(funcionarioParam,Funcionario.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCFuncionarioDAO jdbcFuncionario = new JDBCFuncionarioDAO(conexao);

			boolean retorno = jdbcFuncionario.alterar(funcionario);

			String msg = "";

			if (retorno) {
				msg = "Funcionario alterado com sucesso!";
			} else {
				msg = "Erro ao alterar o Funcionario.";
			}

			conec.fecharConexao();
			return this.buildResponse(msg);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}



}
