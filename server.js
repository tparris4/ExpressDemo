var express = require('express');
var app = express()
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = Promise;

var dbUrl = 'mongodb+srv://tparris:wisdom321@cluster0.tgm64.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

var Message = mongoose.model(`Message `, {
  name: String,
  message: String
})

// var messages = [
//   {
//     name: 'Tim',
//     message: 'Hi'
//   },
//   {
//     name: 'Jane',
//     message: 'Hello'
//   },
// ]

app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {

    res.send(messages);
  })
});

app.get('/messages/:user', (req, res) => {
  Message.find({}, (err, messages) => {

    res.send(messages);
  })
});

app.post('/messages', async (req, res) => {

  try {

    var message = new Message(req.body);

    var savedMessage = await message.save();

    console.log('saved')

    var censored = await Message.findOne({ message: 'badword' });

    if (censored) {
      await Message.remove({ _id: censored.id })
    }
    else {
      io.emit('message', req.body);
    }
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    return console.error(error);
  }
  finally {
    //logger.log('message post called');
    console.log('Message post called');
  }



  //   .catch ((err) => {
  //   res.sendStatus(500);
  //   return console.error(err);
  // })



  //   // messages.push(req.body);
  //   io.emit('message', req.body);
  //   res.sendStatus(200);
  // })




});

io.on('connection', (socket) => {
  console.log('user connection');
});

mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
  console.log('connected', err);
});

var server = http.listen(3000, () => {
  console.log('server is listening on port ', server.address().port);
});