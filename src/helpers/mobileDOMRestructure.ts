import { MOBILE_BREAKPOINT } from "@/variables/constants";
import { sizeBandLogo } from ".";

const topRightContainer = document.getElementById("top-right-container")
const mapContainer = document.getElementById("map-container")
const eventBanner = document.getElementById("event-banner");

const currentActLogoWrapper = document.getElementById("current-live-act-logo-wrapper");
const currentActLogo = document.getElementById("current-live-act-logo") as HTMLImageElement | null;
const logoDesktopLocation = document.getElementById("event-progress-bar-wrapper");
const logoMobileLocation = document.getElementById("acts-table-body")

function restructureDOMEElements() {
    const x = window.innerWidth;
    movableElements.forEach((el) => {
        let insertElement;
        if (x < MOBILE_BREAKPOINT) {
            insertElement = el.mobileLocation;
        } else {
            insertElement = el.desktopLocation;
        }
        el.element?.id && insertElement?.parentElement?.children.namedItem(el.element.id) === null && el.element ?
            insertElement?.parentElement.insertBefore(el.element, insertElement) : null;
        el.element?.classList.add("visible")
    })
}

const logoResizeObserver = new ResizeObserver(() => { currentActLogo ? sizeBandLogo(currentActLogo) : null })

export default function mobileDOMRestructure() {
    restructureDOMEElements()
    if (logoMobileLocation) {
        logoResizeObserver.observe(logoMobileLocation)
    }
    window.addEventListener("resize", restructureDOMEElements)
};

const movableElements = [{ element: eventBanner, desktopLocation: mapContainer, mobileLocation: topRightContainer }, { element: currentActLogoWrapper, desktopLocation: logoDesktopLocation, mobileLocation: logoMobileLocation?.nextSibling }]