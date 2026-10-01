const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(express.static(path.join(__dirname)));

const rooms = new Map();

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("join-room", ({ room, name }) => {

        if (!room || !/^\d{4}$/.test(room)) {
            return;
        }

        const oldRoom = rooms.get(room) || new Map();

        const users = [...oldRoom.entries()].map(([id, data]) => ({
            id,
            name: data.name
        }));

        socket.join(room);

        oldRoom.set(socket.id, {
            name: name || "مستخدم"
        });

        rooms.set(room, oldRoom);

        socket.data.room = room;
        socket.data.name = name || "مستخدم";

        socket.emit("room-users", users);

        socket.to(room).emit("user-joined", {
            id: socket.id,
            name: name || "مستخدم"
        });

        console.log(
            `${name} joined room ${room}`
        );
    });


    socket.on("offer", ({ to, offer }) => {

        io.to(to).emit("offer", {
            from: socket.id,
            offer
        });
    });


    socket.on("answer", ({ to, answer }) => {

        io.to(to).emit("answer", {
            from: socket.id,
            answer
        });
    });


    socket.on("ice-candidate", ({ to, candidate }) => {

        io.to(to).emit("ice-candidate", {
            from: socket.id,
            candidate
        });
    });


    socket.on("screen-share-started", ({ room, name }) => {

        socket.to(room).emit("screen-share-started", {
            id: socket.id,
            name
        });
    });


    socket.on("screen-share-stopped", ({ room }) => {

        socket.to(room).emit("screen-share-stopped", {
            id: socket.id
        });
    });


    socket.on("disconnect", () => {

        const room = socket.data.room;

        if (!room) return;

        const roomUsers = rooms.get(room);

        if (!roomUsers) return;

        roomUsers.delete(socket.id);

        socket.to(room).emit("user-left", {
            id: socket.id
        });

        if (roomUsers.size === 0) {
            rooms.delete(room);
        }

        console.log(
            `${socket.data.name || socket.id} left room ${room}`
        );
    });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {

    console.log(
        `WASL server running on port ${PORT}`
    );

});
