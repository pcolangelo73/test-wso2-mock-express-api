const express = require('express');
const router = express.Router();
const cppSourceList = require('../mock-json/cpp-list-reports.json');
const dcdSourceList = require('../mock-json/dcd-list-reports.json');
const base64 = require('base-64');
const utf8 = require('utf8');

router.get('/', function(req, res, next) {
  res.send({
    home: true
  });  
});

router.get('/get', function(req, res, next) {
  logHeaders(req);
  res.send({
    get: true
  });  
});

router.get('/cpp-listing', (req, res, next) => {
  logHeaders(req);
  res.send(cppSourceList);
});

router.get('/dcd-listing', (req, res, next) => {  
  logHeaders(req);
  res.send(dcdSourceList);
});

function logHeaders(req) {
  try {
    console.log('Header:', 'authorization', ' : ',  req.headers.authorization);

    const jwtBase64Strings = req.headers['x-jwt-assertion'].split('=.');
    const jwtHeader = JSON.parse(base64.decode(jwtBase64Strings[0]));
    const jwtBody = JSON.parse(base64.decode(jwtBase64Strings[1]));
    console.log('JWT Header: ', jwtHeader);
    console.log('JWT Body: ', jwtBody);
  } catch(err) {
    console.error('Error logging headers: ', err);
  }
}

module.exports = router;
