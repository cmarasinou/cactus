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
		/*html2canvas($(".mag-wrap"),{
				//allowTaint: true,
				//logging: true,
				//taintTest: false,
        onrendered: function(canvas) {
          var myImage = canvas.toDataURL("image/png");
					$('.lightbox').fadeIn(200);
					$('.image').attr('src', myImage).fadeIn(200);
        }
    });*/

		var canvas = document.getElementById('canvas');
		var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
					// Color the canvas
					ctx.fillStyle = "blue";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					// Draw the cactus
					var cactus_img = new Image();
          cactus_img.src = "./img/cactus-mini.png";
          // Make sure the image is loaded first otherwise nothing will draw.
          cactus_img.onload = function(){
            ctx.drawImage(cactus_img,canvas.width-cactus_img.width,canvas.height-cactus_img.height);
					}
				}
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
