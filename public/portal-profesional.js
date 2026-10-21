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

    const storedUid = sessionStorage.getItem("cabal_prof_active");
    if (storedUid) {
      const encontrado = catalogoProfesionales.find(p => p.uid === storedUid) || CATALOGO_LOCAL.find(p => p.uid === storedUid);
      if (encontrado) {
        cargarPerfilEnPortal(encontrado);
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

  window.cambiarPestana = function (pestanaId) {
    ["perfil", "sesiones", "horarios", "banco"].forEach(id => {
      const section = document.getElementById(`sectionTab-${id}`);
      const btn = document.getElementById(`tabBtn-${id}`);
      if (section && btn) {
        if (id === pestanaId) {
          section.classList.remove("hidden");
          btn.className = "tab-btn active px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-transparent transition flex items-center gap-2";
        } else {
          section.classList.add("hidden");
          btn.className = "tab-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-noche/10 bg-white text-noche/80 hover:bg-perla transition flex items-center gap-2";
        }
      }
    });
    refreshIcons();
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
