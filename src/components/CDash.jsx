import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import * as FaIcons from "react-icons/fa";
function CDash() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/notes`).then((res) => setNotes(res.data));
  }, []);
  return (
    <div className="min-h-screen bg-gray-800 text-white ">
      <section
        className="relative bg-cover bg-center h-[600px]"
        style={{ backgroundImage: "url('image.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-20 flex flex-col justify-center items-center text-center h-full px-6">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Explore & Share Knowledge
          </h1>
          <p className="text-lg text-white mb-6 drop-shadow-lg">
            Find, share, and collaborate on notes and educational resources.
          </p>
          <a className="px-6 py-3 bg-green-400 text-black rounded-full font-bold">
            Learn More
          </a>
        </div>
      </section>

      <div className='container mx-auto px-6 py-10' >
        <h2 className='text-3xl text-center mb-10' >All Notes</h2>
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => {
              const fileLink = `${API_URL}/${note.filePath}`;
              return (
                <div
                  key={note._id}
                  className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl "
                >
                  <h3 className='text-2xl font-semibold mb-2 ' >{note.title}</h3>
                  <p className='text-gray-400 mb-4' >{note.description}</p>
                  <p className='text-sm mb-4' >
                    Uploaded on: {new Date(note.createdAt).toLocaleString()}
                  </p>
                  <a href={`${API_URL}/${note.filePath}`} target="_blank" >Download File</a>
                  <div className="mt-3 flex space-x-3">
                    <a  href={`https://www.facebook.com/sharer/sharer.php?u=${fileLink}`} target="_blank" className='text-blue-500 hover:text-blue-400'>
                      <FaIcons.FaFacebook />
                    </a>
                    <a href={`https://www.twitter.com/intent/tweet?url=${fileLink}`} target="_blank" className='text-blue-500 hover:text-blue-400'>
                      <FaIcons.FaTwitter />
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=${fileLink}`} target="_blank" className='text-green-500 hover:text-blue-400'>
                      <FaIcons.FaWhatsapp />
                    </a>
                    <a href={`https://www.linkedin.com/sharer/sharerArticle?url=${fileLink}`} target="_blank" className='text-blue-700 hover:text-blue-400' >
                      <FaIcons.FaLinkedin />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No Notes Found</p>
        )}
      </div>
    </div>
  );
}

export default CDash;
