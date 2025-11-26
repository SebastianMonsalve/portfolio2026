import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play } from "phosphor-react";

const ProjectSlider = ({
  media = [],
  currentIndex,
  setCurrentIndex,
  thumbColor,
}) => {
  const videoRef = useRef(null);
  const autoSlide = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragOffsetRef = useRef(0);

  const thumbContainerRef = useRef(null);
  const thumbRefs = useRef([]);

  const [dragOffset, setDragOffset] = useState(0);

  const sliderRef = useRef(null);
  const isVisible = useRef(true);

  const selectedMedia = media[currentIndex] || "";
  const isVideo =
    selectedMedia.endsWith(".mp4") || selectedMedia.endsWith(".webm");

  const nextSlide = useCallback(
    (delta = 1) => {
      if (!media.length) return;
      setCurrentIndex((prev) => (prev + delta + media.length) % media.length);
    },
    [media.length, setCurrentIndex]
  );

  const startAutoSlide = useCallback(() => {
    clearInterval(autoSlide.current);
    if (!isVideo && media.length > 1) {
      autoSlide.current = setInterval(() => nextSlide(1), 8000);
    }
  }, [isVideo, media.length, nextSlide]);

  useEffect(() => {
    startAutoSlide();

    if (isVideo && videoRef.current) {
      const v = videoRef.current;
      const onEnd = () => nextSlide(1);
      v.addEventListener("ended", onEnd);
      return () => v.removeEventListener("ended", onEnd);
    }

    return () => clearInterval(autoSlide.current);
  }, [currentIndex, isVideo, startAutoSlide, nextSlide]);

  useEffect(() => {
    if (!videoRef.current) return;
    const v = videoRef.current;

    if (isVideo) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [currentIndex, isVideo]);

  useEffect(() => {
    const container = thumbContainerRef.current;
    const active = thumbRefs.current[currentIndex];
    if (!container || !active) return;

    const left =
      active.offsetLeft - container.clientWidth / 2 + active.offsetWidth / 2;

    container.scrollTo({ left, behavior: "smooth" });
  }, [currentIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible.current = entry.isIntersecting;

        if (!isVisible.current && videoRef.current) {
          videoRef.current.pause();
        }

        if (isVisible.current && isVideo && videoRef.current) {
          videoRef.current.play().catch(() => {});
        }

        if (!isVisible.current) {
          clearInterval(autoSlide.current);
        } else {
          startAutoSlide();
        }
      },
      { threshold: 0.3 }
    );

    if (sliderRef.current) observer.observe(sliderRef.current);

    return () => observer.disconnect();
  }, [isVideo, startAutoSlide]);

  const handleStart = (x) => {
    if (isDragging.current) return;

    isDragging.current = true;
    startX.current = x;

    const move = (clientX) => {
      const diff = clientX - startX.current;
      dragOffsetRef.current = diff;
      setDragOffset(diff);
    };

    const onMove = (e) => move(e.pageX);
    const onTouchMove = (e) => {
      e.preventDefault();
      move(e.touches[0].clientX);
    };

    const onEnd = () => {
      isDragging.current = false;

      const offset = dragOffsetRef.current;
      if (offset > 100) nextSlide(-1);
      else if (offset < -100) nextSlide(1);

      setDragOffset(0);

      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onEnd);
  };

  const goToSlide = (i) => {
    setCurrentIndex(i);
    startAutoSlide();
  };

  return (
    <div
      className="w-full md:w-[90%] lg:w-[80%] xl:w-[70%] flex flex-col items-center"
      ref={sliderRef}
    >
      {/* SLIDES */}
      <div
        className="w-full h-auto overflow-hidden relative mb-2"
        onMouseDown={(e) => handleStart(e.pageX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        style={{
          cursor: isDragging.current ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        <div
          className="flex w-full h-full"
          style={{
            transform: `translateX(calc(${
              -currentIndex * 100
            }% + ${dragOffset}px))`,
            transition: isDragging.current ? "none" : "transform 0.45s ease",
          }}
        >
          {media.map((src, i) => {
            const isVid = src.endsWith(".mp4") || src.endsWith(".webm");

            return (
              <div
                key={i}
                className="w-full shrink-0 relative flex items-center justify-center"
              >
                {isVid ? (
                  <video
                    ref={currentIndex === i ? videoRef : null}
                    src={src}
                    preload="none"
                    muted
                    playsInline
                    className="w-full h-full object-contain z-10"
                  />
                ) : (
                  <img
                    src={src}
                    loading="lazy"
                    className="w-full h-full object-contain z-10"
                    draggable="false"
                  />
                )}
                <div className="absolute inset-0 bg-neonBlack/40 z-0"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* THUMBNAILS */}
      <div
        ref={thumbContainerRef}
        className="w-full flex gap-2 overflow-x-auto no-scrollbar flex-nowrap"
      >
        {media.map((src, i) => {
          const isVid = src.endsWith(".mp4");
          const active = currentIndex === i;

          return (
            <button
              key={i}
              ref={(el) => (thumbRefs.current[i] = el)}
              onClick={() => goToSlide(i)}
              className="w-14 md:w-16 h-14 md:h-16 shrink-0 overflow-hidden cursor-pointer"
            >
              {isVid ? (
                <div
                  className={`w-full h-full flex items-center justify-center relative`}
                >
                  <div
                    className={`top-0 left-0 w-full h-full absolute hover:opacity-40 ${thumbColor} ${
                      active ? "grayscale" : "opacity-10"
                    } saturate-20}`}
                  ></div>
                  <Play className="z-10 text-neonWhite text-xl" />
                </div>
              ) : (
                <img
                  src={src}
                  className={`w-full h-full object-cover hover:opacity-80 ${
                    active ? "grayscale" : "opacity-50"
                  }`}
                  draggable="false"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ProjectSlider);
