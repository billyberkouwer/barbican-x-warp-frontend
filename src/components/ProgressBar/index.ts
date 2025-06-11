import { getEventProgress } from "@/helpers";



export function updateBar(id: string, startTime: Date, endTime: Date) {
    const loadingBar = document.getElementById(id) as HTMLElement;
    const loadingBarText = document.getElementById(id + "-text") as HTMLElement;
    const { percentage } = getEventProgress(startTime, endTime);
    loadingBar.style.width = percentage + '%';
    loadingBarText.textContent = percentage.toFixed(1) + '%';
}

export function createLoadingBar(loadingBarId: string, className: string) {
    return (//html
        `   <td class="${className}" colspan="10">
                <div id="${loadingBarId}" class="green-bg"></div>
            </td>
        `
    )

}