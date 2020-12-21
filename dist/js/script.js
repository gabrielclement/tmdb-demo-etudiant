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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICBsZXQgY29ubmV4aW9uID0gbmV3IE1vdmllREIoKTtcclxuXHJcbiAgICBpZihkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zZWFyY2goJ2ZpY2hlLWZpbG0uaHRtbCcpID4gMCApe1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgVVJMKGRvY3VtZW50LmxvY2F0aW9uKS5zZWFyY2hQYXJhbXM7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVJbmZvRmlsbShwYXJhbXMuZ2V0KCdpZCcpKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlRGVybmllckZpbG0oKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxufSk7XHJcblxyXG5cclxuXHJcbmNsYXNzIE1vdmllREIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJuZXcgTW92aWVEQigpXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmFwaUtleSA9IFwiOGQ5OWZhYTI1ZDgwMzJjZjZhZWE5NjFiNDAwMWM1NGVcIjtcclxuICAgICAgICB0aGlzLmxhbmcgPSBcImZyLUNBXCI7XHJcbiAgICAgICAgdGhpcy5iYXNlVXJsID0gXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL1wiO1xyXG4gICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvXCI7XHJcbiAgICAgICAgdGhpcy50b3RhbEZpbG0gPSA4O1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVEZXJuaWVyRmlsbSgpIHtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJEZXJuaWVyRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArICdtb3ZpZS9ub3dfcGxheWluZz9hcGlfa2V5PScgKyB0aGlzLmFwaUtleSArICcmbGFuZ3VhZ2U9JyArIHRoaXMubGFuZyArICcmcGFnZT0xJyk7XHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyRGVybmllckZpbG0oZXZlbnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncmV0b3VyRGVybmllckZpbG0nKTtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCkucmVzdWx0cztcclxuICAgICAgICB0aGlzLmFmZmljaGVyRGVybmllckZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJEZXJuaWVyRmlsbShkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2FmZmljaGVyRGVybmllckZpbG0nKTtcclxuXHJcbiAgICAgICAgbGV0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdGUtZmlsbXMnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzZWN0aW9uKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRvdGFsRmlsbTsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGFbaV0udGl0bGUpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhW2ldLm92ZXJ2aWV3KTtcclxuICAgICAgICAgICAgbGV0IGFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcGxhdGUgLmZpbG0nKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignaDInKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYoZGF0YVtpXS5vdmVydmlldyAhPSBcIlwiKXtcclxuICAgICAgICAgICAgLy8gICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldztcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IFwiQXVjdW5lIGRlc2NyaXB0aW9uIGRpc3BvbmlibGVcIjtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24nKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3IHx8IFwiQXVjdW5lIGRlc2NyaXB0aW9uIGRpc3BvbmlibGVcIjtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IGFydGljbGUucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzMwMFwiICsgZGF0YVtpXS5wb3N0ZXJfcGF0aDtcclxuICAgICAgICAgICAgaW1hZ2UuYWx0ID0gZGF0YVtpXS50aXRsZTtcclxuXHJcblxyXG4gICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5ocmVmID0gXCJmaWNoZS1maWxtLmh0bWw/aWQ9XCIgKyBkYXRhW2ldLmlkO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYXJ0aWNsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIHJlcXVldGVJbmZvRmlsbShtb3ZpZUlkKSB7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VySW5mb0ZpbG0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKCdHRVQnLCB0aGlzLmJhc2VVcmwgKyAnbW92aWUvJyArIG1vdmllSWQgKyAnP2FwaV9rZXk9JyArIHRoaXMuYXBpS2V5ICsgJyZsYW5ndWFnZT0nICsgdGhpcy5sYW5nKTtcclxuICAgICAgIC8vMTQ/YXBpX2tleT1iMjJmOWIyMGM2OGFkMzY4OTNkM2M4Yjc1ZjI5NzcxYSZsYW5ndWFnZT1lbi1VU1xyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91ckluZm9GaWxtKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB0aGlzLmFmZmljaGVySW5mb0ZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJJbmZvRmlsbShkYXRhKSB7XHJcblxyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMScpLmlubmVySFRNTD0gZGF0YS50aXRsZTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5yZXF1ZXRlQWN0ZXVyKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJlcXVldGVBY3RldXIoKXtcclxuICAgICAgICAvL3JlcXVldGUgdmVycyBHRVQgY3JlZGl0KG1vdmllREIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXRvdXJSZXF1ZXRlQWN0ZXVyKCl7XHJcbiAgICAgICAgLy9mYWlyZSBhdHRlbnRpb24gSlNPTi5wYXJzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWZmaWNoZXJSZXF1ZXRlQWN0ZXVyKCl7XHJcbiAgICAgICAgLy9ib3VjbGUgZm9yIGV0IGNsb25lIGRpdi5hY3RldXJcclxuICAgICAgICB9XHJcblxyXG59Il0sImZpbGUiOiJzY3JpcHQuanMifQ==
