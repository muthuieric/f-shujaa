'use server';

import { cookies } from 'next/headers';

// Handle refresh token logic
export async function handleRefresh() {
    console.log('handleRefresh');

    const refreshToken = await getRefreshToken();

    const token = await fetch('http://localhost:8000/api/auth/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(async (json) => { // Make sure to handle this asynchronously
            console.log('Response - Refresh:', json);

            if (json.access) {
                // Await cookies().set since it's an async operation
                await cookies().set('session_access_token', json.access, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 60 * 60, // 60 minutes
                    path: '/'
                });

                return json.access;
            } else {
                // Reset cookies if no access token is returned
                await resetAuthCookies();
            }
        })
        .catch(async (error) => {  // Make sure to handle error asynchronously
            console.log('error', error);
            await resetAuthCookies();
        })

    return token;
}

// Handle login and set cookies
export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    await cookies().set('session_userid', userId, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });

    await cookies().set('session_access_token', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60, // 60 minutes
        path: '/'
    });

    await cookies().set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/'
    });
}

// Reset authentication cookies
export async function resetAuthCookies() {
    // Await the cookie removal process to ensure proper execution
    await cookies().set('session_userid', '', {
        httpOnly: true,
        secure: false,
        maxAge: 0, // This will delete the cookie
        path: '/'
    });

    await cookies().set('session_access_token', '', {
        httpOnly: true,
        secure: false,
        maxAge: 0, // This will delete the cookie
        path: '/'
    });

    await cookies().set('session_refresh_token', '', {
        httpOnly: true,
        secure: false,
        maxAge: 0, // This will delete the cookie
        path: '/'
    });
}

// Get user ID from cookies
export async function getUserId() {
    // Await the cookies().get to ensure the operation is asynchronous
    const userId = await cookies().get('session_userid')?.value;
    return userId ? userId : null;
}

// Get access token, or refresh it if necessary
export async function getAccessToken() {
    let accessToken = await cookies().get('session_access_token')?.value;

    if (!accessToken) {
        accessToken = await handleRefresh();
    }

    return accessToken;
}

// Get refresh token from cookies
export async function getRefreshToken() {
    const refreshToken = await cookies().get('session_refresh_token')?.value;
    return refreshToken;
}
