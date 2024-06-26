const express = require('express')
const webServer = express()
const port = 3000
const { WebSocketServer } = require('ws')
const socketServer = new WebSocketServer({ port: 443 })
const { MongoClient } = require('mongodb')

const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)

webServer.get('/form', (req, res) => {
    res.sendFile('form.html', { root: __dirname })
})

webServer.get('/chart', (req, res) => {
    res.sendFile('chart.html', { root: __dirname })
})

webServer.listen(port, () => {
    console.log(`web server listening on port ${port}`)
})

socketServer.on('connection', ws => {
    console.log('new client connected')
    async function getSensor() {
        try {
            await client.connect()
            const data = await client.db('RealTimechart').collection('sensor').find({}).toArray()
            socketServer.clients.forEach(e => {
                e.send(JSON.stringify(data))
            })
        } finally {
            client.close()
        }
    }
    ws.on('message', message => {
        const { type, tanggal, sensor, sales } = JSON.parse(message); 
        switch (type) {
            case 'load':
                getSensor(); 
                break;
            case 'add':
                async function addsensor() {
                    try {
                        await client.connect()
                        await client.db('RealTimechart').collection('sensor').insertOne({ tanggal, sensor })
                    } finally {
                        client.close()
                    }
                }
                addsensor().then(() => {
                    getSensor()
                })
                break;
            case 'edit':
                async function editSales() {
                    try {
                        await client.connect()
                        await client.db('RealTimechart').collection('sales').updateOne({ tanggal }, { $set: { sales } })
                    } finally {
                        client.close()
                    }
                }
                editSales().then(() => {
                    getSensor()
                })
                break;
        }
    })

})
