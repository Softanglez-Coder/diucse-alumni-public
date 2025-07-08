import { Routes } from '@angular/router';

export const routes: Routes = [
    // Authentication
    // {
    //     path: 'login',
    //     title: 'Login - DIUCSE Alumni',
    // },
    // {
    //     path: 'register',
    //     title: 'Register - DIUCSE Alumni',
    // },
    // {
    //     path: 'forgot-password',
    //     title: 'Forgot Password - DIUCSE Alumni',
    // },
    // {
    //     path: 'reset-password',
    //     title: 'Reset Password - DIUCSE Alumni',
    // },
    // {
    //     path: 'verify-email',
    //     title: 'Verify Email - DIUCSE Alumni',
    // },

    // // Events
    // {
    //     path: 'events',
    //     title: 'Events - DIUCSE Alumni',
    // },
    // {
    //     path: 'events/:id',
    //     title: 'Event Details - DIUCSE Alumni',
    // },
    // {
    //     path: 'events/:id/register',
    //     title: 'Register for Event - DIUCSE Alumni',
    // },

    // // Blogs
    // {
    //     path: 'blogs',
    //     title: 'Blogs - DIUCSE Alumni',
    // },
    // {
    //     path: 'blogs/:id',
    //     title: 'Blog Details - DIUCSE Alumni',
    // },

    // // Misc
    // {
    //     path: 'about',
    //     title: 'About Us - DIUCSE Alumni',
    // },
    // {
    //     path: 'contact',
    //     title: 'Contact Us - DIUCSE Alumni',
    // },


    // Portal
    {
        path: 'portal',
        loadComponent: () => import('./pages').then(c => c.Portal),
        title: 'Portal - DIUCSE Alumni',
        children: [
            {
                path: 'dashboard',
                title: 'Dashboard - DIUCSE Alumni',
                loadComponent: () => import('./pages').then(c => c.Dashboard)
            },
            {
                path: 'profile',
                title: 'Profile - DIUCSE Alumni',
                loadComponent: () => import('./pages').then(c => c.Profile)
            },
            {
                path: 'settings',
                title: 'Settings - DIUCSE Alumni',
                loadComponent: () => import('./pages').then(c => c.Settings)
            },
            // {
            //     path: 'membership',
            //     title: 'Membership - DIUCSE Alumni',
            // },
            // {
            //     path: 'events',
            //     title: 'Events - DIUCSE Alumni',
            // },
            // {
            //     path: 'blogs',
            //     title: 'Blogs - DIUCSE Alumni',
            // },
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
