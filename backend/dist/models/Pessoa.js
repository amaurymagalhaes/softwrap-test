"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4_1 = require("uuidv4");
var Pessoa = /** @class */ (function () {
    function Pessoa(nome, idade, estadocivil, cpf, cidade, estado) {
        this.id = uuidv4_1.uuid();
        this.nome = nome;
        this.idade = idade;
        this.estadocivil = estadocivil;
        this.cpf = cpf;
        this.cidade = cidade;
        this.estado = estado;
    }
    return Pessoa;
}());
exports.default = Pessoa;
