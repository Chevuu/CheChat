package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Connection struct {
	Conn *websocket.Conn
	Port string
}

var connections = make(map[string][]*Connection)

func handler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	// Read the first message to extract the port number
	_, p, err := conn.ReadMessage()
	if err != nil {
		log.Println(err)
		return
	}

	// Extract the port number from the message
	port := strings.Trim(string(p), ":")
	fmt.Printf("New port: %s\n", port)

	// Create a new connection and add it to the map
	c := &Connection{Conn: conn, Port: port}

	if _, ok := connections[port]; !ok {
		connections[port] = []*Connection{c}
	} else {
		connections[port] = append(connections[port], c)
	}

	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			removeConnection(c)
			return
		}

		// Extract the recipient and sender ports from the message
		msg := string(p)
		fmt.Printf("Message type: %s\n", msg)
		parts := strings.Split(msg, ":")
		if len(parts) != 3 {
			log.Printf("Invalid message: %s\n", msg)
			continue
		}
		recipientPort := parts[1]
		senderPort := parts[2]

		// Send the message to the recipient connections
		for _, conn := range connections[recipientPort] {
			if err = conn.Conn.WriteMessage(messageType, []byte(msg)); err != nil {
				log.Println(err)
			}
		}

		// Send the message to the recipient connections
		for _, conn := range connections[senderPort] {
			if err = conn.Conn.WriteMessage(messageType, []byte(msg)); err != nil {
				log.Println(err)
			}
		}
	}
}

func removeConnection(conn *Connection) {
	if _, ok := connections[conn.Port]; ok {
		for i, c := range connections[conn.Port] {
			if c == conn {
				connections[conn.Port] = append(connections[conn.Port][:i], connections[conn.Port][i+1:]...)
				break
			}
		}
	}
}

func main() {
	http.HandleFunc("/", handler)
	log.Println("Server listening on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
