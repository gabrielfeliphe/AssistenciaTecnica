package LoginServlet;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ArmazenaDadosUsuario.ArmazenaDadosUsuario;
import AutenticacaoJdbcDao.JDBCAutenticacaDAO;
import br.com.tecnicabriquete.bd.Conexao;

public class AutenticacaoServlet extends HttpServlet{
	private static final long serialVersionUID = 1L;
	
	private void process(HttpServletRequest request,
			HttpServletResponse response)
			throws ServletException, IOException{
		
		ArmazenaDadosUsuario dadosautentica = new ArmazenaDadosUsuario();
		dadosautentica.setMatricula(request.getParameter("matricula"));
		dadosautentica.setSenha(request.getParameter("senha"));
		
		Conexao conec = new Conexao();
		Connection conexao = (Connection)conec.abrirConexao();
		
		JDBCAutenticacaDAO jdbcAutentica = new JDBCAutenticacaDAO(conexao);
		boolean retorno = jdbcAutentica.consultar(dadosautentica);
		
		System.out.println("valor retorno = "+retorno);
		
	}
	
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response)throws ServletException, IOException {
		process (request,response);
	}
	
	protected void doPost (HttpServletRequest request,
			HttpServletResponse response)throws ServletException, IOException {
		process (request,response);
	}

}
