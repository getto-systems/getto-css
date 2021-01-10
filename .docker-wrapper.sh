DOCKER_WRAPPER_IMAGE_node(){ echo "15.5.1-buster"; }

DOCKER_WRAPPER_APP(){
  npm-server http $1 npm start
}
DOCKER_WRAPPER_LOGS(){
  case "$1" in
    *)
      npm-server http logs
      ;;
  esac
}

DOCKER_WRAPPER_SERVER_OPTS_http(){ echo "-p ${LABO_PORT_PREFIX}${PUBLIC_PORT}:${PUBLIC_APP_PORT}"; }
