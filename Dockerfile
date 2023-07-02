FROM golang:1.18-alpine

WORKDIR /app

COPY go.mod ./
COPY *.go ./
COPY static ./static

RUN go build -o app

CMD [ "./app" ]