$( document ).ready( readyNow );

let equation = {
    num0: '',
    num1: '',
    operation: ''
} // end equation

function clearClick(){
    console.log( 'in clearClick');
    equation.num0 = '';
    equation.num1 = '';
    equation.operation = '';
    $( '#answerOut' ).val('0');
} // end clearClick

function equalsClick(){
    console.log( 'in equalsClick' );
    // NO DIVISION BY ZEEEEEEEEROOOOOOOOO
    if( Number( equation.num1 ) === 0 && equation.operation === '/' ){
        alert( 'NOPE' );
        return;
    } // no /0
    else if( equation.operation === '.' ){
        alert( 'WUT' );
        return;
    } // srsly what even is this?!!?!?!1
    else if( equation.num0 === '' || equation.operation === '' || equation.num1 === ''  ){
        alert( 'All fields needed' );
        return;
    }
    
    // send equation to server
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: equation
    }).then( function( response ){
        console.log( 'back from POST with:', response );
        showEquation();
        let el = $( '#answerOut' );
        el.append(` = ${ response.answer }`);
        historyNow();
        clearClick();
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

function numberClick(){
    let number = $( this ).text();
    console.log( 'numberClick:', number );
    // add number to num0 if no operation chosen
    if( equation.operation === '' ){
        equation.num0 += number;
    } // end no operation
    else{
        equation.num1 += number;
    } // end has operation
    showEquation();
} // end numberClick

function operationClick(){
    // get text of clicked button with this class
    let selectedOperation = $( this ).text();
    console.log( 'operationClick:', selectedOperation );
    // set equation operation
    equation.operation = selectedOperation
    // set equation num0
    showEquation();
} // operationClick

function readyNow(){
    console.log( 'in readyNow' );
    $( '#clearButton').on( 'click', clearClick );
    $( '#equalsButton' ).on( 'click', equalsClick ); 
    $( '.numberButton' ).on( 'click', numberClick );
    $( '.operationButton' ).on( 'click', operationClick );
    // init
    historyNow();
} // end readyNow   

function showEquation(){
    // display answer
    let el = $( '#answerOut' );
    el.empty();
    el.append(`
        ${ equation.num0 } ${ equation.operation } ${ equation.num1 }
    `);
} // showEquation