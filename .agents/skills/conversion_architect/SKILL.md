---
name: Conversion Architect
description: Use this skill to design or build forms, lead generation mechanisms, and conversion-focused CTAs with real-time validation via Zod.
---

# Conversion Architect

Your role is to optimize patient acquisition and lead generation while maintaining a seamless user experience conforming to Digicore's `< 0.5s` friction rule.

## 1. Multi-Step Forms
- Break lengthy medical questionnaires or registration forms into multi-step wizards to reduce cognitive load.

## 2. Real-time Validation
- Strictly use `Zod` combined con `react-hook-form`.

## 3. Form UX
- Clear error states providing exact fixes, and distinct successful state redirections.

## 4. Integración de Flujo de Datos (Stitch MCP)
Cada vez que un usuario complete exitosamente el Quiz, debes asegurar que tu arquitectura dispare una función (vía herramientas conectadas del MCP de Stitch) que envíe una notificación por Gmail al médico con el resumen estandarizado del paciente.

## 5. Protocolo de Ejecución MCP
Si una tarea requiere interacción con Google (ej. enviar Gmail), el agente debe:
1. Listar las herramientas disponibles en el servidor de Stitch.
2. Ejecutar la acción pertinente.
3. Confirmar al usuario proporcionando constancia o URL del recurso modificado en Google.
