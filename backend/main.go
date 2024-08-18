package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Body struct {
	Message string `json:"message"`
}

func echo(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()

	msg := []byte("hello")

	for {

		err = c.WriteMessage(1, msg)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}

func socket(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	log.Println("hello")
	w.WriteHeader(200)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(&Body{Message: "Hello, World!"})
}

func main() {

	http.HandleFunc("/", echo)

	http.HandleFunc("/ws", socket)

	log.Println("WS run")
	if err := http.ListenAndServe(":8000", nil); err != nil {
		log.Fatal(err)
	}

}
