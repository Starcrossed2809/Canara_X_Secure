// ========== FACE RECOGNITION ==========
const video = document.getElementById('video');
const canvas = document.getElementById('faceCanvas');
const captureFaceBtn = document.getElementById('captureFaceBtn');

async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert("Error accessing webcam: " + err.message);
  }
}
startWebcam();

captureFaceBtn.onclick = () => {
  const ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.classList.remove('hidden');
  const dataURL = canvas.toDataURL('image/png');
  console.log("Captured Face Data URL:", dataURL);
};

// ========== FINGERPRINT SIMULATION ==========
const fingerprintBox = document.getElementById('fingerprintBox');
const scannerText = document.getElementById('scannerText');
const scanLine = document.getElementById('scanLine');
const fingerprintStatus = document.getElementById('fingerprintStatus');

const scanFingerprintBtn = document.getElementById('scanFingerprintBtn');
const registerFingerprintBtn = document.getElementById('registerFingerprintBtn');
const authenticateFingerprintBtn = document.getElementById('authenticateFingerprintBtn');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scanFingerprint() {
  fingerprintStatus.textContent = "";
  scannerText.style.display = 'none';
  scanLine.style.display = 'block';

  await delay(3000);

  scanLine.style.display = 'none';
  scannerText.style.display = 'block';

  if (Math.random() > 0.3) {
    fingerprintStatus.textContent = "✅ Fingerprint scanned successfully.";
    return true;
  } else {
    fingerprintStatus.textContent = "❌ Fingerprint scanning failed. Please try again.";
    return false;
  }
}

async function registerFingerprint() {
  fingerprintStatus.textContent = "📝 Registering system fingerprint...";
  const success = await scanFingerprint();
  if (!success) {
    fingerprintStatus.textContent = "⚠️ Registration failed during scan.";
    return;
  }
  const fakeCredentialId = 'cred-' + Date.now();
  localStorage.setItem('biometricCredentialId', fakeCredentialId);
  fingerprintStatus.textContent = "✅ System fingerprint registered! Credential ID saved.";
}

async function authenticateFingerprint() {
  fingerprintStatus.textContent = "🔐 Authenticating with system fingerprint...";
  const savedCredentialId = localStorage.getItem('biometricCredentialId');
  if (!savedCredentialId) {
    fingerprintStatus.textContent = "⚠️ No registered system fingerprint found. Please register first.";
    return;
  }
  const success = await scanFingerprint();
  if (success) {
    fingerprintStatus.textContent = "✅ Authentication successful with system fingerprint!";
  } else {
    fingerprintStatus.textContent = "❌ Authentication failed. Please try again.";
  }
}

scanFingerprintBtn.onclick = scanFingerprint;
registerFingerprintBtn.onclick = registerFingerprint;
authenticateFingerprintBtn.onclick = authenticateFingerprint;
