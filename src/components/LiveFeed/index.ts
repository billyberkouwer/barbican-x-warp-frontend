import { io } from "socket.io-client";
import { DEFAULT_PLAYBACK_ID, SERVER_ORIGIN } from "../../variables/constants";

export default function initLiveFeed() {
    const socket = io(SERVER_ORIGIN);
    let playbackId = DEFAULT_PLAYBACK_ID;

    const playerOne = document.querySelector("#mux-player") as HTMLVideoElement;
    const playerOneCover = document.querySelector("#mux-error__cover-1")

    function initialiseStream(isStreamActive: boolean) {
        if (isStreamActive && playerOne) {
            playerOne.setAttribute("playback-id", playbackId);
            playerOneCover?.classList.remove("visible")
        } else if (!isStreamActive && playerOne) {
            playerOne.setAttribute("playback-id", "");
            playerOneCover?.classList.add("visible")
        }
    }

    playerOne.addEventListener("canplay", () => playerOne?.play())

    socket.on("id", (e) => {
        playerOne.setAttribute("metadata-viewer-user-id", e)
    })

    socket.on("streamData", (e) => {
        console.log(e)
        playbackId = e.playbackId;
        initialiseStream(e.canPlay)
    })
}
