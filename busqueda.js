// Obtener los elementos de las secciones
const courses = document.querySelectorAll('#courses p');
const tutorials = document.querySelectorAll('#tutorials p');
const manuals = document.querySelectorAll('#manuals p');

// Función para filtrar los elementos
function filterContent(e) {
  // Obtener el valor de la entrada del usuario
  const searchValue = e.target.value.toLowerCase();

  // Filtrar los elementos en cada sección
  courses.forEach(course => {
    if (course.textContent.toLowerCase().includes(searchValue)) {
      course.style.display = 'block';
    } else {
      course.style.display = 'none';
    }
  });

  tutorials.forEach(tutorial => {
    if (tutorial.textContent.toLowerCase().includes(searchValue)) {
      tutorial.style.display = 'block';
    } else {
      tutorial.style.display = 'none';
    }
  });

  manuals.forEach(manual => {
    if (manual.textContent.toLowerCase().includes(searchValue)) {
      manual.style.display = 'block';
    } else {
      manual.style.display = 'none';
    }
  });
}

// Añadir el evento de escucha al elemento de entrada de búsqueda
const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener('input', filterContent);
