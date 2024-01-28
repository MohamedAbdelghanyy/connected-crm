import '@/app/globals.css'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'
import ReactDOM from 'react-dom/client'
import SplashApp from './SplashApp.tsx'
import { ThemeProvider } from './lib/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SplashApp />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>,
)
