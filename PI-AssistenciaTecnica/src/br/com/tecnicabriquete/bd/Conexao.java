package br.com.tecnicabriquete.bd;

import java.sql.Connection;

public class Conexao {
	
	private Connection conexao;
	
	public Connection abrirConexao() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
			conexao = java.sql.DriverManager.
					getConnection("jdbc:mysql://localhost/der-pi?"
							+"user=root&password=root&userTimezone=true&serverTimezone=UTC");
		}catch(Exception e) {
			e.printStackTrace();
		}
		return conexao;
	}

	
}
