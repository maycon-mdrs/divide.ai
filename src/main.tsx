import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from '@/components/theme-provider.tsx';
import { router } from "@/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import '@/index.css'
import { SidebarProvider } from './hooks/UseSidebarToggle';

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>
)
