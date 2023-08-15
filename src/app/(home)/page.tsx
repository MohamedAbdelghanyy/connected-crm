'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const metadata = {
  title: "Home",
}

export default function DashboardPage() {
  const { push } = useRouter();

  useEffect(() => {
     push('/dashboard');
  }, []);

  return (
    <></>
  )
}