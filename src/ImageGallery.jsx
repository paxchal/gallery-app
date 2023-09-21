import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ImageGallery = () => {
  const [imageData] = useState([
    // Example image data, you can add more image objects here
    {
      id: "1",

      urls: {
        regular: "https://source.unsplash.com/Sg3XwuEpybU", // URL to your image
      },
      alt_description: "dog, animal ",
    },

    {
      id: "2",
      urls: {
        regular: "https://source.unsplash.com/8IhM7yjzOGo", // URL to your image
      },
      alt_description: "Art and building",
    },
    {
      id: "3",
      urls: {
        regular: "https://source.unsplash.com/MRpMpHFz6eQ", // URL to your image
      },
      alt_description: "fish, animal, water",
    },
    {
      id: "4",
      urls: {
        regular: "https://source.unsplash.com/KxCJXXGsv9I", // URL to your image
      },
      alt_description: "building",
    },

    {
      id: "5",
      urls: {
        regular: "https://source.unsplash.com/cssvEZacHvQ", // URL to your image
      },
      alt_description: "nature, forest, waterfall",
    },
    {
      id: "6",
      urls: {
        regular: "https://source.unsplash.com/mOcdke2ZQoE", // URL to your image
      },
      alt_description: "beach, sunrise, water, sunset",
    },
    {
      id: "7",
      urls: {
        regular: "https://source.unsplash.com/4rDCa5hBlCs", // URL to your image
      },
      alt_description: "forest, trees,Editorial, Sustainability, Nature",
    },
    {
      id: "8",
      urls: {
        regular: "https://source.unsplash.com/iFgRcqHznqg", // URL to your image
      },
      alt_description: "people, man, human",
    },
    {
      id: "9",
      urls: {
        regular: "https://source.unsplash.com/CEx86maLUSc", // URL to your image
      },
      alt_description: "cat, animal",
    },
    {
      id: "10",
      urls: {
        regular: "https://source.unsplash.com/rNqs9hM0U8I", // URL to your image
      },
      alt_description: "drone, tech",
    },
    {
      id: "11",
      urls: {
        regular: "https://source.unsplash.com/Bnl5yt3SNsM", // URL to your image
      },
      alt_description: "computer , tech ",
    },
    {
      id: "12",
      urls: {
        regular: "https://source.unsplash.com/Zpzf7TLj_gA", // URL to your image
      },
      alt_description: "people, woman, human",
    },
    // Add more image objects as needed
  ]);
  //const [loading, setLoading] = useState(false);  Loading state
  const [searchInput, setSearchInput] = useState(""); // Search input
  const [filteredData, setFilteredData] = useState(imageData); // Filtered images

  // Handle drag-and-drop reordering
  const onDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside the list

    const reorderedImages = Array.from(filteredData);
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setFilteredData(reorderedImages);
  };

  // Handle search input change
  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    // Filter images based on alt descriptions
    const filteredImages = imageData.filter((imageInfo) =>
      imageInfo.alt_description.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredData(filteredImages);
  };

  return (
    <div>
      <section className="section-search center">
        <div className="search-input-cnt">
          <input
            type="text"
            className="search-input"
            placeholder="Search your gallery by alt description"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
      </section>

      <DragDropContext onDragEnd={onDragEnd} className="section-gallery center">
        <Droppable droppableId="image-gallery" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="gallery"
            >
              {filteredData.map((imageInfo, index) => (
                <Draggable
                  key={imageInfo.id}
                  draggableId={imageInfo.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="gallery-item"
                    >
                      <img
                        className="gallery-image"
                        src={imageInfo.urls.regular}
                        alt={imageInfo.alt_description}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageGallery;
