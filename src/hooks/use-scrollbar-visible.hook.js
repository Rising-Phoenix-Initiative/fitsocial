import { useState, useEffect } from 'react';

function useScrollbarVisible() {
    const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);

    useEffect(() => {
        const checkScrollbarVisibility = () => {
            if (window.innerHeight < document.documentElement.scrollHeight) {
                setIsScrollbarVisible(true);
            } else {
                setIsScrollbarVisible(false);
            }
        };

        checkScrollbarVisibility();
        window.addEventListener('resize', checkScrollbarVisibility);

        return () => window.removeEventListener('resize', checkScrollbarVisibility);
    }, []);

    return isScrollbarVisible;
}

export default useScrollbarVisible;