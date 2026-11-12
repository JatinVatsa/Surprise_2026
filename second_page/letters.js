const messages = {
  A: ["Absolutely amazing", "Aa$hrita, your kindness makes ordinary moments feel special."],
  B: ["Beautiful inside and out", "Your beauty is in your smile, your heart, and the way you make people feel seen."],
  C: ["Completely one of a kind", "There is nobody else quite like you, and that is one of my favorite things about you."],
  D: ["Deserving of every good thing", "I hope this year brings you the joy, care, and little adventures you deserve."],
  E: ["Endlessly lovely", "Your warmth has a way of making every place feel a little brighter."],
  F: ["Full of light", "Keep being your funny, thoughtful, wonderfully bright self."],
  G: ["Gorgeous, always", "You look lovely, but the way you care about people is what makes you truly gorgeous."],
  H: ["Heart of gold", "Your gentle heart is a gift to everyone lucky enough to know you."],
  I: ["Irreplaceable", "The world is better with you in it, and my days are brighter because of you."],
  J: ["Joy-bringer", "Your laugh and your energy can turn even a simple day into a happy memory."],
  K: ["Kind in a hundred little ways", "I notice the thoughtful things you do, even the ones you think nobody sees."],
  L: ["Lots of Love", "On your birthday and every day after, I hope you feel just how much you matter."],
  M: ["Made of magic", "You have a special way of making the people around you feel at home."],
  N: ["Naturally wonderful", "You never have to try to be someone else; being you is already more than enough."],
  O: ["One in a billion", "No gift could match the gift of having someone as lovely as you in my life."],
  P: ["Pretty incredible", "Your courage, sweetness, and sparkle make you so easy to celebrate."],
  Q: ["Quite unforgettable", "Every conversation and every shared laugh with you becomes a memory I treasure."],
  R: ["Radiant", "May your birthday shine with the same happiness you bring to everyone around you."],
  S: ["So special", "You deserve a day filled with your favorite things and people who adore you."],
  T: ["Thoughtful and true", "Thank you for being someone who listens, cares, and makes life sweeter."],
  U: ["Unapologetically you", "Never dim your sparkle; the world needs the wonderful person you are."],
  V: ["Valued, every day", "You are appreciated for all that you are, not just for all that you do."],
  W: ["Wonderful in every way", "I hope you find a hundred reasons to smile today, Aashrita."],
  X: ["X-traordinary", "Even the alphabet needed an extra-special letter for someone as extraordinary as you."],
  Y: ["Your own kind of lovely", "Keep following what makes you happy; you deserve a life that feels like you."],
  Z: ["Zero doubts: you’re amazing", "Here’s to a year full of laughter, lovely surprises, and all the happiness your heart can hold."]
};

const dialog = document.querySelector(".message-dialog");
const messageLetter = document.querySelector("#message-letter");
const messageTitle = document.querySelector("#message-title");
const messageCopy = document.querySelector("#message-copy");
const messageProgress = document.querySelector("#message-progress");
const warningDialog = document.querySelector("#reading-warning");
const warningCopy = document.querySelector("#warning-copy");
const nextButton = document.querySelector(".next-button");
const openedLetters = new Set();
const totalMessages = Object.keys(messages).length;

document.querySelectorAll(".letter-box").forEach((button) => {
  button.addEventListener("click", () => {
    const letter = button.dataset.letter;
    const [title, message] = messages[letter];
    openedLetters.add(letter);
    button.dataset.opened = "true";
    messageProgress.textContent = `Opened ${openedLetters.size} of ${totalMessages} messages`;
    messageLetter.textContent = letter;
    messageTitle.textContent = title;
    messageCopy.textContent = message;
    dialog.showModal();
  });
});

nextButton.addEventListener("click", (event) => {
  if (openedLetters.size === totalMessages) {
    return;
  }

  event.preventDefault();
  const remaining = totalMessages - openedLetters.size;
  warningCopy.textContent = `There ${remaining === 1 ? "is" : "are"} ${remaining} more ${remaining === 1 ? "message" : "messages"} waiting for you. Open every letter before continuing!`;
  warningDialog.showModal();
});
