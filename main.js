import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  function PreviewImageForLabel(input) {
      if (input.files && input.files[0]) {

          var filerdr = new FileReader();
          filerdr.onload = function (e) {
              document.getElementById('hdnSource1').value = e.target.result; //Generated DataURL
              document.getElementById('hdnFileName1').value = input.value.substring((input.value.lastIndexOf("\\")) + 1)
              document.getElementById('txt_ImageSource1').value = "/public" + document.getElementById('hdnFileName1').value;

              UploadFileForLabel();
          }
          filerdr.readAsDataURL(input.files[0]);
      }

  }

  function UploadFileForLabel() {
      $.ajax({
          type: "POST",
          url: "frmlblExpression.aspx/public",  //pageName.aspx/MethodName
          contentType: "application/json;charset=utf-8",
          data: "{'dataURL':'" + document.getElementById('hdnSource1').value + "','fileName':'" + document.getElementById('hdnFileName1').value + "'}", // pass DataURL to code behind
          dataType: "json",
          success: function (data) {

              alert(data.d); // Success function
              $("#btnSelectImage").trigger('click');
          },
          error: function (result) {

              alert(result.d); //Error function

          }
      });

  }
});
