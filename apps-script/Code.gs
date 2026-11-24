// Bind this script to the editable Google Sheet. The visible tabs are the only draft source.
const KEY_TABS = {
  general: 'Textos', images: 'Imagenes', theme: 'Colores', social: 'Redes',
};
const LIST_TABS = {
  nav: 'Menu', heroPoints: 'Puntos', highlights: 'Destacados',
  services: 'Servicios', prices: 'Precios', businessItems: 'Empresas',
  process: 'Proceso', benefits: 'Beneficios', faqs: 'FAQ',
};

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Sitio web')
    .addItem('Publicar cambios', 'publishSite')
    .addItem('Fijar punto 0 desde la vista previa', 'setPointZero')
    .addItem('Restaurar punto 0 en produccion', 'restorePointZero')
    .addToUi();
}

function getRows_(name) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(name);
  if (!sheet) throw new Error('Falta la solapa ' + name);
  const values = sheet.getDataRange().getDisplayValues();
  const headers = values.shift();
  return values.filter(row => row[0] !== '').map(row =>
    Object.fromEntries(headers.map((header, index) => [header, row[index] || ''])));
}

function draft_() {
  const content = {};
  Object.keys(KEY_TABS).forEach(key => {
    content[key] = {};
    getRows_(KEY_TABS[key]).forEach(row => { content[key][row.clave] = row.valor; });
  });
  Object.keys(LIST_TABS).forEach(key => {
    const rows = getRows_(LIST_TABS[key]);
    content[key] = rows.map(row => {
      const { orden, ...item } = row;
      return ['heroPoints', 'highlights', 'businessItems'].includes(key) ? item.valor : item;
    });
  });
  return content;
}

function stateSheet_() {
  return SpreadsheetApp.getActive().getSheetByName('Estado');
}

function publishSite() {
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    const content = draft_();
    stateSheet_().getRange('B2').setValue(JSON.stringify(content));
    stateSheet_().getRange('B4').setValue(new Date());
    SpreadsheetApp.getUi().alert('Publicado. La web puede tardar hasta un minuto en actualizarse.');
  } finally { lock.releaseLock(); }
}

function setPointZero() {
  const ui = SpreadsheetApp.getUi();
  if (ui.alert('Fijar punto 0', 'Se guardara el contenido actual de la vista previa como punto 0. ¿Continuar?', ui.ButtonSet.YES_NO) !== ui.Button.YES) return;
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    stateSheet_().getRange('B3').setValue(JSON.stringify(draft_()));
    stateSheet_().getRange('B5').setValue(new Date());
    ui.alert('Punto 0 fijado. No modifica produccion.');
  } finally { lock.releaseLock(); }
}

function restorePointZero() {
  const ui = SpreadsheetApp.getUi();
  const state = stateSheet_();
  const snapshot = state.getRange('B3').getValue();
  if (!snapshot) return ui.alert('Primero fija un punto 0.');
  if (ui.alert('Restaurar produccion', 'Esto reemplazara el contenido publicado por el punto 0. No cambia las solapas editables. ¿Continuar?', ui.ButtonSet.YES_NO) !== ui.Button.YES) return;
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    JSON.parse(snapshot);
    state.getRange('B2').setValue(snapshot);
    state.getRange('B4').setValue(new Date());
    ui.alert('Produccion restaurada al punto 0.');
  } finally { lock.releaseLock(); }
}

function doGet(e) {
  try {
    const mode = e && e.parameter && e.parameter.mode;
    const value = mode === 'preview' ? draft_() : JSON.parse(stateSheet_().getRange('B2').getValue() || '{}');
    return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: String(error) })).setMimeType(ContentService.MimeType.JSON);
  }
}
