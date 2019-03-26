# Burndown Chart Application

Burndown Chart application with Parse Server backend and React frontend.

Built on [Parse Server Example](https://github.com/parse-community/parse-server-example)

### For Local Development

* Make sure you have at least Node 4.3. `node --version`
* Clone this repo and change directory to it.
* `yarn install`
* Install mongo locally using http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/
* Run `mongo` to connect to your database, just to make sure it's working. Once you see a mongo prompt, exit with Control-D
* Run the server with: `yarn parse`
* By default it will use a path of /parse for the API routes.
* You now have a database named "parse" that contains your Parse data
* Install ngrok and you can test with devices
* Run `heroku local web` to test the prod build of the React app on your local environment

### Getting Started With Heroku + mLab Development

* Clone the repo and change directory to it
* Log in with the [Heroku Toolbelt](https://toolbelt.heroku.com/) and create an app: `heroku create`
* Use the [mLab addon](https://elements.heroku.com/addons/mongolab): `heroku addons:create mongolab:sandbox --app YourAppName`
* Add your env variables in the heroku admin panel (`APP_ID`, `MASTER_KEY`, `MONGODB_URI`, `PARSE_MOUNT`, `SERVER_URL`, `REACT_APP_SERVER_URL`)
* Deploy it with: `git push heroku master`
