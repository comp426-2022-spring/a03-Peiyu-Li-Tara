function coinFlip() {
let status = Math.round(Math.random())
if (status == 1) return "heads"
return "tails"
}

function coinFlips(flips) {
const result = []
for (let i = 0; i < flips; i ++){
	result[i] = coinFlip()
}
return result
}

function countFlips(array) {
let numHeads = 0;
let numTails = 0;
for (let i = 0; i < array.length; i ++){
	if (array[i] == "heads") numHeads ++;
	if (array[i] == "tails") numTails ++;
}
return {heads: numHeads, tails: numTails}
}

function flipACoin(call) {
let flip = coinFlip()
let result
if (flip == call) result = "win"
else result = 'lose' 
return {call: call, flip: flip, result: result}
}

function flipManyCoins(num){
let flips, summary
if (num != null)
	flips = coinFlips(num)
else
	flips = coinFlips(1) 
summary = countFlips(flips)
return {flips: flips, summary: summary}
}


const express = require('express');
const app = express()

// const arg = require('minimist').split(2)
const args = require('minimist')(process.argv.slice(2))
var port = args['port'] || process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log('App listening on port %port%'.replace('%port%',port))
});

app.get('/app', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
}); 

app.get('/app/flip', (req, res) => {
	var flip = coinFlip()
	res.status(200).json({ 'flip': flip })
});

app.get('/app/flips/:number', (req, res) => {
	const flips = flipManyCoins(req.params.number)
	res.status(200).json({'raw': flips.flips, "summary": flips.summary})
});

app.get('/app/flip/call/heads', (req, res) => {
	const flip = flipACoin("heads")
	res.status(200).json({'call': 'heads', 'flip': flip.flip, 'result': flip.result})
});

app.get('/app/flip/call/tails', (req, res) => {
	const flip = flipACoin("tails")
	res.status(200).json({'call': 'tails', 'flip': flip.flip, 'result': flip.result})
});

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});