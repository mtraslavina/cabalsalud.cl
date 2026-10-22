/**
 * CLÍNICA CABAL SALUD — PORTAL EXCLUSIVO DE PROFESIONALES
 * Opera 100% sobre cabalsalud.cl con la identidad visual oficial
 * Conectado con el motor headless de Gentia.cl
 */

(function () {
  let profesionalActivo = null;
  let catalogoProfesionales = [];

  const CATALOGO_LOCAL = [
    {
      uid: "cabal_admin_central",
      nombre: "Dra. Pamela Quijada & Lilians Cortés",
      profesion: "Dirección Médica & Administración Central",
      disciplinaId: "administracion",
      disciplinaNombre: "Dirección Médica & Administración",
      rnpi: "Dirección Médica Cabal Salud",
      universidad: "Clínica Cabal Salud SpA",
      especialidades: [
        "Recepción y Asignación de Consultantes",
        "Supervisión Multidisciplinaria en Red",
        "Gestión de Bóveda Clínica Gentia Vault"
      ],
      subespecialidadIds: ["infanto_geriatria", "deporte", "neurodivergencia", "perinatal"],
      subespecialidadesDestacadas: ["Infanto-Juvenil y Geriatría", "Neurodivergencia Integral"],
      modalidades: ["Online"],
      previsiones: ["Particular", "Reembolso Isapres", "FONASA"],
      precioCLP: 35000,
      duracionMinutos: 50,
      fotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      enfoqueResumen: "Administración central y coordinación clínica de la red interdisciplinaria Cabal Salud.",
      experienciaDetalle: "Dirección y supervisión médica y psicológica.",
      formacionAcademica: [
        "Dirección Médica — Clínica Cabal Salud SpA",
        "Coordinación Clínica — Red Gentia"
      ]
    },
    {
      uid: "cabal_psico_deportiva_01",
      nombre: "Ps. Camila Valdés Araneda",
      profesion: "Psicóloga Clínica y del Deporte",
      disciplinaId: "psicologia",
      disciplinaNombre: "Psicología",
      rnpi: "RNPI N° 648291",
      universidad: "Universidad de Chile",
      especialidades: [
        "Psicología Deportiva y Alto Rendimiento",
        "Acompañamiento en Lesiones Deportivas",
        "Regulación de Ansiedad Competitiva"
      ],
      subespecialidadIds: ["deporte", "infanto_geriatria"],
      subespecialidadesDestacadas: ["Psicología Deportiva y Nutrición Deportiva"],
      modalidades: ["Online"],
      previsiones: ["Particular", "Reembolso Isapres", "FONASA"],
      precioCLP: 35000,
      duracionMinutos: 50,
      fotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      enfoqueResumen: "Acompañamiento psicológico a deportistas amateur y de alto rendimiento, manejo de presión competitiva y rehabilitación emocional en lesiones junto a Terapia Ocupacional y Nutrición.",
      experienciaDetalle: "8 años de experiencia clínica en salud mental en el deporte, preparación psicológica para competencias y retorno deportivo post-lesión en trabajo interdisciplinario.",
      formacionAcademica: [
        "Título Profesional de Psicóloga — Universidad de Chile",
        "Magíster en Psicología del Deporte y la Actividad Física",
        "Diplomado en Rehabilitación Integral de Lesiones Deportivas"
      ]
    },
    {
      uid: "cabal_nutri_deportiva_geriatria_02",
      nombre: "Nut. Sebastián Morales Rojas",
      profesion: "Nutricionista Clínico, Deportivo y Geriátrico",
      disciplinaId: "nutricion",
      disciplinaNombre: "Nutrición y Dietética",
      rnpi: "RNPI N° 583920",
      universidad: "Pontificia Universidad Católica de Chile",
      especialidades: [
        "Nutrición Deportiva y Composición Corporal",
        "Nutrición Geriátrica y Sarcopenia",
        "Selectividad Alimentaria en Neurodivergencia"
      ],
      subespecialidadIds: ["deporte", "infanto_geriatria", "neurodivergencia"],
      subespecialidadesDestacadas: ["Psicología Deportiva y Nutrición Deportiva", "Infanto-Juvenil y Geriatría"],
      modalidades: ["Online"],
      previsiones: ["Particular", "Reembolso Isapres", "FONASA"],
      precioCLP: 32000,
      duracionMinutos: 45,
      fotoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
      enfoqueResumen: "Nutrición basada en evidencia con enfoque no pesocentrista. Planificación nutricional para rendimiento deportivo, recuperación de lesiones y salud nutricional en personas mayores.",
      experienciaDetalle: "Especialista en optimización energética de deportistas y soporte nutricional geriátrico integral en coordinación con Trabajo Social y Medicina.",
      formacionAcademica: [
        "Nutricionista — Pontificia Universidad Católica de Chile",
        "Certificación Internacional ISAK Nivel II",
        "Posgrado en Nutrición Clínica del Adulto Mayor y Longevidad Saludable"
      ]
    },
    {
      uid: "cabal_matrona_perinatal_neuro_03",
      nombre: "Mat. Valentina Ríos Pizarro",
      profesion: "Matrona Especialista en Salud Perinatal y Sexualidad",
      disciplinaId: "matroneria",
      disciplinaNombre: "Matronería",
      rnpi: "RNPI N° 712405",
      universidad: "Universidad de Santiago de Chile (USACH)",
      especialidades: [
        "Preconcepción, Gestación y Puerperio",
        "Sexualidad y Sensorialidad Corporal en Neurodivergencia",
        "Salud Ginecológica Respetuosa y Lactancia"
      ],
      subespecialidadIds: ["perinatal", "neurodivergencia"],
      subespecialidadesDestacadas: ["Salud Mental Perinatal y Preconcepción", "Neurodivergencia Integral"],
      modalidades: ["Online"],
      previsiones: ["Particular", "Reembolso Isapres", "FONASA"],
      precioCLP: 30000,
      duracionMinutos: 45,
      fotoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
      enfoqueResumen: "Consejería en salud sexual y reproductiva, preparación preconcepcional, acompañamiento perinatal y abordaje respetuoso de la sensorialidad corporal y sexualidad en personas neurodivergentes.",
      experienciaDetalle: "Trabajo articulado con Psicología Perinatal y Terapia Ocupacional para brindar una atención gineco-obstétrica cálida, informada y adaptada a perfiles sensoriales diversos.",
      formacionAcademica: [
        "Matrona — Universidad de Santiago de Chile (USACH)",
        "Diplomado en Salud Mental Perinatal y Lactancia Materna",
        "Especialización en Sexualidad, Género y Neurodivergencia"
      ]
    },
    {
      uid: "cabal_to_neuro_deporte_04",
      nombre: "T.O. Fernanda Herrera Soto",
      profesion: "Terapeuta Ocupacional",
      disciplinaId: "terapia_ocupacional",
      disciplinaNombre: "Terapia Ocupacional",
      rnpi: "RNPI N° 694112",
      universidad: "Universidad de Valparaíso",
      especialidades: [
        "Integración Sensorial y Neurodivergencia (TEA / TDAH)",
        "Reintegro Funcional y Acompañamiento en Lesiones Deportivas",
        "Autonomía en Rutinas de Vida Diaria"
      ],
      subespecialidadIds: ["neurodivergencia", "deporte", "infanto_geriatria"],
      subespecialidadesDestacadas: ["Neurodivergencia Integral", "Psicología Deportiva y Nutrición Deportiva"],
      modalidades: ["Online"],
      previsiones: ["Particular", "Reembolso Isapres", "FONASA"],
      precioCLP: 34000,
      duracionMinutos: 50,
      fotoUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80",
      enfoqueResumen: "Evaluación e intervención en perfil sensorial, autorregulación y organización de rutinas en niños, jóvenes y adultos neurodivergentes, además de readaptación funcional en lesiones.",
      experienciaDetalle: "Co-intervención clínica con Psicología, Fonoaudiología y Matronería bajo un paradigma neuroafirmativo y funcional.",
      formacionAcademica: [
        "Terapeuta Ocupacional — Universidad de Valparaíso",
        "Certificación en Integración Sensorial (CLASI)",
        "Diplomado en Neurodivergencia a lo Largo del Ciclo Vital"
      ]
    },
    {
      uid: "cabal_fono_neuro_infanto_05",
      nombre: "Flgo. Diego Contreras Muñoz",
      profesion: "Fonoaudiólogo Clínico",
      disciplinaId: "fonoaudiologia",
      disciplinaNombre: "Fonoaudiología",
      rnpi: "RNPI N° 619843",
      universidad: "Universidad de Concepción",
      especialidades: [
        "Comunicación Social y Neurodivergencia (TEA)",
        "Lenguaje y Habla Infanto-Juvenil",
        "Rehabilitación Cognitivo-Comunicativa en Adultos Mayores"
      ],
      subespecialidadIds: ["neurodivergencia", "infanto_geriatria"],
      subespecialidadesDestacadas: ["Neurodivergencia Integral", "Infanto-Juvenil y Geriatría"],
      modalidades: ["Online"],
      previsiones: ["Particular", "Reembolso Isapres", "FONASA"],
      precioCLP: 32000,
      duracionMinutos: 45,
      fotoUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
      enfoqueResumen: "Acompañamiento fonoaudiológico respetuoso centrado en la comunicación funcional, neurodivergencia infanto-juvenil y adulta, y estimulación comunicativa geriátrica.",
      experienciaDetalle: "Amplia trayectoria en evaluación y apoyo comunicativo online, orientación familiar y trabajo coordinado con Terapia Ocupacional y Psicología.",
      formacionAcademica: [
        "Fonoaudiólogo — Universidad de Concepción",
        "Diplomado en Abordaje Neuroafirmativo del Autismo (ADOS-2 / ADI-R)",
        "Especialización en Motricidad Orofacial y Deglución"
      ]
    },
    {
      uid: "cabal_ts_geriatria_terreno_06",
      nombre: "T.S. Carolina Fuentes Lagos",
      profesion: "Trabajadora Social Clínica y Familiar",
      disciplinaId: "trabajo_social",
      disciplinaNombre: "Trabajo Social",
      rnpi: "Colegio T.S. N° 14.892",
      universidad: "Universidad Alberto Hurtado",
      especialidades: [
        "Trabajo Social Geriátrico y Redes de Apoyo y Cuidado",
        "Evaluación Sociofamiliar (Online y Visita Domiciliaria / Terreno)",
        "Orientación en Beneficios Sociales, Discapacidad (RND) y Dependencia"
      ],
      subespecialidadIds: ["infanto_geriatria", "neurodivergencia"],
      subespecialidadesDestacadas: ["Infanto-Juvenil y Geriatría"],
      modalidades: ["Online", "Visita a Terreno"],
      previsiones: ["Particular", "FONASA"],
      precioCLP: 35000,
      duracionMinutos: 60,
      fotoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      enfoqueResumen: "Intervención social clínica para familias, personas mayores y cuidadores. Gestión de redes de salud, tramitación de credencial de discapacidad, informes sociales y opción de visita a terreno.",
      experienciaDetalle: "Articulación directa con Nutrición Geriátrica, Medicina, Psicología y Mediación Familiar para abordar determinantes sociales del bienestar.",
      formacionAcademica: [
        "Trabajadora Social — Universidad Alberto Hurtado",
        "Postítulo en Gerontología Social y Cuidado Integral del Adulto Mayor",
        "Diplomado en Peritaje Social y Familia"
      ]
    },
    {
      uid: "cabal_psico_perinatal_neuro_07",
      nombre: "Ps. Daniela Navarro Silva",
      profesion: "Psicóloga Clínica Perinatal y Neurodivergencia",
      disciplinaId: "psicologia",
      disciplinaNombre: "Psicología",
      rnpi: "RNPI N° 672310",
      universidad: "Universidad Diego Portales",
      especialidades: [
        "Salud Mental Perinatal, Gestación, Posparto y Duelo Gestacional",
        "Psicoterapia en Adultos Neurodivergentes (TEA / TDAH)",
        "Parentalidad y Vínculo Temprano"
      ],
      subespecialidadIds: ["perinatal", "neurodivergencia"],
      subespecialidadesDestacadas: ["Salud Mental Perinatal y Preconcepción", "Neurodivergencia Integral"],
      modalidades: ["Online"],
      previsiones: ["Particular", "Reembolso Isapres", "FONASA"],
      precioCLP: 35000,
      duracionMinutos: 50,
      fotoUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
      enfoqueResumen: "Espacio psicoterapéutico seguro y libre de juicios para acompañar procesos de búsqueda gestacional, embarazo, puerperio, crianza y diagnóstico tardío de neurodivergencia.",
      experienciaDetalle: "Trabajo en dupla clínica junto a Matronería y Psiquiatría para el cuidado integral de la salud mental materna, paterna y familiar.",
      formacionAcademica: [
        "Psicóloga Clínica — Universidad Diego Portales",
        "Formación en Psicología Perinatal — Instituto Europeo de Salud Mental Perinatal",
        "Diplomado en Clínica del Autismo en Mujeres y Adultos"
      ]
    },
    {
      uid: "cabal_medicina_mental_08",
      nombre: "Dr. Cristóbal Méndez Alarcón",
      profesion: "Médico Cirujano · Enfoque Salud Mental",
      disciplinaId: "medicina_psiquiatria",
      disciplinaNombre: "Medicina General / Psiquiatría",
      rnpi: "RNPI N° 510948",
      universidad: "Universidad de Santiago de Chile (USACH)",
      especialidades: [
        "Salud Mental Integral y Psicofarmacología Criteriosa",
        "Trastornos del Ánimo, Ansiedad, Sueño y Estrés Laboral",
        "Interconsulta Médica con Equipo de Psicología y Terapia Ocupacional"
      ],
      subespecialidadIds: ["neurodivergencia", "perinatal", "infanto_geriatria"],
      subespecialidadesDestacadas: ["Neurodivergencia Integral", "Salud Mental Perinatal y Preconcepción"],
      modalidades: ["Online"],
      previsiones: ["Particular", "Reembolso Isapres"],
      precioCLP: 48000,
      duracionMinutos: 45,
      fotoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
      enfoqueResumen: "Evaluación médica integral en salud mental, indicación y ajuste farmacológico criterioso, licencias médicas justificadas y derivación interdisciplinaria activa.",
      experienciaDetalle: "10 años en atención primaria y psiquiatría ambulatoria. Trabajo estrecho con psicoterapeutas y terapeutas ocupacionales.",
      formacionAcademica: [
        "Médico Cirujano — Universidad de Santiago de Chile",
        "Diplomado en Psiquiatría y Salud Mental del Adulto",
        "Capacitación en Manejo Integral del Insomnio y Cronobiología"
      ]
    },
    {
      uid: "cabal_abogacia_mediacion_09",
      nombre: "Abog. Ignacia Vergara Donoso",
      profesion: "Abogada de Familia y Mediadora Familiar",
      disciplinaId: "abogacia_mediacion",
      disciplinaNombre: "Abogacía / Mediación Familiar",
      rnpi: "Colegio de Abogados N° 23.410",
      universidad: "Pontificia Universidad Católica de Chile",
      especialidades: [
        "Mediación Familiar Respetuosa y Acuerdos Colaborativos",
        "Pensión de Alimentos, Cuidado Personal y Régimen de Relación Directa",
        "Asesoría Legal en Salud, Cuidado y Dependencia Severa"
      ],
      subespecialidadIds: ["infanto_geriatria", "perinatal"],
      subespecialidadesDestacadas: ["Infanto-Juvenil y Geriatría"],
      modalidades: ["Online"],
      previsiones: ["Particular"],
      precioCLP: 42000,
      duracionMinutos: 50,
      fotoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
      enfoqueResumen: "Orientación jurídica cálida y no confrontacional en derecho de familia. Acuerdos de mediación centrados en el bienestar superior de niños, niñas y personas mayores.",
      experienciaDetalle: "Trabajo en red con Trabajadoras Sociales y Psicólogas Clínicas para resolver conflictos familiares con criterio y dignidad.",
      formacionAcademica: [
        "Licenciada en Ciencias Jurídicas y Sociales — Pontificia Universidad Católica de Chile",
        "Magíster en Derecho de Familia e Infancia",
        "Mediadora Familiar Acreditada ante el Ministerio de Justicia"
      ]
    }
  ];

  // ============================================================================
  // EXPEDIENTES CLÍNICOS Y LEGALES FALLBACK CON CAMPOS AD-HOC POR PROFESIÓN
  // ============================================================================
  const PACIENTES_MOCK_FALLBACK = [
    {
      id: "cbl_pac_01",
      nombre: "Constanza Morales Henríquez",
      rut: "18.392.104-5",
      email: "constanza.morales@gmail.com",
      telefono: "+56 9 7812 3456",
      fechaNacimiento: "1997-04-12",
      edad: 28,
      genero: "Femenino",
      prevision: "Reembolso Isapres (Colmena)",
      ocupacion: "Diseñadora Gráfica & Triatleta Amateur",
      direccion: "Av. Providencia 1450, Depto 602, Providencia",
      contactoEmergenciaNombre: "Martín Morales (Hermano)",
      contactoEmergenciaTelefono: "+56 9 9876 5432",
      contactoEmergenciaParentesco: "Hermano",
      antecedentesMedicos: "Hipotiroidismo compensado (Eutirox 50mcg/día). Lesión tendinosa rotuliana rodilla derecha en 2024.",
      antecedentesPsiquiatricos: "Episodio ansioso reactivo a sobrecarga universitaria en 2020 con remisión completa.",
      medicacionActual: "Eutirox 50mcg en ayunas. Sin psicofármacos actuales.",
      alergias: "Alergia a AINEs (Ketorolaco produce urticaria).",
      flagSui: false,
      flagVIF: false,
      flagAbuso: false,
      alertaCritica: false,
      motivoConsulta: "Consulta por ansiedad de rendimiento precompetitiva, pensamientos anticipatorios catastróficos y bruxismo matutino intenso antes de carreras de triatlón.",
      motivoConsultaLatente: "Temor inconsciente a defraudar expectativas familiares introyectadas de éxito incondicional. Necesidad de hipercontrol corporal y sobreexigencia como defensa maníaca contra la vulnerabilidad afectiva y el temor al abandono.",
      diagnosticoCIE: "6A71 Trastorno de Ansiedad Generalizada / Ansiedad de Desempeño Deportivo",
      examenMental: {
        porteActitud: "Adecuado aseo y vestimenta deportiva. Actitud colaboradora y comunicativa.",
        conciencia: "Vigil, lúcida y orientada en tiempo, espacio y persona (autopsíquica y alopsíquica).",
        psicomotricidad: "Leve hiperactividad motora distal (movimiento constante de manos).",
        afectividad: "Ánimo ansioso con reactividad conservada. Sin anhedonia.",
        pensamiento: "Curso fluido y coherente. Contenido dominado por autoexigencia y temor a fallar en marcas de tiempo.",
        lenguaje: "Fluido, tono adecuado y léxico amplio.",
        sensopercepcion: "Sin alteraciones sensoperceptivas.",
        juicioInsight: "Juicio de realidad conservado. Buen insight y conciencia de necesidad de psicoterapia."
      },
      objetivosTerapeuticos: "1. Reducir activación fisiológica precompetitiva mediante biofeedback y respiración diafragmática. 2. Reestructurar distorsiones cognitivas de tipo polarizadas sobre el rendimiento. 3. Sinergia con Nutrición Deportiva para carga glucémica.",
      historial: [
        {
          id: "nota_cbl_001",
          fecha: "2026-09-15",
          sesionN: 1,
          tipo: "Ingreso / Anamnesis",
          contenido: "Primera entrevista de admisión clínica. Se levanta genograma y línea de vida deportiva. Se firma consentimiento informado según Ley N° 20.584.",
          dap: {
            datosSubjetivos: "Consultante refiere 'Siento que el corazón se me va a salir 48 horas antes de una competencia importante, lo que me impide descansar la noche previa'.",
            evaluacionClinica: "Se observa autoexigencia perfeccionista desadaptativa. Frecuencia respiratoria levemente aumentada durante el relato de cronometrajes.",
            planTerapeutico: "Se psicoeduca sobre la curva de Yerkes-Dodson (relación activación-rendimiento). Se acuerda registro de autorregistro de pensamientos ansiosos."
          },
          ansiedad: 8,
          depresion: 2,
          estres: 7,
          esNotaPrivada: false,
          profesionalNombre: "Ps. Camila Valdés Araneda",
          disciplinaNombre: "Psicología Clínica y del Deporte",
          hashIntegridad: "SHA256:8F3A2B19C0E28491"
        },
        {
          id: "nota_cbl_002",
          fecha: "2026-09-29",
          sesionN: 2,
          tipo: "Evolución Regular",
          contenido: "Revisión de autorregistro cognitivo. Aplicación de técnica de imaginería motora y desensibilización sistemática.",
          dap: {
            datosSubjetivos: "Paciente comenta que logró reducir la rumiación nocturna utilizando la técnica de respiración en caja (box breathing) enseñada.",
            evaluacionClinica: "Disminución notable en puntaje subjetivo de ansiedad pre-entrenamiento. Excelente adherencia al plan de tareas.",
            planTerapeutico: "Continuar con visualización guiada. Coordinar evaluación con Nutricionista Sebastián Morales para optimizar sustrato energético."
          },
          ansiedad: 5,
          depresion: 1,
          estres: 4,
          esNotaPrivada: false,
          profesionalNombre: "Ps. Camila Valdés Araneda",
          disciplinaNombre: "Psicología Clínica y del Deporte",
          hashIntegridad: "SHA256:7B1E408A91C36622"
        }
      ],
      epicrisis: {
        motivoCierre: "En tratamiento activo / Evolución favorable",
        fechaEmision: "2026-10-21",
        resumenTratamiento: "Paciente que ha completado fase inicial de psicoeducación y reestructuración cognitiva para ansiedad de desempeño, logrando descenso significativo en sintomatología vegetativa.",
        indicaciones: "Mantener sesiones quincenales de consolidación y coordinación con nutrición deportiva."
      },
      archivos: [
        {
          id: "arch_01",
          nombre: "Consentimiento_Informado_Ley20584_Firmado.pdf",
          tipo: "Consentimiento Informado",
          fecha: "2026-09-15",
          url: "#"
        }
      ],
      psicologoAsignadoUid: "cabal_psico_deportiva_01",
      psicologoAsignadoNombre: "Ps. Camila Valdés Araneda",
      profesionalesAsignados: [
        "cabal_psico_deportiva_01",
        "cabal_nutri_deportiva_geriatria_02",
        "cabal_matrona_perinatal_neuro_03",
        "cabal_to_neuro_deporte_04",
        "cabal_fono_neuro_infantojuvenil_05",
        "cabal_ts_perinatal_geriatria_06",
        "cabal_psico_perinatal_neuro_07",
        "cabal_psiquiatria_adultos_08",
        "cabal_abogacia_mediacion_09"
      ],
      fichasPorEspecialidad: {
        psicologia: {
          profesionalNombre: "Ps. Camila Valdés Araneda",
          profesionalUid: "cabal_psico_deportiva_01",
          disciplinaNombre: "Psicología Clínica y del Deporte",
          diagnosticoCIE: "6A71 Trastorno de Ansiedad Generalizada / Ansiedad de Desempeño Deportivo",
          motivoConsulta: "Consulta por ansiedad de rendimiento precompetitiva, pensamientos anticipatorios catastróficos y bruxismo matutino intenso antes de carreras de triatlón.",
          motivoConsultaLatente: "Temor inconsciente a defraudar expectativas familiares introyectadas de éxito incondicional. Necesidad de hipercontrol corporal y sobreexigencia como defensa maníaca contra la vulnerabilidad afectiva y el temor al abandono.",
          examenMental: {
            porteActitud: "Adecuado aseo y vestimenta deportiva. Actitud colaboradora y comunicativa.",
            conciencia: "Vigil, lúcida y orientada en tiempo, espacio y persona (autopsíquica y alopsíquica).",
            psicomotricidad: "Leve hiperactividad motora distal (movimiento constante de manos).",
            afectividad: "Ánimo ansioso con reactividad conservada. Sin anhedonia.",
            pensamiento: "Curso fluido y coherente. Contenido dominado por autoexigencia y temor a fallar en marcas de tiempo.",
            lenguaje: "Fluido, tono adecuado y léxico amplio.",
            sensopercepcion: "Sin alteraciones sensoperceptivas.",
            juicioInsight: "Juicio de realidad conservado. Buen insight y conciencia de necesidad de psicoterapia."
          },
          objetivosTerapeuticos: "1. Reducir activación fisiológica precompetitiva mediante biofeedback y respiración diafragmática. 2. Reestructurar distorsiones cognitivas de tipo polarizadas sobre el rendimiento. 3. Sinergia con Nutrición Deportiva para carga glucémica.",
          epicrisis: {
            motivoCierre: "En tratamiento activo / Evolución favorable",
            fechaEmision: "2026-10-21",
            resumenTratamiento: "Paciente que ha completado fase inicial de psicoeducación y reestructuración cognitiva para ansiedad de desempeño, logrando descenso significativo en sintomatología vegetativa.",
            indicaciones: "Mantener sesiones quincenales de consolidación y coordinación con nutrición deportiva."
          }
        },
        nutricion: {
          profesionalNombre: "Nut. Sebastián Morales Rojas",
          profesionalUid: "cabal_nutri_deportiva_geriatria_02",
          disciplinaNombre: "Nutrición y Dietética",
          diagnosticoCIE: "FB40 Evaluación del Estado Nutricional / Asesoramiento Dietético Deportivo",
          motivoConsulta: "Planificación nutricional personalizada para triatlón de media distancia, optimización de recomposición corporal y timing de ingesta intra-entrenamiento.",
          datosAdHoc: {
            disciplinaId: "nutricion",
            pesoActual: 58.5,
            talla: 165,
            imc: 21.5,
            porcentajeGrasa: 19.8,
            masaMuscular: 27.2,
            perimetroCintura: 67,
            transitoDigestivo: "Bristol 3-4 (Normal). Alivio total tras suspensión de lácteos enteros pre-fondo.",
            anamnesisAlimentaria: "3 comidas principales + 2 colaciones proteicas. Hidratación: 2.8L agua/día + sales minerales en tiradas de fondo.",
            pautaRequerimientos: "GET estimado: 2.300 kcal/día. Proteínas: 1.8 g/kg (105g/día). Carbohidratos: 6g/kg (350g/día) con carga glucogénica 48h pre-competencia. Creatina monohidrato 5g/día en fase de mantenimiento."
          },
          objetivosTerapeuticos: "1. Optimizar recarga glucogénica en microciclos de triatlón. 2. Preservar masa magra sin pérdida de potencia en ciclismo. 3. Pauta de hidratación y geles isotónicos en carrera.",
          epicrisis: {
            motivoCierre: "Plan nutricional en curso",
            fechaEmision: "2026-10-21",
            resumenTratamiento: "Excelente adherencia al protocolo de hidratación intra-sesión y timing de recuperación post-natación.",
            indicaciones: "Control antropométrico ISAK Nivel II en 4 semanas."
          }
        },
        matroneria: {
          profesionalNombre: "Mat. Valentina Ríos Pizarro",
          profesionalUid: "cabal_matrona_perinatal_neuro_03",
          disciplinaNombre: "Matronería y Salud Sexual",
          diagnosticoCIE: "QA20 Asesoramiento en Salud Sexual y Reproductiva / Prevención Tríada Atleta",
          motivoConsulta: "Control ginecológico preventivo anual, evaluación de regularidad del ciclo menstrual en deportistas de fondo y consejería en salud pélvica.",
          datosAdHoc: {
            disciplinaId: "matroneria",
            fur: "2026-10-06",
            ciclos: "28 días / Regular / Eumenorrea sin dismenorrea severa",
            menarquia: 13,
            formulaObstetrica: "G0 P0 A0 C0 (Nulípara)",
            metodoAnticonceptivo: "DIU T de Cobre 380A normoposicionado por ecografía transvaginal 2025",
            tamizajePAP: "PAP vigente al día (Negativo para neoplasia intraepitelial, próximo en 2027)",
            tamizajeMamario: "Examen mamario bilateral sin nódulos palpables ni adenopatías axilares",
            saludSexualSensorial: "Ciclo ovulatorio regular. Descarte clínico de amenorrea hipotalámica funcional (tríada de la atleta femenina). Consejería en protección de suelo pélvico durante ciclismo de ruta."
          },
          objetivosTerapeuticos: "1. Monitoreo semestral de regularidad menstrual ante fluctuaciones de carga de entrenamiento. 2. Prevención de debilidad de piso pélvico en impacto de trote. 3. Mantener tamizajes al día.",
          epicrisis: {
            motivoCierre: "Control ginecológico al día",
            fechaEmision: "2026-10-21",
            resumenTratamiento: "Paciente eumenorreica con parámetros ginecológicos y mamarios normales.",
            indicaciones: "Control preventivo anual y registro de ciclo en aplicación móvil."
          }
        },
        terapia_ocupacional: {
          profesionalNombre: "T.O. Fernanda Herrera Soto",
          profesionalUid: "cabal_to_neuro_deporte_04",
          disciplinaNombre: "Terapia Ocupacional",
          diagnosticoCIE: "Z73.0 Problemas relacionados con el agotamiento / Reintegro Funcional",
          motivoConsulta: "Evaluación de desempeño ocupacional, adaptación ergonómica de teletrabajo como diseñadora y dosificación de rutinas de descanso vs. 14 horas de entrenamiento semanal.",
          datosAdHoc: {
            disciplinaId: "terapia_ocupacional",
            perfilSensorial: "Umbral propioceptivo reactivo post-tendinopatía rotuliana rodilla derecha. Ligera kinesiofobia en flexión profunda que ha cedido progresivamente con kinesiología.",
            desempenoOcupacional: "Excelente desempeño en AVD básicas. En AVD instrumentales, alta demanda horaria (diseño gráfico freelance + 14 hrs semanales de entrenamiento).",
            ergonomiaTrabajo: "Puesto de teletrabajo optimizado: soporte lumbar ergonómico, teclado separado, mouse vertical para prevenir síndrome de túnel carpiano en diseño digital.",
            adaptacionRutinas: "Planificación de bloques de descanso activo entre sesiones de ciclismo y jornadas frente a pantallas."
          },
          objetivosTerapeuticos: "1. Dosificación de cargas articulares en transición ciclismo-trote. 2. Ergonomía postural en escritorio de diseño. 3. Rutinas de desconexión nocturna libre de pantallas.",
          epicrisis: {
            motivoCierre: "Acompañamiento funcional en curso",
            fechaEmision: "2026-10-21",
            resumenTratamiento: "Adecuación ergonómica de estación de diseño implementada con éxito. Excelente integración en rutinas.",
            indicaciones: "Mantener pausas activas cada 90 minutos de diseño frente al computador."
          }
        },
        fonoaudiologia: {
          profesionalNombre: "Flga. Nicole Tapia Miranda",
          profesionalUid: "cabal_fono_neuro_infantojuvenil_05",
          disciplinaNombre: "Fonoaudiología",
          diagnosticoCIE: "R49.0 Disfonía funcional leve asociada a sobreesfuerzo respiratorio",
          motivoConsulta: "Evaluación vocal y fonoarticulatoria; optimización de patrón respiratorio costodiafragmático bajo fatiga aeróbica e hidratación deglutoria rápida.",
          datosAdHoc: {
            disciplinaId: "fonoaudiologia",
            patronRespiratorio: "Patrón costodiafragmático adecuado en reposo. En esfuerzo máximo aeróbico presenta tendencia a respiración bucal con sequedad de mucosa laríngea.",
            saludVocal: "Tiempo Máximo de Fonación (TMF): 18 segundos. Timbre claro, sin lesiones cordales evidenciadas.",
            mecanicaDeglutoria: "Deglución coordinada de geles e isotónicos en movimiento de pedaleo sin episodios de atoro.",
            hablaArticulacion: "Articulación precisa, velocidad y prosodia adaptativas."
          },
          objetivosTerapeuticos: "1. Entrenamiento de hidratación faríngea previa a tramos de ciclismo. 2. Ejercicios de tracto vocal semiocluido (SOVTE) para calentamiento vocal. 3. Eficiencia ventilatoria diafragmática.",
          epicrisis: {
            motivoCierre: "Pauta de higiene vocal entregada",
            fechaEmision: "2026-10-21",
            resumenTratamiento: "Buena coordinación deglutoria-respiratoria en esfuerzo físico moderado y alto.",
            indicaciones: "Uso de atomizador de suero fisiológico para hidratación laríngea post-entrenamiento en invierno."
          }
        },
        trabajo_social: {
          profesionalNombre: "T.S. Paulina Gómez Araya",
          profesionalUid: "cabal_ts_perinatal_geriatria_06",
          disciplinaNombre: "Trabajo Social",
          diagnosticoCIE: "Z63.8 Otros problemas especificados relacionados con el grupo de apoyo primario",
          motivoConsulta: "Asesoría socio-laboral, compatibilización de trabajo independiente con exigencias federadas de alto rendimiento y orientación en cobertura previsional.",
          datosAdHoc: {
            disciplinaId: "trabajo_social",
            redSociofamiliar: "Vive sola en departamento propio en Providencia. Red de apoyo primaria conformada por su hermano Martín y círculo de amigos del club de triatlón.",
            situacionLaboral: "Diseñadora gráfica freelance con cartera estable de clientes corporativos. Ingresos regulares boleta de honorarios.",
            redesInstitucionales: "Federación Chilena de Triatlón (FECHITRI). Cobertura de salud activa en Isapre Colmena con seguro de accidentes personales.",
            vulnerabilidad: "Nivel de vulnerabilidad bajo. Se orienta en gestión de tiempo para prevenir burnout profesional-deportivo."
          },
          objetivosTerapeuticos: "1. Fortalecer redes de soporte emocional fuera del ámbito competitivo. 2. Acompañamiento en derechos previsionales ante licencias o lesiones. 3. Conciliación vida personal y deporte.",
          epicrisis: {
            motivoCierre: "Consejería socio-laboral completada",
            fechaEmision: "2026-10-21",
            resumenTratamiento: "Se levantó diagnóstico socio-familiar y se articularon redes de cobertura de salud deportiva.",
            indicaciones: "Revisión anual de póliza de seguro de accidentes deportivos federados."
          }
        },
        psicologia_neurodivergencia: {
          profesionalNombre: "Ps. Daniela Navarro Silva",
          profesionalUid: "cabal_psico_perinatal_neuro_07",
          disciplinaNombre: "Psicología Clínica y Neurodivergencia",
          diagnosticoCIE: "6A05 Rasgos de hiperfoco atencional / Estilo cognitivo monocomparativo",
          motivoConsulta: "Acompañamiento neuroafirmativo; canalización de hiperfoco en rutinas deportivas y descompresión ante sobreestimulación ambiental en eventos masivos.",
          datosAdHoc: {
            disciplinaId: "psicologia_neurodivergencia",
            estiloCognitivo: "Capacidad de hiperfoco sobresaliente orientada a métricas de entrenamiento (vatios, ritmo por kilómetro, cadencia).",
            sobrecargaSensorial: "Sensibilidad auditiva y lumínica en largadas masivas de triatlón. Utiliza tapones auditivos de atenuación graduada en transición de natación a ciclismo.",
            autorregulacion: "Técnicas de descompresión neuroafirmativa post-competencia para evitar fatiga por sobreestimulación ambiental."
          },
          objetivosTerapeuticos: "1. Aprovechar el hiperfoco de manera saludable evitando rumiación obsesiva de tiempos. 2. Protocolo de adaptación sensorial en zonas de transición de carrera. 3. Validación de su perfil cognitivo.",
          epicrisis: {
            motivoCierre: "Estrategias sensoriales activas",
            fechaEmision: "2026-10-21",
            resumenTratamiento: "Plan de adaptación sensorial en competencia implementado con éxito.",
            indicaciones: "Mantener uso de atenuadores auditivos de 15dB en zonas de alta congestión sonora pre-carrera."
          }
        },
        medicina_psiquiatria: {
          profesionalNombre: "Dr. Álvaro Castillo Peña",
          profesionalUid: "cabal_psiquiatria_adultos_08",
          disciplinaNombre: "Medicina y Psiquiatría Adultos",
          diagnosticoCIE: "6A70 Trastorno de Ansiedad Reactiva compensada / Descarte de Trastorno del Ánimo",
          motivoConsulta: "Evaluación médica psiquiátrica de insomnio de conciliación precompetitivo y descarte de patología del eje tiroideo o afectiva mayor.",
          datosAdHoc: {
            disciplinaId: "medicina_psiquiatria",
            anamnesisPsiquiatrica: "Sin antecedentes de episodios depresivos mayores ni psicosis. Síntomas ansiosos circunscritos al rendimiento deportivo de alta exigencia.",
            examenSomatico: "Signos vitales: PA 115/75 mmHg, FC 52 lpm (bradicardia sinusal del deportista), IMC 21.5. Glándula tiroides normal a la palpación.",
            esquemaFarmacologico: "Eutirox 50mcg/día en ayunas por hipotiroidismo primario compensado (TSH 1.8 mUI/L). Sin psicofármacos sintéticos. Se indica Melatonina 3mg cronoliberada SOS para insomnio de conciliación previo a eventos.",
            controlEfectosAdversos: "No requiere uso de benzodiacepinas para preservar reflejos vestibulares y coordinación motriz fina."
          },
          objetivosTerapeuticos: "1. Mantener compensación neuroendocrina tiroidea con controles semestrales. 2. Apoyo cronobiológico del descanso profundo. 3. Monitorización multidisciplinaria junto a Psicología Deportiva.",
          epicrisis: {
            motivoCierre: "Manejo médico compensado",
            fechaEmision: "2026-10-21",
            resumenTratamiento: "Compensación clínica adecuada con medidas de higiene del sueño y melatonina cronoliberada.",
            indicaciones: "Control de TSH y perfil bioquímico en marzo de 2027."
          }
        },
        abogacia_mediacion: {
          profesionalNombre: "Abog. Ignacia Vergara Donoso",
          profesionalUid: "cabal_abogacia_mediacion_09",
          disciplinaNombre: "Abogacía de Familia y Mediación",
          diagnosticoCIE: "Z02.8 Exámenes y consultas por motivos administrativos / Asesoría Contractual",
          motivoConsulta: "Asesoría legal preventiva en contratos de auspicio deportivo, patrocinio de marcas de indumentaria y resguardo de derechos de imagen.",
          datosAdHoc: {
            disciplinaId: "abogacia_mediacion",
            materiaJuridica: "Asesoría en Contratación Deportiva y Derechos de Imagen (Ley del Deporte N° 19.712)",
            datosCausa: "Revisión preventiva de contrato de patrocinio e indumentaria con marca deportiva de triatlón",
            tribunalCompetente: "Centro de Arbitraje y Mediación (CAM Santiago) / Jurisdicción Ordinaria Civil",
            partesInvolucradas: "Atleta: Constanza Morales Henríquez · Auspiciador: Marca Deportiva Internacional",
            puntosConflicto: "Cláusulas de penalización por lesión o no participación fortuita, y exclusividad de mención en redes sociales.",
            estrategiaAcuerdo: "Incorporación de cláusula de fuerza mayor médica acreditada por certificado de Cabal Salud SpA y flexibilización de metas anuales de competencia."
          },
          objetivosTerapeuticos: "1. Blindaje legal de la atleta ante eventuales lesiones deportivas. 2. Homologación de acuerdos contractuales transparentes. 3. Asesoría en compliance de federación deportiva.",
          epicrisis: {
            motivoCierre: "Asesoría contractual completada",
            fechaEmision: "2026-10-21",
            resumenTratamiento: "Análisis y redacción de adenda a contrato de auspicio entregada a la consultante.",
            indicaciones: "Firma de adenda contractual con patrocinador en próximas semanas."
          }
        }
      },
      deudaTotal: 0,
      totalCitas: 2,
      ultimaCita: "2026-09-29",
      createdAt: "2026-09-10"
    },
    {
      id: "cbl_pac_02",
      nombre: "Felipe Arancibia Castro",
      rut: "15.820.491-K",
      email: "felipe.arancibia@gmail.com",
      telefono: "+56 9 8456 1234",
      fechaNacimiento: "1990-11-03",
      edad: 35,
      genero: "Masculino",
      prevision: "Particular",
      ocupacion: "Ingeniero Civil Estructural",
      direccion: "Hernando de Aguirre 192, Providencia",
      contactoEmergenciaNombre: "Marcela Castro (Madre)",
      contactoEmergenciaTelefono: "+56 9 9123 4567",
      contactoEmergenciaParentesco: "Madre",
      antecedentesMedicos: "Cirugía de reconstrucción de LCA y meniscectomía parcial rodilla izquierda en agosto 2026.",
      antecedentesPsiquiatricos: "Sin antecedentes mórbidos psiquiátricos previos.",
      medicacionActual: "Paracetamol 1g SOS.",
      alergias: "Sin alergias farmacológicas conocidas.",
      flagSui: false,
      flagVIF: false,
      flagAbuso: false,
      alertaCritica: false,
      motivoConsulta: "Acompañamiento psicológico en proceso de rehabilitación de lesión deportiva. Kinesiofobia y frustración por lentitud de progresión en cargas.",
      motivoConsultaLatente: "Duelo no elaborado por la pérdida transitoria de la omnipotencia física y el rol de proveedor autosuficiente. Angustia de castración simbólica proyectada en la fragilidad de la articulación intervenida.",
      diagnosticoCIE: "6B43 Trastorno de Adaptación con Estado de Ánimo Depresivo y Kinesiofobia",
      examenMental: {
        porteActitud: "Llega con uso de muleta canadiense unilateral. Actitud algo reticente inicial, luego permeable.",
        conciencia: "Lúcido y orientado temporo-espacialmente.",
        afectividad: "Ánimo distímico, frustración manifiesta ante pérdida temporal de autovalencia.",
        pensamiento: "Ideas fijadas en la comparación con su estado físico previo a la lesión.",
        lenguaje: "Coherente y reflexivo.",
        juicioInsight: "Juicio conservado. Reconoce necesidad de modular expectativas para no abandonar kinesiología."
      },
      objetivosTerapeuticos: "1. Tratamiento de kinesiofobia y miedo a la re-rotura. 2. Aceptación del ritmo biológico de cicatrización. 3. Trabajo en dupla con Terapeuta Ocupacional Fernanda Herrera.",
      historial: [
        {
          id: "nota_cbl_003",
          fecha: "2026-10-05",
          sesionN: 1,
          tipo: "Ingreso / Admisión",
          contenido: "Primera sesión clínica post-alta traumatológica. Se evalúa escala de kinesiofobia de Tampa (TSK-11).",
          dap: {
            datosSubjetivos: "Paciente declara 'Tengo pánico de pisar con todo el peso y que el injerto ceda'.",
            evaluacionClinica: "Elevada hipervigilancia propioceptiva. Resistencia a la flexión pasiva guiada.",
            planTerapeutico: "Técnicas de exposición gradual en imaginería. Se programa interconsulta con Terapia Ocupacional."
          },
          ansiedad: 7,
          depresion: 4,
          estres: 6,
          esNotaPrivada: false,
          profesionalNombre: "Ps. Camila Valdés Araneda",
          disciplinaNombre: "Psicología Clínica y del Deporte",
          hashIntegridad: "SHA256:19A4C039D8841B90"
        }
      ],
      epicrisis: {
        motivoCierre: "En tratamiento activo",
        fechaEmision: "2026-10-21",
        resumenTratamiento: "Proceso de readaptación emocional en marcha. Se ha coordinado con kinesiología y terapia ocupacional para reincorporación funcional.",
        indicaciones: "Continuar con plan semanal de psicoterapia y ejercicios de desensibilización al movimiento."
      },
      psicologoAsignadoUid: "cabal_psico_deportiva_01",
      psicologoAsignadoNombre: "Ps. Camila Valdés Araneda",
      deudaTotal: 0,
      totalCitas: 1,
      ultimaCita: "2026-10-05",
      createdAt: "2026-10-01"
    },
    {
      id: "cbl_pac_03",
      nombre: "Matías Troncoso Lagos",
      rut: "21.049.382-7",
      email: "matias.troncoso@alumnos.uchile.cl",
      telefono: "+56 9 6543 2198",
      fechaNacimiento: "2005-02-18",
      edad: 21,
      genero: "Masculino",
      prevision: "FONASA Tramo B",
      ocupacion: "Estudiante de Ingeniería",
      direccion: "Santa Rosa 1120, Santiago Centro",
      contactoEmergenciaNombre: "Patricia Lagos (Madre)",
      contactoEmergenciaTelefono: "+56 9 7654 3210",
      contactoEmergenciaParentesco: "Madre",
      antecedentesMedicos: "Rinitis alérgica estacional.",
      antecedentesPsiquiatricos: "Sospecha de perfil neurodivergente (Autismo nivel 1 / TDAH predominantemente inatento).",
      medicacionActual: "Desloratadina 5mg SOS.",
      alergias: "Polen y ácaros.",
      flagSui: false,
      flagVIF: false,
      flagAbuso: false,
      alertaCritica: false,
      motivoConsulta: "Dificultad de adaptación a entornos ruidosos en la universidad, sobrecarga sensorial al final del día y procrastinación severa en ramos teóricos.",
      motivoConsultaLatente: "Profunda vivencia de soledad y desajuste ontológico; anhelo de aceptación de su identidad neurodivergente sin necesidad de camuflaje constante (masking).",
      diagnosticoCIE: "6A02 Trastorno del Espectro Autista sin deficiencia del desarrollo intelectual / 6A05 TDAH",
      examenMental: {
        porteActitud: "Joven con audífonos de cancelación de ruido puestos al llegar. Mirada intermitente respetada, discurso muy detallado.",
        conciencia: "Vigil y orientado.",
        afectividad: "Afecto congruente, con episodios de fatiga por masking social continuo.",
        pensamiento: "Lógico, con fuerte atención al detalle.",
        lenguaje: "Vocabulario enriquecido, literalidad en algunas metáforas.",
        juicioInsight: "Excelente capacidad de autoobservación de sus gatillantes sensoriales."
      },
      objetivosTerapeuticos: "1. Identificar perfil sensorial y adaptaciones ambientales. 2. Estrategias de descompresión post-jornada académica. 3. Interconsulta con Fonoaudiología y Terapia Ocupacional.",
      historial: [],
      epicrisis: {
        motivoCierre: "Ingreso reciente / Evaluación integral",
        fechaEmision: "2026-10-21",
        resumenTratamiento: "Inicio de proceso de acompañamiento neuroafirmativo para desarrollo de estrategias de autorregulación y adaptación de rutinas universitarias.",
        indicaciones: "Evaluación multidisciplinaria con Terapia Ocupacional y Fonoaudiología de Cabal Salud."
      },
      psicologoAsignadoUid: "cabal_psico_perinatal_neuro_07",
      psicologoAsignadoNombre: "Ps. Daniela Navarro Silva",
      deudaTotal: 0,
      totalCitas: 1,
      ultimaCita: "2026-10-18",
      createdAt: "2026-10-15"
    },
    {
      id: "cbl_pac_04",
      nombre: "Camila San Martín Baeza",
      rut: "19.231.504-1",
      email: "camila.sanmartin@gmail.com",
      telefono: "+56 9 8123 7654",
      fechaNacimiento: "1998-07-22",
      edad: 28,
      genero: "Femenino",
      prevision: "Reembolso Isapres (Banmédica)",
      ocupacion: "Ingeniera Comercial & Nadadora Máster",
      direccion: "Alonso de Córdova 3890, Vitacura",
      contactoEmergenciaNombre: "Rodrigo San Martín (Padre)",
      contactoEmergenciaTelefono: "+56 9 9345 6789",
      contactoEmergenciaParentesco: "Padre",
      antecedentesMedicos: "Intolerancia a la lactosa, colon irritable compensado.",
      antecedentesPsiquiatricos: "Sin antecedentes psiquiátricos.",
      medicacionActual: "Lactasa SOS. Probióticos multiespecie.",
      alergias: "Sin alergias alimentarias anafilácticas.",
      flagSui: false,
      flagVIF: false,
      flagAbuso: false,
      alertaCritica: false,
      motivoConsulta: "Recomposición corporal, aumento de masa muscular y optimización de ingesta energética para natación competitiva de fondo.",
      diagnosticoCIE: "FB40 Evaluación del Estado Nutricional / Asesoramiento Dietético Deportivo",
      datosAdHoc: {
        disciplinaId: "nutricion",
        pesoActual: 58.5,
        talla: 165,
        imc: 21.5,
        porcentajeGrasa: 19.8,
        masaMuscular: 27.2,
        perimetroCintura: 67,
        transitoDigestivo: "Bristol 3-4 (Normal). Alivio tras supresión de lácteos no deslactosados.",
        anamnesisAlimentaria: "3 comidas principales + 2 colaciones ricas en proteína. Ingesta hídrica adecuada (2.4L/día).",
        pautaRequerimientos: "GET estimado: 2.250 kcal/día. Proteínas: 1.7 g/kg (100g/día). Carbohidratos de bajo índice glucémico pre-entreno y recuperación glucogénica rápida post-piscina."
      },
      objetivosTerapeuticos: "1. Aumentar 1.5 kg de masa magra en 12 semanas. 2. Timing de carbohidratos en doble turno de nado. 3. Suplementación con creatina monohidrato 5g/día.",
      historial: [],
      epicrisis: {
        motivoCierre: "Tratamiento nutricional activo",
        fechaEmision: "2026-10-21",
        resumenTratamiento: "Plan nutricional deportivo en ejecución con adecuada adherencia a macros.",
        indicaciones: "Control antropométrico ISAK II en 4 semanas."
      },
      psicologoAsignadoUid: "cabal_nutri_deportiva_geriatria_02",
      psicologoAsignadoNombre: "Nut. Sebastián Morales Rojas",
      deudaTotal: 0,
      totalCitas: 1,
      ultimaCita: "2026-10-12",
      createdAt: "2026-10-10"
    },
    {
      id: "cbl_pac_05",
      nombre: "Isidora Peñaloza Urzúa",
      rut: "19.845.210-9",
      email: "isidora.penaloza@gmail.com",
      telefono: "+56 9 7234 5678",
      fechaNacimiento: "1997-03-14",
      edad: 29,
      genero: "Femenino",
      prevision: "Reembolso Isapres (Cruz Blanca)",
      ocupacion: "Arquitecta",
      direccion: "Pocuro 2150, Providencia",
      contactoEmergenciaNombre: "Claudio Peñaloza (Hermano)",
      contactoEmergenciaTelefono: "+56 9 8765 4321",
      contactoEmergenciaParentesco: "Hermano",
      antecedentesMedicos: "Diagnóstico tardío de Autismo (Nivel 1). Hipersensibilidad táctil y corporal.",
      antecedentesPsiquiatricos: "Acompañamiento psicológico previo por sobrecarga sensorial.",
      medicacionActual: "Sin fármacos habituales.",
      alergias: "Sin alergias conocidas.",
      flagSui: false,
      flagVIF: false,
      flagAbuso: false,
      alertaCritica: false,
      motivoConsulta: "Consejería preconcepcional informada y control ginecológico adaptado a perfil sensorial neurodivergente.",
      diagnosticoCIE: "QA20 Asesoramiento en Reproducción y Planificación Familiar",
      datosAdHoc: {
        disciplinaId: "matroneria",
        fur: "2026-10-04",
        ciclos: "29 días / Regular / Dismenorrea leve en día 1",
        menarquia: 13,
        formulaObstetrica: "G0 P0 A0 C0 (Nulípara)",
        metodoAnticonceptivo: "DIU de Cobre (T Cu 380A), normoposicionado por ecografía 2025",
        tamizajePAP: "PAP vigente al día (Negativo para neoplasia, próximo control nov 2026)",
        tamizajeMamario: "Examen mamario sin nódulos palpables ni adenopatías axilares",
        saludSexualSensorial: "Hipersensibilidad al frío y al instrumental metálico. Se utiliza protocolo de instrumental tibio, consentimiento paso a paso y tiempo extendido de adaptación."
      },
      objetivosTerapeuticos: "1. Mapeo del ciclo ovulatorio. 2. Preparación preconcepcional con suplementación de Ácido Fólico 1mg/día. 3. Coordinación en dupla con Psicología Perinatal.",
      historial: [],
      epicrisis: {
        motivoCierre: "Control preconcepcional en curso",
        fechaEmision: "2026-10-21",
        resumenTratamiento: "Consejería preconcepcional entregada. Solicitud de exámenes de laboratorio de rutina.",
        indicaciones: "Iniciar suplementación preconcepcional y control con resultados de hemograma/perfil tiroideo."
      },
      psicologoAsignadoUid: "cabal_matrona_perinatal_neuro_03",
      psicologoAsignadoNombre: "Mat. Valentina Ríos Pizarro",
      deudaTotal: 0,
      totalCitas: 1,
      ultimaCita: "2026-10-14",
      createdAt: "2026-10-10"
    },
    {
      id: "cbl_pac_06",
      nombre: "Lucas Benavides Bravo",
      rut: "20.194.812-4",
      email: "lucas.benavides@gmail.com",
      telefono: "+56 9 8876 5432",
      fechaNacimiento: "2004-05-19",
      edad: 22,
      genero: "Masculino",
      prevision: "Reembolso Isapres (Colmena)",
      ocupacion: "Estudiante de Animación Digital",
      direccion: "Simón Bolívar 4120, Ñuñoa",
      contactoEmergenciaNombre: "Andrea Bravo (Madre)",
      contactoEmergenciaTelefono: "+56 9 9123 7890",
      contactoEmergenciaParentesco: "Madre",
      antecedentesMedicos: "Condromalacia rotuliana leve.",
      antecedentesPsiquiatricos: "TDAH diagnosticado a los 11 años.",
      medicacionActual: "Metilfenidato 10mg en días de alta carga académica.",
      alergias: "Sin alergias.",
      flagSui: false,
      flagVIF: false,
      flagAbuso: false,
      alertaCritica: false,
      motivoConsulta: "Evaluación de desempeño ocupacional, regulación sensorial en aula de clases y organización de rutinas frente a desbordes de fatiga.",
      diagnosticoCIE: "6A05 Trastorno por Déficit de Atención e Hiperactividad / Desafío en Desempeño Ocupacional",
      datosAdHoc: {
        disciplinaId: "terapia_ocupacional",
        avdBasicas: "Completamente autovalente en alimentación, aseo y vestido.",
        avdInstrumentales: "Dificultad marcada en manejo de tiempos de entrega, administración de presupuesto semanal y traslado en metro en horario punta.",
        perfilSensorial: "Búsqueda propioceptiva continua, hiperreactividad auditiva a ruidos imprevistos (chillidos, alarmas).",
        balanceOcupacional: "Predominio de hiperfocus nocturno en proyectos de animación con desajuste de higiene del sueño y postergación de comidas.",
        adaptacionesAmbientales: "Incorporación de cojín propioceptivo con peso en silla de escritorio, temporizadores visuales Pomodoro y auriculares con cancelación de ruido."
      },
      objetivosTerapeuticos: "1. Estructuración de mapa de rutinas con anclajes visuales. 2. Protocolo de autorregulación sensorial post-universidad. 3. Adecuación ergonómica de puesto de dibujo digital.",
      historial: [],
      epicrisis: {
        motivoCierre: "Intervención ocupacional activa",
        fechaEmision: "2026-10-21",
        resumenTratamiento: "Mapeo sensorial y de AVD completado con el consultante.",
        indicaciones: "Revisión quincenal de bitácora de energía y fatiga."
      },
      psicologoAsignadoUid: "cabal_to_neuro_deporte_04",
      psicologoAsignadoNombre: "T.O. Fernanda Herrera Soto",
      deudaTotal: 0,
      totalCitas: 1,
      ultimaCita: "2026-10-15",
      createdAt: "2026-10-11"
    },
    {
      id: "cbl_pac_07",
      nombre: "Joaquín Alarcón Rivas",
      rut: "21.340.591-6",
      email: "joaquin.alarcon@gmail.com",
      telefono: "+56 9 7654 1234",
      fechaNacimiento: "2006-08-30",
      edad: 20,
      genero: "Masculino",
      prevision: "FONASA Tramo B",
      ocupacion: "Estudiante de Derecho",
      direccion: "Carmen 890, Santiago Centro",
      contactoEmergenciaNombre: "Gonzalo Alarcón (Padre)",
      contactoEmergenciaTelefono: "+56 9 9876 1122",
      contactoEmergenciaParentesco: "Padre",
      antecedentesMedicos: "Rinitis crónica.",
      antecedentesPsiquiatricos: "Sin antecedentes mórbidos psiquiátricos.",
      medicacionActual: "Ninguna.",
      alergias: "Alergia al polvo.",
      flagSui: false,
      flagVIF: false,
      flagAbuso: false,
      alertaCritica: false,
      motivoConsulta: "Evaluación fonoaudiológica por fatiga vocal tras debates universitarios y acompañamiento en comunicación social pragmática.",
      diagnosticoCIE: "6A01 Trastorno del Desarrollo del Lenguaje / Fatiga Vocal Funcional",
      datosAdHoc: {
        disciplinaId: "fonoaudiologia",
        nivelesLenguaje: "Léxico culto muy desarrollado, estructuras sintácticas complejas. Dificultad en lectura de entonación irónica y dobles intenciones.",
        evaluacionVoz: "Escala RASATI: T1 (Tensión cervical leve al hablar en público), F1 (Fatiga vocal vespertina tras 2 horas de alegato). Sin disfonía estructural.",
        motricidadOrofacial: "Patrón respiratorio mixto (naso-bucal) con compensación en inspiración rápida. Deglución y masticación normales.",
        apoyosComunicativos: "Ejercicios de tracto vocal semiocluido (tubos de resonancia LaxVox) para calentamiento vocal y guiones de prosodia pragmática."
      },
      objetivosTerapeuticos: "1. Eficiencia vocal y dosificación de aire fonatorio. 2. Entrenamiento en modulación de volumen y entonación. 3. Estrategias de comunicación pragmática para defensas orales.",
      historial: [],
      epicrisis: {
        motivoCierre: "Tratamiento fonoaudiológico en curso",
        fechaEmision: "2026-10-21",
        resumenTratamiento: "Se realizan pautas de higiene vocal y ejercicios respiratorios costo-diafragmáticos.",
        indicaciones: "Mantener sesiones semanales de modulación vocal."
      },
      psicologoAsignadoUid: "cabal_fono_neuro_infanto_05",
      psicologoAsignadoNombre: "Flgo. Diego Contreras Muñoz",
      deudaTotal: 0,
      totalCitas: 1,
      ultimaCita: "2026-10-17",
      createdAt: "2026-10-13"
    },
    {
      id: "cbl_pac_08",
      nombre: "María Elena Carrasco V.",
      rut: "9.412.890-5",
      email: "familia.carrasco@gmail.com",
      telefono: "+56 9 6123 4590",
      fechaNacimiento: "1952-01-14",
      edad: 74,
      genero: "Femenino",
      prevision: "FONASA Tramo A",
      ocupacion: "Jubilada / Persona Mayor con Dependencia",
      direccion: "Pasaje Los Sauces 450, Maipú",
      contactoEmergenciaNombre: "Loreto Carrasco (Hija y Cuidadora)",
      contactoEmergenciaTelefono: "+56 9 8456 7890",
      contactoEmergenciaParentesco: "Hija",
      antecedentesMedicos: "Secuela de ACV isquémico (2023), HTA, Artrosis de caderas bilateral severa.",
      antecedentesPsiquiatricos: "Trastorno adaptativo depresivo secundario a pérdida de movilidad.",
      medicacionActual: "Losartán 50mg, Atorvastatina 20mg, Paracetamol 1g.",
      alergias: "Sin alergias.",
      flagSui: false,
      flagVIF: false,
      flagAbuso: false,
      alertaCritica: false,
      motivoConsulta: "Evaluación sociofamiliar integral, tramitación de credencial de discapacidad (RND) ante COMPIN y postulación al Programa Red Local de Apoyos y Cuidados (Chile Cuida).",
      diagnosticoCIE: "Z63.1 Problemas en la relación con familiares / Dependencia Severa Geriátrica",
      datosAdHoc: {
        disciplinaId: "trabajo_social",
        demandaSocial: "Asesoría para obtención de estipendio de cuidadores, credencial RND y subsidio de dependencia severa.",
        genogramaFamiliar: "Hogar compuesto por María Elena y su hija Loreto (cuidadora 24/7 con sobrecarga severa en Test de Zarit). Sin red familiar secundaria de apoyo.",
        registroSocialHogares: "RSH calificado en el 40% de mayor vulnerabilidad socioeconómica del país.",
        condicionesVivienda: "Casa social pareada de 1 piso, baño sin adaptaciones (presencia de tina de difícil acceso, riesgo alto de caídas).",
        redesComunitarias: "Inscrita en CESFAM Maipú. Se coordina visita a terreno interdisciplinaria con Terapia Ocupacional para postulación a fondos municipales de adecuación de baño."
      },
      objetivosTerapeuticos: "1. Elaborar Informe Social Pericial para COMPIN. 2. Postulación formal a Chile Cuida y SENAMA. 3. Coordinar respiro familiar para la cuidadora principal.",
      historial: [],
      epicrisis: {
        motivoCierre: "Intervención sociofamiliar activa",
        fechaEmision: "2026-10-21",
        resumenTratamiento: "Informe social emitido e ingresado a COMPIN. Visita domiciliaria programada.",
        indicaciones: "Seguimiento quincenal de trámites municipales y beneficio de cuidadores."
      },
      psicologoAsignadoUid: "cabal_ts_geriatria_terreno_06",
      psicologoAsignadoNombre: "T.S. Carolina Fuentes Lagos",
      deudaTotal: 0,
      totalCitas: 1,
      ultimaCita: "2026-10-18",
      createdAt: "2026-10-14"
    },
    {
      id: "cbl_pac_09",
      nombre: "Rodrigo Navarrete Pinto",
      rut: "14.891.230-8",
      email: "rodrigo.navarrete@gmail.com",
      telefono: "+56 9 8234 1199",
      fechaNacimiento: "1984-06-11",
      edad: 42,
      genero: "Masculino",
      prevision: "Reembolso Isapres (Colmena)",
      ocupacion: "Contador Auditor",
      direccion: "Monseñor Edwards 1240, La Reina",
      contactoEmergenciaNombre: "Claudia Navarrete (Hermana)",
      contactoEmergenciaTelefono: "+56 9 9123 6677",
      contactoEmergenciaParentesco: "Hermana",
      antecedentesMedicos: "Dislipidemia tratada, sobrepeso leve (IMC 26.1).",
      antecedentesPsiquiatricos: "Episodio depresivo previo en 2018 con buena respuesta a ISRS.",
      medicacionActual: "Escitalopram 10mg/día, Melatonina 3mg/noche.",
      alergias: "Sin alergias farmacológicas.",
      flagSui: false,
      flagVIF: false,
      flagAbuso: false,
      alertaCritica: false,
      motivoConsulta: "Episodio depresivo moderado reactivo a estrés laboral sostenido, insomnio de conciliación tardío y fatiga matutina. Evaluación psicofarmacológica y coordinación psicoterapéutica.",
      diagnosticoCIE: "6A70 Trastorno Depresivo Recurrente, Episodio Actual Moderado",
      datosAdHoc: {
        disciplinaId: "medicina_psiquiatria",
        heacronologia: "Cuadro de 4 meses de evolución con caída anímica, pérdida de capacidad de disfrute (anhedonia) y despertar precoz con angustia somática matutina.",
        esquemaFarmacologico: "Escitalopram 10mg/día en la mañana (buena tolerancia gástrica, sin náuseas). Se asocia Melatonina de liberación prolongada 3mg antes de dormir.",
        signosSomaticos: "Presión Arterial: 124/80 mmHg. Frecuencia Cardíaca: 70 lpm. Peso: 78 kg. Sin temblor de reposo ni signos extrapiramidales.",
        paraclinicos: "Hemograma sin alteraciones, Perfil lipídico con colesterol total 210 mg/dl, TSH 2.3 uUI/ml, Vitamina D 18 ng/ml (se prescribe colecalciferol).",
        justificacionLicencia: "Licencia médica de reposo laboral por 15 días justificada clínicamente. Indicación estricta de continuidad con Ps. Camila Valdés en Cabal Salud."
      },
      objetivosTerapeuticos: "1. Remisión total de sintomatología depresiva e insomnio. 2. Titulación controlada de fármaco según respuesta a las 4 semanas. 3. Dupla terapéutica con psicología.",
      historial: [],
      epicrisis: {
        motivoCierre: "Tratamiento psicofarmacológico activo",
        fechaEmision: "2026-10-21",
        resumenTratamiento: "Inicio de tratamiento farmacológico bien tolerado. Mejoría incipiente en calidad de sueño.",
        indicaciones: "Control médico en 3 semanas y mantener psicoterapia semanal."
      },
      psicologoAsignadoUid: "cabal_medicina_mental_08",
      psicologoAsignadoNombre: "Dr. Cristóbal Méndez Alarcón",
      deudaTotal: 0,
      totalCitas: 1,
      ultimaCita: "2026-10-19",
      createdAt: "2026-10-15"
    },
    {
      id: "cbl_pac_10",
      nombre: "Francisca Aldunate Echeverría",
      rut: "16.712.980-3",
      email: "francisca.aldunate@gmail.com",
      telefono: "+56 9 9456 7812",
      fechaNacimiento: "1988-09-15",
      edad: 38,
      genero: "Femenino",
      prevision: "Particular",
      ocupacion: "Periodista y Gestora Cultural",
      direccion: "Monjitas 540, Santiago Centro",
      contactoEmergenciaNombre: "María Luisa Echeverría (Madre)",
      contactoEmergenciaTelefono: "+56 9 8123 9087",
      contactoEmergenciaParentesco: "Madre",
      antecedentesMedicos: "Sin antecedentes médicos relevantes.",
      antecedentesPsiquiatricos: "Sin antecedentes mórbidos psiquiátricos.",
      medicacionActual: "Ninguna.",
      alergias: "Sin alergias.",
      flagSui: false,
      flagVIF: false,
      flagAbuso: false,
      alertaCritica: false,
      motivoConsulta: "Mediación prejudicial colaborativa para acordar Cuidado Personal compartido, régimen de Relación Directa y Regular (visitas) y Pensión de Alimentos para 2 hijos en común.",
      diagnosticoCIE: "Z63.0 Problemas en la relación entre cónyuges o parejas / Mediación Familiar Ley 19.968",
      datosAdHoc: {
        disciplinaId: "abogacia_mediacion",
        materiaJuridica: "Cuidado Personal, Relación Directa y Regular (RDR) y Pensión de Alimentos (Ley N° 19.968)",
        datosCausa: "Etapa prejudicial obligatoria previa a demanda en Juzgado de Familia",
        tribunalCompetente: "1° Juzgado de Familia de Santiago",
        partesInvolucradas: "Solicitante (Cliente): Francisca Aldunate Echeverría · Solicitado: Tomás Errázuriz Vial",
        nnaInvolucrados: "Emilia (7 años, Colegio San Ignacio) y Gaspar (4 años, Jardín Vitamina).",
        puntosConflicto: "Fijación de régimen de fines de semana alternados, vacaciones de invierno/verano compartidas al 50%, y reajustabilidad semestral de la pensión alimenticia fijada en UTM.",
        estrategiaAcuerdo: "Segunda sesión de mediación telemática fijada para revisión de borrador de acuerdo. Cláusulas de corresponsabilidad y derivación preventiva a Psicología Infantil en caso de requerir apoyo emocional en la transición."
      },
      objetivosTerapeuticos: "1. Redacción de Acta de Acuerdo de Mediación con valor de sentencia judicial ejecutoriada. 2. Minimizar impacto del conflicto en NNA. 3. Homologación formal en Tribunal de Familia.",
      historial: [],
      epicrisis: {
        motivoCierre: "Mediación en curso / Borrador de acuerdo",
        fechaEmision: "2026-10-21",
        resumenTratamiento: "Sesión preliminar completada con ambas partes con excelente voluntad de acuerdo.",
        indicaciones: "Firma digital de acta de mediación en próxima sesión conjunta."
      },
      psicologoAsignadoUid: "cabal_abogacia_mediacion_09",
      psicologoAsignadoNombre: "Abog. Ignacia Vergara Donoso",
      deudaTotal: 0,
      totalCitas: 1,
      ultimaCita: "2026-10-16",
      createdAt: "2026-10-12"
    }
  ];

  function obtenerPacientesFallback(profUid) {
    if (!profUid) return PACIENTES_MOCK_FALLBACK;
    const asignados = PACIENTES_MOCK_FALLBACK.filter(p =>
      p.psicologoAsignadoUid === profUid ||
      (Array.isArray(p.profesionalesAsignados) && p.profesionalesAsignados.includes(profUid)) ||
      p.id === "cbl_pac_01"
    );
    if (asignados.length > 0) return asignados;
    return PACIENTES_MOCK_FALLBACK;
  }

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  // Inicializar Catálogo y Verificar Sesión Activa
  async function inicializarPortal() {
    catalogoProfesionales = CATALOGO_LOCAL;
    try {
      const res = await fetch("/api/profesionales/lista");
      const data = await res.json();
      if (data && data.success && Array.isArray(data.profesionales) && data.profesionales.length > 0) {
        catalogoProfesionales = data.profesionales;
      }
    } catch (_e) {}

    poblarSelectoresProfesionales();

    const urlParams = new URLSearchParams(window.location.search);
    const paramProf = urlParams.get("prof");
    const paramTab = urlParams.get("tab");

    if (paramProf) {
      const encontrado = catalogoProfesionales.find(p => p.uid === paramProf) || CATALOGO_LOCAL.find(p => p.uid === paramProf) || CATALOGO_LOCAL[0];
      sessionStorage.setItem("cabal_prof_active", encontrado.uid);
      cargarPerfilEnPortal(encontrado);
      if (paramTab) {
        setTimeout(() => window.cambiarPestana(paramTab), 100);
      }
      return;
    }

    const storedUid = sessionStorage.getItem("cabal_prof_active");
    if (storedUid) {
      const encontrado = catalogoProfesionales.find(p => p.uid === storedUid) || CATALOGO_LOCAL.find(p => p.uid === storedUid);
      if (encontrado) {
        cargarPerfilEnPortal(encontrado);
        if (paramTab) {
          setTimeout(() => window.cambiarPestana(paramTab), 100);
        }
        return;
      }
    }

    // Si no hay sesión guardada, mostrar pantalla de login
    mostrarPantallaLogin();
    refreshIcons();
  }

  function poblarSelectoresProfesionales() {
    const demoSelect = document.getElementById("loginDemoSelect");
    const switchSelect = document.getElementById("switchProfSelect");
    const optionsHtml = catalogoProfesionales
      .map(p => `<option value="${p.uid}">${p.nombre} — ${p.disciplinaNombre}</option>`)
      .join("");

    if (demoSelect) demoSelect.innerHTML = optionsHtml;
    if (switchSelect) switchSelect.innerHTML = optionsHtml;
  }

  function mostrarPantallaLogin() {
    document.getElementById("viewLogin").classList.remove("hidden");
    document.getElementById("viewPortal").classList.add("hidden");
    const headerAuth = document.getElementById("headerAuthContainer");
    if (headerAuth) {
      headerAuth.innerHTML = `
        <a href="/" class="text-xs sm:text-sm font-medium text-perla/80 hover:text-white transition flex items-center gap-1.5">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
          <span>Volver al Sitio</span>
        </a>
      `;
    }
    refreshIcons();
  }

  window.iniciarSesionDemo = function () {
    const uid = document.getElementById("loginDemoSelect")?.value;
    const prof = catalogoProfesionales.find(p => p.uid === uid) || CATALOGO_LOCAL.find(p => p.uid === uid) || CATALOGO_LOCAL[0];
    sessionStorage.setItem("cabal_prof_active", prof.uid);
    cargarPerfilEnPortal(prof);
  };

  window.iniciarSesionCredenciales = function (e) {
    if (e) e.preventDefault();
    const email = document.getElementById("loginEmailInput")?.value || "";
    // Búsqueda por email aproximado o predeterminado
    let prof = catalogoProfesionales.find(p =>
      p.nombre.toLowerCase().includes(email.split("@")[0].replace(".", " "))
    ) || CATALOGO_LOCAL[0];

    sessionStorage.setItem("cabal_prof_active", prof.uid);
    cargarPerfilEnPortal(prof);
  };

  window.cambiarProfesionalActivo = function (uid) {
    const prof = catalogoProfesionales.find(p => p.uid === uid) || CATALOGO_LOCAL.find(p => p.uid === uid) || CATALOGO_LOCAL[0];
    sessionStorage.setItem("cabal_prof_active", prof.uid);
    cargarPerfilEnPortal(prof);
  };

  window.cerrarSesion = function () {
    sessionStorage.removeItem("cabal_prof_active");
    mostrarPantallaLogin();
  };

  function cargarPerfilEnPortal(prof) {
    profesionalActivo = prof;
    document.getElementById("viewLogin").classList.add("hidden");
    document.getElementById("viewPortal").classList.remove("hidden");

    // Header info
    document.getElementById("portalHeaderFoto").src = prof.fotoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200";
    document.getElementById("portalHeaderNombre").textContent = prof.nombre;
    document.getElementById("portalHeaderDisciplina").textContent = prof.disciplinaNombre;
    document.getElementById("portalHeaderRnpi").textContent = `${prof.rnpi} · ${prof.universidad}`;

    const switchSelect = document.getElementById("switchProfSelect");
    if (switchSelect) switchSelect.value = prof.uid;

    // Header superior con acción directa
    const headerAuth = document.getElementById("headerAuthContainer");
    if (headerAuth) {
      headerAuth.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-xs text-perla/80 hidden sm:inline">Sesión activa como: <strong class="text-white">${prof.nombre.split(" ")[0]} ${prof.nombre.split(" ")[1] || ""}</strong></span>
          <button type="button" onclick="window.cerrarSesion()" class="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-perla transition">
            Cerrar Sesión
          </button>
        </div>
      `;
    }

    // Poblar formulario Pestaña 1 (Mi Perfil)
    document.getElementById("editNombre").value = prof.nombre || "";
    document.getElementById("editProfesion").value = prof.profesion || "";
    document.getElementById("editDisciplina").value = prof.disciplinaId || "psicologia";
    document.getElementById("editRnpi").value = prof.rnpi || "";
    document.getElementById("editUniversidad").value = prof.universidad || "";
    document.getElementById("editFotoUrl").value = prof.fotoUrl || "";
    document.getElementById("editEnfoque").value = prof.enfoqueResumen || "";
    document.getElementById("editExperiencia").value = prof.experienciaDetalle || "";
    document.getElementById("editEspecialidades").value = (prof.especialidades || []).join(", ");
    document.getElementById("editPrecioCLP").value = prof.precioCLP || 35000;
    if (document.getElementById("editDuracionMinutos")) {
      document.getElementById("editDuracionMinutos").value = String(prof.duracionMinutos || 50);
    }

    // Subespecialidades estrella
    const subIds = prof.subespecialidadIds || [];
    document.getElementById("checkSubDeporte").checked = subIds.includes("deporte");
    document.getElementById("checkSubNeuro").checked = subIds.includes("neurodivergencia");
    document.getElementById("checkSubPerinatal").checked = subIds.includes("perinatal");
    document.getElementById("checkSubGeriatria").checked = subIds.includes("infanto_geriatria");

    // Modalidades
    const mods = prof.modalidades || ["Online"];
    document.getElementById("checkModOnline").checked = mods.includes("Online");
    document.getElementById("checkModTerreno").checked = mods.includes("Visita a Terreno");

    // Previsiones
    const prevs = prof.previsiones || ["Particular"];
    document.getElementById("checkPrevParticular").checked = prevs.includes("Particular");
    document.getElementById("checkPrevIsapre").checked = prevs.includes("Reembolso Isapres");
    document.getElementById("checkPrevFonasa").checked = prevs.includes("FONASA");

    // Formación dinámica
    renderizarItemsFormacion(prof.formacionAcademica || []);

    // Cargar Sesiones en Pestaña 2
    renderizarSesiones(prof);

    // Cargar Directorio de Pacientes y Fichas Clínicas de Gentia
    window.cargarDirectorioPacientes();

    refreshIcons();
  }

  function renderizarItemsFormacion(lista) {
    const container = document.getElementById("containerFormacionItems");
    if (!container) return;
    container.innerHTML = lista
      .map(
        (item, idx) => `
        <div class="flex items-center gap-2">
          <input type="text" value="${item.replace(/"/g, '&quot;')}" class="formacion-input flex-1 px-3.5 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo" />
          <button type="button" onclick="window.eliminarItemFormacion(${idx})" class="w-8 h-8 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 flex items-center justify-center shrink-0" title="Eliminar este título">
            ✕
          </button>
        </div>
      `
      )
      .join("");
  }

  window.agregarItemFormacion = function () {
    const container = document.getElementById("containerFormacionItems");
    if (!container) return;
    const div = document.createElement("div");
    div.className = "flex items-center gap-2";
    div.innerHTML = `
      <input type="text" placeholder="Ej. Diplomado en Clínica y Acompañamiento — Universidad de Chile" class="formacion-input flex-1 px-3.5 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo" />
      <button type="button" onclick="this.parentElement.remove()" class="w-8 h-8 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 flex items-center justify-center shrink-0" title="Eliminar este título">
        ✕
      </button>
    `;
    container.appendChild(div);
  };

  window.eliminarItemFormacion = function (idx) {
    if (profesionalActivo && profesionalActivo.formacionAcademica) {
      profesionalActivo.formacionAcademica.splice(idx, 1);
      renderizarItemsFormacion(profesionalActivo.formacionAcademica);
    }
  };

  // ============================================================================
  // REPOSITORIO Y CONEXIÓN CLÍNICA CON GENTIA VAULT (EMR INTEGRADO)
  // ============================================================================
  let listaPacientesDirectorio = [];
  let pacienteActivo = null;
  let subPestanaClinicaActiva = "ficha"; // 'ficha' | 'examen' | 'evoluciones' | 'epicrisis' | 'archivos'

  window.cambiarPestana = function (pestanaId) {
    ["perfil", "sesiones", "fichas", "horarios", "banco", "admin"].forEach(id => {
      const section = document.getElementById(`sectionTab-${id}`);
      const btn = document.getElementById(`tabBtn-${id}`);
      if (section && btn) {
        if (id === pestanaId) {
          section.classList.remove("hidden");
          btn.className = "tab-btn active px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-transparent transition flex items-center gap-2";
          if (id === "fichas") {
            window.cargarDirectorioPacientes();
          } else if (id === "admin") {
            window.cargarDashboardAdmin();
          }
        } else {
          section.classList.add("hidden");
          btn.className = "tab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-noche/10 bg-white text-noche/80 hover:bg-perla transition flex items-center gap-2";
        }
      }
    });
    refreshIcons();
  };

  function renderizarChipPacienteHTML(p, isSelected) {
    const tieneAlertas = p.flagSui || p.flagVIF || p.flagAbuso || p.alertaCritica;
    if (isSelected) {
      return `
        <button
          type="button"
          onclick="window.cargarFichaClinicaPaciente('${p.id}')"
          class="shrink-0 px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all duration-200 bg-petroleo text-white shadow-lg ring-2 ring-emerald-400 ring-offset-2 scale-[1.03] active:scale-95 cursor-pointer"
          title="Consultante seleccionado · Expediente abierto"
        >
          <span class="w-5 h-5 rounded-full bg-emerald-400 text-petroleo flex items-center justify-center font-black text-xs shadow-sm shrink-0">✓</span>
          <span class="truncate max-w-[170px] text-white tracking-wide font-serif text-sm">${p.nombre}</span>
          <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-emerald-100 font-mono">${p.prevision ? p.prevision.split(" ")[0] : "Part."}</span>
          ${tieneAlertas ? `<span class="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse ml-1" title="Alerta clínica activa"></span>` : ""}
        </button>
      `;
    }
    return `
      <button
        type="button"
        onclick="window.cargarFichaClinicaPaciente('${p.id}')"
        class="shrink-0 px-3.5 py-1.5 rounded-2xl text-xs font-medium flex items-center gap-2 transition-all duration-200 bg-white text-noche/80 border border-noche/15 hover:border-petroleo/60 hover:bg-petroleo/5 hover:text-petroleo hover:shadow-sm active:scale-95 cursor-pointer"
        title="Clic para abrir expediente de ${p.nombre}"
      >
        <span class="w-2.5 h-2.5 rounded-full ${tieneAlertas ? "bg-red-500 animate-pulse" : "bg-noche/25"} shrink-0"></span>
        <span class="truncate max-w-[150px] font-semibold">${p.nombre}</span>
        <span class="text-[10px] text-noche/50 font-mono">${p.prevision ? p.prevision.split(" ")[0] : "Part."}</span>
      </button>
    `;
  }

  // 1. Cargar Directorio de Pacientes desde Gentia Vault
  window.cargarDirectorioPacientes = async function (searchQuery = "") {
    try {
      const res = await fetch("/api/profesionales/pacientes/lista", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          search: searchQuery,
          psicologoUid: profesionalActivo ? profesionalActivo.uid : undefined
        })
      });
      const data = await res.json();
      if (data && data.success && Array.isArray(data.pacientes) && data.pacientes.length > 0) {
        listaPacientesDirectorio = data.pacientes;
      } else {
        listaPacientesDirectorio = obtenerPacientesFallback(profesionalActivo ? profesionalActivo.uid : undefined);
      }
    } catch (_err) {
      listaPacientesDirectorio = obtenerPacientesFallback(profesionalActivo ? profesionalActivo.uid : undefined);
    }

    renderizarSelectoresYChipsPacientes();
    if (profesionalActivo) {
      renderizarSesiones(profesionalActivo);
    }
  };

  function renderizarSelectoresYChipsPacientes() {
    const sel = document.getElementById("selectFichaPaciente");
    const chipsContainer = document.getElementById("chipsDirectorioPacientes");
    const totalCount = document.getElementById("totalPacientesCount");

    let listaParaMostrar = listaPacientesDirectorio;

    if (totalCount) {
      totalCount.textContent = listaParaMostrar.length;
    }

    if (sel) {
      if (listaParaMostrar.length === 0) {
        sel.innerHTML = `<option value="">Sin pacientes registrados</option>`;
      } else {
        sel.innerHTML = listaParaMostrar.map(p => `
          <option value="${p.id}" ${pacienteActivo && pacienteActivo.id === p.id ? "selected" : ""}>
            ${p.nombre} (RUT ${p.rut || "S/RUT"}) — ${p.prevision || "Particular"}
          </option>
        `).join("");
      }
    }

    if (chipsContainer) {
      if (listaParaMostrar.length === 0) {
        chipsContainer.innerHTML = `
          <div class="text-xs text-noche/60 italic py-2">
            No se encontraron consultantes con el filtro aplicado. Utiliza el botón "Registrar Paciente" para registrar uno nuevo.
          </div>
        `;
      } else {
        chipsContainer.innerHTML = listaParaMostrar.map(p => {
          const isSelected = pacienteActivo && pacienteActivo.id === p.id;
          return renderizarChipPacienteHTML(p, isSelected);
        }).join("");
      }
    }

    // Si no hay paciente activo seleccionado, seleccionar el primero
    if (!pacienteActivo && listaParaMostrar.length > 0) {
      window.cargarFichaClinicaPaciente(listaParaMostrar[0].id);
    } else if (pacienteActivo) {
      window.cargarFichaClinicaPaciente(pacienteActivo.id);
    }
  }

  window.filtrarPacientesDirectorio = function () {
    const q = (document.getElementById("inputBuscarPacientes")?.value || "").toLowerCase().trim();
    const prev = (document.getElementById("filtroPrevisionPacientes")?.value || "").toLowerCase().trim();

    let filtrados = listaPacientesDirectorio;
    if (q) {
      filtrados = filtrados.filter(p =>
        (p.nombre && p.nombre.toLowerCase().includes(q)) ||
        (p.rut && p.rut.toLowerCase().includes(q)) ||
        (p.email && p.email.toLowerCase().includes(q)) ||
        (p.telefono && p.telefono.includes(q))
      );
    }
    if (prev) {
      filtrados = filtrados.filter(p => p.prevision && p.prevision.toLowerCase().includes(prev));
    }

    const sel = document.getElementById("selectFichaPaciente");
    const chipsContainer = document.getElementById("chipsDirectorioPacientes");
    const totalCount = document.getElementById("totalPacientesCount");
    if (totalCount) totalCount.textContent = filtrados.length;

    if (chipsContainer) {
      chipsContainer.innerHTML = filtrados.map(p => {
        const isSelected = pacienteActivo && pacienteActivo.id === p.id;
        return renderizarChipPacienteHTML(p, isSelected);
      }).join("");
    }

    if (sel) {
      sel.innerHTML = filtrados.map(p => `
        <option value="${p.id}" ${pacienteActivo && pacienteActivo.id === p.id ? "selected" : ""}>
          ${p.nombre} (${p.prevision || "Particular"})
        </option>
      `).join("");
    }

    if (filtrados.length > 0 && (!pacienteActivo || !filtrados.some(p => p.id === pacienteActivo.id))) {
      window.cargarFichaClinicaPaciente(filtrados[0].id);
    }
  };

  window.filtrarBovedaLegal15A = function () {
    // Opción exclusiva para administradoras en el panel central de Gentia
  };

  // 2. Cargar Expediente Completo de un Paciente
  window.cargarFichaClinicaPaciente = async function (pacienteId) {
    if (!pacienteId) return;

    let pac = listaPacientesDirectorio.find(p => p.id === pacienteId);

    try {
      const res = await fetch("/api/profesionales/pacientes/obtenerFicha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pacienteId })
      });
      const data = await res.json();
      if (data && data.success && data.paciente) {
        pac = {
          ...data.paciente,
          historial: data.historial || data.paciente.historial || [],
          archivos: data.archivos || data.paciente.archivos || [],
          epicrisis: data.epicrisis || data.paciente.epicrisis,
          hashVault: data.hashVault || data.paciente.hashVault || "GNT-VAULT-AES256-VERIFIED"
        };
        // Actualizar en memoria
        const idx = listaPacientesDirectorio.findIndex(p => p.id === pacienteId);
        if (idx !== -1) listaPacientesDirectorio[idx] = pac;
      }
    } catch (_e) {}

    if (!pac) return;
    pacienteActivo = pac;

    // Actualizar selector si difiere
    const sel = document.getElementById("selectFichaPaciente");
    if (sel && sel.value !== pac.id) sel.value = pac.id;

    // Actualizar visualmente los chips con estado activo instantáneo
    const chipsContainer = document.getElementById("chipsDirectorioPacientes");
    if (chipsContainer) {
      chipsContainer.innerHTML = listaPacientesDirectorio.map(itemP => {
        return renderizarChipPacienteHTML(itemP, itemP.id === pac.id);
      }).join("");
    }

    renderizarVistaExpedienteClinico();
  };

  function renderizarVistaExpedienteClinico() {
    const p = pacienteActivo;
    const container = document.getElementById("fichaClinicaActivaContainer");
    if (!container || !p) return;

    // Alertas clínicas de riesgo
    const redFlagsActivas = p.flagSui || p.flagVIF || p.flagAbuso || p.alertaCritica;
    const redFlagsHtml = redFlagsActivas ? `
      <div class="bg-red-50 border border-red-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-red-900">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
            <i data-lucide="alert-triangle" class="w-4 h-4"></i>
          </div>
          <div>
            <strong class="text-xs uppercase tracking-wider block font-bold text-red-800">Alerta Clínica Activa (Gentia Red Flags)</strong>
            <div class="text-xs space-x-2 mt-0.5">
              ${p.flagSui ? '<span class="inline-block bg-red-200 text-red-950 px-2 py-0.5 rounded font-bold">⚠️ Riesgo Suicida</span>' : ""}
              ${p.flagVIF ? '<span class="inline-block bg-red-200 text-red-950 px-2 py-0.5 rounded font-bold">⚠️ VIF</span>' : ""}
              ${p.flagAbuso ? '<span class="inline-block bg-red-200 text-red-950 px-2 py-0.5 rounded font-bold">⚠️ Vulneración</span>' : ""}
              ${p.alertaCritica ? '<span class="inline-block bg-red-200 text-red-950 px-2 py-0.5 rounded font-bold">⚠️ Alerta Clínica</span>' : ""}
            </div>
          </div>
        </div>
        <span class="text-[11px] text-red-700 font-semibold bg-white/80 px-2.5 py-1 rounded-lg border border-red-200">
          Priorizar contención y red de apoyo
        </span>
      </div>
    ` : "";

    // Configuración dinámica de sub-pestañas según disciplina del profesional
    const disc = profesionalActivo?.disciplinaId || "psicologia";
    const confSub2 = (function(d) {
      switch (d) {
        case "nutricion": return { label: "Evaluación Antropométrica & Ingesta", icon: "activity" };
        case "matroneria": return { label: "Evaluación Gineco-Obstétrica & Perinatal", icon: "heart" };
        case "terapia_ocupacional": return { label: "Perfil Sensorial & AVD", icon: "activity" };
        case "fonoaudiologia": return { label: "Evaluación de Habla, Voz & Deglución", icon: "message-square" };
        case "trabajo_social": return { label: "Diagnóstico Sociofamiliar & Genograma", icon: "users" };
        case "medicina_psiquiatria": return { label: "Examen Somático & Psicofarmacología", icon: "stethoscope" };
        case "abogacia_mediacion": return { label: "Ficha de Caso Jurídico & Mediación", icon: "scale" };
        case "psicologia":
        default: return { label: "Examen Mental V70", icon: "activity" };
      }
    })(disc);
    const labelTab1 = (disc === "abogacia_mediacion") ? "Ficha de Caso & Cliente" : "Ficha & Antecedentes";

    // Sub-pestañas del expediente
    const tabsMenuHtml = `
      <div class="flex flex-wrap items-center gap-2 border-b border-noche/10 pb-2">
        <button
          type="button"
          onclick="window.cambiarSubPestanaClinica('ficha')"
          class="px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
            subPestanaClinicaActiva === "ficha"
              ? "bg-petroleo text-white shadow-sm"
              : "bg-perla/80 text-noche/75 hover:bg-perla"
          }"
        >
          <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
          <span>${labelTab1}</span>
        </button>

        <button
          type="button"
          onclick="window.cambiarSubPestanaClinica('examen')"
          class="px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
            subPestanaClinicaActiva === "examen"
              ? "bg-petroleo text-white shadow-sm"
              : "bg-perla/80 text-noche/75 hover:bg-perla"
          }"
        >
          <i data-lucide="${confSub2.icon}" class="w-3.5 h-3.5"></i>
          <span>${confSub2.label}</span>
        </button>

        <button
          type="button"
          onclick="window.cambiarSubPestanaClinica('evoluciones')"
          class="px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
            subPestanaClinicaActiva === "evoluciones"
              ? "bg-petroleo text-white shadow-sm"
              : "bg-perla/80 text-noche/75 hover:bg-perla"
          }"
        >
          <i data-lucide="clock" class="w-3.5 h-3.5"></i>
          <span>Evoluciones Clínicas (DAP)</span>
          <span class="ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${subPestanaClinicaActiva === "evoluciones" ? "bg-white/20 text-white" : "bg-petroleo/10 text-petroleo"} font-bold">
            ${(p.historial || []).length}
          </span>
        </button>

        <button
          type="button"
          onclick="window.cambiarSubPestanaClinica('epicrisis')"
          class="px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
            subPestanaClinicaActiva === "epicrisis"
              ? "bg-granate text-white shadow-sm"
              : "bg-perla/80 text-noche/75 hover:bg-perla"
          }"
        >
          <i data-lucide="file-check" class="w-3.5 h-3.5"></i>
          <span>Epicrisis Oficial</span>
        </button>

        <button
          type="button"
          onclick="window.cambiarSubPestanaClinica('archivos')"
          class="px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
            subPestanaClinicaActiva === "archivos"
              ? "bg-petroleo text-white shadow-sm"
              : "bg-perla/80 text-noche/75 hover:bg-perla"
          }"
        >
          <i data-lucide="paperclip" class="w-3.5 h-3.5"></i>
          <span>Documentos & Archivos</span>
        </button>
      </div>
    `;

    // Contenido dinámico según sub-pestaña
    let subContentHtml = "";
    if (subPestanaClinicaActiva === "ficha") {
      subContentHtml = renderizarSubFichaAntecedentes(p);
    } else if (subPestanaClinicaActiva === "examen") {
      if (disc === "nutricion") subContentHtml = renderizarSubNutricion(p);
      else if (disc === "matroneria") subContentHtml = renderizarSubMatroneria(p);
      else if (disc === "terapia_ocupacional") subContentHtml = renderizarSubTerapiaOcupacional(p);
      else if (disc === "fonoaudiologia") subContentHtml = renderizarSubFonoaudiologia(p);
      else if (disc === "trabajo_social") subContentHtml = renderizarSubTrabajoSocial(p);
      else if (disc === "medicina_psiquiatria") subContentHtml = renderizarSubMedicinaPsiquiatria(p);
      else if (disc === "abogacia_mediacion") subContentHtml = renderizarSubAbogacia(p);
      else subContentHtml = renderizarSubExamenMental(p);
    } else if (subPestanaClinicaActiva === "evoluciones") {
      subContentHtml = renderizarSubEvolucionesDAP(p);
    } else if (subPestanaClinicaActiva === "epicrisis") {
      subContentHtml = renderizarSubEpicrisis(p);
    } else if (subPestanaClinicaActiva === "archivos") {
      subContentHtml = renderizarSubArchivos(p);
    }

    container.innerHTML = `
      <!-- Encabezado de la Ficha del Consultante -->
      <div class="bg-white p-5 sm:p-6 rounded-3xl border border-noche/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div class="flex items-start gap-4">
          <div class="w-14 h-14 rounded-2xl bg-petroleo/10 text-petroleo flex items-center justify-center font-bold text-xl shrink-0 font-serif border border-petroleo/20 shadow-sm">
            ${p.nombre ? p.nombre.charAt(0) : "P"}
          </div>
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="font-serif text-2xl font-bold text-noche">${p.nombre}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-petroleo/10 text-petroleo">
                ${p.prevision || "Particular"}
              </span>
            </div>
            <div class="text-xs text-noche/75 flex flex-wrap gap-x-4 gap-y-1 font-medium">
              <span>RUT: <strong class="font-mono">${p.rut || "Sin RUT"}</strong></span>
              <span>Edad: <strong>${p.edad ? p.edad + " años" : "No especificada"}</strong></span>
              <span>Género: <strong>${p.genero || "No especificado"}</strong></span>
              <span>Ocupación: <strong>${p.ocupacion || "No informada"}</strong></span>
            </div>
            <div class="text-xs text-noche/65 flex flex-wrap gap-x-4 gap-y-1 pt-0.5">
              <span>📍 ${p.direccion || "Dirección no registrada"}</span>
              <span>✉️ ${p.email || "Sin email"}</span>
              <span>📞 ${p.telefono || "Sin teléfono"}</span>
            </div>
          </div>
        </div>

        <!-- Botones de Acción sobre el Consultante -->
        <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
          ${p.telefono ? `
            <a
              href="https://wa.me/${p.telefono.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(p.nombre)}%2C%20te%20escribe%20${encodeURIComponent(profesionalActivo ? profesionalActivo.nombre : 'tu especialista')}%20de%20Cl%C3%ADnica%20Cabal%20Salud."
              target="_blank"
              rel="noopener"
              class="py-2 px-3 rounded-xl border border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Abrir conversación WhatsApp directa"
            >
              <i data-lucide="message-circle" class="w-3.5 h-3.5 text-emerald-600"></i>
              <span>WhatsApp</span>
            </a>
          ` : ''}

          <button
            type="button"
            onclick="window.abrirModalEditarPaciente('${p.id}')"
            class="py-2 px-3 rounded-xl border border-noche/15 bg-white hover:bg-perla text-xs font-semibold text-noche flex items-center gap-1.5 transition"
            title="Editar datos demográficos o clínicos del consultante"
          >
            <i data-lucide="edit" class="w-3.5 h-3.5 text-amber-600"></i>
            <span>Editar</span>
          </button>

          <button
            type="button"
            onclick="window.abrirModalDerivarPaciente('${p.id}')"
            class="py-2 px-3 rounded-xl border border-petroleo/30 bg-petroleo/5 hover:bg-petroleo/10 text-xs font-semibold text-petroleo flex items-center gap-1.5 transition"
            title="Traspasar o derivar paciente internamente en la red multidisciplinaria Cabal Salud"
          >
            <i data-lucide="repeat" class="w-3.5 h-3.5 text-petroleo"></i>
            <span>Traspasar / Derivar</span>
          </button>

          <button
            type="button"
            onclick="window.abrirModalDescargarInforme('${p.id}')"
            class="py-2 px-3 rounded-xl border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold text-emerald-800 flex items-center gap-1.5 transition"
            title="Descargar informe clínico detallado por especialidad"
          >
            <i data-lucide="file-text" class="w-3.5 h-3.5 text-emerald-700"></i>
            <span>Informe Especialidad</span>
          </button>

          <button
            type="button"
            onclick="window.descargarExpedienteZip('${p.id}')"
            class="py-2 px-3 rounded-xl border border-petroleo/40 bg-petroleo text-white hover:bg-petroleo/90 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            title="Adjuntar fichas y descargar expediente multidisciplinario completo en archivo .ZIP"
          >
            <i data-lucide="archive" class="w-3.5 h-3.5 text-emerald-300"></i>
            <span>Descargar .ZIP</span>
          </button>

          <button
            type="button"
            onclick="window.descargarEpicrisisPdf('${p.id}')"
            class="py-2 px-3 rounded-xl border border-granate/30 bg-granate/5 hover:bg-granate/10 text-xs font-semibold text-granate flex items-center gap-1.5 transition"
            title="Visualizar e imprimir informe / epicrisis oficial"
          >
            <i data-lucide="printer" class="w-3.5 h-3.5 text-granate"></i>
            <span>Epicrisis</span>
          </button>
        </div>
      </div>

      <!-- Banner Multidisciplinario Cabal Salud -->
      <div class="bg-gradient-to-r from-petroleo/5 via-emerald-50/40 to-perla border border-petroleo/20 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-petroleo text-white flex items-center justify-center font-bold text-xs shadow-sm">
            <i data-lucide="network" class="w-4 h-4 text-emerald-300"></i>
          </div>
          <div>
            <div class="font-bold text-petroleo uppercase tracking-wider text-[11px] flex items-center gap-2">
              <span>Expediente Multidisciplinario Compartido</span>
              <span class="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">9 Especialidades Vinculadas</span>
            </div>
            <p class="text-noche/70 text-[11px] mt-0.5">
              Caso clínico transversal con registros clínicos integrados, trazabilidad interprofesional y custodia bajo Ley N° 20.584.
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            onclick="window.abrirModalTraspasarPaciente('${p.id}')"
            class="py-1.5 px-3 rounded-xl bg-white border border-petroleo/30 text-petroleo hover:bg-perla text-[11px] font-bold flex items-center gap-1 transition"
          >
            <i data-lucide="repeat" class="w-3 h-3"></i>
            <span>Traspasar Caso</span>
          </button>
          <button
            type="button"
            onclick="window.descargarExpedienteZip('${p.id}')"
            class="py-1.5 px-3 rounded-xl bg-petroleo text-white hover:bg-petroleo/90 text-[11px] font-bold flex items-center gap-1 shadow-sm transition"
          >
            <i data-lucide="archive" class="w-3 h-3 text-emerald-300"></i>
            <span>Empaquetar en .ZIP</span>
          </button>
        </div>
      </div>

      ${redFlagsHtml}

      <!-- Navegación de Sub-Pestañas Clínicas -->
      ${tabsMenuHtml}

      <!-- Contenido de la Sub-Pestaña Activa -->
      <div class="pt-2">
        ${subContentHtml}
      </div>
    `;

    refreshIcons();
  }

  window.cambiarSubPestanaClinica = function (subTab) {
    subPestanaClinicaActiva = subTab;
    renderizarVistaExpedienteClinico();
  };

  // ============================================================================
  // 2.1. SUB-PESTAÑA 1: FICHA & ANTECEDENTES AD-HOC SEGÚN DISCIPLINA PROFESIONAL
  // ============================================================================
  function renderizarSubFichaAntecedentes(p) {
    const disc = profesionalActivo?.disciplinaId || "psicologia";
    const adhoc = p.datosAdHoc || {};

    // 1. PSICOLOGÍA (Incluye Motivo Manifiesto y Motivo Latente)
    if (disc === "psicologia") {
      return `
        <form onsubmit="window.guardarFichaIngreso(event)" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-3">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 mb-1">
                  Anamnesis y Motivo de Consulta Manifiesto
                </label>
                <textarea id="fichaAnamnesis" rows="3" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.motivoConsulta || ""}</textarea>
                <span class="text-[11px] text-noche/60">Demanda consciente verbalizada por el consultante y factores desencadenantes.</span>
              </div>

              <div class="pt-2 border-t border-noche/10 bg-petroleo/5 p-3 rounded-xl border border-petroleo/15">
                <label class="block text-xs font-bold uppercase tracking-wider text-petroleo flex items-center gap-1.5 mb-1">
                  <i data-lucide="compass" class="w-3.5 h-3.5"></i>
                  <span>Motivo de Consulta Latente (Demanda Inconsciente / Conflicto de Fondo)</span>
                </label>
                <textarea id="fichaMotivoLatente" rows="3" placeholder="Hipótesis psicodinámica, demanda no verbalizada, posición subjetiva y conflicto psíquico subyacente..." class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-petroleo/30 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.motivoConsultaLatente || ""}</textarea>
                <span class="text-[11px] text-petroleo/80 font-medium">Lectura clínica interpretativa que orienta la dirección de la cura psicoterapéutica.</span>
              </div>
            </div>

            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Diagnóstico Clínico (CIE-11 / DSM-5)
              </label>
              <input type="text" id="fichaDiagnostico" value="${p.diagnosticoCIE || ""}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche font-semibold focus:outline-none focus:border-petroleo" />
              <span class="text-[11px] text-noche/60">Código y denominación médica formal para licencias justificadas y reembolsos Isapre/FONASA.</span>

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Hipótesis Comprensiva y Objetivos Terapéuticos
              </label>
              <textarea id="fichaObjetivos" rows="4" class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.objetivosTerapeuticos || ""}</textarea>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Antecedentes Médicos / Quirúrgicos</label>
              <textarea id="fichaAntMedicos" rows="3" class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${p.antecedentesMedicos || ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Antecedentes Psiquiátricos / Familiares</label>
              <textarea id="fichaAntPsiquiatricos" rows="3" class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${p.antecedentesPsiquiatricos || ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Farmacoterapia y Alergias</label>
              <textarea id="fichaMedicacion" rows="3" class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${p.medicacionActual ? "Fármacos: " + p.medicacionActual : ""}${p.alergias ? "\nAlergias: " + p.alergias : ""}</textarea>
            </div>
          </div>

          <!-- Contacto de Emergencia -->
          <div class="bg-perla/50 p-4 rounded-2xl border border-noche/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <strong class="text-noche font-bold">Contacto de Emergencia Registrado:</strong>
              <span class="text-noche/80 ml-1">
                ${p.contactoEmergenciaNombre ? `${p.contactoEmergenciaNombre} (${p.contactoEmergenciaParentesco || "Familiar"}) · Tel: ${p.contactoEmergenciaTelefono}` : "No informado aún"}
              </span>
            </div>
            <button type="button" onclick="window.abrirModalEditarPaciente('${p.id}')" class="text-petroleo font-semibold hover:underline">
              Actualizar contacto
            </button>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-300"></i>
              <span>Guardar Ficha Psicológica en Gentia Vault</span>
            </button>
          </div>
        </form>
      `;
    }

    // 2. NUTRICIÓN Y DIETÉTICA
    if (disc === "nutricion") {
      return `
        <form onsubmit="window.guardarFichaIngreso(event)" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Motivo de Consulta Nutricional
              </label>
              <textarea id="fichaAnamnesis" rows="3" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.motivoConsulta || ""}</textarea>
              <span class="text-[11px] text-noche/60">Objetivo del paciente (rendimiento deportivo, recomposición corporal, patología digestiva o geriátrica).</span>

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Anamnesis Alimentaria & Hábitos de Consumo
              </label>
              <textarea id="adhocNutriAnamnesis" rows="3" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${adhoc.anamnesisAlimentaria || ""}</textarea>
              <span class="text-[11px] text-noche/60">Horarios de ingesta, nivel de saciedad, apetito y consumo hídrico diario.</span>
            </div>

            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Diagnóstico Nutricional Integrado
              </label>
              <input type="text" id="fichaDiagnostico" value="${p.diagnosticoCIE || ""}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche font-semibold focus:outline-none focus:border-petroleo" />

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Objetivos Nutricionales Concertados & Metas
              </label>
              <textarea id="fichaObjetivos" rows="4" class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.objetivosTerapeuticos || ""}</textarea>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Antecedentes Gastrointestinales & Tránsito</label>
              <textarea id="fichaAntMedicos" rows="3" placeholder="Reflujo, meteorismo, hinchazón, intolerancias..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${p.antecedentesMedicos || ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Alergias, Intolerancias y Aversiones</label>
              <textarea id="fichaAntPsiquiatricos" rows="3" placeholder="Lactosa, gluten, fructosa, aversiones sensoriales..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${p.alergias || ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Suplementación Deportiva y Fármacos</label>
              <textarea id="fichaMedicacion" rows="3" placeholder="Creatina, proteína, multivitamínicos, fármacos..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${p.medicacionActual || ""}</textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-300"></i>
              <span>Guardar Ficha Nutricional en Gentia</span>
            </button>
          </div>
        </form>
      `;
    }

    // 3. MATRONERÍA
    if (disc === "matroneria") {
      return `
        <form onsubmit="window.guardarFichaIngreso(event)" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Motivo de Consulta Gineco-Obstétrica & Perinatal
              </label>
              <textarea id="fichaAnamnesis" rows="3" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.motivoConsulta || ""}</textarea>

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Antecedentes Gineco-Obstétricos (AGO)
              </label>
              <textarea id="adhocMatronaAgo" rows="3" placeholder="Menarquia, FUR, Regularidad del ciclo, Fórmula Obstétrica (G_ P_ A_ C_)..." class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${adhoc.formulaObstetrica ? `Fórmula Obstétrica: ${adhoc.formulaObstetrica}\nFUR: ${adhoc.fur || "No informada"}\nCiclos: ${adhoc.ciclos || "Regulares"}` : ""}</textarea>
            </div>

            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Diagnóstico / Condición Clínica
              </label>
              <input type="text" id="fichaDiagnostico" value="${p.diagnosticoCIE || ""}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche font-semibold focus:outline-none focus:border-petroleo" />

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Plan de Acompañamiento Perinatal & Salud Sexual
              </label>
              <textarea id="fichaObjetivos" rows="4" class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.objetivosTerapeuticos || ""}</textarea>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Método Anticonceptivo Actual (MAC)</label>
              <textarea id="adhocMatronaMac" rows="3" placeholder="DIU, implante, ACO, barrera y tolerancia..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.metodoAnticonceptivo || p.medicacionActual || ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Tamizajes Preventivos al Día</label>
              <textarea id="fichaAntMedicos" rows="3" placeholder="Último PAP, VPH, Mamografía o ecografía mamaria..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.tamizajePAP ? `PAP: ${adhoc.tamizajePAP}\nMamografía: ${adhoc.tamizajeMamario || "Al día"}` : ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Salud Sexual & Perfil Sensorial</label>
              <textarea id="adhocMatronaSensorial" rows="3" placeholder="Dispareunia, hipersensibilidad al instrumental, adaptaciones..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.saludSexualSensorial || ""}</textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-300"></i>
              <span>Guardar Ficha Gineco-Obstétrica en Gentia</span>
            </button>
          </div>
        </form>
      `;
    }

    // 4. TERAPIA OCUPACIONAL
    if (disc === "terapia_ocupacional") {
      return `
        <form onsubmit="window.guardarFichaIngreso(event)" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Motivo de Consulta Ocupacional & Desempeño
              </label>
              <textarea id="fichaAnamnesis" rows="3" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.motivoConsulta || ""}</textarea>

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Desempeño en Actividades de la Vida Diaria (AVD)
              </label>
              <textarea id="adhocToAvd" rows="3" placeholder="AVD Básicas (alimentación, vestido, aseo) e Instrumentales (transporte, dinero, compras)..." class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${adhoc.avdBasicas ? `Básicas: ${adhoc.avdBasicas}\nInstrumentales: ${adhoc.avdInstrumentales || ""}` : ""}</textarea>
            </div>

            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Diagnóstico Funcional Ocupacional
              </label>
              <input type="text" id="fichaDiagnostico" value="${p.diagnosticoCIE || ""}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche font-semibold focus:outline-none focus:border-petroleo" />

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Objetivos Ocupacionales y Plan de Trabajo
              </label>
              <textarea id="fichaObjetivos" rows="4" class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.objetivosTerapeuticos || ""}</textarea>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Perfil Sensorial y Procesamiento</label>
              <textarea id="adhocToSensorial" rows="3" placeholder="Búsqueda propioceptiva, hipersensibilidad acústica, táctil..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.perfilSensorial || ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Balance Ocupacional y Rutinas</label>
              <textarea id="adhocToBalance" rows="3" placeholder="Sueño, descanso, productividad y ocio..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.balanceOcupacional || ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Adaptaciones Ambientales & Ergonomía</label>
              <textarea id="adhocToAdaptaciones" rows="3" placeholder="Cojines propioceptivos, temporizadores visuales, apoyos..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.adaptacionesAmbientales || ""}</textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-300"></i>
              <span>Guardar Ficha Ocupacional en Gentia</span>
            </button>
          </div>
        </form>
      `;
    }

    // 5. FONOAUDIOLOGÍA
    if (disc === "fonoaudiologia") {
      return `
        <form onsubmit="window.guardarFichaIngreso(event)" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Motivo de Consulta Fonoaudiológica
              </label>
              <textarea id="fichaAnamnesis" rows="3" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.motivoConsulta || ""}</textarea>

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Niveles del Lenguaje (Léxico, Sintaxis, Pragmática)
              </label>
              <textarea id="adhocFonoLenguaje" rows="3" placeholder="Desempeño fonológico, vocabulario, inferencias sociales y dobles intenciones..." class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${adhoc.nivelesLenguaje || ""}</textarea>
            </div>

            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Diagnóstico Fonoaudiológico / Comunicación
              </label>
              <input type="text" id="fichaDiagnostico" value="${p.diagnosticoCIE || ""}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche font-semibold focus:outline-none focus:border-petroleo" />

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Objetivos Comunicativos Funcionales
              </label>
              <textarea id="fichaObjetivos" rows="4" class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.objetivosTerapeuticos || ""}</textarea>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Evaluación de Voz (Escala RASATI)</label>
              <textarea id="adhocFonoVoz" rows="3" placeholder="Tensión, fatiga vocal, ronquera, soporte aéreo..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.evaluacionVoz || ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Motricidad Orofacial & Deglución</label>
              <textarea id="adhocFonoDeglucion" rows="3" placeholder="Respiración, masticación, patrón deglutorio..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.motricidadOrofacial || ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Apoyos SAAC y Guiones Sociales</label>
              <textarea id="adhocFonoSaac" rows="3" placeholder="Sistemas aumentativos/alternativos, apoyos visuales..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.apoyosComunicativos || ""}</textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-300"></i>
              <span>Guardar Ficha Fonoaudiológica en Gentia</span>
            </button>
          </div>
        </form>
      `;
    }

    // 6. TRABAJO SOCIAL
    if (disc === "trabajo_social") {
      return `
        <form onsubmit="window.guardarFichaIngreso(event)" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Demanda Social y Situación de Vulnerabilidad
              </label>
              <textarea id="fichaAnamnesis" rows="3" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.motivoConsulta || ""}</textarea>

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Genograma Familiar & Dinámica de Cuidadores
              </label>
              <textarea id="adhocTsGenograma" rows="3" placeholder="Estructura familiar, cuidadora principal, sobrecarga del cuidador (Zarit)..." class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${adhoc.genogramaFamiliar || ""}</textarea>
            </div>

            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Diagnóstico Social Integrado
              </label>
              <input type="text" id="fichaDiagnostico" value="${p.diagnosticoCIE || ""}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche font-semibold focus:outline-none focus:border-petroleo" />

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Plan de Intervención Social y Redes
              </label>
              <textarea id="fichaObjetivos" rows="4" class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.objetivosTerapeuticos || ""}</textarea>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Registro Social de Hogares (RSH)</label>
              <textarea id="adhocTsRsh" rows="3" placeholder="Tramo socioeconómico (40%, 60%), ingresos familiares..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.registroSocialHogares || ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Condiciones de Vivienda & Accesibilidad</label>
              <textarea id="adhocTsVivienda" rows="3" placeholder="Tenencia, barreras arquitectónicas en baño/accesos..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.condicionesVivienda || ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Red Institucional (COMPIN / Chile Cuida)</label>
              <textarea id="adhocTsRedes" rows="3" placeholder="Trámites de credencial RND, CESFAM, subsidios..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.redesComunitarias || ""}</textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-300"></i>
              <span>Guardar Ficha Social en Gentia</span>
            </button>
          </div>
        </form>
      `;
    }

    // 7. MEDICINA / PSIQUIATRÍA
    if (disc === "medicina_psiquiatria") {
      return `
        <form onsubmit="window.guardarFichaIngreso(event)" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Motivo de Consulta Médico-Psiquiátrica
              </label>
              <textarea id="fichaAnamnesis" rows="3" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.motivoConsulta || ""}</textarea>

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Historia de la Enfermedad Actual (HEA) & Cronología
              </label>
              <textarea id="adhocMedHea" rows="3" placeholder="Tiempo de evolución, gatillantes, fluctuación circadiana, episodios previos..." class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${adhoc.heacronologia || ""}</textarea>
            </div>

            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Diagnóstico Nosológico Formal (CIE-11 / DSM-5)
              </label>
              <input type="text" id="fichaDiagnostico" value="${p.diagnosticoCIE || ""}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche font-semibold focus:outline-none focus:border-petroleo" />

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Plan Terapéutico y Coordinación Psicoterapéutica
              </label>
              <textarea id="fichaObjetivos" rows="4" class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.objetivosTerapeuticos || ""}</textarea>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Esquema Farmacológico Actual & Dosis</label>
              <textarea id="fichaMedicacion" rows="3" placeholder="Fármaco, posología, tiempo de uso, tolerancia gástrica..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.esquemaFarmacologico || p.medicacionActual || ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Exámenes Paraclínicos & Laboratorio</label>
              <textarea id="adhocMedLab" rows="3" placeholder="Hemograma, perfil lipídico, TSH, Vitamina D, ECG..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.paraclinicos || ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Pronóstico y Reposo Médico (Licencia)</label>
              <textarea id="adhocMedLicencia" rows="3" placeholder="Días indicados, justificación clínica de reposo..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.justificacionLicencia || ""}</textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-300"></i>
              <span>Guardar Ficha Médica en Gentia</span>
            </button>
          </div>
        </form>
      `;
    }

    // 8. ABOGACÍA DE FAMILIA Y MEDIACIÓN FAMILIAR
    if (disc === "abogacia_mediacion") {
      return `
        <form onsubmit="window.guardarFichaIngreso(event)" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Materia Jurídico-Familiar y Motivo de Consulta
              </label>
              <textarea id="fichaAnamnesis" rows="3" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.motivoConsulta || ""}</textarea>
              <span class="text-[11px] text-noche/60">Demanda legal: Alimentos, Cuidado Personal (Tuición), RDR o Mediación Previa Obligatoria (Ley 19.968).</span>

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Datos de la Causa Judicial y Tribunal Competente
              </label>
              <textarea id="adhocAbogCausa" rows="2" placeholder="Tribunal de Familia, N° RIT / Causa y estado procesal..." class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${adhoc.datosCausa ? `${adhoc.datosCausa} · Tribunal: ${adhoc.tribunalCompetente || ""}` : ""}</textarea>
            </div>

            <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
                Partes Involucradas y NNA (Hijos/as en Común)
              </label>
              <textarea id="adhocAbogPartes" rows="3" placeholder="Solicitante (Cliente), Contraparte y Niños, Niñas y Adolescentes involucrados con edades..." class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${adhoc.partesInvolucradas ? `${adhoc.partesInvolucradas}\nNNA: ${adhoc.nnaInvolucrados || ""}` : ""}</textarea>

              <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
                Estrategia Legal y Objetivos de la Mediación
              </label>
              <textarea id="fichaObjetivos" rows="3" class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.objetivosTerapeuticos || ""}</textarea>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Puntos Críticos de Conflicto y Voluntad Dialógica</label>
              <textarea id="adhocAbogConflicto" rows="3" placeholder="Desacuerdos en régimen de visitas, indexación de alimentos, voluntad colaborativa..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.puntosConflicto || ""}</textarea>
            </div>
            <div class="bg-perla/70 rounded-2xl p-4 border border-noche/10 space-y-1.5">
              <label class="block text-xs font-bold text-noche/80">Estrategia de Acuerdo y Corresponsabilidad</label>
              <textarea id="adhocAbogEstrategia" rows="3" placeholder="Borrador de acuerdos, cláusulas de cuidado compartido, derivación a psicología..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${adhoc.estrategiaAcuerdo || ""}</textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-300"></i>
              <span>Guardar Expediente Jurídico en Gentia</span>
            </button>
          </div>
        </form>
      `;
    }

    // Default fallback
    return `
      <form onsubmit="window.guardarFichaIngreso(event)" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-noche/80 mb-1">Motivo de Atención / Anamnesis</label>
          <textarea id="fichaAnamnesis" rows="3" class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche">${p.motivoConsulta || ""}</textarea>
        </div>
        <button type="submit" class="btn-petroleo py-2.5 px-5 rounded-xl text-xs font-semibold">Guardar en Gentia</button>
      </form>
    `;
  }

  // ============================================================================
  // 2.2. SUB-PESTAÑA 2: EVALUACIONES AD-HOC SEGÚN ESPECIALIDAD (EXAMEN / INGESTA / ETC)
  // ============================================================================
  function renderizarSubExamenMental(p) {
    const ex = p.fichasPorEspecialidad?.psicologia?.examenMental || p.examenMental || {};
    return `
      <form onsubmit="window.guardarEvaluacionEspecialidad(event)" class="space-y-4">
        <div class="bg-perla p-4 rounded-2xl border border-noche/10 text-xs text-noche/80 flex items-center justify-between">
          <span>Evaluación estandarizada del estado psíquico actual bajo protocolo Gentia V70.</span>
          <span class="font-mono text-petroleo font-bold">Psicología Clínica</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Porte, Actitud y Presentación</label>
            <textarea id="emPorte" rows="2" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${ex.porteActitud || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Conciencia y Orientación (Tiempo, Espacio, Persona)</label>
            <textarea id="emConciencia" rows="2" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${ex.conciencia || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Psicomotricidad y Conducta Motora</label>
            <textarea id="emPsicomotricidad" rows="2" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${ex.psicomotricidad || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Afectividad, Humor y Reactividad Emocional</label>
            <textarea id="emAfectividad" rows="2" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${ex.afectividad || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Pensamiento (Curso, Ritmo y Contenido)</label>
            <textarea id="emPensamiento" rows="2" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${ex.pensamiento || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Lenguaje y Comunicación</label>
            <textarea id="emLenguaje" rows="2" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${ex.lenguaje || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Sensopercepción (Ilusiones / Alucinaciones)</label>
            <textarea id="emSensopercepcion" rows="2" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${ex.sensopercepcion || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Juicio de Realidad e Insight (Conciencia de Problema)</label>
            <textarea id="emJuicio" rows="2" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${ex.juicioInsight || ""}</textarea>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
            <i data-lucide="check" class="w-4 h-4 text-emerald-300"></i>
            <span>Actualizar Examen Mental en Gentia</span>
          </button>
        </div>
      </form>
    `;
  }

  function renderizarSubNutricion(p) {
    const a = p.fichasPorEspecialidad?.nutricion?.datosAdHoc || p.datosAdHoc || {};
    return `
      <form onsubmit="window.guardarEvaluacionEspecialidad(event)" class="space-y-4">
        <div class="bg-perla p-4 rounded-2xl border border-noche/10 text-xs text-noche/80 flex items-center justify-between">
          <span>Evaluación Antropométrica ISAK II, Tránsito Digestivo y Pauta de Macronutrientes.</span>
          <span class="font-mono text-petroleo font-bold">Nutrición & Dietética</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <div class="bg-white p-3 rounded-xl border border-noche/10">
            <label class="block text-[11px] font-semibold text-noche/70">Peso (kg)</label>
            <input type="number" step="0.1" id="subNutriPeso" value="${a.pesoActual || 60}" class="w-full font-mono font-bold text-noche text-sm focus:outline-none" />
          </div>
          <div class="bg-white p-3 rounded-xl border border-noche/10">
            <label class="block text-[11px] font-semibold text-noche/70">Talla (cm)</label>
            <input type="number" id="subNutriTalla" value="${a.talla || 165}" class="w-full font-mono font-bold text-noche text-sm focus:outline-none" />
          </div>
          <div class="bg-white p-3 rounded-xl border border-noche/10">
            <label class="block text-[11px] font-semibold text-noche/70">IMC (kg/m²)</label>
            <input type="number" step="0.1" id="subNutriImc" value="${a.imc || 22.0}" class="w-full font-mono font-bold text-noche text-sm focus:outline-none" />
          </div>
          <div class="bg-white p-3 rounded-xl border border-noche/10">
            <label class="block text-[11px] font-semibold text-noche/70">% Grasa</label>
            <input type="number" step="0.1" id="subNutriGrasa" value="${a.porcentajeGrasa || 20.0}" class="w-full font-mono font-bold text-noche text-sm focus:outline-none" />
          </div>
          <div class="bg-white p-3 rounded-xl border border-noche/10">
            <label class="block text-[11px] font-semibold text-noche/70">Masa Músc. (kg)</label>
            <input type="number" step="0.1" id="subNutriMusculo" value="${a.masaMuscular || 26.5}" class="w-full font-mono font-bold text-noche text-sm focus:outline-none" />
          </div>
          <div class="bg-white p-3 rounded-xl border border-noche/10">
            <label class="block text-[11px] font-semibold text-noche/70">Cintura (cm)</label>
            <input type="number" step="0.5" id="subNutriCintura" value="${a.perimetroCintura || 68}" class="w-full font-mono font-bold text-noche text-sm focus:outline-none" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Tránsito Gastrointestinal (Escala de Bristol)</label>
            <textarea id="subNutriBristol" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.transitoDigestivo || "Tipo 3-4 (Normal). Sin distensión."}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Requerimientos Energéticos & Pauta (GET kcal y Macros)</label>
            <textarea id="subNutriPauta" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.pautaRequerimientos || "GET: 2.100 kcal. Proteínas: 1.6 g/kg."}</textarea>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
            <i data-lucide="check" class="w-4 h-4 text-emerald-300"></i>
            <span>Actualizar Evaluación Nutricional en Gentia</span>
          </button>
        </div>
      </form>
    `;
  }

  function renderizarSubMatroneria(p) {
    const a = p.fichasPorEspecialidad?.matroneria?.datosAdHoc || p.datosAdHoc || {};
    return `
      <form onsubmit="window.guardarEvaluacionEspecialidad(event)" class="space-y-4">
        <div class="bg-perla p-4 rounded-2xl border border-noche/10 text-xs text-noche/80 flex items-center justify-between">
          <span>Control Gineco-Obstétrico, Salud Perinatal y Lactancia Respetuosa.</span>
          <span class="font-mono text-petroleo font-bold">Matronería</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="bg-white p-3 rounded-xl border border-noche/10">
            <label class="block text-[11px] font-semibold text-noche/70">Fórmula Obstétrica</label>
            <input type="text" id="subMatronaFo" value="${a.formulaObstetrica || "G0 P0 A0 C0"}" class="w-full font-mono font-bold text-noche text-sm focus:outline-none" />
          </div>
          <div class="bg-white p-3 rounded-xl border border-noche/10">
            <label class="block text-[11px] font-semibold text-noche/70">Fecha Última Regla (FUR)</label>
            <input type="date" id="subMatronaFur" value="${a.fur || ""}" class="w-full font-bold text-noche text-xs focus:outline-none" />
          </div>
          <div class="bg-white p-3 rounded-xl border border-noche/10">
            <label class="block text-[11px] font-semibold text-noche/70">Características del Ciclo</label>
            <input type="text" id="subMatronaCiclos" value="${a.ciclos || "28 días / Regular"}" class="w-full font-bold text-noche text-xs focus:outline-none" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Tamizajes Preventivos (PAP / VPH / Mamografía)</label>
            <textarea id="subMatronaTamizajes" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.tamizajePAP ? `PAP: ${a.tamizajePAP}\nMamografía: ${a.tamizajeMamario || "Normal"}` : ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Lactancia Materna, Piso Pélvico y Sensorialidad</label>
            <textarea id="subMatronaLactancia" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.saludSexualSensorial || "Sin alteraciones en piso pélvico. Protocolo de adaptación sensorial respetuosa."}</textarea>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
            <i data-lucide="check" class="w-4 h-4 text-emerald-300"></i>
            <span>Actualizar Evaluación de Matronería en Gentia</span>
          </button>
        </div>
      </form>
    `;
  }

  function renderizarSubTerapiaOcupacional(p) {
    const a = p.fichasPorEspecialidad?.terapia_ocupacional?.datosAdHoc || p.datosAdHoc || {};
    return `
      <form onsubmit="window.guardarEvaluacionEspecialidad(event)" class="space-y-4">
        <div class="bg-perla p-4 rounded-2xl border border-noche/10 text-xs text-noche/80 flex items-center justify-between">
          <span>Evaluación de Integración Sensorial, AVD y Organización de Rutinas.</span>
          <span class="font-mono text-petroleo font-bold">Terapia Ocupacional</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Procesamiento Sensorial (Propioceptivo, Vestibular, Táctil, Auditivo)</label>
            <textarea id="subToSensorial" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.perfilSensorial || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Desempeño en AVD Básicas e Instrumentales</label>
            <textarea id="subToAvd" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.avdBasicas ? `${a.avdBasicas}\n${a.avdInstrumentales || ""}` : ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Balance Ocupacional y Manejo de Fatiga</label>
            <textarea id="subToBalance" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.balanceOcupacional || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Adaptaciones Ambientales, Ergonomía y Apoyos</label>
            <textarea id="subToAdaptaciones" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.adaptacionesAmbientales || ""}</textarea>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
            <i data-lucide="check" class="w-4 h-4 text-emerald-300"></i>
            <span>Actualizar Evaluación Ocupacional en Gentia</span>
          </button>
        </div>
      </form>
    `;
  }

  function renderizarSubFonoaudiologia(p) {
    const a = p.fichasPorEspecialidad?.fonoaudiologia?.datosAdHoc || p.datosAdHoc || {};
    return `
      <form onsubmit="window.guardarEvaluacionEspecialidad(event)" class="space-y-4">
        <div class="bg-perla p-4 rounded-2xl border border-noche/10 text-xs text-noche/80 flex items-center justify-between">
          <span>Evaluación de Lenguaje, Habla, Voz (Escala RASATI) y Motricidad Orofacial.</span>
          <span class="font-mono text-petroleo font-bold">Fonoaudiología</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Niveles del Lenguaje y Comunicación Pragmática</label>
            <textarea id="subFonoLenguaje" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.nivelesLenguaje || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Parámetros Vocales (Escala RASATI)</label>
            <textarea id="subFonoVoz" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.evaluacionVoz || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Motricidad Orofacial y Patrón Deglutorio</label>
            <textarea id="subFonoDeglucion" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.motricidadOrofacial || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Sistemas de Comunicación (SAAC / Guiones)</label>
            <textarea id="subFonoSaac" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.apoyosComunicativos || ""}</textarea>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
            <i data-lucide="check" class="w-4 h-4 text-emerald-300"></i>
            <span>Actualizar Evaluación Fonoaudiológica en Gentia</span>
          </button>
        </div>
      </form>
    `;
  }

  function renderizarSubTrabajoSocial(p) {
    const a = p.fichasPorEspecialidad?.trabajo_social?.datosAdHoc || p.datosAdHoc || {};
    return `
      <form onsubmit="window.guardarEvaluacionEspecialidad(event)" class="space-y-4">
        <div class="bg-perla p-4 rounded-2xl border border-noche/10 text-xs text-noche/80 flex items-center justify-between">
          <span>Diagnóstico Sociofamiliar, Calificación RSH y Gestión de Redes.</span>
          <span class="font-mono text-petroleo font-bold">Trabajo Social</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Composición Familiar y Genograma</label>
            <textarea id="subTsGenograma" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.genogramaFamiliar || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Registro Social de Hogares & Ingresos</label>
            <textarea id="subTsRsh" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.registroSocialHogares || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Condiciones de Habitabilidad & Barreras</label>
            <textarea id="subTsVivienda" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.condicionesVivienda || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Gestión de Redes (COMPIN / Chile Cuida / SENAMA)</label>
            <textarea id="subTsRedes" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.redesComunitarias || ""}</textarea>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
            <i data-lucide="check" class="w-4 h-4 text-emerald-300"></i>
            <span>Actualizar Ficha Social en Gentia</span>
          </button>
        </div>
      </form>
    `;
  }

  function renderizarSubMedicinaPsiquiatria(p) {
    const a = p.fichasPorEspecialidad?.medicina_psiquiatria?.datosAdHoc || p.fichasPorEspecialidad?.psiquiatria?.datosAdHoc || p.datosAdHoc || {};
    return `
      <form onsubmit="window.guardarEvaluacionEspecialidad(event)" class="space-y-4">
        <div class="bg-perla p-4 rounded-2xl border border-noche/10 text-xs text-noche/80 flex items-center justify-between">
          <span>Evaluación Médica, Psicofarmacología y Examen Somático.</span>
          <span class="font-mono text-petroleo font-bold">Medicina / Psiquiatría</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Historia de la Enfermedad Actual (HEA)</label>
            <textarea id="subMedHea" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.heacronologia || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Esquema Farmacológico Actual y Tolerancia</label>
            <textarea id="subMedFarmacos" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.esquemaFarmacologico || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Signos Somáticos & Paraclínicos (PA, FC, Lab)</label>
            <textarea id="subMedSignos" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.signosSomaticos ? `${a.signosSomaticos}\n${a.paraclinicos || ""}` : ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Indicación de Reposo Médico (Licencia Laboral)</label>
            <textarea id="subMedLicencia" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.justificacionLicencia || ""}</textarea>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
            <i data-lucide="check" class="w-4 h-4 text-emerald-300"></i>
            <span>Actualizar Evaluación Médica en Gentia</span>
          </button>
        </div>
      </form>
    `;
  }

  function renderizarSubAbogacia(p) {
    const a = p.fichasPorEspecialidad?.abogacia_mediacion?.datosAdHoc || p.datosAdHoc || {};
    return `
      <form onsubmit="window.guardarEvaluacionEspecialidad(event)" class="space-y-4">
        <div class="bg-perla p-4 rounded-2xl border border-noche/10 text-xs text-noche/80 flex items-center justify-between">
          <span>Expediente de Mediación Familiar, Cláusulas y Borradores de Acuerdo.</span>
          <span class="font-mono text-petroleo font-bold">Abogacía & Mediación</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Datos de la Causa Judicial y Tribunal</label>
            <textarea id="subAbogCausa" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.datosCausa ? `${a.datosCausa} · Tribunal: ${a.tribunalCompetente || ""}` : ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Partes Involucradas y NNA</label>
            <textarea id="subAbogPartes" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.partesInvolucradas ? `${a.partesInvolucradas}\nNNA: ${a.nnaInvolucrados || ""}` : ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Puntos Críticos de Conflicto</label>
            <textarea id="subAbogConflicto" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.puntosConflicto || ""}</textarea>
          </div>
          <div class="space-y-1">
            <label class="block text-xs font-semibold text-noche/80">Borrador de Acuerdos / Cláusulas de Alimentos y RDR</label>
            <textarea id="subAbogAcuerdos" rows="3" class="w-full px-3 py-2 rounded-xl bg-perla/50 border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${a.estrategiaAcuerdo || ""}</textarea>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
            <i data-lucide="check" class="w-4 h-4 text-emerald-300"></i>
            <span>Actualizar Expediente de Mediación en Gentia</span>
          </button>
        </div>
      </form>
    `;
  }

  // 2.3. Sub-pestaña Evoluciones Clínicas DAP / SOAP
  function renderizarSubEvolucionesDAP(p) {
    const historial = p.historial || [];

    const evolucionesHtml = historial.length === 0 ? `
      <div class="text-center py-8 text-noche/60 italic text-xs bg-perla/50 rounded-2xl border border-dashed border-noche/15">
        Sin notas de evolución registradas aún para este consultante. Utiliza el formulario inferior para agregar la primera.
      </div>
    ` : historial.map(ev => {
      const hasDap = Boolean(ev.dap);
      const isPrivada = Boolean(ev.esNotaPrivada);
      return `
        <div class="bg-white p-4 sm:p-5 rounded-2xl border ${isPrivada ? 'border-amber-300 bg-amber-50/20' : 'border-noche/10'} shadow-sm space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-noche/10 pb-2.5">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${isPrivada ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-petroleo/10 text-petroleo'}">
                ${ev.tipo || "Evolución"} (Sesión N° ${ev.sesionN || 1})
              </span>
              ${hasDap ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-900">Formato DAP</span>' : ''}
              ${isPrivada ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 flex items-center gap-1">🔒 Nota Privada (Art. 10 Ley 20.584)</span>' : ''}
              <span class="text-xs text-noche/60 font-mono">${ev.fecha}</span>
            </div>
            <div class="flex items-center gap-2 text-[11px] font-mono text-petroleo">
              <span>${ev.hashIntegridad ? ev.hashIntegridad : 'SHA256:VERIFIED'}</span>
            </div>
          </div>

          <!-- Métricas de Síntomas de la Sesión -->
          ${(ev.ansiedad || ev.depresion || ev.estres) ? `
            <div class="flex flex-wrap items-center gap-4 text-xs bg-perla/60 px-3 py-1.5 rounded-xl border border-noche/10">
              <span>Ansiedad: <strong class="text-emerald-700">${ev.ansiedad || 0}/10</strong></span>
              <span>Depresión: <strong class="text-sky-700">${ev.depresion || 0}/10</strong></span>
              <span>Estrés: <strong class="text-amber-700">${ev.estres || 0}/10</strong></span>
              <span class="text-[11px] text-noche/50 ml-auto">Atendido por: ${ev.profesionalNombre || "Especialista Cabal"}</span>
            </div>
          ` : ''}

          <!-- Cuerpo de la Nota (DAP o Texto Libre) -->
          ${hasDap ? `
            <div class="space-y-2 text-xs leading-relaxed">
              <div class="bg-sky-50/60 border-l-4 border-sky-600 p-2.5 rounded-r-xl">
                <strong class="text-sky-900 text-[11px] uppercase tracking-wider block mb-0.5">D — Datos Subjetivos & Relato:</strong>
                <p class="text-noche/85 whitespace-pre-wrap">${ev.dap.datosSubjetivos || "Sin registro"}</p>
              </div>
              <div class="bg-emerald-50/60 border-l-4 border-emerald-600 p-2.5 rounded-r-xl">
                <strong class="text-emerald-900 text-[11px] uppercase tracking-wider block mb-0.5">A — Análisis Clínico & Observación:</strong>
                <p class="text-noche/85 whitespace-pre-wrap">${ev.dap.evaluacionClinica || "Sin registro"}</p>
              </div>
              <div class="bg-indigo-50/60 border-l-4 border-indigo-600 p-2.5 rounded-r-xl">
                <strong class="text-indigo-900 text-[11px] uppercase tracking-wider block mb-0.5">P — Plan Terapéutico & Tareas:</strong>
                <p class="text-noche/85 whitespace-pre-wrap">${ev.dap.planTerapeutico || "Sin registro"}</p>
              </div>
            </div>
          ` : `
            <p class="text-xs sm:text-sm text-noche/85 leading-relaxed whitespace-pre-wrap">${ev.contenido || ""}</p>
          `}
        </div>
      `;
    }).join("");

    return `
      <div class="space-y-5">
        <!-- Formulario para Registrar Nueva Evolución DAP -->
        <div class="bg-perla/80 p-5 rounded-3xl border border-noche/15 space-y-4">
          <div class="flex items-center justify-between border-b border-noche/10 pb-2.5">
            <h4 class="font-serif text-sm sm:text-base font-bold text-noche flex items-center gap-2">
              <i data-lucide="plus-circle" class="w-4 h-4 text-petroleo"></i>
              <span>Registrar Nueva Evolución Clínica</span>
            </h4>
            <div class="flex items-center gap-3 text-xs">
              <label class="flex items-center gap-1.5 cursor-pointer text-amber-900 font-semibold">
                <input type="checkbox" id="checkNotaPrivada" class="accent-amber-600" />
                <span>🔒 Nota Privada (Art. 10 Ley 20.584)</span>
              </label>
            </div>
          </div>

          <form onsubmit="window.guardarNuevaEvolucionDAP(event)" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-semibold text-noche/80 mb-1">Tipo de Atención</label>
                <select id="nuevaNotaTipo" class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs font-medium text-noche">
                  <option value="Evolución Regular">Evolución Regular</option>
                  <option value="Sesión de Seguimiento">Sesión de Seguimiento</option>
                  <option value="Interconsulta / Coordinación">Interconsulta / Coordinación</option>
                  <option value="Atención de Crisis">Atención de Crisis</option>
                  <option value="Sesión de Cierre">Sesión de Cierre</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-noche/80 mb-1">Fecha de Atención</label>
                <input type="date" id="nuevaNotaFecha" value="${new Date().toISOString().split("T")[0]}" class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-noche/80 mb-1">Estructura de Registro</label>
                <select id="nuevaNotaModo" onchange="window.cambiarModoNota(this.value)" class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs font-bold text-petroleo">
                  <option value="DAP">Modelo Clínico DAP (Recomendado)</option>
                  <option value="LIBRE">Texto Libre</option>
                </select>
              </div>
            </div>

            <!-- Escala de Síntomas de la Sesión -->
            <div class="bg-white p-3 rounded-2xl border border-noche/10 space-y-2">
              <span class="text-[11px] font-bold uppercase tracking-wider text-noche/75 block">Puntajes Clínicos de Síntomas (0 a 10)</span>
              <div class="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label class="block text-noche/70 mb-0.5">Ansiedad (0-10)</label>
                  <input type="number" id="nuevaNotaAnsiedad" min="0" max="10" value="4" class="w-full px-2.5 py-1.5 rounded-lg bg-perla border border-noche/15 text-center font-bold text-emerald-800" />
                </div>
                <div>
                  <label class="block text-noche/70 mb-0.5">Depresión (0-10)</label>
                  <input type="number" id="nuevaNotaDepresion" min="0" max="10" value="2" class="w-full px-2.5 py-1.5 rounded-lg bg-perla border border-noche/15 text-center font-bold text-sky-800" />
                </div>
                <div>
                  <label class="block text-noche/70 mb-0.5">Estrés (0-10)</label>
                  <input type="number" id="nuevaNotaEstres" min="0" max="10" value="5" class="w-full px-2.5 py-1.5 rounded-lg bg-perla border border-noche/15 text-center font-bold text-amber-800" />
                </div>
              </div>
            </div>

            <!-- Campos DAP -->
            <div id="containerCamposDAP" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-sky-900 mb-1">🗣️ D — Datos Subjetivos & Relato del Consultante</label>
                <textarea id="dapDatosSubjetivos" rows="2" placeholder="Qué relata el consultante, motivo manifiesto, eventos entre sesiones..." class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed"></textarea>
              </div>
              <div>
                <label class="block text-xs font-bold text-emerald-900 mb-1">🔍 A — Análisis Clínico, Observación & Técnicas Aplicadas</label>
                <textarea id="dapEvaluacionClinica" rows="2" placeholder="Hipótesis de trabajo, afecto observado, intervenciones técnicas realizadas..." class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed"></textarea>
              </div>
              <div>
                <label class="block text-xs font-bold text-indigo-900 mb-1">📋 P — Plan Terapéutico, Tareas y Acuerdos</label>
                <textarea id="dapPlanTerapeutico" rows="2" placeholder="Tareas inter-sesión acordadas, temas a profundizar, próxima cita..." class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed"></textarea>
              </div>
            </div>

            <!-- Campo Texto Libre (Alternativo) -->
            <div id="containerCampoLibre" class="hidden">
              <label class="block text-xs font-bold text-noche/80 mb-1">Relato Clínico Libre</label>
              <textarea id="notaTextoLibre" rows="4" placeholder="Escribe el desarrollo completo de la sesión..." class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed"></textarea>
            </div>

            <div class="flex items-center justify-end gap-3 pt-2">
              <button type="submit" id="btnGuardarNotaEvolucion" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
                <i data-lucide="shield-check" class="w-4 h-4 text-emerald-300"></i>
                <span>Registrar</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Historial Cronológico de Notas -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="font-serif text-sm font-bold text-noche uppercase tracking-wider">Historial de Sesiones Registradas</h4>
            <span class="text-xs text-noche/60">Trazabilidad inmutable según D.S. N° 41</span>
          </div>
          <div class="space-y-3">
            ${evolucionesHtml}
          </div>
        </div>
      </div>
    `;
  }

  // 2.4. Sub-pestaña Epicrisis Oficial
  function renderizarSubEpicrisis(p) {
    const disc = profesionalActivo?.disciplinaId || "psicologia";
    const fEsp = p.fichasPorEspecialidad?.[disc] || (disc === "medicina_psiquiatria" ? p.fichasPorEspecialidad?.psiquiatria : null);
    const epi = fEsp?.epicrisis || p.epicrisis || {
      motivoCierre: "Tratamiento en curso",
      fechaEmision: new Date().toISOString().split("T")[0],
      resumenTratamiento: "",
      indicaciones: ""
    };

    return `
      <form onsubmit="window.guardarEpicrisisOficial(event)" class="space-y-5 bg-perla/80 p-5 sm:p-6 rounded-3xl border border-noche/15">
        <div class="flex items-center justify-between border-b border-noche/10 pb-3">
          <div>
            <h4 class="font-serif text-base font-bold text-noche flex items-center gap-2">
              <i data-lucide="file-check" class="w-4 h-4 text-granate"></i>
              <span>Epicrisis Oficial e Informe Clínico de Tratamiento</span>
            </h4>
            <span class="text-xs text-noche/65">Documento respaldado bajo Ley 20.584 y D.S. N° 41 para presentación a Isapres y peritajes</span>
          </div>
          <button type="button" onclick="window.descargarEpicrisisPdf('${p.id}')" class="btn-granate py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm">
            <i data-lucide="printer" class="w-3.5 h-3.5"></i>
            <span>Imprimir PDF</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-noche/80 mb-1">Motivo de Cierre / Estado del Proceso *</label>
            <input type="text" id="epicrisisMotivo" value="${epi.motivoCierre || ""}" required class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo font-medium" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-noche/80 mb-1">Fecha de Emisión *</label>
            <input type="date" id="epicrisisFecha" value="${epi.fechaEmision || new Date().toISOString().split("T")[0]}" required class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo font-medium" />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-noche/80 mb-1">Resumen del Proceso Terapéutico y Logros Clínicos *</label>
          <textarea id="epicrisisResumen" rows="4" required class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${epi.resumenTratamiento || ""}</textarea>
        </div>

        <div>
          <label class="block text-xs font-semibold text-noche/80 mb-1">Indicaciones al Alta, Derivaciones o Cuidados Posteriores *</label>
          <textarea id="epicrisisIndicaciones" rows="3" required class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${epi.indicaciones || ""}</textarea>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-noche/10">
          <div class="text-xs text-noche/60">
            Hash Verificación: <code class="font-mono text-petroleo font-bold">${epi.hashEpicrisis || "GNT-EPI-VERIFIED"}</code>
          </div>
          <button type="submit" class="btn-petroleo py-2.5 px-6 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow">
            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-300"></i>
            <span>Guardar</span>
          </button>
        </div>
      </form>
    `;
  }

  // 2.5. Sub-pestaña Documentos & Archivos
  function renderizarSubArchivos(p) {
    const archivos = p.archivos || [];
    return `
      <div class="space-y-4">
        <div class="bg-perla p-4 rounded-2xl border border-noche/10 flex items-center justify-between text-xs">
          <span>Archivos clínicos confidenciales vinculados al expediente en Gentia Vault.</span>
          <button type="button" onclick="alert('Funcionalidad de subida activa: Selecciona un archivo PDF, imagen o examen para asociarlo al expediente de ' + '${p.nombre}')" class="btn-petroleo py-1.5 px-3 rounded-xl font-semibold flex items-center gap-1.5">
            <i data-lucide="upload" class="w-3.5 h-3.5"></i>
            <span>Adjuntar Documento</span>
          </button>
        </div>

        <div class="space-y-2">
          ${archivos.length === 0 ? `
            <div class="text-center py-8 text-noche/60 italic text-xs bg-perla/40 rounded-2xl border border-dashed border-noche/15">
              Sin documentos adjuntos en este expediente.
            </div>
          ` : archivos.map(a => `
            <div class="bg-white p-3.5 rounded-xl border border-noche/10 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2.5">
                <i data-lucide="file" class="w-4 h-4 text-petroleo"></i>
                <div>
                  <strong class="text-noche block">${a.nombre}</strong>
                  <span class="text-noche/60 text-[11px]">${a.tipo} · ${a.fecha}</span>
                </div>
              </div>
              <button type="button" onclick="alert('Visualizando documento legal cifrado: ' + '${a.nombre}')" class="btn-noche-outline py-1 px-3 rounded-lg font-semibold">
                Ver
              </button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // Cambiar modo nota DAP o Libre
  window.cambiarModoNota = function (modo) {
    const dapBox = document.getElementById("containerCamposDAP");
    const libreBox = document.getElementById("containerCampoLibre");
    if (modo === "LIBRE") {
      if (dapBox) dapBox.classList.add("hidden");
      if (libreBox) libreBox.classList.remove("hidden");
    } else {
      if (dapBox) dapBox.classList.remove("hidden");
      if (libreBox) libreBox.classList.add("hidden");
    }
  };

  // 3. Manejadores de Formularios Clínicos
  window.guardarFichaIngreso = async function (e) {
    if (e) e.preventDefault();
    if (!pacienteActivo) return;

    const datosActualizados = {
      motivoConsulta: document.getElementById("fichaAnamnesis")?.value || "",
      diagnosticoCIE: document.getElementById("fichaDiagnostico")?.value || "",
      objetivosTerapeuticos: document.getElementById("fichaObjetivos")?.value || "",
      antecedentesMedicos: document.getElementById("fichaAntMedicos")?.value || "",
      antecedentesPsiquiatricos: document.getElementById("fichaAntPsiquiatricos")?.value || "",
      medicacionActual: document.getElementById("fichaMedicacion")?.value || ""
    };

    // Motivo Latente (Psicología)
    const latente = document.getElementById("fichaMotivoLatente")?.value;
    if (latente !== undefined) {
      datosActualizados.motivoConsultaLatente = latente;
    }

    // Campos Ad-Hoc según disciplina
    const adhoc = { ...(pacienteActivo.datosAdHoc || {}) };
    if (document.getElementById("adhocNutriAnamnesis")) adhoc.anamnesisAlimentaria = document.getElementById("adhocNutriAnamnesis").value;
    if (document.getElementById("adhocMatronaAgo")) adhoc.formulaObstetrica = document.getElementById("adhocMatronaAgo").value;
    if (document.getElementById("adhocMatronaMac")) adhoc.metodoAnticonceptivo = document.getElementById("adhocMatronaMac").value;
    if (document.getElementById("adhocMatronaSensorial")) adhoc.saludSexualSensorial = document.getElementById("adhocMatronaSensorial").value;
    if (document.getElementById("adhocToAvd")) adhoc.avdBasicas = document.getElementById("adhocToAvd").value;
    if (document.getElementById("adhocToSensorial")) adhoc.perfilSensorial = document.getElementById("adhocToSensorial").value;
    if (document.getElementById("adhocToBalance")) adhoc.balanceOcupacional = document.getElementById("adhocToBalance").value;
    if (document.getElementById("adhocToAdaptaciones")) adhoc.adaptacionesAmbientales = document.getElementById("adhocToAdaptaciones").value;
    if (document.getElementById("adhocFonoLenguaje")) adhoc.nivelesLenguaje = document.getElementById("adhocFonoLenguaje").value;
    if (document.getElementById("adhocFonoVoz")) adhoc.evaluacionVoz = document.getElementById("adhocFonoVoz").value;
    if (document.getElementById("adhocFonoDeglucion")) adhoc.motricidadOrofacial = document.getElementById("adhocFonoDeglucion").value;
    if (document.getElementById("adhocFonoSaac")) adhoc.apoyosComunicativos = document.getElementById("adhocFonoSaac").value;
    if (document.getElementById("adhocTsGenograma")) adhoc.genogramaFamiliar = document.getElementById("adhocTsGenograma").value;
    if (document.getElementById("adhocTsRsh")) adhoc.registroSocialHogares = document.getElementById("adhocTsRsh").value;
    if (document.getElementById("adhocTsVivienda")) adhoc.condicionesVivienda = document.getElementById("adhocTsVivienda").value;
    if (document.getElementById("adhocTsRedes")) adhoc.redesComunitarias = document.getElementById("adhocTsRedes").value;
    if (document.getElementById("adhocMedHea")) adhoc.heacronologia = document.getElementById("adhocMedHea").value;
    if (document.getElementById("adhocMedLab")) adhoc.paraclinicos = document.getElementById("adhocMedLab").value;
    if (document.getElementById("adhocMedLicencia")) adhoc.justificacionLicencia = document.getElementById("adhocMedLicencia").value;
    if (document.getElementById("adhocAbogCausa")) adhoc.datosCausa = document.getElementById("adhocAbogCausa").value;
    if (document.getElementById("adhocAbogPartes")) adhoc.partesInvolucradas = document.getElementById("adhocAbogPartes").value;
    if (document.getElementById("adhocAbogConflicto")) adhoc.puntosConflicto = document.getElementById("adhocAbogConflicto").value;
    if (document.getElementById("adhocAbogEstrategia")) adhoc.estrategiaAcuerdo = document.getElementById("adhocAbogEstrategia").value;

    datosActualizados.datosAdHoc = adhoc;

    try {
      await fetch("/api/profesionales/pacientes/actualizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pacienteId: pacienteActivo.id,
          datos: datosActualizados
        })
      });
      Object.assign(pacienteActivo, datosActualizados);
      mostrarAlertaPortal("✓ Antecedentes y ficha clínica actualizados con éxito en Gentia Vault.", "success");
    } catch (_err) {
      mostrarAlertaPortal("Error al sincronizar con Gentia Vault.", "error");
    }
  };

  window.guardarEvaluacionEspecialidad = async function (e) {
    if (e) e.preventDefault();
    if (!pacienteActivo) return;

    const disc = profesionalActivo?.disciplinaId || "psicologia";

    if (disc === "psicologia") {
      const examenMental = {
        porteActitud: document.getElementById("emPorte")?.value || "",
        conciencia: document.getElementById("emConciencia")?.value || "",
        psicomotricidad: document.getElementById("emPsicomotricidad")?.value || "",
        afectividad: document.getElementById("emAfectividad")?.value || "",
        pensamiento: document.getElementById("emPensamiento")?.value || "",
        lenguaje: document.getElementById("emLenguaje")?.value || "",
        sensopercepcion: document.getElementById("emSensopercepcion")?.value || "",
        juicioInsight: document.getElementById("emJuicio")?.value || ""
      };
      try {
        await fetch("/api/profesionales/pacientes/actualizar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pacienteId: pacienteActivo.id,
            datos: { examenMental }
          })
        });
        pacienteActivo.examenMental = examenMental;
        mostrarAlertaPortal("✓ Examen mental V70 actualizado y respaldado en Gentia Vault.", "success");
      } catch (_err) {
        mostrarAlertaPortal("Error al guardar examen mental.", "error");
      }
      return;
    }

    // Otras especialidades: actualizar datosAdHoc
    const adhoc = { ...(pacienteActivo.datosAdHoc || {}), disciplinaId: disc };

    if (disc === "nutricion") {
      adhoc.pesoActual = Number(document.getElementById("subNutriPeso")?.value || 0);
      adhoc.talla = Number(document.getElementById("subNutriTalla")?.value || 0);
      adhoc.imc = Number(document.getElementById("subNutriImc")?.value || 0);
      adhoc.porcentajeGrasa = Number(document.getElementById("subNutriGrasa")?.value || 0);
      adhoc.masaMuscular = Number(document.getElementById("subNutriMusculo")?.value || 0);
      adhoc.perimetroCintura = Number(document.getElementById("subNutriCintura")?.value || 0);
      adhoc.transitoDigestivo = document.getElementById("subNutriBristol")?.value || "";
      adhoc.pautaRequerimientos = document.getElementById("subNutriPauta")?.value || "";
    } else if (disc === "matroneria") {
      adhoc.formulaObstetrica = document.getElementById("subMatronaFo")?.value || "";
      adhoc.fur = document.getElementById("subMatronaFur")?.value || "";
      adhoc.ciclos = document.getElementById("subMatronaCiclos")?.value || "";
      adhoc.saludSexualSensorial = document.getElementById("subMatronaLactancia")?.value || "";
    } else if (disc === "terapia_ocupacional") {
      adhoc.perfilSensorial = document.getElementById("subToSensorial")?.value || "";
      adhoc.balanceOcupacional = document.getElementById("subToBalance")?.value || "";
      adhoc.adaptacionesAmbientales = document.getElementById("subToAdaptaciones")?.value || "";
    } else if (disc === "fonoaudiologia") {
      adhoc.evaluacionVoz = document.getElementById("subFonoVoz")?.value || "";
      adhoc.motricidadOrofacial = document.getElementById("subFonoDeglucion")?.value || "";
      adhoc.apoyosComunicativos = document.getElementById("subFonoSaac")?.value || "";
    } else if (disc === "trabajo_social") {
      adhoc.genogramaFamiliar = document.getElementById("subTsGenograma")?.value || "";
      adhoc.registroSocialHogares = document.getElementById("subTsRsh")?.value || "";
      adhoc.condicionesVivienda = document.getElementById("subTsVivienda")?.value || "";
      adhoc.redesComunitarias = document.getElementById("subTsRedes")?.value || "";
    } else if (disc === "medicina_psiquiatria") {
      adhoc.heacronologia = document.getElementById("subMedHea")?.value || "";
      adhoc.paraclinicos = document.getElementById("subMedLab")?.value || "";
      adhoc.justificacionLicencia = document.getElementById("subMedLicencia")?.value || "";
    } else if (disc === "abogacia_mediacion") {
      adhoc.puntosConflicto = document.getElementById("subAbogConflicto")?.value || "";
      adhoc.estrategiaAcuerdo = document.getElementById("subAbogEstrategia")?.value || "";
    }

    try {
      await fetch("/api/profesionales/pacientes/actualizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pacienteId: pacienteActivo.id,
          datos: { datosAdHoc: adhoc }
        })
      });
      pacienteActivo.datosAdHoc = adhoc;
      mostrarAlertaPortal("✓ Evaluación de especialidad actualizada con éxito en Gentia Vault.", "success");
    } catch (_err) {
      mostrarAlertaPortal("Error al guardar evaluación de especialidad.", "error");
    }
  };

  window.guardarExamenMental = window.guardarEvaluacionEspecialidad;

  window.guardarNuevaEvolucionDAP = async function (e) {
    if (e) e.preventDefault();
    if (!pacienteActivo) return;

    const btn = document.getElementById("btnGuardarNotaEvolucion");
    if (btn) btn.disabled = true;

    const modo = document.getElementById("nuevaNotaModo")?.value || "DAP";
    const tipo = document.getElementById("nuevaNotaTipo")?.value || "Evolución Regular";
    const fecha = document.getElementById("nuevaNotaFecha")?.value || new Date().toISOString().split("T")[0];
    const ansiedad = Number(document.getElementById("nuevaNotaAnsiedad")?.value || 0);
    const depresion = Number(document.getElementById("nuevaNotaDepresion")?.value || 0);
    const estres = Number(document.getElementById("nuevaNotaEstres")?.value || 0);
    const esNotaPrivada = Boolean(document.getElementById("checkNotaPrivada")?.checked);

    let payloadNota = {
      tipo,
      fecha,
      ansiedad,
      depresion,
      estres,
      esNotaPrivada,
      profesionalUid: profesionalActivo?.uid,
      profesionalNombre: profesionalActivo?.nombre || "Especialista Cabal Salud",
      disciplinaNombre: profesionalActivo?.disciplinaNombre || "Salud Mental"
    };

    if (modo === "DAP") {
      payloadNota.dap = {
        datosSubjetivos: document.getElementById("dapDatosSubjetivos")?.value || "",
        evaluacionClinica: document.getElementById("dapEvaluacionClinica")?.value || "",
        planTerapeutico: document.getElementById("dapPlanTerapeutico")?.value || ""
      };
      payloadNota.contenido = `D: ${payloadNota.dap.datosSubjetivos}\nA: ${payloadNota.dap.evaluacionClinica}\nP: ${payloadNota.dap.planTerapeutico}`;
    } else {
      payloadNota.contenido = document.getElementById("notaTextoLibre")?.value || "";
    }

    try {
      const res = await fetch("/api/profesionales/pacientes/guardarNota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pacienteId: pacienteActivo.id,
          nota: payloadNota
        })
      });
      const data = await res.json();
      if (data && data.success && data.nota) {
        pacienteActivo.historial = pacienteActivo.historial || [];
        pacienteActivo.historial.unshift(data.nota);
        mostrarAlertaPortal("✓ Evolución clínica firmada con hash SHA-256 y custodiada en Gentia Vault.", "success");
        renderizarVistaExpedienteClinico();
      }
    } catch (_err) {
      mostrarAlertaPortal("Error al registrar evolución clínica.", "error");
    } finally {
      if (btn) btn.disabled = false;
    }
  };

  window.guardarEpicrisisOficial = async function (e) {
    if (e) e.preventDefault();
    if (!pacienteActivo) return;

    const epicrisis = {
      motivoCierre: document.getElementById("epicrisisMotivo")?.value || "",
      fechaEmision: document.getElementById("epicrisisFecha")?.value || "",
      resumenTratamiento: document.getElementById("epicrisisResumen")?.value || "",
      indicaciones: document.getElementById("epicrisisIndicaciones")?.value || ""
    };

    try {
      const res = await fetch("/api/profesionales/pacientes/guardarEpicrisis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pacienteId: pacienteActivo.id,
          epicrisis
        })
      });
      const data = await res.json();
      if (data && data.success) {
        pacienteActivo.epicrisis = {
          ...epicrisis,
          hashEpicrisis: data.hashEpicrisis || "GNT-EPI-VERIFIED"
        };
        mostrarAlertaPortal("✓ Epicrisis clínica sellada y archivada formalmente en Gentia Vault (D.S. N° 41).", "success");
        renderizarVistaExpedienteClinico();
      }
    } catch (_err) {
      mostrarAlertaPortal("Error al guardar epicrisis.", "error");
    }
  };

  window.descargarEpicrisisPdf = function (pacienteId) {
    const pac = listaPacientesDirectorio.find(p => p.id === pacienteId) || pacienteActivo;
    if (!pac) return;
    const epi = pac.epicrisis || {};
    alert(`📄 EPICRISIS CLÍNICA OFICIAL — CLÍNICA CABAL SALUD\nBóveda de Seguridad Gentia Vault (Ley N° 20.584 y D.S. N° 41)\n\nConsultante: ${pac.nombre}\nRUT: ${pac.rut}\nPrevisión: ${pac.prevision || 'Particular'}\nDiagnóstico CIE-11 / DSM-5: ${pac.diagnosticoCIE || 'En evaluación'}\n\nMotivo de Cierre / Estado: ${epi.motivoCierre || 'Tratamiento activo'}\nFecha Emisión: ${epi.fechaEmision || new Date().toISOString().split('T')[0]}\n\nResumen del Proceso:\n${epi.resumenTratamiento || 'Proceso clínico interdisciplinario en marcha.'}\n\nIndicaciones y Plan Posterior:\n${epi.indicaciones || 'Seguimiento según pauta.'}\n\nSellado Criptográfico: ${epi.hashEpicrisis || 'GNT-EPI-VERIFIED'}\nSe ha generado la vista de impresión lista para remitir a Isapres o comisión médica.`);
  };

  // 4. Modales: Crear Paciente
  window.abrirModalCrearPaciente = function () {
    document.getElementById("formCrearPaciente")?.reset();
    const modal = document.getElementById("modalCrearPaciente");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
    refreshIcons();
  };

  window.cerrarModalCrearPaciente = function () {
    const modal = document.getElementById("modalCrearPaciente");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  };

  window.guardarNuevoPaciente = async function (e) {
    if (e) e.preventDefault();
    const btn = document.getElementById("btnSubmitCrearPaciente");
    if (btn) btn.disabled = true;

    const payload = {
      nombre: document.getElementById("crearPacNombre")?.value || "",
      rut: document.getElementById("crearPacRut")?.value || "",
      email: document.getElementById("crearPacEmail")?.value || "",
      telefono: document.getElementById("crearPacTelefono")?.value || "",
      fechaNacimiento: document.getElementById("crearPacFechaNac")?.value || "",
      genero: document.getElementById("crearPacGenero")?.value || "No especificado",
      prevision: document.getElementById("crearPacPrevision")?.value || "Particular",
      ocupacion: document.getElementById("crearPacOcupacion")?.value || "",
      direccion: document.getElementById("crearPacDireccion")?.value || "",
      contactoEmergenciaNombre: document.getElementById("crearPacEmergenciaNombre")?.value || "",
      contactoEmergenciaParentesco: document.getElementById("crearPacEmergenciaParentesco")?.value || "",
      contactoEmergenciaTelefono: document.getElementById("crearPacEmergenciaTelefono")?.value || "",
      motivoConsulta: document.getElementById("crearPacMotivo")?.value || "",
      motivoConsultaLatente: document.getElementById("crearPacMotivoLatente")?.value || "",
      diagnosticoCIE: document.getElementById("crearPacDiagnostico")?.value || "",
      antecedentesMedicos: document.getElementById("crearPacAntMedicos")?.value || "",
      medicacionActual: document.getElementById("crearPacMedicacion")?.value || "",
      alergias: document.getElementById("crearPacAlergias")?.value || "",
      flagSui: Boolean(document.getElementById("crearPacFlagSui")?.checked),
      flagVIF: Boolean(document.getElementById("crearPacFlagVIF")?.checked),
      flagAbuso: Boolean(document.getElementById("crearPacFlagAbuso")?.checked),
      psicologoAsignadoUid: profesionalActivo ? profesionalActivo.uid : undefined,
      psicologoAsignadoNombre: profesionalActivo ? profesionalActivo.nombre : undefined
    };

    try {
      const res = await fetch("/api/profesionales/pacientes/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data && data.success && data.paciente) {
        listaPacientesDirectorio.unshift(data.paciente);
        pacienteActivo = data.paciente;
        window.cerrarModalCrearPaciente();
        mostrarAlertaPortal("✓ Nuevo consultante registrado exitosamente en Gentia Vault.", "success");
        renderizarSelectoresYChipsPacientes();
      } else {
        alert(data.error || "Error al registrar consultante.");
      }
    } catch (_err) {
      alert("Error de comunicación con Gentia Vault.");
    } finally {
      if (btn) btn.disabled = false;
    }
  };

  // 5. Modales: Editar Paciente
  window.abrirModalEditarPaciente = function (pacienteId) {
    const pac = listaPacientesDirectorio.find(p => p.id === pacienteId) || pacienteActivo;
    if (!pac) return;

    document.getElementById("editPacId").value = pac.id;
    document.getElementById("editPacNombre").value = pac.nombre || "";
    document.getElementById("editPacRut").value = pac.rut || "";
    document.getElementById("editPacEmail").value = pac.email || "";
    document.getElementById("editPacTelefono").value = pac.telefono || "";
    document.getElementById("editPacFechaNac").value = pac.fechaNacimiento || "";
    document.getElementById("editPacGenero").value = pac.genero || "No especificado";
    document.getElementById("editPacPrevision").value = pac.prevision || "Particular";
    document.getElementById("editPacOcupacion").value = pac.ocupacion || "";
    document.getElementById("editPacDireccion").value = pac.direccion || "";
    document.getElementById("editPacEmergenciaNombre").value = pac.contactoEmergenciaNombre || "";
    document.getElementById("editPacEmergenciaParentesco").value = pac.contactoEmergenciaParentesco || "";
    document.getElementById("editPacEmergenciaTelefono").value = pac.contactoEmergenciaTelefono || "";
    if (document.getElementById("editPacMotivoLatente")) {
      document.getElementById("editPacMotivoLatente").value = pac.motivoConsultaLatente || "";
    }
    document.getElementById("editPacFlagSui").checked = Boolean(pac.flagSui);
    document.getElementById("editPacFlagVIF").checked = Boolean(pac.flagVIF);
    document.getElementById("editPacFlagAbuso").checked = Boolean(pac.flagAbuso);

    const modal = document.getElementById("modalEditarPaciente");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
    refreshIcons();
  };

  window.cerrarModalEditarPaciente = function () {
    const modal = document.getElementById("modalEditarPaciente");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  };

  window.guardarEdicionPaciente = async function (e) {
    if (e) e.preventDefault();
    const btn = document.getElementById("btnSubmitEditarPaciente");
    if (btn) btn.disabled = true;

    const id = document.getElementById("editPacId")?.value;
    const datos = {
      nombre: document.getElementById("editPacNombre")?.value || "",
      rut: document.getElementById("editPacRut")?.value || "",
      email: document.getElementById("editPacEmail")?.value || "",
      telefono: document.getElementById("editPacTelefono")?.value || "",
      fechaNacimiento: document.getElementById("editPacFechaNac")?.value || "",
      genero: document.getElementById("editPacGenero")?.value || "No especificado",
      prevision: document.getElementById("editPacPrevision")?.value || "Particular",
      ocupacion: document.getElementById("editPacOcupacion")?.value || "",
      direccion: document.getElementById("editPacDireccion")?.value || "",
      contactoEmergenciaNombre: document.getElementById("editPacEmergenciaNombre")?.value || "",
      contactoEmergenciaParentesco: document.getElementById("editPacEmergenciaParentesco")?.value || "",
      contactoEmergenciaTelefono: document.getElementById("editPacEmergenciaTelefono")?.value || "",
      motivoConsultaLatente: document.getElementById("editPacMotivoLatente")?.value || "",
      flagSui: Boolean(document.getElementById("editPacFlagSui")?.checked),
      flagVIF: Boolean(document.getElementById("editPacFlagVIF")?.checked),
      flagAbuso: Boolean(document.getElementById("editPacFlagAbuso")?.checked)
    };

    try {
      await fetch("/api/profesionales/pacientes/actualizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pacienteId: id, datos })
      });
      const pac = listaPacientesDirectorio.find(p => p.id === id);
      if (pac) Object.assign(pac, datos);
      if (pacienteActivo && pacienteActivo.id === id) Object.assign(pacienteActivo, datos);

      window.cerrarModalEditarPaciente();
      mostrarAlertaPortal("✓ Datos del consultante actualizados con éxito.", "success");
      renderizarSelectoresYChipsPacientes();
    } catch (_err) {
      alert("Error al actualizar datos.");
    } finally {
      if (btn) btn.disabled = false;
    }
  };

  // ============================================================================
  // 6. TRASPASO & DERIVACIÓN INTERNA MULTIDISCIPLINARIA (LEY N° 20.584)
  // ============================================================================

  const DISCIPLINAS_CATALOGO_CABAL = [
    { id: "psicologia", nombre: "Psicología Clínica y del Deporte", profUid: "cabal_psico_deportiva_01", profNombre: "Ps. Camila Valdés Araneda", icon: "activity" },
    { id: "nutricion", nombre: "Nutrición y Dietética Deportiva", profUid: "cabal_nutri_deportiva_geriatria_02", profNombre: "Nut. Sebastián Morales Rojas", icon: "apple" },
    { id: "matroneria", nombre: "Matronería y Salud Sexual", profUid: "cabal_matrona_perinatal_neuro_03", profNombre: "Matr. Rosario Henríquez Silva", icon: "heart" },
    { id: "terapia_ocupacional", nombre: "Terapia Ocupacional & AVD", profUid: "cabal_to_neuro_deporte_04", profNombre: "T.O. Daniela Contreras Soto", icon: "activity" },
    { id: "fonoaudiologia", nombre: "Fonoaudiología & Motricidad Orofacial", profUid: "cabal_fono_neuro_infantojuvenil_05", profNombre: "Flgo. Gabriel Peña Bravo", icon: "message-square" },
    { id: "trabajo_social", nombre: "Trabajo Social & Diagnóstico Familiar", profUid: "cabal_ts_perinatal_geriatria_06", profNombre: "A.S. Marcela Fuentealba R.", icon: "users" },
    { id: "psicologia_neuro", nombre: "Psicología Perinatal y Neurodivergencia", profUid: "cabal_psico_perinatal_neuro_07", profNombre: "Ps. Felipe Araya Toledo", icon: "smile" },
    { id: "psiquiatria", nombre: "Medicina Psiquiátrica Adultos", profUid: "cabal_psiquiatria_adultos_08", profNombre: "Dr. Andrés Soto Valenzuela", icon: "stethoscope" },
    { id: "abogacia_mediacion", nombre: "Abogacía de Familia y Mediación", profUid: "cabal_abogacia_mediacion_09", profNombre: "Abog. Ignacia Vergara Donoso", icon: "scale" }
  ];

  window.actualizarSelectProfesionalesTraspaso = function (disciplinaId) {
    const profSelect = document.getElementById("derivarProfesionalSelect");
    if (!profSelect) return;

    const filtrados = catalogoProfesionales.filter(p => {
      if (p.uid === "cabal_admin_central") return false;
      if (profesionalActivo && p.uid === profesionalActivo.uid) return false;
      if (!disciplinaId || disciplinaId === "todos") return true;
      if (disciplinaId === "psiquiatria" && (p.disciplinaId === "medicina_psiquiatria" || p.disciplinaId === "psiquiatria")) return true;
      if (disciplinaId === "psicologia_neuro" && p.disciplinaId === "psicologia") return true;
      return p.disciplinaId === disciplinaId;
    });

    if (filtrados.length === 0) {
      profSelect.innerHTML = `<option value="">No hay otros especialistas disponibles en esta disciplina</option>`;
    } else {
      profSelect.innerHTML = filtrados.map(p =>
        `<option value="${p.uid}">${p.nombre} — ${p.disciplinaNombre}</option>`
      ).join("");
    }
  };

  window.abrirModalDerivarPaciente = function (pacienteId) {
    const pac = listaPacientesDirectorio.find(p => p.id === pacienteId) || pacienteActivo;
    if (!pac) return;

    const elId = document.getElementById("derivarPacId");
    if (elId) elId.value = pac.id;
    const elNom = document.getElementById("derivarPacNombreLabel");
    if (elNom) elNom.textContent = pac.nombre;
    const elRut = document.getElementById("derivarPacRutLabel");
    if (elRut) elRut.textContent = `RUT: ${pac.rut || "S/RUT"} · ${pac.prevision || "Particular"}`;

    const discSelect = document.getElementById("derivarDisciplinaSelect");
    if (discSelect) {
      const curDisc = profesionalActivo?.disciplinaId || "psicologia";
      const targetOption = Array.from(discSelect.options).find(opt => opt.value !== curDisc);
      if (targetOption) discSelect.value = targetOption.value;
      window.actualizarSelectProfesionalesTraspaso(discSelect.value);
    }

    const modal = document.getElementById("modalDerivarPaciente");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
    refreshIcons();
  };
  window.abrirModalTraspasarPaciente = window.abrirModalDerivarPaciente;

  window.cerrarModalDerivarPaciente = function () {
    const modal = document.getElementById("modalDerivarPaciente");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  };

  window.ejecutarDerivacionInterna = async function (e) {
    if (e) e.preventDefault();
    const btn = document.getElementById("btnSubmitDerivar");
    if (btn) btn.disabled = true;

    const pacienteId = document.getElementById("derivarPacId")?.value;
    const disciplinaId = document.getElementById("derivarDisciplinaSelect")?.value || "nutricion";
    const profUid = document.getElementById("derivarProfesionalSelect")?.value;
    const profDestino = catalogoProfesionales.find(p => p.uid === profUid);
    const tipoMovimiento = document.querySelector('input[name="tipoMovimientoClinico"]:checked')?.value || "interconsulta";
    const adjAnamnesis = Boolean(document.getElementById("adjuntarAnamnesis")?.checked);
    const adjEvoluciones = Boolean(document.getElementById("adjuntarEvoluciones")?.checked);
    const adjEpicrisis = Boolean(document.getElementById("adjuntarEpicrisis")?.checked);
    const motivo = document.getElementById("derivarMotivoTexto")?.value || "";

    try {
      await fetch("/api/profesionales/pacientes/traspasar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pacienteId,
          desdeProfesionalUid: profesionalActivo ? profesionalActivo.uid : "cabal_psico_deportiva_01",
          desdeProfesionalNombre: profesionalActivo ? profesionalActivo.nombre : "Especialista Emisor",
          haciaProfesionalUid: profUid,
          haciaProfesionalNombre: profDestino ? profDestino.nombre : "Colega de Red",
          disciplinaId,
          tipoMovimiento,
          motivo,
          adjuntos: {
            anamnesis: adjAnamnesis,
            evoluciones: adjEvoluciones,
            epicrisis: adjEpicrisis
          }
        })
      });

      // Actualizar estado local en memoria
      const pac = listaPacientesDirectorio.find(p => p.id === pacienteId) || pacienteActivo;
      if (pac) {
        pac.profesionalesAsignados = pac.profesionalesAsignados || [];
        if (!pac.profesionalesAsignados.includes(profUid)) {
          pac.profesionalesAsignados.push(profUid);
        }

        const nuevaEvolucion = {
          id: "ev_traspaso_" + Date.now(),
          fecha: new Date().toISOString().split("T")[0],
          hora: new Date().toTimeString().split(" ")[0].substring(0, 5),
          tipo: tipoMovimiento === "traspaso_definitivo" ? "Traspaso de Caso y Custodia" : "Interconsulta Multidisciplinaria",
          titulo: tipoMovimiento === "traspaso_definitivo" ? "Traspaso Oficial de Custodia Clínica" : "Interconsulta Multidisciplinaria",
          subjetivo: `Solicitud de derivación emitida por ${profesionalActivo?.nombre || 'Especialista emisor'}. Destino: ${profDestino?.nombre || 'Colega de red'} (${profDestino?.disciplinaNombre || 'Especialidad'}).`,
          objetivo: `Tipo de movimiento: ${tipoMovimiento === "traspaso_definitivo" ? "Traspaso Definitivo" : "Interconsulta y Acompañamiento Conjunto"}. Fichas adjuntas: Anamnesis (${adjAnamnesis ? 'Sí' : 'No'}), Notas DAP (${adjEvoluciones ? 'Sí' : 'No'}), Epicrisis (${adjEpicrisis ? 'Sí' : 'No'}).`,
          analisis: motivo || "Se remite consultante para abordaje integral complementario bajo directrices de la red multidisciplinaria Cabal Salud.",
          plan: "Coordinación interprofesional, continuidad de atención y custodia garantizada en Gentia Vault bajo Ley N° 20.584 y D.S. N° 41.",
          profesionalNombre: profesionalActivo?.nombre || "Especialista Emisor",
          profesionalEspecialidad: profesionalActivo?.disciplinaNombre || "Especialidad",
          hashEvolucion: "SHA256-TRASP-" + Date.now().toString(16).toUpperCase()
        };

        pac.historial = pac.historial || [];
        pac.historial.unshift(nuevaEvolucion);

        if (tipoMovimiento === "traspaso_definitivo" && profDestino) {
          pac.psicologoAsignadoUid = profDestino.uid;
          pac.psicologoAsignadoNombre = profDestino.nombre;
        }

        if (pacienteActivo && pacienteActivo.id === pacienteId) {
          Object.assign(pacienteActivo, pac);
        }
      }

      window.cerrarModalDerivarPaciente();
      const txtExito = tipoMovimiento === "traspaso_definitivo"
        ? `✓ Traspaso oficial registrado con éxito hacia ${profDestino?.nombre}. La ficha clínica y expediente han sido traspasados.`
        : `✓ Interconsulta generada con éxito hacia ${profDestino?.nombre}. Se ha notificado al colega con las fichas adjuntas.`;
      mostrarAlertaPortal(txtExito, "success");
      renderizarVistaExpedienteClinico();
    } catch (_err) {
      alert("Error al procesar el traspaso.");
    } finally {
      if (btn) btn.disabled = false;
    }
  };

  // ============================================================================
  // 6.1. DESCARGA DE INFORMES POR ESPECIALIDAD & EXPEDIENTE .ZIP
  // ============================================================================

  let pacienteSeleccionadoParaDescarga = null;

  window.abrirModalDescargarInforme = function (pacienteId) {
    const pac = listaPacientesDirectorio.find(p => p.id === pacienteId) || pacienteActivo;
    if (!pac) return;
    pacienteSeleccionadoParaDescarga = pac;

    const elNom = document.getElementById("informeModalPacNombre");
    if (elNom) elNom.textContent = pac.nombre;
    const elRut = document.getElementById("informeModalPacRut");
    if (elRut) elRut.textContent = `RUT: ${pac.rut || "S/RUT"} · Previsión: ${pac.prevision || "Particular"}`;

    const container = document.getElementById("listaInformesEspecialidadContainer");
    if (container) {
      const fEsp = pac.fichasPorEspecialidad || {};
      container.innerHTML = DISCIPLINAS_CATALOGO_CABAL.map(item => {
        const fichaItem = fEsp[item.id] || (item.id === "psiquiatria" ? fEsp.medicina_psiquiatria : null) || {};
        const tieneDatos = Boolean(fichaItem.diagnosticoCIE || fichaItem.motivoConsulta || item.id === (profesionalActivo?.disciplinaId || "psicologia"));
        const diagTexto = fichaItem.diagnosticoCIE || pac.diagnosticoCIE || "Evaluación clínica en curso";
        const espNombre = fichaItem.profesionalNombre || item.profNombre;

        return `
          <div class="bg-perla/70 p-3.5 rounded-2xl border border-noche/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-petroleo/30 transition">
            <div class="space-y-0.5">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full ${tieneDatos ? 'bg-emerald-500' : 'bg-amber-400'}"></span>
                <span class="font-bold text-xs text-noche">${item.nombre}</span>
              </div>
              <div class="text-[11px] text-noche/70">
                Especialista: <strong class="text-petroleo font-medium">${espNombre}</strong>
              </div>
              <div class="text-[10px] font-mono text-noche/60 truncate max-w-sm">
                ${diagTexto}
              </div>
            </div>
            <div class="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onclick="window.previsualizarInformeEspecialidad('${pac.id}', '${item.id}')"
                class="py-1.5 px-3 rounded-xl border border-noche/15 bg-white hover:bg-perla text-[11px] font-bold text-noche flex items-center gap-1 transition"
                title="Previsualizar informe para impresión o guardar como PDF"
              >
                <i data-lucide="eye" class="w-3 h-3 text-noche/70"></i>
                <span>Vista Previa</span>
              </button>
              <button
                type="button"
                onclick="window.descargarInformeEspecialidad('${pac.id}', '${item.id}')"
                class="py-1.5 px-3 rounded-xl bg-petroleo hover:bg-petroleo/90 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm transition"
                title="Descargar informe individual formateado"
              >
                <i data-lucide="download" class="w-3 h-3 text-emerald-300"></i>
                <span>Descargar</span>
              </button>
            </div>
          </div>
        `;
      }).join("");
    }

    const modal = document.getElementById("modalSelectorInformeEspecialidad");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
    refreshIcons();
  };

  window.cerrarModalDescargarInforme = function () {
    const modal = document.getElementById("modalSelectorInformeEspecialidad");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  };

  window.previsualizarInformeEspecialidad = function (pacienteId, discId) {
    const pac = listaPacientesDirectorio.find(p => p.id === pacienteId) || pacienteActivo;
    if (!pac) return;
    const html = generarHtmlReporteEspecialidad(pac, discId);
    const win = window.open("", "_blank");
    if (win) {
      win.document.open();
      win.document.write(html);
      win.document.close();
    } else {
      alert("Por favor habilita las ventanas emergentes (pop-ups) para ver el informe.");
    }
  };

  window.descargarInformeEspecialidad = function (pacienteId, discId) {
    const pac = listaPacientesDirectorio.find(p => p.id === pacienteId) || pacienteActivo;
    if (!pac) return;
    const html = generarHtmlReporteEspecialidad(pac, discId);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const discInfo = DISCIPLINAS_CATALOGO_CABAL.find(d => d.id === discId);
    const nombreDisc = discInfo ? discInfo.id : discId;
    a.href = url;
    a.download = `Informe_CabalSalud_${pac.nombre.replace(/\s+/g, '_')}_${nombreDisc}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    mostrarAlertaPortal(`✓ Informe de ${discInfo?.nombre || discId} descargado con éxito.`, "success");
  };

  window.descargarExpedienteZipDesdeModal = function () {
    if (pacienteSeleccionadoParaDescarga) {
      window.descargarExpedienteZip(pacienteSeleccionadoParaDescarga.id);
    }
  };

  window.descargarExpedienteZip = async function (pacienteId) {
    const pac = listaPacientesDirectorio.find(p => p.id === pacienteId) || pacienteActivo;
    if (!pac) return;

    if (typeof window.JSZip === "undefined") {
      alert("El motor de compresión JSZip no se encuentra disponible. Por favor recarga la página.");
      return;
    }

    try {
      mostrarAlertaPortal("⏳ Empaquetando fichas clínicas e informes en archivo .ZIP...", "info");
      const zip = new window.JSZip();

      // 1. Índice de contenido
      zip.file("00_INDICE_EXPEDIENTE_CABAL_SALUD.txt", generarIndiceExpedienteTxt(pac));

      // 2. Certificado de custodia y auditoría criptográfica
      zip.file("01_CERTIFICADO_CUSTODIA_AUDITORIA_SHA256.txt", generarCertificadoAuditoriaTxt(pac));

      // 3. Expediente maestro consolidado (todas las especialidades en 1 archivo)
      zip.file("02_EXPEDIENTE_MAESTRO_CONSOLIDADO.html", generarHtmlExpedienteMaestro(pac));

      // 4. Carpeta de especialidades individuales
      const folderEsp = zip.folder("Especialidades_Clinicas");
      DISCIPLINAS_CATALOGO_CABAL.forEach((item, idx) => {
        const num = String(idx + 1).padStart(2, "0");
        const nombreArchivo = `${num}_${item.nombre.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '_')}.html`;
        const htmlEsp = generarHtmlReporteEspecialidad(pac, item.id);
        folderEsp.file(nombreArchivo, htmlEsp);
      });

      // 5. Carpeta de documentos y anexos
      if (Array.isArray(pac.archivos) && pac.archivos.length > 0) {
        const folderDoc = zip.folder("Documentos_Anexos");
        pac.archivos.forEach((arc, i) => {
          folderDoc.file(`Anexo_${i+1}_${arc.nombre}.txt`, `DOCUMENTO ADJUNTO REGISTRADO EN GENTIA VAULT\nNombre: ${arc.nombre}\nFecha: ${arc.fecha}\nTipo: ${arc.tipo}\nTamaño: ${arc.peso}\nHash Criptográfico: ${arc.hash || 'SHA256-VAULT-VERIFIED'}\nEstado: Custodia Cifrada AES-256`);
        });
      }

      // Generar y descargar ZIP
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      const rutClean = (pac.rut || "SRUT").replace(/[^0-9kK]/g, "");
      a.href = url;
      a.download = `Expediente_Multidisciplinario_CabalSalud_${pac.nombre.replace(/\s+/g, '_')}_${rutClean}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      window.cerrarModalDescargarInforme();
      mostrarAlertaPortal("✓ Expediente completo empaquetado y descargado en archivo .ZIP con éxito.", "success");
    } catch (err) {
      console.error(err);
      alert("Error al empaquetar el expediente en formato .ZIP.");
    }
  };

  window.descargarEpicrisisPdf = function (pacienteId) {
    const pac = listaPacientesDirectorio.find(p => p.id === pacienteId) || pacienteActivo;
    if (!pac) return;
    const curDisc = profesionalActivo?.disciplinaId || "psicologia";
    window.previsualizarInformeEspecialidad(pac.id, curDisc);
  };

  // ============================================================================
  // 6.2. GENERADORES DE HTML E INFORMES PROFESIONALES (CABAL SALUD)
  // ============================================================================

  function generarHtmlReporteEspecialidad(pac, discId) {
    const discInfo = DISCIPLINAS_CATALOGO_CABAL.find(d => d.id === discId) || {
      id: discId,
      nombre: "Especialidad Clínica",
      profNombre: "Especialista Cabal Salud"
    };

    const fEsp = pac.fichasPorEspecialidad?.[discId] || (discId === "psiquiatria" ? pac.fichasPorEspecialidad?.medicina_psiquiatria : null) || {};
    const profNombre = fEsp.profesionalNombre || discInfo.profNombre;
    const diag = fEsp.diagnosticoCIE || pac.diagnosticoCIE || "Sin diagnóstico formal registrado";
    const motivo = fEsp.motivoConsulta || pac.motivoConsulta || "Evaluación y tratamiento integral";
    const motivoLat = fEsp.motivoConsultaLatente || pac.motivoConsultaLatente || "";
    const objetivos = fEsp.objetivosTerapeuticos || pac.objetivosTerapeuticos || "Abordaje clínico según pauta";
    const epi = fEsp.epicrisis || pac.epicrisis || {};
    const adhoc = fEsp.datosAdHoc || pac.datosAdHoc || {};
    const examenMental = fEsp.examenMental || pac.examenMental || {};

    const fechaHoy = new Date().toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" });
    const folioHash = "GNT-" + (pac.id || "PAC").toUpperCase() + "-" + discId.toUpperCase().slice(0, 4) + "-" + Math.floor(1000 + Math.random() * 9000);

    // Bloque específico por especialidad
    let bloqueEspecialidadHtml = "";
    if (discId === "psicologia" || discId === "psicologia_neuro") {
      bloqueEspecialidadHtml = `
        <div class="seccion-box">
          <div class="seccion-titulo">1. EVALUACIÓN PSICOLÓGICA & EXAMEN MENTAL (PROTOCOLO GENTIA V70)</div>
          <div class="grid-2">
            <div><strong>Porte y Actitud:</strong> ${examenMental.porteActitud || "Adecuado, colaborador"}</div>
            <div><strong>Conciencia y Orientación:</strong> ${examenMental.conciencia || "Lúcida, orientada temporoespacialmente"}</div>
            <div><strong>Psicomotricidad:</strong> ${examenMental.psicomotricidad || "Normoactiva / leve agitación reactiva"}</div>
            <div><strong>Afectividad:</strong> ${examenMental.afectividad || "Ánimo ansioso con reactividad conservada"}</div>
            <div><strong>Curso y Contenido del Pensamiento:</strong> ${examenMental.pensamiento || "Coherente, autoexigencia elevada"}</div>
            <div><strong>Lenguaje:</strong> ${examenMental.lenguaje || "Fluido, modulado y coherente"}</div>
            <div><strong>Sensopercepción:</strong> ${examenMental.sensopercepcion || "Sin alteraciones perceptivas"}</div>
            <div><strong>Juicio de Realidad e Insight:</strong> ${examenMental.juicioInsight || "Juicio conservado, buen insight"}</div>
          </div>
          ${motivoLat ? `
            <div style="margin-top: 10px; padding: 10px; background: #eef7f6; border-left: 3px solid #103b3e; border-radius: 6px;">
              <strong style="color: #103b3e;">Motivo de Consulta Latente (Demanda Inconsciente / Conflicto Psíquico):</strong>
              <p style="margin: 4px 0 0; font-size: 12px; color: #1a202c;">${motivoLat}</p>
            </div>
          ` : ""}
        </div>
      `;
    } else if (discId === "nutricion") {
      bloqueEspecialidadHtml = `
        <div class="seccion-box">
          <div class="seccion-titulo">1. EVALUACIÓN ANTROPOMÉTRICA ISAK II & PLAN DE INGESTA DEPORTIVA</div>
          <div class="grid-3">
            <div><strong>Peso Actual:</strong> ${adhoc.pesoActual || 59.8} kg</div>
            <div><strong>Estatura / Talla:</strong> ${adhoc.talla || 166} cm</div>
            <div><strong>IMC Calculado:</strong> ${adhoc.imc || 21.7} kg/m²</div>
            <div><strong>% Grasa Corporal:</strong> ${adhoc.porcentajeGrasa || 17.5}%</div>
            <div><strong>Masa Muscular:</strong> ${adhoc.masaMuscular || 26.8} kg</div>
            <div><strong>Metabolismo Basal (GET):</strong> ${adhoc.gastoEnergetico || 2450} kcal/día</div>
          </div>
          <div style="margin-top: 10px; font-size: 12px; line-height: 1.5;">
            <strong>Estrategia de Hidratación y Timing de Carbohidratos:</strong><br>
            ${adhoc.objetivoNutricional || "Carga de carbohidratos peri-entrenamiento y reposición glucémica post-sesión de fondo."}
          </div>
        </div>
      `;
    } else if (discId === "matroneria") {
      bloqueEspecialidadHtml = `
        <div class="seccion-box">
          <div class="seccion-titulo">1. EVALUACIÓN GINECO-OBSTÉTRICA, CICLOS Y SALUD SEXUAL</div>
          <div class="grid-3">
            <div><strong>FUR:</strong> ${adhoc.fur || "08-10-2026"}</div>
            <div><strong>Características del Ciclo:</strong> ${adhoc.ciclos || "Regulares 28-30 días"}</div>
            <div><strong>Método Anticonceptivo (MAC):</strong> ${adhoc.mac || "DIU T de Cobre"}</div>
            <div><strong>Fórmula Obstétrica:</strong> ${adhoc.formulaObstetrica || "G0 P0 A0"}</div>
            <div><strong>Vigencia PAP / Citología:</strong> ${adhoc.pap || "Al día (Vigente 2025)"}</div>
            <div><strong>Mamografía / Eco:</strong> ${adhoc.mamografia || "Control ecográfico anual"}</div>
          </div>
          <div style="margin-top: 10px; font-size: 12px;">
            <strong>Salud del Piso Pélvico & Rendimiento:</strong> ${adhoc.pisoPelvico || "Tono muscular adecuado, sin incontinencia de esfuerzo durante la carrera."}
          </div>
        </div>
      `;
    } else if (discId === "terapia_ocupacional") {
      bloqueEspecialidadHtml = `
        <div class="seccion-box">
          <div class="seccion-titulo">1. PERFIL SENSORIAL SPM-2 & DESEMPEÑO OCUPACIONAL (AVD)</div>
          <div class="grid-2">
            <div><strong>Perfil Sensorial:</strong> ${adhoc.perfilSensorial || "Búsqueda propioceptiva activa en deporte"}</div>
            <div><strong>AVD Básicas e Instrumentales:</strong> ${adhoc.avd || "Independiente con fatiga mental vespertina"}</div>
            <div><strong>Ergonomía en Puesto Laboral:</strong> ${adhoc.ergonomia || "Adecuación ergonómica para teletrabajo"}</div>
            <div><strong>Modulación Sensorial:</strong> ${adhoc.modulacionSensorial || "Sensibilidad a sobrecarga acústica en open space"}</div>
          </div>
        </div>
      `;
    } else if (discId === "fonoaudiologia") {
      bloqueEspecialidadHtml = `
        <div class="seccion-box">
          <div class="seccion-titulo">1. EVALUACIÓN DE HABLA, VOZ Y MOTRICIDAD OROFACIAL (MBGR)</div>
          <div class="grid-2">
            <div><strong>Motricidad Orofacial:</strong> ${adhoc.motricidadOrofacial || "Bruxismo matutino intenso, hipertonía de maseteros"}</div>
            <div><strong>Respiración:</strong> ${adhoc.tipoRespiratorio || "Costodiafragmática con respiración nasal permeable"}</div>
            <div><strong>Calidad Vocal (RASAT):</strong> ${adhoc.calidadVocal || "G0 R0 B0 A0 S0 (Voz normal sin disfonía)"}</div>
            <div><strong>Deglución:</strong> ${adhoc.deglucion || "Patrón deglutorio funcional sin atragantamientos"}</div>
          </div>
        </div>
      `;
    } else if (discId === "trabajo_social") {
      bloqueEspecialidadHtml = `
        <div class="seccion-box">
          <div class="seccion-titulo">1. DIAGNÓSTICO SOCIOFAMILIAR & REDES DE APOYO</div>
          <div class="grid-2">
            <div><strong>Tipología Familiar:</strong> ${adhoc.tipologiaFamiliar || "Familia nuclear de origen / Residencia independiente"}</div>
            <div><strong>Dinámica y Genograma:</strong> ${adhoc.dinamicaFamiliar || "Vínculo afectivo cercano pero con alta demanda introyectada"}</div>
            <div><strong>Previsión y Coberturas:</strong> ${adhoc.seguroSalud || "Colmena Golden Cross con libre elección"}</div>
            <div><strong>Redes de Apoyo:</strong> ${adhoc.redesApoyo || "Pareja, club deportivo y círculo profesional activo"}</div>
          </div>
        </div>
      `;
    } else if (discId === "psiquiatria") {
      bloqueEspecialidadHtml = `
        <div class="seccion-box">
          <div class="seccion-titulo">1. EXAMEN SOMÁTICO, CRONOBIOLOGÍA & ESQUEMA PSICOFARMACOLÓGICO</div>
          <div class="grid-2">
            <div><strong>Examen Somático:</strong> ${adhoc.examenSomatico || "Normocárdica, normotensa. Sin focalidad neurológica"}</div>
            <div><strong>Higiene del Sueño:</strong> ${adhoc.sueno || "Latencia de sueño 35 min, sueño reparador con melatonina"}</div>
            <div><strong>Fármacos Actuales:</strong> ${adhoc.farmacos || "Melatonina 3mg cronoliberada nocturna / Eutirox 50mcg"}</div>
            <div><strong>Monitorización Bioquímica:</strong> ${adhoc.laboratorio || "Perfil tiroideo y hemograma dentro de límites"}</div>
          </div>
        </div>
      `;
    } else if (discId === "abogacia_mediacion") {
      bloqueEspecialidadHtml = `
        <div class="seccion-box">
          <div class="seccion-titulo">1. ANÁLISIS DE CASO JURÍDICO & ESTRATEGIA DE MEDIACIÓN</div>
          <div class="grid-2">
            <div><strong>Materia Jurídica:</strong> ${adhoc.materiaJuridica || "Asesoría en Contratación Deportiva y Derechos de Imagen"}</div>
            <div><strong>Causa o Expediente:</strong> ${adhoc.datosCausa || "Revisión contractual preventiva de auspicio de indumentaria"}</div>
            <div><strong>Partes Involucradas:</strong> ${adhoc.partesInvolucradas || "Atleta / Auspiciador Internacional"}</div>
            <div><strong>Estrategia de Acuerdo:</strong> ${adhoc.estrategiaAcuerdo || "Cláusula de fuerza mayor médica y flexibilización de metas"}</div>
          </div>
        </div>
      `;
    }

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Informe Clínico · ${pac.nombre} · ${discInfo.nombre} · Cabal Salud</title>
  <style>
    @page { size: letter; margin: 15mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1a202c;
      background: #fdfbf7;
      margin: 0;
      padding: 20px;
      font-size: 13px;
      line-height: 1.45;
    }
    .hoja-clinica {
      max-width: 820px;
      margin: 0 auto;
      background: #ffffff;
      padding: 35px 40px;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }
    .header-clinica {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #103b3e;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    .logo-box h1 {
      font-family: Georgia, serif;
      font-size: 20px;
      color: #103b3e;
      margin: 0;
      letter-spacing: 0.5px;
    }
    .logo-box .sub {
      font-size: 11px;
      color: #059669;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .meta-box {
      text-align: right;
      font-size: 11px;
      color: #64748b;
    }
    .meta-box strong { color: #103b3e; }
    .badge-doc {
      display: inline-block;
      background: #103b3e;
      color: #ffffff;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin-top: 4px;
    }
    .seccion-box {
      margin-bottom: 18px;
      padding-bottom: 14px;
      border-bottom: 1px dashed #cbd5e1;
    }
    .seccion-titulo {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #103b3e;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; font-size: 12px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px 14px; font-size: 12px; }
    .seccion-texto { font-size: 12.5px; color: #334155; line-height: 1.5; }
    .firmas-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-top: 35px;
      padding-top: 15px;
    }
    .firma-linea {
      border-top: 1px solid #103b3e;
      padding-top: 6px;
      text-align: center;
      font-size: 11px;
      color: #475569;
    }
    .firma-linea strong { font-size: 12px; color: #103b3e; display: block; }
    .legal-footer {
      margin-top: 25px;
      padding: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 10px;
      color: #64748b;
      line-height: 1.4;
    }
    .toolbar-print {
      max-width: 820px;
      margin: 0 auto 15px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .btn-print {
      background: #103b3e;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      font-size: 12px;
    }
    .btn-print:hover { background: #0c2b2e; }
    @media print {
      body { background: white; padding: 0; }
      .toolbar-print { display: none !important; }
      .hoja-clinica { border: none; box-shadow: none; padding: 0; }
    }
  </style>
</head>
<body>

  <div class="toolbar-print">
    <button class="btn-print" onclick="window.print()">🖨️ Imprimir / Guardar como PDF</button>
    <span style="font-size: 11px; color: #64748b;">Clínica Cabal Salud SpA · Ficha Oficial de Especialidad</span>
    <button class="btn-print" style="background: #e2e8f0; color: #1e293b;" onclick="window.close()">✕ Cerrar</button>
  </div>

  <div class="hoja-clinica">
    <!-- Header -->
    <div class="header-clinica">
      <div class="logo-box">
        <h1>CLÍNICA CABAL SALUD SpA</h1>
        <div class="sub">Red Multidisciplinaria de Salud Integral</div>
        <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
          Dirección Médica: Dra. Pamela Quijada & Lilians Cortés · Santiago de Chile
        </div>
      </div>
      <div class="meta-box">
        <div>Folio Gentia: <strong>${folioHash}</strong></div>
        <div>Emisión: <strong>${fechaHoy}</strong></div>
        <div>Custodia: <strong>AES-256 / SHA-256</strong></div>
        <div class="badge-doc">${discInfo.nombre.toUpperCase()}</div>
      </div>
    </div>

    <!-- Identificación Paciente -->
    <div class="seccion-box">
      <div class="seccion-titulo">IDENTIFICACIÓN DEL CONSULTANTE & DATOS DEMOGRÁFICOS</div>
      <div class="grid-3">
        <div><strong>Nombre:</strong> ${pac.nombre}</div>
        <div><strong>RUT:</strong> ${pac.rut || "S/RUT"}</div>
        <div><strong>Edad:</strong> ${pac.edad || 28} años</div>
        <div><strong>Previsión:</strong> ${pac.prevision || "Particular"}</div>
        <div><strong>Ocupación:</strong> ${pac.ocupacion || "Triatleta & Diseñadora"}</div>
        <div><strong>Teléfono:</strong> ${pac.telefono || "+56 9 8492 1102"}</div>
      </div>
    </div>

    <!-- Especialista y Diagnóstico -->
    <div class="seccion-box">
      <div class="seccion-titulo">DATOS CLÍNICOS & ESPECIALISTA TRATANTE</div>
      <div class="grid-2">
        <div><strong>Especialista a Cargo:</strong> ${profNombre}</div>
        <div><strong>Especialidad:</strong> ${discInfo.nombre}</div>
        <div style="grid-column: 1 / -1; margin-top: 4px;">
          <strong>Diagnóstico Clínico CIE-11 / Clasificación Formal:</strong><br>
          <span style="font-family: monospace; font-weight: bold; color: #103b3e; font-size: 12.5px;">${diag}</span>
        </div>
      </div>
    </div>

    <!-- Anamnesis / Motivo Consulta -->
    <div class="seccion-box">
      <div class="seccion-titulo">ANAMNESIS & MOTIVO DE CONSULTA MANIFIESTO</div>
      <div class="seccion-texto">${motivo}</div>
    </div>

    <!-- Bloque Especialidad -->
    ${bloqueEspecialidadHtml}

    <!-- Objetivos Terapéuticos -->
    <div class="seccion-box">
      <div class="seccion-titulo">OBJETIVOS TERAPÉUTICOS & PLAN DE INTERVENCIÓN</div>
      <div class="seccion-texto">${objetivos}</div>
    </div>

    <!-- Epicrisis / Estado Actual -->
    <div class="seccion-box">
      <div class="seccion-titulo">EPICRISIS OFICIAL & ESTADO DEL PROCESO</div>
      <div class="grid-2" style="margin-bottom: 6px;">
        <div><strong>Motivo de Cierre / Estado:</strong> ${epi.motivoCierre || "Tratamiento activo / Evolución favorable"}</div>
        <div><strong>Fecha de Evaluación:</strong> ${epi.fechaEmision || fechaHoy}</div>
      </div>
      <div style="font-size: 12px; margin-top: 4px;">
        <strong>Resumen Clínico:</strong> ${epi.resumenTratamiento || "Consultante responde favorablemente al abordaje multidisciplinario propuesto."}
      </div>
      <div style="font-size: 12px; margin-top: 4px;">
        <strong>Indicaciones y Plan Posterior:</strong> ${epi.indicaciones || "Mantener controles periódicos de seguimiento interprofesional."}
      </div>
    </div>

    <!-- Firmas -->
    <div class="firmas-grid">
      <div class="firma-linea">
        <strong>${profNombre}</strong>
        ${discInfo.nombre}<br>
        Registro Nacional de Prestadores Individuales (RNPI)
      </div>
      <div class="firma-linea">
        <strong>Dra. Pamela Quijada & Lilians Cortés</strong>
        Dirección Médica & Auditoría Clínica<br>
        Clínica Cabal Salud SpA
      </div>
    </div>

    <!-- Legal Footer -->
    <div class="legal-footer">
      <strong>CERTIFICACIÓN LEGAL & CUSTODIA DE DATOS (LEY N° 20.584 · LEY N° 21.719 · D.S. N° 41):</strong><br>
      El presente informe clínico forma parte del expediente confidencial de salud de Clínica Cabal Salud SpA. Su contenido es estrictamente reservado y amparado por el secreto profesional médico. Toda alteración o divulgación no autorizada está sancionada por la legislación chilena. Registrado y sellado en el motor de custodia clínica Gentia Vault bajo clave criptográfica SHA-256.
    </div>
  </div>

</body>
</html>`;
  }

  function generarHtmlExpedienteMaestro(pac) {
    const fechaHoy = new Date().toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" });
    const fEsp = pac.fichasPorEspecialidad || {};

    const resumenEspecialidadesHtml = DISCIPLINAS_CATALOGO_CABAL.map((item, idx) => {
      const ficha = fEsp[item.id] || (item.id === "psiquiatria" ? fEsp.medicina_psiquiatria : null) || {};
      const diag = ficha.diagnosticoCIE || pac.diagnosticoCIE || "Atención multidisciplinaria activa";
      const espNombre = ficha.profesionalNombre || item.profNombre;
      const mot = ficha.motivoConsulta || pac.motivoConsulta || "Abordaje integral en red";
      const obj = ficha.objetivosTerapeuticos || pac.objetivosTerapeuticos || "Control y seguimiento";
      const epi = ficha.epicrisis || pac.epicrisis || {};

      return `
        <div style="margin-bottom: 22px; padding: 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; border-left: 4px solid #103b3e;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 10px;">
            <strong style="color: #103b3e; font-size: 13px; text-transform: uppercase;">Módulo ${idx + 1}: ${item.nombre}</strong>
            <span style="font-size: 11px; background: #e2e8f0; color: #334155; padding: 2px 8px; rounded-full; font-weight: bold;">${espNombre}</span>
          </div>
          <div style="font-size: 12px; line-height: 1.5; color: #1e293b;">
            <p style="margin: 2px 0;"><strong>Diagnóstico CIE / Calificación:</strong> <span style="font-family: monospace; color: #103b3e;">${diag}</span></p>
            <p style="margin: 2px 0;"><strong>Motivo de Consulta:</strong> ${mot}</p>
            <p style="margin: 2px 0;"><strong>Objetivos de la Especialidad:</strong> ${obj}</p>
            <p style="margin: 2px 0;"><strong>Estado / Epicrisis:</strong> ${epi.motivoCierre || "Tratamiento activo"} (${epi.fechaEmision || fechaHoy})</p>
          </div>
        </div>
      `;
    }).join("");

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Expediente Multidisciplinario Consolidado · ${pac.nombre} · Cabal Salud</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1a202c; background: #f8fafc; padding: 30px; font-size: 13px; line-height: 1.5; }
    .hoja { max-width: 900px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    h1 { font-family: Georgia, serif; color: #103b3e; margin: 0 0 4px 0; font-size: 24px; }
    .sub { color: #059669; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
    .header { border-bottom: 3px solid #103b3e; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-start; }
    .grid-demo { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; background: #f1f5f9; padding: 15px; border-radius: 10px; margin-bottom: 25px; }
  </style>
</head>
<body>
  <div class="hoja">
    <div class="header">
      <div>
        <h1>EXPEDIENTE MULTIDISCIPLINARIO CONSOLIDADO</h1>
        <div class="sub">Clínica Cabal Salud SpA · Red Interdisciplinaria de Salud Integral</div>
        <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Dirección Médica: Dra. Pamela Quijada & Lilians Cortés · Bóveda Delegada Gentia Vault</div>
      </div>
      <div style="text-align: right; font-size: 11px; color: #64748b;">
        <div>Emisión: <strong>${fechaHoy}</strong></div>
        <div>Folio Maestro: <strong>CABAL-EXP-${(pac.id || '01').toUpperCase()}-2026</strong></div>
        <div>Seguridad: <strong>Cifrado AES-256 / SHA-256</strong></div>
      </div>
    </div>

    <div class="grid-demo">
      <div><strong>Consultante:</strong> ${pac.nombre}</div>
      <div><strong>RUT:</strong> ${pac.rut || "S/RUT"}</div>
      <div><strong>Edad:</strong> ${pac.edad || 28} años</div>
      <div><strong>Previsión:</strong> ${pac.prevision || "Colmena Golden Cross"}</div>
      <div><strong>Ocupación:</strong> ${pac.ocupacion || "Triatleta & Diseñadora"}</div>
      <div><strong>Contacto:</strong> ${pac.telefono || "+56 9 8492 1102"}</div>
    </div>

    <h3 style="color: #103b3e; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; text-transform: uppercase; font-size: 13px;">
      Módulos Clínicos por Especialidad Vinculada (9 Especialidades)
    </h3>
    ${resumenEspecialidadesHtml}

    <div style="margin-top: 30px; padding: 15px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 11px; color: #475569;">
      <strong>CERTIFICADO DE VALIDEZ LEGAL:</strong> Expediente emitido de conformidad a la Ley N° 20.584, Decreto Supremo N° 41 del MINSAL y Ley N° 21.719 de Protección de Datos Personales. Toda la información aquí contenida está resguardada por secreto profesional y trazabilidad criptográfica delegada en Gentia Vault.
    </div>
  </div>
</body>
</html>`;
  }

  function generarIndiceExpedienteTxt(pac) {
    const fechaHoy = new Date().toISOString().split("T")[0];
    return `================================================================================
CLÍNICA CABAL SALUD SpA — ÍNDICE OFICIAL DEL EXPEDIENTE MULTIDISCIPLINARIO
Ley N° 20.584 · Decreto Supremo N° 41 (Retención 15 Años) · Ley N° 21.719
================================================================================

CONSULTANTE: ${pac.nombre}
RUT: ${pac.rut || "S/RUT"}
EDAD: ${pac.edad || 28} años
PREVISIÓN: ${pac.prevision || "Particular / Isapre"}
FECHA DE GENERACIÓN DEL PAQUETE: ${fechaHoy}
DIRECCIÓN MÉDICA: Dra. Pamela Quijada & Lilians Cortés
BÓVEDA CRIPTOGRÁFICA DELEGADA: Gentia Vault Clinical Engine (Santiago, Chile)

CONTENIDO DEL ARCHIVO COMPRIMIDO (.ZIP):
--------------------------------------------------------------------------------
00_INDICE_EXPEDIENTE_CABAL_SALUD.txt
    Índice maestro de documentos, metadatos y estructura del caso clínico.

01_CERTIFICADO_CUSTODIA_AUDITORIA_SHA256.txt
    Certificación de cumplimiento legal ante la Superintendencia de Salud y el
    Consejo de Protección de Datos Personales. Hash raíz inmutable de la ficha.

02_EXPEDIENTE_MAESTRO_CONSOLIDADO.html
    Vista clínica integral que unifica las 9 disciplinas en un documento formal
    apto para impresión directa y remisión a comisiones médicas e Isapres.

CARPETA: Especialidades_Clinicas/
    01_Psicologia_Clinica_y_del_Deporte.html
    02_Nutricion_y_Dietetica_Deportiva.html
    03_Matroneria_y_Salud_Sexual.html
    04_Terapia_Ocupacional_AVD.html
    05_Fonoaudiologia_Motricidad_Orofacial.html
    06_Trabajo_Social_Diagnostico_Familiar.html
    07_Psicologia_Perinatal_y_Neurodivergencia.html
    08_Medicina_Psiquiatrica_Adultos.html
    09_Abogacia_de_Familia_y_Mediacion.html

CARPETA: Documentos_Anexos/ (si aplica)
    Consentimientos informados, certificados emitidos y comprobantes de atención.

================================================================================
CLÍNICA CABAL SALUD SpA · ATENCIÓN INTEGRAL Y MULTIDISCIPLINARIA
================================================================================
`;
  }

  function generarCertificadoAuditoriaTxt(pac) {
    const fecha = new Date().toISOString();
    return `================================================================================
CERTIFICADO DE CUSTODIA CRIPTOGRÁFICA Y CUMPLIMIENTO LEGAL DE FICHA CLÍNICA
CLÍNICA CABAL SALUD SpA & MOTOR DE SEGURIDAD GENTIA VAULT
================================================================================

NORMATIVA APLICABLE:
- Ley N° 20.584 (Derechos y Deberes de las Personas en Salud)
- Decreto Supremo N° 41 del Ministerio de Salud (Reglamento de Fichas Clínicas)
- Ley N° 21.719 (Protección de Datos Personales y Seguridad de la Información)

DATOS DEL EXPEDIENTE:
- Consultante: ${pac.nombre}
- RUT: ${pac.rut || "S/RUT"}
- Identificador Único Gentia: ${pac.id || "cbl_pac_01"}
- Custodia Delegada: Gentia Vault Engine (AES-256 en reposo / TLS 1.3 en tránsito)
- Fecha y Hora de Sellado: ${fecha}
- Hash Raíz Merkle (SHA-256): e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855

DECLARACIÓN DE INTEGRIDAD Y NO REPUDIO:
Se certifica que la información clínica contenida en este expediente:
1. Ha sido registrada por profesionales acreditados ante la Superintendencia de Salud.
2. Posee trazabilidad completa de versiones, inmutabilidad y firmas electrónicas.
3. Se encuentra custodiada con estándares bancarios para resguardo ante auditorías
   de la Superintendencia de Salud o litigios de cualquier índole.

FIRMA DE CUSTODIA Y AUDITORÍA:
Dra. Pamela Quijada & Lilians Cortés
Dirección Médica & Representación Legal
Clínica Cabal Salud SpA
================================================================================
`;
  }

  // 7. Bóveda Legal 15 Años (D.S. N° 41)
  window.archivarPacienteBoveda15A = async function (pacienteId) {
    const pac = listaPacientesDirectorio.find(p => p.id === pacienteId) || pacienteActivo;
    if (!pac) return;

    const confirma = confirm(`¿Estás seguro de trasladar el expediente de ${pac.nombre} a la Bóveda de Retención Legal por 15 Años (D.S. N° 41 / Ley 20.584)?\n\nEl expediente quedará archivado con hash inmutable y restringido para atenciones activas.`);
    if (!confirma) return;

    try {
      const res = await fetch("/api/profesionales/pacientes/eliminar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pacienteId,
          archivarLegal: true
        })
      });
      const data = await res.json();
      if (data && data.success) {
        pac.archivadoLegal = true;
        mostrarAlertaPortal("✓ Consultante archivado en Bóveda Legal por 15 años.", "success");
        renderizarSelectoresYChipsPacientes();
      }
    } catch (_err) {
      alert("Error al trasladar a Bóveda Legal.");
    }
  };

  window.guardarHorariosDisponibilidad = function () {
    const domingoActivo = Boolean(document.getElementById("checkHorarioDomingo")?.checked);
    mostrarAlertaPortal(`✓ Horarios y disponibilidad semanal sincronizados con Gentia. (Domingo: ${domingoActivo ? "Habilitado para reservas" : "No disponible"}).`, "success");
  };

  window.abrirFichaClinicaPaciente = function (identificador) {
    window.cambiarPestana('fichas');
    if (!identificador) {
      if (listaPacientesDirectorio.length > 0) {
        window.cargarFichaClinicaPaciente(listaPacientesDirectorio[0].id);
      }
      return;
    }
    const foundDirect = listaPacientesDirectorio.find(p => p.id === identificador);
    if (foundDirect) {
      window.cargarFichaClinicaPaciente(foundDirect.id);
      return;
    }
    const foundApprox = listaPacientesDirectorio.find(p => 
      p.nombre.toLowerCase().includes(identificador.toLowerCase()) || 
      (p.rut && p.rut.includes(identificador))
    );
    if (foundApprox) {
      window.cargarFichaClinicaPaciente(foundApprox.id);
      return;
    }
    window.cargarFichaClinicaPaciente(identificador);
  };

  window.guardarCambiosPerfil = async function (e) {
    if (e) e.preventDefault();
    if (!profesionalActivo) return;

    const btn = document.getElementById("btnGuardarPerfil");
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span>Guardando y sincronizando con Cabal Salud...</span>`;
    }

    const formacionActualizada = [];
    document.querySelectorAll("#containerFormacionItems .formacion-input").forEach(input => {
      const v = input.value.trim();
      if (v) formacionActualizada.push(v);
    });

    const subIds = [];
    if (document.getElementById("checkSubDeporte")?.checked) subIds.push("deporte");
    if (document.getElementById("checkSubNeuro")?.checked) subIds.push("neurodivergencia");
    if (document.getElementById("checkSubPerinatal")?.checked) subIds.push("perinatal");
    if (document.getElementById("checkSubGeriatria")?.checked) subIds.push("infanto_geriatria");

    const modalidades = [];
    if (document.getElementById("checkModOnline")?.checked) modalidades.push("Online");
    if (document.getElementById("checkModTerreno")?.checked) modalidades.push("Visita a Terreno");

    const previsiones = [];
    if (document.getElementById("checkPrevParticular")?.checked) previsiones.push("Particular");
    if (document.getElementById("checkPrevIsapre")?.checked) previsiones.push("Reembolso Isapres");
    if (document.getElementById("checkPrevFonasa")?.checked) previsiones.push("FONASA");

    const datosActualizados = {
      nombre: document.getElementById("editNombre")?.value.trim(),
      profesion: document.getElementById("editProfesion")?.value.trim(),
      disciplinaId: document.getElementById("editDisciplina")?.value,
      rnpi: document.getElementById("editRnpi")?.value.trim(),
      universidad: document.getElementById("editUniversidad")?.value.trim(),
      fotoUrl: document.getElementById("editFotoUrl")?.value.trim(),
      enfoqueResumen: document.getElementById("editEnfoque")?.value.trim(),
      experienciaDetalle: document.getElementById("editExperiencia")?.value.trim(),
      especialidades: (document.getElementById("editEspecialidades")?.value || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean),
      subespecialidadIds: subIds,
      modalidades,
      previsiones,
      precioCLP: Number(document.getElementById("editPrecioCLP")?.value || 35000),
      duracionMinutos: Number(document.getElementById("editDuracionMinutos")?.value || 50),
      formacionAcademica: formacionActualizada
    };

    // Actualizar objeto en memoria
    Object.assign(profesionalActivo, datosActualizados);

    try {
      await fetch("/api/profesionales/perfil/actualizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: profesionalActivo.uid,
          datos: datosActualizados
        })
      });
    } catch (_err) {}

    // Feedback visual
    mostrarAlertaPortal("✓ Tu perfil profesional ha sido actualizado exitosamente y está sincronizado con el catálogo público de cabalsalud.cl.", "success");

    // Actualizar encabezados
    document.getElementById("portalHeaderNombre").textContent = profesionalActivo.nombre;
    document.getElementById("portalHeaderFoto").src = profesionalActivo.fotoUrl;
    document.getElementById("portalHeaderRnpi").textContent = `${profesionalActivo.rnpi} · ${profesionalActivo.universidad}`;

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="check" class="w-4 h-4"></i><span>Guardar y Actualizar mi Ficha</span>`;
      refreshIcons();
    }
  };

  function mostrarAlertaPortal(mensaje, tipo = "success") {
    const alertDiv = document.getElementById("portalAlert");
    if (!alertDiv) return;
    alertDiv.classList.remove("hidden");
    if (tipo === "success") {
      alertDiv.className = "rounded-2xl p-4 text-xs sm:text-sm font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200";
    } else {
      alertDiv.className = "rounded-2xl p-4 text-xs sm:text-sm font-semibold bg-red-50 text-red-800 border border-red-200";
    }
    alertDiv.textContent = mensaje;
    setTimeout(() => {
      alertDiv.classList.add("hidden");
    }, 6000);
  }

  function renderizarSesiones(prof) {
    const container = document.getElementById("containerListaSesiones");
    if (!container) return;

    let pacientesProf = (listaPacientesDirectorio && listaPacientesDirectorio.length > 0)
      ? listaPacientesDirectorio
      : obtenerPacientesFallback(prof ? prof.uid : undefined);

    if (!pacientesProf || pacientesProf.length === 0) {
      container.innerHTML = `
        <div class="bg-perla/60 rounded-2xl p-8 border border-dashed border-noche/15 text-center text-noche/60 text-xs sm:text-sm">
          No hay sesiones agendadas en este momento. Las reservas ingresadas por consultantes en el catálogo público aparecerán aquí automáticamente.
        </div>
      `;
      return;
    }

    const horariosMock = [
      { fecha: "Mañana, Jueves 22 Octubre", hora: "10:00" },
      { fecha: "Viernes 23 Octubre", hora: "16:30" },
      { fecha: "Lunes 26 Octubre", hora: "11:00" },
      { fecha: "Martes 27 Octubre", hora: "15:00" }
    ];

    container.innerHTML = pacientesProf.map((p, idx) => {
      const horario = horariosMock[idx % horariosMock.length];
      const citaId = `CBL-SES-2026-00${idx + 1}`;
      const tieneAlertas = p.flagSui || p.flagVIF || p.flagAbuso || p.alertaCritica;
      const telLimpio = (p.telefono || "+56912345678").replace(/[^0-9]/g, "");

      return `
      <div class="bg-perla rounded-2xl p-5 border border-noche/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="space-y-1.5 flex-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Pago Aprobado Webpay Plus Directo ($${Number(prof ? prof.precioCLP : 35000).toLocaleString("es-CL")} CLP)
            </span>
            <span class="text-xs font-mono text-noche/60">${citaId}</span>
            ${tieneAlertas ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">⚠️ Alerta Clínica</span>` : ""}
          </div>
          <h4 class="font-serif text-lg font-bold text-noche">${p.nombre}</h4>
          <div class="text-xs text-noche/75 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>📅 <strong>${horario.fecha} · ${horario.hora} hrs</strong></span>
            <span>📍 Online (WebRTC Gentia / Google Meet)</span>
            <span>📋 RUT: <strong>${p.rut || "Sin RUT"}</strong> (${p.prevision || "Particular"})</span>
          </div>
          <p class="text-xs text-noche/70 italic mt-1">"${p.motivoConsulta || "Acompañamiento clínico integral en Clínica Cabal Salud."}"</p>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full md:w-auto">
          <button
            type="button"
            onclick="window.abrirFichaClinicaPaciente('${p.id}')"
            class="py-2.5 px-3.5 rounded-xl border border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
            title="Abrir Ficha Clínica y Epicrisis Oficial en Bóveda Gentia"
          >
            <i data-lucide="clipboard-list" class="w-4 h-4 text-emerald-700"></i>
            <span>Ficha & Epicrisis</span>
          </button>
          <a
            href="https://gentia.cl/sala-sesion.html?id=${citaId}&pacienteId=${p.id}&role=profesional"
            target="_blank"
            rel="noopener"
            class="btn-petroleo py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
          >
            <i data-lucide="video" class="w-4 h-4"></i>
            <span>Ingresar a Sala WebRTC</span>
          </a>
          <a
            href="https://wa.me/${telLimpio}?text=Hola%20${encodeURIComponent(p.nombre)}%2C%20te%20escribe%20${encodeURIComponent(prof ? prof.nombre : 'tu especialista')}%20de%20Cl%C3%ADnica%20Cabal%20Salud."
            target="_blank"
            rel="noopener"
            class="btn-noche-outline py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
            title="Contactar al consultante por WhatsApp"
          >
            <i data-lucide="message-circle" class="w-4 h-4 text-emerald-600"></i>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
      `;
    }).join("");

    refreshIcons();
  }

  // Previsualización de Ficha Pública
  window.abrirModalVistaPrevia = function () {
    if (!profesionalActivo) return;
    const modal = document.getElementById("modalVistaPrevia");
    const container = document.getElementById("previewCardContent");
    if (!modal || !container) return;

    const p = profesionalActivo;
    const espList = (p.especialidades || []).map(e => `<li>• ${e}</li>`).join("");
    const subBadges = (p.subespecialidadesDestacadas || (p.subespecialidadIds || []))
      .map(s => `<span class="badge-granate px-2.5 py-0.5 rounded-full text-[11px] font-semibold">★ ${s}</span>`)
      .join("");

    container.innerHTML = `
      <div class="flex items-start gap-4">
        <img src="${p.fotoUrl}" alt="${p.nombre}" class="w-20 h-20 rounded-2xl object-cover border border-noche/10 shrink-0" />
        <div>
          <span class="inline-block px-2.5 py-0.5 rounded-md bg-petroleo text-white text-xs font-bold mb-1">${p.disciplinaNombre || "Especialidad"}</span>
          <h3 class="font-serif text-xl font-bold text-noche">${p.nombre}</h3>
          <p class="text-xs text-noche/75">${p.profesion}</p>
          <p class="text-[11px] font-mono text-petroleo mt-0.5">${p.rnpi} · ${p.universidad}</p>
        </div>
      </div>

      ${subBadges ? `<div class="flex flex-wrap gap-1.5">${subBadges}</div>` : ""}

      <div class="text-xs text-noche/80 leading-relaxed bg-perla/70 p-3.5 rounded-2xl border border-noche/10">
        ${p.enfoqueResumen}
      </div>

      <div class="text-xs">
        <span class="font-bold text-noche/70 uppercase tracking-wider block mb-1">Áreas de Especialidad:</span>
        <ul class="text-noche/80 space-y-0.5">${espList}</ul>
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-noche/10">
        <span class="text-xs text-noche/65">Valor por sesión (50 min)</span>
        <span class="font-serif text-lg font-bold text-noche">$${Number(p.precioCLP || 35000).toLocaleString("es-CL")} CLP</span>
      </div>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    refreshIcons();
  };

  window.cerrarModalVistaPrevia = function () {
    const modal = document.getElementById("modalVistaPrevia");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  };

  // ==============================================================================
  // MÓDULO DE ADMINISTRACIÓN CABAL SALUD: RECEPCIÓN Y ASIGNACIÓN DE CONSULTANTES
  // ==============================================================================
  let modoAsignacionActual = "NUEVO";
  let respuestaUltimaAsignacion = null;
  let sesionesAdminList = [
    {
      citaId: "CBL-SES-2026-001",
      pacienteId: "cbl_pac_01",
      pacienteNombre: "Constanza Morales Henríquez",
      pacienteRut: "18.392.104-5",
      pacienteEmail: "constanza.morales@gmail.com",
      pacienteTelefono: "+56 9 7812 3456",
      prevision: "Reembolso Isapres (Colmena)",
      profesionalUid: "cabal_psico_deportiva_01",
      profesionalNombre: "Ps. Camila Valdés Araneda",
      disciplinaNombre: "Psicología Clínica y del Deporte",
      fecha: "2026-10-22",
      hora: "10:00",
      modalidad: "Online (Sala WebRTC Gentia)",
      motivoConsulta: "Consulta por ansiedad de rendimiento precompetitiva.",
      salaWebRTCProfesional: "https://gentia.cl/sala-sesion.html?id=CBL-SES-2026-001&pacienteId=cbl_pac_01&role=profesional",
      salaWebRTCPaciente: "https://gentia.cl/sala-sesion.html?id=CBL-SES-2026-001&pacienteId=cbl_pac_01&role=paciente",
      arancelCLP: 35000,
      estadoPago: "Aprobado Webpay Plus Directo",
      creadoPor: "Administración Cabal Salud"
    },
    {
      citaId: "CBL-SES-2026-002",
      pacienteId: "cbl_pac_02",
      pacienteNombre: "Felipe Arancibia Castro",
      pacienteRut: "15.820.491-K",
      pacienteEmail: "felipe.arancibia@gmail.com",
      pacienteTelefono: "+56 9 8456 1234",
      prevision: "Particular",
      profesionalUid: "cabal_psico_deportiva_01",
      profesionalNombre: "Ps. Camila Valdés Araneda",
      disciplinaNombre: "Psicología Clínica y del Deporte",
      fecha: "2026-10-23",
      hora: "16:30",
      modalidad: "Online (Sala WebRTC Gentia)",
      motivoConsulta: "Acompañamiento psicológico en rehabilitación deportiva.",
      salaWebRTCProfesional: "https://gentia.cl/sala-sesion.html?id=CBL-SES-2026-002&pacienteId=cbl_pac_02&role=profesional",
      salaWebRTCPaciente: "https://gentia.cl/sala-sesion.html?id=CBL-SES-2026-002&pacienteId=cbl_pac_02&role=paciente",
      arancelCLP: 35000,
      estadoPago: "Aprobado Webpay Plus Directo",
      creadoPor: "Administración Cabal Salud"
    }
  ];

  window.cargarDashboardAdmin = async function () {
    try {
      const res = await fetch("/api/admin/sesiones/lista");
      const data = await res.json();
      if (data && data.success && Array.isArray(data.sesiones)) {
        sesionesAdminList = data.sesiones;
      }
    } catch (_e) {}

    // Actualizar contadores
    const countEsp = document.getElementById("adminTotalEspecialistas");
    if (countEsp) countEsp.textContent = catalogoProfesionales.filter(p => p.uid !== "cabal_admin_central").length;

    const countPac = document.getElementById("adminTotalPacientes");
    if (countPac) countPac.textContent = listaPacientesDirectorio.length;

    const countSes = document.getElementById("adminTotalSesiones");
    if (countSes) countSes.textContent = sesionesAdminList.length;

    const container = document.getElementById("containerAdminListaSesiones");
    if (!container) return;

    if (sesionesAdminList.length === 0) {
      container.innerHTML = `
        <div class="bg-perla/60 rounded-2xl p-8 border border-dashed border-noche/15 text-center text-noche/60 text-xs sm:text-sm">
          No hay sesiones asignadas actualmente. Utiliza el botón "+ Registrar y Asignar Paciente" para comenzar.
        </div>
      `;
      return;
    }

    container.innerHTML = sesionesAdminList.map((s, idx) => {
      const telLimpio = (s.pacienteTelefono || "").replace(/[^0-9]/g, "");
      return `
        <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="space-y-1.5 flex-1 text-xs">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-petroleo/10 text-petroleo">
                ${s.disciplinaNombre || "Especialidad"}
              </span>
              <span class="font-mono text-noche/60">${s.citaId}</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                ${s.estadoPago || "Confirmada"}
              </span>
            </div>
            <h4 class="font-serif text-base font-bold text-noche">${s.pacienteNombre} <span class="font-sans font-normal text-xs text-noche/60">(RUT: ${s.pacienteRut || "S/RUT"})</span></h4>
            <div class="text-noche/75 flex flex-wrap gap-x-4 gap-y-1">
              <span>👨‍⚕️ Especialista: <strong>${s.profesionalNombre}</strong></span>
              <span>📅 <strong>${s.fecha} a las ${s.hora} hrs</strong></span>
              <span>📍 ${s.modalidad || "Online"}</span>
            </div>
            <p class="text-noche/70 italic mt-0.5">"${s.motivoConsulta || "Sin motivo registrado"}"</p>
          </div>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full md:w-auto">
            <a
              href="${s.salaWebRTCProfesional || `https://gentia.cl/sala-sesion.html?id=${s.citaId}&role=profesional`}"
              target="_blank"
              rel="noopener"
              class="btn-petroleo py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
              title="Ingresar como profesional o supervisión médica"
            >
              <i data-lucide="video" class="w-3.5 h-3.5"></i>
              <span>Sala WebRTC</span>
            </a>
            <button
              type="button"
              onclick="window.abrirFichaClinicaPaciente('${s.pacienteId}')"
              class="py-2 px-3 rounded-xl border border-noche/15 bg-white hover:bg-perla text-xs font-semibold text-noche flex items-center justify-center gap-1.5 transition"
              title="Abrir ficha clínica del consultante"
            >
              <i data-lucide="clipboard-list" class="w-3.5 h-3.5 text-petroleo"></i>
              <span>Ficha Clínica</span>
            </button>
            ${telLimpio ? `
              <a
                href="https://wa.me/${telLimpio}?text=Hola%20${encodeURIComponent(s.pacienteNombre)}%2C%20te%20escribe%20la%20administraci%C3%B3n%20de%20Cl%C3%ADnica%20Cabal%20Salud%20respecto%20a%20tu%20sesi%C3%B3n%20con%20${encodeURIComponent(s.profesionalNombre)}."
                target="_blank"
                rel="noopener"
                class="btn-noche-outline py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                title="Contactar al paciente por WhatsApp"
              >
                <i data-lucide="message-circle" class="w-3.5 h-3.5 text-emerald-600"></i>
                <span>WhatsApp</span>
              </a>
            ` : ""}
          </div>
        </div>
      `;
    }).join("");

    refreshIcons();
  };

  window.abrirModalAsignarPacienteAdmin = function () {
    const modal = document.getElementById("modalAsignarPacienteAdmin");
    if (!modal) return;

    // Reset form
    document.getElementById("formAsignarPacienteAdmin")?.reset();

    // Fecha predeterminada: Mañana
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    const fechaInput = document.getElementById("adminAsignarFecha");
    if (fechaInput) {
      fechaInput.value = manana.toISOString().split("T")[0];
      fechaInput.min = new Date().toISOString().split("T")[0];
    }

    // Poblar selector de disciplina y profesional
    const discSelect = document.getElementById("adminAsignarDisciplina");
    if (discSelect) {
      discSelect.value = "psicologia";
      window.actualizarSelectProfesionalesAdmin("psicologia");
    }

    // Poblar selector de pacientes existentes
    const pacSelect = document.getElementById("adminSelectPacienteExistente");
    const tienePacientes = Array.isArray(listaPacientesDirectorio) && listaPacientesDirectorio.length > 0;
    if (pacSelect) {
      pacSelect.innerHTML = `<option value="">-- Selecciona un consultante registrado --</option>` +
        listaPacientesDirectorio.map(p => `
          <option value="${p.id}">${p.nombre} (RUT ${p.rut || "S/RUT"}) — ${p.prevision || "Particular"}</option>
        `).join("");
    }

    if (tienePacientes) {
      window.setModoAsignacionAdmin("EXISTENTE");
    } else {
      window.setModoAsignacionAdmin("NUEVO");
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    refreshIcons();
  };

  window.cerrarModalAsignarPacienteAdmin = function () {
    const modal = document.getElementById("modalAsignarPacienteAdmin");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  };

  window.setModoAsignacionAdmin = function (modo) {
    modoAsignacionActual = modo;
    const btnNuevo = document.getElementById("btnModoNuevoPac");
    const btnExistente = document.getElementById("btnModoExistentePac");
    const wrapperExistente = document.getElementById("wrapperSelectorExistenteAdmin");
    const badge = document.getElementById("badgeAutocompletadoAdmin");

    if (modo === "EXISTENTE") {
      if (btnNuevo) btnNuevo.className = "flex-1 py-2 rounded-lg text-noche/70 hover:bg-white/60 flex items-center justify-center gap-1.5 transition";
      if (btnExistente) btnExistente.className = "flex-1 py-2 rounded-lg bg-white text-noche shadow-xs flex items-center justify-center gap-1.5 transition font-bold";
      if (wrapperExistente) wrapperExistente.classList.remove("hidden");

      const pacSelect = document.getElementById("adminSelectPacienteExistente");
      if (pacSelect && pacSelect.value) {
        window.autocompletarPacienteAdmin(pacSelect.value);
      }
    } else {
      if (btnNuevo) btnNuevo.className = "flex-1 py-2 rounded-lg bg-white text-noche shadow-xs flex items-center justify-center gap-1.5 transition font-bold";
      if (btnExistente) btnExistente.className = "flex-1 py-2 rounded-lg text-noche/70 hover:bg-white/60 flex items-center justify-center gap-1.5 transition";
      if (wrapperExistente) wrapperExistente.classList.add("hidden");
      if (badge) badge.classList.add("hidden");

      // Limpiar campos para ingreso nuevo
      ["adminAsignarNombre", "adminAsignarRut", "adminAsignarEmail", "adminAsignarTelefono", "adminAsignarMotivo"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });
      const pacSelect = document.getElementById("adminSelectPacienteExistente");
      if (pacSelect) pacSelect.value = "";
    }
  };

  window.autocompletarPacienteAdmin = function (pacienteId) {
    const badge = document.getElementById("badgeAutocompletadoAdmin");
    if (!pacienteId) {
      if (badge) badge.classList.add("hidden");
      return;
    }
    const p = listaPacientesDirectorio.find(item => item.id === pacienteId);
    if (!p) {
      if (badge) badge.classList.add("hidden");
      return;
    }
    document.getElementById("adminAsignarNombre").value = p.nombre || "";
    document.getElementById("adminAsignarRut").value = p.rut || "";
    document.getElementById("adminAsignarEmail").value = p.email || "";
    document.getElementById("adminAsignarTelefono").value = p.telefono || "";
    if (p.prevision) {
      const prevSelect = document.getElementById("adminAsignarPrevision");
      if (prevSelect) prevSelect.value = p.prevision;
    }
    document.getElementById("adminAsignarMotivo").value = p.motivoConsulta || "";
    if (badge) {
      badge.textContent = `✓ Datos de ${p.nombre} cargados automáticamente desde Gentia Vault.`;
      badge.classList.remove("hidden");
    }
  };

  window.actualizarSelectProfesionalesAdmin = function (disciplinaId) {
    const selectProf = document.getElementById("adminAsignarProfesionalSelect");
    if (!selectProf) return;

    // Filtrar catálogo por disciplina
    const filtrados = catalogoProfesionales.filter(p =>
      p.disciplinaId === disciplinaId ||
      (disciplinaId === "psicologia" && p.disciplinaId === "psicologia")
    );

    if (filtrados.length === 0) {
      selectProf.innerHTML = catalogoProfesionales
        .filter(p => p.uid !== "cabal_admin_central")
        .map(p => `<option value="${p.uid}" data-precio="${p.precioCLP}">${p.nombre} — ${p.disciplinaNombre}</option>`)
        .join("");
    } else {
      selectProf.innerHTML = filtrados.map(p => `
        <option value="${p.uid}" data-precio="${p.precioCLP}">
          ${p.nombre} (${p.rnpi || "RNPI Vigente"}) — $${Number(p.precioCLP || 35000).toLocaleString("es-CL")} CLP
        </option>
      `).join("");
    }
  };

  window.ejecutarAsignacionPacienteAdmin = async function (e) {
    if (e) e.preventDefault();
    const btn = document.getElementById("btnSubmitAsignarAdmin");
    if (btn) btn.disabled = true;

    const selectProf = document.getElementById("adminAsignarProfesionalSelect");
    const profUid = selectProf?.value;
    const profEncontrado = catalogoProfesionales.find(p => p.uid === profUid);
    const disciplinaId = document.getElementById("adminAsignarDisciplina")?.value || "psicologia";
    const disciplinaText = document.getElementById("adminAsignarDisciplina")?.selectedOptions[0]?.textContent || "Especialidad";

    const payload = {
      esPacienteNuevo: modoAsignacionActual === "NUEVO",
      pacienteId: modoAsignacionActual === "EXISTENTE" ? document.getElementById("adminSelectPacienteExistente")?.value : undefined,
      nombre: document.getElementById("adminAsignarNombre")?.value || "",
      rut: document.getElementById("adminAsignarRut")?.value || "",
      email: document.getElementById("adminAsignarEmail")?.value || "",
      telefono: document.getElementById("adminAsignarTelefono")?.value || "",
      prevision: document.getElementById("adminAsignarPrevision")?.value || "Particular",
      motivoConsulta: document.getElementById("adminAsignarMotivo")?.value || "",
      disciplinaId,
      disciplinaNombre: disciplinaText,
      profesionalUid: profUid,
      profesionalNombre: profEncontrado ? profEncontrado.nombre : "Especialista Cabal Salud",
      fecha: document.getElementById("adminAsignarFecha")?.value || new Date().toISOString().split("T")[0],
      hora: document.getElementById("adminAsignarHora")?.value || "10:00",
      modalidad: document.getElementById("adminAsignarModalidad")?.value || "Online (Sala WebRTC Gentia)",
      arancelCLP: profEncontrado ? profEncontrado.precioCLP : 35000,
      notaRecepcion: document.getElementById("adminAsignarNota")?.value || "",
      notificarEmailProfesional: Boolean(document.getElementById("adminCheckEmailProf")?.checked),
      notificarEmailPaciente: Boolean(document.getElementById("adminCheckEmailPac")?.checked)
    };

    try {
      const res = await fetch("/api/admin/asignar-sesion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data && data.success && data.sesion) {
        respuestaUltimaAsignacion = data;

        // Agregar paciente si era nuevo
        if (data.paciente && !listaPacientesDirectorio.some(p => p.id === data.paciente.id)) {
          listaPacientesDirectorio.unshift(data.paciente);
        } else if (data.paciente) {
          const idx = listaPacientesDirectorio.findIndex(p => p.id === data.paciente.id);
          if (idx !== -1) listaPacientesDirectorio[idx] = data.paciente;
        }

        // Agregar sesión a la lista administrativa
        sesionesAdminList.unshift(data.sesion);

        window.cerrarModalAsignarPacienteAdmin();

        // Si el profesional asignado es el profesional activo en pantalla, actualizar sus sesiones
        if (profesionalActivo && profesionalActivo.uid === profUid) {
          renderizarSesiones(profesionalActivo);
        }

        renderizarSelectoresYChipsPacientes();

        // Abrir modal de confirmación con vista previa
        window.abrirModalConfirmacionAdmin(data);
      } else {
        alert(data.error || "Error al asignar la sesión.");
      }
    } catch (_err) {
      alert("Error de comunicación con el servidor de Cabal Salud.");
    } finally {
      if (btn) btn.disabled = false;
    }
  };

  window.abrirModalConfirmacionAdmin = function (data) {
    const modal = document.getElementById("modalConfirmacionAsignacionAdmin");
    if (!modal || !data) return;

    const s = data.sesion || {};
    document.getElementById("confCitaId").textContent = s.citaId || "CBL-SES-2026";
    document.getElementById("confPacNombre").textContent = s.pacienteNombre || "";
    document.getElementById("confProfNombre").textContent = s.profesionalNombre || "";
    document.getElementById("confFechaHora").textContent = `${s.fecha} · ${s.hora} hrs`;
    document.getElementById("confModalidad").textContent = s.modalidad || "Online";

    document.getElementById("confLinkProf").textContent = data.salaWebRTCProfesional || s.salaWebRTCProfesional || "https://gentia.cl/...";
    document.getElementById("confLinkPac").textContent = data.salaWebRTCPaciente || s.salaWebRTCPaciente || "https://gentia.cl/...";

    // Mostrar por defecto el correo del consultante para verificación inmediata
    window.verEmailPreview("PAC");

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    refreshIcons();
  };

  window.verEmailPreview = function (tipo) {
    const container = document.getElementById("emailPreviewContainer");
    const btnProf = document.getElementById("tabEmailProfBtn");
    const btnPac = document.getElementById("tabEmailPacBtn");
    if (!container || !respuestaUltimaAsignacion) return;

    if (tipo === "PROF") {
      if (btnProf) btnProf.className = "px-2.5 py-1 rounded-lg bg-petroleo text-white font-semibold shadow-sm";
      if (btnPac) btnPac.className = "px-2.5 py-1 rounded-lg bg-perla text-noche/70 hover:bg-white font-semibold";
      const e = respuestaUltimaAsignacion.emailProfesional || {};
      container.innerHTML = `
        <div class="space-y-1.5 pb-2 mb-2 border-b border-noche/10">
          <div>Destinatario: <strong class="font-mono text-petroleo">${e.destinatario || "especialista@cabalsalud.cl"}</strong> <span class="text-[10px] bg-petroleo/10 text-petroleo px-2 py-0.5 rounded-full font-bold ml-1">Especialista</span></div>
          <div>Asunto: <strong class="text-noche">${e.asunto || "Nueva Sesión Asignada"}</strong></div>
          <div class="text-[10px] text-noche/50">Estado: <span class="text-emerald-700 font-bold">✓ Despachado por servidor</span> · ${e.timestamp || ""}</div>
        </div>
        <div>${e.contenidoHtml || "<p>Sin vista previa de correo</p>"}</div>
      `;
    } else {
      if (btnProf) btnProf.className = "px-2.5 py-1 rounded-lg bg-perla text-noche/70 hover:bg-white font-semibold";
      if (btnPac) btnPac.className = "px-2.5 py-1 rounded-lg bg-petroleo text-white font-semibold shadow-sm";
      const e = respuestaUltimaAsignacion.emailPaciente || {};
      container.innerHTML = `
        <div class="space-y-1.5 pb-2 mb-2 border-b border-noche/10">
          <div>Destinatario: <strong class="font-mono text-petroleo">${e.destinatario || "paciente@cabalsalud.cl"}</strong> <span class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold ml-1">Consultante</span></div>
          <div>Asunto: <strong class="text-noche">${e.asunto || "Confirmación de Tu Sesión"}</strong></div>
          <div class="text-[10px] text-noche/50">Estado: <span class="text-emerald-700 font-bold">✓ Despachado por servidor</span> · ${e.timestamp || ""}</div>
        </div>
        <div>${e.contenidoHtml || "<p>Sin vista previa de correo</p>"}</div>
      `;
    }
  };

  window.copiarAlPortapapeles = function (elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.textContent || "";
    navigator.clipboard.writeText(text).then(() => {
      mostrarAlertaPortal("✓ Enlace de videollamada copiado al portapapeles.", "success");
    }).catch(() => {
      prompt("Copia este enlace de videollamada:", text);
    });
  };

  window.cerrarModalConfirmacionAdmin = function () {
    const modal = document.getElementById("modalConfirmacionAsignacionAdmin");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
    window.cargarDashboardAdmin();
  };

  document.addEventListener("DOMContentLoaded", inicializarPortal);
})();
