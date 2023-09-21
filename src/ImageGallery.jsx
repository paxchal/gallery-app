import React, { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

const ImageGallery = () => {
  const [imageData] = useState([
    // Your image data objects

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

  const sensors = useSensors(useSensor(PointerSensor));

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
            placeholder="Search your gallery"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
      </section>

      <div className="section-gallery center">
        <p className="drag-text">Drag and Drop images to your preference</p>

        <DndContext sensors={sensors}>
          <ul className="gallery">
            {filteredData.map((imageInfo, index) => (
              <ImageItem
                key={imageInfo.id}
                imageInfo={imageInfo}
                index={index}
              />
            ))}
          </ul>
        </DndContext>
      </div>
    </div>
  );
};

const ImageItem = ({ imageInfo, index }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: imageInfo.id.toString(),
    });

  const { isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
    id: "gallery",
  });

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        setDroppableNodeRef(node);
      }}
      {...attributes}
      {...listeners}
      style={{ transform }}
      className={`gallery-item ${isDragging ? "dragging" : ""} ${
        isOver ? "over" : ""
      }`}
    >
      <img
        className="gallery-image"
        src={imageInfo.urls.regular}
        alt={imageInfo.alt_description}
      />
    </div>
  );
};

export default ImageGallery;
