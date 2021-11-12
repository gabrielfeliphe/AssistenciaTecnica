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
import br.com.tecnicabriquete.modelo.Cliente;


@Path("cliente")
public class ClienteRest extends UtilRest {

	@GET
	@Path("/buscar")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscar() {
		System.out.println("Entrou no cliente rest");

		try {
			List<Cliente> listaClientes = new ArrayList<Cliente>();

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCClienteDAO jdbcCliente = new JDBCClienteDAO(conexao);
			listaClientes = jdbcCliente.buscar();
			conec.fecharConexao();
			return this.buildResponse(listaClientes);
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@POST
	@Path("/cadastrar")
	@Consumes("application/*")
	public Response inserir(String novoCliente) {

		try {

			Cliente cliente = new Gson().fromJson(novoCliente, Cliente.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCClienteDAO jdbcCliente = new JDBCClienteDAO(conexao);
			String msg = "";
			
			boolean verificaCpf = jdbcCliente.verificaCpf(cliente);
			
			if(verificaCpf == true) {
				return this.buildErrorResponse("Erro já existe um cliente com este cpf");
			}else {
			
			boolean retorno = jdbcCliente.inserir(cliente);
			if (retorno == true) {
				msg = "cliente criado com sucesso!";
			} else {
				msg = "Erro ao criar cliente";
			}
			conec.fecharConexao();

			return this.buildResponse(msg);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}

	}
	
	@DELETE
	@Path("/excluir/{idcliente}")
	@Consumes("application/*")

	public Response excluir(@PathParam("idcliente") int idcliente) {
		
		System.out.println("metodo excluir invocado idcliente : "+idcliente);

		try {

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCClienteDAO jdbcCliente = new JDBCClienteDAO(conexao);


					boolean retorno = jdbcCliente.deletar(idcliente);

					String msg = "";
					if (retorno) {
						msg = "cliente excluido com sucesso!";
					} else {
						msg = "Erro ao excluir o cliente!";
					}

					conec.fecharConexao();

					return this.buildResponse(msg);


		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}
	
	@GET
	@Path("/buscarPorId")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarPorId(@QueryParam("idcliente") int idcliente) {

		try {
			Cliente cliente = new Cliente();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCClienteDAO jdbcCliente = new JDBCClienteDAO(conexao);

			cliente = jdbcCliente.buscarPorId(idcliente);

			conec.fecharConexao();
			
			System.out.println("cliente dados:"+cliente.getIdcliente());

			return this.buildResponse(cliente);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}

	}

	@PUT
	@Path("/alterar")
	@Consumes("application/*")
	public Response alterar(String clienteParam) {
		
		System.out.println("alterar conteúdo : "+clienteParam);
		
		try {
			Cliente cliente = new Gson().fromJson(clienteParam,Cliente.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCClienteDAO jdbcCliente = new JDBCClienteDAO(conexao);

			
			
			boolean retorno = jdbcCliente.alterar(cliente);

			String msg = "";

			if (retorno) {
				msg = "cliente alterado com sucesso!";
			} else {
				msg = "Erro ao alterar o cliente.";
			}

			conec.fecharConexao();
			return this.buildResponse(msg);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

}
