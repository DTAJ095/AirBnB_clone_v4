$(document).ready(function () {
    let Ids = []
    $('input[type=checkbox]').click(function () {
        const listName = [];
        Ids = [];
        $('input[type=checkbox]:checked').each(function () {
            listName.push($(this).attr('data-name'));
            Ids.push($(this).attr('data-id'));
        })
        if (listName.length === 0) {
            $('.amenities h4').html('&nbsp;');
        } else {
            $('.amenities h4').text(listName.join(', '));
        }
        console.log(Ids)
    });

    $('.filters button').click(function (event) {
        event.preventDefault();
        $('.places').text('');
        const obj = {};
        obj.amenities = Ids;
        listPlaces(JSON.stringify(obj));
    });
});

$.ajax({
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
    error: function (xhr, status) {
        console.log('error' + xhr);
    }
});

$.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    datatype: 'json',
    data: {},
    contentType: 'application/json; charset=utf-8',
    success: function (places) {
        for (let i = 0; i < places.length; i++) {
            $('.places').append(`<article>
            <div class="title_box">
            <h2> ${places[i].name}</h2>
            <div class="price_by_night"> ${places[i].price_by_night} </div>
            <div>
            <div class="information>
            <div class="max_guest"> ${places[i].max_guest}
            ${places[i].max_guest > 1 ? 'Guests' : 'Guest'} </div>
            <div class="number_rooms"> ${places[i].number_rooms}
            ${places[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'} </div>
            <div class="number_bathrooms"> ${places[i].number_bathrooms}
            ${places[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'} </div>
            ,/div>
            <div class="user">
            </div>
            <div class="description"> ${places[i].description} </div>
            </article>
            `);
        }
    },
    error: function (xhr, status) {
        console.log('error ' + status)
    }
});
