import { Skeleton as MuiSkeleton } from "@mui/material"
import type { SkeletonProps as MuiSkeletonProps } from "@mui/material"

export interface SkeletonProps extends MuiSkeletonProps {}

export function Skeleton(props: SkeletonProps) {
  return <MuiSkeleton {...props} />
}

