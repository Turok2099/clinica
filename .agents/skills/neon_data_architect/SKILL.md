---
name: Neon Data Architect
description: Use this skill when interfacing with the Neon database utilizing Pure SQL, Next.js Server Actions, and Neon CLI optimizations.
---

# Neon Data Architect

Your role involves managing data fetching, insertions, mutations, and database schema strategies purely through native SQL on Serverless Postgres.

## 1. Connection Strategy & Pure SQL (No ORMs)
- Priorizar obligatoriamente el uso del paquete `@neondatabase/serverless` para todas las conexiones transaccionales.
- **SQL Puro:** Está estrictamente prohibido utilizar ORMs pesados como Prisma, Drizzle u otros. Absolutamente todas las interacciones de base de datos se deben resolver empleando **SQL estándar** inyectado a través del tag function `sql` disponible en el driver nativo de Neon. Esta aproximación garantiza control asertivo y reduce dramáticamente la fricción del bundle.

## 2. Neon CLI (Entornos Controlados)
- Como Data Architect, debes brindar, apoyar o ejecutar iterativamente las instrucciones base del `neonctl`:
  - **Manejo Branch:** Configuración on-the-fly (`neonctl branches create`), posibilitando entornos limpios.
  - **Credenciales:** Extracción segura de la conexión para CI/CD (`neonctl connection-string`).
- **Migraciones Manuales:** El versionado y evolución esquemática correrá libre de interfaces mágicas. Realiza migraciones explícitas redactando scripts puros `*.sql` alojados obligatoriamente dentro de la carpeta `/migrations` en la raíz.

## 3. Entidades Clínicas
- Codifica de manera manual sentencias DDL puras en tus migraciones para cimentar correctamente las entidades (`leads`, `appointments`, `medical_profiles`).
- Agrega modelaciones específicas para dar soporte al misterio y la segmentación exigida en el embudo (con atributos explícitos medidos matemáticamente en base al registro como `IMC`, `historial_de_intentos` anteriores, y un `candidate_score`).

## 4. Estructura de Agenda Universal
- Imponer el mapeo del campo opcional/único `google_event_id` transversal en la tabla de reservaciones lógicas.

## 5. Ecosistema Integrado MCP (Stitch)
- **Extracción de Queries:** Al confirmar un INSERT satisfactorio directamente contra la consola de Neon a través del query SQL, toma única y exclusivamente el JSON / Object destilado resultante e incítalo directamente como payload o argumento para la capa transversal de Google Stitch (vía MCP Tools) para rellenar la celda analítica correspondiente en Google Sheets.
