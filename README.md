# Actor Relator

Actor Relator let user search either actor or movie based on the wikipedia search term. Once you search the keyword, and if that keyword is in the correct format of actor or movie, it grabs data of related actors or movies, and visualize into network graph. You can limit search nodes by providing limit number.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
docker
node
```

### Installing


We are using react for client side, node.js for server side.

Everything is worked by javascript, only node is required to run this project

1. Find decent directory to clone

2. Clone the git project
```
https://github.com/jw3329/actor-relator.git
```
3. Change directory to actor-relator
```
cd actor-relator
```
4. Install npm packages, you need to install npm packages in /client and /server
```
npm install
cd server
npm install
cd ../client 
npm install
```
5. There are 2 ways you can run this project:
    1. Using docker to run
    
        To run using docker, you can use Makefile to easily start or stop docker.
        ```
        make
        ``` 
        This will build the project, and run.
        ```
        make stop
        ```
        This will stop your docker container, it will not be removed.
        ```
        make start
        ```
        This will start your docker container, which was previously stopped.
        ```
        make clean
        ```
        This will remove your current docker container.

    2. Using npm to run

        You can open 2 terminals, one for client side, one for server side. In your project home directory, execute this command
        ```
        npm run client
        ```
        This will open react client side. 
        ```
        npm run server
        ```
        This will execute server side.
        
        If you are currently in dev mode, you can run nodemon for development.
        ```
        npm run server-dev
        ```
        If you don't want to open two terminals, you can try concurrently module.
        ```
        npm run dev
        ```
        This will run both client side and server side, running nodemon on server side instead of node.

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [React](https://reactjs.org/) - The client framework used
* [Express.js](https://expressjs.com/) - Express engine used in Node.js
* [Node.js](https://nodejs.org/en/) - Used for package management

## Authors

* **Junwon Jung** - *Initial work* - [jw3329](https://github.com/jw3329)