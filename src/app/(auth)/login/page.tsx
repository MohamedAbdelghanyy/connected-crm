import AuthLayout from "@/components/layouts/auth-layout";
import { Icons } from "@/components/other/icons";
import { UserAuthForm } from "@/components/other/user-auth-form";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col lg:flex-row items-center justify-center h-screen w-screen">
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
          <div className="text-center pr-12 pl-12">
            <Icons.logo
              className="mx-auto"
              width="100%"
              style={{ margin: "auto", marginBottom: "20px", maxWidth: '300px'}}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 max-w-[400px] pr-12 pl-12">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </AuthLayout>
  );
}
