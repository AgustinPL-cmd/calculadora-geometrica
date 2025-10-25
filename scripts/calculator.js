function calculateTriangleResults() {
    const dim = figures.triangle.dimensions;
    const resultsDiv = document.getElementById('results');
    
    let resultsHTML = '<h3>Triángulo</h3>';
    
    // Mostrar dimensiones ingresadas
    resultsHTML += '<div class="dimensions-list">';
    for (const [key, value] of Object.entries(dim)) {
        resultsHTML += `<p><strong>${getElementName(key)}:</strong> ${value}</p>`;
    }
    resultsHTML += '</div>';
    
    // Calcular área y perímetro si tenemos los datos necesarios
    if (dim.sideAB && dim.sideBC && dim.sideCA) {
        const perimeter = dim.sideAB + dim.sideBC + dim.sideCA;
        resultsHTML += `<p><strong>Perímetro:</strong> ${perimeter.toFixed(2)}</p>`;
    }
    
    if (dim.sideBC && dim.altitude) {
        const area = (dim.sideBC * dim.altitude) / 2;
        resultsHTML += `<p><strong>Área:</strong> ${area.toFixed(2)}</p>`;
    }
    
    resultsDiv.innerHTML = resultsHTML;
}

function calculateSquareResults() {
    const dim = figures.square.dimensions;
    const resultsDiv = document.getElementById('results');
    
    let resultsHTML = '<h3>Cuadrado</h3>';
    
    resultsHTML += '<div class="dimensions-list">';
    if (dim.lado) {
        resultsHTML += `<p><strong>Lado:</strong> ${dim.lado}</p>`;
    }
    resultsHTML += '</div>';
    
    // Calcular área y perímetro
    if (dim.lado) {
        const perimeter = 4 * dim.lado;
        const area = dim.lado * dim.lado;
        resultsHTML += `<p><strong>Perímetro:</strong> ${perimeter.toFixed(2)}</p>`;
        resultsHTML += `<p><strong>Área:</strong> ${area.toFixed(2)}</p>`;
    } else {
        resultsHTML += `<p>Ingresa la longitud de un lado para calcular perímetro y área</p>`;
    }

    resultsDiv.innerHTML = resultsHTML;
}

function calculateRectangleResults() {
    const dim = figures.rectangle.dimensions;
    const resultsDiv = document.getElementById('results');
    
    let resultsHTML = '<h3>Rectángulo</h3>';
    
    // Determinar la última base y altura registradas
    let ultimaBase = null;
    let ultimaAltura = null;
    
    // Buscar la última base registrada (prioridad: base explícita > lados base)
    if (dim.base) {
        ultimaBase = dim.base;
    } else {
        // Buscar entre los lados que representan base
        if (dim.sideAB) ultimaBase = dim.sideAB;
        else if (dim.sideCD) ultimaBase = dim.sideCD;
    }
    
    if (dim.altura) {
        ultimaAltura = dim.altura;
    } else {
        if (dim.sideBC) ultimaAltura = dim.sideBC;
        else if (dim.sideDA) ultimaAltura = dim.sideDA;
    }
    
    resultsHTML += '<div class="dimensions-list">';
    if (ultimaBase) {
        resultsHTML += `<p><strong>Base:</strong> ${ultimaBase}</p>`;
    }
    if (ultimaAltura) {
        resultsHTML += `<p><strong>Altura:</strong> ${ultimaAltura}</p>`;
    }
    resultsHTML += '</div>';
    
    if (ultimaBase && ultimaAltura) {
        const perimeter = 2 * (ultimaBase + ultimaAltura);
        const area = ultimaBase * ultimaAltura;
        resultsHTML += `<p><strong>Perímetro:</strong> ${perimeter.toFixed(2)}</p>`;
        resultsHTML += `<p><strong>Área:</strong> ${area.toFixed(2)}</p>`;
    } else if (ultimaBase || ultimaAltura) {
        resultsHTML += `<p>Ingresa tanto la base como la altura para calcular perímetro y área</p>`;
    } else {
        resultsHTML += `<p>Ingresa las dimensiones del rectángulo</p>`;
    }

    resultsDiv.innerHTML = resultsHTML;
}

function calculateCubeResults() {
    const dim = figures.cube.dimensions;
    const resultsDiv = document.getElementById('results');
    
    let resultsHTML = '<h3>Cubo</h3>';
    
    // Mostrar arista
    resultsHTML += '<div class="dimensions-list">';
    if (dim.arista) {
        resultsHTML += `<p><strong>Arista:</strong> ${dim.arista}</p>`;
    }
    resultsHTML += '</div>';
    
    // Calcular volumen y área superficial
    if (dim.arista) {
        const volumen = dim.arista * dim.arista * dim.arista;
        resultsHTML += `<p><strong>Volumen:</strong> ${volumen.toFixed(2)}</p>`;
    } else {
        resultsHTML += `<p>Ingresa la longitud de la arista para calcular volumen y área</p>`;
    }

    resultsDiv.innerHTML = resultsHTML;
}

function calculatePyramidResults() {
    const dim = figures.pyramid.dimensions;
    const resultsDiv = document.getElementById('results');
    
    let resultsHTML = '<h3>Pirámide (base cuadrada)</h3>';
    
    resultsHTML += '<div class="dimensions-list">';
    if (dim.lado_base) {
        resultsHTML += `<p><strong>Lado de la base:</strong> ${dim.lado_base}</p>`;
    }
    if (dim.altura) {
        resultsHTML += `<p><strong>Altura:</strong> ${dim.altura}</p>`;
    }
    resultsHTML += '</div>';
    
    // Calcular volumen 
    if (dim.lado_base && dim.altura) {
        const volumen = (dim.lado_base * dim.lado_base * dim.altura) / 3;
        
       
        
        resultsHTML += `<p><strong>Volumen:</strong> ${volumen.toFixed(2)}</p>`;
       
    } else if (dim.lado_base || dim.altura) {
        resultsHTML += `<p>Ingresa tanto el lado de la base como la altura para calcular volumen y área</p>`;
    } else {
        resultsHTML += `<p>Ingresa las dimensiones de la pirámide</p>`;
    }

    resultsDiv.innerHTML = resultsHTML;
}

function calculatePrismResults() {
    const dim = figures.prism.dimensions;
    const resultsDiv = document.getElementById('results');
    
    let resultsHTML = '<h3>Prisma Rectangular</h3>';
    
    // Mostrar dimensiones
    resultsHTML += '<div class="dimensions-list">';
    if (dim.largo) {
        resultsHTML += `<p><strong>Largo:</strong> ${dim.largo}</p>`;
    }
    if (dim.ancho) {
        resultsHTML += `<p><strong>Ancho:</strong> ${dim.ancho}</p>`;
    }
    if (dim.alto) {
        resultsHTML += `<p><strong>Alto:</strong> ${dim.alto}</p>`;
    }
    resultsHTML += '</div>';
    
    if (dim.largo && dim.ancho && dim.alto) {
        const volumen = dim.largo * dim.ancho * dim.alto;
        
        
        resultsHTML += `<p><strong>Volumen:</strong> ${volumen.toFixed(2)}</p>`;
        
    } else {
        const dimensionesFaltantes = [];
        if (!dim.largo) dimensionesFaltantes.push('largo');
        if (!dim.ancho) dimensionesFaltantes.push('ancho');
        if (!dim.alto) dimensionesFaltantes.push('alto');
        
        resultsHTML += `<p>Ingresa ${dimensionesFaltantes.join(', ')} para calcular volumen y área</p>`;
    }

    resultsDiv.innerHTML = resultsHTML;
}