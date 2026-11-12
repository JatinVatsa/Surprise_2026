const galleryCards = document.querySelectorAll(".photo-card");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && typeof Element.prototype.animate === "function") {
  galleryCards.forEach((card, index) => {
    const animation = card.animate(
      [
        { opacity: 0, transform: "translateY(48px) rotate(9deg) scale(0.82)" },
        { opacity: 1, transform: "translateY(0) rotate(0deg) scale(1)" },
      ],
      {
        duration: 720,
        delay: index * 190,
        easing: "cubic-bezier(0.2, 0.75, 0.25, 1)",
        fill: "both",
      },
    );

    animation.finished.then(() => animation.cancel());
  });
}
