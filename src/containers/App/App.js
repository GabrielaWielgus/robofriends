import React, { useState, useEffect } from "react";
import CardList from "../../components/CardList/CardList";
import SearchBox from "../../components/SearchBox/SearchBox";
import './App.css';
import Scroll from "../../components/Scroll/Scroll";
import ErrorBoundry from "../../components/ErrorBoundry/ErrorBoundry";

function App() {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setRobots(users))
  }, []);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const filterRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  return !robots.length ?
    <h1>Loading</h1> :
    (
      <div className="tc">
        <h1>Robo Friends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filterRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
}

export default App;
