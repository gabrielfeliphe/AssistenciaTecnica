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
		//Criação da instrução SQL para busca de todas as marcas
				String comando = "SELECT * FROM usuario";
				
				
				//Criação de uma lista para armazenar cada marca encontrada
				List<Funcionario> listMarcas = new ArrayList<Funcionario>();
				
				//Criação do objeto marca com valor null (ou seja, sem instanciá-lo)
				Funcionario funcionario = null;
				
				//Abertura do try-catch
				
				try {
					
					//Uso da conexão do banco para prepará-lo par auma instrução SQL
					
					Statement stmt = conexao.createStatement();
					
					//Execução da instrução criada previamente
					//e armazenamento do resultado no objeto rs
					
					ResultSet rs = stmt.executeQuery(comando);
					
					//Enquanto houver uma próxima linha no resultado
					while(rs.next()) {
						
						//Criação de instância de classe Marca
						funcionario = new Funcionario();
						
						//Recebimento dos 2 dados retornados do BD para cada linha encontrada
						int matricula = rs.getInt("matricula");
						String senha = rs.getString("senha");
						int funcao = rs.getInt("funcao");
						String email = rs.getString("email");
						
						//Setando no objeto marca os valores encontrados
						f.setStatus(status);
						
						if(marca.getStatus() == 0) {
							System.out.println("marca com status 0 pulada");
						}else {
							funcionario.setId(id); // POR QUESTÕES DE ECONOMIA DE PROCESSAMENTO VEM PRO ELSE 
							funcionario.setNome(nome);
							listMarcas.add(marca);
						}
					}
					
					
					//Caso alguma Exception seja gerada no Try, recebe-a no objeto "ex"
				}catch(Exception ex) {
					//Exibe a exceção na console
					ex.printStackTrace();
				}
				
				
				return listMarcas;
	}

}
