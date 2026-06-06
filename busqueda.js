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

// Resaltar todas las coincidencias del término dentro de un elemento.
// Parte siempre del texto plano (textContent) para no acumular marcas previas.
function highlight(item, searchValue) {
  const text = item.textContent;
  if (searchValue === '' || !text.toLowerCase().includes(searchValue)) {
    item.textContent = text;
    return;
  }
  const lower = text.toLowerCase();
  let html = '';
  let i = 0;
  while (i < text.length) {
    const idx = lower.indexOf(searchValue, i);
    if (idx === -1) {
      html += escapeHtml(text.slice(i));
      break;
    }
    html += escapeHtml(text.slice(i, idx));
    html += '<mark>' + escapeHtml(text.slice(idx, idx + searchValue.length)) + '</mark>';
    i = idx + searchValue.length;
  }
  item.innerHTML = html;
}

// Función para filtrar los elementos de una sección y ocultar la sección si no hay coincidencias
function filterSection(items, sectionId, searchValue) {
  let anyVisible = false;
  items.forEach(item => {
    if (item.textContent.toLowerCase().includes(searchValue)) {
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
  // Obtener el valor de la entrada del usuario
  const searchValue = e.target.value.toLowerCase();

  // Filtrar los elementos en cada sección
  filterSection(courses, 'courses', searchValue);
  filterSection(tutorials, 'tutorials', searchValue);
  filterSection(manuals, 'manuals', searchValue);
}

// Añadir el evento de escucha al elemento de entrada de búsqueda
const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener('input', filterContent);
