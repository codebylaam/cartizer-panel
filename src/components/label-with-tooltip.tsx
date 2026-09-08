import { InfoIcon } from '@phosphor-icons/react'

import { Label } from './ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export function LabelWithTooltip({
  label,
  tooltip,
  required = false,
  id,
}: {
  label: string
  tooltip?: string
  required?: boolean
  id?: string
}) {
  return (
    <div className="flex items-center gap-1">
      <Label htmlFor={id} className="gap-0">
        {label}
        {required && <span className="leading-0 text-destructive">*</span>}
      </Label>
      {tooltip && (
        <Tooltip>
          <TooltipTrigger aria-label="Close Tooltip">
            <InfoIcon size={12} className="text-gray-500 cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent className="w-96">
            <span className="text-secondary text-sm">{tooltip}</span>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}
