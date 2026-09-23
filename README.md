# GymIA PRO

Pantalla inicial de planes y precios.

Para activar pagos reales:
1. Crear productos en Stripe.
2. Crear precio mensual y anual.
3. Guardar los Price IDs como variables de entorno del servidor.
4. Crear un endpoint de checkout.
5. Añadir webhook para confirmar suscripciones.
6. Guardar el estado `free/pro` del usuario en Supabase.

No introduzcas claves secretas en el navegador.
