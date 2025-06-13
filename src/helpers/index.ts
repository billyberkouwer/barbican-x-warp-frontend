import { MOBILE_BREAKPOINT } from "@/variables/constants";

export function getEventProgress(startTime: Date, endTime: Date) {
    const now = new Date();
    const totalDuration = endTime.getTime() - startTime.getTime();
    const elapsed = now.getTime() - startTime.getTime();
    let percentage = (elapsed / totalDuration) * 100;
    percentage = Math.max(0, Math.min(100, percentage))
    const started = percentage > 0;
    const finished = percentage === 100;
    const inProgress = started && !finished;

    return {
        percentage,
        started,
        finished,
        inProgress
    }
}

const wrapper = document.getElementById("current-live-act-logo-wrapper");
const table = document.getElementById("acts-table-body")

export function sizeBandLogo(logo: HTMLImageElement) {
    const { y } = { y: table?.clientHeight }
    const aspectRatio = `${logo.naturalWidth} / ${logo.naturalHeight}`;
    if (wrapper && y) {
        if (window.innerWidth < MOBILE_BREAKPOINT) {
            wrapper.style.aspectRatio = `${logo.naturalHeight} / ${logo.naturalWidth}`;
            wrapper.style.width = "auto";
            wrapper.style.height = y + "px";

            logo.style.maxWidth = y + "px";
            logo.style.width = y + "px";
            logo.style.height = "auto";
            logo.style.aspectRatio = aspectRatio;

            // logo.style.height = y / 2 + "px";
            // wrapper.style.height = y / 2 + "px";
            // logo.style.height = 50 + "px";
        } else {
            wrapper.style.aspectRatio = "unset"
            wrapper.style.width = "unset";
            wrapper.style.height = "unset";

            logo.style.aspectRatio = "unset"
            logo.style.maxWidth = "unset";
            logo.style.width = "unset";
            logo.style.height = "3rem";
        }
    }
}

// function sizePage() {
//     const y = window.parent.innerHeight;
//     console.log(window.parent)
//     const r = document.querySelector(':root') as HTMLElement | null;
//     r?.style.setProperty('--real-viewport-height', y ? y - 8 + "px" : "100vh");
// }

export function pageSize() {
    // sizePage()
    // window.addEventListener("resize", sizePage)
}