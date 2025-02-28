# GotAHobby

GotAHobby is a platform for discovering and joining hobby-related events and groups. It helps users find new interests, connect with like-minded individuals, and participate in both online and offline events.

## Features

- **Event Discovery**: Browse popular and upcoming events
- **Group Management**: Create and join hobby-focused groups
- **Event Details**: View comprehensive information about events including location, timing, price, and attendees
- **Flexible Event Types**: Support for online, offline, and hybrid events
- **User Profiles**: Personalized user accounts with preferences and history
- **Image Galleries**: Share photos from events
- **Comments & Discussion**: Engage with other attendees

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Supabase (PostgreSQL database, authentication)
- **State Management**: React hooks and context
- **Date Handling**: date-fns
- **Form Validation**: Zod

## Prerequisites

- Node.js (v18 or newer)
- Yarn package manager
- Supabase account and project

## Getting Started

### Setting up Supabase

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Set up the database schema according to the types defined in `web/src/dataHandlers/supabase/database.types.ts`
4. Get your Supabase URL and anon key from the project settings

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gotahobby.git
   cd gotahobby
   ```

2. Install dependencies:
   ```bash
   cd web
   yarn install
   ```

3. Create a `.env.local` file in the `web` directory with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### Running the Development Server

```bash
cd web
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `web/`: Next.js frontend application
  - `src/app/`: Next.js app router pages and API routes
  - `src/components/`: React components
  - `src/dataHandlers/`: Data access layer (Supabase, Firebase, mock data)
  - `src/types/`: TypeScript type definitions
  - `src/utils/`: Utility functions and helpers
  - `public/`: Static assets

## Development Workflow

1. Run the development server with `yarn dev`
2. Make changes to the code
3. The page will auto-update as you edit files
4. Use `yarn lint` to check for code quality issues
5. Use `yarn build` to create a production build

## Deployment

The application can be deployed on Vercel:

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Configure the environment variables in Vercel
4. Deploy

## License

[MIT](https://choosealicense.com/licenses/mit/)
