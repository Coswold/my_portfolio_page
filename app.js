const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/portfolio');

const Testimonial = mongoose.model('Testimonial', {
  name: String,
  description: String
});

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

// TESTIMONIAL
app.get('/testimonial', (req, res) => {
  Testimonial.find()
    .then(testimonial => {
      res.render('testimonials', { testimonial: testimonial });
    })
    .catch(err => {
      console.log(err);
    })
})


// NEW
app.get('/testimonials/new', (req, res) => {
    res.render('testimonials-new', {})
})

// SHOW
app.get('/testimonials/:id', (req, res) => {
    Testimonial.findById(req.params.id)
    .then(testimonial => {
        res.render('testimonials-show', { testimonial: testimonial });
    })
    .catch(err => {
        console.log(err);
    })
});


// CREATE
app.post('/testimonial/create', (req, res) => {
    console.log(req.body)
    Testimonial.create(req.body).then((testimonial) => {
        console.log(testimonial);
        res.redirect(`/testimonial`)
    }).catch((err) => {
        console.log(err.message)
    })
    // res.render('reviews-new', {});
})

// EDIT
app.get('/testimonials/:id/edit', (req, res) => {
    Testimonial.findById(req.params.id, function(err, testimonial) {
        res.render('testimonials-edit', { testimonial: testimonial })
    })
})

// UPDATE
app.put('/testimonials/:id', (req, res) => {
    Testimonial.findByIdAndUpdate(req.params.id, req.body).then(testimonial => {
        res.redirect(`/testimonials/${testimonial._id}`)
    })
    .catch(err => {
        console.log(err.message)
    })
})

// DELETE
app.delete('/testimonials/:id', function (req, res) {
  console.log("DELETE testimonial")
  Testimonial.findByIdAndRemove(req.params.id).then((testimonial) => {
    res.redirect('/testimonial');
  }).catch((err) => {
    console.log(err.message);
  })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
