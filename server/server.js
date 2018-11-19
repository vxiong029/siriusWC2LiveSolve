// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
// uses
app.use( express.static( './server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
// globals
const port = process.env.PORT || 5000;
let history = [];
// spin up server
app.listen( port, ()=>{
    console.log( 'server is up on:', port );
}) // end server up
// routes
app.get( '/calculate', ( req, res )=>{
    console.log( '/calculate GET hit' );
    res.send( history );
}); // end GET

app.post( '/calculate', ( req, res )=>{
    console.log( '/calculate POST hit:', req.body );
    history.push( req.body );
    let answer = 0;
    if( req.body.operation === '-'){
        answer = Number( req.body.num0 ) - Number( req.body.num1 );
    }
    else if( req.body.operation === '*'){
        answer = Number( req.body.num0 ) * Number( req.body.num1 );
    }
    else if( req.body.operation === '/'){
        answer = Number( req.body.num0 ) / Number( req.body.num1 );
    }
    else {
        answer = Number( req.body.num0 ) + Number( req.body.num1 );
    }
    res.send( { answer: answer } );
}); // end POST






