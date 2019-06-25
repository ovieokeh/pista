import express from 'express';

export class SignupValidator {
  static firstName(request: express.Request) {
    request
      .checkBody('firstName')
      .exists()
      .withMessage('firstName field is required')
      .trim()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage('firstName must be longer than 2 characters')
      .matches(/^[A-Za-z ]+$/)
      .withMessage('firstName must contain only letters and spaces');
  }

  static lastName(request: express.Request) {
    request
      .checkBody('lastName')
      .exists()
      .withMessage('lastName field is required')
      .trim()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage('lastName must be longer than 2 characters')
      .matches(/^[A-Za-z ]+$/)
      .withMessage('lastName must contain only letters and spaces');
  }

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
      .withMessage('password must be longer than 6 characters')
      .matches(/\d/)
      .withMessage('password must contain a number');
  }
}
