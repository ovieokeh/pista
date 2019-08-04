import express from 'express';

export class LoginValidator {
  static email(request: express.Request) {
    request
      .checkBody('email')
      .exists()
      .withMessage('email field is required')
      .trim()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage('email address is invalid');
  }

  static password(request: express.Request) {
    request
      .checkBody('password')
      .exists()
      .withMessage('password field is required')
      .trim()
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage('password must be longer than 6 characters');
  }
}
