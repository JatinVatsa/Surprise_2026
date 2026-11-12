const pageSong = document.getElementById("page-song");

if (pageSong) {
  const positionKey = "birthday-jashn-e-bahara-position";
  const savedPosition = Number(sessionStorage.getItem(positionKey));
  let positionRestored = false;

  function savePosition() {
    if (positionRestored && Number.isFinite(pageSong.currentTime)) {
      sessionStorage.setItem(positionKey, String(pageSong.currentTime));
    }
  }

  function startPageSong() {
    if (!positionRestored || pageSong.paused === false) {
      return;
    }

    pageSong.play().then(() => {
      document.removeEventListener("pointerdown", startPageSong);
      document.removeEventListener("keydown", startPageSong);
    }).catch((error) => {
      if (error.name !== "NotAllowedError") {
        console.error("Could not play the page song:", error);
      }
    });
  }

  function restorePositionAndPlay() {
    if (positionRestored || !Number.isFinite(pageSong.duration)) {
      return;
    }

    if (Number.isFinite(savedPosition) && savedPosition > 0 && savedPosition < pageSong.duration) {
      pageSong.currentTime = savedPosition;
    }

    positionRestored = true;
    startPageSong();
  }

  pageSong.addEventListener("loadedmetadata", restorePositionAndPlay, { once: true });
  pageSong.addEventListener("timeupdate", savePosition);
  window.addEventListener("pagehide", savePosition);
  document.addEventListener("pointerdown", startPageSong);
  document.addEventListener("keydown", startPageSong);

  if (pageSong.readyState >= HTMLMediaElement.HAVE_METADATA) {
    restorePositionAndPlay();
  }
}
