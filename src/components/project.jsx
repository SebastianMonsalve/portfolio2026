import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, GithubLogo, FigmaLogo } from "phosphor-react";
import { projects } from "../data/projectsData";

const colors = ["neon1", "neon2", "neon3"];

const Project = () => {
  return (
    <>
      {projects.map((project, index) => (
        <SingleProject
          key={`${project.id}-${index}`}
          project={project}
          index={index}
        />
      ))}
    </>
  );
};

export default Project;

const SingleProject = ({ project, index }) => {
  const colorKey = colors[index % colors.length];

  const bgClass =
    colorKey === "neon1"
      ? "bg-neon1"
      : colorKey === "neon2"
      ? "bg-neon2"
      : "bg-neon3";

  const textClass =
    colorKey === "neon1"
      ? "text-neon1"
      : colorKey === "neon2"
      ? "text-neon2"
      : "text-neon3";

  const media = project.media || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const autoSlide = useRef(null);
  const videoRef = useRef(null);

  const dragOffsetRef = useRef(0);
  const thumbContainerRef = useRef(null);
  const thumbRefs = useRef([]);

  const selectedMedia = media[currentIndex] || "";
  const isVideo =
    selectedMedia.endsWith?.(".mp4") || selectedMedia.endsWith?.(".webm");

  const nextSlide = useCallback(
    (delta = 1) => {
      if (!media.length) return;
      setCurrentIndex((prev) => (prev + delta + media.length) % media.length);
    },
    [media.length]
  );

  const startAutoSlide = useCallback(() => {
    clearInterval(autoSlide.current);
    if (!isVideo && media.length > 1) {
      autoSlide.current = setInterval(() => nextSlide(1), 8000);
    }
  }, [isVideo, nextSlide, media.length]);

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
    const v = videoRef.current;
    if (!v) return;
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

    const activeOffsetLeft = active.offsetLeft;
    const activeWidth = active.offsetWidth;
    const containerWidth = container.clientWidth;

    const left = Math.max(
      0,
      activeOffsetLeft - containerWidth / 2 + activeWidth / 2
    );

    if (Math.abs(container.scrollLeft - left) > 2) {
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [currentIndex]);

  const handleStart = (x) => {
    if (isDragging.current) return;

    isDragging.current = true;
    startX.current = x;
    dragOffsetRef.current = 0;
    setDragOffset(0);

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
      dragOffsetRef.current = 0;

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
    <section className="w-full min-h-[calc(100vh-4rem)] pt-16 relative md:grid md:grid-cols-2">
      {/* LEFT */}
      <article className="w-full h-full flex items-center justify-center mb-10 md:mb-0">
        <div className="w-full md:w-[70%] flex flex-col items-center">
          <div
            className="w-full h-60 sm:h-90 md:h-auto overflow-hidden relative mb-2"
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
                transition: isDragging.current
                  ? "none"
                  : "transform 0.45s ease",
              }}
            >
              {media.map((src, i) => {
                const isVidItem =
                  src.endsWith?.(".mp4") || src.endsWith?.(".webm");

                return (
                  <div
                    key={i}
                    className="w-full flex-shrink-0 relative flex items-center justify-center"
                  >
                    {isVidItem ? (
                      <video
                        ref={currentIndex === i ? videoRef : null}
                        src={src}
                        muted
                        playsInline
                        preload="metadata"
                        loop={false}
                        className="w-full h-full object-contain z-10"
                      />
                    ) : (
                      <img
                        src={src}
                        className="w-full h-full object-contain z-10"
                        draggable="false"
                        alt=""
                      />
                    )}
                    <div className="absolute inset-0 bg-neonBlack opacity-40 z-0"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Thumbnails */}
          <div
            ref={thumbContainerRef}
            className="w-full flex gap-2 overflow-x-auto no-scrollbar flex-nowrap"
          >
            {media.map((src, i) => {
              const isVidThumb = src.endsWith?.(".mp4");
              const active = currentIndex === i;

              return (
                <button
                  key={i}
                  ref={(el) => (thumbRefs.current[i] = el)}
                  onClick={() => goToSlide(i)}
                  className="w-14 md:w-16 h-14 md:h-16 flex-shrink-0 overflow-hidden cursor-pointer"
                >
                  {isVidThumb ? (
                    <video
                      src={src}
                      muted
                      playsInline
                      draggable="false"
                      className={`w-full h-full object-cover hover:opacity-80 ${
                        active ? "grayscale" : "opacity-50"
                      }`}
                    />
                  ) : (
                    <img
                      src={src}
                      className={`w-full h-full object-cover hover:opacity-80 ${
                        active ? "grayscale" : "opacity-50"
                      }`}
                      draggable="false"
                      alt=""
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </article>

      {/* RIGHT */}
      <article className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-full md:w-[80%] flex flex-col gap-4">
          <div className="flex flex-col">
            <h2 className="text-neonGray font-medium uppercase text-base md:text-lg">
              {project.title}
            </h2>

            <h1 className="text-neonWhite font-bold text-3xl md:text-4xl text-balance">
              {project.subtitle}
            </h1>
          </div>

          <div className="w-full flex flex-row gap-4">
            <span className="px-4 py-2 rounded-xl overflow-hidden relative">
              <div
                className={`${bgClass} absolute inset-0 opacity-20 saturate-40`}
              ></div>
              <p
                className={`${textClass} text-xs md:text-sm font-medium relative z-10`}
              >
                {project.role}
              </p>
            </span>
          </div>

          <p className="text-neonWhite text-base md:text-xl">
            {project.description}
          </p>

          <div className="w-full flex flex-row gap-2">
            {project.links?.web?.trim() && (
              <a
                href={project.links.web}
                className="px-3 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl overflow-hidden relative flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={`${bgClass} absolute inset-0 opacity-20 saturate-40`}
                ></div>
                <Link
                  className={`${textClass} text-2xl md:text-3xl relative z-10`}
                />
              </a>
            )}

            {project.links?.github?.trim() && (
              <a
                href={project.links.github}
                className="px-3 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl overflow-hidden relative flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={`${bgClass} absolute inset-0 opacity-20 saturate-40`}
                ></div>
                <GithubLogo
                  className={`${textClass} text-2xl md:text-3xl relative z-10`}
                />
              </a>
            )}

            {project.links?.figma?.trim() && (
              <a
                href={project.links.figma}
                className="px-3 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl overflow-hidden relative flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={`${bgClass} absolute inset-0 opacity-20 saturate-40`}
                ></div>
                <FigmaLogo
                  className={`${textClass} text-2xl md:text-3xl relative z-10`}
                />
              </a>
            )}
          </div>
        </div>
      </article>
    </section>
  );
};
