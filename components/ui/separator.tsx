import { Divider } from "@mui/material"
import type { DividerProps } from "@mui/material"

export interface SeparatorProps extends DividerProps {
  orientation?: "horizontal" | "vertical"
}

export function Separator({ orientation = "horizontal", ...props }: SeparatorProps) {
  return <Divider orientation={orientation} {...props} />
}

