-- Medicamentos de ejemplo (campos alineados al prototipo APF: uso, dosis, contraindicaciones, efectos)
INSERT INTO medication (name, generic_name, description, common_usage, precautions, dose_guidance, side_effects)
VALUES (
    'Paracetamol',
    'acetaminofén',
    'Analgésico y antipirético de venta común.',
    'Dolor leve a moderado o fiebre, según indicación médica o prospecto.',
    'No exceder la dosis; consultar si hay enfermedad hepática o consumo de alcohol.',
    'Orientación general: respetar siempre el prospecto o indicación profesional; no automedicarse sin criterio.',
    'En dosis habituales suele ser bien tolerado; reacciones alérgicas son poco frecuentes. Consulte el prospecto.'
);

INSERT INTO medication (name, generic_name, description, common_usage, precautions, dose_guidance, side_effects)
VALUES (
    'Ibuprofeno',
    'ibuprofeno',
    'Antiinflamatorio no esteroideo (AINE).',
    'Dolor inflamatorio leve, según indicación.',
    'Tomar con alimento; evitar si hay úlcera activa o ciertas condiciones renales sin supervisión médica.',
    'Orientación general: usar la menor dosis efectiva por el menor tiempo posible, según prospecto o médico.',
    'Puede causar molestias digestivas; otros efectos son menos frecuentes. Ver prospecto y contraindicaciones.'
);

-- Preguntas de repaso
INSERT INTO quiz_question (prompt, explanation)
VALUES (
    '¿Para qué se usa principalmente el paracetamol?',
    'El paracetamol (acetaminofén) se usa sobre todo para reducir fiebre y aliviar dolores leves a moderados.'
);

INSERT INTO quiz_option (question_id, option_text, correct) VALUES (1, 'Reducir la presión arterial de forma permanente', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (1, 'Aliviar fiebre y dolores leves a moderados', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (1, 'Reemplazar antibióticos en infecciones bacterianas', FALSE);

INSERT INTO quiz_question (prompt, explanation)
VALUES (
    '¿Qué precaución es frecuente con los AINE como el ibuprofeno?',
    'Pueden irritar el estómago; por eso suele recomendarse tomarlos con alimento y no usarlos sin control si hay antecedentes de úlcera.'
);

INSERT INTO quiz_option (question_id, option_text, correct) VALUES (2, 'Se deben tomar siempre en ayunas para mayor efecto', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (2, 'Pueden irritar el estómago; conviene precaución y seguir indicaciones', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (2, 'No tienen interacción con otros medicamentos', FALSE);
