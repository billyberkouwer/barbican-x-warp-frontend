export function updateBar(id: string, startTime: Date, endTime: Date) {
    const loadingBar = document.getElementById(id) as HTMLElement;
    const loadingBarText = document.getElementById(id + "-text") as HTMLElement;
    const totalDuration = endTime.getTime() - startTime.getTime();

    const now = new Date();
    const elapsed = now.getTime() - startTime.getTime();
    let percentage = (elapsed / totalDuration) * 100;
    percentage = Math.max(0, Math.min(100, percentage));

    loadingBar.style.width = percentage + '%';
    loadingBarText.textContent = percentage.toFixed(1) + '%';
}