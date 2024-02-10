const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.static("views"))
app.use('/admin/activity', express.static("views"))
app.use('/admin/generate', express.static("views"))
app.use('/apply', express.static("views"))

app.set('view engine', 'ejs')

app.get('/', (req,res) =>{
    res.redirect("/home")
})

// admin router
const adminRouter = require('./routes/admin')
app.use('/admin', adminRouter)

// homepage router
const homeRouter = require('./routes/home') 
app.use('/home', homeRouter)

// login router
const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

// signup router
const signUpRouter = require('./routes/signUp')
app.use('/signUp', signUpRouter)

// profile router
const profileRouter = require('./routes/profile')
app.use('/profile', profileRouter)

// apply router

app.listen(3000)