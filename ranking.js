// ============================================
// ranking.js
// Genera las filas del ranking de programadores
// Editá este archivo para sumar o actualizar
// programadores desde Visual Studio.
// ============================================

// 1) Array de programadores
const programadores = [
  {
    paisNombre: "Argentina",
    banderaEmoji: "🇦🇷",
    nombreCompleto: "Tomas Stutz",
    caja: 0,
    trabajos: 0,
    instagramUser: "tomas_stutz"
  },
  {
    paisNombre: "Argentina",
    banderaEmoji: "🇦🇷",
    nombreCompleto: "Facundo Amelotti",
    caja: 0,
    trabajos: 0,
    instagramUser: "facuamelotti"
  },
  {
    paisNombre: "Argentina",
    banderaEmoji: "🇦🇷",
    nombreCompleto: "Bautista Serqueira",
    caja: 0,
    trabajos: 0,
    instagramUser: "bauserfu"
  }
  // EJEMPLO:
  // {
  //   paisNombre: "Brasil",
  //   banderaEmoji: "🇧🇷",
  //   nombreCompleto: "João Silva",
  //   caja: 0,
  //   trabajos: 0,
  //   instagramUser: "joao.dev"
  // }
];

// 2) Crea una fila <tr> con posición, país, etc.
function crearFilaProgramador(programador, indice) {
  const posicion = indice + 1;

  const fila = document.createElement("tr");

  if (posicion === 1) fila.classList.add("ranking-row-1");
  if (posicion === 2) fila.classList.add("ranking-row-2");
  if (posicion === 3) fila.classList.add("ranking-row-3");

  // POSICIÓN
  const tdPosicion = document.createElement("td");
  tdPosicion.textContent = posicion.toString();

  // PAÍS
  const tdPais = document.createElement("td");
  const divPais = document.createElement("div");
  divPais.classList.add("ranking-pais");

  const spanBandera = document.createElement("span");
  spanBandera.classList.add("ranking-bandera");
  spanBandera.textContent = programador.banderaEmoji;

  const spanNombrePais = document.createElement("span");
  spanNombrePais.textContent = programador.paisNombre;

  divPais.appendChild(spanBandera);
  divPais.appendChild(spanNombrePais);
  tdPais.appendChild(divPais);

  // PROGRAMADOR
  const tdProgramador = document.createElement("td");
  const divProgramador = document.createElement("div");
  divProgramador.classList.add("ranking-programador");

  const iconPersona = document.createElement("i");
  iconPersona.classList.add("fa-solid", "fa-user");
  iconPersona.setAttribute("aria-hidden", "true");

  const spanNombreCompleto = document.createElement("span");
  spanNombreCompleto.textContent = programador.nombreCompleto;

  divProgramador.appendChild(iconPersona);
  divProgramador.appendChild(spanNombreCompleto);
  tdProgramador.appendChild(divProgramador);

  // CAJA
  const tdCaja = document.createElement("td");
  tdCaja.classList.add("ranking-caja");

  const iconDinero = document.createElement("i");
  iconDinero.classList.add("fa-solid", "fa-dollar-sign");
  iconDinero.setAttribute("aria-hidden", "true");

  const spanCaja = document.createElement("span");
  spanCaja.textContent = programador.caja.toLocaleString("es-AR");

  tdCaja.appendChild(iconDinero);
  tdCaja.appendChild(spanCaja);

  // TRABAJOS
  const tdTrabajos = document.createElement("td");
  tdTrabajos.textContent = programador.trabajos.toString();

  // INSTAGRAM (icono + @usuario)
  const tdInstagram = document.createElement("td");
  tdInstagram.classList.add("ranking-instagram");

  const enlaceInstagram = document.createElement("a");
  enlaceInstagram.href = `https://www.instagram.com/${programador.instagramUser}`;
  enlaceInstagram.target = "_blank";
  enlaceInstagram.rel = "noopener noreferrer";
  enlaceInstagram.setAttribute(
    "aria-label",
    `Perfil de Instagram de ${programador.nombreCompleto}`
  );

  const iconInstagram = document.createElement("i");
  iconInstagram.classList.add("fa-brands", "fa-instagram");

  const spanUser = document.createElement("span");
  spanUser.classList.add("ranking-instagram-user");
  spanUser.textContent = `@${programador.instagramUser}`;

  enlaceInstagram.appendChild(iconInstagram);
  enlaceInstagram.appendChild(spanUser);
  tdInstagram.appendChild(enlaceInstagram);

  // Agregar celdas a la fila
  fila.appendChild(tdPosicion);
  fila.appendChild(tdPais);
  fila.appendChild(tdProgramador);
  fila.appendChild(tdCaja);
  fila.appendChild(tdTrabajos);
  fila.appendChild(tdInstagram);

  return fila;
}

// 3) Llenar la tabla al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("ranking-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  programadores.forEach((prog, index) => {
    const fila = crearFilaProgramador(prog, index);
    tbody.appendChild(fila);
  });
});
