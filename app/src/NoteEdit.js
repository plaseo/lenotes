import React, { useEffect, useState, } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import { useCookies } from 'react-cookie';

const NoteEdit = () => {
  const initialFormState = {
    title: '',
    body: '',
    tag: 'card bg-[#03BFF3] text-primary-content w-96',
  };

  const [note, setNote] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookies] = useCookies(['XSRF-TOKEN']);
  const [textareaHeight, setTextareaHeight] = useState("auto");

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/api/note/${id}`)
        .then(response => response.json())
        .then(data => setNote(data));
    }
  }, [id, setNote]);

  const handleChange = (event) => {
    const { name, value } = event.target
    setNote({ ...note, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/api/note${note.id ? `/${note.id}` : ''}`, {
      method: (note.id) ? 'PUT' : 'POST',
      headers: {
        'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note),
      credentials: 'include'
    });
    setNote(initialFormState);
    navigate('/notes');
  }

  useEffect(() => {
    setTextareaHeight("auto");
    const scrollHeight = document.getElementById("textarea").scrollHeight;
    setTextareaHeight(`${scrollHeight}px`);
  }, [note.body]);

  return (
  <div>
    <AppNavbar/>
    <div className='centernote'>
      <div className="card card-compact bg-[#03BFF3] text-primary-content w-96">
        <div className='card-body p-2'>
          <div className="card-actions justify-start">
            <input
              type="radio"
              name='tag'
              id='tag'
              className="radio bg-[#EA2B48] checked:bg-[#EA2B48] mb-2 !mt-0"
              value="card bg-[#EA2B48] text-primary-content w-96"
              checked={note.tag === 'card bg-[#EA2B48] text-primary-content w-96'}
              onChange={handleChange}
            />
            <input
              type="radio"
              name='tag'
              id='tag'
              className="radio bg-[#48DE4A] checked:bg-[#48DE4A] mb-2 !mt-0"
              value="card bg-[#48DE4A] text-primary-content w-96"
              checked={note.tag === 'card bg-[#48DE4A] text-primary-content w-96'}
              onChange={handleChange}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-actions justify-center"> 
              <input
                type="text"
                name='title'
                id='title'
                placeholder="Title"
                className="input input-ghost w-60 max-w-xs !placeholder-slate-300 " 
                value={note.title}
                onChange={handleChange}
              />
              <textarea
                id='textarea'
                name = "body"
                value={note.body}
                onChange={handleChange}
                placeholder="Type your note here"
                className="textarea textarea-ghost !placeholder-slate-300"
                cols={39}
                rows={1}
                style={{
                  height: textareaHeight,
                  overflow: "hidden",
                  resize: "none",
                }}
              />
            </div>
            <div className="card-actions justify-center"> 
              <button
                className="btn btn-ghost btn-circle !mt-0 !mb-0 !pb-0"
                type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFB71B"
                  strokeWidth="2"
                  strokeLinecap="butt"
                  strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
              </button>
              <a href='/notes' className="btn btn-ghost btn-circle !mb-0 !mt-0 !pb-0">
                <svg xmlns="http://www.w3.org/2000/svg" 
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFB71B"
                  strokeWidth="2"
                  strokeLinecap="butt"
                  strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                </svg>
              </a>
            </div>
          </form>          
        </div>
      </div>
    </div> 
  </div>
  )
};

export default NoteEdit;
