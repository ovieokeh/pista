import {
  BUDGET_BEGIN,
  BUDGET_CREATED,
  BUDGET_ERROR,
  BudgetTypes,
  BudgetState,
  AuthState
} from '../types';

export interface iState {
  auth: AuthState;
  budget: BudgetState;
}
const baseState: iState = {
  auth: {
    error: null,
    loading: false,
    user: null,
    token: ''
  },
  budget: {
    budget: null,
    loading: false,
    error: null
  }
};

const initialState: BudgetState = baseState.budget;

export function budgetReducer(
  state = initialState,
  action: BudgetTypes
): BudgetState {
  switch (action.type) {
    case BUDGET_BEGIN: {
      return {
        ...state,
        budget: null,
        loading: true,
        error: null
      };
    }

    case BUDGET_CREATED: {
      return {
        ...state,
        budget: action.budget,
        loading: false,
        error: null
      };
    }

    case BUDGET_ERROR: {
      return {
        ...state,
        budget: null,
        loading: false,
        error: action.error
      };
    }

    default: {
      return state;
    }
  }
}
