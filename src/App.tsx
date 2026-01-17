import { createRouter, RouterProvider } from '@tanstack/react-router';

import { Toaster } from '@/components/ui/sonner';

import { ThemeProvider } from './components/theme-provider';
import { SidebarProvider } from './components/ui/sidebar';
import { routeTree } from './routeTree.gen';


const router = createRouter({ routeTree });

const App = () => (
  <ThemeProvider>
    <SidebarProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </SidebarProvider>
  </ThemeProvider>
);

export default App;
