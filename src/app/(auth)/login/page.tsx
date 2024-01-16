'use client';

import { Icons } from "@/components/icons";
import { UserAuthForm } from "@/components/user-auth-form";
import { Grid } from '@mui/material';

export default function LoginPage() {
  return (
    <Grid container className="h-screen w-screen">
      <Grid item md={6} container justifyContent="center" alignItems="center" className="lg:pl-20">
        <div className="w-1/2 lg:w-[300px] md:w-[300px]">
          <div className="text-center pt-10 lg:pt-0">
          <Icons.logo
            className="mx-auto"
            width="100%"
            style={{ margin: "auto", marginBottom: "20px" }}
          />
          </div>
        </div>
      </Grid>

      <Grid item xs={12} md={6} container justifyContent="center" alignItems="center" className="lg:pr-40">
        <div className="w-[70%] lg:w-[300px] pb-10 lg:pb-0">
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
      </Grid>
    </Grid>
  );
}
