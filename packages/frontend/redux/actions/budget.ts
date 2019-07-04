import Axios, { AxiosRequestConfig } from 'axios';
import { Dispatch } from 'redux';
import {
  BUDGET_BEGIN,
  BUDGET_CREATED,
  BUDGET_ERROR,
  Budget,
  BudgetDetails,
  BudgetTypes
} from '../types';

// ==================== Budget action creators ====================
const budgetBegin = (): BudgetTypes => ({ type: BUDGET_BEGIN });
const budgetCreated = (budget: Budget): BudgetTypes => ({
  type: BUDGET_CREATED,
  budget
});
const budgetError = (error: any): BudgetTypes => ({
  type: BUDGET_ERROR,
  error
});

// ==================== Async requests ====================
export const budgetRequest = (budgetDetails: BudgetDetails) => async (
  dispatch: Dispatch,
  getState: Function
) => {
  const url = `${process.env.REACT_APP_API_URL}/budgets`;
  const { token } = getState().auth;
  const headers: AxiosRequestConfig = {
    headers: { authorization: `Bearer ${token}` }
  };

  try {
    dispatch(budgetBegin());

    const response = await Axios.post(url, budgetDetails, headers);
    dispatch(budgetCreated(response.data.data));
  } catch (error) {
    dispatch(budgetError(error.response.data));
  }
};
