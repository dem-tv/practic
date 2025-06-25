FROM debian:12-slim

RUN apt-get update && apt-get upgrade -y && apt-get clean
RUN apt-get install -y openssh-client curl rsync unzip

#Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_22.x | bash \
	&& apt-get update \
	&& apt-get install -y --no-install-recommends nodejs \
	&& apt-get clean

#Install npm
RUN npm install -g npm@11.3.0
