var empDataArray = [];
$("#empFormSubmit").click(() => {
  var fName = $("#fName").val();
  var lName = $("#lName").val();
  var email = $("#email").val();
  var pwd = $("#pwd").val();
  if (fName === "" || lName === "" || email === "" || pwd === "") {
    errorOnSubmit("All fields are required!");
  } else if (!validateEmail(email)) {
    errorOnSubmit("Incorrect email format!");
  } else if (pwd.length < 6) {
    errorOnSubmit("Password must be at least 6 characters long!");
  } else if (!isEmailUnique(email)) {
    errorOnSubmit("Email already exists!");
  } else {
    submitData(fName, lName, email, pwd);
  }
});

function validateEmail(email) {
  var emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailValidation.test(email);
}

function isEmailUnique(email) {
  return !empDataArray.some((emp) => emp.email === email);
}

function submitData(fName, lName, email, pwd) {
    var empData = {
    fName: fName,
    lName: lName,
    email: email,
    pwd: pwd
  };

  empDataArray.push(empData);
  console.log(empDataArray);


  Swal.fire({
    title: "Employee Data has been stored",
    text: "You clicked the button!",
    icon: "success"
  });

  tableRender();
}

function errorOnSubmit(message) {
  Swal.fire({
    icon: "error",
    title: "Validation Error",
    text: message,
    footer: '<a href="#">Why do I have this issue?</a>'
  });
}

function tableRender() {
  var empHtmlString = "";
  empDataArray.forEach(function (a, index) {
    // Encrypt password
    var secret = "blackdog@#$";
    var password = a.pwd; 
debugger

    var enc = CryptoJS.AES.encrypt(password, secret).toString(); 
    alert(enc);

    var bytes = CryptoJS.AES.decrypt(enc, secret); 
    alert(bytes.toString(CryptoJS.enc.Utf8));



    empHtmlString += "<tr>";
    empHtmlString += "<td>" + (index + 1) + "</td>";
    empHtmlString += "<td>" + a.fName + "</td>";
    empHtmlString += "<td>" + a.lName + "</td>";
    empHtmlString += "<td>" + a.email + "</td>";
    empHtmlString += "<td>" + enc + "</td>"; 
    empHtmlString += "<td><button class='fa fa-trash-o btn btn-danger btn-sm delete-btn' data-index='" + index + "'></button></td>";
    empHtmlString += "</tr>";
  });

  $("#empDataTable").html(empHtmlString);

  $("body").on("click", ".delete-btn", function () {
    var index = $(this).data("index");
    dataDeleted(index);
  });
}

function dataDeleted(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      empDataArray.splice(index, 1);
      tableRender();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}

function clearField() {
  $("#fName").val("");
  $("#lName").val("");
  $("#email").val("");
  $("#pwd").val("");
}
