import React, { useState } from 'react';
import statsData from '../../assets/dashboard_stats/estadisticas.json';
import StatPreviewCard from '../../components/StatPreviewCard/StatPreviewCard'; // Importa el preview card
import DashboardModal from '../../components/dashboardModal/DashboardModal'; // Importa el modal
import styles from './DashboardPage.module.css';

// ... (todos tus imports de imágenes existentes)
import evolucionPrestamosImg from '../../assets/dashboard_stats/evolucion_prestamos.png';
import top5LibrosImg from '../../assets/dashboard_stats/top_5_libros.png';
import distribucionGenerosImg from '../../assets/dashboard_stats/distribucion_generos.png';
import crecimientoUsuariosImg from '../../assets/dashboard_stats/crecimiento_usuarios.png';
import estadoPrestamosImg from '../../assets/dashboard_stats/estado_prestamos.png';
import duracionPrestamosImg from '../../assets/dashboard_stats/duracion_prestamos.png';


const imagesMap = {
    // ... (el mapa de imágenes no cambia) ...
    'evolucion_prestamos.png': evolucionPrestamosImg,
    'top_5_libros.png': top5LibrosImg,
    'distribucion_generos.png': distribucionGenerosImg,
    'crecimiento_usuarios.png': crecimientoUsuariosImg,
    'estado_prestamos.png': estadoPrestamosImg,
    'duracion_prestamos.png': duracionPrestamosImg
};

const DashboardPage = () => {
    // Estado para saber qué estadística está seleccionada para mostrar en el modal
    // Si es 'null', el modal no se muestra.
    const [selectedStat, setSelectedStat] = useState(null);

    const handleOpenModal = (stat) => {
        setSelectedStat(stat);
    };

    const handleCloseModal = () => {
        setSelectedStat(null);
    };

    return (
        <>
            <div className={styles.dashboardContainer}>
                <h1>Dashboard de Estadísticas</h1>
                <p>Selecciona una miniatura para ver el gráfico y el análisis detallado.</p>

                <div className={styles.gridContainer}>
                    {statsData.estadisticas.map(stat => (
                        <StatPreviewCard 
                            key={stat.id} 
                            stat={stat} 
                            imageSrc={imagesMap[stat.imagen_path]}
                            onSelect={() => handleOpenModal(stat)} // Al hacer clic, se abre el modal
                        />
                    ))}
                </div>
            </div>

            {/* El Modal se renderiza aquí, pero solo es visible si 'selectedStat' no es null */}
            <DashboardModal 
                stat={selectedStat}
                imageSrc={selectedStat ? imagesMap[selectedStat.imagen_path] : ''}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default DashboardPage;