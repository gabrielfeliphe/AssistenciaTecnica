package br.com.tecnicabriquete.modelo;

import java.sql.Date;

public class Orcamento {
	
	String equipamentoNome,equipamentoModeloCodigo,defeito;
	int garantia,idcliente;
	Date data;
	
	public int getIdcliente() {
		return idcliente;
	}
	public void setIdcliente(int idcliente) {
		this.idcliente = idcliente;
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
	
	public int getGarantia() {
		return garantia;
	}
	public void setGarantia(int garantia) {
		this.garantia = garantia;
	}
	public Date getData() {
		return data;
	}
	public void setData(Date data) {
		this.data = data;
	}
	
	

}
