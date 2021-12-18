# Playwright-GUI-API-example

## The test project for Playwright GUI/API testing demo purposes

The app crawls website nytimes.com for headers of given topic and returns in console
AND creates separate .csv documents with:
- Dictionary of found relevant words in topics and their usage
- Denormalized probability of each certificated word
- Normalized probability of each certificated word
- Verification data to check sample analysis

## Prerequisites
* **node >= 12.22.7**;
* **npm >= 6.14.15**
* **playwright >= 1.17.1**

## Use:
- to run 
```
mvn clean package
```
- to execute .jar file with the app
```
java -jar LR2_topic_classifier-0.0.1-SNAPSHOT.jar
```
- to execute .jar file for optional topics specify comma separated topics in double quotes
```
java -jar LR2_topic_classifier-0.0.1-SNAPSHOT.jar --topics="some,foo,bar"
```
