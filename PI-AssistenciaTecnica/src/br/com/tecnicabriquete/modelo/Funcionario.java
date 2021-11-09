package br.com.tecnicabriquete.modelo;

import java.io.Serializable;

public class Funcionario implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	public int getMatricula() {
		return matricula;
	}
	public void setMatricula(int matricula) {
		this.matricula = matricula;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getFuncao() {
		return funcao;
	}
	public void setFuncao(int funcao) {
		this.funcao = funcao;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	private int matricula;
	private int funcao;
	private String email;
	private String senha;
	
	

}
