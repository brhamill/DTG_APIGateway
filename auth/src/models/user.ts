import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'
import { v4 as uuid } from 'uuid'

interface UserAttrs {
  email: string
}

interface UserDoc extends mongoose.Document {
  _id: string
  organizationId?: string
  firstName?: string
  lastName?: string
  email: string
  passwordHash?: string
  isActive: boolean
  isVerified: boolean
  verifyToken?: string
  passwordToken?: string
  lastLoggedIn?: Date
  createdById?: string
  updatedById?: string
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    _id: {
      type: String,
      default: uuid,
      required: true,
    },
    organizationId: String,
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: String,
    isActive: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: String,
    passwordToken: String,
    lastLoggedIn: {
      type: Date,
    },
    createdById: {
      type: String,
    },
    updatedById: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.passwordHash
        delete ret.verifyToken
        delete ret.passwordToken
      },
    },
    timestamps: true,
  }
)
userSchema.set('versionKey', 'version')
userSchema.plugin(updateIfCurrentPlugin)

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
