/**
 * Auth0 OAuth Callback Handler for Decap CMS
 * 
 * This function handles the callback from Auth0 after successful authentication.
 * It exchanges the authorization code for tokens and returns them to the CMS.
 * 
 * Required Environment Variables (set in Netlify dashboard):
 * - AUTH0_DOMAIN: Your Auth0 domain
 * - AUTH0_CLIENT_ID: Your Auth0 application client ID  
 * - AUTH0_CLIENT_SECRET: Your Auth0 application client secret
 * - SITE_URL: Your Netlify site URL
 */

export async function handler(event) {
    const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, SITE_URL } = process.env;
    const { code, state } = event.queryStringParameters || {};

    if (!code) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing authorization code' }),
        };
    }

    try {
        // Exchange authorization code for tokens
        const tokenResponse = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grant_type: 'authorization_code',
                client_id: AUTH0_CLIENT_ID,
                client_secret: AUTH0_CLIENT_SECRET,
                code,
                redirect_uri: `${SITE_URL}/api/callback`,
            }),
        });

        if (!tokenResponse.ok) {
            const error = await tokenResponse.text();
            console.error('Token exchange failed:', error);
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Token exchange failed' }),
            };
        }

        const tokens = await tokenResponse.json();

        // Get user info to retrieve GitHub access token
        // Note: You need to configure Auth0 to pass through the GitHub access token
        // via a Rule or Action. See AUTH0_SETUP.md for details.
        const userInfoResponse = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
            },
        });

        const userInfo = await userInfoResponse.json();

        // Parse state to get return URL
        let returnTo = '/admin/';
        try {
            const stateData = JSON.parse(Buffer.from(state, 'base64').toString());
            returnTo = stateData.returnTo || '/admin/';
        } catch (e) {
            // Use default
        }

        // Return HTML that communicates with the CMS opener window
        // The CMS expects a message with the token
        const script = `
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("receiveMessage %o", e);
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify({ token: tokens.access_token, provider: 'github' })}',
              e.origin
            );
            window.close();
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })();
      </script>
    `;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body: `<!DOCTYPE html><html><head><title>Authorizing...</title></head><body>${script}</body></html>`,
        };
    } catch (error) {
        console.error('OAuth callback error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
}
