import { MOBILE_BREAKPOINT } from "@/variables/constants";

const parentElement = document.getElementById("page-wrapper")
const muxContainer = document.getElementById("mux-container")
const mapContainer = document.getElementById("map-container")
const eventBanner = document.getElementById("event-banner");

export default function mobileDOMRestructure() {
    console.log(parentElement)
    
    window.addEventListener("resize", (e) => {
        const x = window.innerWidth;
        movableElements.forEach((el) => {
            let insertElement;
            if (x < MOBILE_BREAKPOINT) {
                insertElement = el.mobileLocation;
            } else {
                insertElement = el.desktopLocation;
            }
            insertElement?.parentElement?.children.namedItem(eventBanner.id) === null ?
                insertElement?.parentElement.insertBefore(el.element, insertElement) : null;
        })
    })
};

const movableElements = [{ element: eventBanner, desktopLocation: mapContainer, mobileLocation: muxContainer }]