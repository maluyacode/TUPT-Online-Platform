export const computeTimeElapsed = (createdAt, updatedAt) => {
    const now = new Date();
    const createdDate = new Date(updatedAt);
    const elapsedMilliseconds = now - createdDate;

    const minutes = Math.floor(elapsedMilliseconds / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    let textIndication = ''

    if (createdAt !== updatedAt) {
        textIndication = 'Edited';
    }

    if (months > 0) {
        return months === 1 ? `${textIndication} ${months}m ago` : `${textIndication} ${months}mos ago`;
    } else if (days > 0) {
        return days === 1 ? `${textIndication} ${days}d ago` : `${textIndication} ${days}d ago`;
    } else if (hours > 0) {
        return hours === 1 ? `${textIndication} ${hours}h ago` : `${textIndication} ${hours}h ago`;
    } else {
        return minutes <= 1 ? `${textIndication} Just now` : `${textIndication} ${minutes}m ago`;
    }
}