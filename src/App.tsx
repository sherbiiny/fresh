import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { Toaster } from '@/components/ui/sonner';

import { queryClient } from './api/queryClient';
import { ThemeProvider } from './components/theme-provider';
import { SidebarProvider } from './components/ui/sidebar';
import { routeTree } from './routeTree.gen';


const router = createRouter({ routeTree });

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SidebarProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </SidebarProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
