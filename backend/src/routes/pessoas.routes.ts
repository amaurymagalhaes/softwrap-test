import { Router } from 'express';

import * as fbadmin from 'firebase-admin';

import Pessoa from '../models/Pessoa';

const serviceAccount = require('../../softwrap-test-39f09-firebase-adminsdk-hs0ba-32a39fd213.json');

fbadmin.initializeApp({
  credential: fbadmin.credential.cert(serviceAccount),
  databaseURL: 'https://softwrap-test-39f09.firebaseio.com',
});

const database = fbadmin.firestore();

const pessoasDB = database.collection('pessoas');

const pessoasRouter = Router();

pessoasRouter.post('/', async (request, response) => {
  const { nome, idade, estadocivil, cpf, cidade, estado } = request.body;
  const people = new Pessoa(nome, idade, estadocivil, cpf, cidade, estado);

  const haveCPFOnDB = await pessoasDB.where('cpf', '==', cpf).get();

  if (haveCPFOnDB.empty) {
    await pessoasDB.add({
      nome,
      idade,
      estadocivil,
      cpf,
      cidade,
      estado,
    });
    return response.json('Cadastro criado com sucesso.');
  } else {
    return response.json('CPF já existente.');
  }
});

pessoasRouter.put('/:id', async (request, response) => {
  const { nome, idade, estadocivil, cpf, cidade, estado } = request.body;
  const id = request.params.id;
  const people = new Pessoa(nome, idade, estadocivil, cpf, cidade, estado);
  await pessoasDB.doc(id).update({
    nome,
    idade,
    estadocivil,
    cpf,
    cidade,
    estado,
  });
  return response.json('Cadastro alterado com sucesso.');
});

pessoasRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  await pessoasDB.doc(id).delete();
  return response.json('Cadastro excluído com sucesso.');
});

pessoasRouter.get('/', async (request, response) => {
  const documentsGet = await pessoasDB.get();
  const documentsTogether = [{}];
  documentsTogether.pop();
  documentsGet.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    documentsTogether.push({ id: doc.id, ...doc.data() });
  });

  return response.json(documentsTogether);
});

pessoasRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const document = await pessoasDB.doc(id).get();
  console.log('Document data:', document.data());
  const documentData = { id, ...document.data() };

  return response.json(documentData);
});

export default pessoasRouter;
