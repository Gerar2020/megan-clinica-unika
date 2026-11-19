document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("megan-video");
  const base64 = (window.__meganVideoParts || []).join("");
  if (!video || !base64) return;

  const raw = atob(base64);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) bytes[i] = raw.charCodeAt(i);
  video.src = URL.createObjectURL(new Blob([bytes], { type: "video/mp4" }));

  let hasEnteredView = false;
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
      if (!hasEnteredView) video.currentTime = 0;
      hasEnteredView = true;
      video.play().catch(() => {});
      return;
    }

    if (hasEnteredView) {
      video.pause();
      video.currentTime = 0;
      hasEnteredView = false;
    }
  }, { threshold: [0, 0.55] });
  observer.observe(video);

  const soundToggle = document.querySelector(".sound-toggle");
  soundToggle?.addEventListener("click", () => {
    video.muted = !video.muted;
    soundToggle.setAttribute("aria-pressed", String(!video.muted));
    soundToggle.textContent = video.muted ? "Activar sonido" : "Sonido activado";
    video.play().catch(() => {});
  });
});
