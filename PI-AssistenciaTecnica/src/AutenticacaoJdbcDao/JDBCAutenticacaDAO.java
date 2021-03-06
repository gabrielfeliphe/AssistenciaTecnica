package AutenticacaoJdbcDao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import ArmazenaDadosUsuario.ArmazenaDadosUsuario;

public class JDBCAutenticacaDAO {
	
	private Connection conexao;
	public JDBCAutenticacaDAO (Connection conexao) {
		this.conexao = conexao;
	}
	
	public boolean consultar (ArmazenaDadosUsuario dadosautentica) {
		
			boolean retorno = false;
			String comando = "SELECT EXISTS(SELECT * FROM usuario WHERE matricula = ? AND senha = ?)as resultado";
			try {
				
				PreparedStatement p = this.conexao.prepareStatement(comando);

				p.setString(1, dadosautentica.getMatricula());
				p.setString(2, dadosautentica.getSenha());
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
	
	public int role (ArmazenaDadosUsuario dadosautentica) {
		
		int retorno = 9;
		
		String comando = "SELECT * FROM usuario WHERE matricula =? AND senha = ?";
		
		try {
			
			PreparedStatement p = this.conexao.prepareStatement(comando);
			
			p.setString(1, dadosautentica.getMatricula());
			p.setString(2, dadosautentica.getSenha());
			
			ResultSet rs = p.executeQuery();
			while (rs.next()) {
				retorno = rs.getInt("funcao");; // vem do alias do comando
			}
		} catch (SQLException e) {
			e.printStackTrace();

		}
	return retorno;
}
}
