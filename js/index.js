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
	ctx_canvas.font="500 "+font_size+"px "+font_family;  //font weight 500, since canvas renders thicker fonts
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
		<td><a href="#">
			 <div style= "background-image: -webkit-linear-gradient(-45deg, ${bgColor} 70%, ${txtColor} 70%);" class="canvas-color${added_class}" data-txtColor="${txtColor}" data-bgColor="${bgColor}"></div>
		</a></td>
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

	$('#fb_share').on('click', function(){
		var canvas = document.getElementById('canvas');

		// Draw the image on canvas
		// Set canvas size
		scale_factor = 3;
		canvas.height = scale_factor*$('.story-wrap').height();
		canvas.width = scale_factor*$('.story-wrap').width();
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
					ctx.scale(scale_factor, scale_factor);
					// Color the canvas
					ctx.fillStyle = $(".story").css("background-color");
					console.log(canvas.width, canvas.height);
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					// Draw the cactus
					var cactus_img = new Image();
          cactus_img.src = "./img/cactus-mini.png";
          // Make sure the image is loaded first otherwise nothing will draw.

          cactus_img.onload = function(){
						x_img = (canvas.width-scale_factor*cactus_img.width)/2; //In center
						y_img = canvas.height-scale_factor*cactus_img.height - scale_factor*4; //At the bottom and elevate a bit
						x_img /= scale_factor;
						y_img /= scale_factor;
            ctx.drawImage(cactus_img, x_img, y_img);
					}
					//Draw the text
					var txt= $('.headline').text();
					var canvas_font_size = 30;
					var max_width = $(".story").css("width"); //e.g. "300px"
					max_width =  Number(max_width.substring(0, max_width.length - 2));
					var canvas_font_family = "Gaegu";
					var lineheight = 1.15 * canvas_font_size;
					lines = text2lines(txt, ctx, canvas_font_size, canvas_font_family, max_width);
					ctx.font="500 " + canvas_font_size+"px "+canvas_font_family; //font weight 500, since canvas renders thicker fonts
					ctx.fillStyle = $(".story").css("color");
					for (var i = 0; i<lines.length; i++){
						current_linewidth = ctx.measureText(lines[i]).width;
						x_txt =  (max_width - current_linewidth)/2; //for centering
						y_txt =  10 + canvas_font_size + (i*lineheight);
						ctx.fillText(lines[i], x_txt, y_txt);
					}
				}
			// Post image on facebook
			FB.login((response) => {
			  if (response.status === 'connected') {
			      console.log('We are connected.');
			      upload(response);
			    } else if (response.status === 'not_authorized') {
			      console.log('Not authorized.');
			    } else {
			      console.log("Didn't manage to login.");
			    }
			},{ scope: 'publish_actions,manage_pages, publish_pages'})
	});

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

// initialize and setup facebook js sdk
window.fbAsyncInit = function() {
    FB.init({
      appId      : '1616038958474519',
      xfbml      : true,
      version    : 'v2.5'
    });
};
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Convert image data to blob
const dataURItoBlob = (dataURI) => {
  let byteString = atob(dataURI.split(',')[1]);
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {
      type: 'image/jpeg'
  });
}

// Upload picture on facebook  group

const upload = async (response) => {
  let canvas = document.getElementById('canvas');
  let dataURL = canvas.toDataURL('image/jpeg', 1.0);
  let blob = dataURItoBlob(dataURL);
  let formData = new FormData();
  formData.append('access_token', response.authResponse.accessToken);
  formData.append('source', blob);
  pageid = 383691685367852; // Choose the facebook page id
  // Show to user that is uploading
  $('#fb_share').html('<i class="fa fa-circle-o-notch fa-spin"></i> Sharing');
  let responseFB = await fetch('https://graph.facebook.com/'+pageid+'/photos', {
      body: formData,
      method:'post'
  });
  responseFB = await responseFB.json();
  console.log(responseFB);
};
