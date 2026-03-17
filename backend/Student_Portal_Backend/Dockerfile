FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy entire project
COPY . .

# Build jar inside container
RUN ./mvnw clean package -DskipTests

# Run jar
CMD ["java","-jar","target/Student_Portal_Backend-0.0.1-SNAPSHOT.jar"]