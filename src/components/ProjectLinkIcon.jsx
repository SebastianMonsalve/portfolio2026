import React from "react";

const ProjectLinkIcon = ({ href, Icon, bgClass, textClass, title, text }) => {
  if (!href?.trim()) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="px-3 py-1 md:px-4 md:py-2 rounded-lg overflow-hidden relative flex items-center justify-center hover:saturate-50 gap-1"
      title={title}
    >
      <div className={`${bgClass} absolute inset-0 opacity-20 saturate-40`} />

      {text ? (
        <p className={`${textClass} text-sm md:text-base relative z-10`}>
          {text}
        </p>
      ) : (
        <Icon className={`${textClass} text-2xl md:text-3xl relative z-10`} />
      )}
    </a>
  );
};

export default ProjectLinkIcon;
