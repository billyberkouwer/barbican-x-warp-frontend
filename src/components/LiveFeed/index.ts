import { io } from "socket.io-client";
import { DEFAULT_PLAYBACK_ID, SERVER_ORIGIN } from "../../variables/constants";

export default async function initLiveFeed() {
    const socket = io(SERVER_ORIGIN);
    let playbackId = DEFAULT_PLAYBACK_ID;

    const playerOne = document.querySelector("#mux-player") as HTMLVideoElement;
    const playerOneCover = document.querySelector("#mux-error__cover-1")

    await fetch(SERVER_ORIGIN + "/sign-in", {
        method: "GET",
        headers: { "ngrok-skip-browser-warning": "69420" }
    }).then(async res => {
        const json = await res.json();
        console.log(json)
        console.log({ "customToken": json.token.length, "dashboardToken": "eyJhbGciOiJSUzI1NiJ9.eyJraWQiOiJadnpLdGlyeGhyYkNrdTVTY0ZHVjdTWlp1WndOYUlVeUg2N25NcTRKTVlZIiwiYXVkIjoidiIsInN1YiI6InZhQU1pc0FHbW82TUhOWHMzd2pWREY5VEtaZnBZWXRJb3BsUUl2bTAxNmwwMCIsImV4cCI6MTc0ODQzNTAwOX0.deDp38b4fmZyauK9fHmWPONcspNx0ko71Na6PAdScodyfWrIMylWk-Sl8P2-vatxV-MAfE4aSza8wds9ofS_IK5fJ2bRqh3C6Jos1DFXiSTDhvUG898F75c3aAYmJFKBbEZOmv9fGtkgYc7mAYtYrgHzC46KDj1xKRB6NNTHQ1Xcbui15QI35SDLInciEBnkT55H5vmsmXkfRP-S0Eo7S1fDnVeDuQIc_PoM2Mo42yralvT5V5dWf_iz53ZkQxQ5yxS9c5qJRli3P_si-4FG984fb0UFTV4XmaMcfi8QGKPiHWWRNAgqmydKCZB9GtbtUrkokW9neKuG0TBeBXW5rA".length })
        playerOne.setAttribute("playback-token", json.token);
    }).catch((err) => console.log(err))

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
