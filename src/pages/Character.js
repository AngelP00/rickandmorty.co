import getData from '../utils/getData';
import getHash from '../utils/getHash';

const Character = async () => {
    let character;
    try {
        /*
        const hash = getHash();
        console.log('hash 2=',hash);
        const parts = hash.split('/');
        const id = `/${parts[2]}`.replace('/','');
        character = await getData(id);
        */
       
        const hash = getHash();
        console.log(hash);
        character = await getData(hash);
        
        
    } catch (error) {
        // Si getData arroja un error, mostraremos un mensaje de error en la vista
        console.log('error 3:');
        console.error(error);
        console.error(error.message);
        if (error.message === 'Failed to fetch') {
            // Capturar errores de conexión a Internet y mostrar un mensaje de error en HTML
            return `
                <div class="error-message">
                    <p>Error de conexión a Internet. Verifica tu conexión y vuelve a intentarlo.</p>
                    <input type="button" value="Recargar página" onclick="reloadRouter();" style="">
                </div>
            `;
        }
        else if (error === 'Character not found') {
            // Mostrar un mensaje de error en HTML
            return `
                <div class="error-message">
                    <p>Personaje no encontrado.</p>
                </div>
            `;
        } else {
            // Mostrar un mensaje de error en HTML
            return `
                <div class="error-message">
                    <p>¡Oye! Debes proporcionar un ID. El ID debe ser un numero</p>
                </div>
            `;
        }
    }

    let nameEpisode = 'unknown';
    console.error('a',character);
    if(character.episode.length >= 1){
        console.error('b');
        // Si character contiene datos del personaje, construimos la vista normalmente
        //console.log('URL 1er episode:',character.episode[0]);
        const url = character.episode[0];

        // Crear un objeto URL a partir de la URL
        const urlObj = new URL(url);

        // Obtener la parte de la ruta (pathname)
        const pathname = urlObj.pathname;

        // Dividir la ruta en partes usando '/'
        const partesRuta = pathname.split('/');

        // Obtener la parte de la ruta que deseas (en este caso, '/episode/28')
        const parteDeseada = '/' + partesRuta.slice(2).join('/');

        console.log(parteDeseada); // Esto imprimirá "/episode/28"

        nameEpisode = await getData(parteDeseada);
        nameEpisode = nameEpisode.name;
    }
    console.log('1er episode:',nameEpisode);
    
    const view = `
        <div class="Characters-inner">
            <article class="Characters-card">
                <img src="${character.image}" alt="${character.name}" class="character-image-details ${character.status === 'Alive' ? 'alive' : character.status === 'Dead' ? 'dead' : 'unknown'}">
                <h2>Name: ${character.name}</h2>
            </article>
            <article class="Characters-card">
                <h3>Status: ${character.status}</h3>
                <h3>Species: ${character.species}</h3>
                <h3>Gender: ${character.gender}</h3>
                <h3>Last known location: ${character.location.name}</h3>
                <h3>First seen in: ${nameEpisode}</h3>
                <h3>ID: ${character.id}</h3>
                <h3>Created: ${character.created}</h3>
                <h3>Type: ${character.type}</h3>
                <h3>Origin: ${character.origin.name}</h3>
                <h3>Episodes: ${character.episode.length}</h3>
                <!--
                <h3>URL: <a href="${character.url}" target="_blank">${character.url}</a></h3>
                <h3>(${character.episode.length})Episodes:</h3>
                <ul>
                    ${character.episode.map(episode => `<li>${episode}</li>`).join('')}
                </ul>
                -->
            </article>
        </div>
    `;
    return view;
}

export default Character;
