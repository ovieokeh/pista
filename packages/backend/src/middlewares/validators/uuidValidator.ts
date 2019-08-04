import express from 'express';

export function validateUUID(id: string, request: express.Request) {
  request
    .checkParams(id)
    .isUUID()
    .withMessage(id + ' must be a valid uuid');
}
