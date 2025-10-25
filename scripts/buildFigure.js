const svgNS = "http://www.w3.org/2000/svg";

function drawFigure(canvas, points, heightPoints) {
    // Limpiar canvas
    canvas.innerHTML = '';

    // Crear SVG 
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 300 200");

    // Crear polígono
    const figure = document.createElementNS(svgNS, "polygon");
    figure.setAttribute("points", points.map(point => `${point.x},${point.y}`).join(" "));
    figure.setAttribute("fill", "#E3F2FD");
    figure.setAttribute("stroke", "#4E61D3");
    figure.setAttribute("stroke-width", "2");

    // Agregar la figura primero
    svg.appendChild(figure);

    // Dibujar lados clicables
    for (let i = 0; i < points.length; i++) {
        const nextIndex = (i + 1) % points.length;

        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", points[i].x);
        line.setAttribute("y1", points[i].y);
        line.setAttribute("x2", points[nextIndex].x);
        line.setAttribute("y2", points[nextIndex].y);
        line.setAttribute("stroke", "#4E61D3");
        line.setAttribute("stroke-width", "10");
        line.setAttribute("stroke-linecap", "round");
        line.setAttribute("opacity", "0.3");
        line.classList.add("clickable-element");

        line.addEventListener('click', (e) => {
            e.stopPropagation();
            const sideId = `side${points[i].label}${points[nextIndex].label}`;
            const midpoint = {
                x: (points[i].x + points[nextIndex].x) / 2,
                y: (points[i].y + points[nextIndex].y) / 2
            };
            showFloatingInput(midpoint.x, midpoint.y, sideId, 'lado');
        });

        svg.appendChild(line);
    }

    // Dibujar altura
    if (heightPoints) {
        const altitudeLine = document.createElementNS(svgNS, "line");
        altitudeLine.setAttribute("x1", heightPoints[0].x);
        altitudeLine.setAttribute("y1", heightPoints[0].y);
        altitudeLine.setAttribute("x2", heightPoints[1].x);
        altitudeLine.setAttribute("y2", heightPoints[1].y);
        altitudeLine.setAttribute("stroke", "#4CAF50");
        altitudeLine.setAttribute("stroke-width", "2");
        altitudeLine.setAttribute("stroke-dasharray", "5,5");
        altitudeLine.classList.add("clickable-element");

        altitudeLine.addEventListener('click', (e) => {
            e.stopPropagation();
            showFloatingInput(heightPoints[0].x, (heightPoints[0].y + heightPoints[1].y) / 2, 'altitude', 'altura');
        });

        svg.appendChild(altitudeLine);
    }

    canvas.appendChild(svg);
}


function drawCube(canvas, points) {
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Limpiar canvas
    canvas.innerHTML = '';
    
    // Crear SVG
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 350 250");

    // Definir las caras del cubo con diferentes colores para mejor visualización
    const caras = [
        // Cara frontal
        { indices: [0, 1, 2, 3], fill: "#E3F2FD", stroke: "#4E61D3", name: "frontal" },
        // Cara superior
        { indices: [3, 2, 6, 7], fill: "#F3E5F5", stroke: "#7B1FA2", name: "superior" },
        // Cara lateral derecha
        { indices: [1, 2, 6, 5], fill: "#E8F5E8", stroke: "#388E3C", name: "derecha" }
    ];

    // Dibujar caras sólidas
    caras.forEach(cara => {
        const polygon = document.createElementNS(svgNS, "polygon");
        const pointsStr = cara.indices.map(idx => `${points[idx].x},${points[idx].y}`).join(" ");
        polygon.setAttribute("points", pointsStr);
        polygon.setAttribute("fill", cara.fill);
        polygon.setAttribute("stroke", cara.stroke);
        polygon.setAttribute("stroke-width", "2");
        polygon.setAttribute("fill-opacity", "0.7");
        svg.appendChild(polygon);
    });

    // Definir todas las aristas para interactividad
    const aristas = [
        // Cara frontal
        { start: 0, end: 1, id: 'aristaAB', label: 'AB' },
        { start: 1, end: 2, id: 'aristaBC', label: 'BC' },
        { start: 2, end: 3, id: 'aristaCD', label: 'CD' },
        { start: 3, end: 0, id: 'aristaDA', label: 'DA' },
        
        // Cara trasera
        { start: 4, end: 5, id: 'aristaEF', label: 'EF' },
        { start: 5, end: 6, id: 'aristaFG', label: 'FG' },
        { start: 6, end: 7, id: 'aristaGH', label: 'GH' },
        { start: 7, end: 4, id: 'aristaHE', label: 'HE' },
        
        // Aristas laterales
        { start: 0, end: 4, id: 'aristaAE', label: 'AE' },
        { start: 1, end: 5, id: 'aristaBF', label: 'BF' },
        { start: 2, end: 6, id: 'aristaCG', label: 'CG' },
        { start: 3, end: 7, id: 'aristaDH', label: 'DH' }
    ];

    // Dibujar aristas interactivas
    aristas.forEach(arista => {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", points[arista.start].x);
        line.setAttribute("y1", points[arista.start].y);
        line.setAttribute("x2", points[arista.end].x);
        line.setAttribute("y2", points[arista.end].y);
        line.setAttribute("stroke", "#FF6B6B");
        line.setAttribute("stroke-width", "8");
        line.setAttribute("stroke-linecap", "round");
        line.setAttribute("opacity", "0.3");
        line.classList.add("clickable-element");

        line.addEventListener('click', (e) => {
            e.stopPropagation();
            const midpoint = {
                x: (points[arista.start].x + points[arista.end].x) / 2,
                y: (points[arista.start].y + points[arista.end].y) / 2
            };
            showFloatingInput(midpoint.x, midpoint.y, 'arista', 'arista');
        });

        svg.appendChild(line);
    });

    canvas.appendChild(svg);
}

function drawPyramid(canvas, points) {
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Limpiar canvas
    canvas.innerHTML = '';
    
    // Crear SVG
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 300 250");

    // Dibujar base (semitransparente para ver las aristas detrás)
    const base = document.createElementNS(svgNS, "polygon");
    base.setAttribute("points", `${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y} ${points[3].x},${points[3].y}`);
    base.setAttribute("fill", "#E3F2FD");
    base.setAttribute("stroke", "#4E61D3");
    base.setAttribute("stroke-width", "2");
    base.setAttribute("fill-opacity", "0.5");
    svg.appendChild(base);

    // Dibujar caras triangulares (solo contornos)
    const carasTriangulares = [
        { points: [0, 1, 4], fill: "#F3E5F5", stroke: "#7B1FA2" },  // Cara frontal
        { points: [1, 2, 4], fill: "#E8F5E8", stroke: "#388E3C" },  // Cara derecha
        { points: [2, 3, 4], fill: "#FFF3E0", stroke: "#F57C00" },  // Cara trasera
        { points: [3, 0, 4], fill: "#FBE9E7", stroke: "#D84315" }   // Cara izquierda
    ];

    carasTriangulares.forEach(cara => {
        const triangle = document.createElementNS(svgNS, "polygon");
        const pointsStr = cara.points.map(idx => `${points[idx].x},${points[idx].y}`).join(" ");
        triangle.setAttribute("points", pointsStr);
        triangle.setAttribute("fill", cara.fill);
        triangle.setAttribute("stroke", cara.stroke);
        triangle.setAttribute("stroke-width", "2");
        triangle.setAttribute("fill-opacity", "0.3");
        svg.appendChild(triangle);
    });

    const aristas = [
        // Aristas de la base
        { start: 0, end: 1, id: 'baseAB', label: 'AB', type: 'lado_base' },
        { start: 1, end: 2, id: 'baseBC', label: 'BC', type: 'lado_base' },
        { start: 2, end: 3, id: 'baseCD', label: 'CD', type: 'lado_base' },
        { start: 3, end: 0, id: 'baseDA', label: 'DA', type: 'lado_base' },
        
        // Aristas laterales (desde base hasta cúspide)
        { start: 0, end: 4, id: 'aristaAE', label: 'AE', type: 'arista_lateral' },
        { start: 1, end: 4, id: 'aristaBE', label: 'BE', type: 'arista_lateral' },
        { start: 2, end: 4, id: 'aristaCE', label: 'CE', type: 'arista_lateral' },
        { start: 3, end: 4, id: 'aristaDE', label: 'DE', type: 'arista_lateral' }
    ];

    // Dibujar aristas interactivas
    aristas.forEach(arista => {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", points[arista.start].x);
        line.setAttribute("y1", points[arista.start].y);
        line.setAttribute("x2", points[arista.end].x);
        line.setAttribute("y2", points[arista.end].y);
        line.setAttribute("stroke", "#FF6B6B");
        line.setAttribute("stroke-width", "8");
        line.setAttribute("stroke-linecap", "round");
        line.setAttribute("opacity", "0.3");
        line.classList.add("clickable-element");

        line.addEventListener('click', (e) => {
            e.stopPropagation();
            const midpoint = {
                x: (points[arista.start].x + points[arista.end].x) / 2,
                y: (points[arista.start].y + points[arista.end].y) / 2
            };
            
            // Determinar qué tipo de elemento es
            let elementType = 'arista';
            if (arista.type === 'lado_base') {
                elementType = 'lado_base';
            } else if (arista.type === 'arista_lateral') {
                elementType = 'arista_lateral';
            }
            
            showFloatingInput(midpoint.x, midpoint.y, arista.type, elementType);
        });

        svg.appendChild(line);
    });

    // Dibujar altura 
    const centroBase = {
        x: (points[0].x + points[1].x + points[2].x + points[3].x) / 4,
        y: (points[0].y + points[1].y + points[2].y + points[3].y) / 4
    };
    
    const alturaLine = document.createElementNS(svgNS, "line");
    alturaLine.setAttribute("x1", centroBase.x);
    alturaLine.setAttribute("y1", centroBase.y);
    alturaLine.setAttribute("x2", points[4].x);
    alturaLine.setAttribute("y2", points[4].y);
    alturaLine.setAttribute("stroke", "#4CAF50");
    alturaLine.setAttribute("stroke-width", "2");
    alturaLine.setAttribute("stroke-dasharray", "5,5");
    alturaLine.classList.add("clickable-element");

    alturaLine.addEventListener('click', (e) => {
        e.stopPropagation();
        const midpoint = {
            x: (centroBase.x + points[4].x) / 2,
            y: (centroBase.y + points[4].y) / 2
        };
        showFloatingInput(midpoint.x, midpoint.y, 'altura', 'altura');
    });

    svg.appendChild(alturaLine);

    canvas.appendChild(svg);
}

function drawPrism(canvas, points) {
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Limpiar canvas
    canvas.innerHTML = '';
    
    // Crear SVG
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 300 250");

    // Definir las caras visibles del prisma
    const caras = [
        // Cara frontal
        { indices: [0, 1, 2, 3], fill: "#E3F2FD", stroke: "#4E61D3", name: "frontal" },
        // Cara lateral derecha
        { indices: [1, 2, 6, 5], fill: "#F3E5F5", stroke: "#7B1FA2", name: "derecha" },
        // Cara superior
        { indices: [2, 3, 7, 6], fill: "#E8F5E8", stroke: "#388E3C", name: "superior" }
    ];

    // Dibujar caras 
    caras.forEach(cara => {
        const polygon = document.createElementNS(svgNS, "polygon");
        const pointsStr = cara.indices.map(idx => `${points[idx].x},${points[idx].y}`).join(" ");
        polygon.setAttribute("points", pointsStr);
        polygon.setAttribute("fill", cara.fill);
        polygon.setAttribute("stroke", cara.stroke);
        polygon.setAttribute("stroke-width", "2");
        polygon.setAttribute("fill-opacity", "0.6");
        svg.appendChild(polygon);
    });

    // Elementos interactivos para dimensiones
    const dimensiones = [
        // Largo (cara frontal)
        {
            points: [8, 9], 
            id: 'largo',
            label: 'Largo',
            stroke: "#FF6B6B",
            strokeWidth: "8"
        },
        // Ancho (profundidad)
        {
            points: [10, 11],  
            id: 'ancho',
            label: 'Ancho',
            stroke: "#4CAF50",
            strokeWidth: "8"
        },
        // Alto
        {
            points: [12, 13], 
            id: 'alto',
            label: 'Alto',
            stroke: "#2196F3", 
            strokeWidth: "8"
        }
    ];

    // Dibujar dimensiones interactivas
    dimensiones.forEach(dim => {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", points[dim.points[0]].x);
        line.setAttribute("y1", points[dim.points[0]].y);
        line.setAttribute("x2", points[dim.points[1]].x);
        line.setAttribute("y2", points[dim.points[1]].y);
        line.setAttribute("stroke", dim.stroke);
        line.setAttribute("stroke-width", dim.strokeWidth);
        line.setAttribute("stroke-linecap", "round");
        line.setAttribute("opacity", "0.4");
        line.classList.add("clickable-element");

        line.addEventListener('click', (e) => {
            e.stopPropagation();
            const midpoint = {
                x: (points[dim.points[0]].x + points[dim.points[1]].x) / 2,
                y: (points[dim.points[0]].y + points[dim.points[1]].y) / 2
            };
            showFloatingInput(midpoint.x, midpoint.y, dim.id, dim.label.toLowerCase());
        });

        svg.appendChild(line);
    });

    

    canvas.appendChild(svg);
}