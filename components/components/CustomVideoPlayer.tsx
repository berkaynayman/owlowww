import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import Stack from '@mui/material/Stack';

const CustomVideoPlayer = ({ url, onProgressCheckpoint, progressInterval = 1, onVideoEnd }) => {
    const playerRef = useRef(null);
    const timelineRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [hovering, setHovering] = useState(false);
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [lastCheckpoint, setLastCheckpoint] = useState(0);

    const onProgress = (progress) => {
        setCurrentTime(progress.playedSeconds);
        const percentage = (progress.playedSeconds / duration) * 100;
        const roundedPercentage = Math.floor(percentage);

        if (roundedPercentage >= lastCheckpoint + progressInterval) {
            setLastCheckpoint(roundedPercentage);
            if (onProgressCheckpoint) {
                onProgressCheckpoint(roundedPercentage);
            }
        }

        if (percentage >= 100 && !completed) {
            setCompleted(true);
            setPlaying(false);
            if (onVideoEnd) onVideoEnd();
        }
    };

    const handleTimelineClick = (e) => {
        const timeline = timelineRef.current;
        const rect = timeline.getBoundingClientRect();
        const percentage = (e.clientX - rect.left) / rect.width;
        playerRef.current.seekTo(percentage);
        setLastCheckpoint(Math.floor(percentage * 100));
    };

    const toggleFullscreen = () => {
        const videoContainer = playerRef.current.wrapper;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            videoContainer.requestFullscreen();
        }
    };

    const handlePlay = () => {
        setPlaying(true);
        setStarted(true);
    };

    return (
        <div
            className="relative bg-black overflow-hidden rounded-lg"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <ReactPlayer
                ref={playerRef}
                url={url}
                width="100%"
                height="100%"
                playing={playing}
                volume={volume}
                playbackRate={playbackSpeed}
                onProgress={onProgress}
                onDuration={(dur) => setDuration(dur)}
            />

            {!started && (
                <div className="absolute inset-0 flex justify-center items-center">
                    <button
                        onClick={handlePlay}
                        className="bg-gray-900/60 rounded-full p-4"
                    >
                        <svg width="64" height="64" fill="white">
                            <polygon points="16,12 54,32 16,52" />
                        </svg>
                    </button>
                </div>
            )}

            <AnimatePresence>
                {(hovering || !playing) && started && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900/90 to-transparent p-4 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <button onClick={() => setPlaying(!playing)}>
                                {playing ? (
                                    <svg width="32" height="32" fill="white"><rect x="6" y="4" width="6" height="24"/><rect x="18" y="4" width="6" height="24"/></svg>
                                ) : (
                                    <svg width="32" height="32" fill="white"><polygon points="8,4 26,16 8,28"/></svg>
                                )}
                            </button>
                            <span className="text-white font-medium text-sm">
                {Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)} / {Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}
              </span>
                        </div>

                        <div
                            ref={timelineRef}
                            className="flex-1 mx-4 h-2 bg-gray-700 cursor-pointer rounded"
                            onClick={handleTimelineClick}
                        >
                            <div
                                className="h-full bg-blue-600 rounded"
                                style={{ width: `${(currentTime / duration) * 100}%` }}
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.05}
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="cursor-pointer"
                            />
                            <select
                                className="bg-transparent text-white font-medium text-sm cursor-pointer"
                                value={playbackSpeed}
                                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                            >
                                {[0.5, 1, 1.5, 2].map((speed) => (
                                    <option key={speed} value={speed}>{speed}x</option>
                                ))}
                            </select>
                            <button onClick={toggleFullscreen}>
                                <svg width="24" height="24" fill="white"><path d="M4 4h6V2H2v8h2V4zm16 0v6h2V2h-8v2h6zm0 16h-6v2h8v-8h-2v6zM4 14H2v8h8v-2H4v-6z"/></svg>
                            </button>
                        </div>
                    </motion.div>
                )}

                {completed && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <Stack spacing={2}>
                            <span className="text-white">Nächste Lektion</span>
                            <h6 className="text-white">Big Idea für ein Webinar finden</h6>
                            <button
                                onClick={onVideoEnd}
                                className="text-black bg-white px-6 py-2 rounded"
                            >
                                Lektion abschließen
                            </button>
                        </Stack>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomVideoPlayer;
