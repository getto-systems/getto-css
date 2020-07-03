bump_build
bump_sync package.json 's|"version":.*|"version": "'$(cat .release-version)'",|'
bump_sync README.md 's|[^/]*/getto\.css|'$(cat .release-version)'/getto\.css|'
bump_sync public/root/index.html 's|[^/]*/getto\.css|'$(cat .release-version)'/getto\.css|'
bump_sync public/root/index.js 's|[^/]*/index\.html|'$(cat .release-version)'/index\.html|'

cat .release-version >> public/root/versions.txt
git add public/root/versions.txt
