import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect.js';
import { UserModel } from '../../database/models/UserModel';
import server from '../../server';
chai.use(chaiHttp);

describe('User', () => {
  const dummyUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'user@test.com',
    password: 'password1',
    avatarUrl: 'avatar.gif'
  };

  describe('Signup - POST /signup', () => {
    describe('Validations', () => {
      it('should handle missing fields', done => {
        chai
          .request(server)
          .post('/api/signup')
          .send()
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.firstName.msg).to.be(
              'firstName field is required'
            );
            expect(res.body.data.lastName.msg).to.be(
              'lastName field is required'
            );
            expect(res.body.data.email.msg).to.be('email field is required');
            expect(res.body.data.password.msg).to.be(
              'password field is required'
            );
            done();
          });
      });

      it('should handle invalid fields', done => {
        chai
          .request(server)
          .post('/api/signup')
          .send({
            ...dummyUser,
            email: 'error@',
            password: 'invalid'
          })
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.email.msg).to.be('email address is invalid');
            expect(res.body.data.password.msg).to.be(
              'password must contain a number'
            );
            done();
          });
      });
    });

    it('should handle signup a user successfully', done => {
      chai
        .request(server)
        .post('/api/signup')
        .send(dummyUser)
        .end((_, res) => {
          expect(res.status).to.be(201);
          expect(res.body.message).to.be('signup successful');
          expect(res.body.data.user.firstName).to.be(dummyUser.firstName);
          expect(res.body.data.user.lastName).to.be(dummyUser.lastName);
          expect(res.body.data.user.email).to.be(dummyUser.email);
          expect(res.body.data.user.avatarUrl).to.be(dummyUser.avatarUrl);
          expect(res.body.data.user.password).to.be(undefined);
          done();
        });
    });

    it('should handle signup conflicts', done => {
      chai
        .request(server)
        .post('/api/signup')
        .send(dummyUser)
        .end((_, res) => {
          expect(res.status).to.be(409);
          expect(res.body.message).to.be('email already in use');
          done();
        });
    });
  });

  describe('Login - POST /login', () => {
    after('user table cleanup', () => {
      UserModel.destroy({ where: { email: dummyUser.email } });
    });

    describe('Validations', () => {
      it('should handle missing fields', done => {
        chai
          .request(server)
          .post('/api/login')
          .send()
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('login unsuccessful');
            expect(res.body.data.email.msg).to.be('email field is required');
            expect(res.body.data.password.msg).to.be(
              'password field is required'
            );
            done();
          });
      });

      it('should handle invalid fields', done => {
        chai
          .request(server)
          .post('/api/login')
          .send({
            email: 'error@',
            password: 'invalid'
          })
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('login unsuccessful');
            expect(res.body.data.email.msg).to.be('email address is invalid');
            done();
          });
      });
    });

    it('should handle login a user successfully', done => {
      chai
        .request(server)
        .post('/api/login')
        .send({
          email: dummyUser.email,
          password: dummyUser.password
        })
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('login successful');
          expect(res.body.data.token).to.be.a('string');
          done();
        });
    });

    it('should handle invalid credentials', done => {
      chai
        .request(server)
        .post('/api/login')
        .send({
          email: dummyUser.email,
          password: 'wrongpassword'
        })
        .end((_, res) => {
          expect(res.status).to.be(401);
          expect(res.body.message).to.be('invalid login credentials');
          done();
        });
    });
  });
});
