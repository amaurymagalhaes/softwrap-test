"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fbadmin = __importStar(require("firebase-admin"));
var Pessoa_1 = __importDefault(require("../models/Pessoa"));
var serviceAccount = require('../../softwrap-test-39f09-firebase-adminsdk-hs0ba-32a39fd213.json');
fbadmin.initializeApp({
    credential: fbadmin.credential.cert(serviceAccount),
    databaseURL: 'https://softwrap-test-39f09.firebaseio.com',
});
var database = fbadmin.firestore();
var pessoasDB = database.collection('pessoas');
var pessoasRouter = express_1.Router();
pessoasRouter.post('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nome, idade, estadocivil, cpf, cidade, estado, people, haveCPFOnDB;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, nome = _a.nome, idade = _a.idade, estadocivil = _a.estadocivil, cpf = _a.cpf, cidade = _a.cidade, estado = _a.estado;
                people = new Pessoa_1.default(nome, idade, estadocivil, cpf, cidade, estado);
                return [4 /*yield*/, pessoasDB.where('cpf', '==', cpf).get()];
            case 1:
                haveCPFOnDB = _b.sent();
                if (!haveCPFOnDB.empty) return [3 /*break*/, 3];
                return [4 /*yield*/, pessoasDB.add({
                        nome: nome,
                        idade: idade,
                        estadocivil: estadocivil,
                        cpf: cpf,
                        cidade: cidade,
                        estado: estado,
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/, response.json('Cadastro criado com sucesso.')];
            case 3: return [2 /*return*/, response.json('CPF já existente.')];
        }
    });
}); });
pessoasRouter.put('/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nome, idade, estadocivil, cpf, cidade, estado, id, people;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, nome = _a.nome, idade = _a.idade, estadocivil = _a.estadocivil, cpf = _a.cpf, cidade = _a.cidade, estado = _a.estado;
                id = request.params.id;
                people = new Pessoa_1.default(nome, idade, estadocivil, cpf, cidade, estado);
                return [4 /*yield*/, pessoasDB.doc(id).update({
                        nome: nome,
                        idade: idade,
                        estadocivil: estadocivil,
                        cpf: cpf,
                        cidade: cidade,
                        estado: estado,
                    })];
            case 1:
                _b.sent();
                return [2 /*return*/, response.json('Cadastro alterado com sucesso.')];
        }
    });
}); });
pessoasRouter.delete('/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                return [4 /*yield*/, pessoasDB.doc(id).delete()];
            case 1:
                _a.sent();
                return [2 /*return*/, response.json('Cadastro excluído com sucesso.')];
        }
    });
}); });
pessoasRouter.get('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var documentsGet, documentsTogether;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pessoasDB.get()];
            case 1:
                documentsGet = _a.sent();
                documentsTogether = [{}];
                documentsTogether.pop();
                documentsGet.forEach(function (doc) {
                    console.log(doc.id, '=>', doc.data());
                    documentsTogether.push(__assign({ id: doc.id }, doc.data()));
                });
                return [2 /*return*/, response.json(documentsTogether)];
        }
    });
}); });
pessoasRouter.get('/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, document, documentData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                return [4 /*yield*/, pessoasDB.doc(id).get()];
            case 1:
                document = _a.sent();
                console.log('Document data:', document.data());
                documentData = __assign({ id: id }, document.data());
                return [2 /*return*/, response.json(documentData)];
        }
    });
}); });
exports.default = pessoasRouter;
