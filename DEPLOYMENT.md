# TomsMCPs Deployment Checklist

## Pre-Deployment Checklist

Before deploying to production, ensure you've completed these steps:

### Code Quality
- [ ] All tests pass (if applicable)
- [ ] No hardcoded secrets or API keys in code
- [ ] `.gitignore` is properly configured
- [ ] All sensitive files are excluded from git
- [ ] Code is committed to the main branch

### Configuration
- [ ] `.env.example` file is up to date
- [ ] `requirements.txt` is generated and accurate
- [ ] `render.yaml` is configured correctly
- [ ] Production environment variables are documented

### Security
- [ ] `SESSION_SECRET` will be set in production (never commit this)
- [ ] `FLASK_ENV` set to `production`
- [ ] `FLASK_DEBUG` set to `False`
- [ ] Security headers are enabled in `app.py`
- [ ] No development dependencies in production

### Data
- [ ] `servers.json` is validated and error-free
- [ ] All servers have required fields (name, url, description, category)
- [ ] No duplicate entries
- [ ] Categories are consistent and consolidated

---

## Render.com Deployment Steps

### Initial Setup

1. **Prepare Repository**
   ```bash
   # Ensure all changes are committed
   git status
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub account
   - Authorize Render to access your repositories

3. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Choose "Connect a repository"
   - Find and select your `TomsMCPs` repository

4. **Configure Service**

   **Using render.yaml (Automatic):**
   - Render will detect `render.yaml`
   - Click "Apply" to use the blueprint configuration
   - Review settings and confirm

   **Manual Configuration:**
   - **Name:** `tomsmcps` (or your preferred name)
   - **Region:** Choose closest to your users (e.g., Oregon)
   - **Branch:** `main`
   - **Runtime:** Python 3.11
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn main:app`
   - **Plan:** Free

5. **Environment Variables**

   Set these in the Render dashboard:

   | Variable | Value | Notes |
   |----------|-------|-------|
   | `SESSION_SECRET` | Auto-generated | Render can generate this |
   | `FLASK_ENV` | `production` | Required |
   | `FLASK_DEBUG` | `False` | Security requirement |
   | `LOG_LEVEL` | `INFO` | Optional, defaults to INFO |
   | `PYTHON_VERSION` | `3.11.0` | Optional, ensures correct Python |

6. **Deploy**
   - Click "Create Web Service"
   - Watch the build logs
   - Wait for deployment to complete (2-5 minutes)
   - Service will be live at: `https://your-service-name.onrender.com`

---

## Post-Deployment Checklist

### Verification

- [ ] Site loads successfully at deployment URL
- [ ] All 316 servers are displayed
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Mobile responsive design displays correctly
- [ ] All GitHub links are clickable and work
- [ ] Health check endpoint responds: `/health`
- [ ] Favicon displays correctly
- [ ] No console errors in browser developer tools

### Testing

- [ ] Test search with various keywords
- [ ] Test each category filter
- [ ] Test "All Categories" view
- [ ] Verify server cards display all information
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Verify SSL certificate is active (https://)

### Monitoring

- [ ] Render dashboard shows "Live" status
- [ ] Check application logs for errors
- [ ] Monitor response times
- [ ] Set up uptime monitoring (optional - UptimeRobot, etc.)
- [ ] Note the health check URL for monitoring

### Documentation

- [ ] Update README with live deployment URL
- [ ] Document any deployment issues encountered
- [ ] Update repository description with live link
- [ ] Add deployment badge to README (optional)

---

## Ongoing Maintenance

### Adding New Servers

1. Update `static/data/servers.json` locally
2. Validate JSON structure
3. Test locally: `python app.py`
4. Commit and push changes
5. Render auto-deploys on push to main

### Updating Configuration

1. Change environment variables in Render dashboard
2. Manually redeploy if needed
3. Monitor logs for any issues

### Monitoring

- Check Render dashboard weekly for any issues
- Review application logs for errors
- Monitor free tier usage (750 hours/month)

---

## Troubleshooting

### Build Failures

**Problem:** Build fails during `pip install`
- **Solution:** Check `requirements.txt` syntax
- **Solution:** Verify Python version compatibility

**Problem:** Module import errors
- **Solution:** Ensure all dependencies are in `requirements.txt`
- **Solution:** Check for typos in import statements

### Runtime Errors

**Problem:** 500 Internal Server Error
- **Check:** Application logs in Render dashboard
- **Check:** `SESSION_SECRET` is set correctly
- **Check:** `FLASK_ENV=production` is set

**Problem:** Site loads but no servers display
- **Check:** `servers.json` file is valid JSON
- **Check:** File path is correct in `app.py`
- **Check:** Application logs for file read errors

**Problem:** Health check failing
- **Check:** `/health` endpoint is accessible
- **Check:** Application is binding to correct port
- **Check:** Gunicorn is starting correctly

### Performance Issues

**Problem:** Slow response times
- **Check:** Free tier spinning up from sleep (~30 seconds)
- **Consider:** Upgrading to paid tier for 24/7 uptime
- **Check:** Application logs for bottlenecks

**Problem:** Service keeps spinning down
- **Note:** Free tier spins down after 15 minutes of inactivity
- **Solution:** Use a ping service or upgrade to paid tier

---

## Rollback Procedure

If deployment fails or introduces critical bugs:

1. **Revert Git Commit**
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Manual Rollback in Render**
   - Go to Render dashboard
   - Select your service
   - Click "Events" tab
   - Find last successful deployment
   - Click "Rollback to this version"

3. **Verify Rollback**
   - Check site functionality
   - Review logs
   - Monitor for errors

---

## Security Considerations

### Before Going Live

- [ ] SESSION_SECRET is strong and unique (32+ characters)
- [ ] Debug mode is disabled in production
- [ ] All security headers are active
- [ ] No secrets in environment variables are logged
- [ ] HTTPS is enforced (automatic with Render)

### Regular Maintenance

- [ ] Update dependencies monthly: `pip list --outdated`
- [ ] Review security advisories for Flask and dependencies
- [ ] Monitor application logs for suspicious activity
- [ ] Keep Python version updated

---

## Support & Resources

### Render Documentation
- [Python Deployment Guide](https://render.com/docs/deploy-flask)
- [Environment Variables](https://render.com/docs/environment-variables)
- [Health Checks](https://render.com/docs/health-checks)

### Flask Documentation
- [Deployment Options](https://flask.palletsprojects.com/en/latest/deploying/)
- [Configuration Handling](https://flask.palletsprojects.com/en/latest/config/)

### Common Issues
- Check Render Status: https://status.render.com
- Community Forum: https://community.render.com

---

## Deployment Complete! 🎉

Once all checklists are complete, your TomsMCPs site is live and ready to serve users!

**Next Steps:**
1. Share your deployment URL
2. Monitor initial traffic and logs
3. Plan future enhancements (user submissions, etc.)
4. Consider setting up analytics (optional)

**Live Site:** `https://your-service-name.onrender.com`

**Health Check:** `https://your-service-name.onrender.com/health`
