# Respuestas a las preguntas de la entrega

## Pregunta 1 (Parte 2: Filtros en la URL)
*¿Por qué `changeFilter` hace una copia con `new URLSearchParams(searchParams)` en vez de cambiar `searchParams` directamente?*

**Respuesta:** En React, el estado es inmutable. `searchParams` representa el estado actual de los parámetros de búsqueda de la URL. Si lo mutáramos directamente, React no detectaría el cambio de referencia, evitando que se dispare el re-renderizado de los componentes suscritos y rompiendo el flujo unidireccional de datos. Al crear una nueva instancia con `new URLSearchParams(searchParams)`, modificamos la copia y luego actualizamos el estado mediante `setSearchParams(next)`.

## Pregunta 2 (Parte 4: Ofertas y actualización de datos)
*`OfferForm` y `OfferList` son hermanos y no se pasan nada. ¿Cómo se entera la lista de que hay una oferta nueva?*

**Respuesta:** Gracias al sistema de etiquetas (tags) y caché de RTK Query. `useGetOffersQuery` provee la etiqueta `"Offer"` (`providesTags: ["Offer"]`). Cuando `OfferForm` ejecuta la mutación `useCreateOfferMutation`, esta invalida la misma etiqueta (`invalidatesTags: ["Offer"]`). RTK Query detecta automáticamente la invalidación y refresca todas las queries activas suscritas a esa etiqueta, re-ejecutando la petición y actualizando `OfferList` sin necesidad de pasar props ni estados locales entre hermanos.

## Pregunta 3 (Parte 5: Contexto de usuario y re-renderizado)
*¿Qué cambia en la ficha? La ficha no recibe el usuario por props: ¿cómo se entera de que ha cambiado? ¿Se vuelve a pedir el anuncio a la API?*

**Respuesta:** En la ficha cambia el panel lateral: si el usuario activo es el vendedor del anuncio, se muestra el formulario de gestión `SellerPanel` (cambiar precio y borrar); si no es el vendedor y el anuncio está disponible, se muestra el formulario para ofertar `OfferForm`. La ficha se entera porque está suscrita a `CurrentUserContext` mediante el hook `useCurrentUser()`; cuando el contexto actualiza su valor, React re-renderiza todos los componentes consumidores. No se vuelve a pedir el anuncio a la API porque los datos del anuncio no han cambiado y RTK Query mantiene su respuesta en caché.

## Pregunta 4 (Parte 6: CORS en Express)
*¿Por qué hacen falta `PATCH` y `DELETE` en la lista y `Content-Type` en las cabeceras? ¿Qué petición de tu web fallaría sin cada uno?*

**Respuesta:** El navegador realiza peticiones preflight (`OPTIONS`) antes de peticiones HTTP no simples. Si `PATCH` o `DELETE` no estuvieran explícitamente permitidos en `Access-Control-Allow-Methods`, el navegador bloquearía la petición para cambiar el precio (`PATCH /api/listings/:id`) y para borrar el anuncio (`DELETE /api/listings/:id`). Por su parte, `Content-Type` es necesario en `Access-Control-Allow-Headers` porque las peticiones `POST` y `PATCH` envían un payload en formato JSON (`Content-Type: application/json`), lo cual requiere autorización CORS explícita; sin él, fallarían la creación de ofertas (`POST /api/offers`), la publicación de anuncios (`POST /api/listings`) y la actualización de precio.

## Pregunta 5 (Parte 6: Visitas en MongoDB y caché de RTK Query)
*Con tu API, entra en el Seat Ibiza y apunta las visitas. Vuelve al listado y entra otra vez. Ahora recarga. ¿Por qué al volver a la ficha no suben y al recargar sí?*

**Respuesta:** Al volver a entrar a la ficha navegando dentro de la SPA con React Router, el componente `ListingDetailPage` consulta `useGetListingQuery(id)`. Como los datos del anuncio ya se encuentran en la caché de RTK Query y no han expirado ni han sido invalidados, RTK Query devuelve inmediatamente la respuesta en caché sin emitir una nueva petición HTTP a la API. Al recargar la página completamente con F5, la aplicación React se reinicia, la memoria y la caché de RTK Query se vacían y el navegador lanza una petición HTTP real `GET /api/listings/:id`, lo cual ejecuta en Express el operador `$inc: { views: 1 }` en MongoDB, incrementando el contador de visitas.

## Diario de errores (Parte 6)

| # | Error / Síntoma | Causa detectada | Solución aplicada |
|---|---|---|---|
| 1 | *Pendiente de completar en Parte 6* | | |
| 2 | *Pendiente de completar en Parte 6* | | |
| 3 | *Pendiente de completar en Parte 6* | | |
| 4 | *Pendiente de completar en Parte 6* | | |
