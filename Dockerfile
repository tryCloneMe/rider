FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod go.sum *.go ./

COPY postgres ./postgres

RUN go mod download
RUN go build -o /main

EXPOSE 8080

CMD [ "/main" ]