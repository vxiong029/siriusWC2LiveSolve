$( document ).ready( readyNow );

let equation = {
    num0: null,
    num1: null,
    operation: null
} // end equation

function clearClick(){
    console.log( 'in clearClick');
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
        // request history
        // display history
    }) // end ajax
} // equalsClick

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
} // end readyNow   