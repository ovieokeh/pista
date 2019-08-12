import 'express-validator';
import express from 'express';

declare module 'express-validator' {
  interface Validator {
    custom(callback: Function): Validator;
  }
}

function addMonths(dateString: string, months: number): Date {
  const date = new Date(dateString);
  const dateMonth = date.getDate();

  date.setMonth(date.getMonth() + months);
  if (date.getDate() != dateMonth) {
    date.setDate(0);
  }

  return date;
}

export class AddBudgetValidator {
  static amount(request: express.Request) {
    request
      .checkBody('amount')
      .exists()
      .withMessage('amount field is required')
      .trim()
      .notEmpty()
      .withMessage('amount field must not be empty')
      .custom((value: string) => !Number.isNaN(+value))
      .withMessage('amount must be a number')
      .custom((val: string) => +val > 9999)
      .withMessage('amount must be greater than 9999');
  }

  static startDate(request: express.Request) {
    request
      .checkBody('startDate')
      .exists()
      .withMessage('startDate field is required')
      .trim()
      .notEmpty()
      .isISO8601()
      .withMessage('startDate must be a valid ISO8601 date');
  }

  static endDate(request: express.Request) {
    const nextMonth = addMonths(request.body.startDate, 1);
    const endDate = new Date(request.body.endDate);

    request
      .checkBody('endDate')
      .exists()
      .withMessage('endDate field is required')
      .trim()
      .notEmpty()
      .isISO8601()
      .withMessage('endDate must be a valid ISO8601 date')
      .custom(() => nextMonth <= endDate)
      .withMessage('endDate must be at least 1 month after startDate');
  }
}
