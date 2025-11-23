import React, { useState, useEffect, useRef } from "react";

const Project = () => {
  const media = [
    "/projects/project1 (9).mp4",
    "/projects/project1 (1).webp",
    "/projects/project1 (2).webp",
    "/projects/project1 (3).webp",
    "/projects/project1 (4).webp",
    "/projects/project1 (5).webp",
    "/projects/project1 (6).webp",
    "/projects/project1 (7).webp",
    "/projects/project1 (8).webp",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const timeoutRef = useRef(null);
  const videoRef = useRef(null);

  const selectedMedia = media[currentIndex];
  const isVideo =
    selectedMedia.endsWith(".webm") || selectedMedia.endsWith(".mp4");

  const nextSlide = (delta = 1) => {
    setCurrentIndex((prev) => {
      const newIndex = (prev + delta + media.length) % media.length;
      return newIndex;
    });
  };

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    if (isVideo && videoRef.current) {
      const video = videoRef.current;

      const handleEnded = () => nextSlide();
      const handleTimeUpdate = () =>
        setVideoProgress(video.currentTime / video.duration);

      video.addEventListener("ended", handleEnded);
      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    } else {
      timeoutRef.current = setTimeout(nextSlide, 8000);
      setVideoProgress(0);
      return () => clearTimeout(timeoutRef.current);
    }
  }, [currentIndex]);

  const handleStart = (x) => {
    isDragging.current = true;
    startX.current = x;
    setDragOffset(0);
  };

  const handleMove = (x) => {
    if (!isDragging.current) return;
    setDragOffset(x - startX.current);
  };

  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const threshold = 100;
    if (dragOffset > threshold) nextSlide(-1);
    else if (dragOffset < -threshold) nextSlide(1);
    setDragOffset(0);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index % media.length);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] pt-16 flex flex-col items-center">
      <div
        className="w-full h-60 overflow-hidden relative mb-3"
        onMouseDown={(e) => handleStart(e.pageX)}
        onMouseMove={(e) => handleMove(e.pageX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        style={{
          cursor: isDragging.current ? "grabbing" : "grab",
        }}
      >
        <div
          className="flex w-full h-full transition-transform duration-300"
          style={{
            transform: `translateX(calc(${
              -currentIndex * 100
            }% + ${dragOffset}px))`,
            transition: isDragging.current ? "none" : "transform 0.3s ease",
          }}
        >
          {media.map((item, index) => {
            const isVideoItem = item.endsWith(".webm") || item.endsWith(".mp4");
            return (
              <div
                key={index}
                className="w-full flex-shrink-0 flex justify-center items-center relative"
              >
                {isVideoItem ? (
                  <>
                    <video
                      ref={currentIndex === index ? videoRef : null}
                      src={item}
                      autoPlay={currentIndex === index}
                      muted
                      playsInline
                      loop
                      className="w-full h-full object-contain z-10"
                    />
                  </>
                ) : (
                  <img
                    src={item}
                    alt={`media-${index}`}
                    className="w-full h-full object-contain z-10"
                  />
                )}
                <div className="absolute inset-0 bg-neonBlack opacity-40 z-0"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Miniaturas */}
      <div className="w-full flex gap-2 overflow-x-auto no-scrollbar flex-nowrap">
        {media.map((item, index) => {
          const isVideoItem = item.endsWith(".webm") || item.endsWith(".mp4");
          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="flex-shrink-0 w-16 h-16 overflow-hidden cursor-pointer"
            >
              {isVideoItem ? (
                <video
                  src={item}
                  muted
                  playsInline
                  draggable="false"
                  className={`w-full h-full object-cover ${
                    currentIndex === index
                      ? "grayscale"
                      : "opacity-60 hover:opacity-100"
                  }`}
                />
              ) : (
                <img
                  src={item}
                  alt={`thumb-${index}`}
                  draggable="false"
                  className={`w-full h-full object-cover ${
                    currentIndex === index
                      ? "grayscale"
                      : "opacity-60 hover:opacity-100"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
