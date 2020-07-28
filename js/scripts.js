// $(document).ready(function () {
//   $(".header__link, .header__btn, .caption__btn, .choice__btn").on("click", function (event) {
//     event.preventDefault();
//     let id = $(this).attr("href"),
//       top = $(id).offset().top - 50;
//     $("body,html").animate({ scrollTop: top }, 500);
//     $(".burger-menu__button").removeClass("is-active");
//     $(".burger-menu").removeClass("is-active");
//     $(".header__nav").removeClass("is-active");
//     $("body").removeClass("is-active");
//     return false;
//   });
//   $(".burger-menu__button").on("click", function () {
//     $(".burger-menu").toggleClass("is-active");
//     $(".header__nav").toggleClass("is-active");
//     $(".header__top").toggleClass("is-active");
//     $("body").toggleClass("is-active");
//   });  
//   $(".btn-close").on("click", function () {
//     $(".burger-menu").removeClass("is-active");
//     $(".header__nav").removeClass("is-active");
//     $(".header__top").removeClass("is-active");
//     $("body").removeClass("is-active");
//   });
  

//   $.extend($.validator.messages, {
//     required: ""
//   });

//   $("#form__footer").validate({
//     rules: {
//       name: {
//         required: true
//       },
//       subjectt: {
//         required: true
//       },
//       email: {
//         required: true,
//         email: true
//       },
//       mes: {
//         required: true
//       }
//     }
//   });

//   $(".submit").one("click", function () {
//     if ($("#form__footer").valid() == true) {
//       $("#form__footer").submit(function (e) {
//         e.preventDefault();
//         var thisForm = $(this);
//         var data = new FormData(thisForm[0]);
//         $.ajax({
//           url: "mail.php",
//           data: data,
//           processData: false,
//           contentType: false,
//           cache: false,
//           type: "POST",
//           success: function () {
//             alert("Message sent!");
//             $("#form__footer")[0].reset();
//           },
//           error: function () {
//             alert("Message not sent!");
//             $("#form__footer")[0].reset();
//           }
//         });
//       });
//     }
//   });
// });

window.addEventListener('DOMContentLoaded', () => {

  // Forms
  const Forms = () => {

    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          textArea = document.querySelectorAll('textarea');

    const message = {
      loading: 'loading...',
      success: 'Message sent!',
      failerwe: 'Message not sent!'
    };

    const postDate = async (url, date) => {
      document.querySelector('.status').textContent = message.loading;
      let res = await fetch(url, {
        method: "POST",
        body: data
      });

      return await res.text();
    };

    const clearInputs = () => {
      inputs.forEach(item => {
        item.value = '';
      });

      textArea.forEach(item => {
        item.value = '';
      });
    };

    form.forEach(item => {
      item.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        item.appendChild(statusMessage);

        const formDate = new FormData(item);

        postDate('mail.php', formDate)
          .then(res => {
            console.log(res);
            statusMessage.textContent = message.success;
          })
          .catch(() => {
            statusMessage.textContent = message.failere;
          })
          .finally (() => {
            clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 5000);
          });
      });
    });
  };

  Forms();

});