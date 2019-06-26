import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect.js';
import server from '../../server';
import { addUser, removeUser } from '../../test-helpers';
chai.use(chaiHttp);

describe('Budget', () => {
  const dummyBudget = {
    amount: 100000,
    startDate: '2019-06-24T22:38:03.486Z',
    endDate: '2019-07-24T22:38:03.486Z'
  };
  const dummyUser = {
    firstName: 'dummy',
    lastName: 'user',
    email: 'dummy@test.com',
    password: 'password1'
  };
  let token: string;
  let budgetId: string;

  before('create dummy user for operations', async () => {
    token = await addUser(dummyUser);
  });

  after('clear budget table and remove user', async () => {
    removeUser(dummyUser.email);
  });

  describe('Add - POST /budgets', () => {
    describe('Validations', () => {
      it('should handle unauthorized requests', done => {
        chai
          .request(server)
          .post('/api/budgets')
          .send(dummyBudget)
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('no token provided');
            done();
          });
      });

      it('should handle missing fields', done => {
        chai
          .request(server)
          .post('/api/budgets')
          .set('authorization', `Bearer ${token}`)
          .send()
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.amount.msg).to.be('amount field is required');
            expect(res.body.data.startDate.msg).to.be(
              'startDate field is required'
            );
            expect(res.body.data.endDate.msg).to.be(
              'endDate field is required'
            );
            done();
          });
      });

      it('should handle invalid fields', done => {
        chai
          .request(server)
          .post('/api/budgets')
          .set('authorization', `Bearer ${token}`)
          .send({
            amount: 'string',
            startDate: dummyBudget.startDate,
            endDate: dummyBudget.startDate
          })
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.amount.msg).to.be('amount must be a number');
            expect(res.body.data.endDate.msg).to.be(
              'endDate must be at least 1 month after startDate'
            );
            done();
          });
      });
    });

    it('user should not have current budget', done => {
      chai
        .request(server)
        .get('/api/budgets/current')
        .set('authorization', `Bearer ${token}`)
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('no current budget found');
          done();
        });
    });

    it('should create a budget successfully', done => {
      chai
        .request(server)
        .post('/api/budgets')
        .set('authorization', `Bearer ${token}`)
        .send(dummyBudget)
        .end((_, res) => {
          expect(res.status).to.be(201);
          expect(res.body.message).to.be('budget created successfully');
          expect(+res.body.data.amount).to.be(dummyBudget.amount);
          budgetId = res.body.data.id;
          done();
        });
    });

    it('should handle conflicts', done => {
      chai
        .request(server)
        .post('/api/budgets')
        .set('authorization', `Bearer ${token}`)
        .send(dummyBudget)
        .end((_, res) => {
          expect(res.status).to.be(409);
          expect(res.body.message).to.be('you already have a pending budget');
          done();
        });
    });
  });

  describe('View - GET /budgets/:id', () => {
    describe('Validations', () => {
      it('should handle unauthorized requests', done => {
        chai
          .request(server)
          .get('/api/budgets/' + budgetId)
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('no token provided');
            done();
          });
      });

      it('should handle invalid budget IDs', done => {
        chai
          .request(server)
          .get('/api/budgets/' + budgetId + 'error')
          .set('authorization', `Bearer ${token}`)
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.budgetId.msg).to.be(
              'budgetId must be a valid uuid'
            );
            done();
          });
      });
    });

    it('should retrieve a budget successfully', done => {
      chai
        .request(server)
        .get('/api/budgets/' + budgetId)
        .set('authorization', `Bearer ${token}`)
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('budget retrieved successfully');
          expect(res.body.data.id).to.be(budgetId);
          done();
        });
    });
  });

  describe('View all - GET /budgets', () => {
    describe('Validations', () => {
      it('should handle unauthorized requests', done => {
        chai
          .request(server)
          .get('/api/budgets')
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('no token provided');
            done();
          });
      });
    });

    it('should retrieve all budgets of a user successfully', done => {
      chai
        .request(server)
        .get('/api/budgets')
        .set('authorization', `Bearer ${token}`)
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be('all budgets retrieved successfully');
          expect(res.body.data.length).to.be(1);
          expect(res.body.data[0].id).to.be(budgetId);
          done();
        });
    });
  });

  describe('View current - GET /budgets/current', () => {
    describe('Validations', () => {
      it('should handle unauthorized requests', done => {
        chai
          .request(server)
          .get('/api/budgets/current')
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('no token provided');
            done();
          });
      });
    });

    it("should retrieve a user's current budget successfully", done => {
      chai
        .request(server)
        .get('/api/budgets/current')
        .set('authorization', `Bearer ${token}`)
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be(
            'current budget retrieved successfully'
          );
          expect(res.body.data.id).to.be(budgetId);
          done();
        });
    });
  });

  describe('Complete current - PUT /budgets/current', () => {
    describe('Validations', () => {
      it('should handle unauthorized requests', done => {
        chai
          .request(server)
          .put('/api/budgets/current')
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('no token provided');
            done();
          });
      });
    });

    it("should complete a user's current budget successfully", done => {
      chai
        .request(server)
        .put('/api/budgets/current')
        .set('authorization', `Bearer ${token}`)
        .end((_, res) => {
          expect(res.status).to.be(200);
          expect(res.body.message).to.be(
            'current budget completed successfully'
          );
          done();
        });
    });
  });
});
