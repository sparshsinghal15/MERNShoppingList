const express = require('express'),
      mongoose = require('mongoose'),
      path = require('path'),
      cors = require('cors'),
      config = require('config'),
      app = express();

const indexRoute = require('./routes/api/items.routes'),
      userRoute = require('./routes/api/users.routes'),
      authRoute = require('./routes/api/auth.routes')

app.use(cors())

app.use(express.json());
const db = config.get('mongoURI')

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {console.log('MongoDB connected')})
    .catch((err) => {console.log(err)})

app.use('/api/items' ,indexRoute)
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)

// serve static products if in production
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const port = process.env.PORT || 5000
app.listen(port, () => {console.log(`Server has started on port ${port}`)} )