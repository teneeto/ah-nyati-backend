import chai from 'chai';
import chaiHttp from 'chai-http';


import app from '../src/server';


chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe('Auth Controller', () => {
  const defaultUser = {
    userName: 'jamie',
    email: 'jamie.jane@gmail.com',
    password: 'password'
  };
  it(('should signup a user'), (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(defaultUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.message.should.be.a('string').eql('User signup successful');
        done();
      });
  });
  const existingUser = {
    email: 'jamie.jane@gmail.com',
    password: 'password'
  };
  it(('should login a user'), (done) => {
    chai.request(app).post('/api/v1/auth/login')
      .send(existingUser)
      .end((err, res) => {
        res.body.data.should.be.an('array');
        res.should.have.status(200);
        res.body.message.should.be.a('string').eql('User Login successful');
        done();
      });
  });
  it(('It should return invalid email or password'), (done) => {
    const newUser = { ...existingUser, email: 'pass..' };
    chai.request(app).post('/api/v1/auth/login')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.error.should.be.a('boolean').eql(true);
        res.body.message.should.be.a('string').eql('Invalid email or password');
        done();
      });
  });
  it(('It should return invalid email or password'), (done) => {
    const newUser = { ...existingUser, password: 'fakeuser@gmail.com' };
    chai.request(app).post('/api/v1/auth/login')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.error.should.be.a('boolean').eql(true);
        res.body.message.should.be.a('string').eql('Invalid email or password');
        done();
      });
  });

  it('should logout user successfully', (done) => {
    chai.request(app).post('/api/v1/auth/logout')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).equal('User successfully Logged Out');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
});
