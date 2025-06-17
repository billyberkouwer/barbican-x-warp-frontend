import { Manager } from "socket.io-client";
import { DEFAULT_PLAYBACK_ID, SERVER_ORIGIN } from "../../variables/constants";

const muxContainer = document.getElementById("mux-container") as HTMLDivElement;
let currentMobileVideoDisplay = 0;
const liveNowText = document.getElementById("live-now") as HTMLSpanElement;
const liveNowBanner = document.querySelector(".live-now-banner__container")

const manager = new Manager(SERVER_ORIGIN, {
    autoConnect: true,
    extraHeaders: { "ngrok-skip-browser-warning": "69420" }
});

const socket = manager.socket("/");

export default function initLiveFeed() {
    let playbackId = DEFAULT_PLAYBACK_ID;

    const playerOne = document.querySelector("#mux-player") as HTMLVideoElement | undefined;
    const playerOneCover = document.querySelector("#mux-error__cover-1")

    liveNowText.innerHTML = "Offline";
    liveNowBanner?.classList.add("orange")

    fetch(SERVER_ORIGIN + "/sign-in", {
        method: "GET",
        headers: { "ngrok-skip-browser-warning": "69420" }
    }).then(async res => {
        const json = await res.json();
        playerOne?.setAttribute("thumbnail-token", json.thumbnailToken);
        playerOne?.setAttribute("playback-token", json.token);
        initialiseStream(true)
    }).catch((err) => console.log(err))

    manager.open((err) => {
        if (err) {
            console.log(err)
        } else {

        }
    });

    socket.on("id", (e) => {
        playerOne?.setAttribute("metadata-viewer-user-id", e)
    })

    socket.on("connect", () => console.log(socket.connected ? "Logged In." : "Logged Out"))

    socket.on("streamData", (e) => {
        playbackId = e.playbackId;
        initialiseStream(true)
    })

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

    playerOne?.addEventListener("canplay", () => {
        playerOne?.play(); liveNowText.innerHTML = "Live Now";
        liveNowBanner?.classList.remove("orange")
        playerOne?.setAttribute("playback-id", playbackId);
        playerOneCover?.classList.remove("visible")
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
