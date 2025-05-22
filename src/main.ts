import "./style.css";
import { io } from "socket.io-client";

const socket = io(import.meta.env.SERVER_ORIGIN);

const playerOne = document.querySelector("#mux-player") as HTMLVideoElement;
const playerOneCover = document.querySelector("#mux-error__cover-1")

let playbackId = import.meta.env.MUX_PLAYBACK_ID;

function initialiseStream(isStreamActive: boolean) {
  if (isStreamActive && playerOne) {
    playerOne.setAttribute("playback-id", playbackId);
    playerOneCover?.classList.remove("visible")
  } else {
    playerOne.setAttribute("playback-id", "");
    playerOneCover?.classList.add("visible")
  }
}

playerOne.addEventListener("canplay", () => playerOne?.play())

socket.on("streamInfo", (e) => {
  console.log(e)
  playbackId = e.playbackId;
  initialiseStream(e.canPlay)
})

socket.on("isStreamActive", (e) => {
  const isStreamActive = e;
  console.log("isStreamActive: ", isStreamActive)
  initialiseStream(isStreamActive)
}
)