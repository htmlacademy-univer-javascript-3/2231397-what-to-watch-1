import { FC, useEffect, useState } from 'react';
import { Movie } from '../../types/main-page.types';
import { Link, useNavigate } from 'react-router-dom';
import { VideoPlayer } from '../video-player/video-player';
import {getMovieLink} from '../../utils/movie';


type Props = {
  movie: Movie;
}

const MovieCard: FC<Props> = (props) => {
  const { movie: { previewVideoLink, posterImage, id, name }} = props;

  const navigate = useNavigate();

  const [isVideoStarted, setIsVideoStarted] = useState<boolean>(false);
  const [cardHovered, setCardHovered] = useState<boolean>(false);

  useEffect(() => {
    let videoNeedToPlay = true;

    if (cardHovered) {
      setTimeout(() => videoNeedToPlay && setIsVideoStarted(true), 500);
    }

    return () => {
      videoNeedToPlay = false;
    };
  }, [cardHovered]);

  const handleMouseEnter = () => {
    setCardHovered(true);
  };

  const handleMouseLeave = () => {
    setCardHovered(false);
    setIsVideoStarted(false);
  };


  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(getMovieLink(id))}
    >
      <div className="small-film-card__image">
        <VideoPlayer
          src={previewVideoLink}
          poster={posterImage}
          muted
          height="175"
          width="280"
          isPlaying={isVideoStarted}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={getMovieLink(id)}
        >
          {name}
        </Link>
      </h3>
    </article>
  );
};

export default MovieCard;
