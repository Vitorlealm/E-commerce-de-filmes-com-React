import './style.css';

function AllMovies({ allMovies, handleCart }){
    return(
        <>
        {allMovies.map(item =>( <div className="cards">
        <div className="img" style={{background:`url(${item.poster_path})`, backgroundRepeat: "noRepeat", backgroundPosition: "center", backgroundSize: "cover"}}>
           <div className="infos">
               <h3>{item.title}</h3>
               <div className="rating">
                  <svg width="13" height="13" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity= "1" d="M6.5 0L7.95934 4.49139H12.6819L8.86126 7.26722L10.3206 11.7586L6.5 8.98278L2.6794 11.7586L4.13874 7.26722L0.318133 4.49139H5.04066L6.5 0Z" fill="#FBCD6E"/>
                  </svg>
                  <p style={{opacity:"0.9"}}>{item.vote_average}</p>
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

export default AllMovies;