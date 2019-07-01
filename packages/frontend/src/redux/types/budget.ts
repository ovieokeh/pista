export const BUDGET_BEGIN = 'BUDGET_BEGIN';
export const BUDGET_CREATED = 'BUDGET_CREATED';
export const BUDGET_ERROR = 'BUDGET_ERROR';

export interface BudgetDetails {
  amount: number;
  startDate: Date;
  endDate: Date;

  [propName: string]: any;
}

export interface Budget {
  id: string;
  amount: string;
  startDate: Date;
  endDate: Date;
  completed: boolean;
  actions?: any[];
}

interface BudgetBegin {
  type: typeof BUDGET_BEGIN;
}

interface BudgetCreated {
  type: typeof BUDGET_CREATED;
  budget: Budget;
}

interface BudgetError {
  type: typeof BUDGET_ERROR;
  error: any;
}

export interface BudgetState {
  budget: Budget | null;
  error: any;
  loading: boolean;
}

export type BudgetTypes = BudgetBegin | BudgetCreated | BudgetError;
