import { MiddlewareFn } from 'type-graphql'

import { EvalContext } from '../contexts'

export const getAdmin: MiddlewareFn<EvalContext> = async (
  { context },
  next
) => {
  if (!context.payload) {
    context.payload = {
      adminId: '123',
      userId: '456',
      orgId: '789',
    }
  } else {
    context.payload.adminId = '123'
    context.payload.userId = '456'
    context.payload.orgId = '789'
  }

  return next
}
