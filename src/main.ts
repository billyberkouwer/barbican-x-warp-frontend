import "./style.css";

const playerOne = document.querySelector("#mux-player") as HTMLVideoElement;
const playerOneCover = document.querySelector("#mux-error__cover-1")

playerOne?.addEventListener("error", (e) => {
  playerOneCover?.classList.add("visible")
  setInterval(() => {
    playerOne?.play();
  }, 2000)
});

playerOne?.addEventListener("playing", () => {
  playerOneCover?.classList.remove("visible")
})

playerOne?.addEventListener("canplay", (e) => {
  playerOneCover?.classList.remove("visible")
  setInterval(() => {
    playerOne?.play();
  }, 2000)
  console.log(e, "canplay")
})

