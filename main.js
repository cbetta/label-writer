$(function(){
  var label;

  printers = dymo.label.framework.getPrinters();
  dropdown = $('#printers');
  $.each(printers, function(index, printer){
    dropdown.append($("<option />").val(printer.name).text(printer.modelName));
  });

  $.get('/label.xml', function(data) {
    label = dymo.label.framework.openLabelXml(data);
    updatePreview();
  }, 'html');

  var updatePreview = function() {
    label.setObjectText("Line1", $('#line1').val());
    label.setObjectText("Line2", $('#line2').val());
    label.setObjectText("Line3", $('#line3').val());

    $('#preview').attr('src', 'data:image/png;base64,'+label.render());
  }

  var printLabel = function() {
    label.print($('#printers').val());
  };

  $('#button').click(printLabel);
  $('#line1, #line2, #line3').on('input', updatePreview);

});
