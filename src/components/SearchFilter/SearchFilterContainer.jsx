import MovieList from "./MovieList/MovieList";
import SortFilter from "./SortFilter";
import { useState, useEffect } from "react";
import { Navbar } from "../HomePage/Navbar/Navbar";
import { useLoaderData } from "react-router-dom";
function SearchFilterContainer() {
  const [valueUserVote, setValueUserVote] = useState([0, 100]);
  // useEffect(() => {
  //   var parent = document.getElementById("root");
  //   var child = document.getElementById("child");
  //   child.style.height = "800px";
  //   function updateChildHeight() {
  //     var parentHeight = parent.offsetHeight;
  //     child.style.height = parentHeight + "px";
  //   }

  //   updateChildHeight();

  //   var observer = new MutationObserver(updateChildHeight);
  //   observer.observe(parent, {
  //     attributes: true,
  //     childList: true,
  //     subtree: true,
  //   });
  //   parent.addEventListener("scroll", updateChildHeight);

  //   return () => {
  //     observer.disconnect();
  //     parent.removeEventListener("scroll", updateChildHeight);
  //   };
  // }, []);
  const { movies, q } = useLoaderData();
  const [movieId, setMovieId] = useState({
    id: null,
    page: 1,
    sort: "popularity.desc",
    min: valueUserVote[0],
    max: valueUserVote[1],
  });
  return (
    <>
      <div
        className=" absolute z-[-50]  h-auto min-h-full w-full bg-slate-900"
        id="child"
      ></div>
      <div className="blob"></div>
      <Navbar movies={movies} q={q} />
      <div className=" overflow-x-hidden bg-transparent text-white md:flex">
        <div className="md:w-1/4">
          <SortFilter
            movieId={movieId}
            setMovieId={(movieId) => setMovieId(movieId)}
            valueUserVote={valueUserVote}
            setValueUserVote={(valueUserVote) =>
              setValueUserVote(valueUserVote)
            }
          />
        </div>
        <div className="md:flex-1" id="parent">
          <MovieList
            movieId={movieId}
            setMovieId={(movieId) => setMovieId(movieId)}
          />
        </div>
      </div>
    </>
  );
}

export default SearchFilterContainer;
