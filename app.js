require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contentsRouter = require('./routes/contents');
const categoriesRouter = require('./routes/categories');
const documentsRouter = require('./routes/documents');
const surveysRouter = require('./routes/surveys');
const refreshTokensRouter = require('./routes/refreshTokens');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/refresh_tokens', refreshTokensRouter);
app.use('/contents',contentsRouter);
app.use('/categories',categoriesRouter);
app.use('/documents', documentsRouter);
app.use('/surveys', surveysRouter);

module.exports = app;
