git_release_request_dump_version_local(){
  local file
  for file in README.md; do
    sed -i 's/\/[0-9.-]\+\/getto.css/\/'$version'\/getto.css/' $file
    git add $file
  done
}
