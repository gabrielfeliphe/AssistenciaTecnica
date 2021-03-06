package br.com.tecnicabriquete.jdbc;

import br.com.tecnicabriquete.modelo.Funcionario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class JDBCFuncionarioDAO {

	private Connection conexao;

	public JDBCFuncionarioDAO(Connection conexao) {
		this.conexao = conexao;
	}

	public List<Funcionario> buscar() {

		System.out.println("Entrou no funcionario dao");

		// Criação da instrução SQL para busca de todos funcionarios
		String comando = "SELECT * FROM usuario";

		List<Funcionario> listaFuncionario = new ArrayList<Funcionario>();


		Funcionario funcionario = null;

		// Abertura do try-catch

		try {

			// Uso da conexão do banco para prepará-lo par auma instrução SQL

			Statement stmt = conexao.createStatement();

			// Execução da instrução criada previamente
			// e armazenamento do resultado no objeto rs

			ResultSet rs = stmt.executeQuery(comando);

			// Enquanto houver uma próxima linha no resultado
			while (rs.next()) {

				funcionario = new Funcionario();

				int matricula = rs.getInt("matricula");
				// String senha = rs.getString("senha"); não precisamos da senha, se não já
				// comprometemos a integridade dos dados
				int funcao = rs.getInt("funcao");
				String email = rs.getString("email");

				funcionario.setEmail(email);
				funcionario.setFuncao(funcao);
				funcionario.setMatricula(matricula);
				// funcionario.setSenha(senha);
				listaFuncionario.add(funcionario);
			}

			// Caso alguma Exception seja gerada no Try, recebe-a no objeto "ex"
		} catch (Exception ex) {
			// Exibe a exceção na console
			ex.printStackTrace();
		}

		return listaFuncionario;
	}

	public boolean inserir(Funcionario funcionario) {
		String comando = "INSERT INTO usuario " + "(matricula,senha,funcao,email) " + "VALUES (?,?,?,?)";
		PreparedStatement p;

		try {

			// Prepara o comando para execução no BD em que nos conectamos
			p = this.conexao.prepareStatement(comando);


			p.setInt(1, funcionario.getMatricula());
			p.setString(2, funcionario.getSenha());
			p.setInt(3, funcionario.getFuncao());
			p.setString(4, funcionario.getEmail());

			// Executa o comando no BD
			p.execute();

		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean deletar(int matricula) {

		System.out.println("metodo deletar da jdbcdaofunc invocado matricula: " + matricula);

		String comando = "DELETE FROM usuario WHERE matricula = ?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1, matricula);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public Funcionario buscarPorMatricula(int matricula) {
		String comando = "SELECT * FROM usuario WHERE usuario.matricula = ?";
		Funcionario funcionario = new Funcionario();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, matricula);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {

				String email = rs.getString("email");
				int funcao = rs.getInt("funcao");
				//String senha = rs.getString("senha");
				int matricula_ = rs.getInt("matricula");

				funcionario.setEmail(email);
				funcionario.setFuncao(funcao);
				funcionario.setMatricula(matricula_);
				//funcionario.setSenha(senha);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return funcionario;
	}

	public boolean alterar(Funcionario funcionario) {

		System.out.println("conteúdo alterar do funcionário : " + funcionario);
		
		System.out.println("getsenha: "+funcionario.getSenha());

		String comando = "UPDATE usuario SET matricula=?,email=?,funcao=? WHERE matricula =?";
		if (!funcionario.getSenha().equals("")) {
			System.out.println("entrou getsenha");
			comando = "UPDATE usuario SET matricula=?,email=?,funcao=?,senha=? WHERE matricula =?";
		}
		
		
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1, funcionario.getMatricula());
			p.setString(2, funcionario.getEmail());
			p.setInt(3, funcionario.getFuncao());
			if(!funcionario.getSenha().equals("")) {
			p.setString(4, funcionario.getSenha());
			p.setInt(5, funcionario.getMatricula());
			}else {
				p.setInt(4, funcionario.getMatricula());
			}
			p.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean verficiaExistencia(Funcionario funcionario) {

		boolean retorno = false;

		String comando = "SELECT EXISTS(SELECT * FROM usuario WHERE matricula =? OR email = ?)as resultado";
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);

			p.setInt(1, funcionario.getMatricula());
			p.setString(2, funcionario.getEmail());
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				int existencia = rs.getInt("resultado"); // vem do alias do comando
				System.out.println("existencia ?" + existencia);
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

	public boolean verficiaExistenciaEditar(Funcionario funcionario) {
		boolean retorno = false;

		String comando = "SELECT EXISTS(SELECT * FROM usuario WHERE matricula <>? AND email = ?)as resultado";
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);

			p.setInt(1, funcionario.getMatricula());
			p.setString(2, funcionario.getEmail());
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				int existencia = rs.getInt("resultado"); // vem do alias do comando
				System.out.println("existencia ?" + existencia);
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
