FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod go.sum *.go ./

COPY postgres ./postgres
COPY server ./server
COPY frontend ./frontend

RUN go mod download
RUN cd server && go build -o main

EXPOSE 8080

CMD cd server && ./main