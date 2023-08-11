"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  
}

export function BillingForm({
  className,
  ...props
}: BillingFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  return (
    <form className={cn(className)} onSubmit={()=>{}} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            You are currently on the {" "}
            plan.
          </CardDescription>
        </CardHeader>
        <CardContent>SUBSC. DESC.</CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {true ? "Manage Subscription" : "Upgrade to PRO"}
          </button>
          {true ? (
            <p className="rounded-full text-xs font-medium">
              {false
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  )
}
