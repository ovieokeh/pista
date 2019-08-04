import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);
import { UserModel } from '../database/models/UserModel';
import { iBudget } from '../database/models/BudgetModel';

export async function addUser(details: any): Promise<string> {
  let token: string;

  await chai
    .request(server)
    .post('/api/signup')
    .send(details)
    .then(res => {
      token = res.body.data.token;
    });

  return token;
}

export async function removeUser(email: string): Promise<void> {
  await UserModel.destroy({ where: { email } });
}

export async function addBudget(
  dummyBudget: any,
  token: string
): Promise<iBudget> {
  let budget: iBudget;

  await chai
    .request(server)
    .post('/api/budgets')
    .set('authorization', `Bearer ${token}`)
    .send(dummyBudget)
    .then(res => {
      budget = res.body.data;
    });

  return budget;
}
