$(function() {
  let scanner = new Instascan.Scanner(
    {
      video: $('#scan_preview')[0],
      refractoryPeriod: 3000,
      scanPeriod: 1
    });
  scanner.addListener('scan', function (content) {
    console.log(content);
    $('#beep')[0].play();
    $('.area_scan_result').append(`${content} \n`);
  });
  Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
      scanner.start(cameras[0]);
    } else {
      console.error('No cameras found.');
    }
  }).catch(function (e) {
    console.error(e);
  });
})

$('.scan_qrcode').on('click', function() {
  $('#scanqr').show();
  $('#genqr').hide();
  $('#grbacode').hide();
})

$('.generate_qrcode').on('click', function() {
  $('#scanqr').hide();
  $('#genqr').show();
  $('#grbacode').hide();
})

$('.generate_barcode').on('click', function() {
  $('#scanqr').hide();
  $('#genqr').hide();
  $('#grbacode').show();
})

$('.gen_barcode').on('submit', function(e) {
  e.preventDefault();
  let val = $('.g_barcode').val();
  JsBarcode("#code128", val);
})

$('.gen_qrcode').on('submit', function(e) {
  e.preventDefault();
  let val = $('.g_qrcode').val();
  $('#qrcode_area_').html('');
  let qrcode = new QRCode($('#qrcode_area_')[0], {
    width: 200,
    height: 200,
    colorDark : "#000000",
    colorLight : "#ffffff",
  });
  qrcode.makeCode(val);
})
