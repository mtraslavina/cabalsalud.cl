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
C_LIGHT_CARD = RGBColor(255, 255, 255)
C_PERLA_CARD = RGBColor(242, 238, 228)
C_AMBER = RGBColor(217, 119, 6)

def set_slide_background(slide, color=C_PERLA):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
    bg.fill.solid()
    bg.fill.fore_color.rgb = color
    bg.line.fill.background()
    return bg

def add_header(slide, title_text, category_text="CLÍNICA CABAL SALUD · ARQUITECTURA DIGITAL"):
    # Header container
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
    p_tit.font.size = Pt(22)
    p_tit.font.bold = True
    p_tit.font.color.rgb = C_NOCHE

    # Accent line
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.5), Inches(11.7), Inches(0.04))
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

# ==============================================================================
# SLIDE 1: PORTADA EJECUTIVA
# ==============================================================================
s1 = prs.slides.add_slide(blank_layout)
set_slide_background(s1, C_NOCHE)

# Banner decorativo petróleo
decor = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(7.1), prs.slide_width, Inches(0.4))
decor.fill.solid()
decor.fill.fore_color.rgb = C_PETROLEO
decor.line.fill.background()

# Badge superior
badge = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.2), Inches(3.8), Inches(0.45))
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

# Título y Subtítulo
t_box = s1.shapes.add_textbox(Inches(1.0), Inches(1.9), Inches(11.3), Inches(3.2))
ttf = t_box.text_frame
ttf.word_wrap = True

p1 = ttf.paragraphs[0]
p1.text = "Plataforma Web, Portal Profesional e Integración con Motor Clínico Gentia"
p1.font.name = "Georgia"
p1.font.size = Pt(36)
p1.font.bold = True
p1.font.color.rgb = C_PERLA
p1.space_after = Pt(14)

p2 = ttf.add_paragraph()
p2.text = "Presentación Técnica y Operativa de Funcionamiento, Pagos Directos y Mapas Conceptuales de Arquitectura"
p2.font.name = "Calibri"
p2.font.size = Pt(18)
p2.font.color.rgb = RGBColor(180, 200, 215)
p2.space_after = Pt(24)

# Tarjetas de metadatos en portada
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
mp2.text = "Dirección y Administración: Pamela Quijada y Lilians Cortés | Arquitectura: Direct Merchant Routing & Headless Engine"
mp2.font.name = "Calibri"
mp2.font.size = Pt(12)
mp2.font.color.rgb = RGBColor(160, 220, 210)

# ==============================================================================
# SLIDE 2: VISIÓN GENERAL Y REGLA SUPREMA DE AISLAMIENTO TRIBUTARIO
# ==============================================================================
s2 = prs.slides.add_slide(blank_layout)
set_slide_background(s2, C_PERLA)
add_header(s2, "Visión General y Regla Suprema de Aislamiento Tributario (SII)")

# Tarjeta izquierda: Principio Rector
c_izq = add_card(s2, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.1), C_BLANCO, RGBColor(220, 215, 205))
tf_izq = c_izq.text_frame
tf_izq.word_wrap = True
tf_izq.margin_left = tf_izq.margin_right = Inches(0.35)
tf_izq.margin_top = Inches(0.3)

p = tf_izq.paragraphs[0]
p.text = "🏛️ Aislamiento Tributario y Exención de IVA"
p.font.name = "Georgia"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = C_GRANATE
p.space_after = Pt(10)

p = tf_izq.paragraphs[0].add_paragraph() if len(tf_izq.paragraphs) > 1 else tf_izq.add_paragraph()
p.text = (
    "• Decisión Financiera Crítica ante el SII:\n"
    "Las consultas y atenciones de salud ambulatoria en Chile están exentas de IVA (Art. 12 Letra E N° 8).\n\n"
    "• Riesgo Evitado con Gentia:\n"
    "Si gentia.cl recaudara el dinero de los pacientes para luego transferírselo a Cabal Salud, "
    "Gentia actuaría como recaudador/comisionista, complicando la cuadratura contable y exponiendo el flujo al gravamen de IVA.\n\n"
    "• Solución Implementada: Direct Merchant Routing\n"
    "Todo el dinero ingresa directa y exclusivamente a las cuentas bancarias de Clínica Cabal Salud SpA "
    "mediante Transbank Webpay Plus y Mercado Pago Chile propio. Gentia nunca retiene ni intermedia fondos."
)
p.font.name = "Calibri"
p.font.size = Pt(12)
p.font.color.rgb = C_NOCHE

# Tarjeta derecha: 2 Repositorios Independientes
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
    "   - Frontend institucional con identidad visual oficial.\n"
    "   - Catálogo multidisciplinario con 9 especialistas activos.\n"
    "   - Portal de Profesionales privado para editar perfiles.\n"
    "   - Funciones serverless directas (/api/pagos/webpay y /api/pagos/mercadopago).\n\n"
    "2. Repositorio gentia.cl (Motor Clínico Headless):\n"
    "   - Motor de agendamiento y disponibilidad en tiempo real.\n"
    "   - Bloqueo de agenda y sincronización con Google Calendar.\n"
    "   - Salas WebRTC de teleconsulta cifrada de punto a punto.\n"
    "   - Dashboard de Administración y Liquidaciones para Pamela y Lilians."
)
p.font.name = "Calibri"
p.font.size = Pt(12)
p.font.color.rgb = C_NOCHE

# ==============================================================================
# SLIDE 3: MAPA CONCEPTUAL 1 — ARQUITECTURA GENERAL DEL ECOSISTEMA
# ==============================================================================
s3 = prs.slides.add_slide(blank_layout)
set_slide_background(s3, C_PERLA)
add_header(s3, "Mapa Conceptual 1: Arquitectura General del Ecosistema")

# Diagrama en 4 columnas
col_w = Inches(2.65)
top_pos = Inches(2.0)
h_pos = Inches(4.8)

# Col 1: Paciente
c1 = add_card(s3, Inches(0.8), top_pos, col_w, h_pos, C_BLANCO, C_PETROLEO)
tf1 = c1.text_frame
tf1.word_wrap = True
tf1.margin_left = tf1.margin_right = Inches(0.2)
p = tf1.paragraphs[0]
p.text = "1. Paciente en\ncabalsalud.cl"
p.font.name = "Georgia"
p.font.size = Pt(15)
p.font.bold = True
p.font.color.rgb = C_PETROLEO
p.space_after = Pt(8)
p = tf1.add_paragraph()
p.text = (
    "• Navega catálogo multidisciplinario.\n\n"
    "• Filtra por subespecialidad estrella.\n\n"
    "• Selecciona horario en línea.\n\n"
    "• Validación de RUT Chileno (Módulo 11).\n\n"
    "• Elige Online o Visita a Terreno con dirección."
)
p.font.name = "Calibri"
p.font.size = Pt(11)

# Col 2: Pasarelas Directas
c2 = add_card(s3, Inches(3.75), top_pos, col_w, h_pos, C_BLANCO, C_GRANATE)
tf2 = c2.text_frame
tf2.word_wrap = True
tf2.margin_left = tf2.margin_right = Inches(0.2)
p = tf2.paragraphs[0]
p.text = "2. Transacción Directa\nCabal Salud SpA"
p.font.name = "Georgia"
p.font.size = Pt(15)
p.font.bold = True
p.font.color.rgb = C_GRANATE
p.space_after = Pt(8)
p = tf2.add_paragraph()
p.text = (
    "• Transbank Webpay Plus (Código propio de comercio).\n\n"
    "• Mercado Pago Chile (Token directo Cabal Salud).\n\n"
    "• 100% fondos entran a cuenta de Cabal Salud.\n\n"
    "• Cero comisión a intermediarios financieros.\n\n"
    "• Retorno con comprobante oficial para Isapre/FONASA."
)
p.font.name = "Calibri"
p.font.size = Pt(11)

# Col 3: Motor Clínico Gentia
c3 = add_card(s3, Inches(6.7), top_pos, col_w, h_pos, C_BLANCO, C_NOCHE)
tf3 = c3.text_frame
tf3.word_wrap = True
tf3.margin_left = tf3.margin_right = Inches(0.2)
p = tf3.paragraphs[0]
p.text = "3. Motor Clínico\ngentia.cl (Headless)"
p.font.name = "Georgia"
p.font.size = Pt(15)
p.font.bold = True
p.font.color.rgb = C_NOCHE
p.space_after = Pt(8)
p = tf3.add_paragraph()
p.text = (
    "• Pre-reserva slot temporal (15 min TTL).\n\n"
    "• Webhook criptográfico HMAC-SHA256.\n\n"
    "• Bloquea horario en agenda clínica.\n\n"
    "• Crea sala WebRTC de teleconsulta segura.\n\n"
    "• Notifica a paciente y especialista."
)
p.font.name = "Calibri"
p.font.size = Pt(11)

# Col 4: Gestión de Profesionales y Administración
c4 = add_card(s3, Inches(9.65), top_pos, col_w, h_pos, C_BLANCO, C_PETROLEO)
tf4 = c4.text_frame
tf4.word_wrap = True
tf4.margin_left = tf4.margin_right = Inches(0.2)
p = tf4.paragraphs[0]
p.text = "4. Profesionales y\nAdministradoras"
p.font.name = "Georgia"
p.font.size = Pt(15)
p.font.bold = True
p.font.color.rgb = C_PETROLEO
p.space_after = Pt(8)
p = tf4.add_paragraph()
p.text = (
    "• Portal Profesional en cabalsalud.cl (edición de perfil, arancel y tiempo de sesión).\n\n"
    "• Panel de Administración exclusivo para Pamela y Lilians.\n\n"
    "• Reporte de Liquidaciones mensuales de honorarios.\n\n"
    "• Datos bancarios para transferencias directas."
)
p.font.name = "Calibri"
p.font.size = Pt(11)

# ==============================================================================
# SLIDE 4: SITIO PÚBLICO DE LOS PACIENTES (cabalsalud.cl) + SCREENSHOT
# ==============================================================================
s4 = prs.slides.add_slide(blank_layout)
set_slide_background(s4, C_PERLA)
add_header(s4, "Sitio Web Oficial de Cara al Paciente (cabalsalud.cl)")

# Tarjeta izquierda de explicación
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
    "  Título oficial con tipografía 'Source Serif 4':\n"
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

# Screenshot derecha
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
# SLIDE 5: MAPA CONCEPTUAL 2 — FLUJO DE RESERVA Y PAGO DIRECTO
# ==============================================================================
s5 = prs.slides.add_slide(blank_layout)
set_slide_background(s5, C_PERLA)
add_header(s5, "Mapa Conceptual 2: Flujo Paso a Paso de Agendamiento y Pago")

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
# SLIDE 6: COMPROBANTE Y CONFIRMACIÓN DE RESERVA + SCREENSHOT
# ==============================================================================
s6 = prs.slides.add_slide(blank_layout)
set_slide_background(s6, C_PERLA)
add_header(s6, "Comprobante Oficial y Sincronización de Calendarios")

# Tarjeta izquierda
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

# Screenshot Comprobante
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
# SLIDE 7: MAPA CONCEPTUAL 3 — PORTAL EXCLUSIVO DE PROFESIONALES
# ==============================================================================
s7 = prs.slides.add_slide(blank_layout)
set_slide_background(s7, C_PERLA)
add_header(s7, "Mapa Conceptual 3: Portal Exclusivo de Profesionales (cabalsalud.cl)")

modulos = [
    ("1. Acceso sin Google (Demo y Credenciales)", "Permite a Pamela, Lilians y a los terapeutas ingresar con 1 solo clic mediante selector de demo o correo/clave privada, sin depender de cuentas de Google.", C_PETROLEO),
    ("2. Edición Completa de Perfil y Bio", "El especialista edita su nombre, enfoque clínico, trayectoria, títulos/diplomados dinámicos, foto de perfil y áreas de especialidad.", C_NOCHE),
    ("3. Arancel y Tiempo de Sesión Modificable", "Nuevo requerimiento implementado: El profesional define su arancel en CLP y la duración de atención (30, 45, 50, 60, 75 o 90 min) de forma autónoma.", C_GRANATE),
    ("4. Agenda y Próximas Sesiones", "Lista de consultantes agendados, RUT para boleta, motivo de consulta, estado de pago verificado y botón directo para entrar a la sala WebRTC o chatear por WhatsApp.", C_ESMERALDA),
    ("5. Disponibilidad y Horarios", "Configuración de días activos de la semana (Lunes a Sábado) y franjas horarias (mañana y tarde) sincronizadas con el motor clínico.", C_PETROLEO),
    ("6. Datos Bancarios para Liquidación", "Registro de banco, tipo de cuenta, número y RUT titular para que las administradoras transfieran los honorarios mensuales de forma transparente.", C_NOCHE)
]

for idx, (mod_title, mod_desc, mod_color) in enumerate(modulos):
    row = idx // 3
    col = idx % 3
    left_x = Inches(0.8 + col * 4.0)
    top_y = Inches(1.9 + row * 2.6)
    
    card = add_card(s7, left_x, top_y, Inches(3.7), Inches(2.35), C_BLANCO, mod_color)
    ctf = card.text_frame
    ctf.word_wrap = True
    ctf.margin_left = ctf.margin_right = Inches(0.25)
    ctf.margin_top = Inches(0.2)
    
    p = ctf.paragraphs[0]
    p.text = mod_title
    p.font.name = "Georgia"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = mod_color
    p.space_after = Pt(6)
    
    p = ctf.add_paragraph()
    p.text = mod_desc
    p.font.name = "Calibri"
    p.font.size = Pt(11)
    p.font.color.rgb = C_NOCHE

# ==============================================================================
# SLIDE 8: SCREENSHOT Y DETALLE DEL PORTAL DE PROFESIONALES
# ==============================================================================
s8 = prs.slides.add_slide(blank_layout)
set_slide_background(s8, C_PERLA)
add_header(s8, "Interfaz del Portal Profesional (100% Identidad Cabal Salud)")

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
    "• Sin la interfaz de Gentia:\n"
    "  Construido con los colores y tipografía oficial de Cabal Salud (Perla, Azul Noche, Verde Petróleo y Granate).\n\n"
    "• Duración de Sesión Modificable:\n"
    "  Cada especialista (psicólogo, nutricionista, etc.) puede fijar su arancel y duración (30 a 90 min).\n\n"
    "• Botón 'Ficha Pública':\n"
    "  Permite al profesional previsualizar en vivo cómo ven los pacientes su tarjeta antes de publicar cambios.\n\n"
    "• Sincronización Bidireccional:\n"
    "  Los cambios guardados impactan inmediatamente en el catálogo web y la disponibilidad de la agenda."
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
    cap_p.text = "Acceso en vivo: https://cabalsalud.vercel.app/portal-profesional.html"
    cap_p.font.size = Pt(10)
    cap_p.font.color.rgb = C_SLATE
    cap_p.alignment = PP_ALIGN.CENTER

# ==============================================================================
# SLIDE 9: MAPA CONCEPTUAL 4 — PANEL DE DIRECCIÓN Y LIQUIDACIONES (LILIANS Y PAMELA)
# ==============================================================================
s9 = prs.slides.add_slide(blank_layout)
set_slide_background(s9, C_PERLA)
add_header(s9, "Mapa Conceptual 4: Dashboard de Administración (Pamela y Lilians)")

c_info9 = add_card(s9, Inches(0.8), Inches(1.8), Inches(4.8), Inches(5.1), C_BLANCO, RGBColor(220, 215, 205))
tf9 = c_info9.text_frame
tf9.word_wrap = True
tf9.margin_left = tf9.margin_right = Inches(0.3)
tf9.margin_top = Inches(0.25)

p = tf9.paragraphs[0]
p.text = "Ajustes Clave para Clínica Online"
p.font.name = "Georgia"
p.font.size = Pt(16)
p.font.bold = True
p.font.color.rgb = C_NOCHE
p.space_after = Pt(8)

p = tf9.add_paragraph()
p.text = (
    "• Sesión con Paciente (Actualizado):\n"
    "  Se renombró 'Cita' por 'Sesión con Paciente / Consultante'.\n\n"
    "• Bloqueo de Arriendo de Box y Aseo:\n"
    "  Las opciones físicas quedan tachadas y deshabilitadas porque Cabal Salud es una clínica online.\n\n"
    "• Bloqueo de Cupón de Box:\n"
    "  El cupón de box físico queda desactivado (los pacientes pagan directamente en la web).\n\n"
    "• Seguridad Zero-Trust:\n"
    "  Solo Pamela y Lilians pueden acceder tras iniciar sesión (se bloqueó el acceso anónimo de incógnito).\n\n"
    "• Reporte de Liquidaciones:\n"
    "  Muestra el total de sesiones atendidas por profesional para transferir sus honorarios."
)
p.font.name = "Calibri"
p.font.size = Pt(11.5)

img_path_5 = os.path.join(os.getcwd(), "presentation_assets", "05_gentia_dashboard.png")
if os.path.exists(img_path_5):
    frame = add_card(s9, Inches(5.85), Inches(1.8), Inches(6.65), Inches(5.1), C_BLANCO, C_NOCHE)
    s9.shapes.add_picture(img_path_5, Inches(5.95), Inches(1.9), width=Inches(6.45), height=Inches(4.6))
    cap_box = s9.shapes.add_textbox(Inches(5.95), Inches(6.55), Inches(6.45), Inches(0.3))
    cap_tf = cap_box.text_frame
    cap_p = cap_tf.paragraphs[0]
    cap_p.text = "Acceso en vivo: https://gentia.cl/clinica-dashboard.html?id=cabalsalud"
    cap_p.font.size = Pt(10)
    cap_p.font.color.rgb = C_SLATE
    cap_p.alignment = PP_ALIGN.CENTER

# ==============================================================================
# SLIDE 10: MAPA CONCEPTUAL 5 — SEGURIDAD CRIPTOGRÁFICA Y WEBHOOKS HMAC
# ==============================================================================
s10 = prs.slides.add_slide(blank_layout)
set_slide_background(s10, C_PERLA)
add_header(s10, "Mapa Conceptual 5: Seguridad Criptográfica y Sincronización HMAC")

c_hmac = add_card(s10, Inches(0.8), Inches(1.8), Inches(11.7), Inches(5.1), C_BLANCO, C_PETROLEO)
tf_h = c_hmac.text_frame
tf_h.word_wrap = True
tf_h.margin_left = tf_h.margin_right = Inches(0.4)
tf_h.margin_top = Inches(0.3)

p = tf_h.paragraphs[0]
p.text = "Protocolo de Comunicación Segura: Cabal Salud <—— HMAC-SHA256 ——> Gentia"
p.font.name = "Georgia"
p.font.size = Pt(17)
p.font.bold = True
p.font.color.rgb = C_PETROLEO
p.space_after = Pt(12)

p = tf_h.add_paragraph()
p.text = (
    "¿Por qué es indispensable la firma HMAC-SHA256?\n"
    "Al estar ambos sistemas en servidores y dominios distintos (cabalsalud.cl y gentia.cl), "
    "es fundamental garantizar que ninguna persona maliciosa pueda inventar pagos o reservar horas de forma fraudulenta.\n\n"
    "1. Construcción de Cadena Canónica:\n"
    "   Tras la aprobación bancaria en Transbank o Mercado Pago, Cabal Salud crea una cadena con datos estrictos:\n"
    "   canonicalString = 'cabalsalud:{citaId}:{buyOrder}:{montoCLP}:{authCode}'\n\n"
    "2. Firma con Llave Secreta Privada:\n"
    "   Se genera un hash criptográfico HMAC-SHA256 utilizando una clave secreta que solo conocen Cabal Salud y Gentia:\n"
    "   hmacSignature = crypto.createHmac('sha256', GENTIA_WEBHOOK_HMAC_SECRET).update(canonicalString).digest('hex')\n\n"
    "3. Validación en Gentia y Activación:\n"
    "   Gentia recalcula la firma y, si coincide exactamente, cambia la cita a 'PAGADA', crea la sala WebRTC y "
    "suma los honorarios a la liquidación mensual de Pamela y Lilians. Si la firma no coincide, la petición se rechaza de inmediato (401 Unauthorized)."
)
p.font.name = "Calibri"
p.font.size = Pt(12)
p.font.color.rgb = C_NOCHE

# ==============================================================================
# SLIDE 11: OPORTUNIDADES ESTRATÉGICAS Y RETORNO DE INVERSIÓN (ROI)
# ==============================================================================
s11 = prs.slides.add_slide(blank_layout)
set_slide_background(s11, C_PERLA)
add_header(s11, "Oportunidades Estratégicas y Hoja de Ruta de Crecimiento")

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
    
    card = add_card(s11, left_x, top_y, Inches(5.7), Inches(2.35), C_BLANCO, op_color)
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
# SLIDE 12: CONCLUSIONES Y ENLACES DE PRODUCCIÓN
# ==============================================================================
s12 = prs.slides.add_slide(blank_layout)
set_slide_background(s12, C_NOCHE)

add_header(s12, "Resumen Ejecutivo y Enlaces Operativos en Producción", "CLÍNICA CABAL SALUD · PLATAFORMA LISTA")

c_fin = add_card(s12, Inches(0.8), Inches(1.8), Inches(11.7), Inches(5.1), RGBColor(22, 48, 75), C_PETROLEO)
tf_fin = c_fin.text_frame
tf_fin.word_wrap = True
tf_fin.margin_left = tf_fin.margin_right = Inches(0.4)
tf_fin.margin_top = Inches(0.3)

p = tf_fin.paragraphs[0]
p.text = "Ecosistema 100% Funcional y Desplegado en Producción"
p.font.name = "Georgia"
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = C_PERLA
p.space_after = Pt(14)

p = tf_fin.add_paragraph()
p.text = (
    "1. Sitio Web Oficial Cabal Salud (Pacientes):\n"
    "   🔗 https://cabalsalud.vercel.app  (o https://cabalsalud.cl al apuntar DNS)\n"
    "   - Catálogo multidisciplinario, agendamiento in-page y pagos directos con Transbank/MP.\n\n"
    "2. Portal Exclusivo de Profesionales:\n"
    "   🔗 https://cabalsalud.vercel.app/portal-profesional.html\n"
    "   - Ingreso sin Google (Demo y Credenciales), edición de perfil, arancel y tiempo de sesión (30 a 90 min).\n\n"
    "3. Dashboard de Administración y Liquidaciones (Pamela y Lilians):\n"
    "   🔗 https://gentia.cl/clinica-dashboard.html?id=cabalsalud\n"
    "   - Acceso con Zero-Trust (login obligatorio), opciones presenciales bloqueadas y conciliación de pagos.\n\n"
    "4. Repositorio Oficial en GitHub:\n"
    "   🔗 https://github.com/mtraslavina/cabalsalud.cl\n\n"
    "Próximo Hito: Reunión con Pamela Quijada y Lilians Cortés para demostración en vivo de la plataforma."
)
p.font.name = "Calibri"
p.font.size = Pt(12)
p.font.color.rgb = C_BLANCO

# Guardar la presentación
output_pptx_workspace = os.path.join(os.getcwd(), "Presentacion_Cabalsalud_Arquitectura_y_Funcionamiento.pptx")
prs.save(output_pptx_workspace)
print(f"Presentación generada exitosamente en: {output_pptx_workspace}")

# Copiar a la carpeta de artefactos
brain_dir = r"C:\Users\mtras\.gemini\antigravity\brain\03572d44-b3c4-46c2-b2a0-eb2585e5b2eb"
if os.path.exists(brain_dir):
    output_pptx_brain = os.path.join(brain_dir, "Presentacion_Cabalsalud_Arquitectura_y_Funcionamiento.pptx")
    shutil.copyfile(output_pptx_workspace, output_pptx_brain)
    print(f"Copia creada en artefactos: {output_pptx_brain}")
