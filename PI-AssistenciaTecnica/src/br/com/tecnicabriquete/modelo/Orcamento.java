package br.com.tecnicabriquete.modelo;

import java.sql.Date;
import java.util.ArrayList;

public class Orcamento {
	
	String equipamentoNome,equipamentoModeloCodigo,defeito,observacao;
	int status,idorcamento;
	float valorTotal;
	Date data,validade;
	Cliente cliente;
	ArrayList<Servicos> servicos = new ArrayList<Servicos>();
	
	
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
	
	public Date getData() {
		return data;
	}
	public void setData(java.util.Date data_entrada) {
		this.data = (Date) data_entrada;
	}
	public String getObservacao() {
		return observacao;
	}
	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getIdorcamento() {
		return idorcamento;
	}
	public void setIdorcamento(int idorcamento) {
		this.idorcamento = idorcamento;
	}
	public Date getValidade() {
		return validade;
	}
	public void setValidade(java.util.Date validade_orcamento) {
		this.validade = (Date) validade_orcamento;
	}
	public Cliente getCliente() {
		return cliente;
	}
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	public ArrayList<Servicos> getServicos() {
		return servicos;
	}
	public void setServicos(ArrayList<Servicos> servicos) {
		this.servicos = servicos;
	}
	public float getValorTotal() {
		return valorTotal;
	}
	public void setValorTotal(float valorTotal) {
		this.valorTotal = valorTotal;
	}
	
	
}
