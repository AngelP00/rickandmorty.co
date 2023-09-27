import getData from '../utils/getData';
import getHash from '../utils/getHash';
//import {getValorDeUnParametroDelHash,nextPage} from '../utils/funcionesUrl';
//import * as funcionesUrl from '../utils/funcionesUrl'; // Ajusta la ruta según la ubicación real de funcionesUrl.js

//const Home = async () => {

    //const characters = await getData('',3);
const FilterCharacters = async () => { // Agregamos el parámetro "page" con un valor predeterminado de 1
    let view = ``;

    console.log('FilterCharacters');
    let hash = getHash();
    //const currentPage = getValorDeUnParametroDelHash('page')? getValorDeUnParametroDelHash('page'): 1;
    console.log('er 1');
    let currentPage = getValorDeUnParametroDelHash('page');
    console.log('currentPage=',currentPage);
    if(currentPage == null){
        //console.log('El parámetro "page" no está presente en la URL.');
        currentPage =1;
        //window.location.hash = window.location.hash+`&page=${currentPage}`;
        //window.location.hash = window.location.hash+`&page=1`;
    }
    
    if(hash === '/'){
        console.log('if');
        hash = '/character';
    }
    
    //const characters = {};
    //console.log('characters=',characters);
    //agregar filtros
    const filtros = getFiltros();
    //console.log('filtros:',filtros);
    //agregar filtros
    view+=filtros;
    try {
        const characters = await getData(hash); // Pasamos el número de página como segundo argumento
        characters.results.sort((a, b) => a.name.localeCompare(b.name));
        //const characters = await getData('', '','ami'); // Pasamos el número de página como segundo argumento
        //view+=getPaginator(1,currentPage,characters.info.pages);
        view += `
            <!--
            <div>
                <div style="display: inline;">Results: ${characters.info.count}</div>
                <div style="display: inline;">Paginas: ${characters.info.pages}</div>
            </div>
            -->
            <div style="display: inline;">Results: ${characters.info.count}</div>
            <h1>Page ${currentPage} of ${characters.info.pages}</h1>
            ${getPaginator(1,currentPage,characters.info.pages)}
            <div class="Characters">
                ${characters.results.map(character => `
                    <article class="Characters-item">
                        <a href="#/character/${character.id}">
                            <!--
                            <img src="${character.image}" alt="${character.name}" style="border: ${character.status === 'Dead' ? '7px solid red' : character.status === 'Alive' ? '7px solid green' : '7px solid gray'};">
                            -->
                            <img src="${character.image}" alt="${character.name}" class="character-image ${character.status === 'Alive' ? 'alive' : character.status === 'Dead' ? 'dead' : 'unknown'}">
                            <h2>${character.name}</h2>
                            <p>${character.species}</p>
                        </a>
                    </article>
                `).join('')}
            </div>
            <h1>Page ${currentPage} of ${characters.info.pages}</h1>

            <!--
            <div>
                <p style="display: inline;">Páginas disponibles:</p>
                <p style="display: inline;">de</p>
                <input type="button" value="Página: 1" onclick="setValorDeUnParametroDelHash('page', 1);">
                <p style="display: inline;">a</p>
                <input type="button" value="Página: ${characters.info.pages}" onclick="setValorDeUnParametroDelHash('page', ${characters.info.pages});">
            </div>
            -->

            <!--
            <input type="button" value="prevPage" onclick="prevPage();">
            <input type="button" value="nextPage" onclick="nextPage();">
            -->

            <!--
            <div>
                <p style="display: inline;">Páginas disponibles:</p>
                <input type="button" value="1" onclick="setValorDeUnParametroDelHash('page', 1);">
                <input type="button" value="<" onclick="prevPage();">
                
                <p style="display: inline; color: grey; cursor: pointer; font-size: 13px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(currentPage) - 3});">${parseInt(currentPage) - 3}</p>
                <p style="display: inline; color: grey; cursor: pointer; font-size: 15px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(currentPage) - 2});">${parseInt(currentPage) - 2}</p>
                <p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(currentPage) - 1});">${parseInt(currentPage) - 1}</p>
                
                <h3 style="display: inline;">${currentPage}</h3>

                <p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(currentPage) + 1});">${parseInt(currentPage) + 1}</p>
                <p style="display: inline; color: grey; cursor: pointer; font-size: 14px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(currentPage) + 2});">${parseInt(currentPage) + 2}</p>
                <p style="display: inline; color: grey; cursor: pointer; font-size: 13px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(currentPage) + 3});">${parseInt(currentPage) + 3}</p>

                <input type="button" value=">" onclick="nextPage();">
                <input type="button" value="${characters.info.pages}" onclick="setValorDeUnParametroDelHash('page', ${characters.info.pages});">
            </div>
            -->
        `;
        view+=getPaginator(1,currentPage,characters.info.pages);
        /*
        view+= `<div>`;
        view+= `<p style="display: inline;">Páginas disponibles:</p>`;
        if(currentPage>1){
            view+= `<input type="button" value="<" onclick="prevPage();">`;
        }
        view+= `<p>${currentPage}</p>`;
        if(currentPage<characters.info.pages){
            view+= `<input type="button" value=">" onclick="nextPage();">`;
        }
        view+= `</div>`;
        */
    } catch (error) {
        console.log('a');
        //console.error('error=', error);
        //history.back();
        //setValorDeUnParametroDelHash('page',1);
        

        let numResults;
        let maxPag = null;
        try {
            // Buscar y reemplazar el valor del parámetro "page" en la URL para ir a la pagina 1
            const parametroRegex = new RegExp(`([&?])page=[^&]*`, 'i'); //puede estar vacio
            const hashPag1 = hash.replace(parametroRegex, `$1page=1`);
            //console.log('hashPag1:',hashPag1);
            const characters = await getData(hashPag1); // Pasamos el número de página como segundo argumento
            maxPag = characters.info.pages;
            numResults = characters.info.count;
        }
        catch{

        }

        console.log('b');
        console.log('maxPag=', maxPag);
        if(error === 'There is nothing here' & maxPag != null){
            console.error('pagina no disponible');
            
            view += `
            <div style="display: inline;">Results: ${numResults}</div>
            <h1>Página ${currentPage} no disponible</h1>

            <div>
                <p style="display: inline;">Páginas disponibles:</p>
                <p style="display: inline;">de</p>
                <input type="button" value="Página: 1" onclick="setValorDeUnParametroDelHash('page', 1);">
                <p style="display: inline;">a</p>
                <input type="button" value="Página: ${maxPag}" onclick="setValorDeUnParametroDelHash('page', ${maxPag});">
            </div>

            <!--
            <input type="button" value="prevPage" onclick="prevPage();">
            <input type="button" value="nextPage" onclick="nextPage();">
            -->            
            `;
            
            //view+=getPaginator(1,currentPage,maxPag);
            
            /*
            //ir a la pagina 1 de los resultados(puede producir errores)
            const nameParametro='page';
            const nuevoValorDelParametro='1';
            const currentURL=window.location+'';
            console.log('currentURL=',currentURL);
            // Buscar y reemplazar el valor del parámetro "page" en la URL para ir a la pagina 1
            const parametroRegex = new RegExp(`([&?])page=[^&]*`, 'i'); //puede estar vacio
            const nuevaURL = currentURL.replace(parametroRegex, `$1${nameParametro}=${nuevoValorDelParametro}`);
            console.log('nuevaURL=',nuevaURL);
            
            // Reemplaza la URL actual en el historial sin la ruta que deseas eliminar
            history.replaceState(null, document.title, nuevaURL);
            //http://localhost:8080/#/character/?page=3&name=ric&gender=male&species=&status=dead
            //http://localhost:8080/#/character/?page=3&name=ric&gender=male&species=&status=
            
            // Recarga la página actual
            setValorDeUnParametroDelHash('page',1);//con el codigo de arriba la url ya está en la pagina 1 pero hice esto para llamar el router y cargue el contenido de esa pagina
            //window.location.reload();//esto recarga la pagina completa
            //ir a la pagina 1 de los resultados(puede producir errores)
            */
        }
        else if(error === 'There is nothing here'){
            console.error('pagina no disponible');
            view += `
            <div>No hay paginas para los parametros ingresados</div>        
            `;
        }
        else{
            console.error('Falló la peticion. Compruebe su conexion a internet');
            view += `
            <div>Falló la peticion. Compruebe su conexion a internet</div>
            <h1>Página ${currentPage}</h1>
            <input type="button" value="Recargar página" onclick="reloadRouter();" style="">
            <!--
            <input type="button" value="prevPage" onclick="prevPage();">
            <input type="button" value="nextPage" onclick="nextPage();">
            -->
            `;
            
        }
        
        //throw error; // Propaga el error para que se maneje en el llamador
    }
        
    
    
    //view.replace('Pagina 1','currentPage');
    //console.log(view);
    //console.log('currentPage=',currentPage);

    // crear buscador si no existe
    //const textInput = null ||  document.getElementById('textInput');
    const paginaFilterCharactersYaEstaCreada = document.getElementById('textInput') ? true: false;
    if(paginaFilterCharactersYaEstaCreada == false){
        let name = getValorDeUnParametroDelHash('name');
        if(name === null){
            //console.log('name === null');
            name='';
        }
        view=`
        <section id="buscador">
            <!-- Agregar un campo de entrada de texto -->
            <!--
            <input type="text" id="textInput" placeholder="Search character" value="${name}" onkeydown="if (event.key === 'Enter') setValorDeUnParametroDelHash('name', textInput.value);" oninput="console.log('value', textInput.value);setValorDeUnParametroDelHash('name', textInput.value);">
            -->
            <div style="display: flex; align-items: center; justify-content: center">
            <input
                type="text"
                id="textInput"
                placeholder="Search character"
                value="${name}"
                onkeydown="if (event.key === 'Enter') setValorDeUnParametroDelHash('name', textInput.value);"
                oninput="console.log('value', textInput.value);setValorDeUnParametroDelHash('name', textInput.value);"
                style="
                padding: 8px; /* Espaciado interno */
                border: 1px solid #ccc; /* Borde */
                border-radius: 4px; /* Bordes redondeados */
                font-size: 16px; /* Tamaño de fuente */
                width: 200px; /* Ancho del campo de entrada */
                "
            />
            <!--
            <span style="margin-left: -30px; cursor: pointer;" onclick="setValorDeUnParametroDelHash('name', textInput.value);" class="btn btn-unselected">🔍</span>
            -->
            
            <input style="margin-left: -45px; cursor: pointer; font-size: 20px;" type="button" value="🔍" onclick="setValorDeUnParametroDelHash('name', textInput.value);" class="btn btn-unselected">
            
            </div>


            <!-- Agregar un botón para ejecutar una acción -->
            <!--
            <button class="btn" " onclick="setValorDeUnParametroDelHash('name', textInput.value);">Search</button>
            -->
        </section>
        <section id="resultados">${view}</section>
        `;
        //console.error('se agrega el buscador');
    }
    // crear buscador si no existe
    if (paginaFilterCharactersYaEstaCreada == false) {
        //console.error('retorna la vista');
        //onsole.error('retorna la vista',view);
        return view;
    }else{
        const resultadosSection = null ||  document.getElementById('resultados');
        resultadosSection.innerHTML = view;
        return null;
    }
}

export default FilterCharacters;

function getFiltros(){
    //console.log('activar filtros');
    /*
    let name = getValorDeUnParametroDelHash('name');
    if(name === null){
        //console.log('name === null');
        name='';
    }
    */
    //const genderSelected = getValorDeUnParametroDelHash('gender');
    //console.log('gender=',genderSelected);
    function colorearBotonSeleccionado(nameParametro, valorAComparar){
        /*
        const styleSelected="background-color: green; color: white;";
        const styleNoSelected="";
        */
        const styleSelected = `
        background-color: #4CAF50; /* Verde */
        color: #ffffff; /* Blanco */
        border: 2px solid #4CAF50; /* Borde verde */
        border-radius: 4px; /* Bordes redondeados */
        padding: ; /* Espaciado interno */
        cursor: pointer; /* Cambia el cursor al pasar el mouse */
        font-size: 16px; /* Tamaño de fuente */
        `;

        const styleNoSelected = `
        background-color: #f0f0f0; /* Gris claro */
        color: #333; /* Texto oscuro */
        border: 2px solid #ccc; /* Borde gris */
        border-radius: 4px; /* Bordes redondeados */
        padding: ; /* Espaciado interno */
        cursor: pointer; /* Cambia el cursor al pasar el mouse */
        font-size: 16px; /* Tamaño de fuente */
        `;

        // Puedes aplicar estos estilos a tus botones según su estado.

        let valorDelParametroEnLaURL = getValorDeUnParametroDelHash(nameParametro)? getValorDeUnParametroDelHash(nameParametro) : '';
        //console.log('c',valorDelParametroEnLaURL ,'==', valorAComparar);

        if(valorDelParametroEnLaURL == valorAComparar){
            //return styleSelected;
            return 'btn btn-selected';
        }
        else{
            //return styleNoSelected;
            return 'btn btn-unselected';
        }
    }
    let view_filters = `
    <div>
    <!-- Agregar un campo de entrada de texto -->
    <!--
    <input type="text" id="textInput" placeholder="Buscar personaje" value="${name}" onkeydown="if (event.key === 'Enter') setValorDeUnParametroDelHash('name', textInput.value);" oninput="console.log('value', textInput.value);">
    -->
    <!-- Agregar un botón para ejecutar una acción -->
    <!--
    <button class="btn" " onclick="setValorDeUnParametroDelHash('name', textInput.value);">Enviar</button>
    -->
    
    <div>
        <p style="display: inline;">Gender:</p>
        <input type="button" value="Male" onclick="setValorDeUnParametroDelHash('gender', 'male');" class="${colorearBotonSeleccionado('gender','male')}">
        <input type="button" value="Female" onclick="setValorDeUnParametroDelHash('gender','female');" class="${colorearBotonSeleccionado('gender','female')}" >
        <input type="button" value="Unknown" onclick="setValorDeUnParametroDelHash('gender','n');" class="${colorearBotonSeleccionado('gender','n')}">
        <input type="button" value="Any gender" onclick="setValorDeUnParametroDelHash('gender','');" class="${colorearBotonSeleccionado('gender','')}">
    </div>
    <div>
        <p style="display: inline;">Status:</p>
        <input type="button" value="Alive" onclick="setValorDeUnParametroDelHash('status', 'alive');" class="${colorearBotonSeleccionado('status','alive')}">
        <input type="button" value="Dead" onclick="setValorDeUnParametroDelHash('status','dead');" class="${colorearBotonSeleccionado('status','dead')}">
        <input type="button" value="Unknown" onclick="setValorDeUnParametroDelHash('status','n');" class="${colorearBotonSeleccionado('status','n')}">
        <input type="button" value="Any status" onclick="setValorDeUnParametroDelHash('status','');" class="${colorearBotonSeleccionado('status','')}">
    </div>
    <div>
        <p style="display: inline;">Species:</p>
        <input type="button" value="Human" onclick="setValorDeUnParametroDelHash('species', 'human');" class="${colorearBotonSeleccionado('species','human')}">
        <input type="button" value="Humanoid" onclick="setValorDeUnParametroDelHash('species', 'humanoid');" class="${colorearBotonSeleccionado('species','humanoid')}">
        <input type="button" value="Alien" onclick="setValorDeUnParametroDelHash('species','alien');" class="${colorearBotonSeleccionado('species','alien')}">
        <input type="button" value="Animal" onclick="setValorDeUnParametroDelHash('species','animal');" class="${colorearBotonSeleccionado('species','animal')}">
        <input type="button" value="Any species" onclick="setValorDeUnParametroDelHash('species','');" class="${colorearBotonSeleccionado('species','')}">
    </div>
    </div>
    `;
    /*
    const filtersElement = document.getElementById("filters");
    if (!filtersElement.innerHTML.trim()) {
        // El elemento filters está vacío
        console.log("El elemento filters está vacío.");
        //filters.innerHTML = await view_filters;
        content.innerHTML = await view_filters;
    } else {
        // El elemento filters contiene contenido
        console.log("El elemento filters contiene contenido.");
    }
    */
    //content.innerHTML = view_filters;

    /*
    submitButton.addEventListener("click", function () {
            // Obtener el valor del campo de entrada de texto
            const inputValue = textInput.value;

            // Realizar alguna acción con el valor, por ejemplo, mostrarlo en la consola
            console.log("Texto ingresado:", inputValue);

            // Puedes realizar otras acciones o lógica aquí según tus necesidades

            // Obtener la URL actual
            //const currentURL = window.location.href;

            // Buscar y reemplazar el valor del parámetro "page" en la URL
            setValorDeUnParametroDelHash('name',inputValue)

            // Redirigir a la nueva URL
            //window.location.href = nuevaURL;
        });
    */

    
    return view_filters;
}

function getPaginatorEntero(minPag,currentPage,maxPag){
    console.log('minPag = ',minPag,'currentPage = ',currentPage,'maxPag = ',maxPag);
    let view = ``;
    view+=`
    <div>
        <p style="display: inline;">Páginas disponibles:</p>
        <input type="button" value="1" onclick="setValorDeUnParametroDelHash('page', 1);">
        <input type="button" value="<" onclick="prevPage();">
        
        <p style="display: inline; color: grey; cursor: pointer; font-size: 13px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(currentPage) - 3});">${parseInt(currentPage) - 3}</p>
        <p style="display: inline; color: grey; cursor: pointer; font-size: 15px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(currentPage) - 2});">${parseInt(currentPage) - 2}</p>
        <p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(currentPage) - 1});">${parseInt(currentPage) - 1}</p>
        
        <h3 style="display: inline;">${currentPage}</h3>
        <!--
        <h3 style="display: inline; color: green;">${currentPage}</h3>
        -->

        <p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(currentPage) + 1});">${parseInt(currentPage) + 1}</p>
        <p style="display: inline; color: grey; cursor: pointer; font-size: 14px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(currentPage) + 2});">${parseInt(currentPage) + 2}</p>
        <p style="display: inline; color: grey; cursor: pointer; font-size: 13px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(currentPage) + 3});">${parseInt(currentPage) + 3}</p>

        <input type="button" value=">" onclick="nextPage();">
        <input type="button" value="${maxPag}" onclick="setValorDeUnParametroDelHash('page', ${maxPag});">
    </div>
    `;
    return view;
}


function getPaginatorAnterior(minPag,currentPage,maxPag){
    console.log('minPag = ',minPag,'currentPage = ',currentPage,'maxPag = ',maxPag);
    let view = ``;
    view+=`
    <div>
        <!--
        <p style="display: inline;">Páginas disponibles:</p>
        -->
    `;
    /*
    if(currentPage>minPag){
        view+=`
        <input type="button" value="1" onclick="setValorDeUnParametroDelHash('page', 1);">
        <input type="button" value="<" onclick="prevPage();">
    `;
    }
    */
    view+=`
        <input type="button" value="1" onclick="setValorDeUnParametroDelHash('page', 1);">
    `;
    if(currentPage>minPag){
        view+=`
        <input type="button" value="<" onclick="prevPage();">
    `;
    }
    function fB(minPag,currentPage,maxPag, num,font){
        currentPage = parseInt(currentPage)
        num = parseInt(num)
        if((currentPage+num)>=minPag & (currentPage+num)<=maxPag){
            return `<p style="display: inline; color: grey; cursor: pointer; font-size: ${font};" onclick="setValorDeUnParametroDelHash('page', ${parseInt(currentPage) + num});"> ${parseInt(currentPage) + num} </p>`;
        }
        else{
            return `<div style="display: inline;"> - </div>`;
        }
    }
    view+= fB(minPag,currentPage,maxPag, -3,'10px');
    view+= fB(minPag,currentPage,maxPag, -2,'14px');
    view+= fB(minPag,currentPage,maxPag, -1,'16px');
    
    view+=`
        
        <h3 style="display: inline;">${currentPage}</h3>
        <!--
        <h3 style="display: inline; color: green;">${currentPage}</h3>
        -->
    `;
    view+= fB(minPag,currentPage,maxPag, 1,'16px');
    view+= fB(minPag,currentPage,maxPag, 2,'14px');
    view+= fB(minPag,currentPage,maxPag, 3,'10px');

    /*
    if(currentPage<maxPag){
        view+=`
        <input type="button" value=">" onclick="nextPage();">
        <input type="button" value="${maxPag}" onclick="setValorDeUnParametroDelHash('page', ${maxPag});">
    `;
    }*/
    
    if(currentPage<maxPag){
        view+=`
        <input type="button" value=">" onclick="nextPage();">
    `;
    }
    view+=`
    <input type="button" value="${maxPag}" onclick="setValorDeUnParametroDelHash('page', ${maxPag});">
    </div>
    `;

    return view;
}

function getPaginator(minPag,currentPage,maxPag){
    console.log('minPag = ',minPag,'currentPage = ',currentPage,'maxPag = ',maxPag);
    let view = ``;
    view+=`
    <!--
    <div style="text-align-last: justify;">
    -->
    <div style="">
        <!--
        <p style="display: inline;">Páginas disponibles:</p>
        -->
    `;
    /*
    if(currentPage>minPag){
        view+=`
        <input type="button" value="1" onclick="setValorDeUnParametroDelHash('page', 1);">
        <input type="button" value="<" onclick="prevPage();">
    `;
    }
    */
    /*
    view+=`
        <input type="button" value="1" onclick="setValorDeUnParametroDelHash('page', 1);">
    `;
    */
    

    /*
    if(currentPage>minPag){
        view+=`
        <input type="button" value="<" onclick="prevPage();">
    `;
    }
    */
   /*
    if(currentPage>minPag){
        //view+= fB(minPag,currentPage,maxPag, -(currentPage-1),'16px');
        view+=`<p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${minPag});">-    primerPag. </p>`;
    }
    */
    /*
    view+=`<p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${minPag});">First page. </p>`;
    */
    view+=`
    <div style="display: flex; justify-content: space-between;">
    <p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${minPag});">First page. </p>
    <p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${maxPag});"> Last Page.</p>
    </div>
    `;
    view+=`
    <div style="text-align-last: justify;">
    <input type="button" value="<" onclick="prevPage();" class="btn btn-unselected">
    `;
    
    function fB(minPag,currentPage,maxPag, num,font){
        currentPage = parseInt(currentPage)
        num = parseInt(num)
        if((currentPage+num)>=minPag & (currentPage+num)<=maxPag){
            return `<p style="display: inline; color: grey; cursor: pointer; font-size: ${font};" onclick="setValorDeUnParametroDelHash('page', ${parseInt(currentPage) + num});"> ${parseInt(currentPage) + num} </p>`;
        }
        else{
            //return `<p style="display: inline; color: grey; cursor: pointer; font-size: ${font};" onclick=""> - </p>`;
            return ``;
        }
    }
    view+= fB(minPag,currentPage,maxPag, -3,'10px');
    view+= fB(minPag,currentPage,maxPag, -2,'14px');
    view+= fB(minPag,currentPage,maxPag, -1,'16px');
    
    view+=`
        
        <h3 style="display: inline;">${currentPage}</h3>
        <!--
        <h3 style="display: inline; color: green;">${currentPage}</h3>
        -->
    `;
    view+= fB(minPag,currentPage,maxPag, 1,'16px');
    view+= fB(minPag,currentPage,maxPag, 2,'14px');
    view+= fB(minPag,currentPage,maxPag, 3,'10px');

    /*
    if(currentPage<maxPag){
        view+=`
        <input type="button" value=">" onclick="nextPage();">
        <input type="button" value="${maxPag}" onclick="setValorDeUnParametroDelHash('page', ${maxPag});">
    `;
    }*/

    /*
    currentPage 
    */
    /*
    if(currentPage<maxPag){
        view+=`
        <input type="button" value=">" onclick="nextPage();">
        `;
        //view+= fB(minPag,currentPage,maxPag, maxPag-currentPage,'16px');
        view+=`<p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${maxPag});"> ${maxPag} </p>`;
    }
    */
    if(currentPage<maxPag){
        view+=`
        <input type="button" value=">" onclick="nextPage();" class="btn btn-unselected">
        `;
    }else{
        view+=`
        <input type="button" value=">" onclick="" class="btn btn-unselected">
        `;
    }
    
    /*
    if(currentPage<maxPag){
        //view+= fB(minPag,currentPage,maxPag, maxPag-currentPage,'16px');
        view+=`<p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${maxPag});"> ultimaPag.    -</p>`;
    }
    */
    
    view+=`</div>`;
    /*
    view+=`<p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${maxPag});"> Last Page.</p>`; 
    */

    view+=`
    </div>
    `;
    /*
    view+=`
    <input type="button" value="${maxPag}" onclick="setValorDeUnParametroDelHash('page', ${maxPag});">
    </div>
    `;
    */

    return view;
}