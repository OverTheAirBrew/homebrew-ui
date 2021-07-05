import { Application, Request, Response } from "express";
import next from 'next'
import {join} from 'path'

export function initUi(app: Application){
    const nextApp = next({
        dev: true,
        dir: join(__dirname, '..'),
      });

      const handler = nextApp.getRequestHandler();

      app.all(
        '*',
        (req: Request, res: Response) => {
          return handler(req, res);
        },
      );
}