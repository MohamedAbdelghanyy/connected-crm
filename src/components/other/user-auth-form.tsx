import { Icons } from "@/components/other/icons"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import * as React from "react"
import { useNavigate } from "react-router-dom"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const navigate = useNavigate()

  const submitLogin = (eve: React.FormEvent) => {
    eve.preventDefault();
    setIsLoading(true);
    setTimeout(
      function () {
        if (userEmail == "admin@connectedapp.com" && userPassword == "admin") {
          navigate('/ceo-dashboard');
        } else {
          setIsLoading(false);
          return toast({
            title: "Invalid",
            description: "Invalid email or password",
            variant: "destructive",
          });
        }
      }, 500);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={submitLogin}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              aria-label="email"
              id="email"
              placeholder="name@example.com"
              onChange={(event) => setUserEmail(event.target.value)}
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="mb-3"
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              aria-label="password"
              id="password"
              placeholder="Enter your password"
              onChange={(event) => setUserPassword(event.target.value)}
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              className="mb-3"
            />
          </div>
          <button
            className={cn(buttonVariants())}
            disabled={isLoading || userEmail.length < 5 || !userEmail.includes("@") || !userEmail.includes(".") || userPassword.length < 1}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}
