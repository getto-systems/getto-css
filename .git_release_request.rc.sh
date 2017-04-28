git_release_request_dump_version_local(){
  local file
  for file in README.md; do
    sed -i 's/\/[0-9.-]\+\/getto.css/\/'$version'\/getto.css/' $file
    git add $file
  done
  for file in public/*.html; do
    sed -i 's/version : [0-9.-]\+/version : '$version'/' $file
    git add $file
  done
}
