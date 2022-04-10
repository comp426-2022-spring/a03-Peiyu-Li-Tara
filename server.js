/** Coin flip functions 
 * This module will emulate a coin flip given various conditions as parameters as defined below
 */

/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

function coinFlip() {
let status = Math.round(Math.random())
if (status == 1) return "heads"
return "tails"
}

/** Multiple coin flips
 * 
 * Write a function that accepts one parameter (number of flips) and returns an array of 
 * resulting "heads" or "tails".
 * 
 * @param {number} flips 
 * @returns {string[]} results
 * 
 * example: coinFlips(10)
 * returns:
 *  [
	'heads', 'heads',
	'heads', 'tails',
	'heads', 'tails',
	'tails', 'heads',
	'tails', 'heads'
	]
*/

function coinFlips(flips) {
const result = []
for (let i = 0; i < flips; i ++){
	result[i] = coinFlip()
}
return result
}

/** Count multiple flips
 * 
 * Write a function that accepts an array consisting of "heads" or "tails" 
 * (e.g. the results of your `coinFlips()` function) and counts each, returning 
 * an object containing the number of each.
 * 
 * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
 * { tails: 5, heads: 5 }
 * 
 * @param {string[]} array 
 * @returns {{ heads: number, tails: number }}
 */

function countFlips(array) {
let numHeads = 0;
let numTails = 0;
for (let i = 0; i < array.length; i ++){
	if (array[i] == "heads") numHeads ++;
	if (array[i] == "tails") numTails ++;
}
return {heads: numHeads, tails: numTails}
}

/** Flip a coin!
 * 
 * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
 * 
 * @param {string} call 
 * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
 * 
 * example: flipACoin('tails')
 * returns: { call: 'tails', flip: 'heads', result: 'lose' }
 */

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
console.log(flips)
console.log(summary)
}

const express = require('express');
const app = express()

// const arg = require('minimist').split(2)
const args = require('minimist')(process.argv.slice(2))
const port = args['port'] || 5000

// Start an app server
const server = app.listen(5000, () => {
    console.log('App listening on port %port%'.replace('%port%',port))
});

app.get('/app', (req, res) => {
	res.status(200).end('OK')
	res.type('text/plain')
    // // Respond with status 200
    // res.statusCode = 200;
    // // Respond with status message "OK"
    // res.statusMessage = 'OK';
    // res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    // res.end(res.statusCode+ ' ' +res.statusMessage)
}); 

app.get('/app/echo/:number', (req, res) => {
	res.status(200).json({'message': req.params.number})
})

app.get('/app/flip', (req, res) => {
	var flip = coinFlip()
	res.status(200).json({ 'flip': flip })
});

app.get('/app/flips/:number', (req, res) => {
	const flips = manyflips(req.params.number)
	//Other
	//expressions
	//go
	//here
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});