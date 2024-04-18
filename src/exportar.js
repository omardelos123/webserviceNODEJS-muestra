module.exports.express = require('express');
module.exports.sql = require('mssql'); //para la conexion SQL.
module.exports.router = require('express').Router();
module.exports._token = require('./_token');
module.exports.config = require('./database'); // conexion a la base de datos