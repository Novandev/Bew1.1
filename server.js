const app = require('express')();

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




// Routes
require('./controllers/movies')(app);

app.listen('3000',()=>{
  console.log("listening on port 3000")
})
