import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { FaLinkedin } from "react-icons/fa";
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

      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl text-center mb-10">All Notes</h2>
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => {
              const fileLink = `${API_URL}/${note.filePath}`;
              return (
                <div
                  key={note._id}
                  className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl "
                >
                  <h3 className="text-2xl font-semibold mb-2 ">{note.title}</h3>
                  <p className="text-gray-400 mb-4">{note.description}</p>
                  <p className="text-sm mb-4">
                    Uploaded on: {new Date(note.createdAt).toLocaleString()}
                  </p>
                  <a href={`${API_URL}/${note.filePath}`} target="_blank">
                    Download File
                  </a>
                  <div className="flex gap-4 mt-3">
                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${fileLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3b5998] hover:text-[#2d4373] text-2xl"
                      aria-label="Share on Facebook"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>

                    {/* Twitter */}
                    <a
                      href={`https://twitter.com/intent/tweet?url=${fileLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1da1f2] hover:text-[#1991db] text-2xl"
                      aria-label="Share on Twitter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${fileLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:text-[#128C7E] text-2xl"
                      aria-label="Share on WhatsApp"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29 3.617c-.545 0-1.06-.113-1.534-.338-.416-.191-.727-.468-.931-.811l-.673-1.192.693-.694c.231-.23.443-.535.615-.889.173-.354.26-.693.26-1.012 0-.496-.148-.931-.446-1.298-.272-.334-.669-.521-1.191-.521-.521 0-.93.173-1.223.521-.297.347-.446.802-.446 1.362 0 .694.223 1.436.669 2.226.446.793 1.072 1.475 1.861 2.025.793.55 1.637.826 2.53.826.793 0 1.486-.198 2.08-.595.595-.396.892-.912.892-1.547 0-.529-.26-.93-.781-1.199-.521-.272-1.262-.41-2.229-.41h-.198z" />
                        <path
                          d="M12 2a10 10 0 0110 10 10 10 0 01-10 10c-1.968 0-3.789-.6-5.307-1.623l-3.706 1.087 1.105-3.64A9.945 9.945 0 012 12 10 10 0 0112 2m0 1.5a8.5 8.5 0 00-8.5 8.5c0 1.81.59 3.483 1.59 4.83l-.95 3.137 3.232-.947A8.458 8.458 0 0012 20.5a8.5 8.5 0 000-17z"
                          fillRule="evenodd"
                        />
                      </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/sharer/sharerArticle?url=${fileLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0077b5] hover:text-[#006097] text-2xl"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedin />
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
