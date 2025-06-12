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

export function sizeBandLogo(logo: HTMLImageElement) {
    const { y } = { y: wrapper?.clientHeight }
    const aspectRatio = `${logo.naturalWidth} / ${logo.naturalHeight}`;
    if (wrapper) {
        if (window.innerWidth < MOBILE_BREAKPOINT) {
            wrapper.style.aspectRatio = `${logo.naturalHeight} / ${logo.naturalWidth}`;
            logo.style.aspectRatio = aspectRatio;
            logo.style.width = y + "px";
        } else {
            wrapper.style.aspectRatio = "unset"
            logo.style.aspectRatio = "unset"
            logo.style.width = "100%"
        }
    }
}

function sizePage() {
    const y = window.innerHeight;
    const r = document.querySelector(':root') as HTMLElement | null;
    r?.style.setProperty('--real-viewport-height', y ? y - 8 + "px" : "100vh");
    console.log(r)
}

export function pageSize() {
    window.addEventListener("resize", sizePage)
    // window.addEventListener("scroll", sizePage)
}