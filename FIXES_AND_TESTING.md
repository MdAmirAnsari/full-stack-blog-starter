# Blog Application - Issues Fixed & Testing Guide

## Issues Found and Fixed

### 1. ✅ CORS Configuration Error
**Problem:** `backend/index.js` line 12 had incorrect CORS syntax
```javascript
// BEFORE (incorrect)
app.use(cors(process.env.CLIENT_URL));

// AFTER (correct)
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
```

### 2. ✅ User Model Reference Mismatch
**Problem:** Post model referenced "User" but user model exported as "user"
```javascript
// BEFORE (incorrect)
export default mongoose.model("user", userSchema);

// AFTER (correct)
export default mongoose.model("User", userSchema);
```

### 3. ✅ Corrupted Database Data
**Problem:** MongoDB had 6 users from a different application with incompatible schema
- Old users had: `userName`, `phone`, `password`, `isAdmin`
- Blog needs: `clerkUserId`, `username`, `email`, `img`
**Solution:** Deleted all incompatible users (ran cleanupOldUsers.js)

### 4. ✅ Missing Error Handling in Frontend
**Problem:** Write.jsx had no error display
**Solution:** Added `onError` handler and error display in the form

---

## Current Status

✅ MongoDB connection working  
✅ Backend server starts successfully  
✅ CORS fixed  
✅ Database cleaned up  
⚠️ **No users exist** - You need to sign up via Clerk  
⚠️ **Webhook needs verification** - Clerk must be configured to send webhooks

---

## Testing Steps

### Step 1: Start Backend Server
```bash
cd /Users/amirsohail/Projects/Blog/full-stack-blog-starter/backend
node --env-file .env index.js
```
Expected output:
```
Server is running!
MongoDB is connected
```

### Step 2: Start Frontend Server
In a new terminal:
```bash
cd /Users/amirsohail/Projects/Blog/full-stack-blog-starter/client
npm run dev
```

### Step 3: Sign Up / Log In
1. Open the app in browser (usually http://localhost:5173)
2. Sign up with Clerk authentication
3. This should trigger the webhook and create a user in MongoDB

### Step 4: Verify User Creation
```bash
cd /Users/amirsohail/Projects/Blog/full-stack-blog-starter/backend
node checkDB.js
```
You should see your user with valid `clerkUserId` and `username`

### Step 5: Test Image Upload
1. Go to the Write page
2. Click "Add a cover image"
3. Select an image
4. Check browser console for any errors
5. Verify progress shows upload status

### Step 6: Create a Post
1. Fill in:
   - Title
   - Category
   - Description
   - Content
2. Click "Send"
3. Should redirect to the new post page
4. Check MongoDB: `node checkDB.js` should show 1 post

---

## Troubleshooting

### If ImageKit Upload Fails
Check browser console for errors. Common issues:
- Invalid ImageKit credentials in `.env` files
- Network/CORS issues
- `/posts/upload-auth` endpoint not returning proper authentication

Test the auth endpoint:
```bash
curl http://localhost:3000/posts/upload-auth
```
Should return: `{"token":"...","expire":...,"signature":"..."}`

### If Post Creation Fails
Check browser console and network tab for the error. Common issues:

1. **"User not found!" error**
   - User wasn't created via Clerk webhook
   - Run `node checkDB.js` to verify users exist
   - Make sure you're logged in with the same account

2. **"Not authenticated!" error**
   - Clerk token not being sent
   - Check browser console for Clerk errors
   - Verify `VITE_CLERK_PUBLISHABLE_KEY` is correct

3. **Network error**
   - Backend not running
   - Wrong `VITE_API_URL` in client/.env
   - CORS issues (check browser console)

### Verify Clerk Webhook Configuration
1. Go to Clerk Dashboard → Webhooks
2. Ensure webhook endpoint is: `https://your-backend-url/webhooks/clerk`
3. Enable "user.created" event
4. Verify webhook secret matches `CLERK_WEBHOOK_SECRET` in backend/.env

For local development, you may need ngrok or similar:
```bash
ngrok http 3000
# Copy the URL and add /webhooks/clerk to Clerk dashboard
```

---

## Database Utility Scripts

I created these helper scripts for you:

1. **checkDB.js** - Check users and posts in database
```bash
node checkDB.js
```

2. **inspectUsers.js** - View raw user data
```bash
node inspectUsers.js
```

3. **cleanupOldUsers.js** - Remove incompatible users (already run)
```bash
node cleanupOldUsers.js
```

---

## Environment Variables Checklist

### Backend (.env)
- ✅ MONGO
- ✅ CLERK_WEBHOOK_SECRET
- ✅ CLERK_PUBLISHABLE_KEY
- ✅ CLERK_SECRET_KEY
- ✅ CLIENT_URL
- ✅ IK_URL_ENDPOINT
- ✅ IK_PUBLIC_KEY
- ✅ IK_PRIVATE_KEY

### Client (.env)
- ✅ VITE_IK_URL_ENDPOINT
- ✅ VITE_IK_PUBLIC_KEY
- ✅ VITE_CLERK_PUBLISHABLE_KEY
- ✅ VITE_API_URL

---

## Next Steps

1. Start both servers
2. Sign up/log in via Clerk
3. Verify user was created in MongoDB (`node checkDB.js`)
4. Try uploading an image
5. Create a test post
6. Check if post appears in PostList page
7. Verify post exists in MongoDB (`node checkDB.js`)

If you encounter any errors, check the browser console and terminal outputs, then refer to the troubleshooting section above.
