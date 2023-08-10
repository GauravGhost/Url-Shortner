# Url Shortner

## Description
The Advanced URL Shortener project is a powerful web service built using Node.js that provides users with the ability to create short url, easy-to-share links for their long URLs. This project leverages the capabilities of MongoDB for persistent data storage and Redis for efficient caching, resulting in a highly performant and scalable system.

### Key Features

- URL Shortening: The project offers a user-friendly API with two main endpoints.

- URL Redirection: Users who access a short URL are automatically redirected to the original, longer URL.

- MongoDB Data Storage: The project employs MongoDB to store the mapping between the short codes and the corresponding original URLs.

- Redis Caching: To optimize performance I have utilized Redis as a caching layer. When users access a short URL, the corresponding original URL is fetched from the Redis cache, if available. This reduces the load on the MongoDB database and improves response times. I have also Implemented an expiration mechanism, automatically clearing outdated cache entries after 24 hours.
## Tech Stack
- **Node Js**
- **Express Js**
- **mongoDb**
- **mongoose**
- **Redis**

## API Reference

#### endpoint
```http
  13.233.15.78:4000
```

| Parameter | Method   | Body | Description                    |
| :-------- | :------- |:------- |:-------------------------   |
| `/` | `POST` |         |Make Url short and return short url  |
| `/:url` | `GET` |         |redirect to the original Url    |

## Setup the project

 - Download this and open it in your favourite text editor. 
 - Go inside the folder path and execute the following command:
  ```
  npm install
  ```
 - In the root directory create a `.env` file and add the following env variables
    ```
        PORT=<port number of your choice>
        ENV=<development> or <production>
        MONGODB_URL
        WORKER_ID= <between<0 to 1024>>
    ```
    ex: 
    ```
        PORT=3000
    ```
 - If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.

 - To run the server execute
 ```
 npm run dev
 ```
