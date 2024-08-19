FROM openjdk:17-jdk-slim

VOLUME /tmp

ARG JAR_FILE=build/libs/*.jar
# or Maven
# ARG JAR_FILE_PATH=target/*.jar

COPY ${JAR_FILE} ozz-clothes.jar

ENTRYPOINT ["java","-jar","/ozz-clothes.jar"]