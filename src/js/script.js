document.addEventListener("DOMContentLoaded", function(){

    let connexion = new MovieDB();

    if(document.location.pathname.search('fiche-film.html') > 0 ){
        let params = new URL(document.location).searchParams;
        connexion.requeteInfoFilm(params.get('id'));
    }else{
        connexion.requeteDernierFilm();

    }


});



class MovieDB {
    constructor() {
        console.log("new MovieDB()");

        this.apiKey = "8d99faa25d8032cf6aea961b4001c54e";
        this.lang = "fr-CA";
        this.baseUrl = "https://api.themoviedb.org/3/";
        this.imgPath = "https://image.tmdb.org/t/p/";
        this.totalFilm = 8;
    }

    requeteDernierFilm() {
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourDernierFilm.bind(this));
        requete.open('GET', this.baseUrl + 'movie/now_playing?api_key=' + this.apiKey + '&language=' + this.lang + '&page=1');
        requete.send();
    }

    retourDernierFilm(event) {
        console.log('retourDernierFilm');
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;
        this.afficherDernierFilm(data);
    }

    afficherDernierFilm(data) {
        console.log('afficherDernierFilm');

        let section = document.querySelector('.liste-films');
        console.log(section);

        for (let i = 0; i < this.totalFilm; i++) {
            // console.log(data[i].title);
            // console.log(data[i].overview);
            let article = document.querySelector('.template .film').cloneNode(true);
            article.querySelector('h2').innerHTML = data[i].title;

            // if(data[i].overview != ""){
            //     article.querySelector('.description').innerHTML = data[i].overview;
            // }else{
            //     article.querySelector('.description').innerHTML = "Aucune description disponible";
            // }

            article.querySelector('.description').innerHTML = data[i].overview || "Aucune description disponible";

            let image = article.querySelector('img');
            image.src = this.imgPath + "w300" + data[i].poster_path;
            image.alt = data[i].title;


            article.querySelector('a').href = "fiche-film.html?id=" + data[i].id;


            section.appendChild(article);
        }
    }




    requeteInfoFilm(movieId) {
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourInfoFilm.bind(this));
        requete.open('GET', this.baseUrl + 'movie/' + movieId + '?api_key=' + this.apiKey + '&language=' + this.lang);
       //14?api_key=b22f9b20c68ad36893d3c8b75f29771a&language=en-US
        requete.send();
    }

    retourInfoFilm(event) {

        let target = event.currentTarget;
        let data = JSON.parse(target.responseText);
        console.log(data);
        this.afficherInfoFilm(data);
    }

    afficherInfoFilm(data) {


        document.querySelector('h1').innerHTML= data.title;

        // this.requeteActeur();

        }


        requeteActeur(){
        //requete vers GET credit(movieDB)
        }

        retourRequeteActeur(){
        //faire attention JSON.parse
        }

        afficherRequeteActeur(){
        //boucle for et clone div.acteur
        }

}