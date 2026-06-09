# CreatiPage

A professional portfolio website for a creative service provider, built with Next.js and Firebase.

## Getting Started

### Prerequisites

* Node.js 16 or higher
* Firebase CLI (optional)
* Git (optional)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd CreatiPage
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy the example environment file and fill in your Firebase credentials:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your actual Firebase configuration values.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Development

### Available Scripts

* `npm run dev`: Start the development server
* `npm run build`: Build the production application
* `npm run start`: Start the production server (requires `npm run build` first)
* `npm run lint`: Lint the codebase

### Project Structure

* `src/app/`: Next.js application pages
* `src/components/`: Reusable React components
* `src/lib/`: Utility functions and Firebase configuration
* `src/styles/`: Global styles and Tailwind configuration
* `src/constants/`: Constants and configuration data

## Deployment

### Firebase Hosting

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase:**
   ```bash
   firebase deploy --only hosting
   ```

### Vercel

1. **Import the project** into Vercel
2. **Set environment variables** in the Vercel dashboard
3. **Deploy**

## Technologies Used

* **Next.js**: React framework for server-side rendering and static site generation
* **Firebase**: Backend services including authentication, Firestore, and storage
* **Tailwind CSS**: Utility-first CSS framework for styling
* **Shadcn UI**: Component library for accessible UI elements
* **React Hook Form**: For form management and validation
* **Zod**: Schema declaration and validation library
* **Lucide Icons**: Icon library
* **Framer Motion**: For animations (optional)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
