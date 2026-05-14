-- Catálogo de medicamentos y repaso (semilla alineada al aporte del equipo; tablas medication / quiz_*).
INSERT INTO medication (name, generic_name, description, common_usage, precautions, dose_guidance, side_effects) VALUES
('Paracetamol', NULL, 'Analgésico y antipirético.', 'Alivia dolor leve y baja la fiebre.', 'No exceder 4g al día por riesgo de daño al hígado.', '500mg a 1g cada 6-8 horas.', NULL),
('Ibuprofeno', NULL, 'Antiinflamatorio y analgésico.', 'Antiinflamatorio y analgésico.', 'Evitar si tienes gastritis o úlceras.', '400mg cada 8 horas con comida.', NULL),
('Loratadina', NULL, 'Antihistamínico.', 'Antihistamínico para alergias y rinitis.', 'Puede causar somnolencia leve en algunas personas.', '10mg una vez al día.', NULL),
('Amoxicilina', NULL, 'Antibiótico.', 'Antibiótico para infecciones bacterianas.', 'Requiere receta. Completar el tratamiento siempre.', 'Según receta médica (común 500mg cada 8h).', NULL),
('Salbutamol', NULL, 'Broncodilatador.', 'Broncodilatador para el asma o tos cerrada.', 'Puede causar temblor o taquicardia.', '2 inhalaciones cada 4-6 horas si hay dificultad.', NULL),
('Omeprazol', NULL, 'Protector gástrico.', 'Protector gástrico para acidez y reflujo.', 'No usar por tiempo prolongado sin supervisión médica.', '20mg en ayunas.', NULL),
('Suero Oral', NULL, 'Rehidratación oral.', 'Rehidratación tras diarrea o vómito.', 'No sustituye la comida, solo repone sales.', 'Beber a sorbos pequeños después de cada evacuación.', NULL),
('Diclofenaco Gel', NULL, 'Antiinflamatorio tópico.', 'Alivio local de dolores musculares.', 'No aplicar sobre heridas abiertas.', 'Aplicar en la zona afectada 3 veces al día.', NULL),
('Nafazolina', NULL, 'Gotas oftálmicas.', 'Gotas para ojos rojos por irritación.', 'No usar más de 3 días seguidos.', '1-2 gotas cada 8 horas.', NULL),
('Hioscina (Buscapina)', NULL, 'Antiespasmódico.', 'Alivia espasmos y cólicos estomacales.', 'Consultar si el dolor abdominal es muy intenso.', '1 tableta ante el dolor.', NULL),
('Clorfenamina', NULL, 'Antihistamínico.', 'Alergias fuertes y picaduras.', 'Causa mucha somnolencia. No conducir.', '4mg cada 6 horas.', NULL),
('Bismuto (Pepto-Bismol)', NULL, 'Antidiarreico / digestivo.', 'Alivia indigestión y diarrea leve.', 'Puede oscurecer la lengua y las heces temporalmente.', '30ml cada hora (máximo 8 dosis).', NULL),
('Cetirizina', NULL, 'Antialérgico.', 'Antialérgico de larga duración.', 'Más potente que la loratadina para rinitis.', '10mg al día.', NULL),
('Naproxeno', NULL, 'AINE.', 'Dolor fuerte de articulaciones o espalda.', 'Tomar con abundante agua y alimentos.', '500mg cada 12 horas.', NULL),
('Gel de Aluminio/Magnesio', NULL, 'Antiácido.', 'Antiácido líquido para ardor inmediato.', 'Puede causar diarrea o estreñimiento si se abusa.', '10-20ml después de las comidas.', NULL),
('Benzocaína (Pastillas)', NULL, 'Analgésico local para garganta.', 'Alivia el dolor de garganta al chupar.', 'No tragar enteras, dejar disolver.', 'Una pastilla cada 3-4 horas.', NULL),
('Terbinafina Crema', NULL, 'Antifúngico tópico.', 'Para hongos en piel o pies.', 'Mantener la zona seca después de aplicar.', 'Aplicar 1 vez al día por 1 semana.', NULL),
('Loperamida', NULL, 'Antimotilidad intestinal.', 'Detiene la diarrea líquida.', 'No usar si hay fiebre alta o sangre en heces.', '2 mg tras la primera evacuación.', NULL),
('Metamizol', NULL, 'Analgésico.', 'Dolor fuerte y fiebre persistente.', 'Puede bajar la presión arterial en algunas personas.', '500mg cada 8 horas.', NULL),
('Vitamina C', NULL, 'Suplemento.', 'Suplemento para defensas.', 'El exceso se elimina por la orina.', '500mg a 1g al día.', NULL);

-- Repaso: 20 preguntas (una opción correcta por pregunta).
INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Qué dolencia se caracteriza por dolor al tragar y placas blancas?', 'Correcto: la faringoamigdalitis se asocia a dolor al tragar y a veces placas en amígdalas.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (1, 'Rinofaringitis', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (1, 'Gastroenteritis', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (1, 'Faringoamigdalitis', TRUE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('Si un medicamento es un "antihistamínico", ¿para qué sirve?', 'Correcto: los antihistamínicos se usan principalmente para síntomas alérgicos.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (2, 'Para las alergias', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (2, 'Para la fiebre', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (2, 'Para las bacterias', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Qué color de triaje indica que puedes esperar tu turno sin riesgo vital?', 'Correcto: el triaje verde indica prioridad baja sin urgencia vital.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (3, 'Verde', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (3, 'Rojo', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (3, 'Amarillo', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Cuál es el nombre común de la Rinofaringitis?', 'Correcto: la rinofaringitis aguda corresponde al resfriado común.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (4, 'Resfriado común', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (4, 'Gripe porcina', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (4, 'Neumonía', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Qué medicamento NO debe tomarse con el estómago vacío por riesgo de gastritis?', 'Correcto: los AINE como el ibuprofeno suelen tomarse con alimento por irritación gástrica.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (5, 'Ibuprofeno', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (5, 'Loratadina', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (5, 'Suero Oral', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Cuál es la función del Omeprazol?', 'Correcto: el omeprazol reduce la acidez gástrica y protege la mucosa.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (6, 'Proteger el estómago de la acidez', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (6, 'Curar la tos', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (6, 'Bajar la presión', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('Un síntoma de gravedad (Rojo) que requiere hospitalización es:', 'Correcto: la dificultad respiratoria es una señal de alarma.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (7, 'Dificultad respiratoria', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (7, 'Moco transparente', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (7, 'Dolor de espalda', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('La gastroenteritis afecta principalmente al sistema:', 'Correcto: la gastroenteritis afecta el tubo digestivo.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (8, 'Digestivo', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (8, 'Respiratorio', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (8, 'Óseo', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Qué se recomienda para reponer sales tras una deshidratación?', 'Correcto: el suero oral está formulado para rehidratación.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (9, 'Suero Oral', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (9, 'Bebidas energéticas', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (9, 'Agua con gas', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Cómo se llama la inflamación de las encías?', 'Correcto: gingivitis es la inflamación de encías.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (10, 'Gingivitis', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (10, 'Conjuntivitis', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (10, 'Otitis', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Qué hace la Insulina en nuestro cuerpo?', 'Correcto: la insulina regula la glucosa en sangre.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (11, 'Regula el azúcar en la sangre', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (11, 'Transporta oxígeno', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (11, 'Combate virus', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('Si tienes una torcedura de pie, el diagnóstico probable es:', 'Correcto: el esguince es la lesión ligamentosa típica de torcedura.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (12, 'Esguince', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (12, 'Fractura expuesta', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (12, 'Lumbago', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Cuál es la advertencia principal del Paracetamol?', 'Correcto: el exceso de paracetamol puede dañar el hígado.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (13, 'No dañar el hígado por exceso', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (13, 'No tomarlo de noche', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (13, 'Causa manchas en la piel', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Qué órgano se inflama en una Otitis?', 'Correcto: la otitis media afecta el oído.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (14, 'El oído', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (14, 'El ojo', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (14, 'La nariz', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Qué síntoma es típico de la Conjuntivitis?', 'Correcto: enrojecimiento ocular y secreción son típicos.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (15, 'Ojo rojo y legañas', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (15, 'Dolor de muelas', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (15, 'Zumbido de oídos', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Cuál es la mejor forma de prevenir contagios de resfriados?', 'Correcto: el lavado de manos reduce la transmisión de virus respiratorios.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (16, 'Lavado de manos frecuente', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (16, 'Tomar mucha vitamina C', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (16, 'No salir al sol', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Para qué sirve el Diclofenaco en gel?', 'Correcto: el gel se usa de forma tópica para dolor muscular local.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (17, 'Dolores musculares locales', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (17, 'Infecciones de garganta', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (17, 'Bajar la fiebre', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('El término "Cefalea" se refiere a:', 'Correcto: cefalea es dolor de cabeza.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (18, 'Dolor de cabeza', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (18, 'Dolor de estómago', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (18, 'Dolor de huesos', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Qué se debe hacer primero ante una quemadura leve?', 'Correcto: enfriar con agua corriente fresca es la medida inicial habitual.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (19, 'Poner agua fresca', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (19, 'Poner pasta de dientes', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (19, 'Poner hielo directo', FALSE);

INSERT INTO quiz_question (prompt, explanation) VALUES ('¿Qué profesional trata la Infección Urinaria?', 'Correcto: el urólogo es el especialista del tracto urinario.');
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (20, 'Urólogo', TRUE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (20, 'Cardiólogo', FALSE);
INSERT INTO quiz_option (question_id, option_text, correct) VALUES (20, 'Dermatólogo', FALSE);
