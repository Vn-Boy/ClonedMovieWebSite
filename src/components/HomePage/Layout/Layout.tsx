import { Outlet } from "react-router-dom";

import { useRef, useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { createPortal } from "react-dom";
import { Navbar } from "../Navbar/Navbar";
import { ImageSlider } from "../ImageSlider/ImageSlider";
import { LatestTrailer } from "../LatestTrailer/LatestTrailer";
import { SlideMovive } from "../SlideMovie/SlideMovie";
import { useLoaderData } from "react-router-dom";
import { getTheMovie } from "../Navbar/Helper";
import { getLatestMovie } from "../SliceApi/SliceApiLatest";
import { LoaderData } from "../../../Type/loaderType";
import { ScrollRestoration } from "react-router-dom";
import { latestStatus } from "../SliceApi/SliceApiLatest";
import LoadingAnimationPage from "../LoadingAnimationPage/LoadingAnimationPage";
import Footer from "../Footer/Footer";
export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("search");
  if (!q) {
    return {
      movies: [],
      q: "",
    };
  }
  const movies = await getTheMovie(q);
  return { movies, q };
}
const Layout = (): JSX.Element => {
  const { movies, q } = useLoaderData() as LoaderData<typeof loader>;
  const [scrollPos, setScrollPos] = useState(
    Number(sessionStorage.getItem("scrollPos")) || 0
  );
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [dataToprated, setDataToprated] = useState([]);
  const status = useAppSelector(latestStatus);

  const fetchData = async () => {
    const data = await fetch(
      `${import.meta.env.VITE_SITE_API_TMDB}/3/movie/now_playing?api_key=${
        import.meta.env.VITE_TMBD_API_KEY
      }&language=en-US&page=1`
    );
    const dataJSON = await data.json();
    setIsLoading(false);
    setDataToprated(dataJSON.results);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    dispatch(getLatestMovie());
    if (status === "success") {
      var parent = document.getElementById("root") as HTMLElement;
      var child = document.getElementById("child") as HTMLElement;
      var parentHeight = parent.offsetHeight;
      child.style.height = parentHeight + "px";
    }
  }, []);
  if (status === "success")
    return (
      <>
        <div className="backdrop bg-slate-900 " id="child"></div>

        <div className="blob"></div>
        <div
          id="layout"
          className=" relative h-full overflow-hidden bg-transparent "
          onLoad={(e) => {
            e.preventDefault();
            if (scrollPos) {
              e.currentTarget.scrollTo(0, scrollPos);
            }
          }}
          onScroll={(e) => {
            e.preventDefault();
            setScrollPos(e.currentTarget.scrollTop);
            sessionStorage.setItem("scroll", String(scrollPos));
          }}
        >
          {createPortal(
            <Outlet />,
            document.getElementById("root") as HTMLElement
          )}

          <Navbar movies={movies!} q={q ? q : ""} />

          <div className=" media_image_container mx-20 mt-10 h-[510px] ">
            <ImageSlider dataToprated={dataToprated} isLoading={isLoading} />
          </div>

          <div className=" image_responsive mx-20  h-[600px] ">
            <SlideMovive />
          </div>
          <div className=" trailer_mobile image_responsive mx-20 flex h-[300px] flex-col gap-4 lg:h-[400px]">
            <LatestTrailer />
          </div>
          <div>
            <Footer />
          </div>
        </div>
        <ScrollRestoration
          getKey={(location, matches) => {
            const paths = ["/description/movie"];
            if (paths.includes(location.pathname)) return location.key; // restore  by browser;
            return location.pathname; // restore by last route enter;
          }}
        />
      </>
    );
  else return <>{createPortal(<LoadingAnimationPage />, document.body)}</>;
};
export default Layout;
