import { Request, Response } from 'express'

import { AuthAPI } from '../datasources'

export interface EvalContext {
  req: Request
  res: Response
  payload?: {
    userId?: string
    orgId?: string
    adminId?: string
  }
  dataSources: {
    authAPI: AuthAPI
  }
}
