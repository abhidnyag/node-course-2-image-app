var socket = io();

function scrollToBottom() {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
 
    if(clientHeight + scrollTop +newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
 };

 socket.on('connect', function (){
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err){
     if(err){
         alert(err);
       window.location.href = '/';
     }else{
       console.log('No error');
     }
    });
  });
  
  socket.on('disconnect', function (){
      console.log('Disconnected from server');
  });
  
  
 
