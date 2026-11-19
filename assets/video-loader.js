document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("megan-video");
  const base64 = (window.__meganVideoParts || []).join("");
  if (!video || !base64) return;

  const raw = atob(base64);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) bytes[i] = raw.charCodeAt(i);
  video.src = URL.createObjectURL(new Blob([bytes], { type: "video/mp4" }));
});
