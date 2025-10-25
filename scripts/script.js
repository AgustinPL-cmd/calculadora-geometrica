// Estado global
let currentFigure = null;
let selectedElement = null;
document.getElementById('cancel-btn').addEventListener('click', hideFloatingInput);


// Figuras disponibles
const figures = {
    triangle: {
        name: 'Triángulo',
        sides: ['base', 'lado1', 'lado2', 'altura'],
        dimensions: {}
    },
    square: {
        name: 'Cuadrado', 
        sides: ['lado'],
        dimensions: {}
    },
    rectangle: {
        name: 'Rectángulo',
        sides: ['base', 'altura'],
        dimensions: {}
    },
    cube: {
        name: 'Cubo',
        sides: ['arista'],
        dimensions: {}
    },
    pyramid: {
        name: 'Pirámide',
        sides: ['lado_base', 'altura'],
        dimensions: {}
    },
    prism: {
        name: 'Prisma Rectangular',
        sides: ['largo', 'ancho', 'alto'],
        dimensions: {}
    }
};

// Puntos del triángulo (coordenadas)
const pointsTriangle = [
    { x: 150, y: 50, id: 'vertexA', label: 'A' },  // Vértice superior
    { x: 100, y: 150, id: 'vertexB', label: 'B' }, // Vértice izquierdo
    { x: 200, y: 150, id: 'vertexC', label: 'C' }  // Vértice derecho
];
const pointsHeightTriangle = 
    [
        { x: 150, y: 50 },
        { x: 150, y: 150 }
    ]; 

const pointsSquare = [
    { x: 100, y: 50, id: 'vertexA', label: 'A' },  // Esquina superior izquierda
    { x: 200, y: 50, id: 'vertexB', label: 'B' },  // Esquina superior derecha
    { x: 200, y: 150, id: 'vertexC', label: 'C' },  // Esquina inferior derecha
    { x: 100, y: 150, id: 'vertexD', label: 'D' }   // Esquina inferior izquierda
];

const pointsRectangle = [
    { x: 75, y: 50, id: 'vertexA', label: 'A' },  // Esquina superior izquierda
    { x: 215, y: 50, id: 'vertexB', label: 'B' },  // Esquina superior derecha
    { x: 215, y: 150, id: 'vertexC', label: 'C' },  // Esquina inferior derecha
    { x: 75, y: 150, id: 'vertexD', label: 'D' }   // Esquina inferior izquierda
];

const pointsCube = [
    // Cara frontal (cuadrado base)
    { x: 100, y: 150, id: 'vertexA', label: 'A' },  // Esquina inferior izquierda frontal
    { x: 200, y: 150, id: 'vertexB', label: 'B' },  // Esquina inferior derecha frontal
    { x: 200, y: 50, id: 'vertexC', label: 'C' },   // Esquina superior derecha frontal
    { x: 100, y: 50, id: 'vertexD', label: 'D' },   // Esquina superior izquierda frontal
    
    // Cara trasera (desplazada para efecto 3D)
    { x: 150, y: 200, id: 'vertexE', label: 'E' },  // Esquina inferior izquierda trasera
    { x: 250, y: 200, id: 'vertexF', label: 'F' },  // Esquina inferior derecha trasera
    { x: 250, y: 100, id: 'vertexG', label: 'G' },  // Esquina superior derecha trasera
    { x: 150, y: 100, id: 'vertexH', label: 'H' }   // Esquina superior izquierda trasera
];

const pointsPyramid = [
    // Base cuadrada
    { x: 100, y: 180, id: 'vertexA', label: 'A' },  // Esquina inferior izquierda
    { x: 200, y: 180, id: 'vertexB', label: 'B' },  // Esquina inferior derecha
    { x: 200, y: 80, id: 'vertexC', label: 'C' },   // Esquina superior derecha
    { x: 100, y: 80, id: 'vertexD', label: 'D' },   // Esquina superior izquierda
    
    // Vértice superior (cúspide)
    { x: 150, y: 30, id: 'vertexE', label: 'E' }    // Cúspide de la pirámide
];

const pointsPrism = [
    // Cara frontal inferior
    { x: 100, y: 150, id: 'vertexA', label: 'A' },  // Esquina inferior izquierda frontal
    { x: 180, y: 150, id: 'vertexB', label: 'B' },  // Esquina inferior derecha frontal
    { x: 180, y: 80, id: 'vertexC', label: 'C' },   // Esquina superior derecha frontal
    { x: 100, y: 80, id: 'vertexD', label: 'D' },   // Esquina superior izquierda frontal
    
    // Cara trasera inferior (desplazada)
    { x: 130, y: 180, id: 'vertexE', label: 'E' },  // Esquina inferior izquierda trasera
    { x: 210, y: 180, id: 'vertexF', label: 'F' },  // Esquina inferior derecha trasera
    { x: 210, y: 110, id: 'vertexG', label: 'G' },  // Esquina superior derecha trasera
    { x: 130, y: 110, id: 'vertexH', label: 'H' },  // Esquina superior izquierda trasera
    
    // Puntos para las dimensiones
    { x: 100, y: 150, id: 'largoInf', label: 'LI' },   // Para largo (frontal)
    { x: 180, y: 150, id: 'largoSup', label: 'LS' },   // Para largo (frontal)
    { x: 100, y: 150, id: 'anchoInf', label: 'AI' },   // Para ancho (lateral)
    { x: 130, y: 180, id: 'anchoSup', label: 'AS' },   // Para ancho (lateral)
    { x: 100, y: 150, id: 'altoInf', label: 'ALI' },   // Para alto (vertical)
    { x: 100, y: 80, id: 'altoSup', label: 'ALS' }     // Para alto (vertical)
];

// Event listeners para los botones
document.getElementById('btn-triangle').addEventListener('click', () => loadAndDrawFigure('triangle'));
document.getElementById('btn-square').addEventListener('click', () => loadAndDrawFigure('square'));
document.getElementById('btn-rectangle').addEventListener('click', () => loadAndDrawFigure('rectangle'));
document.getElementById('btn-cube').addEventListener('click', () => loadAndDrawFigure('cube'));
document.getElementById('btn-pyramid').addEventListener('click', () => loadAndDrawFigure('pyramid'));
document.getElementById('btn-prism').addEventListener('click', () => loadAndDrawFigure('prism'));
// Input flotante
document.getElementById('confirm-btn').addEventListener('click', confirmDimension);

document.addEventListener('click', (event) => {
    const floatingInput = document.getElementById('floating-input');
    const isClickInsideInput = floatingInput.contains(event.target);
    
    if (!floatingInput.classList.contains('floating-input-hidden') && !isClickInsideInput) {
        hideFloatingInput();
    }
});

function hideFloatingInput() {
    const floatingInput = document.getElementById('floating-input');
    floatingInput.className = 'floating-input-hidden';
    selectedElement = null;
}


function loadAndDrawFigure(figureType) {
    const canvas = document.getElementById('figure-canvas');
    
    switch(figureType) {
        case 'triangle':
            drawFigure(canvas, pointsTriangle, pointsHeightTriangle);
            currentFigure = 'triangle'; 
            break;
        case 'square':
            drawFigure(canvas, pointsSquare);
            currentFigure = 'square'; 
            break;
        case 'rectangle':
            drawFigure(canvas, pointsRectangle);
            currentFigure = 'rectangle'; 
            break;
        case 'cube':
            drawCube(canvas, pointsCube);
            currentFigure = 'cube'; 
            break;
        case 'pyramid':
            drawPyramid(canvas, pointsPyramid);
            currentFigure = 'pyramid'; 
            break;
        case 'prism':
            drawPrism(canvas, pointsPrism);
            currentFigure = 'prism'; 
            break;
    }
}

function confirmDimension() {
    const dimensionInput = document.getElementById('dimension-input');
    const value = parseFloat(dimensionInput.value);
    
    if (isNaN(value) || value <= 0) {
        dimensionInput.placeholder ='Ingresa un valor válido';
        return;
    }
    
    if (selectedElement && currentFigure === 'triangle') {
        figures.triangle.dimensions[selectedElement.id] = value;  
        calculateTriangleResults();  
        
    } else if (selectedElement && currentFigure === 'square') {
        figures.square.dimensions.lado = value;
        calculateSquareResults();
        
    } else if (selectedElement && currentFigure === 'rectangle') {
        if (selectedElement.id === 'sideAB' || selectedElement.id === 'sideCD') {
            figures.rectangle.dimensions.base = value;
        } else if (selectedElement.id === 'sideBC' || selectedElement.id === 'sideDA') {
            figures.rectangle.dimensions.altura = value;
        } else {
            figures.rectangle.dimensions[selectedElement.id] = value;
        }
        calculateRectangleResults();
        
    } else if (selectedElement && currentFigure === 'cube') {
        figures.cube.dimensions.arista = value;
        calculateCubeResults();
        
    } else if (selectedElement && currentFigure === 'pyramid') {
        if (selectedElement.id === 'lado_base') {
            figures.pyramid.dimensions.lado_base = value;
        } else if (selectedElement.id === 'altura') {
            figures.pyramid.dimensions.altura = value;
        } else {
            figures.pyramid.dimensions[selectedElement.id] = value;
        }
        calculatePyramidResults();
        
    } else if (selectedElement && currentFigure === 'prism') {
        figures.prism.dimensions[selectedElement.id] = value;
        calculatePrismResults();
    }

    document.getElementById('floating-input').className = 'floating-input-hidden';       
}



function getSquareElementName(elementId) {
    const names = {
        'lado': 'Lado',
        'sideAB': 'Lado AB',
        'sideBC': 'Lado BC', 
        'sideCD': 'Lado CD',
        'sideDA': 'Lado DA'
    };
    return names[elementId] || elementId;
}



function getElementName(elementId) {
    const names = {
        // Triángulo
        'sideAB': 'Lado AB',
        'sideBC': 'Lado BC',
        'sideCA': 'Lado CA',
        'altitude': 'Altura',
        
        // Rectángulo
        'base': 'Base',
        'altura': 'Altura',
        'sideAB': 'Base AB', 
        'sideBC': 'Altura BC',
        'sideCD': 'Base CD', 
        'sideDA': 'Altura DA'
    };
    return names[elementId] || elementId;
}

function showFloatingInput(x, y, elementId, elementType) {
    const floatingInput = document.getElementById('floating-input');
    const dimensionInput = document.getElementById('dimension-input');
    const canvas = document.getElementById('figure-canvas');
    
    const canvasRect = canvas.getBoundingClientRect();
    floatingInput.style.left = `${canvasRect.left + x + 20}px`;
    floatingInput.style.top = `${canvasRect.top + y + 20}px`;
    floatingInput.className = 'floating-input-visible';
    
    selectedElement = { id: elementId, type: elementType };
    
    if (currentFigure === 'square') {
        dimensionInput.placeholder = 'Ingresa lado';
    } else if (currentFigure === 'rectangle') {
        if (elementId === 'sideAB' || elementId === 'sideCD') {
            dimensionInput.placeholder = 'Ingresa base';
        } else if (elementId === 'sideBC' || elementId === 'sideDA') {
            dimensionInput.placeholder = 'Ingresa altura';
        }
    } else if (currentFigure === 'cube') {
        dimensionInput.placeholder = 'Ingresa arista';
    } else {
        dimensionInput.placeholder = `Ingresa ${elementType}`;
    }
    
    dimensionInput.value = '';
    dimensionInput.focus();

    floatingInput.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

