package filter;

import LoginServlet.AutenticacaoServlet;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class ServletFilter implements Filter {
	/*
	 * O método abstrato init() é exigido por esta classe neste caso este método
	 * indicará que o Filtro deverá executar algo quando o Filtro for carregado pelo
	 * Container(Servlet).
	 */
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	/*
	 * O método doFilter() executará todo o processamento que queremos executar no
	 * Filtro, este por sua vez, recebe 3 parâmetros(ServletRequest, ServletResponse
	 * e FilterChain). Perceba a semelhança deste método com o método Service da
	 * classe Servlet.
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
			throws IOException, ServletException

	{
		/*
		 * O método getContextPath() é o responsável por retornar o contexto da URL que
		 * realizou a requisição
		 */
		String context = request.getServletContext().getContextPath();
	

		try {
			/*
			 * O método getSession() é responsável por capturar a Session ativa. Aqui foi
			 * necessário fazer um casting(conversão) pois o objeto request é do tipo
			 * ServletRequest e não HttpServletRequest como no Servlet onde você utiliza
			 * você utiliza o método em questão, sem o uso do casting.
			 * 
			 * 
			 */
			

			HttpSession session = ((HttpServletRequest) request).getSession();
			
			String pathRequest = ((HttpServletRequest) request).getRequestURI();
			
			String[] compara = pathRequest.split("/");
			
			int role = 42;
			
			switch(compara[3]) {
			case "adm":
				role =0;
				break;
			case "recepcao":
				role =1;
				break;
			case "almoxarife":
				role=3;
				break;
			case "manutencao":
				role = 2;
				break;
			}


			/*
			 * Inicializando a variável usuário para depois sabermos se este chegou com
			 * valor o não.
			 */
			String usuario = null;
			int a = 1;
			Integer roleUser = (Integer) session.getAttribute("role");
			
			String[] voSessao = new String[2];
			
			// Se existe uma Session
			if (session != null) {
				//Atribua o valor do login de quem se logou a variável usuario
				usuario = (String) session.getAttribute("matricula");
				voSessao[0] = usuario;
				voSessao[1] = session.getId();
			}
						
			//Verificando se usuário é nulo
			if (usuario == null)

			{
				//Se for redireciona para a apresentação da mensagem de
				((HttpServletResponse) response).sendRedirect(context + "/erro.html");
			} else {
				/*
				 * Se não for nulo, o programa deve prosseguir seu processamento lá no Servlet,
				 * ou seja, ou vai redirecionar para a página principal ou se for um usuário
				 * inexistente ou com senha inexistente será redirecionado de lá para a página
				 * de erro.
				 */
				System.out.println("requisição do usuario: "+roleUser);
				
				
				
				System.out.println("Path "+pathRequest);
				
				if(role != roleUser) {
					((HttpServletResponse) response).sendRedirect(context + "/acessoNegado.html");
				}else {
					filterChain.doFilter(request, response);
				}
				
			}
		} catch (Exception e) {

			e.printStackTrace();
		}
	}// Fechando o bloco do doFilter()
//Executa a destruição do Filtro.

	public void destroy() {
	}
}// Fechando a classe