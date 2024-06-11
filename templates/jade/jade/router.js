var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test', { title: 'jade tutorial' ,youAreUsingJade: true});
});

router.get('/attributes', function(req, res, next) {
  res.render('attributes', { 
    title: 'attributes tutorial',
    authenticated : true,
    classes : ['foo', 'bar', 'baz'],
    currentUrl : '/about',
    attributes : {'data-foo': 'bar'},

  });
});

router.get('/code', function(req, res, next) {
  res.render('code', { title: 'code tutorial' });
});

router.get('/conditionals', function(req, res, next) {
  res.render('conditionals', { 
    title: 'conditionals tutorial',
    user : { description: 'foo bar baz',isAnonymous: false, name: 'John Doe' },
    authorised : false ,
  
  });
});

router.get('/doctype', function(req, res, next) {
  res.render('doctype', { title: 'doctype tutorial' });
});

router.get('/extends', function(req, res, next) {
  res.render('extends', { title: 'extends tutorial' });
});

router.get('/include', function(req, res, next) {
  res.render('include', { title: 'include tutorial' });
});
router.get('/iteration', (req, res) => {
  res.render('iteration', { title: 'iteration ' });
});

router.get('/mixins', (req, res) => {
  res.render('mixins', { title: 'mixins ' });
});

module.exports = router;
