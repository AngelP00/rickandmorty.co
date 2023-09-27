(()=>{"use strict";const e=async e=>{let t=`https://rickandmortyapi.com/api${e}`;console.log("apiURL:",t);try{const a=await fetch(t);if(!a.ok)throw(await a.json()).error;let o=await a.json();if(e.includes("/character/?")){const a=await n(o,e);e.includes(o.info.pages)&&(o=a,console.log("data juntada 1",o)),o.info.count=a.info.count}return console.log("data juntada 2",o),o}catch(t){if(e.includes("/character/?")){console.error("personajes no encontrado en la API");let a={info:{count:0,pages:1,next:"https://rickandmortyapi.com/api/character/?page=2",prev:null},results:[]};if(a=await n(a,e),console.log("data juntada 1",a),a.info.count=a.results.length,0==a.results.length)throw t;return a}if(e.includes("/character/")&0==e.includes("/character/?")){let n;if(console.error("personaje no encontrado en la API"),a.forEach((a=>{console.log(a),e.includes(a.id)&&(n=a)})),!n)throw t;return n}throw t}},n=async(e,n)=>{console.log("hash:",n);let t=e;console.log("data:",t);const o=function(e){if(0==e.includes("?"))return null;let n;const t=function(e){const n=new URLSearchParams(e.slice(e.indexOf("?")+1)),a={};for(const[e,t]of n)a[e]=t;return console.log("parameters=",a),a}(e);return n=a.filter((e=>{const n=!t.gender||e.gender.toLowerCase()===t.gender.toLowerCase(),a=!t.status||e.status.toLowerCase()===t.status.toLowerCase(),o=!t.species||e.species.toLowerCase()===t.species.toLowerCase(),l=!t.name||e.name.toLowerCase().includes(t.name.toLowerCase());return n&&a&&o&&l})),console.error(n),n}(n);return console.error(o.length),o.length>0&&(t.results=t.results.concat(o),t.info.count+=o.length,t.results.sort(((e,n)=>e.name.localeCompare(n.name))),console.log("data.results",t.results)),console.log("data juntada 0",t),t},a=[{id:1e3,name:"Angel Palacios",status:"Alive",species:"Human",type:"",gender:"Male",origin:{name:"unknown",url:""},location:{name:"Rosario del Tala",url:"https://rickandmortyapi.com/api/location/3"},image:"./assets/img/angel_300x300.jpg",episode:[],url:"https://rickandmortyapi.com/api/character/8",created:"2001"},{id:1001,name:"Giovanni",status:"Alive",species:"Human",type:"",gender:"Male",origin:{name:"unknown",url:""},location:{name:"unknown",url:"https://rickandmortyapi.com/api/location/3"},image:"https://rickandmortyapi.com/api/character/avatar/8.jpeg",episode:["https://rickandmortyapi.com/api/episode/28"],url:"https://rickandmortyapi.com/api/character/8",created:"unknown"}],t=()=>{const e=location.hash;return e?e.toLowerCase().replace("#",""):"/"},o=()=>'\n        <div class="Error404">\n            <h2> Error 404. URL invalida</>\n         </div>   \n    ',l={title:"About Us",description:"We are a company committed to innovation and quality.",teamMembers:["Angel Palacios"],location:"Rosario del Tala - Concepción del Uruguay, Argentina",foundedYear:2021};function s(e,n,a){console.log("minPag = ",e,"currentPage = ",n,"maxPag = ",a);let t="";function o(e,n,a,t,o){return(n=parseInt(n))+(t=parseInt(t))>=e&n+t<=a?`<p style="display: inline; color: grey; cursor: pointer; font-size: ${o};" onclick="setValorDeUnParametroDelHash('page', ${parseInt(n)+t});"> ${parseInt(n)+t} </p>`:""}return t+='\n    \x3c!--\n    <div style="text-align-last: justify;">\n    --\x3e\n    <div style="">\n        \x3c!--\n        <p style="display: inline;">Páginas disponibles:</p>\n        --\x3e\n    ',t+=`\n    <div style="display: flex; justify-content: space-between;">\n    <p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${e});">First page. </p>\n    <p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${a});"> Last Page.</p>\n    </div>\n    `,t+='\n    <div style="text-align-last: justify;">\n    <input type="button" value="<" onclick="prevPage();" class="btn btn-unselected">\n    ',t+=o(e,n,a,-3,"10px"),t+=o(e,n,a,-2,"14px"),t+=o(e,n,a,-1,"16px"),t+=`\n        \n        <h3 style="display: inline;">${n}</h3>\n        \x3c!--\n        <h3 style="display: inline; color: green;">${n}</h3>\n        --\x3e\n    `,t+=o(e,n,a,1,"16px"),t+=o(e,n,a,2,"14px"),t+=o(e,n,a,3,"10px"),t+=n<a?'\n        <input type="button" value=">" onclick="nextPage();" class="btn btn-unselected">\n        ':'\n        <input type="button" value=">" onclick="" class="btn btn-unselected">\n        ',t+="</div>",t+="\n    </div>\n    ",t}const r={"/":async()=>(console.log("home"),'\n        <img class="imagen-2560px-Rick_and_Morty" src="./assets/img/a2560px_Rick_and_Morty.png" alt="Descripción de la imagen">\n        <h1 />\n            Welcome!\n        </h1>\n        <a href="#/character/?page=1">\n            <h2>Explore characters</h2>\n        </a>\n        \x3c!--\n        <a href="#/episode">\n            <h2>Explorar episodes</h2>\n        </a>\n        <a href="#/location">\n            <h2>Explorar locations</h2>\n        </a>\n        \n        <a href="#/about">\n            About\n        </a>\n        --\x3e\n    '),"/character/:id":async()=>{let n;try{const a=t();console.log(a),n=await e(a)}catch(e){return console.log("error 3:"),console.error(e),console.error(e.message),"Failed to fetch"===e.message?'\n                <div class="error-message">\n                    <p>Error de conexión a Internet. Verifica tu conexión y vuelve a intentarlo.</p>\n                    <input type="button" value="Recargar página" onclick="reloadRouter();" style="">\n                </div>\n            ':"Character not found"===e?'\n                <div class="error-message">\n                    <p>Personaje no encontrado.</p>\n                </div>\n            ':'\n                <div class="error-message">\n                    <p>¡Oye! Debes proporcionar un ID. El ID debe ser un numero</p>\n                </div>\n            '}let a="unknown";if(console.error("a",n),n.episode.length>=1){console.error("b");const t=n.episode[0],o="/"+new URL(t).pathname.split("/").slice(2).join("/");console.log(o),a=await e(o),a=a.name}return console.log("1er episode:",a),`\n        <div class="Characters-inner">\n            <article class="Characters-card">\n                <img src="${n.image}" alt="${n.name}" class="character-image-details ${"Alive"===n.status?"alive":"Dead"===n.status?"dead":"unknown"}">\n                <h2>Name: ${n.name}</h2>\n            </article>\n            <article class="Characters-card">\n                <h3>Status: ${n.status}</h3>\n                <h3>Species: ${n.species}</h3>\n                <h3>Gender: ${n.gender}</h3>\n                <h3>Last known location: ${n.location.name}</h3>\n                <h3>First seen in: ${a}</h3>\n                <h3>ID: ${n.id}</h3>\n                <h3>Created: ${n.created}</h3>\n                <h3>Type: ${n.type}</h3>\n                <h3>Origin: ${n.origin.name}</h3>\n                <h3>Episodes: ${n.episode.length}</h3>\n                \x3c!--\n                <h3>URL: <a href="${n.url}" target="_blank">${n.url}</a></h3>\n                <h3>(${n.episode.length})Episodes:</h3>\n                <ul>\n                    ${n.episode.map((e=>`<li>${e}</li>`)).join("")}\n                </ul>\n                --\x3e\n            </article>\n        </div>\n    `},"/about":()=>{const{title:e,description:n,teamMembers:a,location:t,foundedYear:o}=l;return`\n    <div class="About">\n      <h2>${e}</h2>\n      <p>${n}</p>\n      <h3>Our Team:</h3>\n      <ul>\n        ${a.map((e=>`<li>${e}</li>`)).join("")}\n      </ul>\n      <p>Location: ${t}</p>\n      <p>Foundation Year: ${o}</p>\n    </div>\n  `},"/contact":()=>'\n      <div class="Contact-main">\n        <div class="Contact-content"><img src="./assets/img/angel_original.jpg" alt="Descripción de la imagen" style="border-radius: 50%;">\n          <h1>Contact Us</h1>\n          <p>If you have any questions or feedback, feel free to get in touch with us:</p>\n          <ul>\n            \x3c!--\n            <li>Email: contact@rickandmorty.co (email de ejemplo)</li>\n            <li>Phone: +1 (123) 456-7890 (Phone de ejemplo)</li>\n            --\x3e\n            <li>\n              Instagram: <a href="https://instagram.com/angelp00__" target="_blank">angelp00__</a>\n            </li>\n          </ul>\n        </div>\n      </div>\n    ',"/filtercharacters/:parametros":async()=>{let n="";console.log("FilterCharacters");let a=t();console.log("er 1");let o=getValorDeUnParametroDelHash("page");console.log("currentPage=",o),null==o&&(o=1),"/"===a&&(console.log("if"),a="/character"),n+=function(){function e(e,n){return(getValorDeUnParametroDelHash(e)?getValorDeUnParametroDelHash(e):"")==n?"btn btn-selected":"btn btn-unselected"}return`\n    <div>\n    \x3c!-- Agregar un campo de entrada de texto --\x3e\n    \x3c!--\n    <input type="text" id="textInput" placeholder="Buscar personaje" value="${name}" onkeydown="if (event.key === 'Enter') setValorDeUnParametroDelHash('name', textInput.value);" oninput="console.log('value', textInput.value);">\n    --\x3e\n    \x3c!-- Agregar un botón para ejecutar una acción --\x3e\n    \x3c!--\n    <button class="btn" " onclick="setValorDeUnParametroDelHash('name', textInput.value);">Enviar</button>\n    --\x3e\n    \n    <div>\n        <p style="display: inline;">Gender:</p>\n        <input type="button" value="Male" onclick="setValorDeUnParametroDelHash('gender', 'male');" class="${e("gender","male")}">\n        <input type="button" value="Female" onclick="setValorDeUnParametroDelHash('gender','female');" class="${e("gender","female")}" >\n        <input type="button" value="Unknown" onclick="setValorDeUnParametroDelHash('gender','n');" class="${e("gender","n")}">\n        <input type="button" value="Any gender" onclick="setValorDeUnParametroDelHash('gender','');" class="${e("gender","")}">\n    </div>\n    <div>\n        <p style="display: inline;">Status:</p>\n        <input type="button" value="Alive" onclick="setValorDeUnParametroDelHash('status', 'alive');" class="${e("status","alive")}">\n        <input type="button" value="Dead" onclick="setValorDeUnParametroDelHash('status','dead');" class="${e("status","dead")}">\n        <input type="button" value="Unknown" onclick="setValorDeUnParametroDelHash('status','n');" class="${e("status","n")}">\n        <input type="button" value="Any status" onclick="setValorDeUnParametroDelHash('status','');" class="${e("status","")}">\n    </div>\n    <div>\n        <p style="display: inline;">Species:</p>\n        <input type="button" value="Human" onclick="setValorDeUnParametroDelHash('species', 'human');" class="${e("species","human")}">\n        <input type="button" value="Humanoid" onclick="setValorDeUnParametroDelHash('species', 'humanoid');" class="${e("species","humanoid")}">\n        <input type="button" value="Alien" onclick="setValorDeUnParametroDelHash('species','alien');" class="${e("species","alien")}">\n        <input type="button" value="Animal" onclick="setValorDeUnParametroDelHash('species','animal');" class="${e("species","animal")}">\n        <input type="button" value="Any species" onclick="setValorDeUnParametroDelHash('species','');" class="${e("species","")}">\n    </div>\n    </div>\n    `}();try{const t=await e(a);t.results.sort(((e,n)=>e.name.localeCompare(n.name))),n+=`\n            \x3c!--\n            <div>\n                <div style="display: inline;">Results: ${t.info.count}</div>\n                <div style="display: inline;">Paginas: ${t.info.pages}</div>\n            </div>\n            --\x3e\n            <div style="display: inline;">Results: ${t.info.count}</div>\n            <h1>Page ${o} of ${t.info.pages}</h1>\n            ${s(1,o,t.info.pages)}\n            <div class="Characters">\n                ${t.results.map((e=>`\n                    <article class="Characters-item">\n                        <a href="#/character/${e.id}">\n                            \x3c!--\n                            <img src="${e.image}" alt="${e.name}" style="border: ${"Dead"===e.status?"7px solid red":"Alive"===e.status?"7px solid green":"7px solid gray"};">\n                            --\x3e\n                            <img src="${e.image}" alt="${e.name}" class="character-image ${"Alive"===e.status?"alive":"Dead"===e.status?"dead":"unknown"}">\n                            <h2>${e.name}</h2>\n                            <p>${e.species}</p>\n                        </a>\n                    </article>\n                `)).join("")}\n            </div>\n            <h1>Page ${o} of ${t.info.pages}</h1>\n\n            \x3c!--\n            <div>\n                <p style="display: inline;">Páginas disponibles:</p>\n                <p style="display: inline;">de</p>\n                <input type="button" value="Página: 1" onclick="setValorDeUnParametroDelHash('page', 1);">\n                <p style="display: inline;">a</p>\n                <input type="button" value="Página: ${t.info.pages}" onclick="setValorDeUnParametroDelHash('page', ${t.info.pages});">\n            </div>\n            --\x3e\n\n            \x3c!--\n            <input type="button" value="prevPage" onclick="prevPage();">\n            <input type="button" value="nextPage" onclick="nextPage();">\n            --\x3e\n\n            \x3c!--\n            <div>\n                <p style="display: inline;">Páginas disponibles:</p>\n                <input type="button" value="1" onclick="setValorDeUnParametroDelHash('page', 1);">\n                <input type="button" value="<" onclick="prevPage();">\n                \n                <p style="display: inline; color: grey; cursor: pointer; font-size: 13px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(o)-3});">${parseInt(o)-3}</p>\n                <p style="display: inline; color: grey; cursor: pointer; font-size: 15px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(o)-2});">${parseInt(o)-2}</p>\n                <p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(o)-1});">${parseInt(o)-1}</p>\n                \n                <h3 style="display: inline;">${o}</h3>\n\n                <p style="display: inline; color: grey; cursor: pointer; font-size: 16px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(o)+1});">${parseInt(o)+1}</p>\n                <p style="display: inline; color: grey; cursor: pointer; font-size: 14px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(o)+2});">${parseInt(o)+2}</p>\n                <p style="display: inline; color: grey; cursor: pointer; font-size: 13px;" onclick="setValorDeUnParametroDelHash('page', ${parseInt(o)+3});">${parseInt(o)+3}</p>\n\n                <input type="button" value=">" onclick="nextPage();">\n                <input type="button" value="${t.info.pages}" onclick="setValorDeUnParametroDelHash('page', ${t.info.pages});">\n            </div>\n            --\x3e\n        `,n+=s(1,o,t.info.pages)}catch(t){let l;console.log("a");let s=null;try{const n=new RegExp("([&?])page=[^&]*","i"),t=a.replace(n,"$1page=1"),o=await e(t);s=o.info.pages,l=o.info.count}catch{}console.log("b"),console.log("maxPag=",s),"There is nothing here"===t&null!=s?(console.error("pagina no disponible"),n+=`\n            <div style="display: inline;">Results: ${l}</div>\n            <h1>Página ${o} no disponible</h1>\n\n            <div>\n                <p style="display: inline;">Páginas disponibles:</p>\n                <p style="display: inline;">de</p>\n                <input type="button" value="Página: 1" onclick="setValorDeUnParametroDelHash('page', 1);">\n                <p style="display: inline;">a</p>\n                <input type="button" value="Página: ${s}" onclick="setValorDeUnParametroDelHash('page', ${s});">\n            </div>\n\n            \x3c!--\n            <input type="button" value="prevPage" onclick="prevPage();">\n            <input type="button" value="nextPage" onclick="nextPage();">\n            --\x3e            \n            `):"There is nothing here"===t?(console.error("pagina no disponible"),n+="\n            <div>No hay paginas para los parametros ingresados</div>        \n            "):(console.error("Falló la peticion. Compruebe su conexion a internet"),n+=`\n            <div>Falló la peticion. Compruebe su conexion a internet</div>\n            <h1>Página ${o}</h1>\n            <input type="button" value="Recargar página" onclick="reloadRouter();" style="">\n            \x3c!--\n            <input type="button" value="prevPage" onclick="prevPage();">\n            <input type="button" value="nextPage" onclick="nextPage();">\n            --\x3e\n            `)}const l=!!document.getElementById("textInput");if(0==l){let e=getValorDeUnParametroDelHash("name");null===e&&(e=""),n=`\n        <section id="buscador">\n            \x3c!-- Agregar un campo de entrada de texto --\x3e\n            \x3c!--\n            <input type="text" id="textInput" placeholder="Search character" value="${e}" onkeydown="if (event.key === 'Enter') setValorDeUnParametroDelHash('name', textInput.value);" oninput="console.log('value', textInput.value);setValorDeUnParametroDelHash('name', textInput.value);">\n            --\x3e\n            <div style="display: flex; align-items: center; justify-content: center">\n            <input\n                type="text"\n                id="textInput"\n                placeholder="Search character"\n                value="${e}"\n                onkeydown="if (event.key === 'Enter') setValorDeUnParametroDelHash('name', textInput.value);"\n                oninput="console.log('value', textInput.value);setValorDeUnParametroDelHash('name', textInput.value);"\n                style="\n                padding: 8px; /* Espaciado interno */\n                border: 1px solid #ccc; /* Borde */\n                border-radius: 4px; /* Bordes redondeados */\n                font-size: 16px; /* Tamaño de fuente */\n                width: 200px; /* Ancho del campo de entrada */\n                "\n            />\n            \x3c!--\n            <span style="margin-left: -30px; cursor: pointer;" onclick="setValorDeUnParametroDelHash('name', textInput.value);" class="btn btn-unselected">🔍</span>\n            --\x3e\n            \n            <input style="margin-left: -45px; cursor: pointer; font-size: 20px;" type="button" value="🔍" onclick="setValorDeUnParametroDelHash('name', textInput.value);" class="btn btn-unselected">\n            \n            </div>\n\n\n            \x3c!-- Agregar un botón para ejecutar una acción --\x3e\n            \x3c!--\n            <button class="btn" " onclick="setValorDeUnParametroDelHash('name', textInput.value);">Search</button>\n            --\x3e\n        </section>\n        <section id="resultados">${n}</section>\n        `}return 0==l?n:(document.getElementById("resultados").innerHTML=n,null)}},i=async()=>{const e=document.getElementById("header"),n=document.getElementById("content"),a=document.getElementById("footer");e.innerHTML=await'\n        <div class="Header-main">\n            <div class="Header-logo">\n                <h1 />\n                    \x3c!--\n                    <a href="/">Rick&Morty.co</a> \n                    --\x3e\n                    <a href="#/home">Rick&Morty.co</a>  \n                </h1>\n            </div>\n            <div class="Header-nav">\n                <a href="#/about">\n                    About\n                </a>\n            </div>\n        </div>\n    ',a.innerHTML=await'\n      <footer class="Footer">\n        <div class="Footer-content">\n            <p>&copy; 2023 Rick&Morty.co Of Pumita Studio, By Angel Palacios</p>\n            \x3c!--\n            <ul class="Footer-links">\n                <li><a href="/">Home</a></li>\n                <li><a href="#/about">About</a></li>\n                <li><a href="#/contact">Contact</a></li>\n            </ul>\n            --\x3e\n            <div class="Footer-content">\n                <ul class="Footer-links">\n                    \x3c!--\n                    <li><a href="/">Home</a></li>\n                    --\x3e\n                    <li><a href="#/home">Home</a></li>\n                    <li><a href="#/about">About</a></li>\n                    <li><a href="#/contact">Contact</a></li>\n                </ul>\n            </div>\n        </div>\n      </footer>\n    ';let l=t(),s=await(e=>(e.split("/"),"/home"===e||"/"===e?"/":"/about"===e?"/about":"/contact"===e?"/contact":e.includes("/character/?")?(console.log("/filtercharacters/:parametros"),"/filtercharacters/:parametros"):e.includes("/character/")?"/character/:id":"url no valida"))(l),i=r[s]?r[s]:o;const c=await i();null!=c&&(n.innerHTML=c)},c=i;window.addEventListener("popstate",(()=>{i()})),window.addEventListener("load",c)})();