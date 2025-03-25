// Import Express
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');


// Import Controllers
const authRouter = require('./controllers/auth')
const usersRouter = require('./controllers/users')
const parksRouter = require('./controllers/parks')
const proposalsRouter =require('./controllers/proposals')
const feedbacksRouter =require('./controllers/feedbacks')
const mailingListRouter = require('./controllers/mailingList')
// Middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Define routes here (we'll add them soon)

app.use('/users', usersRouter);
app.use('/auth', authRouter)
app.use('/parks', parksRouter)
app.use('/parks', proposalsRouter)
app.use('/parks', feedbacksRouter)
app.use('/parks', mailingListRouter)
// app.use('/', (req, res)=>
// {
//     res.json('hello world')
// });


// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
  })  