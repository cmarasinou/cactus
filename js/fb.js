// initialize and setup facebook js sdk
window.fbAsyncInit = function() {
    FB.init({
      appId      : '622479971448005',
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
