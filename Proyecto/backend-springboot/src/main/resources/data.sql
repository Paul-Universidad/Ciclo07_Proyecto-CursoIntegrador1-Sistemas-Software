-- Catálogo de medicamentos (categorías alineadas al filtro del frontend: analgesicos, antibioticos, etc.)
INSERT INTO medicamento (
    nombre, nombre_generico, descripcion, uso_comun, precauciones, orientacion_dosis, efectos_secundarios,
    categoria, presentacion, precio
) VALUES (
    'Paracetamol',
    'acetaminofén',
    'Analgésico y antipirético de venta común.',
    'Dolor leve a moderado o fiebre, según indicación médica o prospecto.',
    'No exceder la dosis; consultar si hay enfermedad hepática o consumo de alcohol.',
    'Orientación general: respetar siempre el prospecto o indicación profesional; no automedicarse sin criterio.',
    'En dosis habituales suele ser bien tolerado; reacciones alérgicas son poco frecuentes. Consulte el prospecto.',
    'analgesicos',
    'Comprimidos 500 mg',
    8.50
);

INSERT INTO medicamento (
    nombre, nombre_generico, descripcion, uso_comun, precauciones, orientacion_dosis, efectos_secundarios,
    categoria, presentacion, precio
) VALUES (
    'Ibuprofeno',
    'ibuprofeno',
    'Antiinflamatorio no esteroideo (AINE).',
    'Dolor inflamatorio leve, según indicación.',
    'Tomar con alimento; evitar si hay úlcera activa o ciertas condiciones renales sin supervisión médica.',
    'Orientación general: usar la menor dosis efectiva por el menor tiempo posible, según prospecto o médico.',
    'Puede causar molestias digestivas; otros efectos son menos frecuentes. Ver prospecto y contraindicaciones.',
    'antiinflamatorios',
    'Comprimidos 400 mg',
    12.90
);

INSERT INTO medicamento (
    nombre, nombre_generico, descripcion, uso_comun, precauciones, orientacion_dosis, efectos_secundarios,
    categoria, presentacion, precio
) VALUES (
    'Amoxicilina',
    'amoxicilina',
    'Antibiótico betalactámico de amplio espectro.',
    'Infecciones bacterianas según prescripción; completar el tratamiento indicado.',
    'No usar sin indicación médica; informar alergia a penicilinas.',
    'Dosis y duración según criterio profesional y peso/edad del paciente.',
    'Diarrea leve, náuseas o erupciones cutáneas pueden aparecer; ante reacción grave suspender y acudir a urgencias.',
    'antibioticos',
    'Cápsulas 500 mg',
    24.00
);

INSERT INTO medicamento (
    nombre, nombre_generico, descripcion, uso_comun, precauciones, orientacion_dosis, efectos_secundarios,
    categoria, presentacion, precio
) VALUES (
    'Losartán',
    'losartán',
    'Antihipertensivo (bloqueante del receptor de angiotensina II).',
    'Hipertensión arterial según pauta médica.',
    'Controlar función renal y potasio; informar embarazo o lactancia.',
    'No modificar la dosis sin supervisión; controles periódicos de presión arterial.',
    'Mareo leve, fatiga o elevación de potasio en sangre son posibles; seguir controles.',
    'cardiovasculares',
    'Comprimidos 50 mg',
    18.75
);

INSERT INTO medicamento (
    nombre, nombre_generico, descripcion, uso_comun, precauciones, orientacion_dosis, efectos_secundarios,
    categoria, presentacion, precio
) VALUES (
    'Carbamazepina',
    'carbamazepina',
    'Antiepiléptico también usado en neuralgia.',
    'Epilepsia o dolor neuropático solo con indicación especializada.',
    'Requiere controles de sangre; interacciones múltiples con otros fármacos.',
    'Ajuste gradual según respuesta y tolerancia; no interrumpir de golpe.',
    'Somnolencia, visión borrosa o reacciones cutáneas graves (poco frecuentes) requieren valoración urgente.',
    'neurologicos',
    'Comprimidos 200 mg',
    35.20
);

INSERT INTO medicamento (
    nombre, nombre_generico, descripcion, uso_comun, precauciones, orientacion_dosis, efectos_secundarios,
    categoria, presentacion, precio
) VALUES (
    'Loratadina',
    'loratadina',
    'Antihistamínico de segunda generación.',
    'Rinitis alérgica o urticaria según prospecto o indicación.',
    'Precaución en insuficiencia hepática grave; consultar interacciones.',
    'Dosis habitual en adultos según presentación; no duplicar con otros antihistamínicos.',
    'Somnolencia leve o sequedad de boca en algunas personas.',
    'dermatologicos',
    'Jarabe 5 mg / 5 ml',
    15.40
);

-- Módulo Aprendizaje (preguntas y opciones)
INSERT INTO pregunta_aprendizaje (enunciado, explicacion)
VALUES (
    '¿Para qué se usa principalmente el paracetamol?',
    'El paracetamol (acetaminofén) se usa sobre todo para reducir fiebre y aliviar dolores leves a moderados.'
);

INSERT INTO opcion_aprendizaje (pregunta_id, texto_opcion, correcta) VALUES (1, 'Reducir la presión arterial de forma permanente', FALSE);
INSERT INTO opcion_aprendizaje (pregunta_id, texto_opcion, correcta) VALUES (1, 'Aliviar fiebre y dolores leves a moderados', TRUE);
INSERT INTO opcion_aprendizaje (pregunta_id, texto_opcion, correcta) VALUES (1, 'Reemplazar antibióticos en infecciones bacterianas', FALSE);

INSERT INTO pregunta_aprendizaje (enunciado, explicacion)
VALUES (
    '¿Qué precaución es frecuente con los AINE como el ibuprofeno?',
    'Pueden irritar el estómago; por eso suele recomendarse tomarlos con alimento y no usarlos sin control si hay antecedentes de úlcera.'
);

INSERT INTO opcion_aprendizaje (pregunta_id, texto_opcion, correcta) VALUES (2, 'Se deben tomar siempre en ayunas para mayor efecto', FALSE);
INSERT INTO opcion_aprendizaje (pregunta_id, texto_opcion, correcta) VALUES (2, 'Pueden irritar el estómago; conviene precaución y seguir indicaciones', TRUE);
INSERT INTO opcion_aprendizaje (pregunta_id, texto_opcion, correcta) VALUES (2, 'No tienen interacción con otros medicamentos', FALSE);

INSERT INTO pregunta_aprendizaje (enunciado, explicacion)
VALUES (
    '¿Cuál es una presentación común del ibuprofeno?',
    'El ibuprofeno suele encontrarse en comprimidos de 400 mg, aunque existen otras presentaciones.'
);

INSERT INTO opcion_aprendizaje (pregunta_id, texto_opcion, correcta) VALUES (3, 'Comprimidos 400 mg', TRUE);
INSERT INTO opcion_aprendizaje (pregunta_id, texto_opcion, correcta) VALUES (3, 'Crema 1%', FALSE);
INSERT INTO opcion_aprendizaje (pregunta_id, texto_opcion, correcta) VALUES (3, 'Jarabe de insulina', FALSE);
