import { Avatar as MuiAvatar } from "@mui/material"
import type { AvatarProps as MuiAvatarProps } from "@mui/material"
import React from "react"

export interface AvatarProps extends MuiAvatarProps {}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  return <MuiAvatar ref={ref} {...props} />
})
Avatar.displayName = "Avatar"

export { Avatar }

