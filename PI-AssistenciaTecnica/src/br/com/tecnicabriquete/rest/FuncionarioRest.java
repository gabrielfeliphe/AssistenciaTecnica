package br.com.tecnicabriquete.rest;

import javax.ws.rs.Path;
import java.sql.Connection;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
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


}
