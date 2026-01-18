# Fresh

A React application built with TypeScript, Vite, and TanStack Router.

## Running the App

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and fill in your Supabase credentials:
   - `VITE_SUPABASE_PROJECT_URL` - Your Supabase project URL
   - `VITE_SUPABASE_API_KEY` - Your Supabase API key

3. Start the development server:
   ```bash
   pnpm dev
   ```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Build

To build for production:

```bash
pnpm build
```

To preview the production build:

```bash
pnpm preview
```
