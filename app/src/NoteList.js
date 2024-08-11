import React, { Fragment, useEffect, useState } from 'react';
import AppNavbar from './AppNavbar';
import { useCookies } from 'react-cookie';
import './notelist.css';

const NoteList = () => {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(['XSRF-TOKEN']);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch('api/notes')
      .then(response => response.json())
      .then(data => {
        setNotes(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/api/note/${id}`, {
      method: 'DELETE',
      headers: {
        'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(() => {
      let updatedNotes = [...notes].filter(i => i.id !== id);
      setNotes(updatedNotes);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  let tag1 = 'card bg-[#EA2B48] text-primary-content w-96';
  let tag2 = 'card bg-[#48DE4A] text-primary-content w-96';

  const noteList2 = notes.map(note => { 
    let noteList = note.tag;
    console.log(noteList);
    return <Fragment key={note.id}>
    <div className={`${noteList}`}>
      <div className="card card-compact">
        <div className="card-body items-center text-center !p-2">
          <h2 className="card-title">{note.title}</h2>
        </div>
        <div className="card-body items-start text-start !p-2 !text-lg !ml-8">
          <p className='whitespace-pre-wrap break-words'>{note.body}</p>
        </div>
      </div>
      <div className="card-actions justify-center">
        <a className="btn btn-ghost btn-circle" href={'/notes/' + note.id}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFB71B"
            strokeWidth="2"
            strokeLinecap="butt"
            strokeLinejoin="round">
            <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
            <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
          </svg>
        </a>
        <button className='btn btn-ghost btn-circle' onClick={() => remove(note.id)}>
          <svg xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFB71B"
            strokeWidth="2"
            strokeLinecap="butt"
            strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
  </Fragment>
});

const handleSearchClick = e => {
  setSearchVal(e.target.value);
  if (searchVal) {
  const filterBySearch = notes.filter((item) => {
    return Object.values(item)
      .join('')
      .toLowerCase()
      .includes(searchVal.toLowerCase());
  });
  setNotes(filterBySearch);
  }else{
  setNotes(notes);
  }
}

  return (
    <div>
      <AppNavbar/>    
        <div className='notez pb-4'>
            <div>
            <input className="input input-warning" onChange={e => setSearchVal(e.target.value)}>
                    </input>
                    <button className='btn btn-ghost btn-circle' onClick={handleSearchClick}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#FFB71B">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  </button>
                </div>
          </div>
        <div className='notez'>
        {noteList2}
        </div>
    </div>
  );
};

export default NoteList;