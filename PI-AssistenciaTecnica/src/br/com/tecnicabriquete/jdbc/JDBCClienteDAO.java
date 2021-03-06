package br.com.tecnicabriquete.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import br.com.tecnicabriquete.modelo.Cliente;

public class JDBCClienteDAO {

	private Connection conexao;

	public JDBCClienteDAO(Connection conexao) {
		this.conexao = conexao;
	}

	public List<Cliente> buscar() {

		System.out.println("Entrou no cliente dao");

		// Criação da instrução SQL para busca de todos funcionarios
		String comando = "SELECT * FROM cliente";

		List<Cliente> listaCliente = new ArrayList<Cliente>();

		Cliente cliente = null;

		// Abertura do try-catch

		try {

			// Uso da conexão do banco para prepará-lo par auma instrução SQL

			Statement stmt = conexao.createStatement();

			// Execução da instrução criada previamente
			// e armazenamento do resultado no objeto rs

			ResultSet rs = stmt.executeQuery(comando);

			// Enquanto houver uma próxima linha no resultado
			while (rs.next()) {

				cliente = new Cliente();

				int idcliente = rs.getInt("idcliente");
				String nome = rs.getString("nome");
				long cpf = rs.getLong("cpf");
				String email = rs.getString("email");
				long telefone = rs.getLong("telefone");

				cliente.setEmail(email);
				cliente.setCpf(cpf);
				cliente.setIdcliente(idcliente);
				cliente.setNome(nome);
				cliente.setTelefone(telefone);
				listaCliente.add(cliente);
			}

			// Caso alguma Exception seja gerada no Try, recebe-a no objeto "ex"
		} catch (Exception ex) {
			// Exibe a exceção na console
			ex.printStackTrace();
		}

		return listaCliente;
	}

	public boolean inserir(Cliente cliente) {
		String comando = "INSERT INTO cliente (cpf,nome,telefone,email) VALUES(?,?,?,?)";
		PreparedStatement p;

		try {

			p = this.conexao.prepareStatement(comando);

			p.setLong(1, cliente.getCpf());
			p.setString(2, cliente.getNome());
			p.setLong(3, cliente.getTelefone());
			p.setString(4, cliente.getEmail());

			p.execute();

		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean deletar(int idcliente) {

		String comando = "DELETE FROM cliente WHERE idcliente = ?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1, idcliente);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public Cliente buscarPorId(int idcliente) {
		String comando = "SELECT * FROM cliente WHERE idcliente = ?";
		Cliente cliente = new Cliente();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, idcliente);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {

				String email = rs.getString("email");
				String nome = rs.getString("nome");
				long telefone = rs.getLong("telefone");
				long cpf = rs.getLong("cpf");

				cliente.setEmail(email);
				cliente.setNome(nome);
				cliente.setTelefone(telefone);
				cliente.setCpf(cpf);
				cliente.setIdcliente(idcliente);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cliente;
	}

	public boolean alterar(Cliente cliente) {
		
		String comando = "UPDATE cliente SET cpf=?,telefone=?,email=?,nome=? WHERE idcliente =?";
		
		System.out.println("dados dentro do alterar dao"+cliente.getCpf()+cliente.getNome()+cliente.getIdcliente());
		
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setLong(1, cliente.getCpf());
			p.setLong(2, cliente.getTelefone());
			p.setString(3, cliente.getEmail());
			p.setString(4, cliente.getNome());
			p.setInt(5, cliente.getIdcliente());
			p.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean verificaCpf(Cliente cliente) {
		boolean retorno = false;

		String comando = "SELECT EXISTS(SELECT * FROM cliente WHERE cpf = ? AND idcliente <> ?)as resultado";
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);

			p.setLong(1, cliente.getCpf());
			p.setInt(2, cliente.getIdcliente());
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				int existencia = rs.getInt("resultado"); // vem do alias do comando
				if (existencia == 1) {
					retorno = true;
				} else {
					retorno = false;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return retorno;
	}


}
