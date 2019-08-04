import express from 'express';

export class AddActionValidator {
  static budgetId(request: express.Request) {
    request
      .checkBody('budgetId')
      .exists()
      .withMessage('budgetId field is required')
      .isUUID()
      .withMessage('budgetId must be a valid uuid');
  }

  static type(request: express.Request) {
    request
      .checkBody('type')
      .exists()
      .withMessage('type field is required')
      .isIn(['saving', 'cost'])
      .withMessage('type must be either saving or cost');
  }

  static amount(request: express.Request) {
    request
      .checkBody('amount')
      .exists()
      .withMessage('amount field is required')
      .trim()
      .notEmpty()
      .withMessage('amount field must not be empty')
      .custom((value: string) => !Number.isNaN(+value))
      .withMessage('amount must be a number');
  }

  static note(request: express.Request) {
    request
      .checkBody('note')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('note field must not be empty');
  }
}
