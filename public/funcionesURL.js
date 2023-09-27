//let currentPage = 1; // Variable para el número de página actual

/*
function getValorDeUnParametroDelHashDexURLDexURL(nameParametro) {
    // Obtener la cadena de búsqueda de parámetros (después del "?")
    const searchParams = getsearchParams();
    // Verificar si hay búsqueda de parámetros
    if (searchParams !== null) {
        // Crear un objeto URLSearchParams a partir de la cadena de búsqueda de parámetros
        const urlSearchParams = new URLSearchParams(searchParams);

        // Obtener el valor del parámetro "page"
        const valorParametro = urlSearchParams.get(nameParametro);
        
        if (valorParametro !== null) {
            //console.log('valorParametro: ', valorParametro);
            return valorParametro;
        }
    }
    console.log('No hay busqueda por parametro en la URL.. o El parametro no existe en la URL..');
    return null;
}
*/
//getValorDeUnParametroDelHash
function getValorDeUnParametroDelHash(nameParametro) {
    console.log('er 2');
    console.log('nameParametro=',nameParametro);
    const valor = getValorDeUnParametroDelHashDexURLDexURL(null,nameParametro);
    return valor;
}
function getValorDeUnParametroDelHashDexURLDexURL(URL,nameParametro) {
    // Obtener la cadena de búsqueda de parámetros (después del "?")
    const searchParams = getsearchParams(URL);
    console.log('searchParams=',searchParams);
    // Verificar si hay búsqueda de parámetros
    if (searchParams !== null) {
        // Crear un objeto URLSearchParams a partir de la cadena de búsqueda de parámetros
        const urlSearchParams = new URLSearchParams(searchParams);

        // Obtener el valor del parámetro "page"
        const valorParametro = urlSearchParams.get(nameParametro);
        
        if (valorParametro !== null) {
            console.log(nameParametro,'=',valorParametro);
            //console.log('valorParametro: ', valorParametro);
            return valorParametro;
        }
    }
    //console.log('No hay busqueda por parametro en la URL.. o El parametro no existe en la URL..');
    return null;
}
/*
function setValorDeUnParametroDelHash(nameParametro,nuevoValorDelParametro) {
    //console.log('viejoValorDelParametro:',nameParametro,'=',getValorDeUnParametroDelHashDexURLDexURL(nameParametro));
    //console.log('nuevoValorDelParametro:',nameParametro,'=',nuevoValorDelParametro);
    
    if(getValorDeUnParametroDelHashDexURLDexURL(nameParametro)!==null){
        actualizarValorDeUnParametroQueExisteYRetornarLaURL(nameParametro,nuevoValorDelParametro);
    }else{
        //ir a la pagina 1 ?
        window.location.hash = window.location.hash+`&${nameParametro}=${nuevoValorDelParametro}`;

    }
}
*/
function setValorDeUnParametroDelHash(nameParametro,nuevoValorDelParametro) {
    console.log('viejoValorDelParametro:',nameParametro,'=',getValorDeUnParametroDelHashDexURLDexURL(null,nameParametro));
    console.log('nuevoValorDelParametro:',nameParametro,'=',nuevoValorDelParametro);

    console.log('setValorDeUnParametroDelHash');
    // Obtener la URL actual
    //const currentURL = window.location.href;
    let nuevaURL = window.location.href;
    console.log('window.location.href=',nuevaURL);
    console.log('getHash(nuevaURL)',getHash(nuevaURL));
    if(nameParametro !='page'){
        if(getValorDeUnParametroDelHashDexURLDexURL(nuevaURL,'page')!==null){
            //ir a la pagina 1
            nuevaURL = actualizarValorDeUnParametroQueExisteYRetornarLaURL(nuevaURL,'page',1);
            //const parametroRegexPag = new RegExp(`([&?])page=[^&]*`, 'i'); //puede estar vacio
            //nuevaURL = nuevaURL.replace(parametroRegexPag, `$1page=1`);
            console.log('nuevaURL=',nuevaURL);
            //ir a la pagina 1
        }
        else{
            console.log('se agrega la pagina 1=');
            nuevaURL+=`&page=1`;
        }
    }
    
    console.log('a0');
    console.log('a00',getValorDeUnParametroDelHashDexURLDexURL(nuevaURL,nameParametro));
    if(getValorDeUnParametroDelHashDexURLDexURL(nuevaURL,nameParametro)!==null){
        console.log('a1');

        nuevaURL=actualizarValorDeUnParametroQueExisteYRetornarLaURL(nuevaURL,nameParametro,nuevoValorDelParametro);
        
        // Buscar y reemplazar el valor del parámetro "page" en la URL
        //const parametroRegex = new RegExp(`([&?])${nameParametro}=\\w+`, 'i'); //busca una o más letras o números después del parámetro, lo que significa que si el parámetro está vacío o no contiene letras o números, la expresión regular no lo detectará.
        //const parametroRegex = new RegExp(`([&?])${nameParametro}=[^&]*`, 'i'); //puede estar vacio

        //nuevaURL = nuevaURL.replace(parametroRegex, `$1${nameParametro}=${nuevoValorDelParametro}`);
        //const nuevaURL = currentURL.replace(parametroRegex, `$1${nameParametro}=${nuevoValorDelParametro}`);
        //console.log('nuevaURL:',nuevaURL);
        //console.log('nuevoValorDelParametro:',nuevoValorDelParametro);
            
        // Redirigir a la nueva URL
        //window.location.href = nuevaURL;
    }
    else{
        
        //ir a la pagina 1 ?
        console.log('//ir a la pagina 1 ?');
        //window.location.hash = window.location.hash+`&${nameParametro}=${nuevoValorDelParametro}`;
        nuevaURL+= `&${nameParametro}=${nuevoValorDelParametro}`;

    }
    console.log('nuevaURL final=',nuevaURL);
    window.location.href = nuevaURL;
    
}

function getsearchParams(URL) {
    //console.log('getsearchParams',URL);
    const hash = getHash(URL);
    //console.log('getsearchParams',hash);
    // Buscar el índice de "?" en la URL para determinar si hay búsqueda de parámetros
    const indexOfQuestionMark = hash.indexOf('?');

    // Verificar si hay búsqueda de parámetros
    if (indexOfQuestionMark !== -1) {
        // Obtener la cadena de búsqueda de parámetros (después del "?")
        const searchParams = hash.substring(indexOfQuestionMark + 1);
        return searchParams;
    }
    console.log('La URL no contiene búsqueda de parámetros o no está presente en la URL..');
    return null;
}


function getHash(URL) {
    let hash;
    //console.log('getHash a:',URL);
    if(URL == null){
        hash = location.hash;
    }
    else{
        //hash = URL.hash;
        //const urlObj = new URL(URL);
        //hash = urlObj.hash; // Obtener el hash de la URL pasada como parámetro

        const hashIndex = URL.indexOf('#');
        hash = hashIndex !== -1 ? URL.substring(hashIndex) : ''; // Obtener el hash de la URL pasada como parámetro
    }
    //console.log('getHash b:',hash);
    
    return hash ? hash.toLowerCase().replace('#', '') : '/';
}

/*
function getNumeroDeParametrosDelHash() {
    // Obtener la cadena de búsqueda de parámetros (después del "?")
    const searchParams = getsearchParams();

    // Verificar si hay búsqueda de parámetros
    if (searchParams !== null) {        
        // Crear un objeto URLSearchParams a partir de la cadena de búsqueda de parámetros
        const urlSearchParams = new URLSearchParams(searchParams);
        //console.log(`urlSearchParams: ${urlSearchParams.toString()}`);

        const paramsCount = urlSearchParams.toString().split('&').length;
        console.log(`Número de parámetros: ${paramsCount}`);
        return paramsCount;
    } else {
        console.log('La URL no contiene búsqueda de parámetros.');
        //window.location.hash = window.location.hash+`/character/?page=1`;
        return null;
    }
}
*/

/*
// Función para actualizar la página actual y el elemento HTML correspondiente
function actualizarNumeroDePagina(currentPage) {
    // Obtener la URL actual
    const currentURL = window.location.href;
        
    // Buscar y reemplazar el valor del parámetro "page" en la URL
    const nuevaURL = currentURL.replace(/([&?])page=\d+/i, `$1page=${currentPage}`);
    console.log('nuevaURL:',nuevaURL);
        
    // Redirigir a la nueva URL
    window.location.href = nuevaURL;
}
*/


function actualizarValorDeUnParametroQueExisteYRetornarLaURL(URL,nameParametro,nuevoValorDelParametro) {
    console.log('entra asi=',URL);
    console.log(nameParametro,nuevoValorDelParametro);
    // Obtener la URL actual
    //onst currentURL = window.location.href;
        
    // Buscar y reemplazar el valor del parámetro "page" en la URL
    //const parametroRegex = new RegExp(`([&?])${nameParametro}=\\w+`, 'i'); //esto sirve para buscar en el replace una o más letras o números después del parámetro, lo que significa que si el parámetro está vacío o no contiene letras o números, la expresión regular no lo detectará.
    const parametroRegex = new RegExp(`([&?])${nameParametro}=[^&]*`, 'i'); //puede estar vacio

    const nuevaURL = URL.replace(parametroRegex, `$1${nameParametro}=${nuevoValorDelParametro}`);
    //console.log('nuevaURL:',nuevaURL);
    //console.log('nuevoValorDelParametro:',nuevoValorDelParametro);
        
    // Redirigir a la nueva URL
    //window.location.href = nuevaURL;
    console.log('sale asi=',nuevaURL);
    return nuevaURL;
}


// Llamar a esta función para mostrar la página actual inicialmente
//actualizarNumeroDePagina();

// Función para avanzar a la siguiente página
function nextPage() {
    let currentPage = getValorDeUnParametroDelHashDexURLDexURL(null,'page');
    console.log('currentPage =',currentPage);
    if(currentPage == null){
        console.log('El parametro page no está en la URL');
        //currentPage=1;
        //window.location.hash = window.location.hash+`&page=1`;
        currentPage = 1;
        
    }
    currentPage++;
    setValorDeUnParametroDelHash('page',currentPage);
    
    //actualizarNumeroDePagina(currentPage);
    
    // Aquí puedes agregar lógica adicional para cargar los datos de la siguiente página
}

// Función para retroceder a la página anterior
function prevPage() {
    let currentPage = getValorDeUnParametroDelHashDexURLDexURL(null,'page');
    if(currentPage == null){
        console.log('El parametro page no está en la URL a');
        //console.error('El parametro page no está en la URL a');
        currentPage=1;
        //window.location.hash = window.location.hash+`&page=1`;
    }
    if (currentPage > 1) {
        currentPage--;
        //actualizarNumeroDePagina(currentPage);
        setValorDeUnParametroDelHash('page',currentPage);
        // Aquí puedes agregar lógica adicional para cargar los datos de la página anterior
    }
}


//buscador
/*
document.addEventListener("DOMContentLoaded", function () {
    // Obtener elementos del DOM
    const textInput = document.getElementById("textInput");
    const submitButton = document.getElementById("submitButton");

    
    // Agregar un event listener al botón
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
    
});
*/

/*
function miFuncion() {
    alert("¡Botón clickeado!");
}
*/
/*
function actualizarBusqueda() {
    //alert("¡Botón clickeado!, submitButtonFuncion");
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
}
*/

/*
const modoToggle = document.querySelector("#modo-toggle");
console.log('modoToggle=',modoToggle);
const body = document.body;
body.classList.add("light-mode");

modoToggle.addEventListener("change", () => {
    //console.log('modoToggle change');
    if (modoToggle.checked) {
        console.log('dark-mode');
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");

        //const item = document.querySelector("Characters-item");
        //Characters-item
        //console.log('item.className=',item.className);
    } else {
        console.log('light-mode');
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
    }
});
*/


const body = document.body;
body.classList.add("light-mode");
function toggleDarkMode() {
    const modoToggle = document.getElementById("modo-toggle");
    if (modoToggle.checked) {
        console.log('dark-mode');
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
    } else {
        console.log('light-mode');
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
    }
}

/*
function toggleDarkMode2() {
    const modoToggle2 = document.getElementById('modo-toggle2');
    const switchIcon = document.getElementById('switch-icon');
    const isChecked = modoToggle2.querySelector('input').checked;

    if (isChecked) {
        // Modo oscuro activado
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        switchIcon.textContent = '🌚'; // Cambiar el ícono a 🌚
    } else {
        // Modo claro activado
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        switchIcon.textContent = '🌝'; // Cambiar el ícono a 🌝
    }
}
*/
// Obtén referencias a los elementos HTML
const modoToggle = document.getElementById("modo-toggle");
const body2 = document.body;

// Verifica el estado actual del interruptor y aplica el modo correspondiente
function aplicarModo() {
  if (modoToggle.checked) {
    body2.classList.remove("light-mode");
    body2.classList.add("dark-mode");
  } else {
    body2.classList.remove("dark-mode");
    body2.classList.add("light-mode");
  }
}

// Agrega un evento de cambio al interruptor
modoToggle.addEventListener("change", () => {
  aplicarModo();
});

// Aplica el modo al cargar la página
window.addEventListener("load", () => {
  aplicarModo();
});



function reloadRouter(){
    console.log('reloadRouter()');
    var eventoPersonalizado = new Event('popstate');
    window.dispatchEvent(eventoPersonalizado);
}

/*
const languageDictionary = {
    'en': {'Dark mode:':'Dark mode i:', 'Page': 'Page'},
    'es': {'Dark mode:':'Modo oscuro en español:', 'Page': 'Pagina'},
    // Agrega más idiomas y sus correspondientes textos aquí
};

// Función para obtener el texto del modo oscuro según el idioma
function getText(language, text) {
    // Verifica si el idioma está en el diccionario y devuelve el texto correspondiente
    if (language in languageDictionary & text in languageDictionary[language][text]) {
      return languageDictionary[language][text];
    } else {
      // Si el idioma no está en el diccionario, establece un valor predeterminado
      return text;
    }
}
*/