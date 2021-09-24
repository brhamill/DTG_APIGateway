import express from 'express'

import { signupRouter } from './routes'

export const app = express()

app.use(express.json())

app.use('/v1/auth', signupRouter)
