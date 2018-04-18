$('#fancy-text').keyup(
		function(){
			var value = $(this).val();
			$('.headline').text(value);
		}
	);

$('form').submit(function(e){
		e.preventDefault;
    return false;
});

$(document).ready(function(){

	$('button').on('click', function(){
		html2canvas($(".mag"),{
        onrendered: function(canvas) {
          var myImage = canvas.toDataURL("image/png");
					$('.lightbox').fadeIn(200);
					$('.image').attr('src', myImage).fadeIn(200);
        }
    });
	});

	$('.closebox').on('click', function(){
		$('.lightbox').css("display","none");
	});

});



!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');






var node = document.getElementById('mycanvas');

/*domtoimage.toPng(node)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });*/

/*domtoimage.toJpeg(document.getElementById('mycanvas'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });*/
