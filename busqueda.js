// Obtener los elementos de las secciones
const courses = document.querySelectorAll('#courses p');
const tutorials = document.querySelectorAll('#tutorials p');
const manuals = document.querySelectorAll('#manuals p');

// Función para filtrar los elementos de una sección y ocultar la sección si no hay coincidencias
function filterSection(items, sectionId, searchValue) {
  let anyVisible = false;
  items.forEach(item => {
    if (item.textContent.toLowerCase().includes(searchValue)) {
      item.style.display = 'block';
      anyVisible = true;
    } else {
      item.style.display = 'none';
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
