import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '@dtgtickets/common'

import { User } from '../models/user'

const router = express.Router()

router.post(
  '/signup',
  [body('email').isEmail().withMessage('Email address is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body

    const user = User.build({ email })

    await user.save()

    res.status(201).json(email)
  }
)

export { router as signupRouter }
