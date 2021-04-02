import React, { useEffect, useState } from 'react';
import * as styles from './styles.module.scss';

const Video = ({ id, src, type = 'video/mp4', placeholder, className }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = document.getElementById(id);
    video.addEventListener('loadeddata', () => setLoaded(true), false);
    // Force video to show after 4 seconds incase
    // loadeddata listener does not fire
    setTimeout(() => {
      if (!loaded) setLoaded(true);
    }, 4000);
  }, []);

  return (
    <div
      className={`${styles.container} ${className || ''}`}
      style={{ background: `url('${placeholder}') center no-repeat` }}
    >
      <video
        className={styles.video}
        preload="true"
        autoPlay
        playsInline
        muted
        loop
        id={id}
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <source src={src} type={type} />
        Sorry, your browser doesn&#39;t support embedded videos.
      </video>
    </div>
  );
};

export default Video;
