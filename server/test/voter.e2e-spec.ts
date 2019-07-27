import * as request from 'supertest';

describe('Voters', () => {
  let token = '';
  const user = {
    id: null,
    username: 'testuser',
    password: 'password',
    constituencyId: null,
  };

  beforeAll(done => {
    request('')
      .post('http://localhost:4000/api/rest/users/login')
      .set('Accept', 'application/json')
      .send({
        username: user.username,
        password: user.password,
      })
      .then(res => {
        expect(res.status).toBe(201);
        expect(res.body.username).toBeDefined();
        expect(res.body.token).toBeDefined();
        token = res.body.token;
        done();
      });
  });

  it(`Get Users Constituency, Candidates In That Constituency & the Parties. (GET).`, done => {
    return request('')
      .get('http://localhost:4000/api/rest/users/constituency')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        expect(res).toBeTruthy();
        done();
      });
  });
});
