$( document ).ready( readyNow );

let equation = {
    num0: null,
    num1: null,
    operation: null
} // end equation

function clearClick(){
    console.log( 'in clearClick');
    equation.num0 = null;
    equation.num1 = null;
    equation.operation = null;
    $( '#num0In' ).val('');
    $( '#num1In' ).val('');
} // end clearClick

function equalsClick(){
    console.log( 'in equalsClick' );
    // set equation num1
    equation.num1 = $( '#num1In' ).val();
    // send equation to server
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: equation
    }).then( function( response ){
        console.log( 'back from POST with:', response );
        // display answer
        let el = $( '#answerOut' );
        el.empty();
        el.append(`
            ${ equation.num0 } ${ equation.operation } ${ equation.num1 } 
            = ${ response.answer }
        `);
        historyNow();
    }) // end ajax
} // equalsClick

function historyNow(){
    // request history
    $.ajax({
        method: 'GET',
        url: '/calculate'
    }).then( function( response ){
        console.log( 'back from GET with:', response );
        // display history
        let el = $( '#historyOut' );
        el.empty();
        // loop through response array
        for( const historicalEquationThing of response ) {
            // display an li for each 
            el.append(`<li>
                ${ historicalEquationThing.num0 } 
                ${ historicalEquationThing.operation }
                ${ historicalEquationThing.num1 }
            </li>`); //end append
        } // end for
    }) //  end $http
} // historyNow

function operationClick(){
    // get text of clicked button with this class
    let selectedOperation = $( this ).text();
    console.log( 'operationClick:', selectedOperation );
    // set equation operation
    equation.operation = selectedOperation
    // set equation num0
    equation.num0 = $( '#num0In' ).val();
    console.log( equation );
} // operationClick

function readyNow(){
    console.log( 'in readyNow' );
    $( '#clearButton').on( 'click', clearClick );
    $( '#equalsButton' ).on( 'click', equalsClick ); 
    $( '.operationButton' ).on( 'click', operationClick );
    // init
    historyNow();
} // end readyNow   