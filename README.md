# About

https://gridpainter.vercel.app/ \
A school project.\
A gridpainter game that uses a grid to paint togheter with muliple users. \
Also a chat using socket.io.

<p align="center">
  <figure>
     <img src="https://raw.githubusercontent.com/assarbertil/notes/main/screenshot.png" alt="App screenshot" />
    <figcaption>
      <p align="center">
        Demo
      </p>
    </figcaption>
  </figure>
</p>

# Getting started

## Installation backend

First time installation requires you to run `npm install` and afterwards create a .env file with required mongodb credentials.

The .env should contain the environments variables described below:

```
DATABASE_URL="mongodb+srv://gridpainter:<password>@cluster0.j8bx5b3.mongodb.net/?retryWrites=true&w=majority"

```

### Run backend

After installation you can get started by running `npm start`.\
Once started open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Packages used backend

express \
dotenv \
nodemon \
cors \
mongoose \
socket.io \
axios \
nanoid

## Installation frontend

First time installation requires you to run `npm install`.

## Run frontend

After installation you can get started by running `npm start`.\
Once started open [http://localhost:3001](http://localhost:3001) to view it in your browser.

### Packages used

react \
font-awesome-icons \
socket.io-client \
react-timer-hook\
headlessui \
tailwind
