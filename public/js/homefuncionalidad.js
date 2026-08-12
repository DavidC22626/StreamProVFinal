// ============================================
// VARIABLES GLOBALES
// ============================================
let allSeries = [];
let currentSerieId = null;
let currentSeasonId = null;
let allSeasons = [];
let allEpisodes = [];
var allMovies = [];
var movieIdCounter = 1;
let allSeriesForPlayer = [];
let currentSerieForPlayer = null;
let currentSeasonForPlayer = null;
let allSeasonsForPlayer = [];
let allEpisodesForPlayer = [];
let currentEpisodeIndex = 0;

var categoryNames = {
  row1: "Tendencias ahora",
  row2: "Top 10",
  row3: "Acción",
  row4: "Comedia",
  row5: "Documentales",
};

console.log("Datos de sesión cargados:", window.sessionData);

if (window.sessionData.tipo == "usuarios") {
  console.log("si es igual la tabla");
  document.getElementById("btnAdmin").style.display = "none";
  document.getElementById("menuSuscripcion").style.display = "block";
  
  verificarSuscripcion();
}

function verificarSuscripcion() {
  fetch('/verificar-suscripcion')
    .then(res => res.json())
    .then(data => {
      const menu = document.getElementById('menuSuscripcion');
      if (data.activa) {
        menu.innerHTML = '<a href="#" onclick="showSection(\'home\', event)">Premium ✓</a>';
        menu.style.color = '#4ade80';
      }
    })
    .catch(err => console.error('Error verificando suscripción:', err));
}

function irASuscripcion(event) {
  if (event) event.preventDefault();
  window.location.href = "/suscripcion";
}

//Menu desplegable
document.addEventListener("DOMContentLoaded", () => {
  const btnAdmin = document.getElementById("btnAdmin");
  const dropdown = btnAdmin.parentElement; // div.dropdown

  // Abrir / cerrar menú
  btnAdmin.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });

  // Detectar clicks en las opciones
  document.querySelectorAll(".admin-option").forEach((option) => {
    option.addEventListener("click", (event) => {
      const section = event.target.dataset.section;
      //cambiar sección o cargar contenido
      console.log(section);
      showSection(section);

      // Cerrar el menú después del click
      dropdown.classList.remove("show");
    });
  });

  // Cerrar si hace clic fuera
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });
});

// Obtener las peliculas de la base de datos
function getMovies() {
  fetch("/api/peliculas")
    .then(function (response) {
      return response.json();
    })
    .then(function (resultado) {
      if (resultado.exito) {
        allMovies = [];
        allMovies = resultado.peliculas;
        renderMovies();
        renderAdminTable();
      } else {
        console.log("Error: " + resultado.error);
      }
    })
    .catch(function (error) {
      console.log("Error al cargar las peliculas: " + error);
    });
}

//Seleccionar el item de la navegacion
function showSection(section, event) {
  var navLinks = document.querySelectorAll(".nav-links a");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");
  }
  if (section === "peliculas") {
    document.getElementById("homeSection").style.display = "none";
    document.getElementById("seriesSection").classList.remove("active");
    document.getElementById("adminSection").classList.add("active");
    document.getElementById("btnAdmin").classList.add("active");
    getMovies();
    //renderAdminTable();
  } else if (section === "series") {
    document.getElementById("homeSection").style.display = "none";
    document.getElementById("adminSection").classList.remove("active");
    document.getElementById("seriesSection").classList.add("active");
    document.getElementById("btnAdmin").classList.add("active");
  } else if (section === "catPeliculas") {
    document.getElementById("homeSection").style.display = "none";
    document.getElementById("adminSection").classList.remove("active");
    document.getElementById("seriesSection").classList.remove("active");
    document.getElementById("catalogMovies").style.display = "none";
    document.getElementById("catalogSeries").style.display = "none";
    document.querySelectorAll(".nav-links a")[2].classList.add("active");
    document.getElementById("catalogMovies").style.display = "block";
    loadCatalog('movies');
  } else if (section === "catSeries") {
    document.getElementById("homeSection").style.display = "none";
    document.getElementById("adminSection").classList.remove("active");
    document.getElementById("seriesSection").classList.remove("active");
    document.getElementById("catalogMovies").style.display = "none";
    document.getElementById("catalogSeries").style.display = "none";
    document.querySelectorAll(".nav-links a")[1].classList.add("active");
    document.getElementById("catalogSeries").style.display = "block";
    loadCatalog('series');
  } else {
    document.getElementById("catalogMovies").style.display = "none";
    document.getElementById("catalogSeries").style.display = "none";
    document.getElementById("homeSection").style.display = "block";
    document.getElementById("adminSection").classList.remove("active");
    document.getElementById("seriesSection").classList.remove("active");
    document.getElementById("catalogMovies").classList.remove("active");
    document.getElementById("catalogSeries").classList.remove("active");
    document.querySelectorAll(".nav-links a")[0].classList.add("active");
    document.getElementById("btnAdmin").classList.remove("active");
  }
}

// ============================================
// CATÁLOGOS DE PELÍCULAS Y SERIES
// ============================================

let allMoviesCatalog = [];
let allSeriesCatalog = [];

// ============================================
// FUNCIÓN GENÉRICA PARA CARGAR CATÁLOGOS
// ============================================

function loadCatalog(type) {
    const url = type === 'movies' ? '/api/peliculas' : '/api/series';

    fetch(url)
        .then(response => response.json())
        .then(resultado => {
            if (resultado.exito) {
                if (type === 'movies') {
                    allMoviesCatalog = resultado.peliculas;
                    renderCatalog('movies', allMoviesCatalog);
                    setupCatalogFilters('movies');
                } else {
                    allSeriesCatalog = resultado.series;
                    renderCatalog('series', allSeriesCatalog);
                    setupCatalogFilters('series');
                }
            } else {
                console.log("Error: " + resultado.error);
            }
        })
        .catch(error => console.log("Error al cargar catálogo: " + error));
}

// ============================================
// FUNCIÓN GENÉRICA PARA RENDERIZAR
// ============================================

function renderCatalog(type, items) {
    const gridId = type === 'movies' ? 'moviesCatalogGrid' : 'seriesCatalogGrid';
    const emptyId = type === 'movies' ? 'moviesCatalogEmpty' : 'seriesCatalogEmpty';
    const grid = document.getElementById(gridId);
    const empty = document.getElementById(emptyId);

    if (items.length === 0) {
        grid.innerHTML = '';
        empty.style.display = 'flex';
        return;
    }

    empty.style.display = 'none';
    grid.innerHTML = '';

    items.forEach(item => {
        const isMovie = type === 'movies';
        const title = isMovie ? item.titulo_pel : item.titulo_serie;
        const image = isMovie ? item.ruta_img_pel : item.ruta_img_ser;
        const id = item.cod_serie;
        

        const card = document.createElement('div');
        card.className = 'catalog-card';
        
        let playButton = isMovie 
            ? `<button class="catalog-action-btn play" onclick="playVideo('${title}')">▶</button>`
            : `<button class="catalog-action-btn play" onclick="openSeriesPlayer(${id})">▶</button>`;

        card.innerHTML = `
            <img src="${image}" alt="${title}" class="catalog-image">
            <div class="catalog-card-overlay">
                <div class="catalog-card-title">${title}</div>
                <div class="catalog-card-actions">
                    ${playButton}
                    <button class="catalog-action-btn add">+</button>
                    <button class="catalog-action-btn info" onclick="openModal('${title}')">ℹ</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ============================================
// FUNCIÓN GENÉRICA PARA FILTROS
// ============================================

function setupCatalogFilters(type) {
    const searchId = type === 'movies' ? 'moviesSearchCatalog' : 'seriesSearchCatalog';
    const filterId = type === 'movies' ? 'moviesFilterCatalog' : 'seriesFilterCatalog';
    
    const searchInput = document.getElementById(searchId);
    const filterSelect = document.getElementById(filterId);

    searchInput.removeEventListener('input', () => filterCatalog(type));
    filterSelect.removeEventListener('change', () => filterCatalog(type));

    searchInput.addEventListener('input', () => filterCatalog(type));
    filterSelect.addEventListener('change', () => filterCatalog(type));
}

function filterCatalog(type) {
    const searchId = type === 'movies' ? 'moviesSearchCatalog' : 'seriesSearchCatalog';
    const filterId = type === 'movies' ? 'moviesFilterCatalog' : 'seriesFilterCatalog';
    const allData = type === 'movies' ? allMoviesCatalog : allSeriesCatalog;

    const searchValue = document.getElementById(searchId).value.toLowerCase();
    const filterValue = document.getElementById(filterId).value;

    let filtered = allData.filter(item => {
        const isMovie = type === 'movies';
        const title = isMovie ? item.titulo_pel : item.titulo_serie;
        const description = isMovie ? item.descrip_pel : item.descrip_serie;
        const category = isMovie ? item.clasifi_pel : item.clasifi_serie;

        const matchSearch = title.toLowerCase().includes(searchValue) ||
                           (description && description.toLowerCase().includes(searchValue));
        const matchFilter = filterValue === '' || category === filterValue;
        
        return matchSearch && matchFilter;
    });

    renderCatalog(type, filtered);
}

//Renderizar las tarjetas de las peliculas
function renderMovies() {
  var categories = ["row1", "row2", "row3", "row4", "row5"];

  for (var i = 0; i < categories.length; i++) {
    var categoryId = categories[i];
    var container = document.getElementById(categoryId);
    container.innerHTML = "";

    var moviesInCategory = allMovies.filter(function (movie) {
      return movie.clasifi_pel === categoryId;
    });

    for (var j = 0; j < moviesInCategory.length; j++) {
      var movie = moviesInCategory[j];
      var card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML =
        '<img src="' +
        movie.ruta_img_pel +
        '" alt="' +
        movie.titulo_pel +
        '" class="movie-image">' +
        '<div class="movie-overlay">' +
        '<div class="movie-title">' +
        movie.titulo_pel +
        "</div>" +
        '<div class="movie-actions">' +
        '<button class="action-btn play" onclick="playVideo(\'' +
        movie.titulo_pel +
        "')\">&#9654;</button>" +
        '<button class="action-btn add">+</button>' +
        '<button class="action-btn info" onclick="openModal(\'' +
        movie.titulo_pel +
        "')\">&#8505;</button>" +
        "</div></div>";
      container.appendChild(card);
    }
  }
}

// Renderizar la tabla para administrar las peliculas
function renderAdminTable() {
  console.log(allMovies + "  Peliculas Objeto");
  var tbody = document.getElementById("moviesTableBody");
  tbody.innerHTML = "";

  if (allMovies.length === 0) {
    tbody.innerHTML =
      '<div class="empty-state"><h3>No hay películas</h3><p>Agrega tu primera película usando el botón de arriba</p></div>';
    return;
  }

  for (var i = 0; i < allMovies.length; i++) {
    var movie = allMovies[i];
    var row = document.createElement("div");
    row.className = "table-row row-peliculas";
    row.innerHTML =
      '<div><img src="' +
      movie.ruta_img_pel +
      '" alt="' +
      movie.titulo_pel +
      '" class="movie-thumb"></div>' +
      "<div><strong>" +
      movie.titulo_pel +
      "</strong></div>" +
      "<div>" +
      categoryNames[movie.clasifi_pel] +
      "</div>" +
      "<div>" +
      movie.year_lanza_pel +
      "</div>" +
      '<div class="table-actions">' +
      '<button class="btn-edit" onclick="editMovie(' +
      movie.cod_pel +
      ')">Editar</button>' +
      '<button class="btn-delete" onclick="deleteMovie(' +
      movie.cod_pel +
      ')">Eliminar</button>' +
      "</div>";
    tbody.appendChild(row);
  }
}

// Filtar las peliculas en la busqueda
function filterMovies() {
  var searchValue = document.getElementById("adminSearchInput").value;

  // Si el buscador está vacío, muestra todas
  if (searchValue.trim() === "") {
    getMovies();
    return;
  }

  // Envía la búsqueda al servidor
  fetch("/api/buscar-pelicula?titulo=" + encodeURIComponent(searchValue))
    .then(function (response) {
      return response.json();
    })
    .then(function (resultado) {
      if (resultado.exito) {
        // Reemplaza el array con los resultados
        allMovies = resultado.peliculas;
        console.log("Búsqueda encontró:", resultado.cantidad, "películas");
        renderAdminTable();
      } else {
        console.error("Error:", resultado.error);
      }
    })
    .catch(function (error) {
      console.error("Error en búsqueda:", error);
    });
}

// Abrir el modal para agregar
function openAddModal() {
  document.getElementById("crudModalTitle").textContent = "Agregar Película";
  document.getElementById("movieForm").reset();
  //document.getElementById('movieId').value = '';
  document.getElementById("crudModal").classList.add("active");
}

//Editar pelicula en la base de datos
function editMovie(id) {
  // Obtiene la película del servidor por su ID
  fetch("/api/pelicula/" + id)
    .then(function (response) {
      return response.json();
    })
    .then(function (resultado) {
      if (resultado.exito) {
        var movie = resultado.pelicula;

        // Rellena el formulario con los datos
        document.getElementById("crudModalTitle").textContent =
          "Editar Película";
        //document.getElementById('movieId').value = movie.cod_pel;
        document.getElementById("movieTitle").value = movie.titulo_pel;
        document.getElementById("movieCategory").value = movie.clasifi_pel;
        document.getElementById("movieYear").value = movie.year_lanza_pel;
        document.getElementById("movieDuration").value = movie.duracion_pel;
        document.getElementById("movieDirector").value = movie.director_pel;
        document.getElementById("movieImage").value = movie.ruta_img_pel;
        document.getElementById("movieVideo").value = movie.ruta_pel;
        document.getElementById("movieDescription").value =
          movie.descrip_pel || "";

        // Abre el modal
        document.getElementById("crudModal").classList.add("active");
      } else {
        alert("Error: " + resultado.error);
      }
    })
    .catch(function (error) {
      console.error("Error al obtener película:", error);
    });
}

//Eliminar pelicula
function deleteMovie(id) {
  if (confirm("¿Estás seguro de eliminar esta película?")) {
    // Envía petición DELETE al servidor
    fetch("/api/eliminar-pelicula/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (resultado) {
        if (resultado.exito) {
          alert("Película eliminada correctamente");
          // Recarga las películas
          getMovies();
        } else {
          alert("Error: " + resultado.error);
        }
      })
      .catch(function (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar la película");
      });
  }
}

//Guardar pelicula
function saveMovie(event) {
  event.preventDefault();

  //var id = document.getElementById('movieId').value;
  var title = document.getElementById("movieTitle").value;
  var category = document.getElementById("movieCategory").value;
  var year = document.getElementById("movieYear").value;
  var image = document.getElementById("movieImage").value;
  var video = document.getElementById("movieVideo").value;
  var description = document.getElementById("movieDescription").value;
  var duration = document.getElementById("movieDuration").value;
  var director = document.getElementById("movieDirector").value;

  let movieData = {
    titulo: title,
    categoria: category,
    anio: parseInt(year),
    duracion: parseInt(duration),
    director: director,
    imagen: image,
    video: video,
    descripcion: description,
  };

  try {
    fetch("/api/buscar-pelicula-titulo?titulo=" + encodeURIComponent(title))
      .then(function (response) {
        return response.json();
      })
      .then(function (resultado) {
        if (resultado.exito) {
          //Si existe por ende se edita
          console.log("Editando película titulo:", title);

          fetch("/api/actualizar-pelicula/" + title, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(movieData),
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (resultado) {
              if (resultado.exito) {
                alert("¡Película actualizada exitosamente!");
                closeCrudModal();
                // Recarga las películas del servidor
                getMovies();
              } else {
                alert("Error: " + resultado.error);
              }
            })
            .catch(function (error) {
              console.error("Error:", error);
              alert("Error al actualizar");
            });
          console.error("Error:", resultado.error);
        } else {
          //No existe el titulo de la pelicula por ende se va a agregar
          console.log("Agregando película nueva");

          fetch("/api/agregar-pelicula", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(movieData),
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (resultado) {
              if (resultado.exito) {
                alert("¡Película agregada exitosamente!");
                closeCrudModal();
                // Recarga las películas del servidor
                getMovies();
              } else {
                alert("Error: " + resultado.error);
              }
            })
            .catch(function (error) {
              console.error("Error:", error);
              alert("Error al agregar película");
            });
        }
      })
      .catch(function (error) {
        console.error("Error en búsqueda:", error);
      });
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error");
  }
}

// Cerrar el modal del crud de las peliculas
function closeCrudModal() {
  document.getElementById("crudModal").classList.remove("active");
}

function playVideo(title) {
  var movie = allMovies.find(function (m) {
    return m.titulo_pel === title;
  });

  if (movie && movie.ruta_pel) {
    var videoPlayer = document.getElementById("videoPlayer");
    var videoSource = document.getElementById("videoSource");
    var mainVideo = document.getElementById("mainVideo");
    var videoTitle = document.getElementById("videoTitle");
    var videoDescription = document.getElementById("videoDescription");

    videoSource.src = movie.ruta_pel;
    videoTitle.textContent = movie.titulo_pel;
    videoDescription.textContent =
      movie.descrip_pel || "Disfruta de esta increíble producción";
    mainVideo.load();
    videoPlayer.classList.add("active");
    mainVideo.play();
  } else {
    alert("Video no disponible para: " + title);
  }
}

function closeVideo() {
  var videoPlayer = document.getElementById("videoPlayer");
  var mainVideo = document.getElementById("mainVideo");

  mainVideo.pause();
  mainVideo.currentTime = 0;
  videoPlayer.classList.remove("active");
}

function scrollRow(button, direction) {
  var container = button.parentElement.querySelector(".row-posters");
  var scrollAmount = direction === "left" ? -600 : 600;
  container.scrollLeft += scrollAmount;
}

function openModal(title) {
  var movie = allMovies.find(function (m) {
    return m.title === title;
  });
  document.getElementById("modal").classList.add("active");
  document.getElementById("modalTitle").textContent = title;

  if (movie && movie.description) {
    document.querySelector(".modal-description").textContent =
      movie.description;
  }
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

window.addEventListener("scroll", function () {
  var header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.getElementById("modal").addEventListener("click", function (e) {
  if (e.target.id === "modal") {
    closeModal();
  }
});

document.getElementById("crudModal").addEventListener("click", function (e) {
  if (e.target.id === "crudModal") {
    closeCrudModal();
  }
});

document.getElementById("videoPlayer").addEventListener("click", function (e) {
  if (e.target.id === "videoPlayer") {
    closeVideo();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeVideo();
    closeModal();
    closeCrudModal();
  }
});

document.addEventListener("keydown", function (e) {
  var videoPlayer = document.getElementById("videoPlayer");
  var mainVideo = document.getElementById("mainVideo");

  if (videoPlayer.classList.contains("active")) {
    if (e.key === " ") {
      e.preventDefault();
      if (mainVideo.paused) {
        mainVideo.play();
      } else {
        mainVideo.pause();
      }
    } else if (e.key === "ArrowRight") {
      mainVideo.currentTime += 10;
    } else if (e.key === "ArrowLeft") {
      mainVideo.currentTime -= 10;
    } else if (e.key === "ArrowUp") {
      mainVideo.volume = Math.min(1, mainVideo.volume + 0.1);
    } else if (e.key === "ArrowDown") {
      mainVideo.volume = Math.max(0, mainVideo.volume - 0.1);
    } else if (e.key === "f" || e.key === "F") {
      if (mainVideo.requestFullscreen) {
        mainVideo.requestFullscreen();
      } else if (mainVideo.webkitRequestFullscreen) {
        mainVideo.webkitRequestFullscreen();
      } else if (mainVideo.msRequestFullscreen) {
        mainVideo.msRequestFullscreen();
      }
    }
  }
});

document.getElementById("searchInput").addEventListener("input", function (e) {
  var query = e.target.value.toLowerCase();
  if (query.length > 2) {
    console.log("Buscando:", query);
  }
});

//Series
// ============================================
// CRUD SERIES (NIVEL 1)
// ============================================

function getSeries() {
  fetch("/api/series")
    .then((response) => response.json())
    .then((resultado) => {
      if (resultado.exito) {
        allSeries = resultado.series;
        renderSeriesAdminTable();
      } else {
        console.log("Error: " + resultado.error);
      }
    })
    .catch((error) => console.log("Error al cargar las series: " + error));
}

function renderSeriesAdminTable() {
  const tbody = document.getElementById("seriesTableBody");
  tbody.innerHTML = "";

  if (allSeries.length === 0) {
    tbody.innerHTML =
      '<div class="empty-state"><h3>No hay series</h3><p>Agrega tu primera serie usando el botón de arriba</p></div>';
    return;
  }

  allSeries.forEach((serie) => {
    const row = document.createElement("div");
    row.className = "table-row row-series";
    row.innerHTML = `
            <img src="${serie.ruta_img_ser}" alt="${serie.titulo_serie}" class="serie-thumb">
            <div><strong>${serie.titulo_serie}</strong></div>
            <div>${categoryNames[serie.clasifi_serie]}</div>
            <div>${serie.year_lanza_serie}</div>
            <div class="table-actions">
                <button class="btn-edit" onclick="editSerie(${serie.cod_serie})">Editar</button>
                <button class="btn-manage" onclick="manageSeries(${serie.cod_serie})">Temporadas</button>
                <button class="btn-delete" onclick="deleteSerie(${serie.cod_serie})">Eliminar</button>
            </div>
        `;
    tbody.appendChild(row);
  });
}

function openAddSeriesModal() {
  currentSerieId = null;
  document.getElementById("seriesCrudModalTitle").textContent = "Agregar Serie";
  document.getElementById("seriesForm").reset();
  document.getElementById("seriesCrudModal").classList.add("active");
}

function createSerie(serieData) {
  return fetch("/api/agregar-serie", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serieData),
  }).then((res) => res.json());
}

function updateSerie(id, serieData) {
  return fetch("/api/actualizar-serie/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serieData),
  }).then((res) => res.json());
}

function saveSerie(event) {
  event.preventDefault();

  const title = document.getElementById("seriesTitle").value;
  const category = document.getElementById("seriesCategory").value;
  const year = document.getElementById("seriesYear").value;
  const creator = document.getElementById("seriesCreador").value;
  const image = document.getElementById("seriesImage").value;
  const description = document.getElementById("seriesDescription").value;

  console.log(title);
  console.log(category);
  console.log(year);
  console.log(creator);
  console.log(image);
  console.log(description);

  const serieData = {
    titulo: title,
    categoria: category,
    anio: parseInt(year),
    creador: creator,
    imagen: image,
    descripcion: description,
  };
  //console.log(title, category, year, creator, image, description);
  console.log(JSON.stringify(serieData));

  console.log("curren ", currentSerieId);

  // Si tiene ID → EDITAR
  if (currentSerieId !== null) {
    updateSerie(currentSerieId, serieData).then((resultado) => {
      if (resultado.exito) {
        alert("✔ Serie actualizada");
        currentSerieId = null; // ← Reset
        closeSeriesCrudModal();
        getSeries();
      } else {
        alert("❌ " + resultado.error);
      }
    });

    // Si no tiene ID → AGREGAR
  } else {
    createSerie(serieData).then((resultado) => {
      if (resultado.exito) {
        alert("✔ Serie agregada");
        closeSeriesCrudModal();
        getSeries();
      } else {
        alert("❌ " + resultado.error);
      }
    });
  }

  // try {
  //     if (currentSerieId != null) {
  //         // Editar
  //         console.log("Editando serie:", currentSerieId);
  //         fetch('/api/actualizar-serie/' + currentSerieId, {
  //             method: 'PUT',
  //             headers: { 'Content-Type': 'application/json' },
  //             body: JSON.stringify(serieData)
  //         })
  //             .then(response => response.json())
  //             .then(resultado => {
  //                 if (resultado.exito) {
  //                     currentSerieId = null;
  //                     alert('¡Serie actualizada exitosamente!');
  //                     closeSeriesCrudModal();
  //                     getSeries();
  //                 } else {
  //                     alert('Error: ' + resultado.error);
  //                 }
  //             });
  //     } else {
  //         // Agregar
  //         console.log("Agregando serie nueva");
  //         fetch('/api/agregar-serie', {
  //             method: 'POST',
  //             headers: { 'Content-Type': 'application/json' },
  //             body: JSON.stringify(serieData)
  //         })
  //             .then(response => response.json())
  //             .then(resultado => {
  //                 if (resultado.exito) {
  //                     currentSerieId = null;
  //                     alert('¡Serie agregada exitosamente!');
  //                     closeSeriesCrudModal();
  //                     getSeries();
  //                 } else {
  //                     alert('Error: ' + resultado.error);
  //                 }
  //             });
  //     }
  // } catch (error) {
  //     console.error('Error:', error);
  //     alert('Hubo un error');
  // }
  // fetch('/api/buscar-serie-titulo?titulo=' + encodeURIComponent(title))
  //     .then(response => response.json())
  //     .then(resultado => {
  //         if (resultado.exito) {
  //             // Editar
  //             console.log("Editando serie:", title);
  //             fetch('/api/actualizar-serie/' + title, {
  //                 method: 'PUT',
  //                 headers: { 'Content-Type': 'application/json' },
  //                 body: JSON.stringify(serieData)
  //             })
  //                 .then(response => response.json())
  //                 .then(resultado => {
  //                     if (resultado.exito) {
  //                         alert('¡Serie actualizada exitosamente!');
  //                         closeSeriesCrudModal();
  //                         getSeries();
  //                     } else {
  //                         alert('Error: ' + resultado.error);
  //                     }
  //                 });
  //         } else {
  //             // Agregar
  //             console.log("Agregando serie nueva");
  //             fetch('/api/agregar-serie', {
  //                 method: 'POST',
  //                 headers: { 'Content-Type': 'application/json' },
  //                 body: JSON.stringify(serieData)
  //             })
  //                 .then(response => response.json())
  //                 .then(resultado => {
  //                     if (resultado.exito) {
  //                         alert('¡Serie agregada exitosamente!');
  //                         closeSeriesCrudModal();
  //                         getSeries();
  //                     } else {
  //                         alert('Error: ' + resultado.error);
  //                     }
  //                 });
  //         }
  //     });
}

function editSerie(id) {
  currentSerieId = id;
  console.log("id serie ", currentSerieId);
  fetch("/api/serie/" + id)
    .then((response) => response.json())
    .then((resultado) => {
      console.log("traje los datos");
      console.log(resultado.exito);
      if (resultado.exito) {
        const serie = resultado.serie;

        console.log(serie.titulo_serie);

        document.getElementById("seriesCrudModalTitle").textContent =
          "Editar Serie";
        document.getElementById("seriesTitle").value = serie.titulo_serie;
        document.getElementById("seriesCategory").value = serie.clasifi_serie;
        document.getElementById("seriesYear").value = serie.year_lanza_serie;
        document.getElementById("seriesCreador").value = serie.creador_serie;
        document.getElementById("seriesImage").value = serie.ruta_img_ser;
        document.getElementById("seriesDescription").value =
          serie.descrip_serie || "";

        document.getElementById("seriesCrudModal").classList.add("active");
      } else {
        alert("Error: " + resultado.error);
      }
    });
}

function deleteSerie(id) {
  if (confirm("¿Estás seguro de eliminar esta serie?")) {
    fetch("/api/eliminar-serie/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((resultado) => {
        if (resultado.exito) {
          alert("Serie eliminada correctamente");
          getSeries();
        } else {
          alert("Error: " + resultado.error);
        }
      });
  }
}

function closeSeriesCrudModal() {
  document.getElementById("seriesCrudModal").classList.remove("active");
}

// ============================================
// CRUD TEMPORADAS (NIVEL 2)
// ============================================

function manageSeries(serieId) {
  currentSerieId = serieId;
  currentSeasonId = null;
  getSeasons(serieId);
  document.getElementById("seasonsModal").classList.add("active");
}

function getSeasons(serieId) {
  fetch("/api/serie/" + serieId + "/temporadas")
    .then((response) => response.json())
    .then((resultado) => {
      if (resultado.exito) {
        allSeasons = resultado.temporadas;
        console.log(JSON.stringify(allSeasons));
        renderSeasonsTable();
      } else {
        console.log("Error: " + resultado.error);
      }
    });
}

function renderSeasonsTable() {
  const tbody = document.getElementById("seasonsTableBody");
  tbody.innerHTML = "";

  if (allSeasons.length === 0) {
    tbody.innerHTML =
      '<div class="empty-state"><p>No hay temporadas. Agrega una nueva.</p></div>';
    return;
  }

  allSeasons.sort((a, b) => {
    const numA = parseInt(a.titulo_tem.replace(/\D/g, ""));
    const numB = parseInt(b.titulo_tem.replace(/\D/g, ""));
    return numA - numB;
  });

  console.log(JSON.stringify(allSeasons));
  for (let i = 0; i < allSeasons.length; i++) {
    const season = allSeasons[i];

    const row = document.createElement("div");
    row.className = "table-row row-temporadas";
    row.innerHTML = `
        <div>${season.num_cap_tem}</div>
        <div>${season.titulo_tem}</div>
        <div>${season.year_lanza_tem}</div>
        <div class="table-actions">
            <button class="btn-edit" onclick="editSeason(${season.cod_tem})">Editar</button>
            <button class="btn-manage" onclick="manageEpisodes(${season.cod_tem})">Capítulos</button>
            <button class="btn-delete" onclick="deleteSeason(${season.cod_tem})">Eliminar</button>
        </div>
    `;

    tbody.appendChild(row);
  }
}

function openAddSeasonModal() {
  document.getElementById("seasonCrudModalTitle").textContent =
    "Agregar Temporada";
  document.getElementById("seasonForm").reset();
  document.getElementById("seasonCrudModal").classList.add("active");
}

function saveSeason(event) {
  event.preventDefault();

  const number = document.getElementById("seasonNumber").value;
  const title = document.getElementById("tituloTemporada").value;
  const anio = document.getElementById("seasonYear").value;
  const description = document.getElementById("seasonDescription").value;

  const seasonData = {
    numero: parseInt(number),
    titulo: title,
    anio: parseInt(anio),
    descripcion: description,
    //serie_id: currentSerieId
  };

  console.log(currentSerieId, " id serie");
  console.log(currentSeasonId, " id temporada");
  // let id;

  // for (let i = 0; i < allSeasons.length; i++) {
  //     if (allSeasons[i].titulo_tem == title.trim()) {
  //         id = allSeasons[i].cod_tem;
  //     } else {
  //         id = 0;
  //     }
  // }

  //let titulo = title.replace(/\s+/g, '');
  try {
    if (currentSeasonId != null) {
      //Si existe por ende se edita
      console.log("Editando Temporada id:", currentSeasonId);

      fetch("/api/actualizar-temporada/" + currentSeasonId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(seasonData),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (resultado) {
          if (resultado.exito) {
            alert("¡Temporada actualizada exitosamente!");
            // Recarga las temporadas del servidor
            getSeasons(currentSerieId);
            closeSeasonCrudModal();
            //currentSeasonId = null;
          } else {
            alert("Error: " + resultado.error);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
          alert("Error al actualizar");
        });
      //console.error("Error:", resultado.error);
    } else {
      //No existe el titulo de la temporada por ende se va a agregar
      //console.log("agragando serie con codigo: ", id);
      fetch("/api/serie/" + currentSerieId + "/agregar-temporada", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seasonData),
      })
        .then((response) => response.json())
        .then((resultado) => {
          if (resultado.exito) {
            alert("¡Temporada agregada exitosamente!");
            closeSeasonCrudModal();
            getSeasons(currentSerieId);
          } else {
            alert("Error: " + resultado.error);
          }
        });
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error");
  }

  // try {
  //     fetch('/api/buscar-temporada/' + currentSeasonId)
  //         .then(function (response) {
  //             return response.json();
  //         })
  //         .then(function (resultado) {
  //             if (resultado.exito) {

  //             } else {

  //             }
  //         })
  //         .catch(function (error) {
  //             console.error("Error en búsqueda:", error);
  //         });
  // } catch (error) {
  //     console.error('Error:', error);
  //     alert('Hubo un error');
  // }
}

function editSeason(seasonId) {
  currentSeasonId = seasonId;
  fetch("/api/temporada/" + seasonId)
    .then((response) => response.json())
    .then((resultado) => {
      if (resultado.exito) {
        const season = resultado.temporada;

        console.log(JSON.stringify(season));

        document.getElementById("seasonCrudModalTitle").textContent =
          "Editar Temporada";
        document.getElementById("seasonNumber").value = season.num_cap_tem;
        document.getElementById("tituloTemporada").value = season.titulo_tem;
        document.getElementById("seasonYear").value = season.year_lanza_tem;
        document.getElementById("seasonDescription").value =
          season.descrip_tem || "";

        console.log(season.titulo_tem, "  titulo de la temporada");

        document.getElementById("seasonCrudModal").classList.add("active");
      } else {
        alert("Error: " + resultado.error);
      }
    });
}

function deleteSeason(seasonId) {
  if (confirm("¿Estás seguro? Se eliminarán todos los capítulos asociados.")) {
    fetch("/api/eliminar-temporada/" + seasonId, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((resultado) => {
        if (resultado.exito) {
          alert("Temporada eliminada");
          getSeasons(currentSerieId);
        } else {
          alert("Error: " + resultado.error);
        }
      });
  }
}

function closeSeasonCrudModal() {
  document.getElementById("seasonCrudModal").classList.remove("active");
}

function closeSeasonsModal() {
  document.getElementById("seasonsModal").classList.remove("active");
}

// ============================================
// CRUD CAPÍTULOS (NIVEL 3)
// ============================================

function manageEpisodes(seasonId) {
  currentSeasonId = seasonId;
  getEpisodes(seasonId);
  document.getElementById("episodesModal").classList.add("active");
}

function getEpisodes(seasonId) {
  fetch("/api/temporada/" + seasonId + "/capitulos")
    .then((response) => response.json())
    .then((resultado) => {
      if (resultado.exito) {
        allEpisodes = resultado.capitulos;
        renderEpisodesTable();
      } else {
        console.log("Error: " + resultado.error);
      }
    });
}

function renderEpisodesTable() {
  const tbody = document.getElementById("episodesTableBody");
  tbody.innerHTML = "";

  if (allEpisodes.length === 0) {
    tbody.innerHTML =
      '<div class="empty-state"><p>No hay capítulos. Agrega uno nuevo.</p></div>';
    return;
  }
  let num = 0;
  for (let i = allEpisodes.length; i >= 0; i--) {
    const episode = allEpisodes[i - 1];
    //let num = allEpisodes.length--;
    num++;
    const row = document.createElement("div");
    row.className = "table-row";
    row.innerHTML = `
        <div>${num}</div>
        <div>${episode.titulo_cap}</div>
        <div>${episode.duracion_cap || "N/A"} min</div>
        <div class="table-actions">
            <button class="btn-edit" onclick="editEpisode(${episode.cod_cap})">Editar</button>
            <button class="btn-delete" onclick="deleteEpisode(${episode.cod_cap})">Eliminar</button>
        </div>
    `;

    tbody.appendChild(row);
  }
}

function openAddEpisodeModal() {
  document.getElementById("episodeCrudModalTitle").textContent =
    "Agregar Capítulo";
  document.getElementById("episodeForm").reset();
  document.getElementById("episodeCrudModal").classList.add("active");
}

function saveEpisode(event) {
  event.preventDefault();
  document.getElementById("episodeIndice").style.display = "block";

  const title = document.getElementById("tituloCap").value;
  const duration = document.getElementById("duracionCap").value;
  const video = document.getElementById("episodeVideo").value;
  const description = document.getElementById("descripCap").value;

  console.log(title, duration, video, description);
  const episodeData = {
    titulo: title,
    duracion: parseInt(duration),
    ruta_video: video,
    descripcion: description,
    temporada_id: currentSeasonId,
  };

  try {
    fetch("/api/buscar-capitulo-titulo?titulo=" + encodeURIComponent(title))
      .then(function (response) {
        return response.json();
      })
      .then(function (resultado) {
        if (resultado.exito) {
          //Si existe por ende se edita
          console.log("Editando capitulo titulo:", title);

          fetch("/api/actualizar-capitulo/" + title, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(episodeData),
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (resultado) {
              if (resultado.exito) {
                alert("¡Capitulo actualizado exitosamente!");
                closeEpisodeCrudModal();
                // Recarga los capitulos del servidor
                getEpisodes(currentSeasonId);
              } else {
                alert("Error: " + resultado.error);
              }
            })
            .catch(function (error) {
              console.error("Error:", error);
              alert("Error al actualizar");
            });
          console.error("Error:", resultado.error);
        } else {
          //No existe el titulo del capitulo por ende se va a agregar
          fetch("/api/temporada/" + currentSeasonId + "/agregar-capitulo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(episodeData),
          })
            .then((response) => response.json())
            .then((resultado) => {
              if (resultado.exito) {
                alert("¡Capítulo agregado exitosamente!");
                closeEpisodeCrudModal();
                getEpisodes(currentSeasonId);
              } else {
                alert("Error: " + resultado.error);
              }
            });
        }
      })
      .catch(function (error) {
        console.error("Error en búsqueda:", error);
      });
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error");
  }
}

function editEpisode(episodeId) {
  console.log(episodeId);
  fetch("/api/capitulo/" + episodeId)
    .then((response) => response.json())
    .then((resultado) => {
      if (resultado.exito) {
        const episode = resultado.capitulo;
        console.log(episode.cod_cap, " codigo");
        document.getElementById("episodeCrudModalTitle").textContent =
          "Editar Capítulo";
        document.getElementById("episodeIndice").style.display = "none";
        document.getElementById("tituloCap").value = episode.titulo_cap;
        document.getElementById("duracionCap").value = episode.duracion_cap;
        document.getElementById("episodeVideo").value = episode.ruta_cap;
        document.getElementById("descripCap").value = episode.descrip_cap || "";
        console.log(
          episode.cod_cap,
          episode.titulo_cap,
          episode.duracion_cap,
          episode.ruta_cap,
          episode.descrip_cap,
        );

        document.getElementById("episodeCrudModal").classList.add("active");
      } else {
        alert("Error: " + resultado.error);
      }
    });
}

function deleteEpisode(episodeId) {
  if (confirm("¿Estás seguro de eliminar este capítulo?")) {
    fetch("/api/eliminar-capitulo/" + episodeId, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((resultado) => {
        if (resultado.exito) {
          alert("Capítulo eliminado");
          getEpisodes(currentSeasonId);
        } else {
          alert("Error: " + resultado.error);
        }
      });
  }
}

function closeEpisodeCrudModal() {
  document.getElementById("episodeCrudModal").classList.remove("active");
}

function closeEpisodesModal() {
  document.getElementById("episodesModal").classList.remove("active");
}

// ============================================
// RENDERIZAR CARRUSEL DE SERIES (HOME)
// ============================================

function getSeriesForCarousel() {
  fetch("/api/series")
    .then((response) => response.json())
    .then((resultado) => {
      if (resultado.exito) {
        allSeriesForPlayer = resultado.series;
        renderSeriesCarousel();
      } else {
        console.log("Error: " + resultado.error);
      }
    })
    .catch((error) => console.log("Error al cargar series: " + error));
}

function renderSeriesCarousel() {
  const container = document.getElementById("seriesCarousel");
  container.innerHTML = "";

  allSeriesForPlayer.forEach((serie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
            <img src="${serie.ruta_img_ser}" alt="${serie.titulo_serie}" class="movie-image">
            <div class="movie-overlay">
                <div class="movie-title">${serie.titulo_serie}</div>
                <div class="movie-actions">
                    <button class="action-btn play" onclick="openSeriesPlayer(${serie.cod_serie})">&#9654;</button>
                    <button class="action-btn add">+</button>
                    <button class="action-btn info" onclick="openModal('${serie.titulo_serie}')">&#8505;</button>
                </div>
            </div>
        `;
    container.appendChild(card);
  });
}

// ============================================
// SELECTOR DE TEMPORADAS Y CAPÍTULOS
// ============================================

function openSeriesPlayer(serieId) {
  console.log("openSeriesPlayer llamado con id:", serieId);
  currentSerieForPlayer = serieId;

  fetch(`/api/serie/${serieId}/temporadas`)
    .then((response) => response.json())
    .then((resultado) => {
      if (resultado.exito) {
        console.log("Temporadas encontradas:", resultado.temporadas);
        console.log("Abriendo modal...");
        console.log("estoy buscando desde el catalogo");
        allSeasonsForPlayer = resultado.temporadas;
        console.log(allSeasonsForPlayer);
        

        // Abrir modal y mostrar primera temporada por defecto
        document.getElementById("seriesPlayerModal").classList.add("active");
        renderSeasonButtons();

        if (allSeasonsForPlayer.length > 0) {
          selectSeason(allSeasonsForPlayer[0].cod_tem);
        }
      }
    });
}

function renderSeasonButtons() {
  const container = document.getElementById("seasonsButtonsContainer");
  container.innerHTML = "";

  allSeasonsForPlayer.forEach((season, index) => {
    const btn = document.createElement("button");
    btn.className = "season-btn";
    btn.textContent = season.titulo_tem || `Temporada ${index + 1}`;
    btn.onclick = () => selectSeason(season.cod_tem);
    container.appendChild(btn);
  });
}

function selectSeason(seasonId) {
  currentSeasonForPlayer = seasonId;

  // Marcar botón activo
  document.querySelectorAll(".season-btn").forEach((btn, index) => {
    btn.classList.remove("active");
    if (allSeasonsForPlayer[index].cod_tem === seasonId) {
      btn.classList.add("active");
    }
  });

  // Obtener capítulos de la temporada
  fetch(`/api/temporada/${seasonId}/capitulos`)
    .then((response) => response.json())
    .then((resultado) => {
      if (resultado.exito) {
        allEpisodesForPlayer = resultado.capitulos;
        currentEpisodeIndex = 0;
        renderEpisodes();

        // Mostrar contenedor de capítulos
        document.getElementById("episodesContainer").style.display = "block";

        // Actualizar título
        const seasonData = allSeasonsForPlayer.find(
          (s) => s.cod_tem === seasonId,
        );
        document.getElementById("seasonTitle").textContent =
          seasonData.titulo_tem || "Temporada";
      }
    });
}

function renderEpisodes() {
  const container = document.getElementById("episodesList");
  container.innerHTML = "";

  allEpisodesForPlayer.forEach((episode, index) => {
    const card = document.createElement("div");
    card.className = "episode-card";
    card.innerHTML = `
            <div class="episode-number">Capítulo ${index + 1}</div>
            <div class="episode-info">
                <h4>${episode.titulo_cap}</h4>
                <p>${episode.duracion_cap || 0} min</p>
                <p class="episode-desc">${episode.descrip_cap || ""}</p>
            </div>
            <button class="btn-play-episode" onclick="playEpisode(${index})">
                ▶ Reproducir
            </button>
        `;
    container.appendChild(card);
  });
}

// ============================================
// REPRODUCIR CAPÍTULO
// ============================================

function playEpisode(index) {
  currentEpisodeIndex = index;
  const episode = allEpisodesForPlayer[index];

  // Llenar datos del capítulo
  document.getElementById("episodeTitle").textContent = episode.titulo_cap;
  document.getElementById("episodeDescription").textContent =
    episode.descrip_cap || "Sin descripción";
  document.getElementById("episodeDuration").textContent =
    `Duración: ${episode.duracion_cap || 0} min`;
  document.getElementById("episodeNumber").textContent =
    `Capítulo ${index + 1}`;

  // Cargar video
  const videoSource = document.getElementById("seriesVideoSource");
  videoSource.src = episode.ruta_cap;
  document.getElementById("seriesVideo").load();

  // Actualizar botones de navegación
  updateNavigationButtons();

  // Cerrar modal de selección y abrir reproductor
  document.getElementById("seriesPlayerModal").classList.remove("active");
  document.getElementById("seriesVideoPlayer").classList.add("active");

  // Reproducir automáticamente
  document.getElementById("seriesVideo").play();
}

function updateNavigationButtons() {
  const btnPrev = document.querySelector(".btn-prev");
  const btnNext = document.querySelector(".btn-next");

  // Deshabilitar botón anterior si es el primer capítulo
  btnPrev.disabled = currentEpisodeIndex === 0;

  // Deshabilitar botón siguiente si es el último capítulo
  btnNext.disabled = currentEpisodeIndex === allEpisodesForPlayer.length - 1;
}

function playPreviousEpisode() {
  if (currentEpisodeIndex > 0) {
    playEpisode(currentEpisodeIndex - 1);
  }
}

function playNextEpisode() {
  if (currentEpisodeIndex < allEpisodesForPlayer.length - 1) {
    playEpisode(currentEpisodeIndex + 1);
  }
}

// ============================================
// CERRAR MODALES
// ============================================

function closeSeriesPlayer() {
  document.getElementById("seriesPlayerModal").classList.remove("active");
  document.getElementById("episodesContainer").style.display = "none";
}

function closeSeriesVideo() {
  const video = document.getElementById("seriesVideo");
  video.pause();
  video.currentTime = 0;
  document.getElementById("seriesVideoPlayer").classList.remove("active");
}


// ============================================
// INICIALIZAR
// ============================================

// Cargar series al inicio
getSeriesForCarousel();
getSeries();
getMovies();
renderMovies();
//renderSeriesCarousel();
