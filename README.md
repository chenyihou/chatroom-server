### chatroom
---

* Hosted on [AWS (EC2)](http://99.79.9.127:4000/)
* This aplication support basic register, login, using jsonwebtoken to ensure the security; basic live chat once you login

* To use, first register a new user, then login
* The server will send a token to the client and reserve in local storage
* Once login, the browser will automatically redirect to the [chatroom](http://99.79.9.127:4000/chatroom)
* Next time you access the website, you don't need to login as the token is not expired