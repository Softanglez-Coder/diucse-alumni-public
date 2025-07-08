import { Routes } from '@angular/router';

export const routes: Routes = [
    // Authentication
    {
        path: 'login',
        title: 'Login - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.Login)
    },
    {
        path: 'register',
        title: 'Register - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.Register)
    },
    {
        path: 'forgot-password',
        title: 'Forgot Password - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.ForgotPassword)
    },
    {
        path: 'reset-password',
        title: 'Reset Password - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.ResetPassword)
    },
    {
        path: 'verify-email',
        title: 'Verify Email - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.VerifyEmail)
    },

    // Events
    {
        path: 'events',
        title: 'Events - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.Events)
    },
    {
        path: 'events/:id',
        title: 'Event Details - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.EventDetails)
    },
    {
        path: 'events/:id/register',
        title: 'Register for Event - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.EventRegistration)
    },

    // Blogs
    {
        path: 'blogs',
        title: 'Blogs - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.Blogs)
    },
    {
        path: 'blogs/:id',
        title: 'Blog Details - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.BlogDetails)
    },

    // Misc
    {
        path: 'about',
        title: 'About Us - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.About)
    },
    {
        path: 'contact',
        title: 'Contact Us - DIUCSE Alumni',
        loadComponent: () => import('./pages').then(c => c.Contact)
    },


    // Portal
    {
        path: 'portal',
        loadComponent: () => import('./pages').then(c => c.Portal),
        title: 'Portal - DIUCSE Alumni',
        children: [
            {
                path: 'dashboard',
                title: 'Dashboard - DIUCSE Alumni',
                loadComponent: () => import('./pages').then(c => c.PortalDashboard)
            },
            {
                path: 'profile',
                title: 'Profile - DIUCSE Alumni',
                loadComponent: () => import('./pages').then(c => c.PortalProfile)
            },
            {
                path: 'settings',
                title: 'Settings - DIUCSE Alumni',
                loadComponent: () => import('./pages').then(c => c.PortalSettings)
            },
            {
                path: 'membership',
                title: 'Membership - DIUCSE Alumni',
                loadComponent: () => import('./pages').then(c => c.PortalMembership)
            },
            {
                path: 'events',
                title: 'Events - DIUCSE Alumni',
                loadComponent: () => import('./pages').then(c => c.PortalEvents)
            },
            {
                path: 'blogs',
                title: 'Blogs - DIUCSE Alumni',
                loadComponent: () => import('./pages').then(c => c.PortalBlogs)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        loadComponent: () => import('./pages').then(c => c.Home),
        title: 'Home - DIUCSE Alumni',
        pathMatch: 'full'
    },
];
