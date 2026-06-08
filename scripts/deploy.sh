#!/bin/bash
set -e

echo "=== InvestAI Deployment Script ==="
echo ""

# GitHub
if ! command -v gh &>/dev/null; then
  echo "GitHub CLI not found. Install from https://cli.github.com"
  exit 1
fi

echo "Checking GitHub auth..."
if ! gh auth status &>/dev/null; then
  echo "Please log in to GitHub:"
  gh auth login
fi

REPO_NAME="investai-dashboard"
GITHUB_USER=$(gh api user -q .login 2>/dev/null || echo "")

if [ -z "$GITHUB_USER" ]; then
  echo "Could not detect GitHub username."
  exit 1
fi

echo "Creating GitHub repo: $GITHUB_USER/$REPO_NAME"
gh repo create "$REPO_NAME" --public --source=. --remote=origin --push 2>/dev/null || {
  echo "Repo may already exist, pushing to origin..."
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
  git push -u origin main
}

echo ""
echo "GitHub: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""

# Vercel
echo "Deploying to Vercel..."
if ! command -v vercel &>/dev/null; then
  npm i -g vercel
fi

if ! vercel whoami &>/dev/null; then
  echo "Please log in to Vercel:"
  vercel login
fi

vercel --prod --yes

echo ""
echo "=== Deployment complete ==="
echo "Daily data refresh runs at 4:00 AM IST via Vercel Cron."
echo "Add OPENAI_API_KEY in Vercel dashboard for live AI analysis."
