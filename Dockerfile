FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod go.sum *.go ./

# COPY static ./static
# COPY postgres ./postgres

RUN go mod download
RUN go build -o /app

EXPOSE 8081

CMD [ "./app" ]