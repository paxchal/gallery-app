import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ImageGallery = () => {
  const [imageData] = useState([
    // Example image data, you can add more image objects here
    // ...
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
  ]);

  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(imageData);

  // Handle drag-and-drop reordering
  const onDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside the grid

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Swap positions of the two images
    const reorderedImages = Array.from(filteredData);
    [reorderedImages[sourceIndex], reorderedImages[destinationIndex]] = [
      reorderedImages[destinationIndex],
      reorderedImages[sourceIndex],
    ];

    setFilteredData(reorderedImages);
  };

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

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

      <div className="section-gallery center">
        <DragDropContext onDragEnd={onDragEnd}>
          <Draggable droppableId="image-gallery" direction="horizontal">
            {(provided) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="gallery"
              >
                {filteredData.map((imageInfo, index) => (
                  <Droppable
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
                  </Droppable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Draggable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ImageGallery;
