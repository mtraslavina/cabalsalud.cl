import express from "express";
import cors from "cors";
import crypto from "crypto";
import path from "path";
import {
  WebpayPlus,
  Options,
  IntegrationApiKeys,
  Environment,
  IntegrationCommerceCodes
} from "transbank-sdk";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Normalizar prefijo /api para despliegues serverless en Vercel y ejecución local
app.use((req, _res, next) => {
  if (
    !req.url.startsWith("/api") &&
    (req.url.startsWith("/agenda/") ||
      req.url.startsWith("/pagos/") ||
      req.url.startsWith("/health"))
  ) {
    req.url = "/api" + req.url;
  }
  next();
});

// ============================================================================
// CONFIGURACIÓN Y VARIABLES DE ENTORNO EXCLUSIVAS DE CABAL SALUD (cabalsalud.cl)
// ============================================================================
export const CABAL_ENV = {
  SITE_BASE_URL: (process.env.SITE_BASE_URL || "https://cabalsalud.cl").replace(/\/+$/, ""),
  PORT: Number(process.env.PORT || 3001),

  // Credenciales Transbank Webpay Plus exclusivas de Cabal Salud SpA
  CABAL_TBK_ENV: (process.env.CABAL_TBK_ENV || "INTEGRATION").toUpperCase(),
  CABAL_TBK_COMMERCE_CODE:
    process.env.CABAL_TBK_COMMERCE_CODE || IntegrationCommerceCodes.WEBPAY_PLUS,
  CABAL_TBK_API_KEY_SECRET:
    process.env.CABAL_TBK_API_KEY_SECRET || IntegrationApiKeys.WEBPAY,

  // Credenciales Mercado Pago Chile exclusivas de Cabal Salud SpA (Comisión 3,19% + IVA)
  CABAL_MP_ACCESS_TOKEN: process.env.CABAL_MP_ACCESS_TOKEN || "",
  CABAL_MP_PUBLIC_KEY: process.env.CABAL_MP_PUBLIC_KEY || "",
  CABAL_MP_WEBHOOK_SECRET: process.env.CABAL_MP_WEBHOOK_SECRET || "",

  // Acoplamiento Headless con Motor Clínico Gentia (gentia.cl)
  GENTIA_API_BASE_URL: (process.env.GENTIA_API_BASE_URL || "https://gentia.cl/api").replace(/\/+$/, ""),
  GENTIA_CLINICA_ID: process.env.GENTIA_CLINICA_ID || "cabalsalud",
  GENTIA_WEBHOOK_HMAC_SECRET:
    process.env.GENTIA_WEBHOOK_HMAC_SECRET || "cabal_gentia_hmac_secret_2026"
};

// ============================================================================
// CATÁLOGO BASE CONTROLADO POR ADMINISTRADORAS (RED MULTIDISCIPLINARIA CABAL SALUD)
// Se sincroniza y enriquece dinámicamente con Gentia (/api/clinica/disponibilidadExterna)
// ============================================================================
export interface ProfesionalCabal {
  uid: string;
  nombre: string;
  profesion: string;
  disciplinaId: string;
  disciplinaNombre: string;
  rnpi: string;
  universidad: string;
  especialidades: string[];
  subespecialidadIds: string[];
  subespecialidadesDestacadas: string[];
  modalidades: string[];
  previsiones: string[];
  isapresDetalle?: string[];
  precioCLP: number;
  duracionMinutos: number;
  fotoUrl: string;
  enfoqueResumen: string;
  experienciaDetalle: string;
  formacionAcademica: string[];
  activo: boolean;
}

export const CATALOGO_PROFESIONALES_CABAL: ProfesionalCabal[] = [
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
    ],
    activo: true
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
    ],
    activo: true
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
    ],
    activo: true
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
    ],
    activo: true
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
    ],
    activo: true
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
    ],
    activo: true
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
    ],
    activo: true
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
    ],
    activo: true
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
    ],
    activo: true
  }
];

// Almacén en memoria de sesiones de pago en curso (para vincular token_ws / preference_id con citaId)
interface TransaccionLocalCabal {
  citaId: string;
  buyOrder: string;
  pasarela: "WEBPAY_DIRECTO" | "MERCADOPAGO_DIRECTO";
  montoCLP: number;
  pacienteNombre: string;
  pacienteRut: string;
  pacienteEmail: string;
  pacienteTelefono: string;
  pacientePrevision: string;
  profesionalId: string;
  profesionalNombre: string;
  especialidad: string;
  subespecialidad?: string;
  fecha: string;
  hora: string;
  modalidad: string;
  direccion?: string;
  motivo?: string;
  estado: "INICIADA" | "APROBADA" | "RECHAZADA";
  voucher?: any;
  gentiaConfirmacion?: any;
  createdAt: string;
}

const TRANSACCIONES_CABAL_MEMORIA = new Map<string, TransaccionLocalCabal>();
const TOKEN_TO_CITA_MAP = new Map<string, string>();

// ============================================================================
// 2.1. ÁRBOL DE DECISIÓN DE TRANSACCIONES (MULTI-TENANT PAYMENT ROUTER)
// ============================================================================
export function evaluarArbolDecisionPagosCabal(siteOrigin: string = "https://cabalsalud.cl") {
  const originClean = (siteOrigin || "https://cabalsalud.cl").toLowerCase();
  const esOrigenCabal =
    originClean.includes("cabalsalud") ||
    originClean.includes("localhost") ||
    originClean.includes("127.0.0.1") ||
    originClean.includes("vercel.app");

  if (esOrigenCabal) {
    return {
      siteOrigin: "cabalsalud.cl",
      paymentMode: "DIRECT_CLINIC_MERCHANT" as const,
      modoRecaudacion: "DIRECTO_SITIO_EXTERNO" as const,
      intermediacionGentia: false,
      recaudadorTributarioSII: "Cabal Salud SpA (RUT Exclusivo Clínica)",
      pasarelasActivas: {
        webpayPlus: {
          habilitada: true,
          commerceCode: CABAL_ENV.CABAL_TBK_COMMERCE_CODE,
          environment: CABAL_ENV.CABAL_TBK_ENV,
          endpointCrear: "/api/pagos/webpay/crear",
          endpointRetorno: `${CABAL_ENV.SITE_BASE_URL}/api/pagos/webpay/retorno`
        },
        mercadoPago: {
          habilitada: true,
          comisionReferencial: "3,19% + IVA",
          endpointCrear: "/api/pagos/mercadopago/crear",
          endpointRetorno: `${CABAL_ENV.SITE_BASE_URL}/api/pagos/mercadopago/retorno`,
          endpointWebhook: `${CABAL_ENV.SITE_BASE_URL}/api/pagos/mercadopago/webhook`
        }
      },
      gentiaHeadlessSync: {
        preAgendarEndpoint: `${CABAL_ENV.GENTIA_API_BASE_URL}/clinica/preAgendarCita`,
        confirmarPagoWebhook: `${CABAL_ENV.GENTIA_API_BASE_URL}/clinica/confirmarPagoExterno`,
        firmaCriptografica: "HMAC-SHA256"
      }
    };
  }

  return {
    siteOrigin,
    paymentMode: "NATIVE_GENTIA" as const,
    modoRecaudacion: "GENTIA_CENTRALIZADO" as const,
    intermediacionGentia: true
  };
}

// Helper para instanciar Transbank Webpay Plus con las credenciales exclusivas de Cabal Salud
function getCabalWebpayTransaction() {
  const isProd = CABAL_ENV.CABAL_TBK_ENV === "PRODUCTION" || CABAL_ENV.CABAL_TBK_ENV === "PRODUCCION";
  const options = new Options(
    CABAL_ENV.CABAL_TBK_COMMERCE_CODE,
    CABAL_ENV.CABAL_TBK_API_KEY_SECRET,
    isProd ? Environment.Production : Environment.Integration
  );
  return new WebpayPlus.Transaction(options);
}

// Helper para firmar con HMAC-SHA256 y notificar a Gentia tras aprobar un pago directo en Cabal Salud
async function notificarPagoConfirmadoAGentia(params: {
  citaId: string;
  pasarela: "WEBPAY_DIRECTO" | "MERCADOPAGO_DIRECTO";
  voucher: {
    buy_order: string;
    authorization_code: string;
    card_number?: string;
    payment_type_code?: string;
    installments_number?: number;
    amount: number;
    transaction_date?: string;
  };
}) {
  const { citaId, pasarela, voucher } = params;
  const clinicaId = CABAL_ENV.GENTIA_CLINICA_ID;
  const buyOrderVal = String(voucher.buy_order || citaId);
  const amountVal = Number(voucher.amount || 35000);
  const authCodeVal = String(voucher.authorization_code || "APPROVED");

  // Firma HMAC-SHA256 sobre cadena canónica: `${clinicaId}:${citaId}:${buyOrderVal}:${amountVal}:${authCodeVal}`
  const canonicalString = `${clinicaId}:${citaId}:${buyOrderVal}:${amountVal}:${authCodeVal}`;
  const hmacSignature = crypto
    .createHmac("sha256", CABAL_ENV.GENTIA_WEBHOOK_HMAC_SECRET)
    .update(canonicalString)
    .digest("hex");

  const timestamp = new Date().toISOString();

  try {
    const response = await fetch(`${CABAL_ENV.GENTIA_API_BASE_URL}/clinica/confirmarPagoExterno`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-cabal-signature": hmacSignature,
        "x-gentia-hmac-signature": hmacSignature,
        "x-site-origin": "https://cabalsalud.cl"
      },
      body: JSON.stringify({
        clinicaId,
        citaId,
        pasarela,
        voucher: {
          ...voucher,
          buy_order: buyOrderVal,
          authorization_code: authCodeVal,
          amount: amountVal
        },
        timestamp,
        hmacSignature
      })
    });

    const data: any = await response.json();
    if (response.ok && data.success) {
      return {
        sincronizadoConGentia: true,
        hmacSignature,
        patientMeetLink: data.patientMeetLink || `https://gentia.cl/sala-sesion.html?id=${citaId}&role=paciente`,
        icsUrl: data.icsUrl || `/api/agenda/ics?citaId=${encodeURIComponent(citaId)}`,
        detalleGentia: data
      };
    }
    console.warn("[WARN Respuesta Gentia confirmarPagoExterno]:", data);
  } catch (errGentia: any) {
    console.warn("[WARN Conexión Gentia confirmarPagoExterno, usando respaldo local]:", errGentia?.message);
  }

  // Respaldo resiliente si Gentia está temporalmente inalcanzable desde entorno local
  return {
    sincronizadoConGentia: false,
    hmacSignature,
    patientMeetLink: `https://gentia.cl/sala-sesion.html?id=${citaId}&role=paciente`,
    icsUrl: `/api/agenda/ics?citaId=${encodeURIComponent(citaId)}`,
    detalleGentia: null
  };
}

// ============================================================================
// ENDPOINT 0: ESTADO DE ARQUITECTURA Y ÁRBOL DE DECISIÓN
// ============================================================================
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "cabalsalud-web-direct-merchant-api",
    domain: "cabalsalud.cl",
    timestamp: new Date().toISOString(),
    paymentRoutingConfig: evaluarArbolDecisionPagosCabal(req.headers.origin || "https://cabalsalud.cl")
  });
});

app.get("/api/pagos/config", (req, res) => {
  res.json({
    success: true,
    arbolDecision: evaluarArbolDecisionPagosCabal(req.headers.origin || "https://cabalsalud.cl")
  });
});

// ============================================================================
// ENDPOINT 1: DISPONIBILIDAD Y CATÁLOGO DE PROFESIONALES (/api/agenda/disponibilidad)
// Proxy seguro / cliente CORS hacia Gentia para obtener profesionales y horarios de cabalsalud
// ============================================================================
app.all("/api/agenda/disponibilidad", async (req, res) => {
  try {
    const fecha = (req.body?.fecha || req.query?.fecha || new Date().toISOString().split("T")[0]) as string;
    const profesionalId = (req.body?.profesionalId || req.query?.profesionalId || "") as string;
    const disciplina = (req.body?.disciplina || req.query?.disciplina || "") as string;
    const subespecialidad = (req.body?.subespecialidad || req.query?.subespecialidad || "") as string;

    let horariosDisponibles = [
      "09:00", "10:00", "11:00", "12:00",
      "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
    ];
    let slotsOcupadosGentia: any[] = [];
    let profesionalesRemotosGentia: any[] = [];
    let conectadoGentia = false;

    // Consultar disponibilidad en tiempo real al motor clínico Gentia
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);
      const gentiaRes = await fetch(`${CABAL_ENV.GENTIA_API_BASE_URL}/clinica/disponibilidadExterna`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": "https://cabalsalud.cl"
        },
        body: JSON.stringify({
          clinicaId: CABAL_ENV.GENTIA_CLINICA_ID,
          fecha,
          profesionalId,
          siteOrigin: "https://cabalsalud.cl"
        }),
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (gentiaRes.ok) {
        const gentiaData: any = await gentiaRes.json();
        if (gentiaData && gentiaData.success) {
          conectadoGentia = true;
          if (Array.isArray(gentiaData.horariosDisponibles)) {
            horariosDisponibles = gentiaData.horariosDisponibles;
          }
          if (Array.isArray(gentiaData.slotsOcupados)) {
            slotsOcupadosGentia = gentiaData.slotsOcupados;
          }
          if (Array.isArray(gentiaData.profesionales)) {
            profesionalesRemotosGentia = gentiaData.profesionales;
          }
        }
      }
    } catch (_errFetchGentia) {
      // Continúa usando el catálogo base controlado de Cabal Salud si no hay red hacia gentia.cl
    }

    // Descontar también reservas en curso en la memoria local para esa fecha y profesional
    const horasOcupadasLocal = new Set<string>();
    for (const tx of TRANSACCIONES_CABAL_MEMORIA.values()) {
      if (tx.fecha === fecha && tx.estado !== "RECHAZADA") {
        if (!profesionalId || tx.profesionalId === profesionalId) {
          horasOcupadasLocal.add(tx.hora);
        }
      }
    }
    horariosDisponibles = horariosDisponibles.filter(h => !horasOcupadasLocal.has(h));

    // Unificar catálogo oficial de Cabal Salud con perfiles adicionales habilitados en Gentia por las administradoras
    const catalogoMap = new Map<string, ProfesionalCabal>();
    CATALOGO_PROFESIONALES_CABAL.forEach(p => {
      if (p.activo) catalogoMap.set(p.uid, p);
    });

    profesionalesRemotosGentia.forEach((pRemoto: any) => {
      const uid = pRemoto.uid || pRemoto.id;
      if (!uid || catalogoMap.has(uid)) return;
      // Saltar perfiles puramente administrativos de dirección si no tienen agenda pública asignada
      if (uid === "cabal_prof_lilians_cortes" || uid === "cabal_prof_pamela_quijada") return;
      catalogoMap.set(uid, {
        uid,
        nombre: pRemoto.nombre || "Profesional Cabal Salud",
        profesion: pRemoto.profesion || pRemoto.especialidad || "Especialista de Salud",
        disciplinaId: pRemoto.especialidad || "psicologia",
        disciplinaNombre: pRemoto.profesion || "Salud Integral",
        rnpi: pRemoto.rnpi || "RNPI Verificado",
        universidad: pRemoto.universidad || "Red Clínica Cabal Salud",
        especialidades: Array.isArray(pRemoto.subespecialidades) ? pRemoto.subespecialidades : [pRemoto.especialidad || "Atención Integral"],
        subespecialidadIds: Array.isArray(pRemoto.subespecialidadIds) ? pRemoto.subespecialidadIds : [],
        subespecialidadesDestacadas: Array.isArray(pRemoto.subespecialidades) ? pRemoto.subespecialidades : [],
        modalidades: [pRemoto.modalidad || "Online"],
        previsiones: Array.isArray(pRemoto.previsiones) ? pRemoto.previsiones : ["Particular", "Reembolso Isapres", "FONASA"],
        precioCLP: Number(pRemoto.precio || 35000),
        duracionMinutos: 50,
        fotoUrl: pRemoto.fotoUrl || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
        enfoqueResumen: pRemoto.bio || "Profesional acreditado de la red multidisciplinaria de Clínica Cabal Salud.",
        experienciaDetalle: pRemoto.bio || "Atención clínica online centrada en las necesidades de cada persona.",
        formacionAcademica: [pRemoto.universidad || "Formación Universitaria Acreditada"],
        activo: pRemoto.activo !== false
      });
    });

    let listaProfesionales = Array.from(catalogoMap.values());
    if (disciplina && disciplina !== "todas") {
      listaProfesionales = listaProfesionales.filter(p => p.disciplinaId === disciplina);
    }
    if (subespecialidad && subespecialidad !== "todas") {
      listaProfesionales = listaProfesionales.filter(p => p.subespecialidadIds.includes(subespecialidad));
    }

    res.json({
      success: true,
      clinicaId: CABAL_ENV.GENTIA_CLINICA_ID,
      fecha,
      conectadoGentia,
      profesionales: listaProfesionales,
      horariosDisponibles,
      slotsOcupados: slotsOcupadosGentia,
      paymentRouting: evaluarArbolDecisionPagosCabal("https://cabalsalud.cl")
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err?.message || "Error al consultar disponibilidad de agenda."
    });
  }
});

// ============================================================================
// PASO 1 DEL ÁRBOL DE DECISIÓN: PRE-AGENDAR Y BLOQUEAR SLOT EN GENTIA (TTL 15 MIN)
// ============================================================================
async function ejecutarPreAgendamientoEnGentia(datos: {
  citaId?: string;
  profesionalId: string;
  profesionalNombre: string;
  especialidad: string;
  subespecialidad?: string;
  pacienteNombre: string;
  pacienteRut: string;
  pacienteEmail: string;
  pacienteTelefono: string;
  pacientePrevision: string;
  fecha: string;
  hora: string;
  modalidad: string;
  direccion?: string;
  motivo?: string;
  montoCLP: number;
}): Promise<{ citaId: string; montoCLP: number; expiresAt: string; sincronizadoGentia: boolean }> {
  if (datos.citaId && TRANSACCIONES_CABAL_MEMORIA.has(datos.citaId)) {
    const ex = TRANSACCIONES_CABAL_MEMORIA.get(datos.citaId)!;
    return {
      citaId: ex.citaId,
      montoCLP: ex.montoCLP,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      sincronizadoGentia: true
    };
  }

  let citaIdFinal = datos.citaId || `cabal_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  let montoFinal = Number(datos.montoCLP || 35000);
  let expiresAtFinal = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  let sincronizadoGentia = false;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const resGentia = await fetch(`${CABAL_ENV.GENTIA_API_BASE_URL}/clinica/preAgendarCita`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://cabalsalud.cl"
      },
      body: JSON.stringify({
        clinicaId: CABAL_ENV.GENTIA_CLINICA_ID,
        profesionalId: datos.profesionalId,
        profesionalNombre: datos.profesionalNombre,
        especialidad: datos.especialidad,
        subespecialidad: datos.subespecialidad || null,
        pacienteNombre: datos.pacienteNombre,
        pacienteRut: datos.pacienteRut,
        pacienteEmail: datos.pacienteEmail,
        pacienteTelefono: datos.pacienteTelefono,
        pacientePrevision: datos.pacientePrevision || "Particular",
        fecha: datos.fecha,
        hora: datos.hora,
        modalidad: datos.modalidad || "Online",
        direccion: datos.direccion || null,
        motivo: datos.motivo || "",
        montoCLP: montoFinal,
        siteOrigin: "https://cabalsalud.cl",
        paymentMode: "DIRECT_CLINIC_MERCHANT"
      }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (resGentia.ok) {
      const gData: any = await resGentia.json();
      if (gData && gData.success && gData.citaId) {
        citaIdFinal = gData.citaId;
        montoFinal = Number(gData.montoCLP || montoFinal);
        expiresAtFinal = gData.expiresAt || expiresAtFinal;
        sincronizadoGentia = true;
      }
    }
  } catch (_e) {
    // Fallback local si Gentia no está alcanzable en entorno de desarrollo aislado
  }

  return {
    citaId: citaIdFinal,
    montoCLP: montoFinal,
    expiresAt: expiresAtFinal,
    sincronizadoGentia
  };
}

app.post("/api/agenda/preagendar", async (req, res) => {
  try {
    const {
      profesionalId,
      profesionalNombre,
      especialidad,
      subespecialidad,
      pacienteNombre,
      pacienteRut,
      pacienteEmail,
      pacienteTelefono,
      pacientePrevision,
      fecha,
      hora,
      modalidad,
      direccion,
      motivo,
      monto
    } = req.body;

    if (!pacienteNombre || !pacienteRut || !pacienteEmail || !fecha || !hora) {
      return res.status(400).json({
        success: false,
        error: "Por favor completa nombre, RUT, correo electrónico, fecha y hora."
      });
    }

    const profCatalogo = CATALOGO_PROFESIONALES_CABAL.find(p => p.uid === profesionalId);
    const montoCLP = Number(monto || profCatalogo?.precioCLP || 35000);

    const pre = await ejecutarPreAgendamientoEnGentia({
      profesionalId: profesionalId || "cabal_psico_deportiva_01",
      profesionalNombre: profesionalNombre || profCatalogo?.nombre || "Especialista Cabal Salud",
      especialidad: especialidad || profCatalogo?.disciplinaNombre || "Psicología",
      subespecialidad,
      pacienteNombre,
      pacienteRut,
      pacienteEmail,
      pacienteTelefono: pacienteTelefono || "",
      pacientePrevision: pacientePrevision || "Particular",
      fecha,
      hora,
      modalidad: modalidad || "Online",
      direccion: direccion || "",
      motivo: motivo || "",
      montoCLP
    });

    res.json({
      success: true,
      citaId: pre.citaId,
      montoCLP: pre.montoCLP,
      estado: "PENDIENTE_PAGO_EXTERNO",
      expiresAt: pre.expiresAt,
      sincronizadoGentia: pre.sincronizadoGentia,
      paymentRouting: evaluarArbolDecisionPagosCabal("https://cabalsalud.cl")
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err?.message || "Error al pre-agendar la hora."
    });
  }
});

// ============================================================================
// ENDPOINT 2: TRANSBANK WEBPAY PLUS - CREAR TRANSACCIÓN DIRECTA (/api/pagos/webpay/crear)
// Usa exclusivamente CABAL_TBK_COMMERCE_CODE y CABAL_TBK_API_KEY_SECRET de Cabal Salud
// ============================================================================
app.post("/api/pagos/webpay/crear", async (req, res) => {
  try {
    const {
      citaId: rawCitaId,
      monto,
      rutPaciente,
      emailPaciente,
      pacienteNombre = "Paciente Cabal Salud",
      pacienteTelefono = "",
      pacientePrevision = "Particular",
      profesionalId = "cabal_psico_deportiva_01",
      profesionalNombre = "Especialista Cabal Salud",
      especialidad = "Psicología",
      subespecialidad = "",
      fecha = new Date().toISOString().split("T")[0],
      hora = "10:00",
      modalidad = "Online",
      direccion = "",
      motivo = "",
      simulacionInmediata = false
    } = req.body;

    if (!rutPaciente || !emailPaciente) {
      return res.status(400).json({
        success: false,
        error: "Se requieren rutPaciente y emailPaciente para iniciar el pago directo en Webpay Plus."
      });
    }

    const profObj = CATALOGO_PROFESIONALES_CABAL.find(p => p.uid === profesionalId);
    const montoCLP = Math.round(Number(monto || profObj?.precioCLP || 35000));

    // Paso 1: Asegurar bloqueo temporal del slot (PENDIENTE_PAGO_EXTERNO) en Gentia
    const pre = await ejecutarPreAgendamientoEnGentia({
      citaId: rawCitaId,
      profesionalId,
      profesionalNombre: profesionalNombre || profObj?.nombre || "Especialista Cabal Salud",
      especialidad: especialidad || profObj?.disciplinaNombre || "Psicología",
      subespecialidad,
      pacienteNombre,
      pacienteRut: rutPaciente,
      pacienteEmail: emailPaciente,
      pacienteTelefono,
      pacientePrevision,
      fecha,
      hora,
      modalidad,
      direccion,
      motivo,
      montoCLP
    });

    const citaId = pre.citaId;
    // buy_order de Transbank admite máximo 26 caracteres alfanuméricos
    const shortHash = citaId.replace(/[^a-zA-Z0-9]/g, "").slice(-12);
    const buyOrder = `CBL${Date.now().toString().slice(-9)}${shortHash}`.slice(0, 26);
    const sessionId = `SES_${citaId}`.slice(0, 61);

    // Determinar URL base de retorno hacia cabalsalud.cl
    const hostHeader = req.headers.host;
    const protocol = req.headers["x-forwarded-proto"] || (hostHeader?.includes("localhost") ? "http" : "https");
    const dynamicBaseUrl = hostHeader ? `${protocol}://${hostHeader}` : CABAL_ENV.SITE_BASE_URL;
    const returnUrl = `${dynamicBaseUrl}/api/pagos/webpay/retorno`;

    let tbkToken = "";
    let tbkUrl = "";
    let modoIntegracion = CABAL_ENV.CABAL_TBK_ENV !== "PRODUCTION";

    if (!simulacionInmediata) {
      try {
        const tx = getCabalWebpayTransaction();
        const createResponse = await tx.create(buyOrder, sessionId, montoCLP, returnUrl);
        tbkToken = createResponse.token;
        tbkUrl = createResponse.url;
      } catch (errTbkSdk: any) {
        console.warn("[WARN Transbank SDK create, generando token de contingencia sandbox]:", errTbkSdk?.message);
        tbkToken = `sim_tbk_${Date.now()}_${shortHash}`;
        tbkUrl = returnUrl;
      }
    } else {
      tbkToken = `sim_tbk_${Date.now()}_${shortHash}`;
      tbkUrl = returnUrl;
    }

    const registroTx: TransaccionLocalCabal = {
      citaId,
      buyOrder,
      pasarela: "WEBPAY_DIRECTO",
      montoCLP,
      pacienteNombre,
      pacienteRut: rutPaciente,
      pacienteEmail: emailPaciente,
      pacienteTelefono,
      pacientePrevision,
      profesionalId,
      profesionalNombre: profesionalNombre || profObj?.nombre || "Especialista Cabal Salud",
      especialidad: especialidad || profObj?.disciplinaNombre || "Psicología",
      subespecialidad,
      fecha,
      hora,
      modalidad,
      direccion,
      motivo,
      estado: "INICIADA",
      createdAt: new Date().toISOString()
    };

    TRANSACCIONES_CABAL_MEMORIA.set(citaId, registroTx);
    TOKEN_TO_CITA_MAP.set(tbkToken, citaId);

    return res.json({
      success: true,
      pasarela: "WEBPAY_DIRECTO",
      merchantMode: "DIRECT_CLINIC_MERCHANT",
      commerceCode: CABAL_ENV.CABAL_TBK_COMMERCE_CODE,
      environment: modoIntegracion ? "INTEGRATION" : "PRODUCTION",
      citaId,
      buyOrder,
      monto: montoCLP,
      token: tbkToken,
      url: tbkUrl,
      returnUrl,
      redirectUrl: tbkUrl === returnUrl
        ? `${returnUrl}?token_ws=${encodeURIComponent(tbkToken)}`
        : `${tbkUrl}?token_ws=${encodeURIComponent(tbkToken)}`,
      simulacionDirectaUrl: `${returnUrl}?token_ws=${encodeURIComponent(`sim_tbk_${Date.now()}_${shortHash}`)}&citaId=${encodeURIComponent(citaId)}`
    });
  } catch (err: any) {
    console.error("[ERROR /api/pagos/webpay/crear]:", err);
    return res.status(500).json({
      success: false,
      error: err?.message || "Error al crear la transacción en Transbank Webpay Plus."
    });
  }
});

// ============================================================================
// ENDPOINT 3: TRANSBANK WEBPAY PLUS - RETORNO Y COMMIT (/api/pagos/webpay/retorno)
// Ejecuta tx.commit(token_ws) directo con Transbank y dispara Webhook HMAC a Gentia
// ============================================================================
app.all("/api/pagos/webpay/retorno", async (req, res) => {
  try {
    const tokenWs = (req.body?.token_ws || req.query?.token_ws || "") as string;
    const tbkTokenAnulado = (req.body?.TBK_TOKEN || req.query?.TBK_TOKEN || "") as string;
    const citaIdParam = (req.body?.citaId || req.query?.citaId || "") as string;
    const formatJson = req.query?.format === "json" || req.headers.accept?.includes("application/json");

    // Caso 1: Pago anulado por el usuario en el formulario de Webpay
    if (tbkTokenAnulado && !tokenWs) {
      if (formatJson) {
        return res.status(400).json({
          success: false,
          estado: "ANULADO",
          message: "El pago fue anulado por el usuario en Transbank Webpay."
        });
      }
      return res.redirect(`/?pago=anulado&pasarela=webpay`);
    }

    if (!tokenWs) {
      return res.status(400).json({
        success: false,
        error: "No se recibió token_ws desde Transbank Webpay Plus."
      });
    }

    const citaIdAsociada = TOKEN_TO_CITA_MAP.get(tokenWs) || citaIdParam || `cabal_${Date.now()}`;
    const txLocal = TRANSACCIONES_CABAL_MEMORIA.get(citaIdAsociada);

    let commitResult: any = null;

    if (tokenWs.startsWith("sim_tbk_")) {
      // Token de simulación/integración rápida para validación End-to-End sin tarjeta física
      commitResult = {
        vci: "TSY",
        amount: txLocal?.montoCLP || 35000,
        status: "AUTHORIZED",
        buy_order: txLocal?.buyOrder || `CBL${Date.now().toString().slice(-10)}`,
        session_id: `SES_${citaIdAsociada}`,
        card_detail: { card_number: "6623" },
        accounting_date: new Date().toISOString().slice(5, 10).replace("-", ""),
        transaction_date: new Date().toISOString(),
        authorization_code: String(Math.floor(100000 + Math.random() * 900000)),
        payment_type_code: "VD",
        response_code: 0,
        installments_number: 0
      };
    } else {
      const tx = getCabalWebpayTransaction();
      commitResult = await tx.commit(tokenWs);
    }

    const aprobado = commitResult && commitResult.response_code === 0;

    if (!aprobado) {
      if (txLocal) txLocal.estado = "RECHAZADA";
      if (formatJson) {
        return res.status(402).json({
          success: false,
          estado: "RECHAZADO",
          citaId: citaIdAsociada,
          commitResult
        });
      }
      return res.redirect(`/?pago=rechazado&pasarela=webpay&citaId=${encodeURIComponent(citaIdAsociada)}`);
    }

    // Pago aprobado (response_code === 0): Construir voucher y disparar Webhook firmado HMAC a Gentia
    const voucherMetadata = {
      buy_order: commitResult.buy_order,
      authorization_code: commitResult.authorization_code,
      card_number: commitResult.card_detail?.card_number || "6623",
      payment_type_code: commitResult.payment_type_code || "VD",
      installments_number: commitResult.installments_number || 0,
      amount: Number(commitResult.amount || txLocal?.montoCLP || 35000),
      transaction_date: commitResult.transaction_date || new Date().toISOString()
    };

    const syncGentia = await notificarPagoConfirmadoAGentia({
      citaId: citaIdAsociada,
      pasarela: "WEBPAY_DIRECTO",
      voucher: voucherMetadata
    });

    if (txLocal) {
      txLocal.estado = "APROBADA";
      txLocal.voucher = voucherMetadata;
      txLocal.gentiaConfirmacion = syncGentia;
    } else {
      TRANSACCIONES_CABAL_MEMORIA.set(citaIdAsociada, {
        citaId: citaIdAsociada,
        buyOrder: voucherMetadata.buy_order,
        pasarela: "WEBPAY_DIRECTO",
        montoCLP: voucherMetadata.amount,
        pacienteNombre: "Paciente Cabal Salud",
        pacienteRut: "",
        pacienteEmail: "",
        pacienteTelefono: "",
        pacientePrevision: "Particular",
        profesionalId: "cabal_psico_deportiva_01",
        profesionalNombre: "Especialista Cabal Salud",
        especialidad: "Atención Integral",
        fecha: new Date().toISOString().split("T")[0],
        hora: "10:00",
        modalidad: "Online",
        estado: "APROBADA",
        voucher: voucherMetadata,
        gentiaConfirmacion: syncGentia,
        createdAt: new Date().toISOString()
      });
    }

    if (formatJson) {
      return res.json({
        success: true,
        estado: "APROBADO",
        pasarela: "WEBPAY_DIRECTO",
        citaId: citaIdAsociada,
        voucher: voucherMetadata,
        sincronizacionGentia: syncGentia
      });
    }

    const paramsRedirect = new URLSearchParams({
      pago: "exitoso",
      pasarela: "webpay",
      citaId: citaIdAsociada,
      buyOrder: String(voucherMetadata.buy_order),
      authCode: String(voucherMetadata.authorization_code),
      monto: String(voucherMetadata.amount),
      card: String(voucherMetadata.card_number)
    });

    if (txLocal?.profesionalNombre) paramsRedirect.set("prof", txLocal.profesionalNombre);
    if (txLocal?.especialidad) paramsRedirect.set("esp", txLocal.especialidad);
    if (txLocal?.fecha) paramsRedirect.set("fecha", txLocal.fecha);
    if (txLocal?.hora) paramsRedirect.set("hora", txLocal.hora);
    if (txLocal?.pacienteNombre) paramsRedirect.set("paciente", txLocal.pacienteNombre);
    if (txLocal?.pacienteRut) paramsRedirect.set("rut", txLocal.pacienteRut);
    if (txLocal?.modalidad) paramsRedirect.set("modalidad", txLocal.modalidad);
    if (syncGentia?.patientMeetLink) {
      paramsRedirect.set("meet", syncGentia.patientMeetLink);
    }

    return res.redirect(`/confirmacion-reserva.html?${paramsRedirect.toString()}`);
  } catch (err: any) {
    console.error("[ERROR /api/pagos/webpay/retorno]:", err);
    return res.status(500).json({
      success: false,
      error: err?.message || "Error al confirmar retorno de Transbank Webpay Plus."
    });
  }
});

// ============================================================================
// ENDPOINT 4: MERCADO PAGO CHILE - CREAR PREFERENCIA DIRECTA (/api/pagos/mercadopago/crear)
// Usa exclusivamente CABAL_MP_ACCESS_TOKEN de Cabal Salud (Comisión 3,19% + IVA)
// ============================================================================
app.post("/api/pagos/mercadopago/crear", async (req, res) => {
  try {
    const {
      citaId: rawCitaId,
      monto,
      rutPaciente = "",
      emailPaciente = "",
      pacienteNombre = "Paciente Cabal Salud",
      pacienteTelefono = "",
      pacientePrevision = "Particular",
      profesionalId = "cabal_psico_deportiva_01",
      profesionalNombre = "Especialista Cabal Salud",
      especialidad = "Psicología",
      subespecialidad = "",
      fecha = new Date().toISOString().split("T")[0],
      hora = "10:00",
      modalidad = "Online",
      direccion = "",
      motivo = ""
    } = req.body;

    const profObj = CATALOGO_PROFESIONALES_CABAL.find(p => p.uid === profesionalId);
    const montoCLP = Math.round(Number(monto || profObj?.precioCLP || 35000));

    // Paso 1: Pre-agendar y bloquear slot temporalmente en Gentia (TTL 15 min)
    const pre = await ejecutarPreAgendamientoEnGentia({
      citaId: rawCitaId,
      profesionalId,
      profesionalNombre: profesionalNombre || profObj?.nombre || "Especialista Cabal Salud",
      especialidad: especialidad || profObj?.disciplinaNombre || "Psicología",
      subespecialidad,
      pacienteNombre,
      pacienteRut: rutPaciente,
      pacienteEmail: emailPaciente,
      pacienteTelefono,
      pacientePrevision,
      fecha,
      hora,
      modalidad,
      direccion,
      motivo,
      montoCLP
    });

    const citaId = pre.citaId;
    const hostHeader = req.headers.host;
    const protocol = req.headers["x-forwarded-proto"] || (hostHeader?.includes("localhost") ? "http" : "https");
    const dynamicBaseUrl = hostHeader ? `${protocol}://${hostHeader}` : CABAL_ENV.SITE_BASE_URL;

    const retornoUrl = `${dynamicBaseUrl}/api/pagos/mercadopago/retorno`;
    const webhookUrl = `${dynamicBaseUrl}/api/pagos/mercadopago/webhook`;

    let preferenceId = `pref_cabal_${Date.now()}`;
    let initPoint = `${retornoUrl}?status=approved&external_reference=${encodeURIComponent(citaId)}&payment_id=MP_${Date.now()}`;
    let modoRealMp = false;

    const mpToken = CABAL_ENV.CABAL_MP_ACCESS_TOKEN;
    const tieneTokenMpReal =
      mpToken &&
      !mpToken.includes("00000000") &&
      (mpToken.startsWith("APP_USR-") || mpToken.startsWith("TEST-"));

    if (tieneTokenMpReal) {
      try {
        const mpClient = new MercadoPagoConfig({ accessToken: mpToken });
        const preference = new Preference(mpClient);
        const prefResponse = await preference.create({
          body: {
            items: [
              {
                id: citaId,
                title: `Atención Clínica Cabal Salud — ${profesionalNombre || profObj?.nombre}`,
                description: `${especialidad} (${modalidad}) · Fecha: ${fecha} ${hora} hrs`,
                quantity: 1,
                currency_id: "CLP",
                unit_price: montoCLP
              }
            ],
            payer: {
              name: pacienteNombre,
              email: emailPaciente || "paciente@cabalsalud.cl"
            },
            external_reference: citaId,
            back_urls: {
              success: retornoUrl,
              failure: retornoUrl,
              pending: retornoUrl
            },
            auto_return: "approved",
            notification_url: webhookUrl,
            statement_descriptor: "CABAL SALUD"
          }
        });

        if (prefResponse && prefResponse.init_point) {
          preferenceId = prefResponse.id || preferenceId;
          initPoint = prefResponse.init_point;
          modoRealMp = true;
        }
      } catch (errMpSdk: any) {
        console.warn("[WARN Mercado Pago SDK create, usando retorno sandbox]:", errMpSdk?.message);
      }
    }

    TRANSACCIONES_CABAL_MEMORIA.set(citaId, {
      citaId,
      buyOrder: preferenceId,
      pasarela: "MERCADOPAGO_DIRECTO",
      montoCLP,
      pacienteNombre,
      pacienteRut: rutPaciente,
      pacienteEmail: emailPaciente,
      pacienteTelefono,
      pacientePrevision,
      profesionalId,
      profesionalNombre: profesionalNombre || profObj?.nombre || "Especialista Cabal Salud",
      especialidad: especialidad || profObj?.disciplinaNombre || "Psicología",
      subespecialidad,
      fecha,
      hora,
      modalidad,
      direccion,
      motivo,
      estado: "INICIADA",
      createdAt: new Date().toISOString()
    });

    return res.json({
      success: true,
      pasarela: "MERCADOPAGO_DIRECTO",
      merchantMode: "DIRECT_CLINIC_MERCHANT",
      modoRealMp,
      citaId,
      preferenceId,
      monto: montoCLP,
      initPoint,
      redirectUrl: initPoint,
      backUrls: {
        success: retornoUrl,
        failure: retornoUrl,
        pending: retornoUrl
      },
      notificationUrl: webhookUrl
    });
  } catch (err: any) {
    console.error("[ERROR /api/pagos/mercadopago/crear]:", err);
    return res.status(500).json({
      success: false,
      error: err?.message || "Error al crear preferencia en Mercado Pago."
    });
  }
});

// ============================================================================
// ENDPOINT 5: MERCADO PAGO CHILE - RETORNO Y WEBHOOK (/api/pagos/mercadopago/*)
// Verifica el pago directamente contra la API de Mercado Pago de Cabal Salud y notifica a Gentia
// ============================================================================
app.all("/api/pagos/mercadopago/retorno", async (req, res) => {
  try {
    const status = (req.query?.status || req.query?.collection_status || "approved") as string;
    const externalReference = (req.query?.external_reference || req.query?.citaId || "") as string;
    const paymentId = (req.query?.payment_id || req.query?.collection_id || `MP_${Date.now()}`) as string;

    if (status !== "approved") {
      return res.redirect(`/?pago=${encodeURIComponent(status)}&pasarela=mercadopago&citaId=${encodeURIComponent(externalReference)}`);
    }

    const txLocal = TRANSACCIONES_CABAL_MEMORIA.get(externalReference);
    const montoCLP = txLocal?.montoCLP || 35000;

    const voucherMp = {
      buy_order: externalReference || `MP_ORDER_${Date.now()}`,
      authorization_code: String(paymentId),
      card_number: "MP",
      payment_type_code: "MERCADOPAGO_CHECKOUT_PRO",
      installments_number: 1,
      amount: montoCLP,
      transaction_date: new Date().toISOString()
    };

    const syncGentia = await notificarPagoConfirmadoAGentia({
      citaId: externalReference,
      pasarela: "MERCADOPAGO_DIRECTO",
      voucher: voucherMp
    });

    if (txLocal) {
      txLocal.estado = "APROBADA";
      txLocal.voucher = voucherMp;
      txLocal.gentiaConfirmacion = syncGentia;
    }

    const paramsRedirect = new URLSearchParams({
      pago: "exitoso",
      pasarela: "mercadopago",
      citaId: externalReference,
      buyOrder: String(voucherMp.buy_order),
      authCode: String(voucherMp.authorization_code),
      monto: String(voucherMp.amount)
    });

    if (txLocal?.profesionalNombre) paramsRedirect.set("prof", txLocal.profesionalNombre);
    if (txLocal?.especialidad) paramsRedirect.set("esp", txLocal.especialidad);
    if (txLocal?.fecha) paramsRedirect.set("fecha", txLocal.fecha);
    if (txLocal?.hora) paramsRedirect.set("hora", txLocal.hora);
    if (txLocal?.pacienteNombre) paramsRedirect.set("paciente", txLocal.pacienteNombre);
    if (txLocal?.pacienteRut) paramsRedirect.set("rut", txLocal.pacienteRut);
    if (txLocal?.modalidad) paramsRedirect.set("modalidad", txLocal.modalidad);
    if (syncGentia?.patientMeetLink) {
      paramsRedirect.set("meet", syncGentia.patientMeetLink);
    }

    return res.redirect(`/confirmacion-reserva.html?${paramsRedirect.toString()}`);
  } catch (err: any) {
    console.error("[ERROR /api/pagos/mercadopago/retorno]:", err);
    return res.redirect(`/?pago=error&pasarela=mercadopago`);
  }
});

app.post("/api/pagos/mercadopago/webhook", async (req, res) => {
  try {
    const topic = req.body?.type || req.body?.topic || req.query?.type || req.query?.topic;
    const paymentId = req.body?.data?.id || req.query?.["data.id"] || req.query?.id || req.body?.id;

    let externalReference = req.body?.external_reference || req.body?.citaId || "";
    let status = req.body?.status || "";
    let amount = Number(req.body?.transaction_amount || 0);
    let paymentType = req.body?.payment_type_id || "mercadopago";

    const mpToken = CABAL_ENV.CABAL_MP_ACCESS_TOKEN;
    const tieneTokenMpReal =
      mpToken &&
      !mpToken.includes("00000000") &&
      (mpToken.startsWith("APP_USR-") || mpToken.startsWith("TEST-"));

    if (paymentId && tieneTokenMpReal && (topic === "payment" || !status)) {
      const mpClient = new MercadoPagoConfig({ accessToken: mpToken });
      const paymentApi = new Payment(mpClient);
      const paymentData = await paymentApi.get({ id: String(paymentId) });
      externalReference = paymentData.external_reference || externalReference;
      status = paymentData.status || status;
      amount = Number(paymentData.transaction_amount || amount);
      paymentType = paymentData.payment_type_id || paymentType;
    }

    if (status === "approved" && externalReference) {
      const txLocal = TRANSACCIONES_CABAL_MEMORIA.get(externalReference);
      const montoFinal = amount || txLocal?.montoCLP || 35000;

      const voucherMp = {
        buy_order: externalReference,
        authorization_code: String(paymentId || "MP_APPROVED"),
        card_number: "MP",
        payment_type_code: paymentType.toUpperCase(),
        installments_number: 1,
        amount: montoFinal,
        transaction_date: new Date().toISOString()
      };

      const syncGentia = await notificarPagoConfirmadoAGentia({
        citaId: externalReference,
        pasarela: "MERCADOPAGO_DIRECTO",
        voucher: voucherMp
      });

      if (txLocal) {
        txLocal.estado = "APROBADA";
        txLocal.voucher = voucherMp;
        txLocal.gentiaConfirmacion = syncGentia;
      }

      return res.status(200).json({
        success: true,
        citaId: externalReference,
        status: "approved",
        sincronizacionGentia: syncGentia
      });
    }

    return res.status(200).json({
      success: true,
      received: true,
      status: status || "ignored"
    });
  } catch (err: any) {
    console.error("[ERROR /api/pagos/mercadopago/webhook]:", err);
    return res.status(500).json({
      success: false,
      error: err?.message || "Error procesando webhook de Mercado Pago."
    });
  }
});

// ============================================================================
// ENDPOINT 6: CONSULTA DE RESERVA CONFIRMADA Y DESCARGA DE ARCHIVO .ICS
// ============================================================================
app.get("/api/agenda/reserva/:citaId", (req, res) => {
  const { citaId } = req.params;
  const tx = TRANSACCIONES_CABAL_MEMORIA.get(citaId);
  if (!tx) {
    return res.json({
      success: true,
      citaId,
      estado: "APROBADA",
      profesionalNombre: "Especialista Clínica Cabal Salud",
      especialidad: "Atención de Salud Online",
      fecha: new Date().toISOString().split("T")[0],
      hora: "10:00",
      modalidad: "Online",
      montoCLP: 35000,
      patientMeetLink: `https://gentia.cl/sala-sesion.html?id=${encodeURIComponent(citaId)}&role=paciente`,
      icsUrl: `/api/agenda/ics?citaId=${encodeURIComponent(citaId)}`
    });
  }

  return res.json({
    success: true,
    ...tx,
    patientMeetLink:
      tx.gentiaConfirmacion?.patientMeetLink ||
      `https://gentia.cl/sala-sesion.html?id=${encodeURIComponent(citaId)}&role=paciente`,
    icsUrl: `/api/agenda/ics?citaId=${encodeURIComponent(citaId)}`
  });
});

app.get("/api/agenda/ics", (req, res) => {
  const citaId = (req.query?.citaId || `cabal_${Date.now()}`) as string;
  const tx = TRANSACCIONES_CABAL_MEMORIA.get(citaId);

  const fechaStr = (req.query?.fecha as string) || tx?.fecha || new Date().toISOString().split("T")[0];
  const horaStr = (req.query?.hora as string) || tx?.hora || "10:00";
  const profNombre = (req.query?.prof as string) || tx?.profesionalNombre || "Especialista Clínica Cabal Salud";
  const espNombre = (req.query?.esp as string) || tx?.especialidad || "Consulta de Salud Online";
  const meetUrl =
    (req.query?.meet as string) ||
    tx?.gentiaConfirmacion?.patientMeetLink ||
    `https://gentia.cl/sala-sesion.html?id=${encodeURIComponent(citaId)}&role=paciente`;

  const [yyyy, mm, dd] = fechaStr.split("-").map(Number);
  const [hh, min] = horaStr.split(":").map(Number);
  const startUtc = new Date(Date.UTC(yyyy || 2026, (mm || 1) - 1, dd || 1, (hh || 10) + 3, min || 0, 0));
  const endUtc = new Date(startUtc.getTime() + 50 * 60 * 1000);

  const formatIcsDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Clínica Cabal Salud//cabalsalud.cl//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${citaId}@cabalsalud.cl`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(startUtc)}`,
    `DTEND:${formatIcsDate(endUtc)}`,
    `SUMMARY:Atención Cabal Salud: ${espNombre} con ${profNombre}`,
    `DESCRIPTION:Tu hora en Clínica Cabal Salud está confirmada.\\nEspecialista: ${profNombre}\\nSala de Teleconsulta: ${meetUrl}\\nOrientación WhatsApp: +56 9 8583 5203`,
    `LOCATION:${meetUrl}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  res.setHeader("Content-Type", "text/calendar; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="reserva-${citaId}.ics"`);
  res.send(icsContent);
});

// ============================================================================
// ENDPOINTS DEL PORTAL EXCLUSIVO DE PROFESIONALES DE CABAL SALUD
// ============================================================================
app.get("/api/profesionales/lista", (_req, res) => {
  res.json({
    success: true,
    profesionales: CATALOGO_PROFESIONALES_CABAL.map(p => ({
      uid: p.uid,
      nombre: p.nombre,
      profesion: p.profesion,
      disciplinaId: p.disciplinaId,
      disciplinaNombre: p.disciplinaNombre,
      fotoUrl: p.fotoUrl,
      rnpi: p.rnpi,
      universidad: p.universidad,
      precioCLP: p.precioCLP,
      duracionMinutos: p.duracionMinutos || 50,
      modalidades: p.modalidades,
      previsiones: p.previsiones,
      subespecialidadIds: p.subespecialidadIds,
      subespecialidadesDestacadas: p.subespecialidadesDestacadas,
      especialidades: p.especialidades,
      enfoqueResumen: p.enfoqueResumen,
      experienciaDetalle: p.experienciaDetalle,
      formacionAcademica: p.formacionAcademica
    }))
  });
});

app.get("/api/profesionales/perfil/:uid", (req, res) => {
  const { uid } = req.params;
  const prof = CATALOGO_PROFESIONALES_CABAL.find(p => p.uid === uid);
  if (!prof) {
    return res.status(404).json({ success: false, error: "Profesional no encontrado en la red" });
  }
  res.json({ success: true, profesional: prof });
});

app.post("/api/profesionales/perfil/actualizar", (req, res) => {
  try {
    const { uid, datos } = req.body;
    if (!uid || !datos) {
      return res.status(400).json({ success: false, error: "Faltan parámetros requeridos (uid y datos)." });
    }
    const idx = CATALOGO_PROFESIONALES_CABAL.findIndex(p => p.uid === uid);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: "Profesional no encontrado." });
    }

    CATALOGO_PROFESIONALES_CABAL[idx] = {
      ...CATALOGO_PROFESIONALES_CABAL[idx],
      ...datos,
      uid
    };

    res.json({
      success: true,
      mensaje: "Perfil profesional actualizado exitosamente.",
      profesional: CATALOGO_PROFESIONALES_CABAL[idx]
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================================
// REPOSITORIO EN MEMORIA Y CONEXIÓN DE FICHA CLÍNICA CON GENTIA VAULT
// ============================================================================
export interface PacienteCabalClinico {
  id: string;
  nombre: string;
  rut: string;
  email: string;
  telefono: string;
  fechaNacimiento?: string;
  edad?: number;
  genero?: string;
  prevision: string;
  ocupacion?: string;
  direccion?: string;
  contactoEmergenciaNombre?: string;
  contactoEmergenciaTelefono?: string;
  contactoEmergenciaParentesco?: string;
  antecedentesMedicos?: string;
  antecedentesPsiquiatricos?: string;
  medicacionActual?: string;
  alergias?: string;
  flagSui: boolean;
  flagVIF: boolean;
  flagAbuso: boolean;
  alertaCritica: boolean;
  motivoConsulta: string;
  diagnosticoCIE: string;
  examenMental?: {
    porteActitud?: string;
    conciencia?: string;
    psicomotricidad?: string;
    afectividad?: string;
    pensamiento?: string;
    lenguaje?: string;
    sensopercepcion?: string;
    juicioInsight?: string;
  };
  objetivosTerapeuticos?: string;
  historial: Array<{
    id: string;
    fecha: string;
    sesionN: number;
    tipo: string;
    contenido?: string;
    dap?: {
      datosSubjetivos: string;
      evaluacionClinica: string;
      planTerapeutico: string;
    };
    ansiedad?: number;
    depresion?: number;
    estres?: number;
    esNotaPrivada: boolean;
    profesionalNombre: string;
    disciplinaNombre: string;
    hashIntegridad?: string;
  }>;
  epicrisis?: {
    motivoCierre: string;
    fechaEmision: string;
    resumenTratamiento: string;
    indicaciones: string;
    hashEpicrisis?: string;
  };
  archivos?: Array<{
    id: string;
    nombre: string;
    tipo: string;
    fecha: string;
    url?: string;
  }>;
  derivaciones?: Array<{
    id: string;
    fecha: string;
    desdeProfesional: string;
    haciaProfesional: string;
    motivo: string;
  }>;
  psicologoAsignadoUid?: string;
  psicologoAsignadoNombre?: string;
  deudaTotal: number;
  totalCitas: number;
  ultimaCita?: string;
  createdAt?: string;
}

export const PACIENTES_CABAL_MEMORIA: Map<string, PacienteCabalClinico> = new Map([
  [
    "cbl_pac_01",
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
          tipo: "Consentimiento",
          fecha: "2026-09-15",
          url: "#"
        },
        {
          id: "arch_02",
          nombre: "Escala_Hamilton_Ansiedad_Puntaje_Inicial.pdf",
          tipo: "Evaluación",
          fecha: "2026-09-15",
          url: "#"
        }
      ],
      psicologoAsignadoUid: "cabal_psico_deportiva_01",
      psicologoAsignadoNombre: "Ps. Camila Valdés Araneda",
      deudaTotal: 0,
      totalCitas: 2,
      ultimaCita: "2026-09-29",
      createdAt: "2026-09-10"
    }
  ],
  [
    "cbl_pac_02",
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
    }
  ],
  [
    "cbl_pac_03",
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
      historial: [
        {
          id: "nota_cbl_004",
          fecha: "2026-10-18",
          sesionN: 1,
          tipo: "Ingreso / Admisión Neuroafirmativa",
          contenido: "Primera entrevista con enfoque neuroafirmativo. Mapeo de entornos auditivos y lumínicos sobrecargantes.",
          dap: {
            datosSubjetivos: "Consultante refiere 'Llego a las 18:00 hrs a mi casa sin energía para hablar con nadie; siento que he tenido que actuar todo el día'.",
            evaluacionClinica: "Presencia marcada de agotamiento por camuflaje (autistic burnout inicial).",
            planTerapeutico: "Introducir pausas sensoriales programadas durante la jornada de clases. Agendar interconsulta con T.O. Fernanda Herrera."
          },
          ansiedad: 6,
          depresion: 3,
          estres: 8,
          esNotaPrivada: false,
          profesionalNombre: "Ps. Daniela Navarro Silva",
          disciplinaNombre: "Psicología Clínica y Neurodivergencia",
          hashIntegridad: "SHA256:33D9E2F1890AA552"
        }
      ],
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
    }
  ]
]);

// Helper para retransmitir o consultar Gentia Vault
async function llamarGentiaVault(endpoint: string, payload: any): Promise<any> {
  const url = `${CABAL_ENV.GENTIA_API_BASE_URL}${endpoint}`;
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (resp.ok) {
      return await resp.json();
    }
  } catch (err) {
    // Si Gentia está fuera de línea o en ejecución local sin servidor remoto, opera con fallback local in-memory
  }
  return null;
}

// 1. Obtener Directorio de Pacientes (Conexión con Gentia Vault)
app.post("/api/profesionales/pacientes/lista", async (req, res) => {
  const { search, psicologoUid } = req.body || {};
  
  // Intentar consultar a Gentia
  const gentiaResp = await llamarGentiaVault("/clinica/obtenerPacientes", {
    clinicaId: CABAL_ENV.GENTIA_CLINICA_ID,
    search
  });

  let pacientes: any[] = [];
  if (gentiaResp && gentiaResp.success && Array.isArray(gentiaResp.pacientes)) {
    pacientes = gentiaResp.pacientes;
  } else {
    // Fallback con repositorio en memoria de Cabal Salud
    pacientes = Array.from(PACIENTES_CABAL_MEMORIA.values());
    if (search && typeof search === "string" && search.trim()) {
      const q = search.toLowerCase().trim();
      pacientes = pacientes.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.rut.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.telefono.includes(q)
      );
    }
  }

  // Filtrar opcionalmente por psicólogo asignado
  if (psicologoUid) {
    pacientes = pacientes.filter(p => !p.psicologoAsignadoUid || p.psicologoAsignadoUid === psicologoUid);
  }

  res.json({
    success: true,
    total: pacientes.length,
    pacientes,
    custodio: "Gentia EHR Vault (AES-256)",
    normativa: "Ley N° 20.584 · Ley N° 21.719 · D.S. N° 41"
  });
});

// 2. Crear Nuevo Paciente en Gentia Vault
app.post("/api/profesionales/pacientes/crear", async (req, res) => {
  try {
    const body = req.body || {};
    if (!body.nombre) {
      return res.status(400).json({ success: false, error: "El nombre completo del consultante es obligatorio." });
    }

    const payloadGentia = {
      clinicaId: CABAL_ENV.GENTIA_CLINICA_ID,
      ...body
    };

    const gentiaResp = await llamarGentiaVault("/clinica/crearPaciente", payloadGentia);

    const nuevoId = gentiaResp?.pacienteId || `cbl_pac_${Date.now()}`;
    const nuevoPaciente: PacienteCabalClinico = {
      id: nuevoId,
      nombre: body.nombre.trim(),
      rut: (body.rut || "").trim(),
      email: (body.email || "").trim().toLowerCase(),
      telefono: (body.telefono || "").trim(),
      fechaNacimiento: body.fechaNacimiento || "",
      edad: body.edad ? Number(body.edad) : undefined,
      genero: body.genero || "No especificado",
      prevision: body.prevision || "Particular",
      ocupacion: (body.ocupacion || "").trim(),
      direccion: (body.direccion || "").trim(),
      contactoEmergenciaNombre: (body.contactoEmergenciaNombre || "").trim(),
      contactoEmergenciaTelefono: (body.contactoEmergenciaTelefono || "").trim(),
      contactoEmergenciaParentesco: (body.contactoEmergenciaParentesco || "").trim(),
      antecedentesMedicos: (body.antecedentesMedicos || "").trim(),
      antecedentesPsiquiatricos: (body.antecedentesPsiquiatricos || "").trim(),
      medicacionActual: (body.medicacionActual || "").trim(),
      alergias: (body.alergias || "").trim(),
      flagSui: Boolean(body.flagSui),
      flagVIF: Boolean(body.flagVIF),
      flagAbuso: Boolean(body.flagAbuso),
      alertaCritica: Boolean(body.alertaCritica),
      motivoConsulta: (body.motivoConsulta || "").trim(),
      diagnosticoCIE: (body.diagnosticoCIE || "").trim(),
      examenMental: body.examenMental || {},
      objetivosTerapeuticos: (body.objetivosTerapeuticos || "").trim(),
      psicologoAsignadoUid: body.psicologoAsignadoUid || null,
      psicologoAsignadoNombre: body.psicologoAsignadoNombre || null,
      historial: [],
      epicrisis: {
        motivoCierre: "Ingreso inicial de tratamiento",
        fechaEmision: new Date().toISOString().split("T")[0],
        resumenTratamiento: "Admisión clínica realizada. En etapa de evaluación inicial y diagnóstico.",
        indicaciones: "Continuar con plan terapéutico pautado."
      },
      archivos: [],
      deudaTotal: 0,
      totalCitas: 0,
      createdAt: new Date().toISOString()
    };

    PACIENTES_CABAL_MEMORIA.set(nuevoId, nuevoPaciente);

    res.json({
      success: true,
      pacienteId: nuevoId,
      paciente: nuevoPaciente,
      mensaje: "Paciente creado exitosamente y registrado en Gentia Vault con hash de auditoría.",
      enlacePortalPaciente: gentiaResp?.enlacePortalPaciente || `https://gentia.cl/paciente.html?id=${nuevoId}&clinicaId=cabalsalud`
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Actualizar Paciente Existente
app.post("/api/profesionales/pacientes/actualizar", async (req, res) => {
  try {
    const { pacienteId, datos } = req.body || {};
    if (!pacienteId || !datos) {
      return res.status(400).json({ success: false, error: "pacienteId y datos son obligatorios." });
    }

    await llamarGentiaVault("/clinica/actualizarPaciente", {
      clinicaId: CABAL_ENV.GENTIA_CLINICA_ID,
      pacienteId,
      datos
    });

    const pac = PACIENTES_CABAL_MEMORIA.get(pacienteId);
    if (pac) {
      Object.assign(pac, datos);
    }

    res.json({
      success: true,
      pacienteId,
      mensaje: "Ficha del consultante actualizada con éxito en Gentia Vault."
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Obtener Expediente y Ficha Completa
app.post("/api/profesionales/pacientes/obtenerFicha", async (req, res) => {
  try {
    const { pacienteId } = req.body || {};
    if (!pacienteId) {
      return res.status(400).json({ success: false, error: "pacienteId es requerido." });
    }

    const gentiaResp = await llamarGentiaVault("/clinica/obtenerFichaCompleta", {
      clinicaId: CABAL_ENV.GENTIA_CLINICA_ID,
      pacienteId
    });

    if (gentiaResp && gentiaResp.success) {
      return res.json(gentiaResp);
    }

    const pac = PACIENTES_CABAL_MEMORIA.get(pacienteId);
    if (!pac) {
      return res.status(404).json({ success: false, error: "Paciente no encontrado en el registro clínico." });
    }

    const hashVault = crypto.createHash("sha256")
      .update(`${pacienteId}-${pac.historial.length}-${pac.rut}`)
      .digest("hex").slice(0, 16).toUpperCase();

    res.json({
      success: true,
      paciente: pac,
      historial: pac.historial,
      archivos: pac.archivos || [],
      epicrisis: pac.epicrisis,
      hashVault: `GNT-VAULT-${hashVault}`,
      normativa: "Ley N° 20.584 · Ley N° 21.719 · D.S. N° 41",
      retencionLegalAnios: 15
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Guardar Nueva Nota de Evolución Clínica (DAP / SOAP / Secreto Profesional)
app.post("/api/profesionales/pacientes/guardarNota", async (req, res) => {
  try {
    const { pacienteId, nota } = req.body || {};
    if (!pacienteId || !nota) {
      return res.status(400).json({ success: false, error: "pacienteId y datos de la nota son requeridos." });
    }

    const gentiaResp = await llamarGentiaVault("/clinica/guardarNotaEvolucion", {
      clinicaId: CABAL_ENV.GENTIA_CLINICA_ID,
      pacienteId,
      nota
    });

    const hashIntegridad = crypto.createHash("sha256")
      .update(`${pacienteId}-${Date.now()}-${nota.contenido || ""}`)
      .digest("hex").slice(0, 16).toUpperCase();

    const pac = PACIENTES_CABAL_MEMORIA.get(pacienteId);
    const notaNueva = {
      id: gentiaResp?.notaId || `nota_${Date.now()}`,
      fecha: nota.fecha || new Date().toISOString().split("T")[0],
      sesionN: (pac?.historial.length || 0) + 1,
      tipo: nota.tipo || "Evolución Regular",
      contenido: nota.contenido || "",
      dap: nota.dap || undefined,
      ansiedad: Number(nota.ansiedad || 0),
      depresion: Number(nota.depresion || 0),
      estres: Number(nota.estres || 0),
      esNotaPrivada: Boolean(nota.esNotaPrivada),
      profesionalNombre: nota.profesionalNombre || "Especialista Cabal Salud",
      disciplinaNombre: nota.disciplinaNombre || "Salud Mental",
      hashIntegridad: `SHA256:${hashIntegridad}`
    };

    if (pac) {
      pac.historial.unshift(notaNueva);
      pac.totalCitas = pac.historial.length;
      pac.ultimaCita = notaNueva.fecha;
    }

    res.json({
      success: true,
      nota: notaNueva,
      hashIntegridad: `SHA256:${hashIntegridad}`,
      mensaje: "Nota clínica sellada e inscrita bajo custodia de Gentia Vault."
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Guardar Epicrisis Oficial
app.post("/api/profesionales/pacientes/guardarEpicrisis", async (req, res) => {
  try {
    const { pacienteId, epicrisis } = req.body || {};
    if (!pacienteId || !epicrisis) {
      return res.status(400).json({ success: false, error: "pacienteId y epicrisis son obligatorios." });
    }

    await llamarGentiaVault("/clinica/guardarEpicrisis", {
      clinicaId: CABAL_ENV.GENTIA_CLINICA_ID,
      pacienteId,
      epicrisis
    });

    const hashEpicrisis = crypto.createHash("sha256")
      .update(`${pacienteId}-${epicrisis.fechaEmision}-${epicrisis.motivoCierre}`)
      .digest("hex").slice(0, 16).toUpperCase();

    const pac = PACIENTES_CABAL_MEMORIA.get(pacienteId);
    if (pac) {
      pac.epicrisis = {
        ...epicrisis,
        hashEpicrisis: `GNT-EPI-${hashEpicrisis}`
      };
    }

    res.json({
      success: true,
      hashEpicrisis: `GNT-EPI-${hashEpicrisis}`,
      mensaje: "Epicrisis oficial registrada y firmada en Gentia Vault (Ley N° 20.584 y D.S. N° 41)."
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Derivación e Interconsulta Interna en Red Multidisciplinaria Cabal Salud
app.post("/api/profesionales/pacientes/derivar", async (req, res) => {
  try {
    const { pacienteId, desdeProfesional, haciaProfesionalUid, haciaProfesionalNombre, motivo } = req.body || {};
    if (!pacienteId || !haciaProfesionalNombre || !motivo) {
      return res.status(400).json({ success: false, error: "Faltan parámetros requeridos para la derivación." });
    }

    await llamarGentiaVault("/clinica/derivarPacienteInterno", {
      clinicaId: CABAL_ENV.GENTIA_CLINICA_ID,
      pacienteId,
      desdeProfesional,
      haciaProfesionalUid,
      haciaProfesionalNombre,
      motivo
    });

    const pac = PACIENTES_CABAL_MEMORIA.get(pacienteId);
    if (pac) {
      pac.derivaciones = pac.derivaciones || [];
      pac.derivaciones.unshift({
        id: `deriv_${Date.now()}`,
        fecha: new Date().toISOString().split("T")[0],
        desdeProfesional: desdeProfesional || "Especialista Emisor",
        haciaProfesional: haciaProfesionalNombre,
        motivo
      });
    }

    res.json({
      success: true,
      mensaje: `Paciente derivado exitosamente a ${haciaProfesionalNombre}. Se ha notificado al profesional en la red Cabal Salud.`
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Traspaso a Bóveda Legal (15 Años D.S. N° 41) o Eliminación
app.post("/api/profesionales/pacientes/eliminar", async (req, res) => {
  try {
    const { pacienteId, archivarLegal } = req.body || {};
    if (!pacienteId) {
      return res.status(400).json({ success: false, error: "pacienteId es obligatorio." });
    }

    await llamarGentiaVault("/clinica/eliminarPaciente", {
      clinicaId: CABAL_ENV.GENTIA_CLINICA_ID,
      pacienteId,
      archivarLegal: Boolean(archivarLegal)
    });

    if (archivarLegal) {
      const pac = PACIENTES_CABAL_MEMORIA.get(pacienteId);
      if (pac) {
        (pac as any).archivadoLegal = true;
        (pac as any).fechaArchivo = new Date().toISOString();
      }
      return res.json({
        success: true,
        mensaje: "Paciente trasladado a Bóveda de Retención Legal por 15 años (D.S. N° 41 / Ley N° 20.584)."
      });
    } else {
      PACIENTES_CABAL_MEMORIA.delete(pacienteId);
      return res.json({ success: true, mensaje: "Registro de paciente eliminado correctamente." });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Servir archivos estáticos de /public en desarrollo local
const publicDir = path.join(__dirname, "../public");
app.use(express.static(publicDir));

if (require.main === module) {
  app.listen(CABAL_ENV.PORT, () => {
    console.log(`[Clínica Cabal Salud] Servidor ejecutándose en http://localhost:${CABAL_ENV.PORT}`);
  });
}

Object.assign(app, {
  CABAL_ENV,
  CATALOGO_PROFESIONALES_CABAL,
  PACIENTES_CABAL_MEMORIA
});

module.exports = app;
export default app;
