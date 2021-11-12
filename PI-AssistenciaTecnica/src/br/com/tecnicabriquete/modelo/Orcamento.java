package br.com.tecnicabriquete.modelo;

public class Orcamento {
	
	Cliente cliente;
	String equipamentoNome,equipamentoModeloCodigo,defeito,garantia,data;
	
	public Cliente getCliente() {
		return cliente;
	}
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	public String getEquipamentoNome() {
		return equipamentoNome;
	}
	public void setEquipamentoNome(String equipamentoNome) {
		this.equipamentoNome = equipamentoNome;
	}
	public String getEquipamentoModeloCodigo() {
		return equipamentoModeloCodigo;
	}
	public void setEquipamentoModeloCodigo(String equipamentoModeloCodigo) {
		this.equipamentoModeloCodigo = equipamentoModeloCodigo;
	}
	public String getDefeito() {
		return defeito;
	}
	public void setDefeito(String defeito) {
		this.defeito = defeito;
	}
	public String getGarantia() {
		return garantia;
	}
	public void setGarantia(String garantia) {
		this.garantia = garantia;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	
	

}
