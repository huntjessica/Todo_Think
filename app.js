
$(document).ready(function() {

// Droppable for Items */
  
  $('#sortable').sortable({
    connectWith: '#trash'
  }).disableSelection();
  
  $('#trash').droppable({
    accept: '#sortable li',
    hoverClass: "ui-state-hover",
    drop: function(event, ui){
      ui.draggable.remove();
    }   
  });
  

  

/*Checkbox Strikethrough Item Text */
  $('input.check').change(function(){
    $(this).siblings('.item').toggleClass('strike');
    
  });
  
/* Removing Checked Items */
  $('form#remove-check').submit(function(event){    
    event.preventDefault();
    $('ul#sortable li').each(function(){      
      if($(this).find('.item').hasClass('strike')){
        $(this).remove();
      }
    });
  });
  

/* Text editing with double-click */

  $('span.item').dblclick(function(){   
    $(this).hide().after('<textarea class="edit" maxlength="140"></textarea>');
    $('textarea.edit').focus();
    
    /* handles pressing enter in text area */
    $('textarea.edit').keypress(function(event){
      if(event.which == 13){
        event.preventDefault();
        $('span.item').show();
        
        /* this tests if no text or whitespace was entered */
        if(!$.trim($(this).val())){     
          $('textarea.edit').remove();        
        } else {          
          $(this).siblings('span').html($(this).val());
          $('textarea.edit').remove();
        }
      }     
    });
    
    /* handles clicking outside text area */
    $(document).click(function(event){
      $('span.item').show();
      
      /* this tests if no text or whitespace was entered */
      if(!$.trim($('textarea.edit').val())){      
        $('textarea.edit').remove();        
      } else {          
        $('textarea.edit').siblings('span').html($('textarea.edit').val());
        $('textarea.edit').remove();
      }
      
    });
    
   
    $('textarea.edit').keyup(function(event){     
      $(this).height($(this).prop('scrollHeight'));     
      if(event.which == 27){
        event.preventDefault();
        $('span.item').show();
        $('textarea.edit').remove();      
      }
    });
    
  });
  
  
  
/* Adding Items */
  $('input#add').keypress(function(event){
    
    if(event.which == 13){
      event.preventDefault();
      
      /* this tests if no text or whitespace was entered */
      if(!$.trim($(this).val())){
        $('input#add').val('Item');
      }
      
      $('li#base').clone(true).appendTo('#sortable').removeAttr('id').removeClass('hidden');
      $('ul#sortable>li:last>form>span').text($('input#add').val());
      $('input#add').val("");

      var doc_height = $(document).height();
      var win_height = $(window).height();
      
      if(doc_height > win_height){        
        $('div#container').css('height', 'auto');
      }     
    }
  });
});