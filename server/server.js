// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
// uses
app.use( express.static( './server/public' ) );
// globals
const port = 5000;
// spin up server
app.listen( port, ()=>{
    console.log( 'server is up on:', port );
}) // end server up
// routes
app.get( '/calculate', ( req, res )=>{
    console.log( '/calculate GET hit' );
    res.send( 'meow' );
}); // end GET

app.post( '/calculate', ( req, res )=>{
    console.log( '/calculate POST hit:', req.body );
    res.send( 'ribbet' );
}); // end POST
