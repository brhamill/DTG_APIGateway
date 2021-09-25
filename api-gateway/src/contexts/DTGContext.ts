import { Request, Response } from 'express'

import { AuthAPI } from '../datasources'

export interface DTGContext {
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
