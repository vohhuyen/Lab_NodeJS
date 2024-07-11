var express = require('express');
var { Todo, User } = require('../models');

async function fetchTodos(req, res, next) {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    res.locals.todos = todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      url: '/' + todo.id
    }));
    res.locals.activeCount = todos.filter(todo => !todo.completed).length;
    res.locals.completedCount = todos.length - res.locals.activeCount;
    next();
  } catch (err) {
    next(err);
  }
}

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.user) { return res.render('home'); }
  next();
}, fetchTodos, function(req, res, next) {
  res.locals.filter = null;
  res.render('index', { user: req.user });
});

router.get('/active', fetchTodos, function(req, res, next) {
  res.locals.todos = res.locals.todos.filter(todo => !todo.completed);
  res.locals.filter = 'active';
  res.render('index', { user: req.user });
});

router.get('/completed', fetchTodos, function(req, res, next) {
  res.locals.todos = res.locals.todos.filter(todo => todo.completed);
  res.locals.filter = 'completed';
  res.render('index', { user: req.user });
});

router.post('/', async function(req, res, next) {
  try {
    req.body.title = req.body.title.trim();
    if (req.body.title !== '') {
      await Todo.create({
        title: req.body.title,
        completed: req.body.completed === true,
        userId: req.user.id
      });
    }
    res.redirect('/' + (req.body.filter || ''));
  } catch (err) {
    next(err);
  }
});

router.post('/:id(\\d+)', async function(req, res, next) {
  try {
    req.body.title = req.body.title.trim();
    if (req.body.title !== '') {
      await Todo.update(
        {
          title: req.body.title,
          completed: req.body.completed !== undefined ? true : false
        },
        { where: { id: req.params.id, userId: req.user.id } }
      );
    } else {
      await Todo.destroy({ where: { id: req.params.id, userId: req.user.id } });
    }
    res.redirect('/' + (req.body.filter || ''));
  } catch (err) {
    next(err);
  }
});

router.post('/:id(\\d+)/delete', async function(req, res, next) {
  try {
    await Todo.destroy({ where: { id: req.params.id, userId: req.user.id } });
    res.redirect('/' + (req.body.filter || ''));
  } catch (err) {
    next(err);
  }
});

router.post('/toggle-all', async function(req, res, next) {
  try {
    await Todo.update(
      { completed: req.body.completed !== undefined ? true : false },
      { where: { userId: req.user.id } }
    );
    res.redirect('/' + (req.body.filter || ''));
  } catch (err) {
    next(err);
  }
});

router.post('/clear-completed', async function(req, res, next) {
  try {
    await Todo.destroy({ where: { userId: req.user.id, completed: true } });
    res.redirect('/' + (req.body.filter || ''));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
