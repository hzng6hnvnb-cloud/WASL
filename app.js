let currentRoom = null;
let currentName = "أنت";

let micEnabled = true;
let cameraEnabled = false;

let currentTheme = "dark";
let currentLanguage = "ar";

let cameraStream = null;
let cameraFacing = "user";


// ==============================
// الترجمة
// ==============================

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
        createText: "أنشئ غرفة جديدة وشارك الرقم مع أصحابك.",
        yourName: "اسمك",
        namePlaceholder: "اكتب اسمك",

        joinTitle: "دخول غرفة",
        joinText: "أدخل رقم الغرفة المكون من 4 أرقام.",
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
        waitingText: "ارسل رقم الغرفة لهم وخلهم يدخلون.",
        copyRoom: "نسخ رقم الغرفة",

        mute: "كتم الصوت",
        unmute: "فتح الصوت",
        cameraOn: "إيقاف الكاميرا",
        cameraButton: "الكاميرا",
        shareScreen: "مشاركة الشاشة",
        leave: "مغادرة",

        settings: "الإعدادات",
        settingsText: "خصص وَصْل على طريقتك",

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
        invalidCode: "رقم الغرفة لازم يكون 4 أرقام",

        micOpened: "تم فتح المايك",
        micMuted: "تم كتم المايك",

        cameraStarted: "تم تشغيل الكاميرا",
        cameraStopped: "تم إيقاف الكاميرا",

        frontCamera: "الكاميرا الأمامية",
        backCamera: "الكاميرا الخلفية",
        cameraPermission: "المتصفح رفض الوصول للكاميرا",

        screenStarted: "بدأت مشاركة الشاشة",
        screenEnded: "انتهت مشاركة الشاشة",
        screenCancelled: "تم إلغاء مشاركة الشاشة",
        screenUnsupported: "مشاركة الشاشة غير مدعومة في هذا المتصفح",

        micWorking: "الميكروفون يعمل",
        micPermission: "لم يتم السماح بالمايك",

        cameraWorking: "الكاميرا تعمل",
        cameraPermission2: "لم يتم السماح بالكاميرا",

        leftRoom: "تمت مغادرة الغرفة",

        darkActivated: "تم تفعيل المظهر الداكن",
        lightActivated: "تم تفعيل المظهر الفاتح"
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
        createText: "Create a new room and share the code with your friends.",
        yourName: "Your name",
        namePlaceholder: "Enter your name",

        joinTitle: "Join Room",
        joinText: "Enter the 4-digit room code.",
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
        waitingText: "Send them the room code and let them join.",
        copyRoom: "Copy room code",

        mute: "Mute",
        unmute: "Unmute",
        cameraOn: "Turn off camera",
        cameraButton: "Camera",
        shareScreen: "Share screen",
        leave: "Leave",

        settings: "Settings",
        settingsText: "Customize WASL your way",

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
        invalidCode: "Room code must contain 4 digits",

        micOpened: "Microphone enabled",
        micMuted: "Microphone muted",

        cameraStarted: "Camera started",
        cameraStopped: "Camera stopped",

        frontCamera: "Front camera",
        backCamera: "Back camera",
        cameraPermission: "Camera permission was denied",

        screenStarted: "Screen sharing started",
        screenEnded: "Screen sharing ended",
        screenCancelled: "Screen sharing cancelled",
        screenUnsupported: "Screen sharing is not supported here",

        micWorking: "Microphone is working",
        micPermission: "Microphone permission was denied",

        cameraWorking: "Camera is working",
        cameraPermission2: "Camera permission was denied",

        leftRoom: "You left the room",

        darkActivated: "Dark mode enabled",
        lightActivated: "Light mode enabled"
    }
};


function t(key) {
    return translations[currentLanguage][key] || key;
}


// ==============================
// إشعار
// ==============================

function showToast(message) {

    const toast = document.getElementById("toast");
    const text = document.getElementById("toastText");

    text.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


// ==============================
// التنقل
// ==============================

function openScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}


// ==============================
// النوافذ
// ==============================

function showCreate() {
    document.getElementById("createModal").classList.add("show");
}

function showJoin() {
    document.getElementById("joinModal").classList.add("show");
}

function closeModals() {

    document.querySelectorAll(".modal").forEach(modal => {
        modal.classList.remove("show");
    });
}

function openSettings() {
    document.getElementById("settingsModal").classList.add("show");
}

function closeSettings() {
    document.getElementById("settingsModal").classList.remove("show");
}


// ==============================
// إنشاء رقم الغرفة
// ==============================

function generateRoomCode() {

    return Math.floor(
        1000 + Math.random() * 9000
    ).toString();
}


// ==============================
// إنشاء غرفة
// ==============================

function createRoom() {

    const name =
        document.getElementById("createName").value.trim();

    if (!name) {
        showToast(t("enterName"));
        return;
    }

    currentName = name;
    currentRoom = generateRoomCode();

    enterRoom();

    showToast(t("roomCreated"));
}


// ==============================
// دخول غرفة
// ==============================

function joinRoom() {

    const name =
        document.getElementById("joinName").value.trim();

    const code =
        document.getElementById("roomCodeInput").value.trim();

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

    enterRoom();

    showToast(t("roomJoined"));
}


// ==============================
// الدخول للغرفة
// ==============================

function enterRoom() {

    closeModals();

    document.getElementById("roomCode").textContent =
        currentRoom;

    document.getElementById("localName").textContent =
        currentName;

    openScreen("room");

    document.getElementById("roomStatus").textContent =
        t("waiting");
}


// ==============================
// نسخ الرقم
// ==============================

async function copyRoomCode() {

    if (!currentRoom) return;

    try {

        await navigator.clipboard.writeText(currentRoom);

        showToast(t("copied"));

    } catch {

        showToast(currentRoom);
    }
}


// ==============================
// المايك
// ==============================

function toggleMic() {

    micEnabled = !micEnabled;

    const button =
        document.getElementById("micButton");

    const icon =
        document.getElementById("localMicIcon");

    if (micEnabled) {

        button.classList.remove("off");

        button.querySelector("small").textContent =
            t("mute");

        icon.textContent = "🎙";

        showToast(t("micOpened"));

    } else {

        button.classList.add("off");

        button.querySelector("small").textContent =
            t("unmute");

        icon.textContent = "🔇";

        showToast(t("micMuted"));
    }
}


// ==============================
// تشغيل / إيقاف الكاميرا
// ==============================

async function toggleCamera() {

    if (cameraEnabled) {

        stopCamera();

        return;
    }

    await startCamera(cameraFacing);
}


// ==============================
// تشغيل الكاميرا
// ==============================

async function startCamera(facingMode) {

    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {

        showToast(t("cameraPermission"));
        return;
    }

    try {

        if (cameraStream) {

            cameraStream
                .getTracks()
                .forEach(track => track.stop());
        }

        cameraStream =
            await navigator.mediaDevices.getUserMedia({

                video: {
                    facingMode: {
                        ideal: facingMode
                    }
                },

                audio: false
            });

        cameraEnabled = true;

        const card =
            document.querySelector(".local-card");

        const placeholder =
            card.querySelector(".video-placeholder");

        placeholder.innerHTML = "";

        const video =
            document.createElement("video");

        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;

        video.srcObject = cameraStream;

        video.style.width = "100%";
        video.style.height = "100%";
        video.style.objectFit = "cover";

        /*
         * الكاميرا الأمامية تكون معكوسة فقط أثناء المعاينة،
         * مثل تطبيقات الاتصال المعتادة.
         */
        if (facingMode === "user") {
            video.style.transform = "scaleX(-1)";
        } else {
            video.style.transform = "scaleX(1)";
        }

        placeholder.appendChild(video);

        const button =
            document.getElementById("cameraButton");

        button.classList.remove("off");

        button.querySelector("small").textContent =
            t("cameraOn");

        showToast(
            facingMode === "user"
                ? t("frontCamera")
                : t("backCamera")
        );

    } catch (error) {

        cameraEnabled = false;
        cameraStream = null;

        showToast(t("cameraPermission"));
    }
}


// ==============================
// إيقاف الكاميرا
// ==============================

function stopCamera() {

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(track => track.stop());

        cameraStream = null;
    }

    cameraEnabled = false;

    const card =
        document.querySelector(".local-card");

    const placeholder =
        card.querySelector(".video-placeholder");

    placeholder.innerHTML = `
        <div class="avatar">
            ${currentName.charAt(0).toUpperCase()}
        </div>

        <div class="camera-off">
            ${t("cameraOff")}
        </div>
    `;

    const button =
        document.getElementById("cameraButton");

    button.classList.add("off");

    button.querySelector("small").textContent =
        t("cameraButton");

    showToast(t("cameraStopped"));
}


// ==============================
// قلب الكاميرا
// ==============================
//
// ما أضفنا زر جديد حتى ما نغير الواجهة.
// اضغط زر الكاميرا مرتين بسرعة.
//

let lastCameraClick = 0;

document.addEventListener("DOMContentLoaded", () => {

    const cameraButton =
        document.getElementById("cameraButton");

    cameraButton.addEventListener("dblclick", async () => {

        if (!cameraEnabled) {

            await startCamera(cameraFacing);
            return;
        }

        cameraFacing =
            cameraFacing === "user"
                ? "environment"
                : "user";

        await startCamera(cameraFacing);
    });
});


// ==============================
// مشاركة الشاشة
// ==============================

async function shareScreen() {

    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getDisplayMedia) {

        showToast(t("screenUnsupported"));
        return;
    }

    try {

        const stream =
            await navigator.mediaDevices.getDisplayMedia({

                video: {
                    cursor: "always"
                },

                audio: true
            });

        const video =
            document.createElement("video");

        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;

        video.srcObject = stream;

        video.style.position = "fixed";
        video.style.zIndex = "200";
        video.style.left = "20px";
        video.style.bottom = "100px";
        video.style.width = "280px";
        video.style.maxHeight = "220px";
        video.style.objectFit = "contain";
        video.style.background = "#000";
        video.style.borderRadius = "18px";
        video.style.border =
            "1px solid rgba(255,255,255,.15)";
        video.style.boxShadow =
            "0 20px 60px rgba(0,0,0,.5)";

        document.body.appendChild(video);

        showToast(t("screenStarted"));

        const track =
            stream.getVideoTracks()[0];

        track.addEventListener("ended", () => {

            video.remove();

            showToast(t("screenEnded"));
        });

    } catch (error) {

        showToast(t("screenCancelled"));
    }
}


// ==============================
// مغادرة الغرفة
// ==============================

function leaveRoom() {

    stopCamera();

    currentRoom = null;

    openScreen("home");

    showToast(t("leftRoom"));
}


// ==============================
// المظهر
// ==============================

function setTheme(theme) {

    currentTheme = theme;

    if (theme === "light") {

        document.body.classList.add("light");

        document
            .getElementById("lightChoice")
            .classList.add("active");

        document
            .getElementById("darkChoice")
            .classList.remove("active");

        showToast(t("lightActivated"));

    } else {

        document.body.classList.remove("light");

        document
            .getElementById("darkChoice")
            .classList.add("active");

        document
            .getElementById("lightChoice")
            .classList.remove("active");

        showToast(t("darkActivated"));
    }

    localStorage.setItem(
        "wasl-theme",
        theme
    );
}


// ==============================
// تغيير اللغة
// ==============================

function setLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang =
        language;

    document.documentElement.dir =
        language === "ar"
            ? "rtl"
            : "ltr";

    document
        .getElementById("arabicChoice")
        .classList.toggle(
            "active",
            language === "ar"
        );

    document
        .getElementById("englishChoice")
        .classList.toggle(
            "active",
            language === "en"
        );

    applyLanguage();

    localStorage.setItem(
        "wasl-language",
        language
    );
}


// ==============================
// تطبيق اللغة على كل الواجهة
// ==============================

function applyLanguage() {

    const map = {

        ".brand span": "tagline",

        ".hero-badge": "secure",

        ".hero h2 span": "heroTitle2",

        ".hero p": "heroText",

        ".home-actions .primary-button": "createRoom",
        ".home-actions .secondary-button": "joinRoom",

        ".features div:nth-child(1) span": "voice",
        ".features div:nth-child(2) span": "camera",
        ".features div:nth-child(3) span": "screen",

        "#createModal h3": "createTitle",
        "#createModal > .modal-card > p": "createText",

        "#joinModal h3": "joinTitle",
        "#joinModal > .modal-card > p": "joinText",

        "#createModal label": "yourName",
        "#joinModal label:first-of-type": "yourName",
        "#joinModal label:last-of-type": "roomNumber",

        "#createName": "namePlaceholder",
        "#joinName": "namePlaceholder",

        "#createModal .full": "createRoom",
        "#joinModal .full": "enterRoom",

        ".room-code-box span": "roomNumber",

        ".room-title .small-label": "friendsRoom",
        ".room-title h2": "groupCall",

        ".connection": "connected",

        ".empty-message h3": "waitingTitle",
        ".empty-message p": "waitingText",

        ".empty-message button": "copyRoom",

        "#micButton small":
            micEnabled ? "mute" : "unmute",

        "#cameraButton small":
            cameraEnabled
                ? "cameraOn"
                : "cameraButton",

        ".screen-share small": "shareScreen",

        ".control.danger small": "leave",

        ".settings-heading h3": "settings",
        ".settings-heading p": "settingsText",

        ".setting-section:nth-of-type(1) .setting-title":
            "appearance",

        "#darkChoice span": "dark",
        "#lightChoice span": "light",

        ".setting-section:nth-of-type(2) .setting-title":
            "language",

        "#arabicChoice span": "arabic",
        "#englishChoice span": "english",

        ".setting-section:nth-of-type(3) .setting-title":
            "audioVideo",

        ".device-row:nth-child(2) strong":
            "micTest",

        ".device-row:nth-child(3) strong":
            "cameraTest",

        ".device-row:nth-child(2) small":
            "pressTest",

        ".device-row:nth-child(3) small":
            "pressTest"
    };


    Object.entries(map).forEach(
        ([selector, key]) => {

            const element =
                document.querySelector(selector);

            if (!element) return;

            if (element.tagName === "INPUT") {

                element.placeholder =
                    t(key);

            } else {

                element.textContent =
                    t(key);
            }
        }
    );


    document.querySelector(
        ".hero h2"
    ).childNodes[0].textContent =
        t("heroTitle1") + "\n";


    const localLabel =
        document.querySelector(
            ".local-card .person-info span"
        );

    if (localLabel) {
        localLabel.textContent = t("you");
    }

    const cameraOff =
        document.querySelector(".camera-off");

    if (cameraOff && !cameraEnabled) {
        cameraOff.textContent = t("cameraOff");
    }
}


// ==============================
// اختبار المايك
// ==============================

async function testMicrophone() {

    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({
                audio: true
            });

        stream
            .getTracks()
            .forEach(track => track.stop());

        showToast(t("micWorking"));

    } catch {

        showToast(t("micPermission"));
    }
}


// ==============================
// اختبار الكاميرا
// ==============================

async function testCamera() {

    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: {
                        ideal: "user"
                    }
                }
            });

        stream
            .getTracks()
            .forEach(track => track.stop());

        showToast(t("cameraWorking"));

    } catch {

        showToast(t("cameraPermission2"));
    }
}


// ==============================
// تحميل الإعدادات
// ==============================

window.addEventListener("load", () => {

    const savedTheme =
        localStorage.getItem("wasl-theme");

    const savedLanguage =
        localStorage.getItem("wasl-language");

    if (savedTheme) {

        setTheme(savedTheme);

    } else {

        setTheme("dark");
    }


    if (savedLanguage) {

        currentLanguage = savedLanguage;

    } else {

        currentLanguage = "ar";
    }

    document.documentElement.lang =
        currentLanguage;

    document.documentElement.dir =
        currentLanguage === "ar"
            ? "rtl"
            : "ltr";

    applyLanguage();
});
