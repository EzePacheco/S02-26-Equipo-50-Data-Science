// store.validator.js
// Capa de interfaz: Esquemas de validación de peticiones HTTP para Store
// Usa Zod v4 para validar los datos entrantes en los endpoints

import { z } from 'zod';

/**
 * Esquema para crear una tienda durante el onboarding
 * - name: Nombre de la tienda (requerido, mínimo 1 caracter, máximo 100)
 * - category: Categoría seleccionada por el usuario (ROPA o CALZADO)
 * 
 * Nota: El userId generalmente viene del token JWT o del contexto de autenticación,
 * no del body de la petición
 */
export const createStoreSchema = z.object({
  name: z.string()
    .min(1, 'El nombre de la tienda es requerido')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  category: z.enum(['ROPA', 'CALZADO'], {
    message: 'La categoría debe ser ROPA o CALZADO',
  }),
});

/**
 * Esquema para obtener la tienda de un usuario
 * - userId: UUID del usuario (generalmente viene de req.params)
 */
export const getStoreByUserSchema = z.object({
  userId: z.string().uuid('El ID de usuario debe ser un UUID válido'),
});

export default {
  createStoreSchema,
  getStoreByUserSchema,
};
