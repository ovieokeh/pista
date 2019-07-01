import {
  BUDGET_BEGIN,
  BUDGET_CREATED,
  BUDGET_ERROR,
  BudgetTypes,
  BudgetState
} from '../types';

const initialState: BudgetState = {
  budget: null,
  loading: false,
  error: null
};

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
      return { ...state };
    }
  }
}
