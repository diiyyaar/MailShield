const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");

analyzeBtn.addEventListener("click", function () {

    const email = document.getElementById("emailInput").value.toLowerCase();

    if (email.trim() === "") {
        result.innerHTML = "<span style='color:orange;'>⚠ Please paste an email first.</span>";
        return;
    }

    const suspiciousWords = [
        "urgent",
        "verify",
        "password",
        "otp",
        "click here",
        "bank",
        "login",
        "account",
        "suspended",
        "prize",
        "winner",
        "gift",
        "limited time",
        "free",
        "confirm",
        "security alert",
        "reset password"
    ];

    let detected = [];

    suspiciousWords.forEach(word => {
        if (email.includes(word)) {
            detected.push(word);
        }
    });

    let risk = "";
    let color = "";
    let tips = "";

    if (detected.length >= 5) {

        risk = "🔴 HIGH RISK";
        color = "#ff4d4d";

        tips = `
        <ul>
            <li>Don't click any links.</li>
            <li>Don't share passwords or OTP.</li>
            <li>Verify the sender.</li>
            <li>Report the email as phishing.</li>
        </ul>`;

    }

    else if (detected.length >= 2) {

        risk = "🟡 MEDIUM RISK";
        color = "#FFD700";

        tips = `
        <ul>
            <li>Double-check the sender.</li>
            <li>Inspect links before clicking.</li>
            <li>Avoid sharing sensitive details.</li>
        </ul>`;

    }

    else {

        risk = "🟢 LOW RISK";
        color = "#32CD32";

        tips = `
        <ul>
            <li>No major phishing indicators found.</li>
            <li>Still verify unexpected emails.</li>
        </ul>`;
    }

    result.innerHTML = `
        <div style="
            margin-top:30px;
            background:#111827;
            padding:25px;
            border-radius:15px;
            text-align:left;
            max-width:700px;
            margin-inline:auto;
        ">

        <h2 style="color:${color};">${risk}</h2>

        <br>

        <h3>Suspicious Words Found:</h3>

        <p>${detected.length ? detected.join(", ") : "None"}</p>

        <br>

        <h3>Safety Tips</h3>

        ${tips}

        </div>
    `;

});