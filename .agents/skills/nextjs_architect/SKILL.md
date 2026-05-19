---
name: Next.js Architect
description: Use this skill to govern the technical architecture, component structure, edge optimizations, and Pure SQL fetching in Next.js + Neon.
---

# Next.js Architect

As the Next.js Architect, you define and enforce the technical structure and best practices for the clinical web project. You must completely avoid heavy ORMs and rely structurally on Pure SQL native capabilities for ultra-light boundaries.

## 1. Arquitectura Exclusiva Server/Edge
- **Server Components:** Utilízalos por defecto para ocultar la lectura segura y evitar hidratación extra en el frontend. Consagra el enfoque de lectura rápida por sobre las librerías cliente en todo componente puramente visual.
- **Client Estricto:** Relega el hookeo reactivo a las partes finales (formularios interactivos locales).

## 2. Server Actions y Data Fetching Nativo
- **Lecturas Directas:** Ejecuta las resoluciones de datos transaccionales (`SELECT`) construidas bajo SQL puro (`sql` template de Neon) de forma **directa** en el entorno de Server Components per-route, sin pasar por endpoints transitorios de API.
- **Mutaciones Seguras:** Aquellos embudos transaccionales (e.g. el Quiz de Calificación) obligatoriamente instanciarán `"use server"` empleando la query SQL nativa manual de inserción. Mantén la seguridad rigurosa empleando tipados Typescript definidos intencional y localmente sobre el payload inyectado.

## 3. Aceleración Edge Runtime
- Todo aquel archivo conector y nodo root (como validación de registro o procesamiento vital interactable del Quiz de captación) que implique concurrencia masiva con Neon, deberá estar coronado con el flag `export const runtime = 'edge'`. Esto habilitará interacciones full HTTP exentas de la sobrecarga Node, propulsando las velocidades a mínimos latentes.

## 4. Resincronización Local Caching
- Integración contundente de hooks de revalidación base tras resoluciones en bloque (`revalidatePath` / `revalidateTag`), asegurando "Time-Travel Data Freshness" en la interfaz sin emitirse re-peticiones del cliente.

## 5. Rendimiento en LCP (Streaming Integrado)
- Empaque por prioridades usando utilerías de hidratación ligeras nativas de Next (`next/image`, `next/font`).
- Encapsula llamados costosos de SQL nativo en etiquetas subagrupadas `<Suspense fallback={<EsqueletoGenerico />} />`.

## 6. Sincronía Transversal MCP (Google Stitch Setup)
- Una vez finalizada la confirmación de inyección nativa del payload del Lead contra Neon (a nivel Server Action), debes invocar el ecosistema transversal del repositorio a través de Stitch MCP para impactar la planilla "Control Leads Clinical" de **Google Sheets**.
- **Regla Estricta:** Durante el envío, proporciona única y concisamente el objeto `JSON` del resultado que devuelve el driver nativo sin reempaquetamientos residuales. Reclama y confirma siempre el URL linkeable del Spreadhseet resultante ante el contexto del usuario.
