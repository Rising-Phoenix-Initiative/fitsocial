import { useState, useEffect } from 'react';
import moment from 'moment';

export const useFormatDate = (date) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const momentDate = moment(date);

        const updateFormattedDate = () => {
            const now = moment();
            const diffInSeconds = now.diff(momentDate, 'seconds');

            if (diffInSeconds < 60) {
                setFormattedDate('just now');
            } else {
                setFormattedDate(momentDate.fromNow());
            }
        };

        // Calculate the next update interval based on the age of the post
        const getNextUpdateInterval = () => {
            const diffInMinutes = moment().diff(momentDate, 'minutes');

            if (diffInMinutes < 60) { // less than 1 hour old
                return 60 * 1000; // update every minute
            } else if (diffInMinutes < 24 * 60) { // less than 24 hours old
                return 60 * 60 * 1000; // update every hour
            } else {
                return 24 * 60 * 60 * 1000; // update once a day
            }
        };

        // Initial update
        updateFormattedDate();

        // Set the initial interval
        let intervalId = setInterval(() => {
            updateFormattedDate();
            // Clear and reset the interval based on the next required update interval
            clearInterval(intervalId);
            intervalId = setInterval(updateFormattedDate, getNextUpdateInterval());
        }, getNextUpdateInterval());

        // Clear the interval on unmount
        return () => clearInterval(intervalId);
    }, [date]);

    return formattedDate;
};
