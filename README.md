# Aptitude Forge

Engineering Technical Assessment and Quantitative Aptitude Question Bank Platform.

## Production Deployment & Multi-User Testing Guide

Follow these steps to deploy Aptitude Forge for real concurrent student assessments on Vercel:

### 1. MongoDB Atlas Setup
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Network Access**, add `0.0.0.0/0` (Allow access from anywhere for serverless lambdas).
3. Under **Database Access**, create a user and copy the connection string.
   - Example format: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/aptitude_forge?retryWrites=true&w=majority`

### 2. Configure Environment Variables
Locally in `.env` or in Vercel Project Settings > Environment Variables:

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `GEMINI_API_KEY` | Google Gemini API Key (for question generation & AI grading) |
| `JWT_SECRET` | Secret key for signing student session tokens |

### 3. Deploy to Vercel
```bash
# Push repository to GitHub/GitLab and import to Vercel, or deploy using Vercel CLI:
vercel --prod
```
- Build Command: `npm run build`
- Output Directory: `dist`

### 4. Verify Health & Diagnostics
Check the production health endpoint:
```
GET https://your-domain.vercel.app/api/health
```
Ensure `mongodb.connected` is `true` and `gemini.configured` is `true`.

### 5. 10-Student Multi-User Assessment Flow
1. **Student Registration / Login**: Have each student open the deployed URL on their device and register with their Name, Roll Number, and Password.
2. **Take an Assessment**: Students select a topic or comprehensive test. The platform generates a unique `testCode`.
3. **Submit & Server-Grading**: When submitted, the backend authoritatively evaluates responses, uses Gemini NLP for short-answer equivalence, and writes the attempt directly to MongoDB.
4. **Live Leaderboard**: Students and faculty can view the leaderboard filtered by `testCode`, topic, or department. Real student names, verified scores, and rankings are displayed directly from MongoDB with zero mock records.

---

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment file and configure variables:
   ```bash
   cp .env.example .env
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Build production bundle:
   ```bash
   npm run build
   ```
