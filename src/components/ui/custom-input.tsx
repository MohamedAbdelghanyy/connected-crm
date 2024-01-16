import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isError: boolean,
  errorText: any,
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError, errorText, ...props }, ref,) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
CustomInput.displayName = "CustomInput"

export { CustomInput }

