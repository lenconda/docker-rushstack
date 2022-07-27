FROM circleci/node:16.13
RUN sudo npm i pnpm @microsoft/rush -g --unsafe-perm=true
RUN mkdir -p ~/.ssh
RUN touch ~/.ssh/known_hosts
RUN sudo sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list
RUN sudo sed -i s@/security.debian.org/@/mirrors.aliyun.com/@g /etc/apt/sources.list

