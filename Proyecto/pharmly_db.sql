CREATE DATABASE pharmly_db;
USE pharmly_db;

-- 1. Tabla de Usuarios
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('ESTUDIANTE', 'MEDICO', 'GENERAL') DEFAULT 'GENERAL',
    es_premium BOOLEAN DEFAULT FALSE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Diccionario de Dolencias (Conceptos Médicos Light)
CREATE TABLE diccionario_dolencias (
    id_dolencia INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tecnico VARCHAR(150) NOT NULL,
    nombre_comun VARCHAR(150),
    descripcion_light TEXT NOT NULL,
    categoria VARCHAR(100),
    url_imagen VARCHAR(255)
);

-- 3. Diccionario de Medicamentos
CREATE TABLE medicamentos (
    id_medicamento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    uso_general TEXT NOT NULL,
    dosis_sugerida TEXT,
    advertencias TEXT,
    url_imagen VARCHAR(255)
);

-- 4. Palabras Clave para Triaje (El "cerebro" del semáforo)
CREATE TABLE sintomas_claves (
    id_sintoma INT AUTO_INCREMENT PRIMARY KEY,
    termino VARCHAR(100) NOT NULL,
    peso_gravedad INT NOT NULL, -- 1: Verde, 2: Amarillo, 3: Rojo
    id_dolencia_relacionada INT,
    FOREIGN KEY (id_dolencia_relacionada) REFERENCES diccionario_dolencias(id_dolencia)
);

-- 5. Base de Datos de Quizes (Preguntas fijas para aleatoriedad)
CREATE TABLE quizes_preguntas (
    id_pregunta INT AUTO_INCREMENT PRIMARY KEY,
    enunciado TEXT NOT NULL,
    opcion_correcta VARCHAR(255) NOT NULL,
    opcion_incorrecta_1 VARCHAR(255) NOT NULL,
    opcion_incorrecta_2 VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) -- Ej: 'Primeros Auxilios', 'Anatomía'
);

-- 6. Historial de Consultas de Usuarios
CREATE TABLE historial_consultas (
    id_consulta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    texto_ingresado TEXT NOT NULL,
    color_resultado ENUM('VERDE', 'AMARILLO', 'ROJO'),
    fecha_consulta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

INSERT INTO diccionario_dolencias (nombre_tecnico, nombre_comun, descripcion_light, categoria) VALUES
('Rinofaringitis aguda', 'Resfriado común', 'Infección viral de la nariz y la garganta. Suele causar mocos y estornudos.', 'Respiratorio'),
('Gastroenteritis', 'Infección estomacal', 'Inflamación del estómago e intestinos por virus o bacterias. Causa diarrea y vómitos.', 'Digestivo'),
('Cefalea tensional', 'Dolor de cabeza por estrés', 'Dolor opresivo en la cabeza como si una banda la apretara. Común por cansancio.', 'Neurológico'),
('Dermatitis de contacto', 'Alergia en la piel', 'Reacción de la piel al tocar algo que le irrita, causando enrojecimiento y picazón.', 'Dermatología'),
('Otitis media', 'Infección de oído', 'Inflamación del oído medio, muy común después de un resfriado.', 'Otorrinolaringología'),
('Faringoamigdalitis', 'Dolor de garganta fuerte', 'Inflamación de las amígdalas que causa dolor al tragar y a veces placas blancas.', 'Respiratorio'),
('Esguince de tobillo', 'Torcedura de pie', 'Lesión de los ligamentos que conectan los huesos del tobillo al pisar mal.', 'Traumatología'),
('Conjuntivitis', 'Ojo rojo', 'Inflamación de la capa externa del ojo. Muy contagiosa.', 'Oftalmología'),
('Dispepsia', 'Indigestión o empacho', 'Sensación de pesadez o ardor en la parte superior del abdomen después de comer.', 'Digestivo'),
('Lumbago', 'Dolor de espalda baja', 'Dolor muscular en la zona inferior de la columna, a menudo por cargar peso.', 'Traumatología'),
('Infección urinaria', 'Mal de orina', 'Infección en la vejiga que causa ardor al orinar y ganas constantes de ir al baño.', 'Urología'),
('Bronquitis aguda', 'Tos con flema', 'Inflamación de los bronquios que suele quedar después de un resfriado prolongado.', 'Respiratorio'),
('Hipotensión', 'Presión baja', 'Caída de la presión arterial que puede causar mareos o desmayos breves.', 'Circulatorio'),
('Hipertensión', 'Presión alta', 'Aumento de la presión de la sangre contra las arterias. A menudo no da síntomas.', 'Circulatorio'),
('Anemia ferropénica', 'Falta de hierro', 'Baja cantidad de glóbulos rojos por falta de hierro, causando mucho cansancio.', 'Sanguíneo'),
('Urticaria', 'Ronchas', 'Aparición repentina de manchas rojas que pican mucho por una reacción alérgica.', 'Dermatología'),
('Sinusitis', 'Dolor en los senos nasales', 'Acumulación de moco en los huecos de la cara, causando dolor y presión.', 'Respiratorio'),
('Gastritis', 'Ardor de estómago', 'Irritación de la mucosa del estómago, frecuentemente por estrés o mala dieta.', 'Digestivo'),
('Gingivitis', 'Inflamación de encías', 'Encías rojas y que sangran fácilmente al cepillarse los dientes.', 'Odontología'),
('Deshidratación', 'Falta de agua', 'Pérdida excesiva de líquidos del cuerpo, común tras diarrea o sudor intenso.', 'General');

INSERT INTO medicamentos (nombre, uso_general, dosis_sugerida, advertencias) VALUES
('Paracetamol', 'Alivia dolor leve y baja la fiebre.', '500mg a 1g cada 6-8 horas.', 'No exceder 4g al día por riesgo de daño al hígado.'),
('Ibuprofeno', 'Antiinflamatorio y analgésico.', '400mg cada 8 horas con comida.', 'Evitar si tienes gastritis o úlceras.'),
('Loratadina', 'Antihistamínico para alergias y rinitis.', '10mg una vez al día.', 'Puede causar somnolencia leve en algunas personas.'),
('Amoxicilina', 'Antibiótico para infecciones bacterianas.', 'Según receta médica (común 500mg cada 8h).', 'Requiere receta. Completar el tratamiento siempre.'),
('Salbutamol', 'Broncodilatador para el asma o tos cerrada.', '2 inhalaciones cada 4-6 horas si hay dificultad.', 'Puede causar temblor o taquicardia.'),
('Omeprazol', 'Protector gástrico para acidez y reflujo.', '20mg en ayunas.', 'No usar por tiempo prolongado sin supervisión médica.'),
('Suero Oral', 'Rehidratación tras diarrea o vómito.', 'Beber a sorbos pequeños después de cada evacuación.', 'No sustituye la comida, solo repone sales.'),
('Diclofenaco Gel', 'Alivio local de dolores musculares.', 'Aplicar en la zona afectada 3 veces al día.', 'No aplicar sobre heridas abiertas.'),
('Nafazolina', 'Gotas para ojos rojos por irritación.', '1-2 gotas cada 8 horas.', 'No usar más de 3 días seguidos.'),
('Hioscina (Buscapina)', 'Alivia espasmos y cólicos estomacales.', '1 tableta ante el dolor.', 'Consultar si el dolor abdominal es muy intenso.'),
('Clorfenamina', 'Alergias fuertes y picaduras.', '4mg cada 6 horas.', 'Causa mucha somnolencia. No conducir.'),
('Bismuto (Pepto-Bismol)', 'Alivia indigestión y diarrea leve.', '30ml cada hora (máximo 8 dosis).', 'Puede oscurecer la lengua y las heces temporalmente.'),
('Cetirizina', 'Antialérgico de larga duración.', '10mg al día.', 'Más potente que la loratadina para rinitis.'),
('Naproxeno', 'Dolor fuerte de articulaciones o espalda.', '500mg cada 12 horas.', 'Tomar con abundante agua y alimentos.'),
('Gel de Aluminio/Magnesio', 'Antiácido líquido para ardor inmediato.', '10-20ml después de las comidas.', 'Puede causar diarrea o estreñimiento si se abusa.'),
('Benzocaína (Pastillas)', 'Alivia el dolor de garganta al chupar.', 'Una pastilla cada 3-4 horas.', 'No tragar enteras, dejar disolver.'),
('Terbinafina Crema', 'Para hongos en piel o pies.', 'Aplicar 1 vez al día por 1 semana.', 'Mantener la zona seca después de aplicar.'),
('Loperamida', 'Detiene la diarrea líquida.', '2 mg tras la primera evacuación.', 'No usar si hay fiebre alta o sangre en heces.'),
('Metamizol', 'Dolor fuerte y fiebre persistente.', '500mg cada 8 horas.', 'Puede bajar la presión arterial en algunas personas.'),
('Vitamina C', 'Suplemento para defensas.', '500mg a 1g al día.', 'El exceso se elimina por la orina.');

INSERT INTO sintomas_claves (termino, peso_gravedad, id_dolencia_relacionada) VALUES
('Dificultad para respirar', 3, 12),
('Dolor de pecho opresivo', 3, 14),
('Pérdida de conciencia', 3, 13),
('Fiebre superior a 39.5', 3, 6),
('Sangre en la orina', 2, 11),
('Dolor abdominal intenso', 2, 18),
('Visión borrosa repentina', 2, 8),
('Deshidratación moderada', 2, 20),
('Tos seca', 1, 1),
('Congestión nasal', 1, 1),
('Estornudos', 1, 1),
('Acidez estomacal', 1, 18),
('Dolor de cabeza leve', 1, 3),
('Picazón en la piel', 1, 4),
('Ojo lloroso', 1, 8),
('Encías inflamadas', 1, 19),
('Dolor lumbar', 1, 10),
('Hinchazón de tobillo', 1, 7),
('Mareo leve', 1, 13),
('Flemas blancas', 1, 12);

INSERT INTO quizes_preguntas (enunciado, opcion_correcta, opcion_incorrecta_1, opcion_incorrecta_2, categoria) VALUES
('¿Qué dolencia se caracteriza por dolor al tragar y placas blancas?', 'Faringoamigdalitis', 'Rinofaringitis', 'Gastroenteritis', 'Diccionario Médico'),
('Si un medicamento es un "antihistamínico", ¿para qué sirve?', 'Para las alergias', 'Para la fiebre', 'Para las bacterias', 'Farmacología'),
('¿Qué color de triaje indica que puedes esperar tu turno sin riesgo vital?', 'Verde', 'Rojo', 'Amarillo', 'Triaje'),
('¿Cuál es el nombre común de la Rinofaringitis?', 'Resfriado común', 'Gripe porcina', 'Neumonía', 'Diccionario Médico'),
('¿Qué medicamento NO debe tomarse con el estómago vacío por riesgo de gastritis?', 'Ibuprofeno', 'Loratadina', 'Suero Oral', 'Farmacología'),
('¿Cuál es la función del Omeprazol?', 'Proteger el estómago de la acidez', 'Curar la tos', 'Bajar la presión', 'Farmacología'),
('Un síntoma de gravedad (Rojo) que requiere hospitalización es:', 'Dificultad respiratoria', 'Moco transparente', 'Dolor de espalda', 'Triaje'),
('La gastroenteritis afecta principalmente al sistema:', 'Digestivo', 'Respiratorio', 'Óseo', 'Anatomía'),
('¿Qué se recomienda para reponer sales tras una deshidratación?', 'Suero Oral', 'Bebidas energéticas', 'Agua con gas', 'Primeros Auxilios'),
('¿Cómo se llama la inflamación de las encías?', 'Gingivitis', 'Conjuntivitis', 'Otitis', 'Diccionario Médico'),
('¿Qué hace la Insulina en nuestro cuerpo?', 'Regula el azúcar en la sangre', 'Transporta oxígeno', 'Combate virus', 'Anatomía'),
('Si tienes una torcedura de pie, el diagnóstico probable es:', 'Esguince', 'Fractura expuesta', 'Lumbago', 'Traumatología'),
('¿Cuál es la advertencia principal del Paracetamol?', 'No dañar el hígado por exceso', 'No tomarlo de noche', 'Causa manchas en la piel', 'Farmacología'),
('¿Qué órgano se inflama en una Otitis?', 'El oído', 'El ojo', 'La nariz', 'Anatomía'),
('¿Qué síntoma es típico de la Conjuntivitis?', 'Ojo rojo y legañas', 'Dolor de muelas', 'Zumbido de oídos', 'Diccionario Médico'),
('¿Cuál es la mejor forma de prevenir contagios de resfriados?', 'Lavado de manos frecuente', 'Tomar mucha vitamina C', 'No salir al sol', 'Salud General'),
('¿Para qué sirve el Diclofenaco en gel?', 'Dolores musculares locales', 'Infecciones de garganta', 'Bajar la fiebre', 'Farmacología'),
('El término "Cefalea" se refiere a:', 'Dolor de cabeza', 'Dolor de estómago', 'Dolor de huesos', 'Diccionario Médico'),
('¿Qué se debe hacer primero ante una quemadura leve?', 'Poner agua fresca', 'Poner pasta de dientes', 'Poner hielo directo', 'Primeros Auxilios'),
('¿Qué profesional trata la Infección Urinaria?', 'Urólogo', 'Cardiólogo', 'Dermatólogo', 'Salud General');