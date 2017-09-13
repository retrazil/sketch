$(document).ready(function(){  
    
    grid(10);

    // change opacity on hover
    $('#container').on('mouseenter', '.block' , darker);
    
    // clear grid
    $('#clear').click(function(){
        $('#container').off(); // unbind all event handlers first 
        $('#container').on('mouseenter', '.block' , darker); // add a new one
        clear();
    });

    // resize 
    $('#resize').click(function(){
        clear();
        $('#container').off(); // unbind all event handlers first 
        $('#container').on('mouseenter', '.block' , darker); // add a new one
        var blocksPerSide = parseInt(prompt("Input will be rendered as Input x Input size grid. \n Max value is 100."));
        
        // defense / problem handling 
        if(isNaN(blocksPerSide))
            {
                clear();
                return; 
            }    
        else if(blocksPerSide > 100){
            blocksPerSide = 100;
            prompt("Entered input greater than 100. Rounding it to 100.");
        }
        else if (blocksPerSide <= 0)
            {
                blocksPerSide = 10;
                prompt("Entered 0 or negative as input. Defaulting to 10.");
            }
        console.log('blocks per side', blocksPerSide);
        grid(blocksPerSide);
    });

    // rainbow color
    $('#rainbow').click(function(){
        $('#container').off(); // unbind all event handlers first
        clear(); // clean the grid 
        $('.block').css('opacity', 1); // make all blocks opaque
        $('.block').css('background', 'white'); // set background to white
        $('#container').on('mouseenter', '.block', function(){ 
            $(this).css('background', rainbowColor());});
    });

    // random color
    $('#random').click(function(){  
        $('#container').off(); // unbind all event handlers first 
        clear();  
        var randomColor = rainbowColor();
        console.log('random color is', randomColor);
        $(this).css('background', randomColor); // set button to random color
        $('.block').css('background', randomColor); // set block to same colors
        $('#container').on('mouseenter', '.block', darker);
    });
});

// only change dimensions of blocks 
// without adding new elements
// should be called only after grid is in place
function setGridDim(blocksPerSide)
{
    // calculate block dimensions
    var containerWidth = parseFloat($('#container').css('width')); 
    var blockLength = containerWidth / blocksPerSide;
    console.log('blockLength', blockLength);

    // set block dimensions 
    $('.block').css('height', blockLength);
    $('.block').css('width', blockLength);

    // height of row
    $('.row').css('height', blockLength);
}

// draw grid
function grid(blocksPerSide)
{  
    // empty the container before use 
    $('#container').empty(); 

    var rows = blocksPerSide;
    var blocksPerRow = blocksPerSide;

    // add rows
    for(var i = 0; i < rows; i++)
        {
            $('#container').append("<div class='row'></div");
        }
    
    // fill the rows with elements
    $('.row').each(function(){
        for(var j = 0; j < blocksPerRow; j++)
            {	      	
                $(this).append("<div class='block'></div>");
            }    	
    });

    setGridDim(blocksPerSide);
}

// clear grid
function clear()
{
    $('.block').css('opacity', 0);
    $('.block').css('background', ''); // default to background in css stylesheet 
    $('#random').css('background', ''); // default to original background 
}

// make the element darker with each hover pass
// event handler for hover
// this binds to calling element
function darker()
{
    $(this).css('opacity', function(){
        var opacity = parseFloat($(this).css('opacity'));

        if(opacity >= 1)
            return opacity
        else
            return opacity + 0.15; 
        
    });
}

// produce random colors 
function rainbowColor()
{
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var rgb = 'rgb(' + r + ',' + g + ',' + b + ')'; 
    return rgb; 
}
