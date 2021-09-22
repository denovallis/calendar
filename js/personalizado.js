$(document).ready(function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        header: {
          left: 'prev, next',
          center: 'title',
          right: 'today'
        },
        locale: 'pt-br',
        plugins: ['interaction', 'dayGrid'],
        editable: true,
        eventLimit: true,
        events: 'list_eventos.php',
        extraParams: function () {
            return {
                cachebuster: new Date().valueOf()
            };
        },
        eventClick: function (info) {
            info.jsEvent.preventDefault(); // don't let the browser navigate

            $('#visualizar #id').text(info.event.id);
            $('#visualizar #title').text(info.event.title);
            $('#visualizar #start').text(info.event.start.toLocaleString());
            $('#visualizar #end').text(info.event.end.toLocaleString());
            $('#visualizar').modal('show');
        },
        selectable: true,
        select: function (info) {
            $('#cadastrar #start').mask('00/00/0000 00:00');
            // $('#cadastrar #start').val(info.start.toLocaleString());
            $('#cadastrar #end').mask('00/00/0000 00:00')
            // $('#cadastrar #end').val(info.end.toLocaleString());
            $('#cadastrar').modal('show');
        }
    });

    $("#addevent").on("submit", function (event) {
      event.preventDefault();
      $.ajax({
        method: "POST",
        url: "cad_event.php",
        data: new FormData(this),
        contentType: false,
        processData: false,
        success: function (retorna) {
          if (retorna['sit']) {
            //$("#msg-cad").html(retorna['msg']);
            location.reload();
          } else {
            $("#msg-cad").html(retorna['msg']);
          }
        }
      })
    });

    calendar.render();
});
