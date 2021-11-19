package br.com.tecnicabriquete.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import br.com.tecnicabriquete.modelo.Cliente;
import br.com.tecnicabriquete.modelo.Funcionario;
import br.com.tecnicabriquete.modelo.Orcamento;

public class JDBCServicosDAO {
	
	private Connection conexao;
	
	public JDBCServicosDAO(Connection conexao) {
		this.conexao = conexao;
	}

	public boolean inserir(Orcamento orcamento) {
		
		System.out.println(orcamento.getData());
		
		String comando = "INSERT INTO orcamento(nome_equipamento,modelo_codigo,descricao_problema,"
				+ "garantia,data_entrada,validade_orcamento,status,idcliente)"
				+ "VALUES(?,?,?,?,?,?,?,?)";
		
		PreparedStatement p;
		
		int status = 1;

		try {

			// Prepara o comando para execução no BD em que nos conectamos
			p = this.conexao.prepareStatement(comando);


			//p.setInt(1, orcamento.getEquipamentoNome());
			p.setString(1, orcamento.getEquipamentoNome());
			p.setString(2, orcamento.getEquipamentoModeloCodigo());
			p.setString(3, orcamento.getDefeito());
			p.setInt(4, orcamento.getGarantia());
			p.setDate(5, orcamento.getData());
			p.setDate(6, orcamento.getData());
			p.setInt(7, status);
			p.setInt(8, orcamento.getCliente().getIdcliente());
			
			// Executa o comando no BD
			p.execute();

		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public List<Orcamento> buscar() {


		// Criação da instrução SQL para busca de todos funcionarios
		String comando = "SELECT * FROM orcamento INNER JOIN cliente on orcamento.idcliente = cliente.idcliente";

		List<Orcamento> listaOrcamento = new ArrayList<Orcamento>();

		
	
		
		Orcamento orcamento = null;
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

				orcamento = new Orcamento();
				cliente = new Cliente();

				int idorcamento = rs.getInt("idorcamento");
				String nome_equipamento = rs.getString("nome_equipamento");
				String modelo_codigo = rs.getString("modelo_codigo");
				String descricao_problema = rs.getString("descricao_problema");
				int garantia = rs.getInt("garantia");
				Date data_entrada = rs.getDate("data_entrada");
				Date validade_orcamento = rs.getDate("validade_orcamento");
				String observacao = rs.getString("observacao");
				int status = rs.getInt("status");
				int idcliente = rs.getInt("idcliente");
				String nomeCliente = rs.getString("nome");
				
				cliente.setIdcliente(idcliente);
				cliente.setNome(nomeCliente);
				
				
				orcamento.setData(data_entrada);
				orcamento.setDefeito(descricao_problema);
				orcamento.setEquipamentoModeloCodigo(modelo_codigo);
				orcamento.setGarantia(garantia);
				orcamento.setEquipamentoNome(nome_equipamento);
				orcamento.setIdorcamento(idorcamento);
				orcamento.setStatus(status);
				orcamento.setValidade(validade_orcamento);
				orcamento.setObservacao(observacao);
				orcamento.setCliente(cliente);;
				
		
				listaOrcamento.add(orcamento);
			}

			// Caso alguma Exception seja gerada no Try, recebe-a no objeto "ex"
		} catch (Exception ex) {
			// Exibe a exceção na console
			ex.printStackTrace();
		}

		return listaOrcamento;
	}

	public Orcamento buscarOrcamentoId(int idorcamento) {
		
		String comando = "SELECT * FROM orcamento WHERE idorcamento = ?";
		Orcamento orcamento = new Orcamento();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, idorcamento);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {

				String nome_equipamento = rs.getString("nome_equipamento");
				String modelo_codigo = rs.getString("modelo_codigo");

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

}
