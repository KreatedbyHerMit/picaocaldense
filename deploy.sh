#!/bin/bash

# -----------------------------
# Variables
# -----------------------------
SITE_DIR="/workspaces/Python/PicaoCaldenseSite"
NETLIFY_SITE_ID="0393cd70-f631-4b45-bbaa-5b4512b1fe1a"
NETLIFY_AUTH_TOKEN="nfp_hEiXppWNfjZdVm16xoQwwdD1aRn1brMa7dab"
GITHUB_USER="YOUR_GITHUB_USERNAME"
REPO_NAME="picaocaldense-site"
BRANCH="main"

# -----------------------------
# Step 1: Go to site folder
# -----------------------------
cd "$SITE_DIR" || { echo "❌ Site folder not found!"; exit 1; }

# -----------------------------
# Step 2: Install gems
# -----------------------------
if [ ! -f "Gemfile" ]; then
  cat > Gemfile <<EOL
source "https://rubygems.org"
gem "jekyll", "~> 4.4.1"
gem "minima", "~> 2.5"
EOL
fi

bundle install || { echo "❌ Bundle install failed!"; exit 1; }

# -----------------------------
# Step 3: Build the Jekyll site
# -----------------------------
bundle exec jekyll build || { echo "❌ Jekyll build failed!"; exit 1; }

# -----------------------------
# Step 4: Deploy to Netlify
# -----------------------------
if ! command -v netlify &> /dev/null; then
    echo "⚡ Netlify CLI not found, installing..."
    npm install -g netlify-cli
fi

netlify deploy --dir=_site --prod --site="$NETLIFY_SITE_ID" --auth="$NETLIFY_AUTH_TOKEN" || { echo "❌ Netlify deploy failed!"; exit 1; }
echo "✅ Site deployed to Netlify successfully!"

# -----------------------------
# Step 5: Deploy to GitHub Pages
# -----------------------------
if [ ! -d ".git" ]; then
    git init
    git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
fi

git add .
git commit -m "Update site $(date '+%Y-%m-%d %H:%M:%S')" || echo "⚠ Nothing to commit"
git push origin "$BRANCH" || { echo "❌ GitHub push failed!"; exit 1; }

echo "✅ Site deployed to GitHub Pages successfully!"
