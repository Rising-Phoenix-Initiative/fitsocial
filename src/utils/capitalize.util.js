export const capitalizeFirstLetter = (string) => {
    return string
        .split(' ')
        .map(word => word !== 'and' ? word.charAt(0).toUpperCase() + word.slice(1) : word)
        .join(' ');
}