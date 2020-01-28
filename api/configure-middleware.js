const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const dbConnection = require('../database/dbConfig.js');

const sessionConfig = {
  name: 'CookieMonster', //it's a good idea to keep the name different
  secret: process.env.SESSION_SECRET || 'The Cookie Monster likes to eat cookies',
  cookie: {
    maxAge: 1000 * 60,
    secure: false, //REMEBER to change this to true after production
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false, //If this is true you will be arrested... just keep it as false.
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: 'sessions',
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 60000
  })
}

module.exports = function(server) {
    server.use(helmet());
    server.use(express.json());
    server.use(cors());
    server.use(session(sessionConfig))
};
