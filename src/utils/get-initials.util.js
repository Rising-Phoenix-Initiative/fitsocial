export const getInitials = (fullName) => {
    // Check if fullName is a string and not empty
    if (typeof fullName !== 'string' || fullName.trim().length === 0) {
        return '';
    }

    const nameParts = fullName.trim().split(/\s+/); // Split by whitespace to get name parts

    // Check if we have at least one word to extract initial
    if (nameParts.length > 0) {
        const firstInitial = nameParts[0][0].toUpperCase(); // First initial
        const secondInitial = nameParts.length > 1 ? nameParts[1][0].toUpperCase() : ''; // Second initial, if available
        return firstInitial + secondInitial;
    }

    return '';
}