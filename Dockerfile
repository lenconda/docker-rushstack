FROM circleci/node:16.13
RUN sudo npm i octokit pnpm @microsoft/rush -g --unsafe-perm=true --registry=https://registry.npmmirror.com
RUN mkdir -p ~/.ssh
RUN touch ~/.ssh/known_hosts
RUN sudo sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list
RUN sudo sed -i s@/security.debian.org/@/mirrors.aliyun.com/@g /etc/apt/sources.list
COPY rush-github-utils.js /usr/local/bin/rgu
RUN sudo chmod +x /usr/local/bin/rgu
RUN rgu

