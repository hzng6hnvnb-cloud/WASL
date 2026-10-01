// ======================================================
// وَصْل | WASL
// app.js
// ======================================================

let currentRoom = null;
let currentName = "أنت";

let micEnabled = true;
let cameraEnabled = false;

let currentTheme = "dark";
let currentLanguage = "ar";

let cameraStream = null;
let cameraFacing = "user";

let socket = null;
let localStream = null;
let screenStream = null;

const peers = {};
const remoteUsers = {};


// ======================================================
// الترجمة
// ======================================================

const translations = {

    ar: {
        tagline: "تواصل بلا حدود",
        secure: "● اتصال آمن وسريع",

        heroTitle1: "اجمع أصحابك",
        heroTitle2: "في مكان واحد.",

        heroText:
            "ادخل رقم الغرفة وابدأ المكالمة بالصوت والكاميرا ومشاركة الشاشة.",

        createRoom: "إنشاء غرفة",
        joinRoom: "دخول غرفة",

        voice: "صوت",
        camera: "كاميرا",
        screen: "مشاركة الشاشة",

        createTitle: "إنشاء غرفة",
        createText:
            "أنشئ غرفة جديدة وشارك الرقم مع أصحابك.",

        yourName: "اسمك",
        namePlaceholder: "اكتب اسمك",

        joinTitle: "دخول غرفة",
        joinText:
            "أدخل رقم الغرفة المكون من 4 أرقام.",

        roomNumber: "رقم الغرفة",
        enterRoom: "دخول الغرفة",

        ready: "الغرفة جاهزة",
        waiting: "بانتظار الأصدقاء",
        friendsRoom: "غرفة الأصدقاء",
        groupCall: "المكالمة الجماعية",
        connected: "متصل",

        you: "أنت",
        cameraOff: "الكاميرا متوقفة",

        waitingTitle: "بانتظار أصحابك",
        waitingText:
            "ارسل رقم الغرفة لهم وخلهم يدخلون.",

        copyRoom: "نسخ رقم الغرفة",

        mute: "كتم الصوت",
        unmute: "فتح الصوت",

        cameraOn: "إيقاف الكاميرا",
        cameraButton: "الكاميرا",

        shareScreen: "مشاركة الشاشة",
        leave: "مغادرة",

        settings: "الإعدادات",
        settingsText:
            "خصص وَصْل على طريقتك",

        appearance: "المظهر",
        dark: "داكن",
        light: "فاتح",

        language: "اللغة",
        arabic: "العربية",
        english: "English",

        audioVideo: "الصوت والكاميرا",

        micTest: "اختبار المايك",
        cameraTest: "اختبار الكاميرا",
        pressTest: "اضغط للتجربة",

        roomCreated: "تم إنشاء الغرفة",
        roomJoined: "تم الدخول للغرفة",
        copied: "تم نسخ رقم الغرفة",

        enterName: "اكتب اسمك أول",

        invalidCode:
            "رقم الغرفة لازم يكون 4 أرقام",

        micOpened: "تم فتح المايك",
        micMuted: "تم كتم المايك",

        cameraStarted: "تم تشغيل الكاميرا",
        cameraStopped: "تم إيقاف الكاميرا",

        frontCamera: "الكاميرا الأمامية",
        backCamera: "الكاميرا الخلفية",

        cameraPermission:
            "المتصفح رفض الوصول للكاميرا",

        screenStarted:
            "بدأت مشاركة الشاشة",

        screenEnded:
            "انتهت مشاركة الشاشة",

        screenCancelled:
            "تم إلغاء مشاركة الشاشة",

        screenUnsupported:
            "مشاركة الشاشة غير مدعومة هنا",

        micWorking:
            "الميكروفون يعمل",

        micPermission:
            "لم يتم السماح بالمايك",

        cameraWorking:
            "الكاميرا تعمل",

        cameraPermission2:
            "لم يتم السماح بالكاميرا",

        leftRoom:
            "تمت مغادرة الغرفة",

        darkActivated:
            "تم تفعيل المظهر الداكن",

        lightActivated:
            "تم تفعيل المظهر الفاتح",

        friendJoined:
            "دخل صديق إلى الغرفة",

        friendLeft:
            "غادر صديق الغرفة",

        serverError:
            "تعذر الاتصال بالسيرفر"
    },

    en: {
        tagline: "Connect without limits",
        secure: "● Secure and fast connection",

        heroTitle1: "Bring your friends",
        heroTitle2: "together.",

        heroText:
            "Enter a room code and start talking with voice, camera and screen sharing.",

        createRoom: "Create Room",
        joinRoom: "Join Room",

        voice: "Voice",
        camera: "Camera",
        screen: "Screen Share",

        createTitle: "Create Room",
        createText:
            "Create a new room and share the code with your friends.",

        yourName: "Your name",
        namePlaceholder: "Enter your name",

        joinTitle: "Join Room",
        joinText:
            "Enter the 4-digit room code.",

        roomNumber: "Room code",
        enterRoom: "Join Room",

        ready: "Room ready",
        waiting: "Waiting for friends",
        friendsRoom: "Friends room",
        groupCall: "Group call",
        connected: "Connected",

        you: "You",
        cameraOff: "Camera is off",

        waitingTitle: "Waiting for your friends",
        waitingText:
            "Send them the room code and let them join.",

        copyRoom: "Copy room code",

        mute: "Mute",
        unmute: "Unmute",

        cameraOn: "Turn off camera",
        cameraButton: "Camera",

        shareScreen: "Share screen",
        leave: "Leave",

        settings: "Settings",
        settingsText:
            "Customize WASL your way",

        appearance: "Appearance",
        dark: "Dark",
        light: "Light",

        language: "Language",
        arabic: "العربية",
        english: "English",

        audioVideo: "Audio & Camera",

        micTest: "Microphone test",
        cameraTest: "Camera test",
        pressTest: "Tap to test",

        roomCreated: "Room created",
        roomJoined: "Joined the room",
        copied: "Room code copied",

        enterName: "Enter your name first",

        invalidCode:
            "Room code must contain 4 digits",

        micOpened:
            "Microphone enabled",

        micMuted:
            "Microphone muted",

        cameraStarted:
            "Camera started",

        cameraStopped:
            "Camera stopped",

        frontCamera:
            "Front camera",

        backCamera:
            "Back camera",

        cameraPermission:
            "Camera permission was denied",

        screenStarted:
            "Screen sharing started",

        screenEnded:
            "Screen sharing ended",

        screenCancelled:
            "Screen sharing cancelled",

        screenUnsupported:
            "Screen sharing is not supported here",

        micWorking:
            "Microphone is working",

        micPermission:
            "Microphone permission was denied",

        cameraWorking:
            "Camera is working",

        cameraPermission2:
            "Camera permission was denied",

        leftRoom:
            "You left the room",

        darkActivated:
            "Dark mode enabled",

        lightActivated:
            "Light mode enabled",

        friendJoined:
            "A friend joined the room",

        friendLeft:
            "A friend left the room",

        serverError:
            "Could not connect to the server"
    }
};


function t(key) {
    return translations[currentLanguage]?.[key] || key;
}


// ======================================================
// الإشعارات
// ======================================================

function showToast(message) {

    const toast = document.getElementById("toast");
    const text = document.getElementById("toastText");

    if (!toast || !text) return;

    text.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


// ======================================================
// التنقل
// ======================================================

function openScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active");
    }
}


// ======================================================
// النوافذ
// ======================================================

function showCreate() {

    document
        .getElementById("createModal")
        ?.classList.add("show");
}


function showJoin() {

    document
        .getElementById("joinModal")
        ?.classList.add("show");
}


function closeModals() {

    document
        .querySelectorAll(".modal")
        .forEach(modal => {
            modal.classList.remove("show");
        });
}


function openSettings() {

    document
        .getElementById("settingsModal")
        ?.classList.add("show");
}


function closeSettings() {

    document
        .getElementById("settingsModal")
        ?.classList.remove("show");
}


// ======================================================
// إنشاء رقم غرفة
// ======================================================

function generateRoomCode() {

    return Math.floor(
        1000 + Math.random() * 9000
    ).toString();
}


// ======================================================
// إنشاء غرفة
// ======================================================

async function createRoom() {

    const input =
        document.getElementById("createName");

    const name =
        input?.value.trim();

    if (!name) {
        showToast(t("enterName"));
        return;
    }

    currentName = name;
    currentRoom = generateRoomCode();

    await enterRoom();

    showToast(t("roomCreated"));
}


// ======================================================
// دخول غرفة
// ======================================================

async function joinRoom() {

    const name =
        document
            .getElementById("joinName")
            ?.value.trim();

    const code =
        document
            .getElementById("roomCodeInput")
            ?.value.trim();

    if (!name) {
        showToast(t("enterName"));
        return;
    }

    if (!/^\d{4}$/.test(code)) {
        showToast(t("invalidCode"));
        return;
    }

    currentName = name;
    currentRoom = code;

    await enterRoom();

    showToast(t("roomJoined"));
}


// ======================================================
// دخول الغرفة
// ======================================================

async function enterRoom() {

    closeModals();

    const roomCode =
        document.getElementById("roomCode");

    const localName =
        document.getElementById("localName");

    const status =
        document.getElementById("roomStatus");

    if (roomCode) {
        roomCode.textContent = currentRoom;
    }

    if (localName) {
        localName.textContent = currentName;
    }

    openScreen("room");

    if (status) {
        status.textContent = t("waiting");
    }

    await connectToServer();
}


// ======================================================
// الاتصال بالسيرفر
// ======================================================

async function connectToServer() {

    if (typeof io !== "function") {

        console.error(
            "Socket.IO غير موجود"
        );

        showToast(t("serverError"));

        return;
    }

    if (socket) {
        socket.disconnect();
        socket = null;
    }

    socket = io();


    socket.on("connect", async () => {

        console.log(
            "تم الاتصال بالسيرفر:",
            socket.id
        );

        socket.emit("join-room", {
            room: currentRoom,
            name: currentName
        });

        await startMicrophone();
    });


    socket.on("connect_error", error => {

        console.error(
            "Server connection error:",
            error
        );

        showToast(t("serverError"));
    });


    socket.on("room-users", async users => {

        console.log(
            "الأشخاص الموجودون:",
            users
        );

        for (const user of users) {

            await createPeerConnection(
                user.id,
                user.name,
                true
            );
        }

        updateRoomStatus();
    });


    socket.on("user-joined", async user => {

        console.log(
            "دخل شخص:",
            user
        );

        showToast(t("friendJoined"));

        await createPeerConnection(
            user.id,
            user.name,
            true
        );

        updateRoomStatus();
    });


    socket.on("offer", async data => {
        await handleOffer(data);
    });


    socket.on("answer", async data => {
        await handleAnswer(data);
    });


    socket.on("ice-candidate", async data => {
        await handleIceCandidate(data);
    });


    socket.on("user-left", data => {

        removeRemoteUser(data.id);

        showToast(t("friendLeft"));

        updateRoomStatus();
    });


    socket.on("screen-share-started", data => {

        console.log(
            "بدأ مشاركة الشاشة:",
            data
        );
    });


    socket.on("screen-share-stopped", data => {

        console.log(
            "انتهت مشاركة الشاشة:",
            data
        );
    });
}


// ======================================================
// إعداد WebRTC
// ======================================================

const rtcConfig = {

    iceServers: [

        {
            urls: "stun:stun.l.google.com:19302"
        },

        {
            urls: "stun:stun1.l.google.com:19302"
        }

    ]
};


// ======================================================
// إنشاء اتصال مع شخص
// ======================================================

async function createPeerConnection(
    userId,
    userName,
    createOffer = false
) {

    if (peers[userId]) {
        return peers[userId];
    }

    const pc =
        new RTCPeerConnection(
            rtcConfig
        );

    peers[userId] = pc;

    remoteUsers[userId] = {
        name: userName || "صديق",
        stream: null
    };


    // ------------------------------------------
    // إضافة التراكات الموجودة
    // ------------------------------------------

    if (localStream) {

        localStream
            .getTracks()
            .forEach(track => {

                pc.addTrack(
                    track,
                    localStream
                );

            });
    }


    // ------------------------------------------
    // ICE
    // ------------------------------------------

    pc.onicecandidate = event => {

        if (!event.candidate) return;

        if (!socket) return;

        socket.emit(
            "ice-candidate",
            {
                to: userId,
                candidate: event.candidate
            }
        );
    };


    // ------------------------------------------
    // استقبال فيديو/صوت
    // ------------------------------------------

    pc.ontrack = event => {

        let stream =
            event.streams?.[0];

        if (!stream) {

            stream =
                remoteUsers[userId]?.stream ||
                new MediaStream();

            if (
                !stream
                    .getTracks()
                    .includes(event.track)
            ) {

                stream.addTrack(
                    event.track
                );
            }
        }

        if (!remoteUsers[userId]) {

            remoteUsers[userId] = {
                name: userName || "صديق",
                stream
            };

        } else {

            remoteUsers[userId].stream =
                stream;
        }

        showRemoteUser(
            userId,
            remoteUsers[userId].name,
            stream
        );
    };


    // ------------------------------------------
    // حالة الاتصال
    // ------------------------------------------

    pc.onconnectionstatechange = () => {

        console.log(
            "حالة الاتصال:",
            userId,
            pc.connectionState
        );

        if (
            pc.connectionState === "failed"
        ) {

            try {
                pc.restartIce();
            } catch {}
        }

        if (
            pc.connectionState === "closed" ||
            pc.connectionState === "disconnected"
        ) {

            updateRoomStatus();
        }
    };


    // ------------------------------------------
    // إنشاء العرض
    // ------------------------------------------

    if (createOffer) {

        try {

            const offer =
                await pc.createOffer();

            await pc.setLocalDescription(
                offer
            );

            socket.emit(
                "offer",
                {
                    to: userId,
                    offer: pc.localDescription
                }
            );

        } catch (error) {

            console.error(
                "Offer error:",
                error
            );
        }
    }

    return pc;
}


// ======================================================
// استقبال Offer
// ======================================================

async function handleOffer(data) {

    const userId = data.from;

    let pc = peers[userId];

    if (!pc) {

        pc =
            await createPeerConnection(
                userId,
                data.name || "صديق",
                false
            );
    }


    try {

        await pc.setRemoteDescription(
            new RTCSessionDescription(
                data.offer
            )
        );

        const answer =
            await pc.createAnswer();

        await pc.setLocalDescription(
            answer
        );

        socket.emit(
            "answer",
            {
                to: userId,
                answer: pc.localDescription
            }
        );

    } catch (error) {

        console.error(
            "Offer handling error:",
            error
        );
    }
}


// ======================================================
// استقبال Answer
// ======================================================

async function handleAnswer(data) {

    const pc =
        peers[data.from];

    if (!pc) return;

    try {

        await pc.setRemoteDescription(
            new RTCSessionDescription(
                data.answer
            )
        );

    } catch (error) {

        console.error(
            "Answer error:",
            error
        );
    }
}


// ======================================================
// استقبال ICE
// ======================================================

async function handleIceCandidate(data) {

    const pc =
        peers[data.from];

    if (!pc) return;

    try {

        await pc.addIceCandidate(
            new RTCIceCandidate(
                data.candidate
            )
        );

    } catch (error) {

        console.error(
            "ICE error:",
            error
        );
    }
}


// ======================================================
// تشغيل المايك
// ======================================================

async function startMicrophone() {

    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
    ) {

        showToast(t("micPermission"));

        return;
    }


    try {

        const stream =
            await navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                    video: false
                });


        if (!localStream) {
            localStream =
                new MediaStream();
        }


        const audioTracks =
            stream.getAudioTracks();


        audioTracks.forEach(track => {

            localStream.addTrack(track);

            Object.values(peers)
                .forEach(pc => {

                    const exists =
                        pc.getSenders()
                            .some(
                                sender =>
                                    sender.track &&
                                    sender.track.kind === "audio"
                            );

                    if (!exists) {

                        pc.addTrack(
                            track,
                            localStream
                        );
                    }
                });
        });


        micEnabled = true;

        updateMicButton();

    } catch (error) {

        console.error(
            "Microphone error:",
            error
        );

        micEnabled = false;

        updateMicButton();

        showToast(
            t("micPermission")
        );
    }
}


// ======================================================
// كتم / فتح المايك
// ======================================================

function toggleMic() {

    micEnabled =
        !micEnabled;


    if (localStream) {

        localStream
            .getAudioTracks()
            .forEach(track => {

                track.enabled =
                    micEnabled;
            });
    }


    updateMicButton();


    showToast(
        micEnabled
            ? t("micOpened")
            : t("micMuted")
    );
}


function updateMicButton() {

    const button =
        document.getElementById(
            "micButton"
        );

    const icon =
        document.getElementById(
            "localMicIcon"
        );

    if (!button) return;

    const small =
        button.querySelector("small");


    if (micEnabled) {

        button.classList.remove("off");

        if (small) {
            small.textContent =
                t("mute");
        }

        if (icon) {
            icon.textContent =
                "🎙";
        }

    } else {

        button.classList.add("off");

        if (small) {
            small.textContent =
                t("unmute");
        }

        if (icon) {
            icon.textContent =
                "🔇";
        }
    }
}


// ======================================================
// الكاميرا
// ======================================================

async function toggleCamera() {

    if (cameraEnabled) {

        stopCamera();

        return;
    }

    await startCamera(
        cameraFacing
    );
}


async function startCamera(
    facingMode = "user"
) {

    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
    ) {

        showToast(
            t("cameraPermission")
        );

        return;
    }


    try {

        // إيقاف الكاميرا القديمة
        if (cameraStream) {

            cameraStream
                .getTracks()
                .forEach(track =>
                    track.stop()
                );
        }


        const stream =
            await navigator.mediaDevices
                .getUserMedia({

                    video: {

                        facingMode: {
                            ideal:
                                facingMode
                        }

                    },

                    audio: false

                });


        cameraStream =
            stream;

        cameraEnabled =
            true;


        if (!localStream) {
            localStream =
                new MediaStream();
        }


        const videoTrack =
            stream.getVideoTracks()[0];


        // إزالة فيديو قديم من localStream
        localStream
            .getVideoTracks()
            .forEach(track => {

                localStream.removeTrack(
                    track
                );

                track.stop();
            });


        localStream.addTrack(
            videoTrack
        );


        // إضافة أو تحديث الفيديو في الاتصالات
        Object.values(peers)
            .forEach(pc => {

                const sender =
                    pc.getSenders()
                        .find(
                            s =>
                                s.track &&
                                s.track.kind ===
                                "video"
                        );


                if (sender) {

                    sender.replaceTrack(
                        videoTrack
                    );

                } else {

                    pc.addTrack(
                        videoTrack,
                        localStream
                    );
                }
            });


        showLocalCamera(
            stream,
            facingMode
        );


        updateCameraButton();


        showToast(
            facingMode === "user"
                ? t("frontCamera")
                : t("backCamera")
        );

    } catch (error) {

        console.error(
            "Camera error:",
            error
        );

        showToast(
            t("cameraPermission")
        );
    }
}


// ======================================================
// عرض الكاميرا المحلية
// ======================================================

function showLocalCamera(
    stream,
    facingMode
) {

    const card =
        document.querySelector(
            ".local-card"
        );

    if (!card) return;


    const placeholder =
        card.querySelector(
            ".video-placeholder"
        );

    if (!placeholder) return;


    placeholder.innerHTML = "";


    const video =
        document.createElement(
            "video"
        );


    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;

    video.srcObject =
        stream;


    video.style.width =
        "100%";

    video.style.height =
        "100%";

    video.style.objectFit =
        "cover";


    // الأمامية تكون معكوسة
    // الخلفية تكون طبيعية

    video.style.transform =
        facingMode === "user"
            ? "scaleX(-1)"
            : "scaleX(1)";


    placeholder.appendChild(
        video
    );
}


// ======================================================
// إيقاف الكاميرا
// ======================================================

function stopCamera() {

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(track =>
                track.stop()
            );

        cameraStream = null;
    }


    if (localStream) {

        localStream
            .getVideoTracks()
            .forEach(track => {

                const senderTrack =
                    track;

                Object.values(peers)
                    .forEach(pc => {

                        const sender =
                            pc.getSenders()
                                .find(
                                    s =>
                                        s.track ===
                                        senderTrack
                                );

                        if (sender) {

                            try {
                                sender.replaceTrack(
                                    null
                                );
                            } catch {}
                        }
                    });


                localStream.removeTrack(
                    track
                );
            });
    }


    cameraEnabled =
        false;


    const card =
        document.querySelector(
            ".local-card"
        );


    if (card) {

        const placeholder =
            card.querySelector(
                ".video-placeholder"
            );


        if (placeholder) {

            const firstLetter =
                currentName
                    .charAt(0)
                    .toUpperCase();


            placeholder.innerHTML = `

                <div class="avatar">
                    ${firstLetter}
                </div>

                <div class="camera-off">
                    ${t("cameraOff")}
                </div>

            `;
        }
    }


    updateCameraButton();

    showToast(
        t("cameraStopped")
    );
}


function updateCameraButton() {

    const button =
        document.getElementById(
            "cameraButton"
        );

    if (!button) return;


    const small =
        button.querySelector(
            "small"
        );


    if (cameraEnabled) {

        button.classList.remove(
            "off"
        );

        if (small) {
            small.textContent =
                t("cameraOn");
        }

    } else {

        button.classList.add(
            "off"
        );

        if (small) {
            small.textContent =
                t("cameraButton");
        }
    }
}


// ======================================================
// تبديل الكاميرا
// ======================================================

async function switchCamera() {

    cameraFacing =
        cameraFacing === "user"
            ? "environment"
            : "user";


    if (cameraEnabled) {

        await startCamera(
            cameraFacing
        );
    }
}


// الضغط مرتين على زر الكاميرا
document.addEventListener(
    "DOMContentLoaded",
    () => {

        const cameraButton =
            document.getElementById(
                "cameraButton"
            );

        if (!cameraButton) return;


        cameraButton.addEventListener(
            "dblclick",
            async event => {

                event.preventDefault();

                await switchCamera();
            }
        );
    }
);


// ======================================================
// مشاركة الشاشة
// ======================================================

async function shareScreen() {

    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getDisplayMedia
    ) {

        showToast(
            t("screenUnsupported")
        );

        return;
    }


    if (screenStream) {

        await stopScreenShare();

        return;
    }


    try {

        screenStream =
            await navigator.mediaDevices
                .getDisplayMedia({

                    video: true,
                    audio: false

                });


        const screenTrack =
            screenStream
                .getVideoTracks()[0];


        if (!screenTrack) {
            throw new Error(
                "No screen track"
            );
        }


        // استبدال فيديو الكاميرا
        Object.values(peers)
            .forEach(pc => {

                const sender =
                    pc.getSenders()
                        .find(
                            s =>
                                s.track &&
                                s.track.kind ===
                                "video"
                        );


                if (sender) {

                    sender.replaceTrack(
                        screenTrack
                    );

                } else {

                    pc.addTrack(
                        screenTrack,
                        screenStream
                    );
                }
            });


        showLocalScreenPreview(
            screenStream
        );


        if (socket) {

            socket.emit(
                "screen-share-started",
                {
                    room: currentRoom,
                    name: currentName
                }
            );
        }


        showToast(
            t("screenStarted")
        );


        screenTrack.addEventListener(
            "ended",
            () => {

                stopScreenShare();
            }
        );

    } catch (error) {

        console.error(
            "Screen sharing error:",
            error
        );

        screenStream = null;

        showToast(
            t("screenCancelled")
        );
    }
}


// ======================================================
// إيقاف مشاركة الشاشة
// ======================================================

async function stopScreenShare() {

    if (!screenStream) return;


    const screenTrack =
        screenStream
            .getVideoTracks()[0];


    // إذا الكاميرا شغالة رجع الكاميرا
    if (
        cameraStream &&
        cameraEnabled
    ) {

        const cameraTrack =
            cameraStream
                .getVideoTracks()[0];


        Object.values(peers)
            .forEach(pc => {

                const sender =
                    pc.getSenders()
                        .find(
                            s =>
                                s.track &&
                                s.track.kind ===
                                "video"
                        );


                if (sender) {

                    sender.replaceTrack(
                        cameraTrack
                    );
                }
            });

    } else {

        Object.values(peers)
            .forEach(pc => {

                const sender =
                    pc.getSenders()
                        .find(
                            s =>
                                s.track ===
                                screenTrack
                        );


                if (sender) {

                    try {
                        sender.replaceTrack(
                            null
                        );
                    } catch {}
                }
            });
    }


    screenStream
        .getTracks()
        .forEach(track =>
            track.stop()
        );


    screenStream = null;


    const preview =
        document.getElementById(
            "waslScreenPreview"
        );


    if (preview) {
        preview.remove();
    }


    if (socket) {

        socket.emit(
            "screen-share-stopped",
            {
                room: currentRoom
            }
        );
    }


    showToast(
        t("screenEnded")
    );
}


// ======================================================
// معاينة الشاشة
// ======================================================

function showLocalScreenPreview(
    stream
) {

    let video =
        document.getElementById(
            "waslScreenPreview"
        );


    if (!video) {

        video =
            document.createElement(
                "video"
            );

        video.id =
            "waslScreenPreview";

        video.autoplay =
            true;

        video.muted =
            true;

        video.playsInline =
            true;


        video.style.position =
            "fixed";

        video.style.zIndex =
            "9999";

        video.style.left =
            "20px";

        video.style.bottom =
            "100px";

        video.style.width =
            "320px";

        video.style.maxHeight =
            "240px";

        video.style.objectFit =
            "contain";

        video.style.background =
            "#000";

        video.style.borderRadius =
            "18px";

        video.style.boxShadow =
            "0 20px 60px rgba(0,0,0,.5)";


        document.body.appendChild(
            video
        );
    }


    video.srcObject =
        stream;
}


// ======================================================
// عرض الشخص المتصل
// ======================================================

function showRemoteUser(
    userId,
    userName,
    stream
) {

    let card =
        document.getElementById(
            "remote-card-" +
            userId
        );


    if (!card) {

        card =
            document.createElement(
                "div"
            );

        card.id =
            "remote-card-" +
            userId;

        card.className =
            "person-card remote-card";


        const video =
            document.createElement(
                "video"
            );

        video.id =
            "remote-" +
            userId;

        video.autoplay =
            true;

        video.playsInline =
            true;

        video.controls =
            false;


        const videoBox =
            document.createElement(
                "div"
            );

        videoBox.className =
            "video-placeholder";


        videoBox.style.padding =
            "0";

        videoBox.style.overflow =
            "hidden";


        video.style.width =
            "100%";

        video.style.height =
            "100%";

        video.style.objectFit =
            "cover";


        videoBox.appendChild(
            video
        );


        const info =
            document.createElement(
                "div"
            );

        info.className =
            "person-info";


        info.innerHTML = `

            <div>
                <strong>
                    ${escapeHTML(userName || "صديق")}
                </strong>

                <span>
                    متصل
                </span>
            </div>

            <div class="person-icons">
                <span>🎙</span>
                <span>📹</span>
            </div>

        `;


        card.appendChild(
            videoBox
        );

        card.appendChild(
            info
        );


        const participants =
            document.getElementById(
                "participants"
            );


        if (participants) {

            participants.appendChild(
                card
            );

        } else {

            document.body.appendChild(
                card
            );
        }
    }


    const video =
        document.getElementById(
            "remote-" +
            userId
        );


    if (video) {

        video.srcObject =
            stream;
    }


    const empty =
        document.getElementById(
            "emptyMessage"
        );


    if (empty) {
        empty.style.display =
            "none";
    }


    updateRoomStatus();
}


// ======================================================
// حماية اسم المستخدم
// ======================================================

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// ======================================================
// إزالة شخص
// ======================================================

function removeRemoteUser(
    userId
) {

    const pc =
        peers[userId];


    if (pc) {

        try {
            pc.close();
        } catch {}

        delete peers[userId];
    }


    delete remoteUsers[userId];


    const card =
        document.getElementById(
            "remote-card-" +
            userId
        );


    if (card) {
        card.remove();
    }


    const remaining =
        Object.keys(
            remoteUsers
        ).length;


    const empty =
        document.getElementById(
            "emptyMessage"
        );


    if (
        empty &&
        remaining === 0
    ) {

        empty.style.display =
            "";
    }


    updateRoomStatus();
}


// ======================================================
// حالة الغرفة
// ======================================================

function updateRoomStatus() {

    const status =
        document.getElementById(
            "roomStatus"
        );


    if (!status) return;


    const count =
        Object.keys(
            remoteUsers
        ).length;


    status.textContent =
        count > 0
            ? t("connected")
            : t("waiting");
}


// ======================================================
// نسخ رقم الغرفة
// ======================================================

async function copyRoomCode() {

    if (!currentRoom) return;


    try {

        await navigator.clipboard.writeText(
            currentRoom
        );

        showToast(
            t("copied")
        );

    } catch {

        showToast(
            currentRoom
        );
    }
}


// ======================================================
// مغادرة الغرفة
// ======================================================

async function leaveRoom() {

    if (screenStream) {

        await stopScreenShare();
    }


    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(track =>
                track.stop()
            );

        cameraStream = null;
    }


    if (localStream) {

        localStream
            .getTracks()
            .forEach(track =>
                track.stop()
            );

        localStream = null;
    }


    Object.values(peers)
        .forEach(pc => {

            try {
                pc.close();
            } catch {}
        });


    Object.keys(peers)
        .forEach(id =>
            delete peers[id]
        );


    Object.keys(remoteUsers)
        .forEach(id =>
            delete remoteUsers[id]
        );


    if (socket) {

        socket.disconnect();

        socket = null;
    }


    document
        .querySelectorAll(
            "[id^='remote-card-']"
        )
        .forEach(el =>
            el.remove()
        );


    const preview =
        document.getElementById(
            "waslScreenPreview"
        );


    if (preview) {
        preview.remove();
    }


    cameraEnabled =
        false;

    micEnabled =
        true;

    screenStream =
        null;

    currentRoom =
        null;


    updateCameraButton();
    updateMicButton();

    openScreen("home");

    showToast(
        t("leftRoom")
    );
}


// ======================================================
// المظهر
// ======================================================

function setTheme(theme) {

    currentTheme =
        theme;


    if (theme === "light") {

        document.body.classList.add(
            "light"
        );


        document
            .getElementById("lightChoice")
            ?.classList.add("active");


        document
            .getElementById("darkChoice")
            ?.classList.remove("active");


        showToast(
            t("lightActivated")
        );

    } else {

        document.body.classList.remove(
            "light"
        );


        document
            .getElementById("darkChoice")
            ?.classList.add("active");


        document
            .getElementById("lightChoice")
            ?.classList.remove("active");


        showToast(
            t("darkActivated")
        );
    }


    localStorage.setItem(
        "wasl-theme",
        theme
    );
}


// ======================================================
// اللغة
// ======================================================

function setLanguage(
    language
) {

    currentLanguage =
        language;


    document.documentElement.lang =
        language;

    document.documentElement.dir =
        language === "ar"
            ? "rtl"
            : "ltr";


    document
        .getElementById(
            "arabicChoice"
        )
        ?.classList.toggle(
            "active",
            language === "ar"
        );


    document
        .getElementById(
            "englishChoice"
        )
        ?.classList.toggle(
            "active",
            language === "en"
        );


    applyLanguage();


    localStorage.setItem(
        "wasl-language",
        language
    );
}


// ======================================================
// تطبيق اللغة
// ======================================================

function applyLanguage() {

    const map = {

        ".brand span":
            "tagline",

        ".hero-badge":
            "secure",

        ".hero h2 span":
            "heroTitle2",

        ".hero p":
            "heroText",

        ".home-actions .primary-button":
            "createRoom",

        ".home-actions .secondary-button":
            "joinRoom",

        ".features div:nth-child(1) span":
            "voice",

        ".features div:nth-child(2) span":
            "camera",

        ".features div:nth-child(3) span":
            "screen",

        "#createModal h3":
            "createTitle",

        "#createModal > .modal-card > p":
            "createText",

        "#joinModal h3":
            "joinTitle",

        "#joinModal > .modal-card > p":
            "joinText",

        "#createModal label":
            "yourName",

        "#joinModal label:first-of-type":
            "yourName",

        "#joinModal label:last-of-type":
            "roomNumber",

        "#createName":
            "namePlaceholder",

        "#joinName":
            "namePlaceholder",

        "#createModal .full":
            "createRoom",

        "#joinModal .full":
            "enterRoom",

        ".room-code-box span":
            "roomNumber",

        ".room-title .small-label":
            "friendsRoom",

        ".room-title h2":
            "groupCall",

        ".connection":
            "connected",

        ".empty-message h3":
            "waitingTitle",

        ".empty-message p":
            "waitingText",

        ".empty-message button":
            "copyRoom",

        ".screen-share small":
            "shareScreen",

        ".control.danger small":
            "leave",

        ".settings-heading h3":
            "settings",

        ".settings-heading p":
            "settingsText"
    };


    Object.entries(map)
        .forEach(
            ([selector, key]) => {

                const element =
                    document.querySelector(
                        selector
                    );

                if (!element) return;


                if (
                    element.tagName ===
                    "INPUT"
                ) {

                    element.placeholder =
                        t(key);

                } else {

                    element.textContent =
                        t(key);
                }
            }
        );


    const hero =
        document.querySelector(
            ".hero h2"
        );


    if (hero) {

        const first =
            hero.childNodes[0];

        if (first) {

            first.textContent =
                t("heroTitle1") +
                "\n";
        }
    }


    updateMicButton();
    updateCameraButton();
}


// ======================================================
// اختبار المايك
// ======================================================

async function testMicrophone() {

    try {

        const stream =
            await navigator.mediaDevices
                .getUserMedia({
                    audio: true
                });


        stream
            .getTracks()
            .forEach(track =>
                track.stop()
            );


        showToast(
            t("micWorking")
        );

    } catch (error) {

        console.error(error);

        showToast(
            t("micPermission")
        );
    }
}


// ======================================================
// اختبار الكاميرا
// ======================================================

async function testCamera() {

    try {

        const stream =
            await navigator.mediaDevices
                .getUserMedia({
                    video: true
                });


        stream
            .getTracks()
            .forEach(track =>
                track.stop()
            );


        showToast(
            t("cameraWorking")
        );

    } catch (error) {

        console.error(error);

        showToast(
            t("cameraPermission2")
        );
    }
}


// ======================================================
// تحميل الإعدادات
// ======================================================

window.addEventListener(
    "load",
    () => {

        const savedTheme =
            localStorage.getItem(
                "wasl-theme"
            );


        const savedLanguage =
            localStorage.getItem(
                "wasl-language"
            );


        if (savedTheme) {
            currentTheme =
                savedTheme;
        }


        if (savedLanguage) {
            currentLanguage =
                savedLanguage;
        }


        document.documentElement.lang =
            currentLanguage;


        document.documentElement.dir =
            currentLanguage === "ar"
                ? "rtl"
                : "ltr";


        setThemeWithoutToast(
            currentTheme
        );


        updateLanguageChoices();

        applyLanguage();

        updateMicButton();
        updateCameraButton();
    }
);


// ======================================================
// تطبيق المظهر بدون إشعار
// ======================================================

function setThemeWithoutToast(
    theme
) {

    if (theme === "light") {

        document.body.classList.add(
            "light"
        );

    } else {

        document.body.classList.remove(
            "light"
        );
    }


    document
        .getElementById("lightChoice")
        ?.classList.toggle(
            "active",
            theme === "light"
        );


    document
        .getElementById("darkChoice")
        ?.classList.toggle(
            "active",
            theme === "dark"
        );
}


// ======================================================
// تحديث أزرار اللغة
// ======================================================

function updateLanguageChoices() {

    document
        .getElementById(
            "arabicChoice"
        )
        ?.classList.toggle(
            "active",
            currentLanguage === "ar"
        );


    document
        .getElementById(
            "englishChoice"
        )
        ?.classList.toggle(
            "active",
            currentLanguage === "en"
        );
}
