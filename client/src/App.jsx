import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

export default function App() {

  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [list, setList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:8080/api/get').then((response) => {
      setList(response.data);
    }, []);
  });

  const submitReview = () => {
    Axios.post('http://localhost:8080/api/insert', {
      name: name,
      review: review
    });
    alert('Inserido com sucesso!');
    setList([...list, {name: name, review: review}]);
    setName('');
    setReview('');
   
  }

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:8080/api/delete/${movie}`);
  }

  const updateReview = (movie) => {
    Axios.put('http://localhost:8080/api/update', {
      name: movie,
      review: newReview
    });
    setNewReview('');
  };

  return(
    <div className="App">
      <h1>Movie Reviews</h1>
      <div className="form">
        <label htmlFor="name">Movie Name:</label>
        <input type="text" name="name" id="name" onChange={(e) => {setName(e.target.value)}} />
        <label htmlFor="review">Movie Review:</label>
        <input type="text" name="review" id="review" onChange={(e) => {setReview(e.target.value)}} />
        <button onClick={submitReview} >Submit</button>
        {list.map((value, index) => {
          return ( 
            <div className="card" key={index}>
              <h1>{value.name}</h1>
              <p>{value.review}</p>
              <input type="text" id="updateInput" onChange={(e) => setNewReview(e.target.value)}/>
              <button onClick={() => {updateReview(value.name)}}>Update</button>
              <br />
              <button onClick={() => {deleteReview(value.name)}}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );

}