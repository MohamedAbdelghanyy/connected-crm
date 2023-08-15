'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { push } = useRouter();

  useEffect(() => {
     push('/login');
  }, []);

  return (
    <></>
  )
}