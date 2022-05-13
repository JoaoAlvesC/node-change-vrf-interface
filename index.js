const { readFileSync } = require('fs');

const { Client } = require('ssh2');
require('dotenv').config()
//console.log(process.env.HOST_IP)
const conn = new Client();
const command = "ip route vrf set numbers=1 interfaces=<pptp-cgh-antunes>,vlan801-CGH-ANTUNES"
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.exec(command, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
  host: process.env.HOST_IP,
  port: process.env.HOST_PORT,
  username: process.env.HOST_USERNAME,
  password: process.env.HOST_PASSWORD
});