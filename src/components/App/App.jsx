import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const elements = useSelector(store => store.elementList)
  const [newElement, setNewElement] = useState('');
  const planets = useSelector(store => store.planets);


  const getElements = () => {


    // anywhere you want to do a GET, you can write this...
    dispatch({ type: 'FETCH_ELEMENTS' });

    // OLD AXIOS GET

    // axios.get('/api/element').then(response => {
    //   dispatch({ type: 'SET_ELEMENTS', payload: response.data });
    // })
    //   .catch(error => {
    //     console.log('error with element get request', error);
    //   });
  }

  useEffect(() => {
    getElements();
    getPlanets();
  }, []);

  const addElement = () => {

    dispatch({ 
      type: 'ADD_ELEMENT', 
      payload: { name: newElement }
    })

    // OLD axios POST

    // axios.post('/api/element', {
    //   name: newElement
    // })
    //   .then(() => {
    //     getElements();
    //     setNewElement('');
    //   })
    //   .catch(error => {
    //     console.log('error with element get request', error);
    //   });

  }


  const getPlanets = () => {
    dispatch({ type: 'FETCH_PLANETS' });
  }

  return (
    <div>
      <h1>Atomic Elements</h1>

      <ul>
        {elements.map(element => (
          <li key={element}>
            {element}
          </li>
        ))}
      </ul>

      <input
        value={newElement}
        onChange={evt => setNewElement(evt.target.value)}
      />
      <button onClick={addElement}>Add Element</button>

      <h2>Planets</h2>
      
          <ul>
            {planets.map((planet, index) => 
            <li key={index}>{planet.name}</li>)}
          </ul>

    </div>
  );
}


export default App;
