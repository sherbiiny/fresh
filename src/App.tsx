import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from 'sonner';

const router = createRouter({ routeTree });

const App = () => (
  <ThemeProvider>
    <RouterProvider router={router} />
    <Toaster />
  </ThemeProvider>
);

export default App;
