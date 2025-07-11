# Official Website for luis-ruiz.com

This project is the official website for `luis-ruiz.com`, built with Next.js and leveraging Clerk for robust authentication and user management.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Authentication Flow

The application implements a secure authentication flow using Clerk's middleware to protect routes and manage user sessions. The core logic is defined in `middleware.js`.

1.  **Protected Routes**: The routes `/dashboard` and `/user` are defined as protected. Any attempt to access them without authentication will trigger a redirection.

2.  **Sign-In/Sign-Up**: Unauthenticated users trying to access a protected route are redirected to `/sign-in`. The UI for signing in and signing up is handled by Clerk's pre-built components, ensuring a secure and seamless experience.

3.  **Role-Based Access Control**: The application has two main roles:
    *   **Admin**: The user with the email `giosterr44@gmail.com` is designated as the admin.
    *   **User**: Any other authenticated user.

4.  **Admin Dashboard**: Access to the `/dashboard` route is strictly limited to the admin. The middleware verifies the user's email address. If a non-admin user attempts to access the dashboard, they are redirected to their personal `/user/[userId]` page.

### Authentication Flow Diagram

The following diagram illustrates the user flow and decision-making process within the authentication middleware:

```mermaid
flowchart TD
    A[User visits a URL] --> B{Is it a protected route?};
    B -->|No| C[Show public page];
    B -->|Yes| D{Is user authenticated?};
    D -->|No| E[Redirect to /sign-in];
    E --> F[User signs in successfully];
    F --> G[Redirect to originally requested URL];
    D -->|Yes| H{Is the route /dashboard?};
    H -->|No| I[Show /user/[userId] page];
    H -->|Yes| J{Is user's email the ADMIN_EMAIL?};
    J -->|Yes| K[Show /dashboard page];
    J -->|No| L[Redirect to /user/[userId] page];
```

