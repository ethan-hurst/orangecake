/**
 * Auth0 OAuth Handler for Decap CMS
 * 
 * This function initiates the OAuth flow by redirecting to Auth0.
 * After Auth0 authenticates the user, it exchanges the code for a GitHub token.
 * 
 * Required Environment Variables (set in Netlify dashboard):
 * - AUTH0_DOMAIN: Your Auth0 domain (e.g., your-tenant.auth0.com)
 * - AUTH0_CLIENT_ID: Your Auth0 application client ID
 * - AUTH0_CLIENT_SECRET: Your Auth0 application client secret
 * - SITE_URL: Your Netlify site URL (e.g., https://your-site.netlify.app)
 */

export async function handler(event) {
    const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, SITE_URL } = process.env;

    if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID || !SITE_URL) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Missing Auth0 environment variables' }),
        };
    }

    // Build Auth0 authorization URL
    const authUrl = new URL(`https://${AUTH0_DOMAIN}/authorize`);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('client_id', AUTH0_CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', `${SITE_URL}/api/callback`);
    authUrl.searchParams.set('scope', 'openid profile email');
    authUrl.searchParams.set('connection', 'github'); // Use GitHub as identity provider in Auth0

    // Store the original CMS path to redirect back after auth
    const state = Buffer.from(JSON.stringify({
        provider: 'github',
        returnTo: '/admin/'
    })).toString('base64');
    authUrl.searchParams.set('state', state);

    return {
        statusCode: 302,
        headers: {
            Location: authUrl.toString(),
            'Cache-Control': 'no-cache',
        },
        body: '',
    };
}
