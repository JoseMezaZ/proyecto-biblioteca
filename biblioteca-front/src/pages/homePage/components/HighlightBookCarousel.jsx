import React, { useRef, useState, useEffect } from 'react';
import HighlightBook from './HighlightBook';
import styles from './HighlightBookCarousel.module.css';

const HighlightBookCarousel = ({ books }) => {
    const viewportRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (viewportRef.current) {
            viewportRef.current.scrollTo({ left: 0, behavior: 'auto' });
            setCurrentIndex(0);
        }
    }, [books]);

    if (!books || books.length === 0) {
        return null;
    }

    const handlePrev = () => {
        if (viewportRef.current) {
            const newIndex = Math.max(currentIndex - 1, 0);
            viewportRef.current.scrollTo({
                left: viewportRef.current.offsetWidth * newIndex,
                behavior: 'smooth'
            });
            setCurrentIndex(newIndex);
        }
    };

    const handleNext = () => {
        if (viewportRef.current) {
            const newIndex = Math.min(currentIndex + 1, books.length - 1);
            viewportRef.current.scrollTo({
                left: viewportRef.current.offsetWidth * newIndex,
                behavior: 'smooth'
            });
            setCurrentIndex(newIndex);
        }
    };

    return (
        <section className={styles.carouselSectionWrapper}>
            <div className={styles.headerWithNav}>
                <h2 className={styles.mainSectionTitle}>Libros Destacados</h2>
                {books.length > 1 && (
                    <div className={styles.navButtons}>
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className={styles.navButton}
                            aria-label="Anterior"
                        >
                            &#8249;
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex === books.length - 1}
                            className={styles.navButton}
                            aria-label="Siguiente"
                        >
                            &#8250;
                        </button>
                    </div>
                )}
            </div>
            <div className={styles.carouselViewport} ref={viewportRef}>
                <div className={styles.carouselTrack}>
                    {books.map(book => (
                        <div key={book.id} className={styles.carouselItem}>
                            <HighlightBook book={book} showTitle={false} /> {/* showTitle={false} para no repetir título */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HighlightBookCarousel;
