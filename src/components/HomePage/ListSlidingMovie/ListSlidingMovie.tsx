
import { useEffect, FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { toggleState, trendingData } from "../SliceApi/SliceApiTrending";
import { trendingStatus } from "../SliceApi/SliceApiTrending";
import { Link } from "react-router-dom";
import { getTrendingMovie } from "../SliceApi/SliceApiTrending";
import { MovieType } from "../../../Type/MovieType";
import { memo } from "react";
import { useReleaseDay } from "../../../useReleaseDay/useReleaseDay";
let movies: MovieType[] = [];
const dummy = new Array(20).fill(undefined);
export const ListSlidingMovie: FunctionComponent<{}> = memo(function ListSlidingMovie() {
  const dispatch = useAppDispatch();
  const toggleStateData = useAppSelector(toggleState);
  const data = useAppSelector(trendingData);
    const status = useAppSelector(trendingStatus);
  if (status === "success")
 movies = data[0].results;

  
  useEffect(() => {
    const time:string = toggleStateData ? "day" : "week";
    dispatch(getTrendingMovie(time));
  }, [toggleStateData]);
  if (status == "pending") {
    return (
      <div
        id="list_content"
        className="  flex h-3/4 flex-nowrap gap-10 
      overflow-y-hidden overflow-x-scroll rounded-[10px]  border-[10px] border-[rgb(133,_137,_148)] px-2 pt-4 "
      >
        {dummy.map((dummy, i) => (
          <div className="  basis-200 shrink-0 grow-0 " key={i}>
            <div className="mb-2  h-[300px]  w-[200px] animate-pulse rounded-lg bg-slate-700 "></div>
            <div className="h-[50px] w-[200px] ">
              <h1 className="mb-2 h-1/2  w-full animate-pulse rounded-lg bg-slate-700 "></h1>
              <div className="h-1/2 w-full animate-pulse   rounded-lg bg-slate-700 ">
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (status == "success") {
    return (
      <div
        id="list_content"
        className="  flex h-3/4 flex-nowrap
      gap-10 overflow-y-hidden overflow-x-scroll rounded-[10px] border border-[10px] border-[rgb(133,_137,_148)] px-3  pt-4 "
      >
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="basis-200 block shrink-0 grow-0">
              <Link className={""} to={`/description/movie/${movie.id}`}>
                <img
                  loading="lazy"
                  className="rounded-lg"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  width="200"
                  height="300"
                />
              </Link>
              <div className=" max-sm-prose  w-[200px] text-white">
                <h1>{movie.title}</h1>
                <div className="flex gap-5">
                  <div>{Math.round(movie.vote_average)}</div>
                  <div className="text-white">
                    {`${useReleaseDay(movie)} 
                    `}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );

  }
  else {
    return <div>Error</div>;
  
   }
});