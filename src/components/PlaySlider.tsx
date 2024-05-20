"use client";

import { Slider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface PlaySliderProps {
  duration: number;
  position: number;
  handleSeek: (value: number) => void;
}

const PlaySlider = ({ duration, position, handleSeek }: PlaySliderProps) => {
  const theme = useTheme();

  const formatDuration = (value: number) => {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  };
  return (
    <div className="flex">
      <Typography
        sx={{
          fontSize: "0.75rem",
          opacity: 0.38,
          fontWeight: 500,
          letterSpacing: 0.2,
          pt: "6px",
          mr: "10px",
        }}
      >
        {formatDuration(position)}
      </Typography>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={1}
        max={duration}
        onChange={(_, value) => {
          handleSeek(value as number);
        }}
        sx={{
          color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
          height: 4,
          "& .MuiSlider-thumb": {
            width: 8,
            height: 8,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&::before": {
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px ${
                theme.palette.mode === "dark"
                  ? "rgb(255 255 255 / 16%)"
                  : "rgb(0 0 0 / 16%)"
              }`,
            },
            "&.Mui-active": {
              width: 20,
              height: 20,
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.28,
          },
        }}
      />

      <Typography
        sx={{
          fontSize: "0.75rem",
          opacity: 0.38,
          fontWeight: 500,
          letterSpacing: 0.2,
          pl: "10px",
          pt: "6px",
        }}
      >
        {formatDuration(duration - position)}
      </Typography>
    </div>
  );
};

export default PlaySlider;
