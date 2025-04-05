import { Slider as MuiSlider } from "@mui/material"
import type { SliderProps as MuiSliderProps } from "@mui/material"
import React from "react"

export interface SliderProps extends MuiSliderProps {}

const Slider = React.forwardRef<HTMLSpanElement, SliderProps>((props, ref) => {
  return <MuiSlider ref={ref} {...props} />
})
Slider.displayName = "Slider"

export { Slider }

