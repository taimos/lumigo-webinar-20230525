FROM maven:latest as build

# Copy the current directory into the build container
COPY . .

# Build the project with Maven
RUN mvn clean package

FROM amazoncorretto:17

# Copy the jar file of the built application from the build container to the runtime container
COPY --from=build target/lumigo-demo-*.jar app.jar

# Set the command to run the Java application
CMD ["java","-jar","app.jar"]
