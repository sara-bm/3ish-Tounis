import { useState } from "react";
import { motion } from "framer-motion";
import video1 from "./assets/vid_chkoba.mp4";
import video2 from "./assets/vid_bardo.mp4";
import video3 from "./assets/vid_libsa.mp4";
import video4 from "./assets/vid_makla.mp4";
import video5 from "./assets/vid_sbou3i.mp4";

const ImageSlider = () => {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);

  const videos = [video1, video2, video3, video4, video5];

  const positions = ["center", "left1", "left", "right", "right1"];

  const videoVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-50%", scale: 0.7, zIndex: 3 },
    left: { x: "-90%", scale: 0.5, zIndex: 2 },
    right: { x: "90%", scale: 0.5, zIndex: 2 },
    right1: { x: "50%", scale: 0.7, zIndex: 3 },
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) {
      // Dragged to the left, move to the next video
      setPositionIndexes((prevIndexes) => {
        return prevIndexes.map((prevIndex) => (prevIndex + 1) % 5);
      });
    } else if (info.offset.x > 100) {
      // Dragged to the right, move to the previous video
      setPositionIndexes((prevIndexes) => {
        return prevIndexes.map((prevIndex) => (prevIndex + 4) % 5);
      });
    }
  };

  return (
    <div className="flex items-center justify-center bg-black h-screen relative">
      {/* Video carousel container */}
      {videos.map((video, index) => (
        <motion.video
          key={index}
          src={video}
          className="rounded-[12px]"
          initial="center"
          animate={positions[positionIndexes[index]]}
          variants={videoVariants}
          transition={{ duration: 0.5 }}
          style={{
            width: "60%", // Adjust width to make it smaller and centered
            maxWidth: "800px", // Set a maximum width for the video
            position: "absolute",
            top: "50%",
            left: "50%", // Center horizontally
            transform: "translate(-50%, -50%)", // Center vertically and horizontally
          }}
          autoPlay
          loop
          muted
          drag="x" // Enable dragging along the x-axis
          dragConstraints={{ left: -100, right: 100 }} // Set the drag limits
          onDragEnd={handleDragEnd} // Detect when the drag ends
        />
      ))}
    </div>
  );
};

export default ImageSlider;
