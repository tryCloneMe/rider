FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod ./
COPY *.go ./
COPY frontend/dist ./frontend/dist

RUN go build -o app

CMD [ "./app" ]