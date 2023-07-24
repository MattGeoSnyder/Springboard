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
import Directory from './Directory.js';
import Message from './models/message.js';
import chatBot from './openaiAPI.js';
import { authenticateJWT } from './middleware/auth.js';

import cors from 'cors';

const app = express();
const expressWs = wsExpress(app);
const directory = new Directory();


app.use(express.json());
app.use(cors({ optionsSuccessStatus: 200 }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);
app.use('/images', imageRoutes);
app.use('/prompts', promptRoutes);
app.use('/hates', hatesRoutes);
app.use('/likes', likeRoutes);
app.use('/dislikes', dislikeRoutes);


app.ws('/users/:userId', function(ws, req, next) {
    const { userId } = req.params;

    try {
        ws.on('error', function (error) {
            console.log(error);
        });
        
        ws.on('message', function (data) {
            const action = JSON.parse(data);
            switch (action.type) {

                case 'join':
                    directory.join(userId, ws);
                    break;

                default:
                    break;
            }
        });
    } catch(error) {
        console.error;
        next(error);
    }

});


app.ws('/users/:userId/matches/:matchId', function(ws, req, next) {
    
    const { matchId, userId } = req.params;
  
    ws.on('message', async function (data) {
  
    const action = JSON.parse(data);
    
    try {
        
        switch (action.type) {
        
            case 'join':
                directory.joinChat(matchId, userId, ws);
                break;
                    
            case 'chat':
                const message = await Message.saveMessage(action.payload);
                directory.chat(message);
                break;

            case 'chatBot':
                const response = await chatBot.respond(action.payload);      
                directory.chat(response)
                break;

            default:
                break;

        }
        
    } catch (error) {
        console.log(error);
        next(error);
    }
  
    });
});
    

app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const message = err.message;

    console.log(err);

    return res.status(status).json({
        error: { message, status }
    });
})

export default app;
