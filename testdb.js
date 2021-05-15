const mongoose = require('mongoose');
mongoose.connect('mongodb://p9p4-mongo:27017/p9p4', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Conectado por fin");
  const Room = mongoose.model('salas', { name: String });

    const room1 = new Room({ name: 'Cielo' });
    room1.save().then(() => console.log('a jugar'));
});


