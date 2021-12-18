FROM mcr.microsoft.com/playwright:focal
VOLUME /tmp
COPY . PlaywrightProject/
ENTRYPOINT ["npm","install"]