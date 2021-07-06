const mongoose = require('mongoose');
const supertest = require('supertest');
const { app, server } = require('../src/index');
const users = require('./users.json');
const User = require('../src/models/user.model');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  for (let u in users) {
    const user = users[u];
    const newUser = new User(user);
    newUser.password = await newUser.encryptPassword(user.password);
    await newUser.save();
  }
});

describe('Verificando ruta de /add-user', () => {
  test('Agregando usuario', async () => {
    const user = {
      username: 'Ricardo',
      email: 'ricardo@gmail.com',
      password: 'desterrado24',
    };
    await api
      .post('/api/users/add-user')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });
  test('Comprobando email repetido', async () => {
    const user = {
      username: 'Ricardo',
      email: 'brianR@live.com',
      password: 'desterrado24',
    };
    await api
      .post('/api/users/add-user')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
  test('Comprobando eficacia de JOI', async () => {
    const user = {
      username: 'Ricardo',
      email: 'brianRlive.com',
      password: 'desterrado24',
    };
    await api
      .post('/api/users/add-user')
      .send(user)
      .expect(422)
      .expect('Content-Type', /application\/json/);
  });
});

describe('Verificando ruta de /add-user', () => {
  let token;
  test('Login', async () => {
    const user = {
      email: 'luchi98@hotmail.com',
      password: 'lu28s@dsa',
    };
    await api
      .post('/api/users/login')
      .send(user)
      .expect(202)
      .expect('Content-Type', /application\/json/)
      .expect(function (res) {
        token = res.body.token;
      });
  });
  test('authenticate', async () => {
    console.log(token);
    await api
      .post('/api/users/auth')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
