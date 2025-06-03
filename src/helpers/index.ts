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