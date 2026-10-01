// ======================================================
// وَصْل | WASL
// server.js
// ======================================================

const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");


// ======================================================
// إنشاء السيرفر
// ======================================================

const app = express();

const server =
    http.createServer(app);

const io =
    new Server(server);


// ======================================================
// ملفات الموقع
// ======================================================

app.use(
    express.static(
        path.join(__dirname)
    )
);


// ======================================================
// الصفحة الرئيسية
// ======================================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "index.html"
        )
    );

});


// ======================================================
// الغرف
// ======================================================

const rooms = {};


// ======================================================
// اتصال مستخدم جديد
// ======================================================

io.on("connection", socket => {

    console.log(
        "مستخدم اتصل:",
        socket.id
    );


    // ==================================================
    // دخول غرفة
    // ==================================================

    socket.on(
        "join-room",
        ({ room, name }) => {

            if (!room) return;


            const roomCode =
                String(room).trim();


            // إنشاء الغرفة إذا ما كانت موجودة
            if (!rooms[roomCode]) {

                rooms[roomCode] = {};
            }


            // المستخدمين الموجودين قبل هذا الشخص
            const existingUsers =
                Object.entries(
                    rooms[roomCode]
                ).map(
                    ([id, user]) => ({
                        id,
                        name: user.name
                    })
                );


            // حفظ المستخدم
            rooms[roomCode][socket.id] = {

                name:
                    name ||
                    "صديق",

                socketId:
                    socket.id

            };


            // ربط المستخدم بالغرفة
            socket.join(
                roomCode
            );


            socket.room =
                roomCode;

            socket.userName =
                name ||
                "صديق";


            console.log(
                `دخل ${socket.userName} الغرفة ${roomCode}`
            );


            // إرسال الموجودين للشخص الجديد
            socket.emit(
                "room-users",
                existingUsers
            );


            // إخبار الموجودين أن شخصًا جديدًا دخل
            socket.to(roomCode).emit(
                "user-joined",
                {
                    id:
                        socket.id,

                    name:
                        socket.userName
                }
            );

        }
    );


    // ==================================================
    // Offer
    // ==================================================

    socket.on(
        "offer",
        data => {

            if (!data?.to) return;


            io.to(data.to).emit(
                "offer",
                {

                    from:
                        socket.id,

                    offer:
                        data.offer,

                    name:
                        socket.userName ||
                        "صديق"

                }
            );

        }
    );


    // ==================================================
    // Answer
    // ==================================================

    socket.on(
        "answer",
        data => {

            if (!data?.to) return;


            io.to(data.to).emit(
                "answer",
                {

                    from:
                        socket.id,

                    answer:
                        data.answer

                }
            );

        }
    );


    // ==================================================
    // ICE Candidate
    // ==================================================

    socket.on(
        "ice-candidate",
        data => {

            if (!data?.to) return;


            io.to(data.to).emit(
                "ice-candidate",
                {

                    from:
                        socket.id,

                    candidate:
                        data.candidate

                }
            );

        }
    );


    // ==================================================
    // بدء مشاركة الشاشة
    // ==================================================

    socket.on(
        "screen-share-started",
        data => {

            if (!socket.room) return;


            socket.to(
                socket.room
            ).emit(
                "screen-share-started",
                {

                    id:
                        socket.id,

                    name:
                        socket.userName ||
                        data?.name ||
                        "صديق"

                }
            );

        }
    );


    // ==================================================
    // إيقاف مشاركة الشاشة
    // ==================================================

    socket.on(
        "screen-share-stopped",
        () => {

            if (!socket.room) return;


            socket.to(
                socket.room
            ).emit(
                "screen-share-stopped",
                {
                    id:
                        socket.id
                }
            );

        }
    );


    // ==================================================
    // مغادرة المستخدم
    // ==================================================

    socket.on(
        "disconnect",
        () => {

            const room =
                socket.room;


            if (!room) {

                console.log(
                    "انقطع المستخدم:",
                    socket.id
                );

                return;
            }


            // حذف المستخدم من الغرفة
            if (rooms[room]) {

                delete rooms[room][
                    socket.id
                ];
            }


            // إخبار الباقين
            socket.to(room).emit(
                "user-left",
                {
                    id:
                        socket.id
                }
            );


            // إذا أصبحت الغرفة فارغة نحذفها
            if (
                rooms[room] &&
                Object.keys(
                    rooms[room]
                ).length === 0
            ) {

                delete rooms[room];

                console.log(
                    `تم حذف الغرفة ${room}`
                );
            }


            console.log(
                `غادر ${socket.userName || socket.id}`
            );
        }
    );

});


// ======================================================
// تشغيل السيرفر
// ======================================================

const PORT =
    process.env.PORT || 3000;


server.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            "===================================="
        );

        console.log(
            "        WASL SERVER RUNNING"
        );

        console.log(
            `        http://localhost:${PORT}`
        );

        console.log(
            "===================================="
        );

    }
);
