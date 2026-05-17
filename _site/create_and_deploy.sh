#!/bin/bash

set -e  # stop on errors

# -------------------------
# Configuration
# -------------------------
GITHUB_USER="KreatedbyHerMit"
REPO_NAME="picaocaldense"
PROJECT_DIR="$(pwd)"
BRANCH="main"

# -------------------------
# Go to project folder
# -------------------------
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

echo "📁 Working in: $PROJECT_DIR"

# -------------------------
# Ensure index.html exists
# -------------------------
if [ ! -f index.html ]; then
cat <<EOL > index.html
<!DOCTYPE html>
<html>
<head>
  <title>Picao Caldense</title>
</head>
<body>
  <h1>Welcome to Picao Caldense!</h1>
</body>
</html>
EOL
echo "Created basic index.html"
fi

# -------------------------
# Initialize git safely
# -------------------------
if [ ! -d .git ]; then
  git init -b "$BRANCH"
else
  echo "Git already initialized"
fi

# -------------------------
# Add remote if missing
# -------------------------
if ! git remote | grep -q origin; then
  git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
fi

# -------------------------
# Commit changes
# -------------------------
git add .

if git diff --cached --quiet; then
  echo "No changes to commit"
else
  git commit -m "Deploy Picao Caldense site"
fi

# -------------------------
# Push to GitHub
# -------------------------
git push -u origin "$BRANCH"

# -------------------------
# Create repo (only if needed)
# -------------------------
gh repo view "$GITHUB_USER/$REPO_NAME" >/dev/null 2>&1 || {
  echo "Creating GitHub repo..."
  gh repo create "$GITHUB_USER/$REPO_NAME" --public --source=. --remote=origin --push
}

echo "🚀 Deployment complete"