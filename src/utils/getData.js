/*
const API = 'https://rickandmortyapi.com/api/character/';

// Definir la página y la cantidad de personajes por página
//const page = 2; // Cambia esto para obtener diferentes páginas
//const limit = 4; // Cambia esto para ajustar la cantidad de personajes por página

// Construir la URL con los parámetros de consulta
//const API = `https://rickandmortyapi.com/api/character/?page=${page}&limit=${limit}`;

//const getData = async (id) => {
    //onst apiURL = id ? `${API}${id}` : API;
const getData = async (id, page,name) => { // Agregamos el parámetro "page" con un valor predeterminado de 1
    // Construimos la URL de la API con el número de página
    //const apiURL = id ? `${API}${id}` : `${API}?page=${page}`;
    let apiURL;
    if(id){
        apiURL = `${API}${id}`;
    }
    else if(page){
        apiURL = `${API}?page=${page}`;
    }
    else if(name){
        apiURL = `${API}?name=${name}`;
    }

    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            const data = await response.json();
            throw data.error;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        //console.error('error:', error);
        throw error; // Propaga el error para que se maneje en el llamador
    }
};

export default getData;

*/
const API = 'https://rickandmortyapi.com/api';


// Construir la URL con los parámetros de consulta
//const API = `https://rickandmortyapi.com/api/character/?page=${page}&limit=${limit}`;

//const getData = async (id) => {
    //onst apiURL = id ? `${API}${id}` : API;
const getData = async (hash) => { // Agregamos el parámetro "page" con un valor predeterminado de 1
    // Construimos la URL de la API con el número de página
    //const apiURL = id ? `${API}${id}` : `${API}?page=${page}`;
    //let apiURL = `${API}/${hash}`;
    let apiURL = `${API}${hash}`;
    console.log('apiURL:', apiURL);
    

    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            const data = await response.json();
            throw data.error;
        }
        let data = await response.json();
        //console.log('data.info:', data.info);
        //console.log('data.info.count:', data.info.count);
        //console.log('data.info.pages:', data.info.pages);
        if(hash.includes('/character/?')){
            if(hash.includes(data.info.pages)){
                data = juntarData(data,hash);
                console.log('data juntada 1', data);
            }
            data.info.count+= getCharacters(hash).length;
        }
        console.log('data juntada 2', data);
        return data;
    } catch (error) {
        //console.error('error:', error);
        if(hash.includes('/character/?')){
            console.error('personajes no encontrado en la API');
            let data=
            {
                "info": {
                "count": 0,
                "pages": 1,
                "next": "https://rickandmortyapi.com/api/character/?page=2",
                "prev": null
                },
                "results": [],
            };
            data = await juntarData(data,hash);
            console.log('data juntada 1', data);
            data.info.count = data.results.length;
            if(data.results.length==0) throw error; // Propaga el error para que se maneje en el llamador
            return data;
        }
        else if(hash.includes('/character/') &  hash.includes('/character/?')==false){
            console.error('personaje no encontrado en la API');
            let data;
            characters_ext.forEach((character) => {
                console.log(character);
                if(hash.includes(character.id)){
                    data = character;
                    return;
                }
            });
            if(!data) throw error; // Propaga el error para que se maneje en el llamador
            return data;
        }
        throw error; // Propaga el error para que se maneje en el llamador
    }
};

export default getData;


function juntarData(dataAPI,hash){ // Agregamos el parámetro "page" con un valor predeterminado de 1
    console.log('hash:', hash);
    /*
    let data=
    {
        "info": {
          "count": 826,
          "pages": 42,
          "next": "https://rickandmortyapi.com/api/character/?page=2",
          "prev": null
        },
        "results": [],
    };
    */
    let data = dataAPI;
    console.log('data:', data);
    const characters_que_coinciden = getCharacters(hash);
    console.error(characters_que_coinciden.length);
    if(characters_que_coinciden.length >0){
      // Concatenar las dos listas de personajes
      data.results = data.results.concat(characters_que_coinciden);
      data.info.count+= characters_que_coinciden.length;

      // Ordenar la lista resultante por nombre
      data.results.sort((a, b) => a.name.localeCompare(b.name));

      console.log('data.results',data.results); // Lista de personajes combinada y ordenada por nombre
      //data.results = characters_que_coinciden;
      /*
        data=
        {
            "info": {
            "count": 826,
            "pages": 12,
            "next": "https://rickandmortyapi.com/api/character/?page=2",
            "prev": null
            },
            "results": resultados_ext,
        };
      */
    }
    
    //data= getCharacters(hash);
    console.log('data juntada 0', data);
    return data;
};


//personajes agregados
//let result;
//personajes agregados



// URL de ejemplo
//const url = "#/character/?page=1&gender=Male&status=alive&species=human&name=angel";
const url = "/character/?1";

// Función para obtener los parámetros de la URL
function getURLParameters(url) {
  const params = new URLSearchParams(url.slice(url.indexOf('?') + 1));
  const parameters = {};
  for (const [key, value] of params) {
    parameters[key] = value;
  }
  console.log('parameters=',parameters);
  return parameters;
}
function getCharacters(url) {
    if(url.includes('?') == false){
        return null;
    }
    let result;
    // Obtener los parámetros de la URL
    const urlParameters = getURLParameters(url);
    // Filtrar los personajes
    result = characters_ext.filter((character) => {
    // Verificar si el personaje cumple con cada criterio de filtro
    //const matchesPage = !urlParameters.page || character.page === urlParameters.page;
    const matchesGender = !urlParameters.gender || character.gender.toLowerCase() === urlParameters.gender.toLowerCase();
    const matchesStatus = !urlParameters.status || character.status.toLowerCase() === urlParameters.status.toLowerCase();
    const matchesSpecies = !urlParameters.species || character.species.toLowerCase() === urlParameters.species.toLowerCase();
    //const matchesName = !urlParameters.name || character.name.includes(urlParameters.name);
    const matchesName = !urlParameters.name || character.name.toLowerCase().includes(urlParameters.name.toLowerCase());


    // El personaje se agrega a la lista resultante si cumple con todos los criterios
    //return matchesPage && matchesGender && matchesStatus && matchesSpecies && matchesName;
    return matchesGender && matchesStatus && matchesSpecies && matchesName;
    });

    console.error(result); // Lista de personajes filtrados
    return result;
}
/*
getCharacters(url);
*/

const characters_ext=[
    {
      "id": 1000,
      "name": "Angel Palacios",
      "status": "Alive",
      "species": "Human",
      "type": "",
      "gender": "Male",
      "origin": {
        "name": "unknown",
        "url": ""
      },
      "location": {
        "name": "Rosario del Tala",
        "url": "https://rickandmortyapi.com/api/location/3"
      },
      "image": "./assets/img/angel_300x300.jpg",
      "episode": [
      ],
      "url": "https://rickandmortyapi.com/api/character/8",
      "created": "2001"
    },
    {
        "id": 1001,
        "name": "Giovanni",
        "status": "Alive",
        "species": "Human",
        "type": "",
        "gender": "Male",
        "origin": {
          "name": "unknown",
          "url": ""
        },
        "location": {
          "name": "unknown",
          "url": "https://rickandmortyapi.com/api/location/3"
        },
        "image": "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
        "episode": [
          "https://rickandmortyapi.com/api/episode/28"
        ],
        "url": "https://rickandmortyapi.com/api/character/8",
        "created": "unknown"
    },
]