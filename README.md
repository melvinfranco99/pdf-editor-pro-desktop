# PDF Editor Pro (escritorio)

Versión de escritorio (Electron) del editor de PDFs. Mismo motor que la versión web
([pdf-editor-pro](https://github.com/melvinfranco99/pdf-editor-pro) / 
[demo en GitHub Pages](https://melvinfranco99.github.io/pdf-editor-pro/)), pero como
aplicación nativa: funciona sin conexión, con menú propio y acceso desde el lanzador de
aplicaciones de tu sistema. Todo tu PDF se procesa en tu ordenador; nada se sube a ningún
servidor.

## Herramientas incluidas

- Subir, unir, reordenar y eliminar páginas de varios PDFs.
- Escribir texto: mover, redimensionar y ajustar grosor/transparencia en cualquier momento.
- Dibujar y resaltar a mano alzada, en cualquier color, con transparencia ajustable.
- Resaltado recto asistido: clic mantenido + Ctrl+flecha traza una línea recta y calmada.
- Goma de borrar con "intensidad" (borrado progresivo o instantáneo).
- Firmas: dibuja la tuya o genera una automáticamente con tu nombre en varias tipografías
  manuscritas; se guardan en tu equipo y se insertan, mueven y redimensionan como el texto.
- Deshacer/rehacer (Ctrl+Z / Ctrl+Y) y exportación a un PDF nuevo.
- Menú nativo (Archivo, Edición, Ver, Ayuda) con atajos de teclado.

## Instalación (Linux)

1. Ve a [Releases](https://github.com/melvinfranco99/pdf-editor-pro-desktop/releases) y
   descarga el `.AppImage` más reciente.
2. Dale permisos de ejecución:
   ```
   chmod +x "PDF Editor Pro-*.AppImage"
   ```
3. Ejecútalo directamente, o instálalo en tu menú de aplicaciones:
   ```
   mkdir -p ~/.local/opt/pdf-editor-pro ~/.local/share/applications ~/.local/share/icons/hicolor/512x512/apps
   mv "PDF Editor Pro-"*.AppImage ~/.local/opt/pdf-editor-pro/PDF-Editor-Pro.AppImage
   chmod +x ~/.local/opt/pdf-editor-pro/PDF-Editor-Pro.AppImage
   ```
   No requiere `sudo` ni modifica el gestor de paquetes del sistema: todo vive dentro de tu
   carpeta de usuario y se puede desinstalar borrando esos archivos.

## Desarrollo

```
npm install
npm start        # ejecutar en modo desarrollo
npm run dist      # generar el instalador (.AppImage) en dist/
```

El renderer (`renderer/`) usa pdf.js y pdf-lib empaquetados localmente (sin CDN), así que
la app funciona completamente sin conexión a internet, salvo las tipografías de firma
automática (Google Fonts), que se degradan a una fuente manuscrita genérica si no hay red.
