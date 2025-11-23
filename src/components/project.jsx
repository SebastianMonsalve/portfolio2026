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

  const isDragging = useRef(false);
  const startX = useRef(0);
  const intervalRef = useRef(null);
  const videoRef = useRef(null);

  // --- NUEVO: ref para el offset real leíble por handlers globales ---
  const dragOffsetRef = useRef(0);

  // Refs para listeners estables
  const moveHandlerRef = useRef(null);
  const upHandlerRef = useRef(null);
  const touchMoveRef = useRef(null);
  const touchEndRef = useRef(null);

  const selectedMedia = media[currentIndex];
  const isVideo =
    selectedMedia.endsWith(".webm") || selectedMedia.endsWith(".mp4");

  const nextSlide = (delta = 1) => {
    setCurrentIndex((prev) => (prev + delta + media.length) % media.length);
  };

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    if (!isVideo) {
      intervalRef.current = setInterval(() => {
        nextSlide(1);
      }, 8000);
    }
  };

  useEffect(() => {
    startAutoSlide();

    if (isVideo && videoRef.current) {
      const v = videoRef.current;
      const onEnded = () => nextSlide(1);
      v.addEventListener("ended", onEnded);
      return () => v.removeEventListener("ended", onEnded);
    }

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // iniciar drag (mouse o touch)
  const handleStart = (x) => {
    if (isDragging.current) return;

    isDragging.current = true;
    startX.current = x;

    // reset visual y ref
    setDragOffset(0);
    dragOffsetRef.current = 0;

    // bloquear scroll
    document.body.style.overflow = "hidden";

    // handlers que referencian las refs (no cierres con estado)
    moveHandlerRef.current = (e) => {
      const clientX =
        typeof e.pageX === "number"
          ? e.pageX
          : e.touches && e.touches[0]
          ? e.touches[0].clientX
          : null;
      if (clientX != null) {
        const diff = clientX - startX.current;
        // actualizar estado (para render) Y la ref (para decidir en handleEnd)
        setDragOffset(diff);
        dragOffsetRef.current = diff;
      }
    };

    upHandlerRef.current = () => {
      // use dragOffsetRef inside handleEnd (no closed estado)
      handleEnd();
    };

    touchMoveRef.current = (e) => {
      if (e.cancelable) e.preventDefault();
      const clientX = e.touches && e.touches[0] ? e.touches[0].clientX : null;
      if (clientX != null) {
        const diff = clientX - startX.current;
        setDragOffset(diff);
        dragOffsetRef.current = diff;
      }
    };

    touchEndRef.current = () => {
      handleEnd();
    };

    // registrar listeners globales
    window.addEventListener("mousemove", moveHandlerRef.current);
    window.addEventListener("mouseup", upHandlerRef.current);
    window.addEventListener("touchmove", touchMoveRef.current, {
      passive: false,
    });
    window.addEventListener("touchend", touchEndRef.current);
  };

  // handleEnd ahora usa dragOffsetRef.current (valor actualizado)
  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const threshold = 100;
    const actualOffset = dragOffsetRef.current ?? 0;

    if (actualOffset > threshold) nextSlide(-1);
    else if (actualOffset < -threshold) nextSlide(1);

    // reset visual y ref
    setDragOffset(0);
    dragOffsetRef.current = 0;

    // restaura scroll
    document.body.style.overflow = "";

    // quitar listeners usando mismas referencias
    if (moveHandlerRef.current) {
      window.removeEventListener("mousemove", moveHandlerRef.current);
      moveHandlerRef.current = null;
    }
    if (upHandlerRef.current) {
      window.removeEventListener("mouseup", upHandlerRef.current);
      upHandlerRef.current = null;
    }
    if (touchMoveRef.current) {
      try {
        window.removeEventListener("touchmove", touchMoveRef.current, {
          passive: false,
        });
      } catch (err) {
        // fallback si navegador no acepta la firma con opciones
        try {
          window.removeEventListener("touchmove", touchMoveRef.current);
        } catch (e) {}
      }
      touchMoveRef.current = null;
    }
    if (touchEndRef.current) {
      window.removeEventListener("touchend", touchEndRef.current);
      touchEndRef.current = null;
    }
  };

  const handleMouseDown = (e) => handleStart(e.pageX);
  const handleTouchStart = (e) => handleStart(e.touches[0].clientX);

  const goToSlide = (index) => {
    setCurrentIndex((index + media.length) % media.length);
    startAutoSlide();
  };

  return (
    <section className="w-full min-h-[calc(100vh-4rem)] pt-16 relative md:grid md:grid-cols-2">
      <div className="w-full md:p-20 md:py-10 flex flex-col items-center">
        {/* AREA DE SLIDER */}
        <div
          className="w-full h-60 sm:h-80 md:h-auto overflow-hidden relative mb-3"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleEnd}
          style={{
            cursor: isDragging.current ? "grabbing" : "grab",
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
          }}
        >
          <div
            className="flex w-full h-full"
            style={{
              transform: `translateX(calc(${
                -currentIndex * 100
              }% + ${dragOffset}px))`,
              transition: isDragging.current ? "none" : "transform 0.5s ease",
            }}
          >
            {media.map((item, index) => {
              const isVid = item.endsWith(".webm") || item.endsWith(".mp4");
              return (
                <div
                  key={index}
                  className="w-full flex-shrink-0 flex justify-center items-center relative"
                >
                  {isVid ? (
                    <video
                      ref={currentIndex === index ? videoRef : null}
                      src={item}
                      autoPlay={currentIndex === index}
                      muted
                      playsInline
                      loop={!true}
                      className="w-full h-full object-contain z-10"
                    />
                  ) : (
                    <img
                      src={item}
                      alt=""
                      className="w-full h-full object-contain z-10"
                      draggable="false"
                    />
                  )}
                  <div className="absolute inset-0 bg-neonBlack opacity-40 z-0"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MINIATURAS */}
        <div className="w-full flex gap-2 overflow-x-auto no-scrollbar flex-nowrap">
          {media.map((item, index) => {
            const isVid = item.endsWith(".webm") || item.endsWith(".mp4");

            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="flex-shrink-0 w-16 h-16 overflow-hidden cursor-pointer"
              >
                {isVid ? (
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
                    alt=""
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

      {/* LADO DERECHO */}
      <div className="w-full">
        <h1 className="text-neonWhite">title haoisdja asudaudw</h1>
      </div>
    </section>
  );
};

export default Project;
