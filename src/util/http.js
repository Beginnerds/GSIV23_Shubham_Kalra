import axios from "axios";

export async function getUpcomingMoviesList(page=1){
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
    const headers = {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGY3MzgzZDljZjMxOGM1OGEyMDA2ZGIwZGMyNWU1ZSIsInN1YiI6IjVlODg0YWFhNmRjNmMwMDAxMzgxNmRmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jNEVrAb9IvAdbbOXNLcl11x7cIB1SToIArkJDEQ43cY'
    }
    let response = await axios.get(url,{
        headers:headers
    });

    response = response.data;

    // something went wrong with the request
    if(response.errors && response.errors.length > 0){
        console.error("Requested failed with Error(s): ", response.errors);
        return;
    }

    return response;    
}

export async function searchMoviesList(query,page=1){
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
    const headers = {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGY3MzgzZDljZjMxOGM1OGEyMDA2ZGIwZGMyNWU1ZSIsInN1YiI6IjVlODg0YWFhNmRjNmMwMDAxMzgxNmRmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jNEVrAb9IvAdbbOXNLcl11x7cIB1SToIArkJDEQ43cY'
    }
    let response = await axios.get(url,{
        headers:headers
    });

    response = response.data;

    // something went wrong with the request
    if(response.errors && response.errors.length > 0){
        console.error("Requested failed with Error(s): ", response.errors);
        return;
    }

    return response;    
}

export async function getMovieDetails(movieId){
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    const headers = {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGY3MzgzZDljZjMxOGM1OGEyMDA2ZGIwZGMyNWU1ZSIsInN1YiI6IjVlODg0YWFhNmRjNmMwMDAxMzgxNmRmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jNEVrAb9IvAdbbOXNLcl11x7cIB1SToIArkJDEQ43cY'
    }
    let response = await axios.get(url,{
        headers:headers
    });

    response = response.data;

    if(response.success == false){
        console.error("Requested failed with Error(s): ",response.status_message);
        return
    }

    return response;

}

export async function getMovieCredits(movieId){
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
    const headers = {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZGY3MzgzZDljZjMxOGM1OGEyMDA2ZGIwZGMyNWU1ZSIsInN1YiI6IjVlODg0YWFhNmRjNmMwMDAxMzgxNmRmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jNEVrAb9IvAdbbOXNLcl11x7cIB1SToIArkJDEQ43cY'
    }
    let response = await axios.get(url,{
        headers:headers
    });

    response = response.data;

    // something went wrong with the request
    if(response.success == false){
        console.error("Requested failed with Error(s): ",response.status_message);
        return
    }

    return response; 

}