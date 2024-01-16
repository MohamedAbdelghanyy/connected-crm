import * as React from "react"

import { cn } from "@/lib/utils"

export interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isError: boolean,
  errorText: any,
}

const CustomTextarea = React.forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ className, isError, errorText, ...props }, ref) => {
    return (
      <>
        <textarea
          className={cn(
            "flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          style={{
            borderColor: isError ? "red" : "inherit"
          }}
          ref={ref}
          {...props}
        />
        {isError && <p style={{ color: "red", fontSize: "11px" }}>{errorText.toString()}</p>}
      </>
    )
  }
)
CustomTextarea.displayName = "CustomTextarea"

export { CustomTextarea }

