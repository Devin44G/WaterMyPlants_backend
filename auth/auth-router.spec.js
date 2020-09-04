const request = require('supertest');
const auth = require('../api/server.js');

// DEFINING TEST VARS
function numGenerator() {
  let num = Math.random() * 1000;
  return num;
}

const unfinishedReg = {
  username: 'BillBobThorton',
  password: 'unfinished'
};

const testUser = {
  username: `testUser.${numGenerator()}`,
  password: 'pass'
};

const registered = {
  username: 'TheBlob',
  password: 'thegreatblob'
};


describe('auth-router.js', () => {
// REGISTER TESTS
  describe('POST / => REGISTRATION ENDPOINT', () => {
    it('should return a status 500 when NO input is given', () => {
      return request(auth)
        .post('/api/auth/register')
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
    it('should return a status 404 when NOT ALL required inputs are entered', () => {
      return request(auth)
        .post('/api/auth/register')
        .send(unfinishedReg)
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
    it('should return a status 200 when ALL required inputs are entered', () => {
      return request(auth)
        .post('/api/auth/register')
        .send(testUser)
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });
// LOGIN TESTS
  describe('POST / => LOGIN ENDPOINT', () => {
    it('should return a status 401 when INVALID credentials are given', () => {
      return request(auth)
        .post('/api/auth/login')
        .send(unfinishedReg)
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
    it('should return a status 200 when VALID credentials are given', () => {
      return request(auth)
        .post('/api/auth/login')
        .send(registered)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it('should return token when user logs in', () => {
      return request(auth)
        .post('/api/auth/login')
        .send(registered)
        .then(res => {
          expect(res.body).toHaveProperty('token');
        });
    });
  });
});
