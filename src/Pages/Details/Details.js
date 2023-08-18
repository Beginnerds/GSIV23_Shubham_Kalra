import React from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  let { movieId } = useParams();
  return <div>Details</div>;
}
