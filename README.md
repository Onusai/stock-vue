# Stock Vue
Watchlist tool for day trading stocks. 

## How to run program

To use this program, start the server in a terminal. It will host a web app that you can access in your browser.

The server has only been tested to run on Ubuntu and on Windows using Ubuntu WSL

### Setup / Build the project

Download or clone this repo and open the project folder in an Ubuntu terminal or Ubuntu WSL on Windows.

Install [Node.js / NPM](https://github.com/nodesource/distributions/blob/master/README.md), and [Vue CLI](https://cli.vuejs.org/) in your ubuntu environment.

Setup envirnoment variables by renaming the `.env_sample` file to `.env`. You can optionally edit the file to change settings, but the defaults are fine.

#### Install client packages and build client files:
```
cd client/
sudo npm i -y
npm run build
```

#### Install server packages
```
cd server/
sudo npm i -y
```


## Running the app

```
cd server/
npm run serve
```

Or you can run one of the start scripts: `server/start.sh` or `server/start.bat`

### Access web app in browser
By default, the app will be hosted on http://localhost:8080

You can change the port by editing the `.env` file.