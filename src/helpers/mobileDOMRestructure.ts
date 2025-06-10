import { MOBILE_BREAKPOINT } from "@/variables/constants";

const topRightContainer = document.getElementById("top-right-container")
const mapContainer = document.getElementById("map-container")
const eventBanner = document.getElementById("event-banner");

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

export default function mobileDOMRestructure() {
    restructureDOMEElements()
    window.addEventListener("resize", restructureDOMEElements)
};

const movableElements = [{ element: eventBanner, desktopLocation: mapContainer, mobileLocation: topRightContainer }]