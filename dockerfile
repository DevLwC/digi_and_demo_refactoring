# Build Stage (optional, nur falls du direkt Maven bauen willst)
FROM maven:3.9.2-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run Stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
USER 1001:1001
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
