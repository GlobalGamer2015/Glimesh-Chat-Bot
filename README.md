# Open-Source Glimesh Chat Bot

I recommend using [this](https://github.com/GlobalGamer2015/Glimesh-Chat-Lib) package with your Glimesh Chat Bot.

Connect to a specific Glimesh Streamer Channel.

Features:
* Refreshes Token automatically.
* Chat Bot

## Usage

This requires you to setup OAuth to use it correctly.
I recommend you to go here to learn how to [setup OAuth](https://github.com/Glimesh/api-docs/blob/master/Topics/OAuth/AccessToken/generalInfo.MD).

Check [Server.js](https://github.com/GlobalGamer2015/Glimesh-Chat-Bot/blob/main/server.js), everything inside is documented.

### First Time Usage

I recommend [Postman](https://www.postman.com/) desktop application.
After you get your code and use it to get your first time Auth Code, you should get a response similar to the following.

```JS
{"access_token":"abcde12345","refresh_token":"abcde12345","scope":"public email chat","created_at":"2021-01-01T01:01:01","expires_in":21600,"token_type":"bearer"}
```

Paste the corresponding values into the Glimesh.json.

### Install

Run this command to install packages.
```
npm install
```

Run this command to start the bot.
```
nodemon
```

### Credits

* [Glimesh](https://www.glimesh.tv)
* [aMytho](https://github.com/Glimesh/api-docs)
* [CactusDev](https://github.com/CactusDev/glimesh-chat)
