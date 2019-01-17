
const express = require('express');
const nedb = require('nedb');
const app = express();
const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: 8080 });
const path = require('path');
const port = 3000;
app.use('/js', express.static('public/js'));
app.use('/css', express.static("public/css"));