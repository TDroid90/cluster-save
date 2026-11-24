# Contenido editable de la landing

La web conserva sus secciones y su diseño. El cliente edita únicamente valores en la Google Sheet: textos, servicios, precios, proceso, preguntas, imágenes, colores, menú y redes. No necesita tocar código para esos cambios.

## ClusterSave actual

- Planilla: https://docs.google.com/spreadsheets/d/1w95JbedkogmhS2ioKmuuftZ7Uej0cUtdrbhUxn4tOEg/edit
- Script vinculado: https://script.google.com/u/0/home/projects/1hLoymRokzUaS72hc2_D4m6xl1zweiaLVrvTJW42biwWwckBGjQdg0KaF/edit
- Web app: https://script.google.com/macros/s/AKfycbyLPqYDGVTVZ6Glp39AmTly25VDv4_uKI7v-0x0TNkFmyH8EAoo6VrPbl5XdiV0x3k2pw/exec
- Vista previa actual: https://cluster-save-3xh2e93dd-smalbonio-gmailcoms-projects.vercel.app (puede requerir iniciar sesion en Vercel)

## Uso cotidiano

1. Cambiar solo la columna `valor` en `Textos`, `Imagenes`, `Colores` y `Redes`, o el texto de las tablas de listas. No renombrar claves, columnas ni solapas.
2. Revisar en un despliegue **Preview** de Vercel. Preview lee la planilla editable; Production lee la publicación guardada.
3. En la planilla, `Sitio web > Publicar cambios`. El contenido se guarda como un único bloque; la caché de Vercel puede demorar alrededor de un minuto.
4. Al entregar la web, revisar Preview y elegir `Sitio web > Fijar punto 0 desde vista previa`. No se fija automáticamente.
5. `Sitio web > Restaurar punto 0 en produccion` reemplaza de una vez el bloque publicado. No cambia las solapas editables, el código ni el despliegue de Vercel.

Las imágenes nuevas se suben a Drive, se comparten como `Cualquier usuario que tenga el vínculo > Lector` y su enlace se pega en `Imagenes`. La resolución de referencia está a la derecha. El servidor sirve la imagen desde Drive, sin Blob.

## Copiar para otro cliente

1. Duplicar este repositorio y la planilla `dashboard-template.xlsx` en la nueva cuenta de Google, convirtiéndola a Google Sheets. Editar sus contenidos y subir imágenes nuevas a su Drive.
2. Abrir la planilla nueva: `Extensiones > Apps Script`. Reemplazar `Código.gs` con [Code.gs](apps-script/Code.gs), guardar y crear una implementación de tipo `App web`, ejecutada como propietario, con acceso `Cualquiera`. Copiar la URL `/exec`.
3. Crear proyecto Vercel desde el repositorio nuevo y agregar `CONTENT_WEB_APP_URL` con esa URL en **Production y Preview**. Desplegar.
4. Revisar Preview, publicar el contenido desde la planilla y fijar el punto 0 únicamente cuando se entregue.

No es literalmente un proceso de dos clics: Google pide autorizar Apps Script y Vercel requiere vincular el repositorio y cargar una variable. Después de esa configuración inicial, el cliente cambia contenido en la planilla sin volver a desplegar.

Al duplicar para otra marca, cambiar también `index.html` (título y metadatos sociales estáticos) antes del primer despliegue. El título del navegador, la descripción y el favicon sí se actualizan desde la planilla cuando carga la web, pero las vistas previas de redes sociales no ejecutan JavaScript.

## Alcance

El punto 0 guarda **contenido** (incluidas URLs de imágenes y colores). Para volver también al código de una fecha, se necesita revertir el commit o deployment correspondiente en GitHub/Vercel; Apps Script no puede restaurar código ni configuraciones de Vercel. La planilla es privada; la app web expone solo el contenido visible de la landing y la vista previa. No guardar contraseñas, API keys ni información privada en estas solapas.
