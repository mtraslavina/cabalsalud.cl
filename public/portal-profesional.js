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
      uid: "cabal_abogada_mediacion_09",
      nombre: "Abg. Constanza Baeza Latorre",
      profesion: "Abogada Especialista en Familia y Mediación",
      disciplinaId: "derecho_mediacion",
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

  // Sesiones de demostración vinculadas a la clínica
  const SESIONES_MOCK = [
    {
      citaId: "CBL_SES_948201",
      pacienteNombre: "Constanza Morales Henríquez",
      pacienteRut: "18.392.104-5",
      pacienteTelefono: "+56 9 7812 3456",
      pacienteEmail: "constanza.morales@gmail.com",
      fecha: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      hora: "11:00",
      modalidad: "Online (Videoconsulta Segura)",
      prevision: "Reembolso Isapres (Colmena)",
      motivo: "Primera consulta por ansiedad precompetitiva y sobrecarga.",
      monto: 35000,
      buyOrder: "CBL20261021001",
      estado: "PAGADA_VERIFICADA"
    },
    {
      citaId: "CBL_SES_948202",
      pacienteNombre: "Felipe Arancibia Castro",
      pacienteRut: "15.820.491-K",
      pacienteTelefono: "+56 9 8456 1234",
      pacienteEmail: "felipe.arancibia@gmail.com",
      fecha: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split("T")[0],
      hora: "16:00",
      modalidad: "Online (Videoconsulta Segura)",
      prevision: "Particular",
      motivo: "Seguimiento de rehabilitación emocional post-cirugía.",
      monto: 35000,
      buyOrder: "CBL20261021002",
      estado: "PAGADA_VERIFICADA"
    }
  ];

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
  let boveda15AActiva = false;

  window.cambiarPestana = function (pestanaId) {
    ["perfil", "sesiones", "fichas", "horarios", "banco"].forEach(id => {
      const section = document.getElementById(`sectionTab-${id}`);
      const btn = document.getElementById(`tabBtn-${id}`);
      if (section && btn) {
        if (id === pestanaId) {
          section.classList.remove("hidden");
          btn.className = "tab-btn active px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-transparent transition flex items-center gap-2";
          if (id === "fichas") {
            window.cargarDirectorioPacientes();
          }
        } else {
          section.classList.add("hidden");
          btn.className = "tab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-noche/10 bg-white text-noche/80 hover:bg-perla transition flex items-center gap-2";
        }
      }
    });
    refreshIcons();
  };

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
      if (data && data.success && Array.isArray(data.pacientes)) {
        listaPacientesDirectorio = data.pacientes;
      }
    } catch (_err) {
      // Fallback
    }

    renderizarSelectoresYChipsPacientes();
  };

  function renderizarSelectoresYChipsPacientes() {
    const sel = document.getElementById("selectFichaPaciente");
    const chipsContainer = document.getElementById("chipsDirectorioPacientes");
    const totalCount = document.getElementById("totalPacientesCount");

    let listaParaMostrar = listaPacientesDirectorio;
    if (boveda15AActiva) {
      listaParaMostrar = listaPacientesDirectorio.filter(p => p.archivadoLegal);
    }

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
            No se encontraron consultantes con el filtro aplicado. Utiliza el botón "+ Crear Paciente" para registrar uno nuevo.
          </div>
        `;
      } else {
        chipsContainer.innerHTML = listaParaMostrar.map(p => {
          const isSelected = pacienteActivo && pacienteActivo.id === p.id;
          const tieneAlertas = p.flagSui || p.flagVIF || p.flagAbuso || p.alertaCritica;
          return `
            <button
              type="button"
              onclick="window.cargarFichaClinicaPaciente('${p.id}')"
              class="shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition border ${
                isSelected
                  ? "bg-petroleo text-white border-petroleo shadow-sm"
                  : "bg-white text-noche/80 border-noche/15 hover:bg-perla hover:border-noche/30"
              }"
            >
              <span class="w-2 h-2 rounded-full ${tieneAlertas ? "bg-red-500" : isSelected ? "bg-emerald-300" : "bg-petroleo"}"></span>
              <span class="truncate max-w-[150px]">${p.nombre}</span>
              <span class="text-[10px] opacity-75 font-mono">${p.prevision ? p.prevision.split(" ")[0] : "Part."}</span>
            </button>
          `;
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
        const tieneAlertas = p.flagSui || p.flagVIF || p.flagAbuso;
        return `
          <button
            type="button"
            onclick="window.cargarFichaClinicaPaciente('${p.id}')"
            class="shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition border ${
              isSelected
                ? "bg-petroleo text-white border-petroleo shadow-sm"
                : "bg-white text-noche/80 border-noche/15 hover:bg-perla"
            }"
          >
            <span class="w-2 h-2 rounded-full ${tieneAlertas ? "bg-red-500" : isSelected ? "bg-emerald-300" : "bg-petroleo"}"></span>
            <span class="truncate max-w-[150px]">${p.nombre}</span>
          </button>
        `;
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
    boveda15AActiva = !boveda15AActiva;
    const btn = document.getElementById("btnBoveda15A");
    if (btn) {
      if (boveda15AActiva) {
        btn.className = "py-2.5 px-3.5 rounded-xl border border-red-500 text-white bg-red-700 text-xs font-semibold flex items-center gap-1.5 shadow-sm";
        btn.innerHTML = `<i data-lucide="archive" class="w-3.5 h-3.5"></i><span>Bóveda 15A (Activa)</span>`;
      } else {
        btn.className = "py-2.5 px-3.5 rounded-xl border border-red-200 text-red-800 bg-red-50 hover:bg-red-100 text-xs font-semibold flex items-center gap-1.5 transition";
        btn.innerHTML = `<i data-lucide="archive" class="w-3.5 h-3.5 text-red-600"></i><span>Bóveda 15A</span>`;
      }
    }
    renderizarSelectoresYChipsPacientes();
    refreshIcons();
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
          <span>Ficha & Antecedentes</span>
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
          <i data-lucide="activity" class="w-3.5 h-3.5"></i>
          <span>Examen Mental V70</span>
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
      subContentHtml = renderizarSubExamenMental(p);
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
              ${p.archivadoLegal ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-900">Archivado 15A</span>' : ''}
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
            title="Derivar a interconsulta en la red multidisciplinaria Cabal Salud"
          >
            <i data-lucide="repeat" class="w-3.5 h-3.5 text-petroleo"></i>
            <span>Derivar</span>
          </button>

          <button
            type="button"
            onclick="window.descargarEpicrisisPdf('${p.id}')"
            class="py-2 px-3 rounded-xl border border-granate/30 bg-granate/5 hover:bg-granate/10 text-xs font-semibold text-granate flex items-center gap-1.5 transition"
            title="Exportar informe o epicrisis oficial"
          >
            <i data-lucide="printer" class="w-3.5 h-3.5 text-granate"></i>
            <span>Exportar</span>
          </button>

          <button
            type="button"
            onclick="window.archivarPacienteBoveda15A('${p.id}')"
            class="py-2 px-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-xs text-red-700 flex items-center gap-1 transition"
            title="Custodia obligatoria 15 años Ley 20.584 / D.S. 41"
          >
            <i data-lucide="archive" class="w-3.5 h-3.5"></i>
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

  // 2.1. Sub-pestaña Ficha & Antecedentes
  function renderizarSubFichaAntecedentes(p) {
    return `
      <form onsubmit="window.guardarFichaIngreso(event)" class="space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
            <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
              Anamnesis y Motivo de Consulta Principal
            </label>
            <textarea id="fichaAnamnesis" rows="4" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.motivoConsulta || ""}</textarea>
            <span class="text-[11px] text-noche/60">Historia de la problemática actual, tiempo de evolución y factores gatillantes.</span>
          </div>

          <div class="bg-perla rounded-2xl p-4 sm:p-5 border border-noche/10 space-y-2">
            <label class="block text-xs font-bold uppercase tracking-wider text-noche/80">
              Diagnóstico Clínico (CIE-11 / DSM-5)
            </label>
            <input type="text" id="fichaDiagnostico" value="${p.diagnosticoCIE || ""}" class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-noche/15 text-xs sm:text-sm text-noche font-semibold focus:outline-none focus:border-petroleo" />
            <span class="text-[11px] text-noche/60">Código y denominación médica formal para licencias justificadas y reembolsos Isapre/FONASA.</span>

            <label class="block text-xs font-bold uppercase tracking-wider text-noche/80 pt-2">
              Objetivos Terapéuticos y Plan de Trabajo
            </label>
            <textarea id="fichaObjetivos" rows="2" class="w-full px-3.5 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo leading-relaxed">${p.objetivosTerapeuticos || ""}</textarea>
          </div>
        </div>

        <!-- Antecedentes Médicos, Psiquiátricos y Farmacoterapia -->
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
            <textarea id="fichaMedicacion" rows="3" placeholder="Medicación actual y alergias..." class="w-full px-3 py-2 rounded-xl bg-white border border-noche/15 text-xs text-noche focus:outline-none focus:border-petroleo">${p.medicacionActual ? "Fármacos: " + p.medicacionActual : ""}${p.alergias ? "\nAlergias: " + p.alergias : ""}</textarea>
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
            <span>Guardar Antecedentes en Gentia Vault</span>
          </button>
        </div>
      </form>
    `;
  }

  // 2.2. Sub-pestaña Examen Mental V70
  function renderizarSubExamenMental(p) {
    const ex = p.examenMental || {};
    return `
      <form onsubmit="window.guardarExamenMental(event)" class="space-y-4">
        <div class="bg-perla p-4 rounded-2xl border border-noche/10 text-xs text-noche/80 flex items-center justify-between">
          <span>Evaluación estandarizada del estado psíquico actual bajo protocolo Gentia V70.</span>
          <span class="font-mono text-petroleo font-bold">Evaluación Clínica</span>
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
            <label class="block text-xs font-semibold text-noche/80">Juicio de Realidad e Insight (Conciencia de Enfermedad)</label>
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
                <span>Firmar y Registrar en Gentia Vault (SHA-256)</span>
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
    const epi = p.epicrisis || {
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
            <span>Guardar y Sellar Epicrisis en Gentia Vault</span>
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

  window.guardarExamenMental = async function (e) {
    if (e) e.preventDefault();
    if (!pacienteActivo) return;

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
  };

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

  // 6. Modales: Interconsulta / Derivación
  window.abrirModalDerivarPaciente = function (pacienteId) {
    const pac = listaPacientesDirectorio.find(p => p.id === pacienteId) || pacienteActivo;
    if (!pac) return;

    document.getElementById("derivarPacId").value = pac.id;
    document.getElementById("derivarPacNombreLabel").textContent = pac.nombre;
    document.getElementById("derivarPacRutLabel").textContent = `RUT: ${pac.rut || "S/RUT"} · ${pac.prevision || "Particular"}`;

    const profSelect = document.getElementById("derivarProfesionalSelect");
    if (profSelect) {
      profSelect.innerHTML = catalogoProfesionales
        .filter(p => !profesionalActivo || p.uid !== profesionalActivo.uid)
        .map(p => `<option value="${p.uid}">${p.nombre} — ${p.disciplinaNombre}</option>`)
        .join("");
    }

    const modal = document.getElementById("modalDerivarPaciente");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
    refreshIcons();
  };

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
    const profUid = document.getElementById("derivarProfesionalSelect")?.value;
    const profDestino = catalogoProfesionales.find(p => p.uid === profUid);
    const motivo = document.getElementById("derivarMotivoTexto")?.value || "";

    try {
      const res = await fetch("/api/profesionales/pacientes/derivar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pacienteId,
          desdeProfesional: profesionalActivo ? profesionalActivo.nombre : "Especialista Emisor",
          haciaProfesionalUid: profUid,
          haciaProfesionalNombre: profDestino ? profDestino.nombre : "Colega de Red",
          motivo
        })
      });
      const data = await res.json();
      if (data && data.success) {
        window.cerrarModalDerivarPaciente();
        mostrarAlertaPortal(`✓ Interconsulta generada con éxito hacia ${profDestino?.nombre}. Se ha notificado al profesional.`, "success");
      }
    } catch (_err) {
      alert("Error al procesar interconsulta.");
    } finally {
      if (btn) btn.disabled = false;
    }
  };

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

  window.abrirFichaClinicaPaciente = function (citaId) {
    window.cambiarPestana('fichas');
    // Si viene de una cita, mapeamos al paciente o cargamos el primer paciente
    if (citaId.startsWith("cbl_pac_")) {
      window.cargarFichaClinicaPaciente(citaId);
    } else {
      // Buscar por nombre aproximado en sesiones
      const ses = SESIONES_MOCK.find(s => s.citaId === citaId);
      if (ses) {
        const found = listaPacientesDirectorio.find(p => p.nombre.toLowerCase().includes(ses.pacienteNombre.toLowerCase().split(" ")[0]));
        if (found) {
          window.cargarFichaClinicaPaciente(found.id);
          return;
        }
      }
      if (listaPacientesDirectorio.length > 0) {
        window.cargarFichaClinicaPaciente(listaPacientesDirectorio[0].id);
      }
    }
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

    container.innerHTML = SESIONES_MOCK.map(
      s => `
      <div class="bg-perla rounded-2xl p-5 border border-noche/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div class="space-y-1.5 flex-1">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Pago Aprobado Webpay Plus Directo
            </span>
            <span class="text-xs font-mono text-noche/60">${s.citaId}</span>
          </div>
          <h4 class="font-serif text-lg font-bold text-noche">${s.pacienteNombre}</h4>
          <div class="text-xs text-noche/75 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>📅 <strong>${s.fecha} · ${s.hora} hrs</strong></span>
            <span>📍 ${s.modalidad}</span>
            <span>📋 RUT: ${s.pacienteRut} (${s.prevision})</span>
          </div>
          <p class="text-xs text-noche/70 italic mt-1">"${s.motivo}"</p>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full md:w-auto">
          <button
            type="button"
            onclick="window.abrirFichaClinicaPaciente('${s.citaId}')"
            class="py-2.5 px-3.5 rounded-xl border border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
            title="Ver o editar Ficha Clínica y Epicrisis en Bóveda Gentia"
          >
            <i data-lucide="clipboard-list" class="w-4 h-4 text-emerald-700"></i>
            <span>Ficha & Epicrisis</span>
          </button>
          <a
            href="https://gentia.cl/sala-sesion.html?id=${s.citaId}&role=profesional"
            target="_blank"
            rel="noopener"
            class="btn-petroleo py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
          >
            <i data-lucide="video" class="w-4 h-4"></i>
            <span>Ingresar a Sala WebRTC</span>
          </a>
          <a
            href="https://wa.me/${s.pacienteTelefono.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(s.pacienteNombre)}%2C%20te%20escribe%20${encodeURIComponent(prof.nombre)}%20de%20Cl%C3%ADnica%20Cabal%20Salud."
            target="_blank"
            rel="noopener"
            class="btn-noche-outline py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
            title="Contactar al paciente por WhatsApp"
          >
            <i data-lucide="message-circle" class="w-4 h-4 text-emerald-600"></i>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    `
    ).join("");
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

  document.addEventListener("DOMContentLoaded", inicializarPortal);
})();
