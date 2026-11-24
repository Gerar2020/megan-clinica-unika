document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("megan-video");
  const play = document.getElementById("film-play");
  const sound = document.getElementById("film-sound");
  if (!video || !play || !sound) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let inView = false;
  let manuallyPaused = false;
  const start = () => { video.play().catch(() => { play.textContent = "Reproducir"; }); };
  video.addEventListener("play", () => { play.textContent = "Pausar"; });
  video.addEventListener("pause", () => { play.textContent = "Reproducir"; });
  play.addEventListener("click", () => {
    manuallyPaused = !video.paused;
    if (video.paused) start(); else video.pause();
  });
  sound.addEventListener("click", () => {
    video.muted = !video.muted;
    sound.setAttribute("aria-pressed", String(!video.muted));
    sound.textContent = video.muted ? "Activar sonido" : "Silenciar";
    if (video.paused) { manuallyPaused = false; start(); }
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      if (visible && !inView) {
        inView = true;
        if (!reduceMotion && !manuallyPaused && !document.hidden) start();
      } else if (!visible && inView) {
        inView = false;
        video.pause();
        video.currentTime = 0;
        manuallyPaused = false;
      }
    }, { threshold: [0, 0.5] }).observe(video);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) video.pause();
    else if (inView && !reduceMotion && !manuallyPaused) start();
  });
});
