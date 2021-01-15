bump_build
bump_sync package.json 's|"version":.*|"version": "'$(cat .release-version)'",|'
bump_sync README.md 's|[^/]*/getto\.css|'$(cat .release-version)'/getto\.css|'
bump_sync public/root/index.html 's|[^/]*/getto\.css|'$(cat .release-version)'/getto\.css|'
bump_sync public/root/index.js 's|[^/]*/index\.html|'$(cat .release-version)'/index\.html|'

versions_file=theme/public/root/versions.txt
cat .release-version >> $versions_file
git add $versions_file
