// //important libraly for serever runnning
// const express = require('express');
// const server = express();
// const routes = require("./routes/router");
// const cors = require('cors');
// const helmet = require('helmet');
// const path = require('path');
// const bodyParser = require('body-parser');

// /*using port for call server*/
// const port = process.env.PORT || 3000

// /*set view for user interface*/
// server.set('view engine', 'ejs');
// server.set('views', path.join(__dirname, 'view'))

// /* call libraly to use */
// server.use(bodyParser.json())
// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(cors());
// server.use(helmet())
// server.use(express.json());
// server.use(routes);

// // Server port listen in server port 3000
// server.listen(port, function(err) {
//     console.log(`[starting] http://localhost:${port}/`);
// })


const express = require('express');
const cluster = require('cluster');
const { generateKeyPair } = require('crypto');
// Check the number of available CPU.
const numCPUs = require('os').cpus().length;

const routes = require("./routes/router");
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const PORT = 3000;
const path = require('path');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'))

// For Master process
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}

else {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use(helmet())
    app.use(express.json());
    app.use(routes);

    app.listen(PORT, err => {
        err ?
            console.log("Error in server setup") :
            console.log(`Worker ${process.pid} started`);
    });

    // API endpoint
    app.get('/key', (req, res) => {
        generateKeyPair('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'top secret'
            }
        }, (err, publicKey, privateKey) => {
            res.send(publicKey);
        })
    })
}