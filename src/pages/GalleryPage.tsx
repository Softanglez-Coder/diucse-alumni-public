import { useState } from "react";
import { motion } from "framer-motion";
import { gallery } from "./../constants/gallery"; // Adjust the import path as necessary
import MainNav from "../components/layout/MainNav";
import Footer from "../components/layout/Footer";

export default function GalleryPage() {
  const [sortedGallery, setSortedGallery] = useState(gallery);
  const [selectedImage, setSelectedImage] = useState(null);
  const sortByAlbum = () => {
    const sorted = [...gallery].sort((a, b) => (a.album || "").localeCompare(b.album || ""));
    setSortedGallery(sorted);
  };

  const handleImageClick = (item) => {
    setSelectedImage(item);
  };

  return (
    <div>
      <MainNav />
      <section className="py-16 px-4 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-center text-green-700 mb-12">Event Gallery</h2>
      <div className="text-center mb-8">
        <button
          onClick={sortByAlbum}
          className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Sort by Album
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {sortedGallery.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.id * 0.05, duration: 0.4 }}
            viewport={{ once: true }}
            className="relative w-full overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition duration-300"
          >
            <div className="relative w-full h-full group">
              <img
                src={item.image}
                alt={`Gallery Image ${item.id}`}
                className="w-full h-full object-cover rounded-xl transform transition duration-500 group-hover:scale-125 cursor-pointer"
                onClick={() => handleImageClick(item)} // Single click to show image as a card
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-70 transition duration-300 rounded-xl flex items-end p-4">
                <div className="text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition duration-300">
                  {/* Title */}
                  {item.title && (
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  )}
                  {/* Album */}
                  {item.album && (
                    <p className="text-sm italic">{item.album}</p>
                  )}
                  {/* Default Text for Items without Title and Album */}
                  {!item.title && !item.album && (
                    <p className="text-sm italic">No Title or Album</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)} // Close card when clicking outside
        >
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center">
            <img
              src={selectedImage.image}
              alt={`Selected Image ${selectedImage.id}`}
              className="w-full h-auto rounded-xl mb-6"
            />
            <h3 className="text-2xl font-semibold mb-2">{selectedImage.title || "No Title"}</h3>
            <p className="text-lg italic">{selectedImage.album || "No Album"}</p>
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-4 py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
      <Footer />
    </div>
  );
}
