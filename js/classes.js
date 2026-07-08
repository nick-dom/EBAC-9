// ==============================
// classes.js
// Classe Cliente
// ==============================

export class Cliente {

    constructor(nome, email, telefone, cpf, cidade, estado) {

        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cpf = cpf;
        this.cidade = cidade;
        this.estado = estado;
        this.dataCadastro = new Date().toLocaleDateString("pt-BR");

    }

    getNome() {
        return this.nome;
    }

    getEmail() {
        return this.email;
    }

    getTelefone() {
        return this.telefone;
    }

    getCpf() {
        return this.cpf;
    }

    getCidade() {
        return this.cidade;
    }

    getEstado() {
        return this.estado;
    }

    getDataCadastro() {
        return this.dataCadastro;
    }

    setNome(nome) {
        this.nome = nome;
    }

    setEmail(email) {
        this.email = email;
    }

    setTelefone(telefone) {
        this.telefone = telefone;
    }

    setCpf(cpf) {
        this.cpf = cpf;
    }

    setCidade(cidade) {
        this.cidade = cidade;
    }

    setEstado(estado) {
        this.estado = estado;
    }

    toJSON() {

        return {

            nome: this.nome,
            email: this.email,
            telefone: this.telefone,
            cpf: this.cpf,
            cidade: this.cidade,
            estado: this.estado,
            dataCadastro: this.dataCadastro

        };

    }

}