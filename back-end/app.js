require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use('/static', express.static('public')) // load the files that are in the public directory from the /static path prefix

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

app.get('/aboutus/content', async (req, res) => {
  try {
    res.json({
      image: '/static/images/myself.jpg',
      text: [
        'Hi, I am r8btx!\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci a scelerisque purus semper eget duis at. Integer malesuada nunc vel risus commodo viverra maecenas. Eget sit amet tellus cras adipiscing. Proin sed libero enim sed faucibus. Eu volutpat odio facilisis mauris sit amet massa vitae. Tristique risus nec feugiat in fermentum posuere urna nec. Eu scelerisque felis imperdiet proin fermentum leo vel. Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Eu ultrices vitae auctor eu augue. Eget nunc lobortis mattis aliquam faucibus purus in massa. Fames ac turpis egestas integer eget aliquet. Molestie a iaculis at erat pellentesque adipiscing commodo elit.',
        'Pharetra sit amet aliquam id diam maecenas ultricies mi. Adipiscing bibendum est ultricies integer quis auctor elit sed. Posuere sollicitudin aliquam ultrices sagittis. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Eget est lorem ipsum dolor sit amet consectetur adipiscing elit. In aliquam sem fringilla ut. Enim sit amet venenatis urna cursus eget nunc. Libero justo laoreet sit amet cursus. Sagittis vitae et leo duis ut diam quam. Vulputate enim nulla aliquet porttitor lacus. Nisl rhoncus mattis rhoncus urna neque viverra justo nec. Tristique risus nec feugiat in fermentum posuere urna nec tincidunt.',
      ],
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err,
      status: 'failed to fetch the page contents',
    })
  }
})

// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
