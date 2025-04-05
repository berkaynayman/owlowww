import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  ExpandMoreIcon,
} from "@mui/material"
import type {
  AccordionProps as MuiAccordionProps,
  AccordionSummaryProps as MuiAccordionSummaryProps,
  AccordionDetailsProps as MuiAccordionDetailsProps,
} from "@mui/material"

export interface AccordionProps extends MuiAccordionProps {}
export interface AccordionTriggerProps extends MuiAccordionSummaryProps {}
export interface AccordionContentProps extends MuiAccordionDetailsProps {}

const Accordion = MuiAccordion
const AccordionTrigger = ({ children, ...props }: AccordionTriggerProps) => (
  <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} {...props}>
    {children}
  </MuiAccordionSummary>
)
const AccordionContent = MuiAccordionDetails

export { Accordion, AccordionTrigger, AccordionContent }

