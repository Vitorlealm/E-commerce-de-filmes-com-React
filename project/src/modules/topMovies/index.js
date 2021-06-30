import './style.css';

function truncate(str){
    const n = 13; // tamanho max da string
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
  };

function TopCard({ someMovies, handleCart }){
    return(
        <>
        {someMovies.map(item =>( <div className="card">
        <div className="img" style={{backgroundImage:`url(${item.poster_path})`}}>
           <div className="info">
               <h3 >{truncate(item.title)}</h3>
               <div className="rating">
                  <svg width="13" height="13" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity= "1" d="M6.5 0L7.95934 4.49139H12.6819L8.86126 7.26722L10.3206 11.7586L6.5 8.98278L2.6794 11.7586L4.13874 7.26722L0.318133 4.49139H5.04066L6.5 0Z" fill="#FBCD6E"/>
                  </svg>
                  <p>{item.vote_average}</p>
               </div>
           </div>
           <button onClick={() => handleCart(item, "+")}>
                   <div className="innerButtonDiv">
                       <h4>Sacola</h4>
                       <h4>R$ {item.price}</h4>
                   </div>
               </button>
        </div>
        </div>
    ))}
       
        </> 
    );
}

export default TopCard;