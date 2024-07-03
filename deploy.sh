#!/usr/bin/env sh\

set -e

npm run build

cd dist

git init
git add -A
git commit 
git push -f git@github.com:Shade9378/CHEM120-E-Textbook.git main28796_Shade
:gh-pages

cd -