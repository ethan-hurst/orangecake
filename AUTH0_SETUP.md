# Auth0 Setup Guide for Decap CMS

This guide explains how to configure Auth0 for CMS authentication.

## 1. Create Auth0 Application

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Navigate to **Applications > Applications**
3. Click **Create Application**
4. Choose **Regular Web Application**
5. Name it "Orangecake CMS"

## 2. Configure Application Settings

In your Auth0 application settings:

| Setting | Value |
|---------|-------|
| **Allowed Callback URLs** | `https://YOUR-SITE.netlify.app/api/callback` |
| **Allowed Logout URLs** | `https://YOUR-SITE.netlify.app/admin/` |
| **Allowed Web Origins** | `https://YOUR-SITE.netlify.app` |

## 3. Add GitHub Social Connection

1. Go to **Authentication > Social**
2. Click **Create Connection**
3. Select **GitHub**
4. Configure with your GitHub OAuth App credentials
5. Enable for your application

## 4. Set Netlify Environment Variables

In Netlify dashboard (**Site settings > Environment variables**):

| Variable | Value |
|----------|-------|
| `AUTH0_DOMAIN` | `your-tenant.auth0.com` |
| `AUTH0_CLIENT_ID` | From Auth0 app settings |
| `AUTH0_CLIENT_SECRET` | From Auth0 app settings |
| `SITE_URL` | `https://your-site.netlify.app` |

## 5. Update CMS Config

Edit `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: YOUR_USERNAME/orangecake  # Your GitHub repo
  branch: main
  base_url: https://YOUR-SITE.netlify.app
  auth_endpoint: /api/auth
```

## 6. Deploy & Test

1. Push changes to GitHub
2. Wait for Netlify deploy
3. Visit `https://your-site.netlify.app/admin/`
4. Click login - you'll be redirected to Auth0 → GitHub
5. After auth, you'll return to the CMS
