const fs = require('fs')
const fetch = require('node-fetch')
const Glimesh = require("glimesh-chat")
var GlimeshAuthFile = 'Glimesh.json'
var cron = require('node-cron');

var Client_ID = ""; // Your Client ID
var Client_Secret = ""; // Your Client Secret
var Redirect_Uri = "http://localhost:3000/success"; // Redirect URL
var StreamerName = ""; // Streamers Username

// https://github.com/Glimesh/api-docs/blob/master/Topics/OAuth/RefreshToken/refresh.md
// Refreshes Access Token
function RefreshToken() {
	var GlimeshAuthFileData = fs.readFileSync(GlimeshAuthFile) // Reads Glimesh.json
	var GlimeshAuthFileContents = JSON.parse(GlimeshAuthFileData) // Parses Glimesh.json into JSON readable format.
	fetch(`https://glimesh.tv/api/oauth/token?grant_type=refresh_token&refresh_token=${GlimeshAuthFileContents.refresh_token}&redirect_uri=${Redirect_Uri}&client_id=${Client_ID}&client_secret=${Client_Secret}`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
	})
	.then(res => res.json())
	.then(res => {
		console.log(res)
		GlimeshAuthFileContents.access_token = res.access_token // access_token
		GlimeshAuthFileContents.created_at = res.created_at // created_at
		GlimeshAuthFileContents.expires_in = res.expires_in // expires_in
		GlimeshAuthFileContents.refresh_token = res.refresh_token // refresh_token
		GlimeshAuthFileContents.scope = res.scope // scope
		GlimeshAuthFileContents.token_type = res.token_type // token_type
		if(res.error){
			console.log()
		}
		else {
			fs.writeFileSync(GlimeshAuthFile, JSON.stringify(GlimeshAuthFileContents), err => { // Saves to Glimesh.json
				if(err) console.log(err)
				return
			})
		}
		return
	})
}

// Calls RefreshToken Function every 3 hours
cron.schedule('0 0 */3 * * *', () => {
    RefreshToken()
});

var GlimeshAuthFileData = fs.readFileSync(GlimeshAuthFile) // Reads Glimesh.json
var GlimeshAuthFileContents = JSON.parse(GlimeshAuthFileData) // Parses Glimesh.json in to Readable JSON Format Data.
// https://github.com/CactusDev/glimesh-chat
const chat = new Glimesh.GlimeshChat({ clientId: Client_ID, token: GlimeshAuthFileContents.access_token }) // Logs in to Glimesh API. Token is optional, without it you will only be able to read chat.

chat.connect(StreamerName).then(meta => { // Connects to the Streamers channel.
	chat.on("message", msg => {
		var user_id = msg.user.id; // User Id
		var username = msg.user.username; // Username
		var message = msg.message; // Message
		
		console.log(message)
		
		// Call for help.
		if(message == "!help"){
			console.log("You asked for help?")
			chat.sendMessage("You asked for help?")
			return
		}
		// Manaually refresh your token.
		if(username == StreamerName && message == "!refresh"){ // Checks if Username equals Streamers name and if message is equals the command.
			RefreshToken() // Calls RefreshToken Function
			console.log("Test completed")
			chat.sendMessage("Test completed")
			return
		}
	})
})
