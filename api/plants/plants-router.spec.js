const request = require('supertest');
const server = require('../server.js');

// DEFINING TEST VARS
const registered = {
  username: 'TheBlob',
  password: 'thegreatblob'
};

const newPlant = {
  nickname: 'Rosey',
  species: 'Rosicus',
  h2o_frequency: 'Once Weekly'
};

// TESTING ENDPOINTS
describe('users-router.js', () => {
// GET PLANTS
  describe('GET /', () => {
    it('should return a status 200 when logged in user gets plants', () => {
     return request(server)
       .post('/api/auth/login')
       .send(registered)
       .then(res => {
         return request(server)
           .get('/api/plants')
           .set('authorization', res.body.token)
           .then(res => {
             expect(res.status).toBe(200);
           });
       });
   });
   it('should return CONTENT-TYPE as JSON', () => {
     return request(server)
       .get('/api/plants')
       .expect('CONTENT-TYPE', /json/i);
   });
  });
// GET PLANT BY
  describe('GET /:id', () => {
    it('should return a status 500 when plant with specified ID is not found', () => {
     return request(server)
       .post('/api/auth/login')
       .send(registered)
       .then(res => {
         return request(server)
           .get('/api/plants/100')
           .set('authorization', res.body.token)
           .then(res => {
             expect(res.status).toBe(500);
           });
       });
   });
  });
// ADD PLANT
  describe('POST /', () => {
    it('should return a status 400 when plant is added without setting the user_id', () => {
     return request(server)
       .post('/api/plants')
       .send(newPlant)
       .then(res => {
         expect(res.status).toBe(400);
       });
   });
  });
});
