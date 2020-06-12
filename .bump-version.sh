bump_build
bump_sync package.json 's|"version":.*|"version": "'$(cat .release-version)'",|'
bump_sync README.md 's|[^/]*/getto.css|'$(cat .release-version)'/getto.css|'
