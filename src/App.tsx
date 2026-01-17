import { createRouter, RouterProvider } from '@tanstack/react-router';

import { Toaster } from '@/components/ui/sonner';

import { ThemeProvider } from './components/theme-provider';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

const App = () => (
  <ThemeProvider>
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </ThemeProvider>
);

export default App;
