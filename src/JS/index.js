import axios from "axios";
import "../CSS/style.css";
import laptop from "./laptop"

const titleDiv = document.getElementById("title-div")
const leftNavbar = document.querySelector(".left-navbar")
    leftNavbar.appendChild(laptop())
const listStories = document.querySelector(".list-stories")
let allNews = new Array()
let loadedID = 0;
const btnLoadMore10 = document.getElementById("btn-load-more-10")
const loader = document.getElementById("loading-wrapper");

const loaderBtn = document.getElementById("loading-btn")
const loadMore = document.getElementById("load-more")


//FUNZIONI

    // Chiamata Api delle ultime News
    // Creazione Array contenente tutti gli ID

    const getData = async () =>{
        try{
            const res = await axios.get("https://hacker-news.firebaseio.com/v0/newstories.json")
            const dati = res.data
            dati.forEach(dato => {
                allNews.push(dato)
            });
            // console.log(elenco, "console di getData")
            return allNews
        } catch(err){
            console.log(err)
        }
    }

    // Chiamata Api dei dettagli della news in base all'ID passato

    const newsDetails = async (Id) =>{
        try{
            const resp = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${allNews[Id]}.json`)
            // console.log(resp, "Dettagli news")
                let casellaNews = document.createElement("div")
                    casellaNews.className = "casella-news"
                let casellaNewsBy = document.createElement("div")
                    casellaNewsBy.className = "casella-news-by"
                let casellaNewsLinkTime = document.createElement("div")
                    casellaNewsLinkTime.className = ("casella-news-link-time")
                let linkNews = document.createElement("a")
                    linkNews.innerText = "Click here to read this news"
                    linkNews.className = ("link-news")
                    linkNews.setAttribute("href", `${resp.data.url}`)
                    linkNews.setAttribute("target", "_blank")
                    linkNews.setAttribute("rel", "noopener")
                let titleNews = document.createElement("h4")
                    titleNews.innerText = resp.data.title
                let byNews = document.createElement("p")
                    byNews.innerText = `-BY: ${resp.data.by}-`;
            //FORMATTAZIONE ORARIO   
                let timeNews = new Date((resp.data.time)*1000)
                let year = timeNews.getFullYear();
                let month = timeNews.getMonth() + 1 + "-"
                let dayNumber = timeNews.getDate() + "-"
                let hours = timeNews.getHours() + ":"
                let minutes = timeNews.getMinutes()
                parseInt(minutes) < 10 ? minutes = "0" + minutes : null;
                let time = document.createElement("p")
                    time.innerText = `${dayNumber}${month}${year} ${hours}${minutes}`
                // console.log(time, "ORARIO!")

                casellaNews.appendChild(titleNews)
                casellaNewsBy.appendChild(byNews)
                casellaNews.appendChild(casellaNewsBy)
                casellaNewsLinkTime.appendChild(linkNews)
                casellaNewsLinkTime.appendChild(time)
                    
                casellaNews.appendChild(casellaNewsLinkTime)
                listStories.appendChild(casellaNews)

                loader.style.display = "none"
                loadMore.style.display ="block"
                loaderBtn.style.display = "none"
        } catch(error){
            console.log(error)
        }
    }


// Funzione con Ciclo For per Creare e "mostrare" un div contenente i dettagli della news
//Il ciclo For include un setTimeout di 100ms
//Include Funzione newsDetails()

    async function load(){
        let timer = ms => new Promise(res => setTimeout(res, ms));

        for (let w = 0; w < 10; w++ & loadedID++) {
            newsDetails(loadedID);
            await timer(200)
        }


    }

//Funzione che mostra i primi 10 risultati
//Include la Funzione load()

    function mostra10(){
        load()
        console.log(loadedID, "console loaded fine del ciclo")
    }

 

//INVOCAZIONE FUNZIONI

    //Al caricamento della pagina
        getData();
    // (console.log(allNews, "questo è l'elenco di tutti gli ID"));

    //Caricamento dei primi 10 risultati
        setTimeout(mostra10, 1500)
    //Evento button Load more
        btnLoadMore10.addEventListener("click", ()=>{setTimeout(mostra10, 1500)} )
        btnLoadMore10.addEventListener("click", ()=>{loadMore.style.display = "none"} )
        btnLoadMore10.addEventListener("click", ()=>{loaderBtn.style.display = "flex"} )

