const express = require('express');
const cors = require('cors');
const path = require('path');
const spawn = require('child_process').spawn;
const port = 8081;
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());

const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
}

const pythonExePath = isDevelopment()
   ? path.join(__dirname, 'venv', 'bin', 'python3')
   : path.join('/home/ubuntu/miniconda', 'envs', 'myenv', 'bin', 'python3');


app.get('/', (req, res) => {
  res.send('Hello from Node server!');
});

// const pythonPath = path.join('/home/ubuntu/miniconda',
//   'envs',
//   'myenv',
//   'myenv',
//   'bin',
//   'python3'
// )


app.get('/random/:count', (req, res) => {
  try {
    const scriptPath = path.join(__dirname, 'resolver.py');
    // const pythonPath = path.join(__dirname, 'venv', 'bin', 'python');

    const count = req.params.count;
    const result = spawn(pythonExePath, [scriptPath, 'random', count]);

    let responseData = '';

    result.stdout.on('data', function (data) {
      responseData += data.toString();
    });

    result.on('close', (code) => {
      if (code === 0) {
        const jsonResponse = JSON.parse(responseData);
        res.status(200).json(jsonResponse);
      } else {
        res
          .status(500)
          .json({ error: `Child process exited with code ${code}` });
      }
    });

    result.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/latest/:count', (req, res) => {
  try {
    const scriptPath = path.join(__dirname, 'resolver.py');
    // const pythonPath = path.join(__dirname, 'venv/bin/python');


    const count = req.params.count;
    const result = spawn(pythonExePath, [scriptPath, 'latest', count]);

    let responseData = '';

    result.stdout.on('data', function (data) {
      responseData += data.toString();
    });

    result.on('close', (code) => {
      if (code === 0) {
        const jsonResponse = JSON.parse(responseData);
        res.status(200).json(jsonResponse);
      } else {
        res
          .status(500)
          .json({ error: `Child process exited with code ${code}` });
      }
    });

    result.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/genres/:genre/:count', (req, res) => {
  try {
    const scriptPath = path.join(__dirname, 'resolver.py');
    // const pythonPath = path.join(__dirname, 'venv/bin/python');

    const genre = req.params.genre;
    const count = req.params.count;
    const result = spawn(pythonExePath, [scriptPath, 'genres', genre, count]);

    let responseData = '';

    result.stdout.on('data', function (data) {
      responseData += data.toString();
    });

    result.on('close', (code) => {
      if (code === 0) {
        const jsonResponse = JSON.parse(responseData);
        res.status(200).json(jsonResponse);
      } else {
        res
          .status(500)
          .json({ error: `Child process exited with code ${code}` });
      }
    });

    result.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/item-based/:item', (req, res) => {
  try {
    const scriptPath = path.join(__dirname, 'recommender.py');
    // const pythonPath = path.join(__dirname, 'venv/bin/python');


    const item = req.params.item;
    const result = spawn(pythonExePath, [scriptPath, 'item-based', item]);

    let responseData = '';

    result.stdout.on('data', function (data) {
      responseData += data.toString();
    });

    result.on('close', (code) => {
      if (code === 0) {
        const jsonResponse = JSON.parse(responseData);
        res.status(200).json(jsonResponse);
      } else {
        res
          .status(500)
          .json({ error: `Child process exited with code ${code}` });
      }
    });

    result.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/user-based:based', (req, res) => {
  try {
    const scriptPath = path.join(__dirname, 'recommender.py');
    


    const inputRatingDict = req.body;
    const result = spawn(pythonExePath, [scriptPath, 'item-based', item]);

    let responseData = '';

    // 파이썬 스크립트로 JSON 데이터를 전달
    result.stdin.write(JSON.stringify(inputRatingDict));
    result.stdin.end();// 더이상 데이터가 없으면 전달 끝


    result.stdout.on('data', function (data) {
      responseData += data.toString();
    });

    result.on('close', (code) => {
      if (code === 0) {
        const jsonResponse = JSON.parse(responseData);
        res.status(200).json(jsonResponse);
      } else {
        res
          .status(500)
          .json({ error: `Child process exited with code ${code}` });
      }
    });

    result.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
