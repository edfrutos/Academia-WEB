// Obtener los elementos de las secciones
const courses = document.querySelectorAll('#courses li');
const tutorials = document.querySelectorAll('#tutorials li');
const manuals = document.querySelectorAll('#manuals li');

// Escapar texto para insertarlo de forma segura como HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Normalizar a minúsculas y sin acentos (insensible a mayúsculas y diacríticos)
function normalizeText(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Versión normalizada de un texto junto con el mapeo posición→índice original,
// para poder localizar coincidencias sin acentos y resaltarlas en el texto real.
function normalizeWithMap(text) {
  let normalized = '';
  const map = [];
  for (let i = 0; i < text.length; i++) {
    const part = normalizeText(text[i]);
    for (let j = 0; j < part.length; j++) {
      normalized += part[j];
      map.push(i);
    }
  }
  return { normalized, map };
}

// Resaltar todas las coincidencias del término dentro de un elemento.
// Parte siempre del texto plano (textContent) para no acumular marcas previas.
function highlight(item, searchValue) {
  const text = item.textContent;
  const { normalized, map } = normalizeWithMap(text);
  if (searchValue === '' || !normalized.includes(searchValue)) {
    item.textContent = text;
    return;
  }
  let html = '';
  let cursor = 0;
  let i = 0;
  while (i < normalized.length) {
    const idx = normalized.indexOf(searchValue, i);
    if (idx === -1) break;
    const origStart = map[idx];
    const origEnd = map[idx + searchValue.length - 1] + 1;
    html += escapeHtml(text.slice(cursor, origStart));
    html += '<mark>' + escapeHtml(text.slice(origStart, origEnd)) + '</mark>';
    cursor = origEnd;
    i = idx + searchValue.length;
  }
  html += escapeHtml(text.slice(cursor));
  item.innerHTML = html;
}

// Función para filtrar los elementos de una sección y ocultar la sección si no hay coincidencias
function filterSection(items, sectionId, searchValue) {
  let anyVisible = false;
  items.forEach(item => {
    if (normalizeText(item.textContent).includes(searchValue)) {
      item.style.display = '';
      highlight(item, searchValue);
      anyVisible = true;
    } else {
      item.style.display = 'none';
      highlight(item, '');
    }
  });
  document.getElementById(sectionId).style.display = anyVisible || searchValue === '' ? 'block' : 'none';
}

// Función para filtrar los elementos
function filterContent(e) {
  // Obtener el valor de la entrada del usuario, normalizado
  const searchValue = normalizeText(e.target.value);

  // Filtrar los elementos en cada sección
  filterSection(courses, 'courses', searchValue);
  filterSection(tutorials, 'tutorials', searchValue);
  filterSection(manuals, 'manuals', searchValue);
}

// Añadir el evento de escucha al elemento de entrada de búsqueda
const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener('input', filterContent);
