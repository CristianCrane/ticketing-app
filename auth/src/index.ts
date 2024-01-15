import express from 'express'
import {json} from 'body-parser'
import {currentUserRouter} from "./routes/current-user";
import {signUpRouter} from "./routes/sign-up";
import {signInRouter} from "./routes/sign-in";
import {signOutRouter} from "./routes/sign-out";

const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)

app.listen(3000, () => {
  console.log('Listening on port 3000')
})