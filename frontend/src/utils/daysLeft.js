export function daysLeft(deletedAtDate) {
    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds between the deletedAt date and the current date
    const differenceInMilliseconds = new Date(currentDate.setHours(0, 0, 0, 0)).getTime() - new Date(deletedAtDate.setHours(0, 0, 0, 0)).getTime()

    // Convert milliseconds to days
    const daysLeft = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return 7 - daysLeft;
}