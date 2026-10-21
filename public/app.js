/**
 * CLÍNICA CABAL SALUD (cabalsalud.cl) — CLIENTE FRONTEND & ORQUESTADOR DE PAGOS DIRECTOS
 * Arquitectura: Direct Merchant Routing (Cabal Salud <-> Transbank / Mercado Pago <-> Gentia HMAC)
 */

(function () {
  // Catálogo local de respaldo (sincronizado automáticamente con /api/agenda/disponibilidad)
  const CATALOGO_FALLBACK = [
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
      isapresDetalle: ["Colmena", "Cruz Blanca", "Banmédica", "Consalud", "Nueva Masvida", "Vida Tres", "Esencial"],
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
      subespecialidadesDestacadas: [
        "Psicología Deportiva y Nutrición Deportiva",
        "Infanto-Juvenil y Geriatría"
      ],
      modalidades: ["Online"],
      previsiones: ["Particular", "Reembolso Isapres", "FONASA"],
      isapresDetalle: ["Colmena", "Cruz Blanca", "Banmédica", "Consalud", "Nueva Masvida", "Vida Tres"],
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
      subespecialidadesDestacadas: [
        "Salud Mental Perinatal y Preconcepción",
        "Neurodivergencia Integral"
      ],
      modalidades: ["Online"],
      previsiones: ["Particular", "Reembolso Isapres", "FONASA"],
      isapresDetalle: ["Colmena", "Cruz Blanca", "Banmédica", "Consalud", "Nueva Masvida", "Esencial"],
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
      subespecialidadesDestacadas: [
        "Neurodivergencia Integral",
        "Psicología Deportiva y Nutrición Deportiva"
      ],
      modalidades: ["Online"],
      previsiones: ["Particular", "Reembolso Isapres", "FONASA"],
      isapresDetalle: ["Colmena", "Cruz Blanca", "Banmédica", "Consalud", "Vida Tres"],
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
      subespecialidadesDestacadas: [
        "Neurodivergencia Integral",
        "Infanto-Juvenil y Geriatría"
      ],
      modalidades: ["Online"],
      previsiones: ["Particular", "Reembolso Isapres", "FONASA"],
      isapresDetalle: ["Colmena", "Cruz Blanca", "Banmédica", "Consalud", "Esencial"],
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
      rnpi: "Registro Profesional Colegio T.S. N° 14.892",
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
      isapresDetalle: [],
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
      subespecialidadesDestacadas: [
        "Salud Mental Perinatal y Preconcepción",
        "Neurodivergencia Integral"
      ],
      modalidades: ["Online"],
      previsiones: ["Particular", "Reembolso Isapres", "FONASA"],
      isapresDetalle: ["Colmena", "Cruz Blanca", "Banmédica", "Consalud", "Nueva Masvida", "Vida Tres", "Esencial"],
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
      profesion: "Médico Cirujano · Enfoque Salud Mental y Psiquiatría Adultos",
      disciplinaId: "medicina_psiquiatria",
      disciplinaNombre: "Medicina General (Salud Mental) / Psiquiatría",
      rnpi: "RNPI N° 510948",
      universidad: "Universidad de Santiago de Chile (USACH)",
      especialidades: [
        "Salud Mental Integral y Psicofarmacología Criteriosa",
        "Trastornos del Ánimo, Ansiedad, Sueño y Estrés Laboral",
        "Interconsulta Médica con Equipo de Psicología y Terapia Ocupacional"
      ],
      subespecialidadIds: ["neurodivergencia", "perinatal", "infanto_geriatria"],
      subespecialidadesDestacadas: [
        "Neurodivergencia Integral",
        "Salud Mental Perinatal y Preconcepción"
      ],
      modalidades: ["Online"],
      previsiones: ["Particular", "Reembolso Isapres"],
      isapresDetalle: ["Colmena", "Cruz Blanca", "Banmédica", "Consalud", "Nueva Masvida", "Vida Tres", "Esencial"],
      precioCLP: 48000,
      duracionMinutos: 45,
      fotoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
      enfoqueResumen: "Atención médica integral en salud mental con escucha activa, tiempo suficiente de consulta y coordinación directa con el equipo psicoterapéutico de Cabal Salud.",
      experienciaDetalle: "Evaluación diagnóstica rigurosa, seguimiento farmacológico humanizado y abordaje integral del descanso, neurodivergencia y salud metabólica.",
      formacionAcademica: [
        "Médico Cirujano — Universidad de Santiago de Chile (USACH) · EUNACOM Aprobado",
        "Diplomado en Psiquiatría de Enlace y Salud Mental Comunitaria — U. de Chile",
        "Formación Continua en Psicofarmacología Clínica"
      ]
    },
    {
      uid: "cabal_abogacia_mediacion_09",
      nombre: "Abog. Ignacia Vergara Donoso",
      profesion: "Abogada de Familia y Mediadora Familiar",
      disciplinaId: "abogacia_mediacion",
      disciplinaNombre: "Abogacía / Mediación Familiar",
      rnpi: "Corte Suprema · Registro Mediación Familiar",
      universidad: "Pontificia Universidad Católica de Valparaíso",
      especialidades: [
        "Mediación Familiar y Acuerdos Parentales (Cuidado Personal, RDR, Alimentos)",
        "Orientación Jurídica Familiar con Enfoque Psicojurídico",
        "Protección de Derechos en Infancia, Neurodivergencia y Adulto Mayor"
      ],
      subespecialidadIds: ["infanto_geriatria"],
      subespecialidadesDestacadas: ["Infanto-Juvenil y Geriatría"],
      modalidades: ["Online"],
      previsiones: ["Particular"],
      isapresDetalle: [],
      precioCLP: 40000,
      duracionMinutos: 60,
      fotoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
      enfoqueResumen: "Asesoría legal clara y mediación familiar colaborativa orientada al bienestar de niños, niñas, adolescentes y personas mayores, en diálogo con Psicología y Trabajo Social.",
      experienciaDetalle: "Especialista en resolución colaborativa de conflictos familiares, corresponsabilidad parental y resguardo jurídico en contextos de salud y cuidado.",
      formacionAcademica: [
        "Abogada — Pontificia Universidad Católica de Valparaíso",
        "Postítulo en Mediación Familiar y Derecho de Familia",
        "Diplomado en Derechos de la Infancia y Justicia de Familia"
      ]
    }
  ];

  let profesionalesCatalogo = [...CATALOGO_FALLBACK];
  let filtroDisciplinaActiva = "todas";
  let filtroSubespecialidadActiva = "todas";
  let pasarelaSeleccionada = "webpay"; // 'webpay' | 'mercadopago'
  let horaSeleccionadaBooking = "10:00";
  let citaPreagendadaId = null;

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  // Menú móvil
  window.toggleMobileMenu = function () {
    const panel = document.getElementById("mobileMenuPanel");
    if (panel) panel.classList.toggle("hidden");
  };

  // ==========================================================================
  // 1. CARGA Y FILTRADO DEL CATÁLOGO DE PROFESIONALES
  // ==========================================================================
  async function inicializarCatalogoYAgenda() {
    refreshIcons();
    renderCatalogoProfesionales();

    try {
      const res = await fetch("/api/agenda/disponibilidad");
      const data = await res.json();
      if (data && data.success && Array.isArray(data.profesionales) && data.profesionales.length > 0) {
        profesionalesCatalogo = data.profesionales;
        renderCatalogoProfesionales();
      }
    } catch (err) {
      console.warn("Usando catálogo base controlado de Cabal Salud:", err);
    }

    // Revisar si vienen parámetros de checkout directo o retorno en URL
    const params = new URLSearchParams(window.location.search);
    const checkoutCitaId = params.get("checkoutCitaId");
    const pagoEstado = params.get("pago");

    if (checkoutCitaId) {
      citaPreagendadaId = checkoutCitaId;
      window.abrirModalAgendamiento();
    } else if (pagoEstado === "anulado" || pagoEstado === "rechazado") {
      window.abrirModalAgendamiento();
      mostrarAlertaAgendamiento(
        pagoEstado === "anulado"
          ? "La transacción fue anulada antes de completarse. Puedes volver a intentarlo o elegir otro medio de pago."
          : "El pago no pudo ser autorizado por el emisor bancario. Por favor intenta nuevamente.",
        "error"
      );
    }
  }

  window.filtrarPorDisciplina = function (disciplinaId, scrollToSection = false) {
    filtroDisciplinaActiva = disciplinaId || "todas";
    document.querySelectorAll("#disciplinasFilterContainer button").forEach(btn => {
      const esActivo = btn.getAttribute("data-disc") === filtroDisciplinaActiva;
      btn.classList.toggle("active-petroleo", esActivo);
    });
    window.aplicarFiltrosCatalogo();
    if (scrollToSection) {
      const sec = document.getElementById("profesionales");
      if (sec) sec.scrollIntoView({ behavior: "smooth" });
    }
  };

  window.filtrarPorSubespecialidad = function (subId, scrollToSection = false) {
    filtroSubespecialidadActiva = subId || "todas";
    document.querySelectorAll("#subespecialidadesFilterContainer button").forEach(btn => {
      const esActivo = btn.getAttribute("data-sub") === filtroSubespecialidadActiva;
      btn.classList.toggle("active-granate", esActivo);
    });
    window.aplicarFiltrosCatalogo();
    if (scrollToSection) {
      const sec = document.getElementById("profesionales");
      if (sec) sec.scrollIntoView({ behavior: "smooth" });
    }
  };

  window.limpiarFiltrosCatalogo = function () {
    filtroDisciplinaActiva = "todas";
    filtroSubespecialidadActiva = "todas";
    const searchEl = document.getElementById("searchProfesionalInput");
    if (searchEl) searchEl.value = "";
    const prevEl = document.getElementById("selectPrevisionFiltro");
    if (prevEl) prevEl.value = "todas";

    window.filtrarPorDisciplina("todas");
    window.filtrarPorSubespecialidad("todas");
  };

  window.aplicarFiltrosCatalogo = function () {
    renderCatalogoProfesionales();
  };

  function renderCatalogoProfesionales() {
    const grid = document.getElementById("profesionalesGrid");
    if (!grid) return;

    const query = (document.getElementById("searchProfesionalInput")?.value || "").trim().toLowerCase();
    const prevFiltro = document.getElementById("selectPrevisionFiltro")?.value || "todas";

    const filtrados = profesionalesCatalogo.filter(p => {
      if (filtroDisciplinaActiva !== "todas" && p.disciplinaId !== filtroDisciplinaActiva) {
        return false;
      }
      if (filtroSubespecialidadActiva !== "todas" && !(p.subespecialidadIds || []).includes(filtroSubespecialidadActiva)) {
        return false;
      }
      if (prevFiltro !== "todas" && !(p.previsiones || []).includes(prevFiltro)) {
        return false;
      }
      if (query) {
        const textoTotal = [
          p.nombre,
          p.profesion,
          p.disciplinaNombre,
          ...(p.especialidades || []),
          ...(p.subespecialidadesDestacadas || []),
          p.enfoqueResumen
        ]
          .join(" ")
          .toLowerCase();
        if (!textoTotal.includes(query)) return false;
      }
      return true;
    });

    const counterEl = document.getElementById("catalogoCounterText");
    if (counterEl) {
      counterEl.textContent = `Mostrando ${filtrados.length} de ${profesionalesCatalogo.length} profesionales acreditados en Cabal Salud`;
    }

    const hayFiltrosActivos =
      filtroDisciplinaActiva !== "todas" ||
      filtroSubespecialidadActiva !== "todas" ||
      prevFiltro !== "todas" ||
      Boolean(query);

    const btnLimpiar = document.getElementById("btnLimpiarFiltros");
    if (btnLimpiar) btnLimpiar.classList.toggle("hidden", !hayFiltrosActivos);

    if (filtrados.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full bg-white rounded-3xl p-10 text-center border border-noche/10">
          <p class="font-serif text-xl font-bold text-noche">No encontramos especialistas con esa combinación exacta de filtros.</p>
          <p class="text-sm text-noche/70 mt-1 mb-5">Puedes limpiar los filtros o escribirnos a nuestro WhatsApp de orientación para ayudarte.</p>
          <button type="button" onclick="window.limpiarFiltrosCatalogo()" class="btn-petroleo px-5 py-2.5 rounded-xl text-sm font-semibold">
            Ver todos los profesionales
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtrados
      .map(p => {
        const subBadges = (p.subespecialidadesDestacadas || [])
          .map(
            sub =>
              `<span class="badge-granate inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px]">★ ${sub}</span>`
          )
          .join("");

        const espItems = (p.especialidades || [])
          .slice(0, 3)
          .map(
            e =>
              `<li class="flex items-start gap-1.5 text-xs text-noche/80"><span class="text-petroleo font-bold">•</span><span>${e}</span></li>`
          )
          .join("");

        const modBadges = (p.modalidades || ["Online"])
          .map(
            m =>
              `<span class="px-2.5 py-0.5 rounded-lg bg-perla text-noche text-[11px] font-semibold border border-noche/10">${
                m === "Visita a Terreno" ? "🏠 Visita a Terreno" : "💻 Online"
              }</span>`
          )
          .join("");

        const prevBadges = (p.previsiones || ["Particular"])
          .map(
            pr =>
              `<span class="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">${pr}</span>`
          )
          .join("");

        return `
          <article class="prof-card p-6 flex flex-col justify-between">
            <div class="space-y-4">
              <!-- Cabecera Foto + Nombre + RNPI -->
              <div class="flex items-start gap-4">
                <img
                  src="${p.fotoUrl}"
                  alt="${p.nombre}"
                  class="w-16 h-16 rounded-2xl object-cover border border-noche/10 shrink-0"
                />
                <div class="min-w-0">
                  <div class="inline-flex items-center gap-1 text-[11px] font-semibold text-petroleo bg-petroleo/10 px-2 py-0.5 rounded-md mb-1">
                    ${p.disciplinaNombre}
                  </div>
                  <h3 class="font-serif text-lg font-bold text-noche leading-snug">${p.nombre}</h3>
                  <p class="text-xs text-noche/70 font-medium">${p.profesion}</p>
                  <p class="text-[11px] text-noche/55 font-mono mt-0.5">${p.rnpi} · ${p.universidad}</p>
                </div>
              </div>

              <!-- Badges de Subespecialidad Estrella (Granate #772F3B) -->
              ${subBadges ? `<div class="flex flex-wrap gap-1.5">${subBadges}</div>` : ""}

              <!-- Descripción breve -->
              <p class="text-xs text-noche/75 leading-relaxed">${p.enfoqueResumen}</p>

              <!-- Lista de Especialidades -->
              <div class="bg-perla/65 rounded-xl p-3 border border-noche/5">
                <div class="text-[11px] font-bold uppercase tracking-wider text-noche/60 mb-1.5">Áreas de Especialidad</div>
                <ul class="space-y-1">${espItems}</ul>
              </div>

              <!-- Modalidad y Previsión -->
              <div class="space-y-2 pt-1">
                <div class="flex flex-wrap items-center gap-1.5">
                  <span class="text-[11px] font-semibold text-noche/60 mr-1">Modalidad:</span>
                  ${modBadges}
                </div>
                <div class="flex flex-wrap items-center gap-1.5">
                  <span class="text-[11px] font-semibold text-noche/60 mr-1">Previsión:</span>
                  ${prevBadges}
                </div>
              </div>
            </div>

            <!-- Footer de Tarjeta: Arancel y Botones Oficiales -->
            <div class="mt-6 pt-4 border-t border-noche/10 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs text-noche/65">Valor sesión (${p.duracionMinutos || 50} min)</span>
                <span class="font-serif text-xl font-bold text-noche">$${Number(p.precioCLP || 35000).toLocaleString("es-CL")} CLP</span>
              </div>
              <div class="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onclick="window.abrirModalPerfil('${p.uid}')"
                  class="btn-noche-outline py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <i data-lucide="user" class="w-3.5 h-3.5"></i>
                  <span>Ver Perfil Completo</span>
                </button>
                <button
                  type="button"
                  onclick="window.abrirModalAgendamiento('${p.uid}')"
                  class="btn-petroleo py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <i data-lucide="calendar-plus" class="w-3.5 h-3.5"></i>
                  <span>Reservar Hora</span>
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    refreshIcons();
  }

  // ==========================================================================
  // 2. MODAL VER PERFIL COMPLETO DEL PROFESIONAL
  // ==========================================================================
  window.abrirModalPerfil = function (uid) {
    const prof = profesionalesCatalogo.find(p => p.uid === uid) || profesionalesCatalogo[0];
    if (!prof) return;

    const modal = document.getElementById("modalPerfilProfesional");
    const body = document.getElementById("modalPerfilBody");
    if (!modal || !body) return;

    const formacionHtml = (prof.formacionAcademica || [])
      .map(f => `<li class="flex items-start gap-2 text-xs sm:text-sm text-noche/85"><span class="text-petroleo font-bold">✓</span><span>${f}</span></li>`)
      .join("");

    const espHtml = (prof.especialidades || [])
      .map(e => `<span class="px-3 py-1 rounded-xl bg-white border border-noche/10 text-xs font-semibold text-noche">${e}</span>`)
      .join("");

    const subHtml = (prof.subespecialidadesDestacadas || [])
      .map(s => `<span class="badge-granate px-3 py-1 rounded-xl text-xs font-semibold">★ ${s}</span>`)
      .join("");

    body.innerHTML = `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-5 border-b border-noche/10">
          <img src="${prof.fotoUrl}" alt="${prof.nombre}" class="w-24 h-24 rounded-2xl object-cover border-2 border-petroleo/20" />
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-petroleo text-white text-xs font-semibold mb-1.5">
              ${prof.disciplinaNombre}
            </div>
            <h2 class="font-serif text-2xl sm:text-3xl font-bold text-noche">${prof.nombre}</h2>
            <p class="text-sm text-noche/75 font-medium">${prof.profesion}</p>
            <p class="text-xs font-mono text-petroleo font-semibold mt-1">${prof.rnpi} · ${prof.universidad}</p>
          </div>
        </div>

        ${subHtml ? `<div><div class="text-xs font-bold uppercase tracking-wider text-granate mb-2">Subespecialidades Estrella</div><div class="flex flex-wrap gap-2">${subHtml}</div></div>` : ""}

        <div>
          <h4 class="font-serif text-lg font-bold text-noche mb-1.5">Enfoque y Experiencia Clínica</h4>
          <p class="text-sm text-noche/80 leading-relaxed">${prof.enfoqueResumen}</p>
          <p class="text-sm text-noche/75 leading-relaxed mt-2">${prof.experienciaDetalle || ""}</p>
        </div>

        <div class="bg-white rounded-2xl p-4 sm:p-5 border border-noche/10">
          <h4 class="font-serif text-base font-bold text-noche mb-2.5">Formación Académica y Acreditaciones</h4>
          <ul class="space-y-1.5">${formacionHtml}</ul>
        </div>

        <div>
          <div class="text-xs font-bold uppercase tracking-wider text-noche/60 mb-2">Áreas de Atención</div>
          <div class="flex flex-wrap gap-2">${espHtml}</div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white rounded-2xl p-4 border border-noche/10 text-xs">
          <div>
            <span class="text-noche/60 block">Modalidad</span>
            <strong class="text-noche text-sm">${(prof.modalidades || ["Online"]).join(" / ")}</strong>
          </div>
          <div>
            <span class="text-noche/60 block">Previsión</span>
            <strong class="text-noche text-sm">${(prof.previsiones || ["Particular"]).join(", ")}</strong>
          </div>
          <div>
            <span class="text-noche/60 block">Arancel por Sesión</span>
            <strong class="font-serif text-lg text-petroleo">$${Number(prof.precioCLP || 35000).toLocaleString("es-CL")} CLP</strong>
          </div>
        </div>

        <div class="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onclick="window.cerrarModalPerfil()"
            class="btn-noche-outline w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-semibold"
          >
            Cerrar
          </button>
          <button
            type="button"
            onclick="window.cerrarModalPerfil(); window.abrirModalAgendamiento('${prof.uid}')"
            class="btn-petroleo w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            <i data-lucide="calendar-check" class="w-4 h-4"></i>
            <span>Reservar Hora con ${prof.nombre.split(" ")[0]} ${prof.nombre.split(" ")[1] || ""}</span>
          </button>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    refreshIcons();
  };

  window.cerrarModalPerfil = function () {
    const modal = document.getElementById("modalPerfilProfesional");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  };

  // ==========================================================================
  // 3. MODAL / DRAWER IN-PAGE DE AGENDAMIENTO Y PAGO DIRECTO
  // ==========================================================================
  window.abrirModalAgendamiento = function (uidPreseleccionado) {
    const modal = document.getElementById("modalAgendamiento");
    if (!modal) return;

    const selectEl = document.getElementById("bookingProfesionalSelect");
    if (selectEl) {
      selectEl.innerHTML = profesionalesCatalogo
        .map(
          p =>
            `<option value="${p.uid}">${p.nombre} — ${p.disciplinaNombre} ($${Number(p.precioCLP || 35000).toLocaleString("es-CL")})</option>`
        )
        .join("");

      if (uidPreseleccionado && profesionalesCatalogo.some(p => p.uid === uidPreseleccionado)) {
        selectEl.value = uidPreseleccionado;
      }
    }

    const fechaInput = document.getElementById("bookingFechaInput");
    if (fechaInput && !fechaInput.value) {
      const manana = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      fechaInput.min = new Date().toISOString().split("T")[0];
      fechaInput.value = manana;
    }

    window.onCambioProfesionalBooking();
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    refreshIcons();
  };

  window.cerrarModalAgendamiento = function () {
    const modal = document.getElementById("modalAgendamiento");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  };

  window.onCambioProfesionalBooking = function () {
    const selectEl = document.getElementById("bookingProfesionalSelect");
    const uid = selectEl ? selectEl.value : profesionalesCatalogo[0]?.uid;
    const prof = profesionalesCatalogo.find(p => p.uid === uid) || profesionalesCatalogo[0];
    if (!prof) return;

    const rnpiTag = document.getElementById("bookingRnpiTag");
    if (rnpiTag) rnpiTag.textContent = prof.rnpi || "RNPI Verificado";

    const cardResumen = document.getElementById("bookingProfResumenCard");
    if (cardResumen) {
      cardResumen.innerHTML = `
        <img src="${prof.fotoUrl}" alt="${prof.nombre}" class="w-12 h-12 rounded-xl object-cover shrink-0 border border-noche/10" />
        <div class="min-w-0 flex-1">
          <div class="font-serif text-sm font-bold text-noche truncate">${prof.nombre}</div>
          <div class="text-xs text-noche/70 truncate">${prof.profesion}</div>
          <div class="text-[11px] text-petroleo font-semibold mt-0.5">Sesión ${prof.duracionMinutos || 50} min · $${Number(prof.precioCLP || 35000).toLocaleString("es-CL")} CLP</div>
        </div>
      `;
    }

    // Poblar modalidades del profesional (ej. Trabajo Social incluye Visita a Terreno)
    const modSelect = document.getElementById("bookingModalidadSelect");
    if (modSelect) {
      modSelect.innerHTML = (prof.modalidades || ["Online"])
        .map(
          m =>
            `<option value="${m}">${
              m === "Visita a Terreno" ? "Visita Domiciliaria / a Terreno" : "Online (Videoconsulta Segura)"
            }</option>`
        )
        .join("");
    }

    // Poblar previsiones del profesional
    const prevSelect = document.getElementById("bookingPrevisionSelect");
    if (prevSelect) {
      prevSelect.innerHTML = (prof.previsiones || ["Particular"])
        .map(pr => `<option value="${pr}">${pr}</option>`)
        .join("");
    }

    const montoTotalEl = document.getElementById("bookingMontoTotalText");
    if (montoTotalEl) {
      montoTotalEl.textContent = `$${Number(prof.precioCLP || 35000).toLocaleString("es-CL")} CLP`;
    }

    window.onCambioModalidadBooking();
    window.cargarHorariosFechaBooking();
  };

  window.onCambioModalidadBooking = function () {
    const modSelect = document.getElementById("bookingModalidadSelect");
    const container = document.getElementById("bookingDireccionContainer");
    const input = document.getElementById("bookingDireccionInput");
    if (!container) return;
    if (modSelect && modSelect.value === "Visita a Terreno") {
      container.classList.remove("hidden");
      if (input) input.required = true;
    } else {
      container.classList.add("hidden");
      if (input) input.required = false;
    }
  };

  window.cargarHorariosFechaBooking = async function () {
    const slotsContainer = document.getElementById("bookingSlotsContainer");
    const fecha = document.getElementById("bookingFechaInput")?.value || new Date().toISOString().split("T")[0];
    const profesionalId = document.getElementById("bookingProfesionalSelect")?.value || "";

    if (!slotsContainer) return;
    slotsContainer.innerHTML = `<div class="col-span-full text-xs text-noche/60 py-2">Consultando disponibilidad en tiempo real...</div>`;

    let horarios = ["09:00", "10:00", "11:00", "12:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
    try {
      const res = await fetch(
        `/api/agenda/disponibilidad?fecha=${encodeURIComponent(fecha)}&profesionalId=${encodeURIComponent(profesionalId)}`
      );
      const data = await res.json();
      if (data && data.success && Array.isArray(data.horariosDisponibles)) {
        horarios = data.horariosDisponibles;
      }
    } catch (_e) {
      // Fallback a horarios base
    }

    if (!horarios.includes(horaSeleccionadaBooking) && horarios.length > 0) {
      horaSeleccionadaBooking = horarios[0];
    }

    slotsContainer.innerHTML = horarios
      .map(
        h => `
        <button
          type="button"
          onclick="window.seleccionarHoraBooking('${h}')"
          data-hora="${h}"
          class="time-slot-btn ${h === horaSeleccionadaBooking ? "selected" : ""}"
        >
          ${h} hrs
        </button>
      `
      )
      .join("");
  };

  window.seleccionarHoraBooking = function (hora) {
    horaSeleccionadaBooking = hora;
    document.querySelectorAll("#bookingSlotsContainer .time-slot-btn").forEach(btn => {
      btn.classList.toggle("selected", btn.getAttribute("data-hora") === hora);
    });
  };

  window.seleccionarPasarela = function (pasarela) {
    pasarelaSeleccionada = pasarela === "mercadopago" ? "mercadopago" : "webpay";
    const btnW = document.getElementById("btnSelectWebpay");
    const btnM = document.getElementById("btnSelectMercadoPago");
    const btnText = document.getElementById("btnDispararPagoText");

    if (btnW && btnM) {
      if (pasarelaSeleccionada === "webpay") {
        btnW.className = "p-3.5 rounded-xl border-2 border-petroleo bg-petroleo/5 text-left transition flex items-start gap-3";
        btnM.className = "p-3.5 rounded-xl border border-noche/15 bg-white text-left transition flex items-start gap-3";
      } else {
        btnM.className = "p-3.5 rounded-xl border-2 border-petroleo bg-petroleo/5 text-left transition flex items-start gap-3";
        btnW.className = "p-3.5 rounded-xl border border-noche/15 bg-white text-left transition flex items-start gap-3";
      }
    }

    if (btnText) {
      btnText.textContent =
        pasarelaSeleccionada === "webpay"
          ? "Pagar con Webpay Plus y Confirmar Hora"
          : "Pagar con Mercado Pago y Confirmar Hora";
    }
  };

  // Validador de RUT Chileno (Algoritmo Módulo 11)
  function validarRutChileno(rutCompleto) {
    if (!rutCompleto || typeof rutCompleto !== "string") return false;
    const limpio = rutCompleto.replace(/[^0-9kK]/g, "").toUpperCase();
    if (limpio.length < 8 || limpio.length > 9) return false;
    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);
    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += multiplo * parseInt(cuerpo.charAt(i), 10);
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const dvEsperadoNum = 11 - (suma % 11);
    let dvEsperado = "0";
    if (dvEsperadoNum === 11) dvEsperado = "0";
    else if (dvEsperadoNum === 10) dvEsperado = "K";
    else dvEsperado = dvEsperadoNum.toString();
    return dv === dvEsperado;
  }

  // Formateador de RUT Chileno con validación visual en tiempo real
  window.formatearRutInput = function (inputEl) {
    let valor = (inputEl.value || "").replace(/[^0-9kK]/g, "").toUpperCase();
    if (valor.length <= 1) {
      inputEl.value = valor;
      inputEl.classList.remove("border-emerald-500", "border-red-400");
      return;
    }
    const cuerpo = valor.slice(0, -1);
    const dv = valor.slice(-1);
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    inputEl.value = `${cuerpoFormateado}-${dv}`;

    // Feedback visual si ya ingresó longitud estándar de RUT
    if (valor.length >= 8) {
      const valido = validarRutChileno(inputEl.value);
      if (valido) {
        inputEl.classList.remove("border-red-400");
        inputEl.classList.add("border-emerald-500");
      } else {
        inputEl.classList.remove("border-emerald-500");
        inputEl.classList.add("border-red-400");
      }
    } else {
      inputEl.classList.remove("border-emerald-500", "border-red-400");
    }
  };

  function mostrarAlertaAgendamiento(mensaje, tipo = "info") {
    const alertDiv = document.getElementById("agendamientoAlert");
    if (!alertDiv) return;
    alertDiv.classList.remove("hidden");
    if (tipo === "error") {
      alertDiv.className = "rounded-2xl p-4 text-xs sm:text-sm font-medium bg-red-50 text-red-800 border border-red-200";
    } else if (tipo === "success") {
      alertDiv.className = "rounded-2xl p-4 text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-800 border border-emerald-200";
    } else {
      alertDiv.className = "rounded-2xl p-4 text-xs sm:text-sm font-medium bg-petroleo/10 text-noche border border-petroleo/20";
    }
    alertDiv.innerHTML = mensaje;
  }

  // ==========================================================================
  // 4. ORQUESTACIÓN DE PAGO DIRECTO (CABAL SALUD <-> WEBPAY / MP <-> GENTIA HMAC)
  // ==========================================================================
  window.procesarReservaYPagoDirecto = async function (modoSimulacionRapida = false) {
    const profesionalId = document.getElementById("bookingProfesionalSelect")?.value || "cabal_psico_deportiva_01";
    const prof = profesionalesCatalogo.find(p => p.uid === profesionalId) || profesionalesCatalogo[0];
    const modalidad = document.getElementById("bookingModalidadSelect")?.value || "Online";
    const pacientePrevision = document.getElementById("bookingPrevisionSelect")?.value || "Particular";
    const fecha = document.getElementById("bookingFechaInput")?.value || new Date().toISOString().split("T")[0];
    const hora = horaSeleccionadaBooking || "10:00";

    const pacienteNombre = (document.getElementById("bookingNombreInput")?.value || "").trim() || (modoSimulacionRapida ? "Paciente Prueba Cabal Salud" : "");
    const rutPaciente = (document.getElementById("bookingRutInput")?.value || "").trim() || (modoSimulacionRapida ? "15.432.890-K" : "");
    const pacienteTelefono = (document.getElementById("bookingTelefonoInput")?.value || "").trim() || (modoSimulacionRapida ? "+56 9 8583 5203" : "");
    const emailPaciente = (document.getElementById("bookingEmailInput")?.value || "").trim() || (modoSimulacionRapida ? "paciente@cabalsalud.cl" : "");
    const motivo = (document.getElementById("bookingMotivoInput")?.value || "").trim();
    const consent = document.getElementById("bookingConsentCheckbox")?.checked;

    if (!pacienteNombre || !rutPaciente || !emailPaciente || !pacienteTelefono) {
      mostrarAlertaAgendamiento("Por favor completa tu Nombre, RUT, Teléfono y Correo Electrónico para continuar con la reserva.", "error");
      return;
    }

    if (!validarRutChileno(rutPaciente) && !modoSimulacionRapida) {
      mostrarAlertaAgendamiento("El RUT ingresado (" + rutPaciente + ") no es válido. Por favor verifica el dígito verificador para asegurar la correcta emisión de tu comprobante y boleta para reembolso Isapre/FONASA.", "error");
      return;
    }

    let direccion = "";
    if (modalidad === "Visita a Terreno") {
      direccion = (document.getElementById("bookingDireccionInput")?.value || "").trim();
      if (!direccion && !modoSimulacionRapida) {
        mostrarAlertaAgendamiento("Has seleccionado atención en 'Visita a Terreno'. Por favor ingresa la dirección de visita (calle, número y comuna) para coordinar con la Trabajadora Social.", "error");
        return;
      }
    }

    if (!consent) {
      mostrarAlertaAgendamiento("Debes aceptar el consentimiento informado (Ley N° 20.584 y Ley N° 21.719) para agendar tu hora.", "error");
      return;
    }

    const btn = document.getElementById("btnDispararPagoDirecto");
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span>Reservando horario y conectando con ${pasarelaSeleccionada === "webpay" ? "Transbank Webpay Plus" : "Mercado Pago"}...</span>`;
    }

    try {
      const endpointPago =
        pasarelaSeleccionada === "mercadopago"
          ? "/api/pagos/mercadopago/crear"
          : "/api/pagos/webpay/crear";

      const response = await fetch(endpointPago, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          citaId: citaPreagendadaId || undefined,
          monto: prof?.precioCLP || 35000,
          rutPaciente,
          emailPaciente,
          pacienteNombre,
          pacienteTelefono,
          pacientePrevision,
          profesionalId: prof?.uid,
          profesionalNombre: prof?.nombre,
          especialidad: prof?.disciplinaNombre,
          fecha,
          hora,
          modalidad,
          direccion,
          motivo,
          simulacionInmediata: modoSimulacionRapida
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "No fue posible iniciar la transacción directa.");
      }

      // Si es simulación inmediata o retorno sandbox directo
      if (modoSimulacionRapida && data.simulacionDirectaUrl) {
        window.location.href = data.simulacionDirectaUrl;
        return;
      }

      // Redirigir a Transbank Webpay Plus (POST/GET con token_ws) o Mercado Pago Checkout Pro
      if (pasarelaSeleccionada === "webpay" && data.url && data.token) {
        if (data.url.includes("/api/pagos/webpay/retorno")) {
          window.location.href = `${data.url}?token_ws=${encodeURIComponent(data.token)}`;
        } else {
          // Crear formulario POST estándar hacia Transbank Webpay Plus
          const form = document.createElement("form");
          form.method = "POST";
          form.action = data.url;
          const inputToken = document.createElement("input");
          inputToken.type = "hidden";
          inputToken.name = "token_ws";
          inputToken.value = data.token;
          form.appendChild(inputToken);
          document.body.appendChild(form);
          form.submit();
        }
        return;
      }

      if (data.redirectUrl || data.initPoint) {
        window.location.href = data.redirectUrl || data.initPoint;
      }
    } catch (err) {
      mostrarAlertaAgendamiento(err.message || "Error al conectar con la pasarela de pago.", "error");
      if (btn) {
        btn.disabled = false;
        window.seleccionarPasarela(pasarelaSeleccionada);
      }
    }
  };

  // Escuchar eventos postMessage desde un widget embebido de Gentia si se utiliza en modo híbrido
  window.addEventListener("message", function (event) {
    const msg = event.data;
    if (!msg || typeof msg !== "object") return;
    if (msg.type === "GENTIA_EXTERNAL_DIRECT_CHECKOUT" && msg.citaId) {
      citaPreagendadaId = msg.citaId;
      if (msg.paciente) {
        const nomEl = document.getElementById("bookingNombreInput");
        const rutEl = document.getElementById("bookingRutInput");
        const mailEl = document.getElementById("bookingEmailInput");
        const telEl = document.getElementById("bookingTelefonoInput");
        if (nomEl && msg.paciente.nombre) nomEl.value = msg.paciente.nombre;
        if (rutEl && msg.paciente.rut) rutEl.value = msg.paciente.rut;
        if (mailEl && msg.paciente.email) mailEl.value = msg.paciente.email;
        if (telEl && msg.paciente.telefono) telEl.value = msg.paciente.telefono;
      }
      window.abrirModalAgendamiento(msg.reserva?.profesionalId);
    }
  });

  document.addEventListener("DOMContentLoaded", inicializarCatalogoYAgenda);
})();
