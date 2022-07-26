FROM circleci/node:14.15
RUN sudo npm i pnpm @microsoft/rush -g --unsafe-perm=true
RUN mkdir -p ~/.ssh
RUN touch ~/.ssh/known_hosts
