export const getInitials = (fullName) => {
    const nameParts = fullName?.trim().split(/\s+/); // Split by one or more whitespace
    if (nameParts?.length === 1) {
        // Only one name part found, return the first letter of this part
        return nameParts[0][0].toUpperCase();
    } else {
        // Return the first letter of the first two name parts
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
}