import chai from 'chai';
import chaiHttp from 'chai-http';
import path from 'path';
import app from '../src/server';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

let token;

describe('UserController', () => {
  it('should login user successfully', (done) => {
    const user = {
      email: 'john.doe@andela.com',
      password: 'password',
    };
    chai.request(app).get('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        token = res.body.data;
        res.should.have.status(200);
        expect(res.body.message).equal('User successfully Logged In');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status');
        done();
      });
  });

  it('should enable user create and update profile', (done) => {
    chai.request(app).put('/api/v1/user')
      .send({
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@andela.com',
        bio: 'This is a test bio',
        username: 'JohnDoe',
      })
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.user.firstname).equal('John');
        expect(res.body.user.lastname).equal('Doe');
        expect(res.body.user.email).equal('john.doe@andela.com');
        expect(res.body.user.bio).equal('This is a test bio');
        expect(res.body.user.username).equal('JohnDoe');
        done();
      });
  });

  it('should enable user create and update profile', (done) => {
    chai.request(app).put('/api/v1/user')
      .attach('avatar', path.join(__dirname, 'img/test.png'), 'test.png')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return the right error messages', (done) => {
    chai.request(app).put('/api/v1/user')
      .send({
        firstname: 'John1',
        lastname: 'Doe2',
        email: 'john.doeandela.com',
        bio: 'This is a test bio This is a test bio This is a test bio This is a test bio This is a test bio This is a test bio This is a test bio This is a test bio',
      })
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.errors[0]).equal('First name can only contain letters');
        expect(res.body.errors[1]).equal('Last name can only contain letters');
        expect(res.body.errors[2]).equal('Input a valid email address');
        expect(res.body.errors[3]).equal('Bio cannot exceed 150 characters');
        done();
      });
  });
});
