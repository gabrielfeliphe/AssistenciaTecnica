package LoginServlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sun.xml.internal.messaging.saaj.util.Base64;

import ArmazenaDadosUsuario.ArmazenaDadosUsuario;
import AutenticacaoJdbcDao.JDBCAutenticacaDAO;
import br.com.tecnicabriquete.bd.Conexao;

public class AutenticacaoServlet extends HttpServlet{
	private static final long serialVersionUID = 1L;
	
	private void process(HttpServletRequest request,
			HttpServletResponse response)
			throws ServletException, IOException{
		
		String descript = new String(Base64.base64Decode(request.getParameter("senha")));
		System.out.print(descript);
		
		ArmazenaDadosUsuario dadosautentica = new ArmazenaDadosUsuario();
		//dadosautentica.setMatricula(request.getParameter("matricula"));
		//dadosautentica.setSenha(request.getParameter("senha"));
		
		
		Conexao conec = new Conexao();
		Connection conexao = (Connection)conec.abrirConexao();
		
		JDBCAutenticacaDAO jdbcAutentica = new JDBCAutenticacaDAO(conexao);

		String sendmd5 = "";
		MessageDigest md = null;
		
		try {
			md = MessageDigest.getInstance("MD5");
		}catch(NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		
		BigInteger hash = new BigInteger(1, md.digest(request.getParameter("senha").getBytes()));
		sendmd5 = hash.toString(16);
		
		dadosautentica.setSenha(sendmd5);
		
		dadosautentica.setMatricula(request.getParameter("matricula"));
		
		System.out.println("MD5");
		System.out.println(sendmd5);
		
		System.out.println("gettersenha: "+dadosautentica.getSenha());
		
		
		
		boolean retorno = jdbcAutentica.consultar(dadosautentica);
		int role = jdbcAutentica.role(dadosautentica);
		
		dadosautentica.setRole(role);

		if(retorno) {
			HttpSession sessao = request.getSession();
			
			sessao.setAttribute("matricula", request.getParameter("matricula"));
			sessao.setAttribute("role", role);
			switch(role) {
			case 0:
				System.out.println("autentica"+sessao.getAttribute("role"));
				response.sendRedirect("pages/adm");
			break;
			case 1:
				System.out.println("autentica"+sessao.getAttribute("role"));
				response.sendRedirect("pages/recepcao");
				
				break;
			case 2:
				System.out.println("autentica"+sessao.getAttribute("role"));
				response.sendRedirect("pages/manutencao");
				break;
			case 3:
				System.out.println("autentica"+sessao.getAttribute("role"));
				response.sendRedirect("pages/almoxarife");
				break;
			}
		}else {
			response.sendRedirect("index.html");
		}
		
		
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
