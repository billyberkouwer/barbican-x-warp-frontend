import { io } from "socket.io-client";
import { DEFAULT_PLAYBACK_ID, SERVER_ORIGIN } from "../../variables/constants";

const muxContainer = document.getElementById("mux-container") as HTMLDivElement;
let currentMobileVideoDisplay = 0;
const liveNowText = document.getElementById("live-now") as HTMLSpanElement;
const liveNowBanner = document.querySelector(".live-now-banner__container")

export default async function initLiveFeed() {
    const socket = io(SERVER_ORIGIN, { extraHeaders: { "ngrok-skip-browser-warning": "69420" } });
    let playbackId = DEFAULT_PLAYBACK_ID;

    const playerOne = document.querySelector("#mux-player") as HTMLVideoElement | undefined;
    const playerOneCover = document.querySelector("#mux-error__cover-1")

    liveNowText.innerHTML = "Offline";
    liveNowBanner?.classList.add("orange")

    await fetch(SERVER_ORIGIN + "/sign-in", {
        method: "GET",
        headers: { "ngrok-skip-browser-warning": "69420" }
    }).then(async res => {
        const json = await res.json();
        playerOne?.setAttribute("thumbnail-token", json.thumbnailToken);
        playerOne?.setAttribute("playback-token", json.token);
    }).catch((err) => console.log(err))

    function initialiseStream(isStreamActive: boolean) {
        if (isStreamActive && playerOne) {
            liveNowText.innerHTML = "Live Now";
            liveNowBanner?.classList.remove("orange")
            playerOne.setAttribute("playback-id", playbackId);
            playerOneCover?.classList.remove("visible")
        } else if (!isStreamActive && playerOne) {
            liveNowText.innerHTML = "Offline";
            liveNowBanner?.classList.add("orange")
            playerOne.setAttribute("playback-id", "");
            !playerOneCover?.classList.contains("visible") ? playerOneCover?.classList.add("visible") : null
        }
    }

    playerOne?.addEventListener("canplay", () => playerOne?.play())

    socket.on("id", (e) => {
        playerOne?.setAttribute("metadata-viewer-user-id", e)
    })

    socket.on("connect", () => console.log("Logged In."))

    socket.on("streamData", (e) => {
        playbackId = e.playbackId;
        initialiseStream(e.canPlay)
    })

    document.addEventListener("click", () => {
        muxContainer.classList.remove("position-" + currentMobileVideoDisplay)
        if (currentMobileVideoDisplay < 3) {
            currentMobileVideoDisplay++;
        } else {
            currentMobileVideoDisplay = 0;
        }
        muxContainer.classList.add("position-" + currentMobileVideoDisplay)
    })
}
