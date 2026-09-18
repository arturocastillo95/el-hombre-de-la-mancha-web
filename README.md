# El Hombre de la Mancha — sitio web

Sitio estático con una portada de enlaces y un programa digital del elenco.

## Desarrollo local

Requiere Node.js 20.19 o una versión posterior.

```bash
npm install
npm run dev
```

## Compilación

```bash
npm run build
```

El resultado se genera en `dist/`.

## Publicar en Netlify

El repositorio ya incluye `netlify.toml`. Al conectar el proyecto en Netlify se usarán automáticamente:

- Comando de compilación: `npm run build`
- Carpeta de publicación: `dist`

Para publicar manualmente, ejecuta `npm run build` y arrastra la carpeta `dist` completa a la zona de despliegue manual de Netlify.

## Actualizar contenido

Los enlaces y todo el reparto están centralizados en `src/data.js`. Instagram permanecerá oculto mientras su campo `url` esté vacío. Las fotografías optimizadas están en `public/assets/cast/`.
