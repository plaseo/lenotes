import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteList from './NoteList';
import NoteEdit from './NoteEdit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/notes" exact={true} element={<NoteList/>}/>
        <Route path="/notes/:id" exact={true} element={<NoteEdit/>}/>
      </Routes>
    </Router>
  )
}

export default App;
