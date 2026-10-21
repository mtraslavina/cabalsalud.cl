import os
import shutil
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

# 1. Configuración de Dimensiones y Paleta Oficial Cabal Salud
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank_layout = prs.slide_layouts[6]

C_NOCHE = RGBColor(16, 38, 60)       # #10263C (Azul Noche Oficial)
C_PETROLEO = RGBColor(23, 75, 77)    # #174B4D (Verde Petróleo Oficial)
C_GRANATE = RGBColor(119, 47, 59)    # #772F3B (Acento Granate Oficial)
C_PERLA = RGBColor(247, 244, 237)    # #F7F4ED (Fondo Perla Oficial)
C_BLANCO = RGBColor(255, 255, 255)
C_ESMERALDA = RGBColor(16, 185, 129) # #10B981 (Aprobado/Activo)
C_SLATE = RGBColor(100, 116, 139)    # #64748B
C_PERLA_CARD = RGBColor(242, 238, 228)
C_LIGHT_EMERALD = RGBColor(236, 253, 245)
C_AMBER = RGBColor(217, 119, 6)

def set_slide_background(slide, color=C_PERLA):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
    bg.fill.solid()
    bg.fill.fore_color.rgb = color
    bg.line.fill.background()
    return bg

def add_header(slide, title_text, category_text="CLÍNICA CABAL SALUD · ARQUITECTURA DIGITAL Y BLINDAJE LEGAL"):
    header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(1.1))
    tf = header_box.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    
    p_cat = tf.paragraphs[0]
    p_cat.text = category_text.upper()
    p_cat.font.name = "Calibri"
    p_cat.font.size = Pt(10)
    p_cat.font.bold = True
    p_cat.font.color.rgb = C_PETROLEO
    p_cat.space_after = Pt(2)
    
    p_tit = tf.add_paragraph()
    p_tit.text = title_text
    p_tit.font.name = "Georgia"
    p_tit.font.size = Pt(21)
    p_tit.font.bold = True
    p_tit.font.color.rgb = C_NOCHE

    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.48), Inches(11.7), Inches(0.04))
    line.fill.solid()
    line.fill.fore_color.rgb = C_PETROLEO
    line.line.fill.background()

def add_card(slide, left, top, width, height, bg_color=C_BLANCO, border_color=C_SLATE):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    card.fill.solid()
    card.fill.fore_color.rgb = bg_color
    if border_color:
        card.line.color.rgb = border_color
        card.line.width = Pt(1)
    else:
        card.line.fill.background()
    return card

# Helper para Nodos de Mapas Conceptuales Reales
def add_concept_node(slide, left, top, width, height, title, subtitle=None, bg_color=C_BLANCO, border_color=C_PETROLEO, text_color=C_NOCHE):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    shape.line.color.rgb = border_color
    shape.line.width = Pt(1.5)
    
    tf = shape.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(0.12)
    tf.margin_top = Inches(0.08)
    
    p = tf.paragraphs[0]
    p.text = title
    p.font.name = "Georgia"
    p.font.size = Pt(11.5)
    p.font.bold = True
    p.font.color.rgb = text_color
    p.alignment = PP_ALIGN.CENTER
    
    if subtitle:
        p2 = tf.add_paragraph()
        p2.text = subtitle
        p2.font.name = "Calibri"
        p2.font.size = Pt(9)
        p2.font.color.rgb = text_color
        p2.alignment = PP_ALIGN.CENTER
    return shape

# Helper para Pastillas de Conexión y Verbos de Enlace (Novak Concept Map links)
def add_link_pill(slide, left, top, width, height, text, bg_color=C_PERLA, text_color=C_PETROLEO):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    shape.line.color.rgb = text_color
    shape.line.width = Pt(1)
    
    tf = shape.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(0.08)
    tf.margin_top = Inches(0.04)
    
    p = tf.paragraphs[0]
    p.text = text
    p.font.name = "Calibri"
    p.font.size = Pt(8.5)
    p.font.bold = True
    p.font.italic = True
    p.font.color.rgb = text_color
    p.alignment = PP_ALIGN.CENTER
    return shape

# ==============================================================================
# SLIDE 1: PORTADA EJECUTIVA
# ==============================================================================
s1 = prs.slides.add_slide(blank_layout)
set_slide_background(s1, C_NOCHE)

decor = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(7.1), prs.slide_width, Inches(0.4))
decor.fill.solid()
decor.fill.fore_color.rgb = C_PETROLEO
decor.line.fill.background()

badge = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.1), Inches(4.2), Inches(0.45))
badge.fill.solid()
badge.fill.fore_color.rgb = C_PETROLEO
badge.line.fill.background()
b_tf = badge.text_frame
b_tf.margin_top = Inches(0.08)
b_p = b_tf.paragraphs[0]
b_p.text = "RED DE SALUD ONLINE · CHILE"
b_p.font.name = "Calibri"
b_p.font.size = Pt(11)
b_p.font.bold = True
b_p.font.color.rgb = C_BLANCO
b_p.alignment = PP_ALIGN.CENTER

t_box = s1.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(11.3), Inches(3.3))
ttf = t_box.text_frame
ttf.word_wrap = True

p1 = ttf.paragraphs[0]
p1.text = "Plataforma Web, Portal Profesional, Fichas Clínicas y Conexión con Gentia"
p1.font.name = "Georgia"
p1.font.size = Pt(34)
p1.font.bold = True
p1.font.color.rgb = C_PERLA
p1.space_after = Pt(12)

p2 = ttf.add_paragraph()
p2.text = "Mapas Conceptuales de Arquitectura, Blindaje Legal ante Auditorías (Ley 20.584) y Pagos Directos"
p2.font.name = "Calibri"
p2.font.size = Pt(17)
p2.font.color.rgb = RGBColor(180, 205, 220)
p2.space_after = Pt(24)

m_card = add_card(s1, Inches(1.0), Inches(5.0), Inches(11.3), Inches(1.5), RGBColor(22, 48, 75), C_PETROLEO)
m_tf = m_card.text_frame
m_tf.word_wrap = True
m_tf.margin_left = m_tf.margin_right = Inches(0.4)
m_tf.margin_top = Inches(0.2)

mp1 = m_tf.paragraphs[0]
mp1.text = "Clínica Cabal Salud SpA (cabalsalud.cl) · Motor Clínico Gentia (gentia.cl)"
mp1.font.name = "Georgia"
mp1.font.size = Pt(15)
mp1.font.bold = True
mp1.font.color.rgb = C_BLANCO
mp1.space_after = Pt(4)

mp2 = m_tf.add_paragraph()
mp2.text = "Dirección Clínica y Administración: Pamela Quijada y Lilians Cortés | Blindaje Tributario (SII) y Sanitario (Ley 20.584)"
mp2.font.name = "Calibri"
mp2.font.size = Pt(12)
mp2.font.color.rgb = RGBColor(160, 220, 210)

# ==============================================================================
# SLIDE 2: FUNDAMENTO TRIBUTARIO (SII) Y EXENCIÓN DE IVA
# ==============================================================================
s2 = prs.slides.add_slide(blank_layout)
set_slide_background(s2, C_PERLA)
add_header(s2, "Fundamento Tributario: Regla Suprema de Aislamiento Financiero (SII)")

c_izq = add_card(s2, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.1), C_BLANCO, RGBColor(220, 215, 205))
tf_izq = c_izq.text_frame
tf_izq.word_wrap = True
tf_izq.margin_left = tf_izq.margin_right = Inches(0.35)
tf_izq.margin_top = Inches(0.3)

p = tf_izq.paragraphs[0]
p.text = "🏛️ Ley de IVA y Exención Médica (Art. 12 E N° 8)"
p.font.name = "Georgia"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = C_GRANATE
p.space_after = Pt(10)

p = tf_izq.add_paragraph()
p.text = (
    "• Marco Tributario Chileno:\n"
    "Las consultas y atenciones médicas, psicológicas y de salud ambulatoria están exentas de IVA ante el SII.\n\n"
    "• Riesgo Evitado con Gentia:\n"
    "Si gentia.cl recaudara los fondos de los pacientes para luego transferirlos a Cabal Salud, "
    "Gentia actuaría como mandatario/comisionista mercantil. Esto obligaría a gravar la comisión con IVA del 19% o arriesgar fiscalizaciones de triangulación.\n\n"
    "• Solución Definitiva: Direct Merchant Routing\n"
    "El 100% del dinero entra de forma directa y exclusiva a las cuentas bancarias de Clínica Cabal Salud SpA "
    "mediante Transbank Webpay Plus y Mercado Pago propios. Gentia nunca toca un solo peso."
)
p.font.name = "Calibri"
p.font.size = Pt(12)
p.font.color.rgb = C_NOCHE

c_der = add_card(s2, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.1), C_BLANCO, RGBColor(220, 215, 205))
tf_der = c_der.text_frame
tf_der.word_wrap = True
tf_der.margin_left = tf_der.margin_right = Inches(0.35)
tf_der.margin_top = Inches(0.3)

p = tf_der.paragraphs[0]
p.text = "📦 Dos Repositorios 100% Desacoplados"
p.font.name = "Georgia"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = C_PETROLEO
p.space_after = Pt(10)

p = tf_der.add_paragraph()
p.text = (
    "1. Repositorio cabalsalud.cl (Vercel Independiente):\n"
    "   - Frontend con diseño, logo y paleta oficial.\n"
    "   - Catálogo multidisciplinario con 9 especialistas.\n"
    "   - Portal de Profesionales privado en el mismo dominio.\n"
    "   - Cobro directo /api/pagos/webpay y /mercadopago.\n\n"
    "2. Repositorio gentia.cl (Motor Clínico Headless):\n"
    "   - Motor de agenda y bloqueo de horarios en vivo.\n"
    "   - Bóveda de Fichas Clínicas Cifradas (AES-256).\n"
    "   - Salas WebRTC de teleconsulta cifrada punto a punto.\n"
    "   - Panel de Administración y Liquidaciones para Pamela y Lilians."
)
p.font.name = "Calibri"
p.font.size = Pt(12)
p.font.color.rgb = C_NOCHE

# ==============================================================================
# SLIDE 3: MAPA CONCEPTUAL 1 (MACRO) — ARQUITECTURA DEL ECOSISTEMA
# (MAPA CONCEPTUAL REAL CON NODOS JERÁRQUICOS Y PASTILLAS DE CONEXIÓN)
# ==============================================================================
s3 = prs.slides.add_slide(blank_layout)
set_slide_background(s3, C_PERLA)
add_header(s3, "Mapa Conceptual 1: Ecosistema Integral, Flujo de Fondos y Custodia Clínica")

# Nodo Central: CLÍNICA CABAL SALUD SpA
n_cabal = add_concept_node(s3, Inches(4.7), Inches(1.8), Inches(3.9), Inches(1.0),
                           "CLÍNICA CABAL SALUD SpA",
                           "Entidad Titular y Prestadora de Salud (cabalsalud.cl)",
                           C_NOCHE, C_PETROLEO, C_PERLA)

# Rama 1: Recaudación Directa (Izquierda Arriba)
p_recauda = add_link_pill(s3, Inches(1.3), Inches(1.9), Inches(3.0), Inches(0.36),
                          "--- recauda 100% directo sin intermediar --->", C_PERLA, C_GRANATE)
n_pasarelas = add_concept_node(s3, Inches(0.8), Inches(2.6), Inches(3.6), Inches(1.1),
                               "Cuentas Bancarias Cabal Salud",
                               "Transbank Webpay Plus & Mercado Pago Chile\n(Fondos van directo a cuenta de la clínica)",
                               C_BLANCO, C_GRANATE, C_NOCHE)

p_sii = add_link_pill(s3, Inches(1.0), Inches(4.0), Inches(3.2), Inches(0.36),
                      "--- blinda exención tributaria ante --->", C_PERLA, C_GRANATE)
n_sii = add_concept_node(s3, Inches(0.8), Inches(4.7), Inches(3.6), Inches(1.0),
                         "Servicio de Impuestos Internos (SII)",
                         "Exención de IVA garantizada (Art. 12 Letra E N° 8)\nEmisión de Boletas Exentas sin comisiones",
                         C_PERLA_CARD, C_GRANATE, C_NOCHE)

# Rama 2: Custodia Clínica Sensible (Derecha Arriba)
p_delega = add_link_pill(s3, Inches(8.9), Inches(1.9), Inches(3.3), Inches(0.36),
                         "--- delega custodia clínica sensible a --->", C_PERLA, C_PETROLEO)
n_gentia = add_concept_node(s3, Inches(8.8), Inches(2.6), Inches(3.7), Inches(1.1),
                            "Motor Clínico Headless Gentia",
                            "Bóveda Cifrada de Salud (gentia.cl)\nCifrado en reposo AES-256 e inmutabilidad",
                            C_BLANCO, C_PETROLEO, C_NOCHE)

p_minsal = add_link_pill(s3, Inches(9.0), Inches(4.0), Inches(3.3), Inches(0.36),
                         "--- blinda ante fiscalización legal de --->", C_PERLA, C_PETROLEO)
n_minsal = add_concept_node(s3, Inches(8.8), Inches(4.7), Inches(3.7), Inches(1.0),
                            "Superintendencia de Salud / Agencia Datos",
                            "Cumplimiento Ley N° 20.584, D.S. N° 41 (15 años)\ny Ley N° 21.719 (Protección Datos Sensibles)",
                            C_LIGHT_EMERALD, C_ESMERALDA, C_NOCHE)

# Rama 3: Abajo Centro (Pacientes y Especialistas)
p_atiende = add_link_pill(s3, Inches(5.0), Inches(3.1), Inches(3.3), Inches(0.36),
                          "--- ofrece atención multidisciplinaria a --->", C_PERLA, C_PETROLEO)
n_pacientes = add_concept_node(s3, Inches(4.5), Inches(3.7), Inches(4.3), Inches(0.95),
                               "Pacientes y Consultantes",
                               "Catálogo 9 profesionales, validación RUT y reserva in-page",
                               C_BLANCO, C_PETROLEO, C_NOCHE)

p_portal = add_link_pill(s3, Inches(5.0), Inches(4.9), Inches(3.3), Inches(0.36),
                         "--- provee entorno privado de gestión a --->", C_PERLA, C_PETROLEO)
n_portal = add_concept_node(s3, Inches(4.2), Inches(5.5), Inches(4.9), Inches(1.1),
                            "Portal Profesional (cabalsalud.cl)",
                            "Edición de perfil, arancel, tiempo de sesión (30 a 90 min),\nFichas Clínicas en Bóveda Gentia y datos de transferencia",
                            C_BLANCO, C_NOCHE, C_NOCHE)

# ==============================================================================
# SLIDE 4: SCREENSHOT SITIO WEB PÚBLICO (cabalsalud.cl)
# ==============================================================================
s4 = prs.slides.add_slide(blank_layout)
set_slide_background(s4, C_PERLA)
add_header(s4, "Sitio Web Oficial de Cara al Paciente (cabalsalud.cl)")

c_info4 = add_card(s4, Inches(0.8), Inches(1.8), Inches(4.8), Inches(5.1), C_BLANCO, RGBColor(220, 215, 205))
tf4 = c_info4.text_frame
tf4.word_wrap = True
tf4.margin_left = tf4.margin_right = Inches(0.3)
tf4.margin_top = Inches(0.25)

p = tf4.paragraphs[0]
p.text = "Experiencia Paciente: Claridad y Cercanía"
p.font.name = "Georgia"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = C_NOCHE
p.space_after = Pt(8)

p = tf4.add_paragraph()
p.text = (
    "• Hero Section:\n"
    "  Título oficial en 'Source Serif 4':\n"
    "  'Profesionales de salud para acompañarte con cercanía y criterio.'\n\n"
    "• Catálogo Multidisciplinario:\n"
    "  9 profesionales en Psicología, Nutrición, Matronería, Terapia Ocupacional, "
    "Fonoaudiología, Trabajo Social, Psiquiatría y Mediación Familiar.\n\n"
    "• Subespecialidades Estrella Destacadas:\n"
    "  Distintivo en Granate (#772F3B) para Deporte, Neurodivergencia, Perinatal y Geriatría.\n\n"
    "• Agendamiento In-Page:\n"
    "  Modal fluido sin salir del sitio para reservar y pagar."
)
p.font.name = "Calibri"
p.font.size = Pt(11.5)

img_path_1 = os.path.join(os.getcwd(), "presentation_assets", "01_home.png")
if os.path.exists(img_path_1):
    frame = add_card(s4, Inches(5.85), Inches(1.8), Inches(6.65), Inches(5.1), C_BLANCO, C_PETROLEO)
    s4.shapes.add_picture(img_path_1, Inches(5.95), Inches(1.9), width=Inches(6.45), height=Inches(4.6))
    cap_box = s4.shapes.add_textbox(Inches(5.95), Inches(6.55), Inches(6.45), Inches(0.3))
    cap_tf = cap_box.text_frame
    cap_p = cap_tf.paragraphs[0]
    cap_p.text = "Vista en vivo: https://cabalsalud.vercel.app (Diseño Perla, Azul Noche y Verde Petróleo)"
    cap_p.font.size = Pt(10)
    cap_p.font.color.rgb = C_SLATE
    cap_p.alignment = PP_ALIGN.CENTER

# ==============================================================================
# SLIDE 5: FLUJO OPERACIONAL PASO A PASO (DE RESERVA A TELECONSULTA)
# ==============================================================================
s5 = prs.slides.add_slide(blank_layout)
set_slide_background(s5, C_PERLA)
add_header(s5, "Flujo Operacional: Paso a Paso de Agendamiento, Cobro y Confirmación")

pasos = [
    ("PASO 1", "Selección en Vivo", "El paciente elige especialista y fecha. Consulta /api/agenda/disponibilidad que conecta en vivo con Gentia.", C_PETROLEO),
    ("PASO 2", "Validación RUT y Modalidad", "Formulario valida RUT Módulo 11 (para boleta de reembolso). Si elige 'Visita a Terreno' se exige dirección física.", C_NOCHE),
    ("PASO 3", "Pre-Agendamiento TTL", "Cabal Salud llama a Gentia /clinica/preAgendarCita. El slot queda bloqueado por 15 min en 'pendiente_pago'.", C_PETROLEO),
    ("PASO 4", "Transacción Bancaria", "Se inicia el cobro en Transbank Webpay Plus o Mercado Pago con credenciales exclusivas de Cabal Salud SpA.", C_GRANATE),
    ("PASO 5", "Retorno y Webhook HMAC", "Tras el pago exitoso, Cabal Salud confirma retorno y dispara Webhook firmado con SHA256 hacia Gentia.", C_ESMERALDA),
    ("PASO 6", "Confirmación y Calendarios", "Se activa la cita, se genera enlace WebRTC, se envía correo y se descarga .ICS / 1-clic Google Calendar.", C_PETROLEO)
]

for idx, (step_num, step_title, step_desc, step_color) in enumerate(pasos):
    row = idx // 3
    col = idx % 3
    left_x = Inches(0.8 + col * 4.0)
    top_y = Inches(1.9 + row * 2.6)
    
    card = add_card(s5, left_x, top_y, Inches(3.7), Inches(2.35), C_BLANCO, step_color)
    ctf = card.text_frame
    ctf.word_wrap = True
    ctf.margin_left = ctf.margin_right = Inches(0.25)
    ctf.margin_top = Inches(0.2)
    
    p = ctf.paragraphs[0]
    p.text = f"{step_num} · {step_title}"
    p.font.name = "Georgia"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = step_color
    p.space_after = Pt(6)
    
    p = ctf.add_paragraph()
    p.text = step_desc
    p.font.name = "Calibri"
    p.font.size = Pt(11)
    p.font.color.rgb = C_NOCHE

# ==============================================================================
# SLIDE 6: SCREENSHOT COMPROBANTE DE PAGO Y CONFIRMACIÓN
# ==============================================================================
s6 = prs.slides.add_slide(blank_layout)
set_slide_background(s6, C_PERLA)
add_header(s6, "Comprobante Oficial y Sincronización de Calendarios")

c_info6 = add_card(s6, Inches(0.8), Inches(1.8), Inches(4.8), Inches(5.1), C_BLANCO, RGBColor(220, 215, 205))
tf6 = c_info6.text_frame
tf6.word_wrap = True
tf6.margin_left = tf6.margin_right = Inches(0.3)
tf6.margin_top = Inches(0.25)

p = tf6.paragraphs[0]
p.text = "Respaldo y Resiliencia Stateless"
p.font.name = "Georgia"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = C_NOCHE
p.space_after = Pt(8)

p = tf6.add_paragraph()
p.text = (
    "• Comprobante Inmutable de Pago:\n"
    "  Muestra Orden de Compra, Código de Autorización Transbank, 4 últimos dígitos de tarjeta y monto en CLP.\n\n"
    "• Datos Listos para Reembolso:\n"
    "  RUT del paciente, previsión (Isapre / FONASA) y datos del profesional con RNPI para presentar a reembolso médico.\n\n"
    "• Sala de Teleconsulta WebRTC:\n"
    "  Botón directo para ingresar a la sala cifrada de videollamada de Gentia sin requerir cuentas externas.\n\n"
    "• Integración 1-Clic de Calendario:\n"
    "  Botón nativo para Google Calendar y descarga de archivo estándar .ICS (Outlook, Apple Calendar)."
)
p.font.name = "Calibri"
p.font.size = Pt(11.5)

img_path_4 = os.path.join(os.getcwd(), "presentation_assets", "04_confirmacion_reserva.png")
if os.path.exists(img_path_4):
    frame = add_card(s6, Inches(5.85), Inches(1.8), Inches(6.65), Inches(5.1), C_BLANCO, C_PETROLEO)
    s6.shapes.add_picture(img_path_4, Inches(5.95), Inches(1.9), width=Inches(6.45), height=Inches(4.6))
    cap_box = s6.shapes.add_textbox(Inches(5.95), Inches(6.55), Inches(6.45), Inches(0.3))
    cap_tf = cap_box.text_frame
    cap_p = cap_tf.paragraphs[0]
    cap_p.text = "Vista en vivo: /confirmacion-reserva.html con voucher directo de Cabal Salud SpA"
    cap_p.font.size = Pt(10)
    cap_p.font.color.rgb = C_SLATE
    cap_p.alignment = PP_ALIGN.CENTER

# ==============================================================================
# SLIDE 7: MAPA CONCEPTUAL 2 — BLINDAJE LEGAL ANTE AUDITORÍAS Y FICHA CLÍNICA
# (MAPA CONCEPTUAL REAL: ESPECIALISTA -> BÓVEDA GENTIA -> MARCO LEGAL)
# ==============================================================================
s7 = prs.slides.add_slide(blank_layout)
set_slide_background(s7, C_PERLA)
add_header(s7, "Mapa Conceptual 2: Fichas Clínicas, Epicrisis y Blindaje ante Auditorías")

# Nodo Central: Terapeuta en Portal Profesional
n_terapeuta = add_concept_node(s7, Inches(4.5), Inches(1.8), Inches(4.3), Inches(1.1),
                               "Especialista (Psicólogo / Terapeuta)",
                               "Opera desde el Portal Profesional en cabalsalud.cl\n(Acceso sin Google con Demo o Credenciales)",
                               C_NOCHE, C_PETROLEO, C_PERLA)

# Rama Izquierda: Autonomía de Ficha y Parámetros
p_config = add_link_pill(s7, Inches(1.0), Inches(2.0), Inches(3.2), Inches(0.36),
                         "--- configura de forma autónoma --->", C_PERLA, C_PETROLEO)
n_parametros = add_concept_node(s7, Inches(0.8), Inches(2.6), Inches(3.5), Inches(1.1),
                                "Arancel y Tiempo de Sesión",
                                "Duración modificable (30, 45, 50, 60, 75 o 90 min)\ny valor de consulta en CLP sin intervención externa",
                                C_BLANCO, C_PETROLEO, C_NOCHE)

p_redacta = add_link_pill(s7, Inches(1.0), Inches(4.0), Inches(3.2), Inches(0.36),
                          "--- redacta notas de atención y --->", C_PERLA, C_PETROLEO)
n_epicrisis = add_concept_node(s7, Inches(0.8), Inches(4.7), Inches(3.5), Inches(1.2),
                               "Epicrisis Oficial / Alta Médica",
                               "Resumen psicoterapéutico, diagnóstico CIE-11/DSM-5\ne informe de avance clínico para Isapres",
                               C_BLANCO, C_GRANATE, C_NOCHE)

# Rama Derecha: Conexión con Gentia y Blindaje Legal ante Auditorías
p_boveda = add_link_pill(s7, Inches(9.1), Inches(2.0), Inches(3.3), Inches(0.36),
                         "--- sincroniza datos sensibles con --->", C_PERLA, C_ESMERALDA)
n_vault = add_concept_node(s7, Inches(9.0), Inches(2.6), Inches(3.5), Inches(1.1),
                           "Bóveda Cifrada Gentia (EHR Vault)",
                           "Encriptación AES-256 en reposo y tránsito\nFirma inmutable por sesión con hash de auditoría",
                           C_LIGHT_EMERALD, C_ESMERALDA, C_NOCHE)

p_leyes = add_link_pill(s7, Inches(9.1), Inches(4.0), Inches(3.3), Inches(0.36),
                        "--- blinda legalmente a Cabal Salud ante --->", C_PERLA, C_ESMERALDA)
n_leyes = add_concept_node(s7, Inches(9.0), Inches(4.7), Inches(3.5), Inches(1.2),
                           "Auditorías Sanitarias y de Datos",
                           "Ley N° 20.584 (Derechos del Paciente)\nD.S. N° 41 (Custodia 15 años) y Ley N° 21.719\nPamela y Lilians acreditan custodia delegada",
                           C_BLANCO, C_ESMERALDA, C_NOCHE)

# Centro Abajo: El Consultante
p_atencion = add_link_pill(s7, Inches(5.0), Inches(3.2), Inches(3.3), Inches(0.36),
                           "--- atiende mediante sala segura a --->", C_PERLA, C_PETROLEO)
n_consul = add_concept_node(s7, Inches(4.5), Inches(3.8), Inches(4.3), Inches(1.0),
                            "Consultante con Consentimiento Firmado",
                            "Atención por videoconsulta WebRTC de Gentia\ncon consentimiento informado legalmente registrado",
                            C_BLANCO, C_PETROLEO, C_NOCHE)

p_pago = add_link_pill(s7, Inches(5.0), Inches(5.0), Inches(3.3), Inches(0.36),
                       "--- reporta honorarios atendidos a --->", C_PERLA, C_NOCHE)
n_liq = add_concept_node(s7, Inches(4.5), Inches(5.6), Inches(4.3), Inches(1.0),
                         "Liquidación Mensual (Pamela y Lilians)",
                         "Datos bancarios para transferencia directa de honorarios",
                         C_PERLA_CARD, C_NOCHE, C_NOCHE)

# ==============================================================================
# SLIDE 8: SCREENSHOT PORTAL DE PROFESIONALES (cabalsalud.cl)
# ==============================================================================
s8 = prs.slides.add_slide(blank_layout)
set_slide_background(s8, C_PERLA)
add_header(s8, "Interfaz del Portal Profesional: Perfil, Aranceles y Tiempo de Sesión")

c_info8 = add_card(s8, Inches(0.8), Inches(1.8), Inches(4.8), Inches(5.1), C_BLANCO, RGBColor(220, 215, 205))
tf8 = c_info8.text_frame
tf8.word_wrap = True
tf8.margin_left = tf8.margin_right = Inches(0.3)
tf8.margin_top = Inches(0.25)

p = tf8.paragraphs[0]
p.text = "Operación 100% en cabalsalud.cl"
p.font.name = "Georgia"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = C_PETROLEO
p.space_after = Pt(8)

p = tf8.add_paragraph()
p.text = (
    "• Sin depender de Google OAuth:\n"
    "  Selector de demostración para entrar con 1 clic como cualquiera de los 9 profesionales, o con correo/clave clínica.\n\n"
    "• Duración de Sesión Modificable:\n"
    "  Cada especialista define si su sesión dura 30, 45, 50, 60, 75 o 90 minutos.\n\n"
    "• Ficha Pública Previa:\n"
    "  Botón para previsualizar en vivo cómo ven los consultantes su tarjeta antes de publicar cambios.\n\n"
    "• Datos de Transferencia:\n"
    "  Registro de banco, cuenta y RUT para las transferencias de honorarios de Pamela y Lilians."
)
p.font.name = "Calibri"
p.font.size = Pt(11.5)

img_path_3 = os.path.join(os.getcwd(), "presentation_assets", "03_portal_profesional.png")
if os.path.exists(img_path_3):
    frame = add_card(s8, Inches(5.85), Inches(1.8), Inches(6.65), Inches(5.1), C_BLANCO, C_PETROLEO)
    s8.shapes.add_picture(img_path_3, Inches(5.95), Inches(1.9), width=Inches(6.45), height=Inches(4.6))
    cap_box = s8.shapes.add_textbox(Inches(5.95), Inches(6.55), Inches(6.45), Inches(0.3))
    cap_tf = cap_box.text_frame
    cap_p = cap_tf.paragraphs[0]
    cap_p.text = "Vista en vivo: https://cabalsalud.vercel.app/portal-profesional.html"
    cap_p.font.size = Pt(10)
    cap_p.font.color.rgb = C_SLATE
    cap_p.alignment = PP_ALIGN.CENTER

# ==============================================================================
# SLIDE 9: NUEVA BÓVEDA DE FICHA CLÍNICA & EPICRISIS (LEY 20.584)
# ==============================================================================
s9 = prs.slides.add_slide(blank_layout)
set_slide_background(s9, C_PERLA)
add_header(s9, "Ficha Clínica Electrónica y Epicrisis Cifrada (Integración Gentia)")

c_info9 = add_card(s9, Inches(0.8), Inches(1.8), Inches(4.8), Inches(5.1), C_BLANCO, RGBColor(220, 215, 205))
tf9 = c_info9.text_frame
tf9.word_wrap = True
tf9.margin_left = tf9.margin_right = Inches(0.3)
tf9.margin_top = Inches(0.25)

p = tf9.paragraphs[0]
p.text = "Custodia y Cumplimiento Normativo"
p.font.name = "Georgia"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = C_ESMERALDA
p.space_after = Pt(8)

p = tf9.add_paragraph()
p.text = (
    "• Resguardo ante Auditorías Sanitarias:\n"
    "  Si la Superintendencia de Salud o el Consejo de Protección de Datos fiscaliza a Cabal Salud, "
    "las administradoras demuestran que las historias clínicas están blindadas bajo la custodia criptográfica de Gentia.\n\n"
    "• Módulos Clínicos Disponibles:\n"
    "  1. Anamnesis y motivo de consulta inicial.\n"
    "  2. Diagnóstico codificado (CIE-11 / DSM-5).\n"
    "  3. Notas de evolución sesión a sesión con fecha.\n"
    "  4. Epicrisis oficial descargable para Isapres.\n"
    "  5. Consentimiento informado verificado.\n\n"
    "• Retención Legal de 15 Años:\n"
    "  Cumplimiento íntegro del Decreto Supremo N° 41 del MINSAL."
)
p.font.name = "Calibri"
p.font.size = Pt(11)

img_path_6 = os.path.join(os.getcwd(), "presentation_assets", "06_ficha_clinica.png")
if not os.path.exists(img_path_6):
    img_path_6 = os.path.join(os.getcwd(), "presentation_assets", "03_portal_profesional.png")

if os.path.exists(img_path_6):
    frame = add_card(s9, Inches(5.85), Inches(1.8), Inches(6.65), Inches(5.1), C_BLANCO, C_ESMERALDA)
    s9.shapes.add_picture(img_path_6, Inches(5.95), Inches(1.9), width=Inches(6.45), height=Inches(4.6))
    cap_box = s9.shapes.add_textbox(Inches(5.95), Inches(6.55), Inches(6.45), Inches(0.3))
    cap_tf = cap_box.text_frame
    cap_p = cap_tf.paragraphs[0]
    cap_p.text = "Pestaña 'Ficha Clínica & Epicrisis' en el Portal Profesional de Cabal Salud"
    cap_p.font.size = Pt(10)
    cap_p.font.color.rgb = C_SLATE
    cap_p.alignment = PP_ALIGN.CENTER

# ==============================================================================
# SLIDE 10: SCREENSHOT PANEL DE ADMINISTRACIÓN (PAMELA Y LILIANS EN GENTIA)
# ==============================================================================
s10 = prs.slides.add_slide(blank_layout)
set_slide_background(s10, C_PERLA)
add_header(s10, "Dashboard de Administración y Liquidaciones (Pamela y Lilians)")

c_info10 = add_card(s10, Inches(0.8), Inches(1.8), Inches(4.8), Inches(5.1), C_BLANCO, RGBColor(220, 215, 205))
tf10 = c_info10.text_frame
tf10.word_wrap = True
tf10.margin_left = tf10.margin_right = Inches(0.3)
tf10.margin_top = Inches(0.25)

p = tf10.paragraphs[0]
p.text = "Ajustes Clave para Clínica Online"
p.font.name = "Georgia"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = C_NOCHE
p.space_after = Pt(8)

p = tf10.add_paragraph()
p.text = (
    "• Sesión con Paciente (Actualizado):\n"
    "  Se renombró 'Cita' por 'Sesión con Paciente / Consultante'.\n\n"
    "• Bloqueo de Box Físico y Aseo:\n"
    "  Opciones físicas quedan tachadas y deshabilitadas porque Cabal Salud es una clínica 100% online.\n\n"
    "• Bloqueo de Cupón de Box:\n"
    "  El cupón de box físico queda desactivado (los pacientes pagan directamente en la web).\n\n"
    "• Seguridad Zero-Trust:\n"
    "  Solo Pamela y Lilians pueden acceder tras iniciar sesión (se bloqueó el acceso anónimo de incógnito).\n\n"
    "• Reporte de Liquidaciones:\n"
    "  Muestra el total de sesiones atendidas por profesional para transferir sus honorarios."
)
p.font.name = "Calibri"
p.font.size = Pt(11)

img_path_5 = os.path.join(os.getcwd(), "presentation_assets", "05_gentia_dashboard.png")
if os.path.exists(img_path_5):
    frame = add_card(s10, Inches(5.85), Inches(1.8), Inches(6.65), Inches(5.1), C_BLANCO, C_NOCHE)
    s10.shapes.add_picture(img_path_5, Inches(5.95), Inches(1.9), width=Inches(6.45), height=Inches(4.6))
    cap_box = s10.shapes.add_textbox(Inches(5.95), Inches(6.55), Inches(6.45), Inches(0.3))
    cap_tf = cap_box.text_frame
    cap_p = cap_tf.paragraphs[0]
    cap_p.text = "Acceso en vivo: https://gentia.cl/clinica-dashboard.html?id=cabalsalud"
    cap_p.font.size = Pt(10)
    cap_p.font.color.rgb = C_SLATE
    cap_p.alignment = PP_ALIGN.CENTER

# ==============================================================================
# SLIDE 11: MAPA CONCEPTUAL 3 — SEGURIDAD CRIPTOGRÁFICA Y WEBHOOKS HMAC
# ==============================================================================
s11 = prs.slides.add_slide(blank_layout)
set_slide_background(s11, C_PERLA)
add_header(s11, "Mapa Conceptual 3: Seguridad Criptográfica y Sincronización HMAC")

# Nodo Emisor: Cabal Salud API
n_emisor = add_concept_node(s11, Inches(0.8), Inches(2.2), Inches(3.6), Inches(1.2),
                            "Servidor Cabal Salud (Emisor)",
                            "Recibe confirmación Transbank/MP\ny construye cadena canónica de pago:\n'cabalsalud:citaId:buyOrder:monto:authCode'",
                            C_BLANCO, C_PETROLEO, C_NOCHE)

p_firma = add_link_pill(s11, Inches(4.7), Inches(2.3), Inches(3.9), Inches(0.4),
                        "--- firma con Secreto Compartido HMAC-SHA256 --->", C_PERLA, C_PETROLEO)

# Nodo Receptor: Gentia Engine
n_receptor = add_concept_node(s11, Inches(8.9), Inches(2.2), Inches(3.6), Inches(1.2),
                              "Motor Gentia (Receptor Seguro)",
                              "Valida firma en /clinica/confirmarPagoExterno.\nSi el hash coincide al 100%, activa la cita.\nSi no coincide, bloquea (401 Unauthorized)",
                              C_LIGHT_EMERALD, C_ESMERALDA, C_NOCHE)

# Nodo Abajo Izquierda: Telemetría Antifallos
p_tele = add_link_pill(s11, Inches(1.0), Inches(3.8), Inches(3.2), Inches(0.36),
                       "--- activa canal de notificación con --->", C_PERLA, C_PETROLEO)
n_tele = add_concept_node(s11, Inches(0.8), Inches(4.5), Inches(3.6), Inches(1.3),
                          "Telemetría de Notificaciones",
                          "Prioriza WhatsApp Business.\nSi excede cuota o falla webhook externo,\nconmuta de forma automática a Email\npara evitar citas silenciosas.",
                          C_BLANCO, C_PETROLEO, C_NOCHE)

# Nodo Abajo Derecha: Sala WebRTC y Liquidación
p_activa = add_link_pill(s11, Inches(9.1), Inches(3.8), Inches(3.2), Inches(0.36),
                         "--- crea sesión y suma honorario a --->", C_PERLA, C_ESMERALDA)
n_activa = add_concept_node(s11, Inches(8.9), Inches(4.5), Inches(3.6), Inches(1.3),
                            "Sala WebRTC y Liquidación",
                            "Genera sala de teleconsulta cifrada y suma\nla sesión al informe mensual de honorarios\npara la transferencia de Pamela y Lilians.",
                            C_BLANCO, C_NOCHE, C_NOCHE)

# Nodo Central: Secreto Compartido
n_secret = add_concept_node(s11, Inches(4.9), Inches(3.6), Inches(3.5), Inches(1.0),
                            "GENTIA_WEBHOOK_HMAC_SECRET",
                            "Llave simétrica privada inyectada en variables\nde entorno de Vercel (nunca expuesta al público)",
                            C_PERLA_CARD, C_GRANATE, C_GRANATE)

# ==============================================================================
# SLIDE 12: OPORTUNIDADES ESTRATÉGICAS Y RETORNO DE INVERSIÓN (ROI)
# ==============================================================================
s12 = prs.slides.add_slide(blank_layout)
set_slide_background(s12, C_PERLA)
add_header(s12, "Oportunidades Estratégicas y Hoja de Ruta de Crecimiento")

opps = [
    ("📱 Recordatorios WhatsApp", "Costo Meta: ~$40 CLP/msg (~$4.500/mes). Reduce el no-show de 18% a menos de 4%, rescatando +$350.000 CLP mensuales en consultas que antes se perdían por inasistencia.", C_ESMERALDA),
    ("📦 Packs de 4 Sesiones", "Descuento 10% por pago anticipado. Asegura flujo de caja inmediato ($126.000 en vez de arriesgar deserción tras sesión 1) y mejora adherencia clínica.", C_PETROLEO),
    ("🧭 Triage Clínico Guiado", "Widget de 3 preguntas en el Hero: '¿No sabes qué especialista necesitas?'. Orienta a pacientes indecisos y eleva la conversión del sitio entre 20% y 30%.", C_GRANATE),
    ("🤝 Convenios B2B Empresas", "Planes de salud mental y bienestar para colaboradores de empresas chilenas con factura exenta de IVA deducible de gastos corporativos.", C_NOCHE)
]

for idx, (op_title, op_desc, op_color) in enumerate(opps):
    row = idx // 2
    col = idx % 2
    left_x = Inches(0.8 + col * 6.0)
    top_y = Inches(1.9 + row * 2.6)
    
    card = add_card(s12, left_x, top_y, Inches(5.7), Inches(2.35), C_BLANCO, op_color)
    ctf = card.text_frame
    ctf.word_wrap = True
    ctf.margin_left = ctf.margin_right = Inches(0.3)
    ctf.margin_top = Inches(0.2)
    
    p = ctf.paragraphs[0]
    p.text = op_title
    p.font.name = "Georgia"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = op_color
    p.space_after = Pt(6)
    
    p = ctf.add_paragraph()
    p.text = op_desc
    p.font.name = "Calibri"
    p.font.size = Pt(11.5)
    p.font.color.rgb = C_NOCHE

# ==============================================================================
# SLIDE 13: CONCLUSIONES Y ARGUMENTARIO ANTE AUDITORÍAS
# ==============================================================================
s13 = prs.slides.add_slide(blank_layout)
set_slide_background(s13, C_NOCHE)
add_header(s13, "Argumentario de Defensa ante Auditorías y Enlaces Productivos", "BLINDAJE COMPLETO · CABAL SALUD")

c_fin = add_card(s13, Inches(0.8), Inches(1.8), Inches(11.7), Inches(5.1), RGBColor(22, 48, 75), C_PETROLEO)
tf_fin = c_fin.text_frame
tf_fin.word_wrap = True
tf_fin.margin_left = tf_fin.margin_right = Inches(0.4)
tf_fin.margin_top = Inches(0.3)

p = tf_fin.paragraphs[0]
p.text = "Argumentario Oficial para Pamela Quijada y Lilians Cortés ante Fiscalizaciones"
p.font.name = "Georgia"
p.font.size = Pt(17)
p.font.bold = True
p.font.color.rgb = C_PERLA
p.space_after = Pt(10)

p = tf_fin.add_paragraph()
p.text = (
    "1. Frente a una Auditoría Tributaria del SII:\n"
    "   'Clínica Cabal Salud SpA recauda el 100% de los honorarios directamente en sus cuentas bancarias "
    "mediante Transbank Webpay Plus y Mercado Pago propios. Las prestaciones médicas están exentas de IVA (Art. 12 E N° 8) "
    "y no existe intermediación ni recaudación por terceros.'\n\n"
    "2. Frente a una Auditoría Sanitaria (Superintendencia de Salud / Ley 20.584 y D.S. N° 41):\n"
    "   'El sitio web comercial cabalsalud.cl no almacena fichas clínicas ni datos de salud sensibles. "
    "Cabal Salud mantiene un contrato de custodia e infraestructura con Gentia.cl, donde las historias clínicas y evoluciones "
    "son almacenadas bajo cifrado AES-256 en reposo, con firma inmutable y retención legal de 15 años.'\n\n"
    "3. Enlaces Oficiales de Operación en Producción:\n"
    "   • Sitio Pacientes: https://cabalsalud.vercel.app  (o https://cabalsalud.cl al delegar DNS)\n"
    "   • Portal Especialistas (Fichas, Arancel y Tiempo 30-90m): https://cabalsalud.vercel.app/portal-profesional.html\n"
    "   • Dashboard Pamela y Lilians: https://gentia.cl/clinica-dashboard.html?id=cabalsalud"
)
p.font.name = "Calibri"
p.font.size = Pt(11.5)
p.font.color.rgb = C_BLANCO

# Guardar y actualizar archivos
output_pptx_workspace = os.path.join(os.getcwd(), "Presentacion_Cabalsalud_Arquitectura_y_Funcionamiento.pptx")
prs.save(output_pptx_workspace)
print(f"Presentación actualizada exitosamente en: {output_pptx_workspace}")

brain_dir = r"C:\Users\mtras\.gemini\antigravity\brain\03572d44-b3c4-46c2-b2a0-eb2585e5b2eb"
if os.path.exists(brain_dir):
    output_pptx_brain = os.path.join(brain_dir, "Presentacion_Cabalsalud_Arquitectura_y_Funcionamiento.pptx")
    shutil.copyfile(output_pptx_workspace, output_pptx_brain)
    print(f"Copia actualizada en artefactos: {output_pptx_brain}")
