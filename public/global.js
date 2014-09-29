$(document).ready(function(){
	

	$.getJSON('/getMessages', function(data){
		var current;
		$.each(data, function(){
			current = '<p class="messageBody">'+this.message+'</p>'
			$('#messageList').prepend(current);
		});
	});

	$('button#submitButton').on('click', addMessage);
});

function addMessage(){

	//error checking
	var noError = true;
	if($('input#nameArea').val() === ''){
		$('input#nameArea').append('<p style="font-size:11px;color:red">name missing</p>')
		noError = false;
	}
	if($('textArea#messageArea').val() === ''){
		$('textArea#messageArea').append('<p style="font-size:11px;color:red">message missing</p>')
		noError = false;
	}

	//Post to server if no error
	if(noError){
		var currentMessage = 'Name: ';
		currentMessage += $('input#nameArea').val();
		currentMessage += '<br><br>';
		currentMessage += $('textArea#messageArea').val();

		var postData = {message:currentMessage};

		$.ajax({
			type:'POST',
			data:postData,
			url:'/addMessage',
			dataType:'JSON'
		}).done(function(response){
			if(response.msg === 'success'){
				$('#messageList').prepend('<p class="messageBody">'+ currentMessage +'</p>');
			}
			else{
				alert(response.msg);
			}
		})

	}



}
