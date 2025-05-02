# 🔴 Assignment 18 – Real-Time WebSocket Integration for IELTS Platform

This project adds **real-time WebSocket communication** to the IELTS Speaking Test platform using `Flask-SocketIO` and `socket.io-client`.

Users receive **instant updates** such as test start notifications, system alerts, or admin messages — all without refreshing the page.

---

## 🎯 Objective

Enable **live two-way communication** between the Flask backend and React frontend using WebSockets.

---

## ✅ Features Implemented

- ✅ Flask-SocketIO WebSocket server setup
- ✅ React integration using `socket.io-client`
- ✅ Yellow notification bar displays:
  - “✅ Welcome to the IELTS platform!”
  - Real-time test status updates (`start_test` event)
- ✅ Clean connect/disconnect lifecycle with `useEffect`
- ✅ Fully responsive and non-blocking UX

---

## 📁 Files Added / Updated

### 🔧 Backend (`app.py`)
- Configured `SocketIO`:
  ```python
  from flask_socketio import SocketIO, emit
  socketio = SocketIO(app, cors_allowed_origins="*")

  @socketio.on('connect')
  def handle_connect():
      emit('update', {'message': '✅ Welcome to the IELTS platform!'})
