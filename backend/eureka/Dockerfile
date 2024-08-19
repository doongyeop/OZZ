FROM openjdk:17-jdk-slim
# or
# FROM openjdk:8-jdk-alpine
# FROM openjdk:11-jdk-alpine

VOLUME /tmp

ARG JAR_FILE=build/libs/*.jar
# or Maven
# ARG JAR_FILE_PATH=target/*.jar

COPY ${JAR_FILE} ozz-eureka.jar

ENTRYPOINT ["java","-jar","/ozz-eureka.jar"]