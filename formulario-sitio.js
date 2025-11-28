// Manejo de pasos
const pasos = document.querySelectorAll('.paso');
const indicadores = document.querySelectorAll('.paso-indicador');

const btnAnterior = document.getElementById('btn-anterior');
const btnSiguiente = document.getElementById('btn-siguiente');
const btnVerResultado = document.getElementById('btn-ver-resultado');

const formDiagnostico = document.getElementById('form-diagnostico');

const resultadoSection = document.getElementById('resultado-sitio');
const resultadoIcono = document.getElementById('resultado-icono');
const resultadoTitulo = document.getElementById('resultado-titulo');
const resultadoDescripcion = document.getElementById('resultado-descripcion');
const resultadoVerMas = document.getElementById('resultado-ver-mas');

let pasoActual = 1;
const totalPasos = 4;

function mostrarPaso(nuevoPaso) {
    pasos.forEach(p => {
        p.classList.remove('active');
        if (Number(p.dataset.paso) === nuevoPaso) {
            p.classList.add('active');
        }
    });

    indicadores.forEach(ind => {
        ind.classList.toggle('activo', Number(ind.dataset.paso) === nuevoPaso);
    });

    // Botones
    btnAnterior.disabled = nuevoPaso === 1;
    btnSiguiente.style.display = nuevoPaso === totalPasos ? 'none' : 'inline-block';
    btnVerResultado.style.display = nuevoPaso === totalPasos ? 'inline-block' : 'none';

    pasoActual = nuevoPaso;
}

function hayOpcionSeleccionadaEnPaso(n) {
    const paso = document.querySelector(`.paso[data-paso="${n}"]`);
    if (!paso) return true;
    const input = paso.querySelector('input[type="radio"]:checked');
    return !!input;
}

btnSiguiente.addEventListener('click', () => {
    if (!hayOpcionSeleccionadaEnPaso(pasoActual)) {
        alert('Por favor, elegí una opción antes de continuar.');
        return;
    }
    if (pasoActual < totalPasos) {
        mostrarPaso(pasoActual + 1);
    }
});

btnAnterior.addEventListener('click', () => {
    if (pasoActual > 1) {
        mostrarPaso(pasoActual - 1);
    }
});

// Lógica de recomendación
formDiagnostico.addEventListener('submit', (e) => {
    e.preventDefault();

    // Verificamos que el último paso también tenga algo seleccionado
    if (!hayOpcionSeleccionadaEnPaso(totalPasos)) {
        alert('Por favor, elegí una opción antes de ver el resultado.');
        return;
    }

    const vision = formDiagnostico.elements['vision'].value;
    const presupuesto = formDiagnostico.elements['presupuesto'].value;
    const estructura = formDiagnostico.elements['estructura'].value;
    const valor = formDiagnostico.elements['valor'].value;

    let tipoSitio = 'landing';
    let icono = '🎯';

    // Prioridad E-commerce
    if (vision === 'tienda' || estructura === 'catalogo' || valor === 'experiencia') {
        tipoSitio = 'ecommerce';
        icono = '🛒';
    } else if (vision === 'marca' || estructura === 'completa' || valor === 'presencia') {
        tipoSitio = 'multipagina';
        icono = '📂';
    } else {
        tipoSitio = 'landing';
        icono = '🎯';
    }

    // Texto dinámico para que sea coherente con las respuestas
    let textoVision = '';
    if (vision === 'campana') {
        textoVision = 'querés probar campañas puntuales y convertir visitas en consultas rápidas';
    } else if (vision === 'marca') {
        textoVision = 'querés posicionar tu marca y mostrar varias áreas de tu negocio';
    } else if (vision === 'tienda') {
        textoVision = 'tu enfoque está en vender productos o servicios en línea';
    }

    let textoPresupuesto = '';
    if (presupuesto === 'ajustado') {
        textoPresupuesto = 'un presupuesto inicial ajustado, donde cada peso invertido tiene que rendir al máximo';
    } else if (presupuesto === 'equilibrado') {
        textoPresupuesto = 'un presupuesto equilibrado, dispuesto a invertir un poco más si el sitio rinde resultados';
    } else if (presupuesto === 'inversion') {
        textoPresupuesto = 'una visión de inversión fuerte, pensando en crecer y escalar el negocio';
    }

    let textoValor = '';
    if (valor === 'rapidez') {
        textoValor = 'priorizás lanzar rápido y medir resultados sin complicaciones';
    } else if (valor === 'presencia') {
        textoValor = 'valorás una presencia profesional, ordenada y clara para tus clientes';
    } else if (valor === 'experiencia') {
        textoValor = 'querés que tus clientes tengan una experiencia de compra cómoda y automatizada';
    }

    let titulo = '';
    let descripcion = '';
    let linkVerMas = '#';

    if (tipoSitio === 'landing') {
        titulo = 'Te recomendamos una Landing Page';
        descripcion =
            `Por cómo respondiste, ${
                textoVision || 'buscás generar resultados concretos'
            }, con ${
                textoPresupuesto || 'un enfoque cuidadoso en la inversión'
            } y donde ${
                textoValor || 'la claridad del mensaje y la conversión sean lo principal'
            }. 
            
Una Landing Page bien optimizada te permite concentrar todo en una sola página pensada para vender una idea, una oferta o un servicio específico, ideal para campañas de marketing y anuncios pagos.`;
        linkVerMas = 'sitios.html#landing';
    } else if (tipoSitio === 'multipagina') {
        titulo = 'Te recomendamos un sitio multipágina';
        descripcion =
            `Tus respuestas muestran que ${
                textoVision || 'querés construir una marca sólida'
            }, manejando ${
                textoPresupuesto || 'un presupuesto preparado para dar un salto de calidad'
            } y donde ${
                textoValor || 'la presencia profesional y la organización del contenido son clave'
            }.
            
Un sitio multipágina te permite separar secciones (inicio, servicios, equipo, testimonios, contacto, etc.), dar una imagen más corporativa y acompañar mejor el recorrido de tus potenciales clientes.`;
        linkVerMas = 'sitios.html#multipagina';
    } else {
        titulo = 'Te recomendamos un E-commerce';
        descripcion =
            `De acuerdo a tus respuestas, ${
                textoVision || 'tu foco está en la venta online de productos o servicios'
            }, con ${
                textoPresupuesto || 'una mirada de inversión orientada a generar retorno'
            } y donde ${
                textoValor || 'la experiencia de compra y la automatización son fundamentales'
            }.
            
Un E-commerce te permite mostrar tu catálogo, manejar stock, aplicar medios de pago y convertir tu sitio en una verdadera tienda digital abierta las 24 horas.`;
        linkVerMas = 'sitios.html#ecommerce';
    }

    // Pintamos el resultado
    resultadoIcono.textContent = icono;
    resultadoTitulo.textContent = titulo;
    resultadoDescripcion.textContent = descripcion;
    resultadoVerMas.href = linkVerMas;

    resultadoSection.classList.remove('oculto');
    resultadoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Iniciar mostrando el paso 1
mostrarPaso(pasoActual);
