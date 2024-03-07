
// import express from 'express';

// import cors from "cors";

// import mongoose from 'mongoose';
// import { Server } from "socket.io"; 

// import userRoutes from "./routes/userRoutes.js";
// import messageRoutes from './routes/messagesRoute.js';

// import dotenv from 'dotenv';

// dotenv.config();
// const app = express();


// mongoose.set('strictQuery', false);




// app.use(cors());
// app.use(express.json());
// app.use("/api/auth", userRoutes);
// app.use("/api/messages", messageRoutes)




// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("DB Connection sucessful ")
// }).catch((err) => {
//     console.log(err.message);

// })

// const server = app.listen(process.env.PORT, () => {
//     console.log(`server started on Port ${process.env.PORT}`)
// });


// const io = socket(server,{
//     cors:{
//         origin:"http://localhost:3000",
//         credentials:true,
//     }
// });
// global.onlineUsers = new Map();
// io.on("connection",(socket)=>{
//     global.chatSocket = socket;
//     socket.on("add-user",(userId)=>{
//         onlineUsers.set(userId,socket.id);
//     });

//     socket.on("send-msg",(data)=>{
//         const sendUserSocket = onlineUsers.get(data.to);
//         if(sendUserSocket){
//             socket.to(sendUserSocket).emit("msg-recieve" ,data.msg);
//         }
//     })
// })
import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import { createServer } from "http"; // Change the import statement to use createServer instead of Server
import { Server } from "socket.io";

import userRoutes from "./routes/userRoutes.js";
import messageRoutes from './routes/messagesRoute.js';

import dotenv from 'dotenv';

dotenv.config();
const app = express();
const server = createServer(app); // Create an HTTP server using Express app

mongoose.set('strictQuery', false);

app.use(cors({"https://talkify-app.netlify.app/"}));
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connection successful ")
}).catch((err) => {
    console.log(err.message);
});

const io = new Server(server, { // Create a new instance of Socket.IO server
    cors: {
        origin: process.env.ORIGIN,
        credentials: true,
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
