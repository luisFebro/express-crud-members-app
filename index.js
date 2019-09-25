const express = require("express");
const path = require("path");
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members');
//init express
const app = express();

//Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


//BODY PARSER MIDDLEWARES
//json
app.use(express.json());
// form submissions
app.use(express.urlencoded({ extended: false }))


// Homepage Route
app.get('/', (req, res) =>
    res.render('index', {
        title: 'Members: App',
        members
    })
);

// Instead of this, create a static folder
// app.get('/', (req, res) => {
//     // res.writeHeader(200, {'Content-Type': 'text/html'})
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })
// Set a static folder [any files inside of it is loaded properly with their respective headers]
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes - we don't need /api/members in the required path below. Replaced to a slash only
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));