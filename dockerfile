FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY . PlaywrightProject/
ENTRYPOINT ["npm","install"]