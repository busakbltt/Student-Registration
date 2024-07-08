FROM maven:3.8.1-openjdk-17 AS build
COPY . /app
WORKDIR /app
RUN mvn clean package -DskipTests

FROM openjdk:17-slim
#RUN chmod +x /app/student-registration.jar
COPY --from=build /app/target/student-registration-0.0.1-SNAPSHOT.jar /app/student-registration.jar
EXPOSE 8090
ENTRYPOINT ["java", "-jar", "/student-registration.jar"]