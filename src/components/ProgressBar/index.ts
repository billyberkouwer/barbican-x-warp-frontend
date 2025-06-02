
// LOADING BAR
const startTime = new Date('2025-05-22T09:00:00');
const endTime = new Date('2025-05-22T18:00:00');
const totalDuration = endTime.getTime() - startTime.getTime();

function updateBar() {
    const loadingBar = document.getElementById('loading-bar') as HTMLElement;
    const now = new Date();
    const elapsed = now.getTime() - startTime.getTime();
    let percentage = (elapsed / totalDuration) * 100;
    percentage = Math.max(0, Math.min(100, percentage)); // between 0–100

    console.log(percentage)
    loadingBar.style.width = percentage + '%';
    // document.getElementById('percentText').textContent = percentage.toFixed(2) + '%';
}

export default function initLoadingBar() {
    updateBar();
    setInterval(updateBar, 1000);
}