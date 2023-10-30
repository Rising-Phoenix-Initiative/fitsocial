export const generateSlug = (str) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')  // Remove any non-word character
        .replace(/[\s_-]+/g, '-')  // Replace spaces, underscores, and dashes with a single dash (-)
        .replace(/^-+|-+$/g, '');  // Remove leading or trailing dashes
};