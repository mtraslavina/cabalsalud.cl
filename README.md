# Clínica Cabal Salud (`cabalsalud.cl`) — Plataforma Web & Pasarela Directa

Repositorio oficial e independiente de **Clínica Cabal Salud (`cabalsalud.cl`)**, diseñado bajo una arquitectura de **Pasarela Directa por Sitio (Direct Merchant Routing)** acoplada de forma desacoplada (Headless) con el motor clínico **Gentia (`gentia.cl`)**.

---

## 🏛️ Regla Arquitectónica Suprema y Cumplimiento SII (Chile)

1. **Repositorio 100% Independiente**: `cabalsalud.cl` vive en su propio repositorio y despliegue en Vercel, separado del código fuente de `gentia.cl`.
2. **Transacción Financiera Directa (Cabal Salud $\leftrightarrow$ Paciente)**: Todo pago originado en `cabalsalud.cl` se procesa de forma **directa y exclusiva entre el Paciente y las cuentas comerciales de Cabal Salud SpA** en **Transbank Webpay Plus** (`CABAL_TBK_COMMERCE_CODE`) o **Mercado Pago Chile** (`CABAL_MP_ACCESS_TOKEN`).
3. **Cero Intermediación Financiera de Gentia**: `gentia.cl` actúa únicamente como el motor de disponibilidad, bloqueo temporal de citas (TTL 15 min), teleconsulta WebRTC, sincronización de calendarios, notificaciones transaccionales y reportería de liquidaciones mensuales para las administradoras (**Lilians Cortés y Pamela Quijada**), sin recaudar ni retener fondos de los pacientes de Cabal Salud.

---

## 🎨 Identidad Visual y Tipografía Oficial

* **Conceptos Centrales**: **Claridad, Cercanía y Criterio**.
* **Paleta de Colores**:
  * **Perla (`#F7F4ED`)**: Fondo principal cálido y orgánico.
  * **Azul Noche (`#10263C`)**: Cabeceras (`h1-h6`), textos principales, barra superior y footer.
  * **Verde Petróleo (`#174B4D`)**: Acento principal, botones CTA primarios y estados activos.
  * **Granate (`#772F3B`)**: Detalle secundario y badges de subespecialidades estrella.
* **Tipografías (Google Fonts)**:
  * Títulos y Encabezados: `'Source Serif 4'`, serif (Pesos 600, 700).
  * Textos, Agenda y Botones: `'Inter'`, sans-serif (Pesos 400, 500, 600).

---

## 🔌 Endpoints Serverless de Pagos Directos (`api/index.ts`)

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET/POST` | `/api/agenda/disponibilidad` | Proxy CORS hacia Gentia (`/api/clinica/disponibilidadExterna`) que obtiene el catálogo de especialistas y horarios disponibles de `cabalsalud`. |
| `POST` | `/api/agenda/preagendar` | Invoca `POST https://gentia.cl/api/clinica/preAgendarCita`, bloqueando el horario por 15 minutos en estado `PENDIENTE_PAGO_EXTERNO`. |
| `POST` | `/api/pagos/webpay/crear` | Inicia transacción directa en **Transbank Webpay Plus** con `CABAL_TBK_COMMERCE_CODE` y `CABAL_TBK_API_KEY_SECRET` de Cabal Salud. |
| `ALL` | `/api/pagos/webpay/retorno` | Recibe `token_ws`, ejecuta `tx.commit(token_ws)` con Transbank y, si `response_code === 0`, dispara el Webhook firmado con **HMAC-SHA256** hacia `https://gentia.cl/api/clinica/confirmarPagoExterno`. |
| `POST` | `/api/pagos/mercadopago/crear` | Crea preferencia **Checkout Pro** directa con `CABAL_MP_ACCESS_TOKEN` de Cabal Salud. |
| `ALL` | `/api/pagos/mercadopago/retorno` | Procesa el retorno desde Mercado Pago, notifica a Gentia vía HMAC-SHA256 y redirige a `/confirmacion-reserva.html`. |
| `POST` | `/api/pagos/mercadopago/webhook` | Recibe notificaciones IPN/Webhook de Mercado Pago, verifica el pago contra la API de MP de Cabal Salud y confirma la cita en Gentia. |
| `GET` | `/api/agenda/ics` | Genera y descarga el archivo de calendario `.ics` con el enlace a la sala de teleconsulta WebRTC. |
| `POST` | `/api/pacientes/lista` | Consulta el directorio de pacientes asignados al profesional o a la administración de Cabal Salud. |
| `POST` | `/api/pacientes/guardar` | Registra o actualiza la ficha clínica ad-hoc de un paciente con cifrado delegado en Gentia Vault. |
| `POST` | `/api/pacientes/evolucion` | Registra notas de evolución DAP con sliders de severidad (0-10) y sellado inmutable SHA-256. |
| `POST` | `/api/pacientes/epicrisis` | Emite y sella la epicrisis oficial de alta médica para presentación y reembolso en Isapres/Fonasa. |
| `POST` | `/api/profesionales/sesiones/lista` | Lista las sesiones agendadas y confirmadas de un profesional específico. |
| `GET` | `/api/admin/sesiones/lista` | Obtiene el consolidado general de sesiones asignadas para la administración (Pamela & Lilians). |
| `POST` | `/api/admin/asignar-sesion` | Registra paciente (nuevo o existente), asigna terapeuta mediante filtro en cascada (Disciplina -> Profesional), genera código `CBL-SES-2026-XXX`, crea salas WebRTC y despacha correos HTML al profesional y al consultante. |

---

## 👩‍⚕️ Portal Profesional & Fichas Clínicas Ad-Hoc (`portal-profesional.html`)

El portal opera de forma privada y autónoma bajo el dominio de Cabal Salud (`/portal-profesional.html`), manteniendo los colores y diseño institucional:

* **Acceso Independiente de Google OAuth**: Modalidad demo de un clic para cualquiera de los 9 profesionales y acceso por credenciales clínicas.
* **Autonomía Operativa**: Cada terapeuta configura su biografía, especialidades, arancel en CLP, tiempo de sesión flexible (30, 45, 50, 60, 75 o 90 minutos) y disponibilidad semanal (incluyendo días domingo).
* **Fichas Clínicas Ad-Hoc por Disciplina**:
  * **Psicología**: Motivo de consulta manifiesto y latente, anamnesis vincular, antecedentes psiquiátricos y banderas rojas (Riesgo Suicida, VIF, Abuso).
  * **Nutrición**: Antropometría, metas calóricas, comorbilidades metabólicas y plan alimentario.
  * **Psiquiatría**: Examen mental formal, esquema psicofarmacológico y control de efectos adversos.
  * **Terapia Ocupacional**: Desempeño ocupacional, integración sensorial y autonomía funcional.
  * **Fonoaudiología**: Habla, lenguaje, voz y deglución.
  * **Trabajo Social**: Red sociofamiliar, vulnerabilidad y redes institucionales.
  * **Mediación Familiar / Legal**: Materia en litigio, acuerdos parentales y régimen comunicacional.
* **Evoluciones DAP con Sliders Sintomáticos**: Registro estructurado (Datos, Análisis, Plan) con sliders 0-10 para Ansiedad, Depresión y Estrés, sellados de forma inmutable con SHA-256.
* **Epicrisis Oficial de Alta**: Emisión de resumen clínico con diagnósticos CIE-11/DSM-5 formateado para reembolso médico en Isapres/Fonasa.

---

## 👑 Módulo Central de Administración y Asignación (Pamela & Lilians)

Diseñado para la dirección clínica de Pamela Quijada y Lilians Cortés, permite gestionar pacientes espontáneos y derivaciones internas:

1. **Acceso Inmediato**: Botón destacado `[ 👑 Asignar Paciente (Admin) ]` en la barra superior y pestaña `Administración & Asignación`.
2. **Modo Dual de Paciente**:
   * **Paciente Nuevo**: Formulario con validación de RUT chileno (Módulo 11), email, WhatsApp, previsión de salud y dirección para atención domiciliaria.
   * **Paciente Existente**: Selector rápido con autocompletado en un solo clic.
3. **Filtro en Cascada en 2 Pasos**:
   * **Paso 1**: Selección de la Disciplina de la Salud (Psicología, Nutrición, Psiquiatría, Fonoaudiología, etc.).
   * **Paso 2**: El selector de profesionales se actualiza de manera reactiva mostrando únicamente a los profesionales de dicha área.
4. **Sincronización Total con Salas WebRTC**:
   * Generación de código unívoco `CBL-SES-2026-XXX`.
   * Enlaces directos a sala de teleconsulta P2P con roles: `https://gentia.cl/clinica-sala-espera.html?sala=CBL-SES-2026-XXX&role=profesional` (para el terapeuta) y `&role=paciente` (para el consultante).
   * Inyección en la agenda y próximas sesiones del especialista seleccionado.
5. **Doble Despacho de Correo HTML Corporativo**:
   * Correo al especialista con ficha de antecedentes y link de sala.
   * Correo al paciente con confirmación de cita y acceso virtual.
   * Previsualización interactiva por pestañas dentro del modal administrativo.

---

## ⚙️ Variables de Entorno (`.env`)

Copia el archivo `.env.example` a `.env` o configúralas en el panel de **Vercel** del proyecto `cabalsalud-web`:

```env
SITE_BASE_URL=https://cabalsalud.cl
PORT=3001

# Credenciales Transbank Webpay Plus de Cabal Salud
CABAL_TBK_ENV=INTEGRATION
CABAL_TBK_COMMERCE_CODE=597055555532
CABAL_TBK_API_KEY_SECRET=579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C

# Credenciales Mercado Pago Chile de Cabal Salud
CABAL_MP_ACCESS_TOKEN=APP_USR-...
CABAL_MP_PUBLIC_KEY=APP_USR-...
CABAL_MP_WEBHOOK_SECRET=...

# Conexión Headless y Secreto Compartido HMAC con Gentia (gentia.cl)
GENTIA_API_BASE_URL=https://gentia.cl/api
GENTIA_CLINICA_ID=cabalsalud
GENTIA_WEBHOOK_HMAC_SECRET=cabal_gentia_hmac_secret_2026
```

---

## 🚀 Desarrollo Local y Despliegue en Vercel

```bash
# 1. Instalar dependencias
npm install

# 2. Compilar TypeScript y generar carpeta dist/
npm run compile
npm run build

# 3. Ejecutar servidor local en http://localhost:3001
npm run dev
```
