DOCKER_WRAPPER_IMAGE_node(){ echo "15.5.1-buster"; }

DOCKER_WRAPPER_APP(){
  npm-server http $1 npm start
}
DOCKER_WRAPPER_STORYBOOK(){
  npm-server storybook $1 npm run storybook
}
DOCKER_WRAPPER_LOGS(){
  npm-server http logs
}

DOCKER_WRAPPER_SERVER_OPTS_http(){ echo "-p ${LABO_PORT_PREFIX}${PUBLIC_PORT}:${PUBLIC_APP_PORT}"; }
DOCKER_WRAPPER_SERVER_OPTS_storybook(){ echo "-p ${LABO_PORT_PREFIX}${STORYBOOK_PORT}:6006"; }
