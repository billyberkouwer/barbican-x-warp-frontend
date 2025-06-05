import { io } from "socket.io-client";
import { DEFAULT_PLAYBACK_ID, SERVER_ORIGIN } from "../../variables/constants";

export default async function initLiveFeed() {
    const socket = io(SERVER_ORIGIN, { extraHeaders: { "ngrok-skip-browser-warning": "69420" } });
    let playbackId = DEFAULT_PLAYBACK_ID;

    const playerOne = document.querySelector("#mux-player") as HTMLVideoElement | undefined;
    const playerOneCover = document.querySelector("#mux-error__cover-1")

    await fetch(SERVER_ORIGIN + "/sign-in", {
        method: "GET",
        headers: { "ngrok-skip-browser-warning": "69420" }
    }).then(async res => {
        const json = await res.json();
        playerOne?.setAttribute("playback-token", json.token);
        playerOne?.setAttribute("thumbnail-token", json.thumbnailToken);
    }).catch((err) => console.log(err))

    function initialiseStream(isStreamActive: boolean) {
        if (isStreamActive && playerOne) {
            playerOne.setAttribute("playback-id", playbackId);
            playerOneCover?.classList.remove("visible")
        } else if (!isStreamActive && playerOne) {
            playerOne.setAttribute("playback-id", "");
            !playerOneCover?.classList.contains("visible") ? playerOneCover?.classList.add("visible") : null
        }
    }

    playerOne?.addEventListener("canplay", () => playerOne?.play())

    socket.on("id", (e) => {
        playerOne?.setAttribute("metadata-viewer-user-id", e)
    })

    socket.on("connect", () => console.log("connected") )

    socket.on("streamData", (e) => {
        console.log(e)
        playbackId = e.playbackId;
        initialiseStream(e.canPlay)
    })
}
