const express = require('express');
const webServer = express();
const port = 3000;
const firebase = require('firebase');
const { WebSocketServer } = require('ws');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Serve HTML files
webServer.get('/form', (req, res) => {
    res.sendFile('form.html', { root: __dirname });
});

webServer.get('/chart', (req, res) => {
    res.sendFile('chart.html', { root: __dirname });
});

// Start web server
webServer.listen(port, () => {
    console.log(`web server listening on port ${port}`);
});

// WebSocket server
const socketServer = new WebSocketServer({ port: 443 });

socketServer.on('connection', ws => {
    console.log('new client connected');
    async function getSensor() {
        try {
            const snapshot = await db.collection('sensor').get();
            const data = snapshot.docs.map(doc => doc.data());
            socketServer.clients.forEach(e => {
                e.send(JSON.stringify(data));
            });
        } catch (error) {
            console.error('Error getting sensor data:', error);
        }
    }

    ws.on('message', async message => {
        const { type, tanggal, sensor, sales } = JSON.parse(message);
        switch (type) {
            case 'load':
                getSensor();
                break;
            case 'add':
                try {
                    await db.collection('sensor').add({ tanggal, sensor });
                    getSensor();
                } catch (error) {
                    console.error('Error adding sensor data:', error);
                }
                break;
            case 'edit':
                try {
                    await db.collection('sensor').doc(tanggal).update({ sales });
                    getSensor();
                } catch (error) {
                    console.error('Error editing sensor data:', error);
                }
                break;
        }
    });
});
