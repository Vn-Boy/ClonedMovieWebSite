import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useState, useEffect } from "react";
function RangeSliderInput({
  valueUserVote,
  setValueUserVote,
  movieId,
  setMovieId,
}) {
  useEffect(() => {
    setMovieId({
      ...movieId,
      min: valueUserVote[0],
      max: valueUserVote[1],
    });
  }, [valueUserVote]);
  return (
    <>
      {valueUserVote[0] < valueUserVote[1] && (
        <p className="text-center">
          {valueUserVote[0] / 10} - {valueUserVote[1] / 10}
        </p>
      )}
      {valueUserVote[0] >= valueUserVote[1] && (
        <p className="text-center">{"Error"}</p>
      )}

      <RangeSlider value={valueUserVote} onInput={setValueUserVote} />
    </>
  );
}

export default RangeSliderInput;
