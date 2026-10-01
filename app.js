let currentRoom = null;
let currentName = "أنت";
let micEnabled = true;
let cameraEnabled = false;
let currentTheme = "dark";
let currentLanguage = "ar";


// ==============================
// أدوات عامة
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


// ==============================
// إنشاء رقم الغرفة
// ==============================

function generateRoomCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}


// ==============================
// إنشاء غرفة
// ==============================

function createRoom() {

    const name = document.getElementById("createName").value.trim();

    if (!name) {
        showToast("اكتب اسمك أول");
        return;
    }

    currentName = name;
    currentRoom = generateRoomCode();

    enterRoom();

    showToast("تم إنشاء الغرفة");
}


// ==============================
// دخول غرفة
// ==============================

function joinRoom() {

    const name = document.getElementById("joinName").value.trim();
    const code = document.getElementById("roomCodeInput").value.trim();

    if (!name) {
        showToast("اكتب اسمك أول");
        return;
    }

    if (!/^\d{4}$/.test(code)) {
        showToast("رقم الغرفة لازم يكون 4 أرقام");
        return;
    }

    currentName = name;
    currentRoom = code;

    enterRoom();

    showToast("تم الدخول للغرفة");
}


// ==============================
// الدخول للغرفة
// ==============================

function enterRoom() {

    closeModals();

    document.getElementById("roomCode").textContent = currentRoom;
    document.getElementById("localName").textContent = currentName;

    openScreen("room");

    document.getElementById("roomStatus").textContent =
        "بانتظار الأصدقاء";
}


// ==============================
// نسخ رقم الغرفة
// ==============================

async function copyRoomCode() {

    if (!currentRoom) return;

    try {
        await navigator.clipboard.writeText(currentRoom);
        showToast("تم نسخ رقم الغرفة");
    } catch {
        showToast("رقم الغرفة: " + currentRoom);
    }
}


// ==============================
// المايك
// ==============================

function toggleMic() {

    micEnabled = !micEnabled;

    const button = document.getElementById("micButton");
    const icon = document.getElementById("localMicIcon");

    if (micEnabled) {

        button.classList.remove("off");
        button.querySelector("small").textContent = "كتم الصوت";
        icon.textContent = "🎙";

        showToast("تم فتح المايك");

    } else {

        button.classList.add("off");
        button.querySelector("small").textContent = "الصوت مكتوم";
        icon.textContent = "🔇";

        showToast("تم كتم المايك");
    }
}


// ==============================
// الكاميرا
// ==============================

function toggleCamera() {

    cameraEnabled = !cameraEnabled;

    const button = document.getElementById("cameraButton");

    if (cameraEnabled) {

        button.classList.remove("off");
        button.querySelector("small").textContent = "إيقاف الكاميرا";

        showToast("تم تشغيل الكاميرا");

        startCameraPreview();

    } else {

        button.classList.add("off");
        button.querySelector("small").textContent = "الكاميرا";

        showToast("تم إيقاف الكاميرا");
    }
}


// ==============================
// معاينة الكاميرا
// ==============================

async function startCameraPreview() {

    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        const card = document.querySelector(".local-card");
        const placeholder = card.querySelector(".video-placeholder");

        placeholder.innerHTML = "";

        const video = document.createElement("video");

        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;
        video.srcObject = stream;

        video.style.width = "100%";
        video.style.height = "100%";
        video.style.objectFit = "cover";

        placeholder.appendChild(video);

    } catch (error) {

        cameraEnabled = false;

        showToast("المتصفح رفض الوصول للكاميرا");
    }
}


// ==============================
// مشاركة الشاشة
// ==============================

async function shareScreen() {

    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getDisplayMedia) {

        showToast("مشاركة الشاشة غير مدعومة هنا");
        return;
    }

    try {

        const stream =
            await navigator.mediaDevices.getDisplayMedia({
                video: true
            });

        showToast("بدأت مشاركة الشاشة");

        const video = document.createElement("video");

        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;
        video.srcObject = stream;

        video.style.position = "fixed";
        video.style.zIndex = "200";
        video.style.left = "20px";
        video.style.bottom = "100px";
        video.style.width = "280px";
        video.style.borderRadius = "18px";
        video.style.border = "1px solid rgba(255,255,255,.15)";
        video.style.boxShadow = "0 20px 60px rgba(0,0,0,.5)";

        document.body.appendChild(video);

        stream.getVideoTracks()[0].addEventListener(
            "ended",
            () => {
                video.remove();
                showToast("انتهت مشاركة الشاشة");
            }
        );

    } catch {

        showToast("تم إلغاء مشاركة الشاشة");
    }
}


// ==============================
// مغادرة الغرفة
// ==============================

function leaveRoom() {

    currentRoom = null;

    openScreen("home");

    showToast("تمت مغادرة الغرفة");
}


// ==============================
// الإعدادات
// ==============================

function openSettings() {
    document.getElementById("settingsModal").classList.add("show");
}

function closeSettings() {
    document.getElementById("settingsModal").classList.remove("show");
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

        showToast("تم تفعيل المظهر الفاتح");

    } else {

        document.body.classList.remove("light");

        document
            .getElementById("darkChoice")
            .classList.add("active");

        document
            .getElementById("lightChoice")
            .classList.remove("active");

        showToast("تم تفعيل المظهر الداكن");
    }

    localStorage.setItem("wasl-theme", theme);
}


// ==============================
// اللغة
// ==============================

function setLanguage(language) {

    currentLanguage = language;

    document
        .getElementById("arabicChoice")
        .classList.toggle("active", language === "ar");

    document
        .getElementById("englishChoice")
        .classList.toggle("active", language === "en");

    if (language === "en") {

        showToast("English mode selected");

        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";

    } else {

        showToast("تم اختيار العربية");

        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";
    }
}


// ==============================
// اختبار المايك
// ==============================

async function testMicrophone() {

    try {

        await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        showToast("الميكروفون يعمل");

    } catch {

        showToast("لم يتم السماح بالمايك");
    }
}


// ==============================
// اختبار الكاميرا
// ==============================

async function testCamera() {

    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({
                video: true
            });

        stream.getTracks().forEach(track => track.stop());

        showToast("الكاميرا تعمل");

    } catch {

        showToast("لم يتم السماح بالكاميرا");
    }
}


// ==============================
// تحميل الإعدادات
// ==============================

window.addEventListener("load", () => {

    const savedTheme =
        localStorage.getItem("wasl-theme");

    if (savedTheme) {
        setTheme(savedTheme);
    }

});
