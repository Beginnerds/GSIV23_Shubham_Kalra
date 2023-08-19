import React from "react";
import styles from "./MovieCard.module.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from "react-router-dom";
import { colors } from "../../util/colors";

export default function MovieCard({movieId,title,rating,description,imageUrl,style={}}) {

  if(!movieId){
    console.error("Movie id is required");
    return null
  };

  if(!title || !rating || !description || !imageUrl){
    console.warn("Missing one or more props, Card might not render all information")
  }

  return (
    <Link to={`/details/${movieId}`} style={{textDecoration:"none", display:"inline-block"}}>
      <div data-testid="movie-card" className={styles.container} style={style}>
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt="Movie Poster" className={styles.image} />
        </div>

        <div className={styles.dataContainer}>
          <div className={styles.titleRatingContainer}>
            <h3 className={styles.title} data-testid="title" style={{color:colors.gray}}>{title}</h3>
            <span className={styles.rating} data-testid="rating" style={{color:colors.lightGray}}>({rating})</span>
          </div>

          <div className={styles.descriptionContainer}>
            <p className={styles.description} style={{color:colors.gray}}>{description}</p>
            <span><MoreHorizIcon style={{color:colors.gray}}/></span>
          </div>
        </div>
      </div>
    </Link>
  );
}
