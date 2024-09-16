const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000; 

// Or any port of your choice

app.get('/run-commands', (req, res) => {
  exec('cd js-samples && npm i && npm start', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      res.status(500).send(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    res.send(`stdout: ${stdout}`);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:3000`);
});
