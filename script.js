$(document).ready(function(){  
  
  grid(10);

  // VOLATILE
  // change opacity on hover
  $('#container').on('mouseenter', '.block' , function(){
    // console.log('this in hover is', this);
    $(this).css('opacity', function(){
      var opacity = parseFloat($(this).css('opacity'));

      if(opacity >= 1)
        return opacity
      else
        return opacity + 0.10; 
    });  
  });
    
  // clear grid
  $('#clear').click(function(){
    clear();
  });

  // resize 
  $('#resize').click(function(){
    clear();
    var blocksPerSide = parseInt(prompt("Input will be rendered as Input x Input size grid"));
    console.log('blocks per side', blocksPerSide);
    grid(blocksPerSide);
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
  // 'this' binds to calling environment
  $('.block').each(function(){
    $(this).css('opacity', 0);
  });

}
