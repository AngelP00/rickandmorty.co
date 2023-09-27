import Header from '../templates/Header';
import Footer from '../templates/Footer';
import Home from '../pages/Home';
import Character from '../pages/Character';
import Contact from '../pages/Contact';
//import Location from '../pages/Location';
import Error404 from '../pages/Error404';
import About from '../pages/About';
import FilterCharacters from '../pages/FilterCharacters';
//import About from '../pages/Page';

import getHash from '../utils/getHash';
import resolveRoutes from '../utils/getResolveRoutes';

const routes = {
  //'/': () => Home(currentPage),               // Página de inicio con número de página
  '/': Home,
  '/character/:id': Character,                // Detalles de un personaje por ID
  //'/location/:name': Location,                // Detalles de un personaje por ID
  '/about': About,                            // Página "Acerca de"
  '/contact': Contact,                        // Página de contacto
  //'/page/:pageNumber': (pageNumber) => Home(pageNumber) // Páginas adicionales
  //'/page/:pageNumber': Home, // Páginas adicionales
  //'/name/:nameCharacter': BrowserCharacter // Páginas adicionales
  '/filtercharacters/:parametros': FilterCharacters // Páginas adicionales
};
/*
http://localhost:8080/#/character/name=ami&page=2

GET https://rickandmortyapi.com/api/character/1
GET https://rickandmortyapi.com/api/character/?name=Rick
GET https://rickandmortyapi.com/api/character/?gender=Male
GET https://rickandmortyapi.com/api/episode/?name=Pilot
GET https://rickandmortyapi.com/api/location/?name=Earth
GET https://rickandmortyapi.com/api/character/?name=Rick&gender=Male



http://localhost:8080/#/character/1
http://localhost:8080/#/character/?page=1
http://localhost:8080/#/character/?name=Rick
http://localhost:8080/#/character/?gender=Male
http://localhost:8080/#/episode/?name=Pilot
http://localhost:8080/#/location/?name=Earth
http://localhost:8080/#/character/?name=Rick&gender=Male


url validas
http://localhost:8080/#/character/1
http://localhost:8080/#/character/?page=1 // todos los personajes
http://localhost:8080/#/character/?name=Rick
http://localhost:8080/#/character/?gender=Male
http://localhost:8080/#/character/?name=Rick&gender=Male


 */

const router = async () => {
  
    const header = null ||  document.getElementById('header');
    const content = null ||  document.getElementById('content');
    const footer = null ||  document.getElementById('footer');
    
    /*
    if (header.childElementCount === 0) header.innerHTML= await Header();
    if (footer.childElementCount === 0) footer.innerHTML= await Footer();
    //if (footer == null) footer.innerHTML= await Footer();
    */
    
    header.innerHTML= await Header();
    footer.innerHTML= await Footer();
    


    let hash = getHash();
    //console.log('hash=',hash);
    let route = await resolveRoutes(hash);

    //console.log(route);
    let render = routes[route] ? routes[route] : Error404;

    //content.innerHTML = await render();
    //console.log('render=',render);
    const result = await render();

    //console.error('result',result);
    if(result!= null){
      content.innerHTML = result;
      //console.error('renderiza');
    }

};

export default router;

window.addEventListener('popstate', () => {
  // Aquí debes manejar el cambio de ruta y cargar el contenido correspondiente.
  router();
});