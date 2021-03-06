CREATE DATABASE  IF NOT EXISTS `der-pi` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `der-pi`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: der-pi
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idcliente` int NOT NULL AUTO_INCREMENT COMMENT 'identificador do cliente na tabela.',
  `nome` varchar(45) NOT NULL COMMENT 'nome do cliente.',
  `email` varchar(255) NOT NULL COMMENT 'e-mail do cliente',
  `cpf` char(11) NOT NULL COMMENT 'cpf do cliente.',
  `telefone` int NOT NULL COMMENT 'telefone do cliente.',
  PRIMARY KEY (`idcliente`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Cliente 1','cliente01@senai.com','1',1);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orcamento`
--

DROP TABLE IF EXISTS `orcamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orcamento` (
  `idorcamento` int NOT NULL AUTO_INCREMENT COMMENT 'identificador do or??amento.',
  `nome_equipamento` varchar(45) NOT NULL COMMENT 'nome do equipamento do cliente',
  `modelo_codigo` varchar(45) NOT NULL COMMENT 'modelo ou c??digo do produto do cliente.',
  `descricao_problema` text NOT NULL COMMENT 'descri????o do problema do cliente.',
  `garantia` tinyint NOT NULL COMMENT 'identificador se ?? um produto que est?? ou n??o na garantia, sendo ZERO que n??o est?? e UM que est?? na garantia.',
  `data_entrada` date NOT NULL COMMENT 'data em que entra o or??amento no sistea=ma.',
  `validade_orcamento` date NOT NULL COMMENT 'validade do or??amento, ap??s isso ele deixa de valer.',
  `observacao` text COMMENT 'observa????es adicionais sobre o produto ou servi??o.',
  `status` tinyint NOT NULL COMMENT 'status dentro da cadeia do software, onde ser?? gerido o estado da ordem de servi??o ou or??amento.Sendo os status de ZERO at?? TR??S \nos de fase or??amental, e de QUATRO at?? OITO os da fase de ordem de servi??o.\nO status ZERO corresponde a um or??amento rejeitado, e o status MENOS UM corresponde a um item abandonado.',
  `idcliente` int NOT NULL COMMENT 'identificador do cliente(chave estrangeira).',
  PRIMARY KEY (`idorcamento`),
  KEY `idcliente_idx` (`idcliente`),
  CONSTRAINT `idcliente` FOREIGN KEY (`idcliente`) REFERENCES `cliente` (`idcliente`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orcamento`
--

LOCK TABLES `orcamento` WRITE;
/*!40000 ALTER TABLE `orcamento` DISABLE KEYS */;
INSERT INTO `orcamento` VALUES (1,'eqp 1','01','problema 01',0,'2021-01-01','2021-01-05','n/a',1,1);
/*!40000 ALTER TABLE `orcamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servico`
--

DROP TABLE IF EXISTS `servico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servico` (
  `idservico` int NOT NULL COMMENT 'identificador da tabela servico.',
  `peca_servico` varchar(255) NOT NULL COMMENT 'informa????o da peca ou servi??o prestado',
  `valor` decimal(7,2) NOT NULL COMMENT 'valor das pe??as e servi??os prestados.',
  `tipo` tinyint NOT NULL COMMENT 'Identifica o tipo do item inserido no campo peca_servico, sendo UM uma pe??a e DOIS um servi??o.',
  `orcamento_idorcamento` int NOT NULL COMMENT 'identificador de ordem de servico(chave estrangeira)',
  PRIMARY KEY (`idservico`),
  KEY `fk_servico_orcamento1_idx` (`orcamento_idorcamento`),
  CONSTRAINT `fk_servico_orcamento1` FOREIGN KEY (`orcamento_idorcamento`) REFERENCES `orcamento` (`idorcamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servico`
--

LOCK TABLES `servico` WRITE;
/*!40000 ALTER TABLE `servico` DISABLE KEYS */;
INSERT INTO `servico` VALUES (1,'1',10.00,1,1),(2,'1',20.00,1,1);
/*!40000 ALTER TABLE `servico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `matricula` int NOT NULL COMMENT 'identifica????o do usu??rio',
  `senha` char(32) NOT NULL COMMENT 'senha para autentica????o no sistema',
  `funcao` tinyint NOT NULL COMMENT 'fun????o que ele exerce na empresa, gerindo tamb??m os n??veis de acesso.',
  `email` varchar(255) NOT NULL COMMENT 'e-mail para recupera????o de senha.',
  PRIMARY KEY (`matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin',0,'admin@admin.com');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-08 14:26:09

ALTER TABLE `der-pi`.`servico` 
CHANGE COLUMN `idservico` `idservico` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'identificador da tabela servico.' ;

ALTER TABLE `der-pi`.`orcamento` 
DROP COLUMN `garantia`;



select * from cliente;

select * from servico;

ALTER TABLE cliente MODIFY telefone char(11);

select * from orcamento;

select * from usuario;

update orcamento set status = 1 where idorcamento = 1;

delete from servico where idservico between 3 and 8;

update usuario set senha= '296506902c693b458707ad6f7e24a544' where matricula between 1 and 4;

delete from servico where orcamento_idorcamento = 1;

SELECT orcamento.*,cliente.*, SUM(servico.valor) as valorTotal FROM orcamento 
INNER JOIN cliente on orcamento.idcliente = cliente.idcliente 
INNER JOIN servico on orcamento.idorcamento = servico.orcamento_idorcamento
GROUP BY idorcamento
ORDER BY status ASC;

SELECT orcamento.*, cliente.*,  FROM orcamento INNER JOIN cliente on orcamento.idcliente = cliente.idcliente 

WHERE idorcamento = ?





