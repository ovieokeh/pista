import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect.js';
import server from '../../server';
import { removeUser } from '../../test-helpers';

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
              'First Name field is required'
            );
            expect(res.body.data.lastName.msg).to.be(
              'Last Name field is required'
            );
            expect(res.body.data.email.msg).to.be('Email field is required');
            expect(res.body.data.password.msg).to.be(
              'Password field is required'
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
            expect(res.body.data.email.msg).to.be('Email address is invalid');
            expect(res.body.data.password.msg).to.be(
              'Password must contain a number'
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
          expect(res.body.message).to.be('Email address already in use');
          done();
        });
    });
  });

  describe('Login - POST /login', () => {
    after('user table cleanup', () => {
      removeUser(dummyUser.email);
    });

    describe('Validations', () => {
      it('should handle missing fields', done => {
        chai
          .request(server)
          .post('/api/login')
          .send()
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.email.msg).to.be('Email field is required');
            expect(res.body.data.password.msg).to.be(
              'Password field is required'
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
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.email.msg).to.be('Email address is invalid');
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
          expect(res.body.message).to.be('Invalid login credentials');
          done();
        });
    });
  });
});
