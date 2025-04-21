// Tampilkan info perangkat
const deviceInfo = document.getElementById("deviceInfo");
deviceInfo.innerHTML = `
  <strong>User Agent:</strong> ${navigator.userAgent}<br>
  <strong>Platform:</strong> ${navigator.platform}<br>
  <strong>Resolusi Layar:</strong> ${window.screen.width} x ${window.screen.height}
`;

fetch("https://ipinfo.io/json?token=8f8f1f3820adfb")
  .then(res => res.json())
  .then(data => {
    document.getElementById("ipInfo").innerHTML = `
      <strong>IP Address:</strong> ${data.ip}<br>
      <strong>Kota:</strong> ${data.city}<br>
      <strong>Negara:</strong> ${data.country}<br>
      <strong>Lokasi (koordinat):</strong> ${data.loc}
    `;
  })
  .catch(() => {
    document.getElementById("ipInfo").innerHTML = "Gagal mengambil info IP.";
  });
