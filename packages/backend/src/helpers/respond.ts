import * as express from 'express';

export function respond(
  res: express.Response,
  status: string,
  code: number,
  message: string,
  data: any = undefined
): void {
  res.status(code).json({
    status,
    message,
    data
  });
}
