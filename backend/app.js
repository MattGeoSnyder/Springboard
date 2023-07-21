// const express = require('express');
// const app = express();
// const wsExpress = require('express-ws')(app);

import express from 'express';
import wsExpress from 'express-ws';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import messageRoutes from './routes/messages.js';
import imageRoutes from './routes/images.js';
import promptRoutes from './routes/prompts.js';
import hatesRoutes from './routes/hates.js';
import likeRoutes from './routes/likes.js';
import dislikeRoutes from './routes/dislikes.js';
import chatRoutes from './routes/chat.js'
import Message from './models/message.js';
import Directory from './ChatBotDir.js';

import cors from 'cors';

const app = express();
const expressWs = wsExpress(app);

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);
app.use('/images', imageRoutes);
app.use('/prompts', promptRoutes);
app.use('/hates', hatesRoutes);
app.use('/likes', likeRoutes);
app.use('/dislikes', dislikeRoutes);
app.use('/chat', chatRoutes);

app.ws('/chat/:matchId', function(ws, req, next){

    const { matchId } = req.params
    ws.on('message', async function(data) {
        try {
            const message = JSON.parse(data);
            console.log(message);
            const toUser = message.toUser;
            const res = await Message.saveMessage(message);
            console.log(expressWs.getWss().clients.size);
            expressWs.getWss().clients.forEach(client => {
                if (client.readyState === 1) {
                    client.send(res);
                } else {
                    ws.redirect(`ws://localhost:3001/notifications/${toUser}`);
                }
            });
        } catch (error) {
            next(error)
        }
    });
    
    ws.on('connection', async function(data) {
        console.log('conneted to WS');
    });
});

app.ws('/notifications/:userId', function(ws, req, next) {
    ws.on('connection', async () => {
        console.log(`User ${userId} connected to notifications`)
    })
})


app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status }
    });
})

export default app;