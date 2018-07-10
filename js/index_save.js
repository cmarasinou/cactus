//Updating the text
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
	words = txt.split(" ");
	current_txt = "";
	previous_txt = "";
	txt_in_lines = [];//An empty array
	n_words = words.length;
	for (var i = 0; i < n_words; i++) {
		current_txt += words[i] + " ";
		if (ctx_canvas.measureText(current_txt).width >= max_width) {
			txt_in_lines.push(previous_txt);//Add new line in array
			current_txt = words[i]+ " ";
			previous_txt = current_txt;
		}
		previous_txt = current_txt;
	}
	if (ctx_canvas.measureText(current_txt).width >= 0){
		txt_in_lines.push(current_txt); //Add the final line in array
	}
	return txt_in_lines;
}

// Download the Canvas
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL("image/jpeg");

    link.download = filename;
}


var canvas_width = 2380;
var canvas_font_size = 150;
//Set img size
var img_height = 500;
$(document).ready(function(){
// All the color templates,
// For each background color foreground found using http://contrast-finder.tanaguru.com/
// For good contrast
	var colors_array = new Array();
	colors_array.push(["#ff1744", "#020403"]); // [bgcolor,txtColor]
	colors_array.push(["#f50057", "#040201"]);
	colors_array.push(["#d500f9", "#020304"]);
	colors_array.push(["#651fff", "#FFFFED"]);
	colors_array.push(["#3d5afe", "#fffff3"]);
	colors_array.push(["#2979ff", "#000300"]);
	colors_array.push(["#00b0ff", "#1A414F"]);
	colors_array.push(["#00e5ff", "#4F404C"]);
	colors_array.push(["#1de9b6", "#4F404C"]);
	colors_array.push(["#00e676", "#2A454F"]);
	colors_array.push(["#76ff03", "#000000"]);
	colors_array.push(["#c6ff00", "#555768"]);
	colors_array.push(["#ffea00", "#0500FE"]);
	colors_array.push(["#ffc400", "#31454F"]);
	colors_array.push(["#ffff00", "#000000"]);
//Show the colors
	table_html ='';
	// Choose the color which will be active Randomly
	n_active = Math.floor(Math.random() * (colors_array.length-1));
	for (var i = 0; i < colors_array.length; i++) {
		bgColor = colors_array[i][0];
		txtColor = colors_array[i][1];
		added_class = "";
		if (i ===  n_active){
			added_class = " active";
		}
		table_html +=`
		<li>
			 <div style= "background-image: -webkit-linear-gradient(-45deg, ${bgColor} 70%, ${txtColor} 70%);" class="canvas-color${added_class}" data-txtColor="${txtColor}" data-bgColor="${bgColor}"></div>
		</li>
		`;
		// Paint the div with the active colors_array
		bgColor = colors_array[n_active][0];
		txtColor = colors_array[n_active][1];
		$(".story").css({"background-color": bgColor, "color": txtColor});
	}

	$('.color-row').html(table_html);

/////////////////////////////////////
// Create Image
////////////////////////////////////

	$('#save-image').on('click', function(){
		var canvas = document.getElementById('canvas');

		// Draw the image on canvas
		// Set canvas size
		var lineheight = 1.15 * canvas_font_size;
		padding = 50;
		scale_factor = 5;
		canvas.width = canvas_width;
        if (canvas.getContext) {
					var cactus_img = new Image();
          cactus_img.src = "./img/cactus-mini.png";
          // Make sure the image is loaded first otherwise nothing will draw.
          cactus_img.onload = function(){

						var ctx = canvas.getContext('2d');
						//Load text, split in lines, find height of it
						var txt= $('.headline').text();
						var max_width = canvas_width - 100; //e.g. "300px"
						var canvas_font_family = "Gaegu";
						ctx.font="600 " + canvas_font_size+"px "+canvas_font_family; //font weight 600, since canvas renders thicker fonts
						lines = text2lines(txt, ctx, canvas_font_size, canvas_font_family, max_width);
						txt_height = lineheight*lines.length;
						//Set canvas height
						canvas.height = txt_height +  img_height + 4*padding; //Where 100 is space between the two
						// Color the canvas
						ctx.fillStyle = $(".story").css("background-color");
						ctx.fillRect(0, 0, canvas.width, canvas.height);
						// Draw the image

							x_img = (canvas.width-scale_factor*cactus_img.width)/2; //In center
							y_img = canvas.height-scale_factor*cactus_img.height - scale_factor*4; //At the bottom and elevate a bit
	            ctx.drawImage(cactus_img, x_img, y_img, cactus_img.width*img_height/cactus_img.height,  img_height);
						//Draw the text
						ctx.fillStyle = $(".story").css("color");
						ctx.font="600 " + canvas_font_size+"px "+canvas_font_family; //font weight 600, since canvas renders thicker fonts
						for (var i = 0; i<lines.length; i++){
							current_linewidth = ctx.measureText(lines[i]).width;
							x_txt =  (max_width - current_linewidth)/2 + padding; //for centering
							y_txt =  canvas_font_size + (i*lineheight) + padding;
	 						ctx.fillText(lines[i], x_txt, y_txt);
						}
						// Download image
						downloadCanvas(document.getElementById('save-image'), "canvas", "myCactusStory.png");
				}
			}
	});
	document.getElementById('download-image').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'test.png');
}, false);

	// Change the active-color button
	$('.canvas-color').click(function(){
		$('.canvas-color').removeClass("active");
		$(this).addClass("active");
	});

	// Change color theme of canvas
	$('.canvas-color').on('click', function(){
		divbgColor = this.dataset.bgcolor;
		divtxtColor = this.dataset.txtcolor;
		$(".story").css({"background-color": divbgColor, "color": divtxtColor});
	});
});




// Change the size of the text when window is small
flexFont = function () {
		div_width = Number($('.story').css("width").slice(0,-2));
    var relFontsize =div_width*canvas_font_size/canvas_width;
		var relImgsize =div_width*img_height/canvas_width;
    $(".headline").css("fontSize", relFontsize);
		$("#cactus_img").css("max-height", relImgsize);
};

window.onload = function(event) {
    flexFont();
};
window.onresize = function(event) {
    flexFont();
};
