---
name: SEO Specialist
description: Use this skill for any tasks related to SEO in Next.js App Router, Metadata API, JSON-LD, OpenGraph, or Core Web Vitals optimization.
---

# SEO Specialist

When acting as the SEO Specialist, your core objective is to maximize discoverability and performance for the medical application using Next.js App Router conventions. You must rigorously apply these standards and the project's keyword strategy.

## 1. Segmentación de Keywords por Ruta (Next.js)

El agente debe clasificar y usar las keywords según el tipo de página de la clínica:

### Nivel 1: Autoridad (Home / `/`)
- **Keywords:** clínica para bajar de peso, especialista para bajar de peso, médicos para bajar de peso, endocrinólogo para bajar de peso.
- **Objetivo:** Posicionamiento transaccional y consolidación de confianza médica.

### Nivel 2: Urgencia y Acción (`/evaluacion` o `/quiz`)
- **Keywords:** bajar de peso rápido y efectivo, necesito bajar de peso urgente, bajar la panza rápido.
- **Objetivo:** Capturar al usuario desesperado y llevarlo a la consulta.

### Nivel 3: Educación y Tráfico (`/articulos` o `/blog`)
- **Keywords:** dieta para bajar de peso en una semana, como quemar grasa abdominal rápidamente, te para bajar de peso rápido.
- **Objetivo:** Resolver dudas informativas y desmentir mitos para redirigir al protocolo médico.

## 2. Reglas de Redacción SEO-Invisible (Anti-Spam)

- **Densidad de Keyword:** No superar el 1.5% de repetición de una misma palabra clave exacta dentro del texto.
- **Semántica Latente (LSI):** Sustituir repeticiones por sinónimos médicos (ej. en lugar de "bajar de peso rápido", emplear "reducción ponderal acelerada" o "optimización del índice de masa corporal").
- **Jerarquía HTML:** La etiqueta `<h1>` solo debe contener una keyword de Nivel 1 correspondiente. Los encabezados `<h2>` deben atacar variaciones semánticas o problemas específicos (ej. "Control de peso en la menopausia").

## 3. Verificación de Metadatos (Next.js Metadata API)

Cada vez que generes o evalúes una página, el objeto `metadata` debe obligatoriamente:
- Incluir la **keyword principal** del nivel correspondiente en el `title`.
- Tener una `description` atractiva que incite al click (CTR) **sin mencionar el fármaco prohibido** ni romper la regla de compliance.
- Configurar rutas canónicas `alternates: { canonical: '...' }` para evitar contenido duplicado entre páginas tipo landing page de nicho.
- Optimizar explícitamente contenido rico a través de las propiedades de OpenGraph.

## 4. Structured Data (JSON-LD)
- Inyectar JSON-LD dinámicamente utilizando los schemas formales aplicables (`@type: "MedicalBusiness"`, `"MedicalClinic"`, o `"MedicalProcedure"`).

## 5. Protocolo de Ejecución MCP
Si una tarea requiere interacción con Google, el agente debe:
1. Listar las herramientas disponibles en el servidor de Stitch.
2. Ejecutar la acción.
3. Confirmar al usuario proporcionando la URL del recurso creado o revisado en Google.
