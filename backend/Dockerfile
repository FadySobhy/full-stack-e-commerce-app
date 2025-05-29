FROM maven:3.9-eclipse-temurin-21 as build
WORKDIR /workspace/app

# Copy pom.xml and source code
COPY pom.xml .
COPY src src

# Build the application
RUN mvn clean package -DskipTests

# Create the final image
FROM eclipse-temurin:21-jre
VOLUME /tmp
COPY --from=build /workspace/app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"] 