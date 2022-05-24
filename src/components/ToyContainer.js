import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({allToys, handleDelete, handleLike}) {
  return (
    <div id="toy-collection">
      {allToys.map(toy=>{
        return (<ToyCard handleLike={handleLike} handleDelete={handleDelete} key={toy.id} id={toy.id} name={toy.name} image={toy.image} likes={toy.likes}/>)})}
    </div>
  );
}

export default ToyContainer;
