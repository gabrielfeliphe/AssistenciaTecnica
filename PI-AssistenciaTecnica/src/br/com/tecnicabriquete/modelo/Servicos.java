package br.com.tecnicabriquete.modelo;

public class Servicos {
	
	private int orcamento_idorcamento,idservico,tipo;
	private String peca_servico ;
	private float valor;
	
	
	public int getOrcamento_idorcamento() {
		return orcamento_idorcamento;
	}
	public void setOrcamento_idorcamento(int orcamento_idorcamento) {
		this.orcamento_idorcamento = orcamento_idorcamento;
	}
	public int getIdservico() {
		return idservico;
	}
	public void setIdservico(int idservico) {
		this.idservico = idservico;
	}
	public int getTipo() {
		return tipo;
	}
	public void setTipo(int tipo) {
		this.tipo = tipo;
	}
	public String getPeca_servico() {
		return peca_servico;
	}
	public void setPeca_servico(String peca_servico) {
		this.peca_servico = peca_servico;
	}
	public float getValor() {
		return valor;
	}
	public void setValor(float valor) {
		this.valor = valor;
	}
	
}
