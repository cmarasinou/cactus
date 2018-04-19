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

// Split the text into lines for the canvas drawing
function text2lines(txt, ctx_canvas, font_size, font_family, max_width){
	ctx_canvas.font=font_size+"px "+font_family;
	words = txt.split(" ");
	current_txt = "";
	previous_txt = "";
	txt_in_lines = [];//An empty array
	n_words = words.length;
	for (var i = 0; i < n_words; i++) {
		current_txt += words[i] + " ";
		if (ctx_canvas.measureText(current_txt).width >= max_width) {
			txt_in_lines.push(previous_txt);//Add new line in array
			current_txt = words[i];
			previous_txt = current_txt;
		}
		previous_txt = current_txt;
	}
	if (ctx_canvas.measureText(current_txt).width >= 0){
		txt_in_lines.push(current_txt); //Add the final line in array
	}
	return txt_in_lines;
}


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
					var txt="Na kateveneis mes ton psofo gia na paeis supermarket, na prp na diastaurwseis fwta pou en svista, na pieneis ws jiame j nan kleisto logw power outage epeidi fisa kai meta na perimeneis ksana mesa ston psofo gia to epomeno bus.";
					var canvas_font_size = 30;
					var max_width = 300;
					var canvas_font_family = "Gaegu";
					var lineheight = canvas_font_size;
					lines = text2lines(txt, ctx, canvas_font_size, canvas_font_family, max_width);
					ctx.font=canvas_font_size+"px "+canvas_font_family;
					ctx.fillStyle = "red";
					for (var i = 0; i<lines.length; i++){
						current_linewidth = ctx.measureText(lines[i]).width;
						x_txt =  (max_width - current_linewidth)/2; //for centering
						y_txt =  canvas_font_size + (i*lineheight);
						ctx.fillText(lines[i], x_txt, y_txt);
					}
					console.log(lines)
				}
	});

	$('.closebox').on('click', function(){
		$('.lightbox').css("display","none");
	});

});



//!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');






//var node = document.getElementById('mycanvas');

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
