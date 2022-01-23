import { z } from 'zod'
const email = z.string().email({ message: 'Invalid email address' }).transform((str) => str.toLowerCase().trim())

const firstname = z.string().nonempty({ message: 'firstname is required' }).transform((str) => str.toLowerCase().trim())
const lastname = z.string().nonempty({ message: 'lastname is required' }).transform((str) => str.toLowerCase().trim())

const password = z
  .string()
  .regex(new RegExp('.*[A-Z].*'), ' Must contain at least one uppercase character')
  .regex(new RegExp('.*[a-z].*'), ' Must contain at least one lowercase character')
  .regex(new RegExp('.*\\d.*'), 'Must have at least one number')
  .regex(
    new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
    'Must contain at least one special character'
  )
  .min(8, 'Must be at least 8 characters in length')

const Signup = z.object({
  email,
  password,
  firstname,
  lastname
})

const Login = z.object({
  email,
  password: password
})

const ForgotPassword = z.object({
  email
})

const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string()
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'] // set the path of the error
  })

const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password
})
const WriteReview = z.object({
  title: z.string().transform((str) => str.toLowerCase().trim()),
  content: z.string().min(200).transform((str) => str.toLowerCase().trim()),
  realtorsId: z.string()
})
const EditReview = z.object({
  title: z.string().transform((str) => str.toLowerCase().trim()),
  content: z.string().min(200).transform((str) => str.toLowerCase().trim())
})
const WriteComment = z.object({
  content: z.string().min(200).transform((str) => str.toLowerCase().trim()),
  reviewId: z.string()
})
export {
  Signup,
  Login,
  ForgotPassword,
  ResetPassword,
  ChangePassword,
  WriteReview,
  EditReview,
  WriteComment

}
