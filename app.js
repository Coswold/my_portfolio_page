const express = require('express')
const app = express()
const path = require('path')

var exphbs = require('express-handlebars')

app.use(express.static(path.join(__dirname, '/public')))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// INDEX
app.get('/', (req, res) => {
  res.render('home')
})

// ABOUT
app.get('/about', (req, res) => {
  res.render('about')
})

// GALLERY
app.get('/gallery', (req, res) => {
  res.render('gallery')
})

// BLOG
app.get('/blog', (req, res) => {
  res.render('blog')
})

// CONTACT
app.get('/contact', (req, res) => {
  res.render('contact')
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
