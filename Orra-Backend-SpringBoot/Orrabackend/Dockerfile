# ---------- Stage 1 : Build ----------
FROM maven:3.9.11-eclipse-temurin-17 AS builder

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src src

RUN mvn clean package -DskipTests

# ---------- Stage 2 : Runtime ----------
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8081

# Install wget (needed for the health check)
RUN apk add --no-cache wget

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
    CMD wget -qO- http://localhost:8081/actuator/health > /dev/null || exit 1

ENTRYPOINT ["java","-XX:+UseContainerSupport","-jar","app.jar"]