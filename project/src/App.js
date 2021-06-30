import { useState, useEffect } from 'react';
import './App.css';
import TopCard from './modules/topMovies';
import AllMovies from './modules/allMovies';
import Cart from './modules/cart';
import profile from './assets/images/profilePhoto.jpg';




function App() {

  function handleCart(item, instruction){
    let cartArray = [...cart];
    

    let movieToBeChanged = cartArray.find(movie => movie.title === item.title);


    if(!movieToBeChanged){
      cartArray.push({
        title: item.title,
        poster_path: item.poster_path,
        vote_average: item.vote_average,
        price: item.price, 
        quantity: 1
      });
    }
    else{
      if(instruction === "+"){
        movieToBeChanged.quantity++;
      }else{
        movieToBeChanged.quantity--;
      }

      let index; 
      for(let i = 0; i < cartArray.length; i++){
           if(cartArray[i].title === movieToBeChanged.title){
              index = i;
          }
      }

      if(movieToBeChanged.quantity <= 0){
        cartArray.splice(index, 1);
      }else{
        cartArray.splice(index, 1, movieToBeChanged);
      }
      
    }
    console.log(cartArray);
    setCart(cartArray);
  }


  const [cart, setCart] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [movieSearch, setMovieSearch] = useState("");
  const [currentDisplay, setCurrentDisplay] = useState([]);
  const [title, setTitle] = useState(false);

  useEffect(() =>{
    getData();
  }, []);
  
  async function getData(){
    const resData = await fetch("https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR");
    let formatedData = await resData.json();
    formatedData = formatedData.results;
    let topData = []
    for(let i = 0; i < 5; i++){
    topData.push(formatedData[i]);
    }
    setAllMovies(formatedData);
    setTopMovies(topData);
    setCurrentDisplay(topData);
  }

  async function submit(e){
    e.preventDefault();
    const searchWord = movieSearch.toLowerCase();
    let searchResult;
    let titleStatus = true;
    if(movieSearch.length > 0){
       searchResult = allMovies.filter(movie => movie.title.toLowerCase().match(searchWord));
    }
    else{
       searchResult = topMovies;
       titleStatus = false;
    }
    setCurrentDisplay(searchResult);
    setTitle(titleStatus);
  }

  

  return (
    <div className="App">
       <div className="head">
           <svg width="50" height="72" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M0.84523 21.3983L22.5309 8.74064C23.0166 8.45862 23.6384 8.48562 24.0931 8.81864C26.1534 10.3217 27.9941 11.8458 29.2222 13.1269C29.2222 13.1269 30.2802 14.1529 30.7381 14.8039C31.4774 15.692 31.8332 16.853 31.8332 17.9811C31.8332 19.2472 31.4434 20.4442 30.6669 21.4013C30.4906 21.5723 29.8193 22.3253 29.1851 22.9403C25.4852 26.7685 15.8272 33.0929 10.7476 35.01C10.0083 35.319 8.03461 35.964 7.01065 36C6.02381 36 5.071 35.796 4.15531 35.349C3.02927 34.7339 2.14761 33.7799 1.65264 32.6488C1.33401 31.8628 0.842137 29.5047 0.842137 29.4357C0.523502 27.7526 0.2853 25.3885 0.167746 22.6283C0.146091 22.1333 0.409042 21.6533 0.84523 21.3983Z" fill="#FCBDEB"/>
             <path opacity="0.4" d="M2.29534 14.5806C1.33944 15.1416 0.136051 14.4246 0.182454 13.3475C0.296915 10.8214 0.494901 8.59529 0.736197 6.9392C0.773319 6.9032 1.26519 3.96605 1.83131 2.973C2.81815 1.12791 4.7547 -0.000145912 6.83665 -0.000145912H7.00989C8.35248 0.032855 11.2078 1.16091 11.2078 1.22991C12.6463 1.79694 14.5241 2.75699 16.5442 3.91205C17.4537 4.43408 17.4753 5.71514 16.5658 6.24617L2.29534 14.5806Z" fill="#F089D3"/>
           </svg>
           <form onSubmit={submit}>
           <input type="txt" id="movieSearch" name="search" placeholder="Pesquise filmes..." value={movieSearch} onChange={(e) => setMovieSearch(e.target.value)} />
           </form>
           <p>Bem vindo, Vitor!</p>
           <img src={profile} width="60px" height="60px" />


        </div>
       <div className="bodyContainer">
         <div className="moviesContainer"> 
           <h1>{title ? "Pesquisa" : "Top filmes"}</h1>
           <div className="topCards">
             { currentDisplay.length > 0 ? <TopCard someMovies={currentDisplay} handleCart={handleCart} /> : "Não encontrado"}
           </div>
           {!title && (<> <h1>Todos os filmes</h1>
           <div className="allCards">
             <AllMovies allMovies={allMovies} handleCart={handleCart} />
           </div> 
           </>)}
         </div>
         <div className="chartContainer">
           <div className="fixedChart">
             <Cart cart={cart} handleCart={handleCart} />
           </div>
         </div>
       </div>
     
    </div>
  );
}

export default App;
