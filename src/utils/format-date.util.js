import moment from 'moment';

export const formatDate = (date) => {
    const momentDate = moment(date);
    const now = moment();

    // Check if the date is within the last few seconds
    if (now.diff(momentDate, 'seconds') < 5) { // 5 seconds threshold for "just now"
        return "just now";
    }

    // For dates within the same year
    if (momentDate.year() === now.year()) {
        // If the date is yesterday or older, but within this year
        if (momentDate.dayOfYear() < now.dayOfYear() - 1) {
            return momentDate.format('MMM D'); // e.g., Nov 18
        }

        // For everything else, return relative time
        return momentDate.fromNow(); // e.g., a minute ago, 10 minutes ago
    }

    // For dates from previous years
    return momentDate.format('MMM D, YYYY'); // e.g., Dec 25, 2022
};