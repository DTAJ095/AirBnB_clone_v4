$(document).ready(function () {
    $('input[type=checkbox]').click(function () {
        const listName = [];
        const listId = [];
        $('input[type=checkbox]:checked').each(function () {
            listName.push($(this).attr('data-name'));
            listId.push($(this).attr('data-id'));
        })
        if (listName.length === 0) {
            $('.amenities h4').html('&nbsp;');
        } else {
            $('.amenities h4').text(listName.join(', '));
        }
        console.log(listId)
    });
});

$.ajax(
    {
        url: 'http://0.0.0.0:5001/api/v1/status/',
        type: 'GET',
        datatype: 'json',
        success: function (response) {
            if (response.status === 'OK') {
                $('Div#api_status').addClass('available');
            } else {
                $('Div#api_status').removeClass('available');
            }
        },
        error: function (error) {
            $('Div#api_status').removeClass('available');
        }
    }
)