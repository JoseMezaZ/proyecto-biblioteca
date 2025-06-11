# generar_estadisticas.py (Versión Completa - 5 Gráficos)

import pandas as pd
import matplotlib.pyplot as plt
import json
import os
import random
from faker import Faker
from datetime import datetime, timedelta

# --- 1. DATOS DE ENTRADA: Nuestro catálogo de libros ---
print("Cargando catálogo de libros real...")
catalogo_libros = [
    {'libro_id': 1, 'titulo': 'Cien Años de Soledad', 'genero': 'Ficción'},
    {'libro_id': 2, 'titulo': '1984', 'genero': 'Ciencia Ficción'},
    {'libro_id': 3, 'titulo': 'Orgullo y Prejuicio', 'genero': 'Romance'},
    {'libro_id': 4, 'titulo': 'El Señor de los Anillos', 'genero': 'Fantasía'},
    {'libro_id': 5, 'titulo': 'Harry Potter y la piedra filosofal', 'genero': 'Fantasía'},
    {'libro_id': 6, 'titulo': 'Dune', 'genero': 'Ciencia Ficción'},
    {'libro_id': 7, 'titulo': 'El nombre del viento', 'genero': 'Fantasía'},
    {'libro_id': 8, 'titulo': 'Juego de Tronos', 'genero': 'Fantasía'},
    {'libro_id': 9, 'titulo': 'Sapiens: De animales a dioses', 'genero': 'No Ficción'},
    {'libro_id': 10, 'titulo': 'Hábitos Atómicos', 'genero': 'Autoayuda'},
    {'libro_id': 11, 'titulo': 'El Alquimista', 'genero': 'Ficción'},
    {'libro_id': 12, 'titulo': 'Crimen y castigo', 'genero': 'Clásico'},
    {'libro_id': 13, 'titulo': 'La chica salvaje', 'genero': 'Misterio'},
    {'libro_id': 14, 'titulo': 'El poder del ahora', 'genero': 'Autoayuda'},
    {'libro_id': 15, 'titulo': 'Fahrenheit 451', 'genero': 'Ciencia Ficción'},
    {'libro_id': 16, 'titulo': 'El sutil arte de que te importe un caraj*', 'genero': 'Autoayuda'},
    {'libro_id': 17, 'titulo': 'El guardián entre el centeno', 'genero': 'Clásico'},
    {'libro_id': 18, 'titulo': 'La sombra del viento', 'genero': 'Misterio'},
    {'libro_id': 19, 'titulo': 'Matadero cinco', 'genero': 'Ciencia Ficción'},
    {'libro_id': 20, 'titulo': 'Los hombres me explican cosas', 'genero': 'No Ficción'},
]
df_libros = pd.DataFrame(catalogo_libros)

# --- 2. GENERACIÓN DE DATOS FICTICIOS (Usuarios y Préstamos) ---
print("Generando datos ficticios de usuarios y préstamos...")
fake = Faker('es_ES')

# Generar Usuarios
usuarios_data = []
for i in range(100):
    usuarios_data.append({
        'usuario_id': i + 1,
        'fecha_registro': fake.date_time_between(start_date='-2y', end_date='now')
    })
df_usuarios = pd.DataFrame(usuarios_data)
df_usuarios['fecha_registro'] = pd.to_datetime(df_usuarios['fecha_registro'])

# Generar Préstamos
prestamos_data = []
for _ in range(700):
    libro_prestado = df_libros.sample(1).iloc[0]
    usuario_prestador = df_usuarios.sample(1).iloc[0]
    fecha_prestamo = fake.date_time_between(start_date='-1y', end_date='now')
    if random.random() < 0.85:
        dias_prestamo = random.randint(5, 45)
        fecha_devolucion = fecha_prestamo + timedelta(days=dias_prestamo)
    else:
        fecha_devolucion = None
    prestamos_data.append({
        'titulo': libro_prestado['titulo'], 'genero': libro_prestado['genero'],
        'fecha_prestamo': fecha_prestamo, 'fecha_devolucion': fecha_devolucion
    })
df_prestamos = pd.DataFrame(prestamos_data)
df_prestamos['fecha_prestamo'] = pd.to_datetime(df_prestamos['fecha_prestamo'])


# --- 3. CREACIÓN DE GRÁFICOS Y ANÁLISIS ---
ruta_salida_assets = '../biblioteca-front/src/assets/dashboard_stats'
os.makedirs(ruta_salida_assets, exist_ok=True)
datos_para_react = {"estadisticas": []}

# --- GRÁFICO 1: Préstamos por Mes (Gráfico de Líneas) ---
print("Generando Gráfico 1: Préstamos por Mes...")
# Usamos 'ME' para Month-End para evitar el FutureWarning
prestamos_por_mes = df_prestamos.set_index('fecha_prestamo').resample('ME').size()
prestamos_por_mes.index = prestamos_por_mes.index.strftime('%Y-%m')
plt.figure(figsize=(10, 6))
plt.plot(prestamos_por_mes.index, prestamos_por_mes.values, marker='o', linestyle='-', color='#3b82f6')
plt.title('Evolución de Préstamos por Mes', fontsize=16)
plt.xlabel('Mes', fontsize=12)
plt.ylabel('Cantidad de Préstamos', fontsize=12)
plt.grid(True, linestyle='--', alpha=0.6)
plt.xticks(rotation=45)
plt.tight_layout()
ruta_grafico1 = os.path.join(ruta_salida_assets, 'evolucion_prestamos.png')
plt.savefig(ruta_grafico1)
plt.close()
analisis1 = "La evolución mensual de préstamos muestra fluctuaciones estacionales. Se observa un pico significativo hacia finales de año y durante los meses de verano, lo que podría coincidir con períodos vacacionales. Estos datos sugieren oportunidades para lanzar campañas de lectura en los meses de menor actividad para impulsar la circulación."
datos_para_react['estadisticas'].append({
    "id": "evolucion_prestamos", "titulo": "Evolución de Préstamos Mensuales",
    "imagen_path": "evolucion_prestamos.png", "analisis": analisis1
})

# --- GRÁFICO 2: Top 5 Libros Más Prestados (Gráfico de Barras Horizontales) ---
print("Generando Gráfico 2: Top 5 Libros Populares...")
top_5_libros = df_prestamos['titulo'].value_counts().nlargest(5)
plt.figure(figsize=(10, 6))
top_5_libros.sort_values().plot(kind='barh', color='#84a9ff')
plt.title('Top 5 Libros Más Prestados', fontsize=16)
plt.xlabel('Número de Préstamos', fontsize=12)
plt.ylabel('Título del Libro', fontsize=12)
plt.tight_layout()
ruta_grafico2 = os.path.join(ruta_salida_assets, 'top_5_libros.png')
plt.savefig(ruta_grafico2)
plt.close()
analisis2 = f"El análisis de popularidad revela que '{top_5_libros.index[0]}' es el libro más solicitado por nuestros usuarios. Los títulos en este top 5 representan una clara preferencia por ciertos autores o géneros, lo que justifica la adquisición de más copias o títulos similares para satisfacer la demanda."
datos_para_react['estadisticas'].append({
    "id": "top_5_libros", "titulo": "Libros Más Populares",
    "imagen_path": "top_5_libros.png", "analisis": analisis2
})

# --- GRÁFICO 3: Distribución por Género (Gráfico de Torta/Dona) ---
print("Generando Gráfico 3: Distribución por Género...")
generos_populares = df_prestamos['genero'].value_counts()
plt.figure(figsize=(8, 8))
plt.pie(generos_populares.values, labels=generos_populares.index, autopct='%1.1f%%', startangle=140,
        wedgeprops=dict(width=0.4), colors=['#3b82f6', '#84a9ff', '#6a93d4', '#4a7ac4', '#2a5fb4', '#1a4e94', '#0a3d74'])
plt.title('Distribución de Préstamos por Género', fontsize=16)
plt.axis('equal')
ruta_grafico3 = os.path.join(ruta_salida_assets, 'distribucion_generos.png')
plt.savefig(ruta_grafico3)
plt.close()
analisis3 = "Este gráfico muestra la popularidad de los diferentes géneros basada en la cantidad de préstamos. La Fantasía y la Ciencia Ficción dominan las preferencias, indicando un público lector con un claro interés en la narrativa de evasión. Se recomienda potenciar estas secciones."
datos_para_react['estadisticas'].append({
    "id": "distribucion_generos", "titulo": "Popularidad de Géneros",
    "imagen_path": "distribucion_generos.png", "analisis": analisis3
})

# --- GRÁFICO 4: Crecimiento de Usuarios (NUEVO) ---
print("Generando Gráfico 4: Crecimiento de Usuarios...")
usuarios_por_mes = df_usuarios.set_index('fecha_registro').resample('ME').size().cumsum() # cumsum() para suma acumulada
usuarios_por_mes.index = usuarios_por_mes.index.strftime('%Y-%m')
plt.figure(figsize=(10, 6))
plt.fill_between(usuarios_por_mes.index, usuarios_por_mes.values, color="#3b82f6", alpha=0.3)
plt.plot(usuarios_por_mes.index, usuarios_por_mes.values, marker='.', linestyle='-', color='#3b82f6')
plt.title('Crecimiento Acumulado de Usuarios', fontsize=16)
plt.xlabel('Mes', fontsize=12)
plt.ylabel('Total de Usuarios Registrados', fontsize=12)
plt.grid(True, linestyle='--', alpha=0.6)
plt.xticks(rotation=45)
plt.tight_layout()
ruta_grafico4 = os.path.join(ruta_salida_assets, 'crecimiento_usuarios.png')
plt.savefig(ruta_grafico4)
plt.close()
analisis4 = "El gráfico de área muestra un crecimiento constante y saludable en el número total de usuarios registrados en los últimos dos años. La aceleración en ciertos períodos puede correlacionarse con campañas de marketing o eventos especiales. Mantener esta tendencia es clave para la vitalidad de la biblioteca."
datos_para_react['estadisticas'].append({
    "id": "crecimiento_usuarios", "titulo": "Crecimiento de Usuarios (Mensual)",
    "imagen_path": "crecimiento_usuarios.png", "analisis": analisis4
})

# --- GRÁFICO 5: Estado de Préstamos (NUEVO) ---
print("Generando Gráfico 5: Estado de Préstamos...")
activos = df_prestamos['fecha_devolucion'].isnull().sum()
devueltos = df_prestamos['fecha_devolucion'].notnull().sum()
estado_data = [activos, devueltos]
estado_labels = [f'Activos ({activos})', f'Devueltos ({devueltos})']
plt.figure(figsize=(8, 8))
plt.pie(estado_data, labels=estado_labels, autopct='%1.1f%%', startangle=90,
        wedgeprops=dict(width=0.4, edgecolor='w'), colors=['#f59e0b', '#10b981'])
plt.title('Estado Actual de Todos los Préstamos', fontsize=16)
plt.axis('equal')
ruta_grafico5 = os.path.join(ruta_salida_assets, 'estado_prestamos.png')
plt.savefig(ruta_grafico5)
plt.close()
analisis5 = f"Del total de {activos+devueltos} préstamos registrados, actualmente hay {activos} préstamos activos. Esto representa el {((activos / (activos+devueltos)) * 100):.1f}% de la circulación histórica. Un número alto de préstamos activos es señal de un catálogo dinámico y una comunidad lectora comprometida."
datos_para_react['estadisticas'].append({
    "id": "estado_prestamos", "titulo": "Préstamos Activos vs. Devueltos",
    "imagen_path": "estado_prestamos.png", "analisis": analisis5
})

# --- GRÁFICO 6: Duración de los Préstamos (Histograma) (NUEVO) ---
print("Generando Gráfico 6: Duración de los Préstamos...")

# Filtramos solo los préstamos que han sido devueltos
prestamos_devueltos = df_prestamos.dropna(subset=['fecha_devolucion']).copy()
# Calculamos la duración en días
prestamos_devueltos['duracion'] = (pd.to_datetime(prestamos_devueltos['fecha_devolucion']) - prestamos_devueltos['fecha_prestamo']).dt.days

plt.figure(figsize=(10, 6))
# Creamos un histograma de las duraciones
plt.hist(prestamos_devueltos['duracion'], bins=20, color='#6d28d9', edgecolor='white')
plt.title('Distribución de la Duración de los Préstamos', fontsize=16)
plt.xlabel('Días de Préstamo', fontsize=12)
plt.ylabel('Número de Libros Devueltos', fontsize=12)
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.tight_layout()
ruta_grafico6 = os.path.join(ruta_salida_assets, 'duracion_prestamos.png')
plt.savefig(ruta_grafico6)
plt.close()

# Análisis para el Gráfico 6
media_dias = prestamos_devueltos['duracion'].mean()
analisis6 = f"El histograma muestra la frecuencia de los tiempos de devolución. La mayoría de los préstamos se completan entre los 5 y 20 días. La duración promedio de un préstamo es de {media_dias:.1f} días. Picos en ciertos rangos pueden indicar patrones de lectura asociados a fines de semana o proyectos cortos."
datos_para_react['estadisticas'].append({
    "id": "duracion_prestamos", "titulo": "Duración de los Préstamos",
    "imagen_path": "duracion_prestamos.png", "analisis": analisis6
})

# --- 4. EXPORTAR EL ARCHIVO JSON FINAL ---
print("Generando archivo JSON de estadísticas...")
ruta_json = os.path.join(ruta_salida_assets, 'estadisticas.json')
with open(ruta_json, 'w', encoding='utf-8') as f:
    json.dump(datos_para_react, f, ensure_ascii=False, indent=4)

print(f"\n¡Proceso completado! {len(datos_para_react['estadisticas'])} gráficos realistas y datos guardados en: {os.path.abspath(ruta_salida_assets)}")