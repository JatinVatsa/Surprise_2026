const audio = document.getElementById("background-song");
const status = document.getElementById("music-status");
const positionKey = "birthday-hawayein-position";
const savedPosition = Number(sessionStorage.getItem(positionKey));
let positionRestored = false;
let playbackAttemptPending = false;

function savePosition() {
  if (positionRestored && Number.isFinite(audio.currentTime)) {
    sessionStorage.setItem(positionKey, String(audio.currentTime));
  }
}

function startPlayback() {
  if (!positionRestored || !audio.paused || playbackAttemptPending) {
    return;
  }

  playbackAttemptPending = true;
  audio.play().then(() => {
    document.removeEventListener("pointerdown", startPlayback);
    document.removeEventListener("keydown", startPlayback);
    status.textContent = "";
  }).catch((error) => {
    if (error.name === "NotAllowedError") {
      status.textContent = "Tap or press a key to start the music.";
      return;
    }

    document.removeEventListener("pointerdown", startPlayback);
    document.removeEventListener("keydown", startPlayback);
    console.error("Hawayein could not be played:", error);
    status.textContent = "The music could not be played.";
  }).finally(() => {
    playbackAttemptPending = false;
  });
}

function restoreAndPlay() {
  if (positionRestored || !Number.isFinite(audio.duration)) {
    return;
  }

  if (Number.isFinite(savedPosition) && savedPosition > 0 && savedPosition < audio.duration) {
    audio.currentTime = savedPosition;
  }

  positionRestored = true;
  startPlayback();
}

audio.addEventListener("loadedmetadata", restoreAndPlay, { once: true });
audio.addEventListener("timeupdate", savePosition);
window.addEventListener("pagehide", savePosition);
document.addEventListener("pointerdown", startPlayback);
document.addEventListener("keydown", startPlayback);

if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
  restoreAndPlay();
}
