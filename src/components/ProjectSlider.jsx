import React, { useRef, useEffect, useCallback, memo } from "react";
import { Play } from "phosphor-react";

const ProjectSlider = memo(
  ({ media = [], currentIndex, setCurrentIndex, thumbColor }) => {
    const videoRef = useRef(null);
    const autoSlide = useRef(null);
    const thumbContainerRef = useRef(null);
    const thumbRefs = useRef([]);
    const sliderRef = useRef(null);
    const isVisible = useRef(true);

    const selectedMedia = media[currentIndex] || "";
    const isVideo =
      selectedMedia.endsWith(".mp4") ||
      selectedMedia.endsWith(".webm") ||
      selectedMedia.endsWith(".gif");

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
      const next = (currentIndex + 1) % media.length;
      const img = new Image();
      img.src = media[next];
    }, [currentIndex, media]);

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

          if (!isVisible.current && videoRef.current) videoRef.current.pause();
          if (isVisible.current && isVideo && videoRef.current)
            videoRef.current.play().catch(() => {});

          if (!isVisible.current) clearInterval(autoSlide.current);
          else startAutoSlide();
        },
        { threshold: 0.3 }
      );

      if (sliderRef.current) observer.observe(sliderRef.current);
      return () => observer.disconnect();
    }, [isVideo, startAutoSlide]);

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
        <div className="w-full h-auto overflow-hidden relative mb-2">
          <div
            className="flex w-full h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {media.map((src, i) => {
              const isVid =
                src.endsWith(".mp4") ||
                src.endsWith(".webm") ||
                src.endsWith(".gif");

              return (
                <div
                  key={i}
                  className="w-full shrink-0 relative flex items-center justify-center"
                >
                  {isVid ? (
                    <video
                      ref={currentIndex === i ? videoRef : null}
                      src={src}
                      preload="metadata"
                      muted
                      playsInline
                      className="w-full h-full object-contain z-10"
                    />
                  ) : (
                    <img
                      src={src}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain z-10"
                      draggable="false"
                    />
                  )}
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
            const isVid =
              src.endsWith(".mp4") ||
              src.endsWith(".webm") ||
              src.endsWith(".gif");
            const active = currentIndex === i;

            return (
              <button
                key={i}
                ref={(el) => (thumbRefs.current[i] = el)}
                onClick={() => goToSlide(i)}
                className="w-14 md:w-16 h-14 md:h-16 shrink-0 overflow-hidden cursor-pointer"
              >
                {isVid ? (
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div
                      className={`absolute inset-0 hover:opacity-40 ${thumbColor} ${
                        active ? "grayscale" : "opacity-10"
                      }`}
                    ></div>
                    <Play className="z-10 text-neonWhite text-xl" />
                  </div>
                ) : (
                  <img
                    src={src}
                    className={`w-full h-full object-cover hover:opacity-80 ${
                      active ? "grayscale" : "opacity-50"
                    }`}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

export default ProjectSlider;
