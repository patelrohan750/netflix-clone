import React, { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css';
import ScrollContainer from 'react-indiana-drag-scroll';
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";
import Tooltip from "@material-ui/core/Tooltip";
// import requests from './requests';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
	const [ movies, setMovies ] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");

	useEffect(
		() => {
			async function fetchdata() {
				const request = await axios.get(fetchUrl);
				setMovies(request.data.results);
				return request;
			}
			fetchdata();
		},
		[ fetchUrl ]
	);
	const Opts = {
		height: '390',
		width: '100%',
		playerVars: {
			autoplay: 1,
		},
	};

	const handleClick = (movie) => {
		console.log(`Movie name is ${movie}`);
		// console.table(movie?.title)
		if (trailerUrl) {
		  setTrailerUrl('')
		} else {
		  movieTrailer(movie?.title || "")
			.then(url => {
		console.log(`URl is ${url}`);

			  const urlParams = new URLSearchParams(new URL(url).search);
			  console.log(`urlparams is ${urlParams}`);
			  setTrailerUrl(urlParams.get('v'));
			}).catch((error) => console.log(error));
		}
	  }
	console.log(movies);

	return (
		<div className="row">
			<h2>{title}</h2>
			<ScrollContainer className="row__posters">
				{/* <div className="row__posters"> */}
				{movies.map((movie) => (
					<Tooltip
           			 	placement="bottom"
            			title={movie?.original_name || movie?.original_title}
           				 key={movie.id} >
          
					<img
						key={movie.id}
						onClick={() => handleClick(movie)}
						className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
						src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
						alt={movie.name}
					/>
					</Tooltip>
				))}
				{/* </div> */}
			</ScrollContainer>
			{trailerUrl && <YouTube videoId={trailerUrl} opts={Opts} />}
		</div>
	);
}

export default Row;
