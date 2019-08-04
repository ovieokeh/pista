import express from 'express';

export class SignupValidator {
  static firstName(request: express.Request) {
    request
      .checkBody('firstName')
      .exists()
      .withMessage('First Name field is required')
      .trim()
      .notEmpty()
      .withMessage('First Name field is required')
      .isLength({ min: 2 })
      .withMessage('First Name must be longer than 2 characters')
      .matches(/^[A-Za-z ]+$/)
      .withMessage('First Name must contain only letters and spaces');
  }

  static lastName(request: express.Request) {
    request
      .checkBody('lastName')
      .exists()
      .withMessage('Last Name field is required')
      .trim()
      .notEmpty()
      .withMessage('Last Name field is required')
      .isLength({ min: 2 })
      .withMessage('Last Name must be longer than 2 characters')
      .matches(/^[A-Za-z ]+$/)
      .withMessage('Last Name must contain only letters and spaces');
  }

  static email(request: express.Request) {
    request
      .checkBody('email')
      .exists()
      .withMessage('Email field is required')
      .trim()
      .notEmpty()
      .withMessage('Email field is required')
      .isEmail()
      .normalizeEmail()
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
      .withMessage('Password must be longer than 6 characters')
      .matches(/\d/)
      .withMessage('Password must contain a number');
  }
}
