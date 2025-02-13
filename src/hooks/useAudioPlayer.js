import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";

const STORAGE_KEY = "currentTrackIndex";

export const useAudioPlayer = (tracks = []) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    if (typeof window === "undefined") return 0;

    const storedIndex = localStorage.getItem(STORAGE_KEY) || 0;
    return storedIndex ? parseInt(storedIndex) : 0;
  });

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
  });

  const audioRef = useRef(null);

  const saveCurrentTrackIndex = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, `${currentTrackIndex}`);
  }, [currentTrackIndex]);

  const loadAndPlayTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrackIndex].url;
      audioRef.current.load();
      
      audioRef.current.volume = 0.7;

      audioRef.current.play().then(() => {
        setPlayerState((prev) => ({
          ...prev,
          isPlaying: true,
          currentTime: 0,
        }));
      })
      .catch((error) => {
        setPlayerState((prev) => ({
          ...prev,
          isPlaying: false,
          currentTime: 0,
        }));
      });
    }
  }, [currentTrackIndex, tracks]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    audioRef.current = new Audio();
    loadAndPlayTrack();

    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setPlayerState((prev) => ({
        ...prev,
        duration: audio.duration,
      }));
    };

    const handleTimeUpdate = () => {
      setPlayerState((prev) => ({
        ...prev,
        currentTime: audio.currentTime,
      }));
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [loadAndPlayTrack]);

  useEffect(() => {
    saveCurrentTrackIndex();
  }, [saveCurrentTrackIndex]);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (playerState.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlayerState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  }, [playerState.isPlaying]);

  const handleNext = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    loadAndPlayTrack();
  }, [tracks.length, loadAndPlayTrack]);

  const handlePrevious = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    loadAndPlayTrack();
  }, [tracks.length, loadAndPlayTrack]);

  const seek = useCallback((time) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = time;
    setPlayerState((prev) => ({ ...prev, currentTime: time }));
  }, []);

  useEffect(() => {
    // global clean
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  return {
    currentTrack: tracks[currentTrackIndex],
    playerState,
    togglePlayPause,
    handleNext,
    handlePrevious,
    seek,
  };
};
