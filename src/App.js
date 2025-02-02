import { useEffect, useState } from 'react';
import { getEvents, extractLocations } from './api';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import './App.css';



const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  const fetchData = async () => {

    const allEvents = await getEvents();
    let filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    // Check to see if there are events and allEvents count
    if (currentNOE && currentNOE < filteredEvents.length) {
      filteredEvents = filteredEvents.slice(0, currentNOE)
    }
    setEvents(filteredEvents.slice(0, currentNOE));

    setAllLocations(extractLocations(allEvents));
  }

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <h1>Meet</h1>

      {/* Search bar */}
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />

      {/* Events filter */}
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />

      {/* Events */}
      <EventList events={events} />

    </div>
  );
}

export default App;
