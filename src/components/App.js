import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [allToys, setAllToys]=useState([]);


  useEffect(()=>{
    fetch('http://localhost:3001/toys')
    .then(response => response.json())
    .then(data => setAllToys(data));
  }, [])

  function handleNewToy(newToy){ 
    fetch('http://localhost:3001/toys',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newToy),
  })
  .then(response => response.json())
  .then(data=>setAllToys([...allToys,data]))
  .catch(error=>console.error('Error:', error))
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function deleteToy(donatedToyId){
    fetch(`http://localhost:3001/toys/${donatedToyId}`,{
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(()=>setAllToys(allToys.filter((toy)=>toy.id!==donatedToyId)))
  }
    
  //   handleDeletedToy(donatedToyId))
  // }
  // function handleDeletedToy(donatedToyId){
  //   const updatedToy=allToys.filter((toy)=>toy.id!==donatedToyId)
  //   setAllToys(updatedToy)
  // }

  function likeToy(likedToyId, newLikeNumber){
    fetch(`http://localhost:3001/toys/${likedToyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: newLikeNumber
    }),
  })
    .then((r) => r.json())
    .then((updatedToy) => handleLikeToy(updatedToy));
  }
  function handleLikeToy(updatedToy){
    const updatedToys=allToys.map((toy)=>{
      if (toy.id=== updatedToy.id){
        return updatedToy
      } else{
        return toy
      }
      }
    )
    setAllToys(updatedToys)
  }

  console.log(allToys)

  return (
    <>
      <Header />
      {showForm ? <ToyForm setNewToy={handleNewToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer allToys={allToys} handleDelete={deleteToy} handleLike={likeToy}/>
    </>
  );
}

export default App;
