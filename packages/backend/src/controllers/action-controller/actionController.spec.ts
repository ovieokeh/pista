import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect.js';
import server from '../../server';
import { addUser, removeUser, addBudget } from '../../test-helpers';
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
  let budget;
  let dummyAction: any;

  before('create dummy user and budget for operations', async () => {
    token = await addUser(dummyUser);
    budget = await addBudget(dummyBudget, token);
    dummyAction = {
      budgetId: budget.id,
      type: 'cost',
      amount: 20000,
      note: 'a test action'
    };
  });

  after('clear budget table and remove user', async () => {
    removeUser(dummyUser.email);
  });

  describe('Add - POST /actions', () => {
    describe('Validations', () => {
      it('should handle unauthorized requests', done => {
        chai
          .request(server)
          .post('/api/actions')
          .send(dummyAction)
          .end((_, res) => {
            expect(res.status).to.be(401);
            expect(res.body.message).to.be('no token provided');
            done();
          });
      });

      it('should handle missing fields', done => {
        chai
          .request(server)
          .post('/api/actions')
          .set('authorization', `Bearer ${token}`)
          .send()
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.budgetId.msg).to.be(
              'budgetId field is required'
            );
            expect(res.body.data.type.msg).to.be('type field is required');
            expect(res.body.data.amount.msg).to.be('amount field is required');
            done();
          });
      });

      it('should handle invalid fields', done => {
        chai
          .request(server)
          .post('/api/actions')
          .set('authorization', `Bearer ${token}`)
          .send({
            budgetId: 5,
            type: 'expense',
            amount: 'string'
          })
          .end((_, res) => {
            expect(res.status).to.be(422);
            expect(res.body.message).to.be('validation error');
            expect(res.body.data.budgetId.msg).to.be(
              'budgetId must be a valid uuid'
            );
            expect(res.body.data.type.msg).to.be(
              'type must be either saving or cost'
            );
            expect(res.body.data.amount.msg).to.be('amount must be a number');
            done();
          });
      });
    });

    it('should create an action successfully', done => {
      chai
        .request(server)
        .post('/api/actions')
        .set('authorization', `Bearer ${token}`)
        .send(dummyAction)
        .end((_, res) => {
          expect(res.status).to.be(201);
          expect(res.body.message).to.be('action created successfully');
          expect(+res.body.data.amount).to.be(dummyAction.amount);
          done();
        });
    });
  });
});
