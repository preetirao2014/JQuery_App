var change_chosen = [];
change_chosen[0] = "";
var chosen="";
console.log(chosen);
$(document).ready(function() {
    $('#ap_date_span').hide();
    $('#time_heading').hide();
    $('#time_picker').hide();
    $('#time').hide();
    $('#top').hide();
    $('#confirm').hide();

    $('#ap_date').on('input', function() {
        var input = $(this);
        var is_name = input.val();
        var span_1 = $('#ap_date_span');
        var img = $(this).next();
        if (isDate(is_name) == false) {
            span_1.html("Please pick a valid date");
            span_1.show();
            img.attr("src", "img/no.png");
            $('#time_heading').hide();
            $('#time_picker').hide();
            $('#time').hide();
        } else {
            span_1.hide();
            img.attr("src", "img/yes.png");
            $('#time_heading').show();
            $('#time_picker').show();
            $('#time').show();
            $('#make_an_app').text("These are the available time slots for your chosen date. If these time slots do not work, please pick a new date");
        };
    });

    $('.col-sm-2 p').click(function() {
        chosen = $(this).text();
        $('#picked_time').val(chosen);
        console.log(chosen);
    });

    $('#res').click('input', function() {
        $('.inp_img').attr("src", "");
        $('.inputs').val("");
    });
});

function isDate(is_name) {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = d.getFullYear() + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day;
    change_today = [];
    $.each(output.split("-"), function(index, value) {
        change_today.push(parseInt(value));
    });
    $.each(is_name.split("-"), function(index, value) {
        change_chosen.push(parseInt(value));
    });
    change_chosen[0] = change_chosen[1];
    change_chosen[1] = change_chosen[2];
    change_chosen[2] = change_chosen[3];
    console.log(change_chosen[0]);
    if (change_chosen[0] > change_today[0]) return true
    else if ((change_chosen[0] == change_today[0]) & (change_chosen[1] > change_today[1])) return true
    else if ((change_chosen[0] == change_today[0]) & (change_chosen[1] == change_today[1]) & (change_chosen[2] > change_today[2])) return true
    else return false;
}

function formVal() {
    var inp1 = $('#fName').val();
    var inp2 = $('#lName').val();
    var inp3 = $('#phone').val();
    var inp4 = $('#email').val();
    var inp5 = $('#date').val();
    var inp6 = $('#time').val();

    if (inp1 == "") {
        $('#top').show();
        return false;
    } else if (inp2 == "") {
        $('#top').show();
        return false;
    } else if (inp3 == "") {
        $('#top').show();
        return false;
    } else if (inp4 == "") {
        $('#top').show();
        return false;
    } else if (change_chosen[0] == "") {
        $('#top').show();
        return false;
    } else if(chosen==""){
        $('#top').show();
        return false;
    }
     else {
        $('#top').hide();
        return true;
    }
}
