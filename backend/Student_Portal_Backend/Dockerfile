FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

# give permission to mvnw
RUN chmod +x mvnw

# build project
RUN ./mvnw clean package -DskipTests

CMD ["java","-jar","target/Student_Portal_Backend-0.0.1-SNAPSHOT.jar"]