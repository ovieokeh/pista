import { Dispatch } from 'react';
import { History } from 'history';

export interface iProps {
  history: History;
  dispatch: Dispatch;
  auth: any;
}

export interface iState {
  amount: string;
  amountErrors: string;
  startDate: Date | undefined;
  startDateErrors: string;
  endDate: Date | undefined;
  endDateErrors: string;
  isLoading: boolean;
  success: boolean;
  [x: string]: any;
}
