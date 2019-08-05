import express from 'express';

export class LoginValidator {
  static email(request: express.Request) {
    request
      .checkBody('email')
      .exists()
      .withMessage('Email field is required')
      .trim()
      .notEmpty()
      .withMessage('Email field is required')
      .isEmail()
      .withMessage('Email address is invalid');
  }

  static password(request: express.Request) {
    request
      .checkBody('password')
      .exists()
      .withMessage('Password field is required')
      .trim()
      .notEmpty()
      .withMessage('Password field is required')
      .isLength({ min: 6 })
      .withMessage('password must be longer than 6 characters');
  }
}
