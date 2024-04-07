$(document).ready(function () {
    let Amenities = [];
    let States = [];
    let Cities = [];

    $('.amenities .popover input[type=checkbox]').click(function () {
        const listName = [];
        Amenities = [];

        $('.amenities .popover input[type=checkbox]').each(function () {
            listName.unshift($(this).attr('data-name'));
            Amenities.unshift($(this).attr('data-id'));
        });
        if (listName.length === 0) {
            $('.amenities h4').html('&nbsp;');
        } else {
            $('.amenities h4').text(listName.join(', '));
        }
        console.log(Amenities);
    });

    $('.locations .popover h2 input[type=checkbox]').click(function () {
        const listName = [];
        States = [];

        $('.locations .popover h2 input[type=checkbox]').each(function () {
            listName.unshift($(this).attr('data-name'));
            States.unshift($(this).attr('data-id'));
        });
        if (listName.length === 0) {
            $('.locations h6.States').html('&nbsp;');
        } else {
            $('.locations h6.States').text(listName.join(', '));
        }
        console.log(States);
    });

    $('locations .popover ul ul input[type=checkbox]').click(function () {
        const listName = [];
        Cities = [];

        $('.locations .popover ul ul input[type=checkbox]').each(function () {
            listName.unshift($(this).attr('data-name'));
            Cities.unshift($(this).attr('data-id'));
        });
        if (listName === 0) {
            $('.locations h6.Cities').html('&nbsp;');
        } else {
            $('.locations h6.Cities').text(listName.join(', '));
        }
        console.log(Cities);
    });

    $('.filters button').click(function (event) {
        event.preventDefault();
        $('.places').text('');

        const obj = {};
        obj.amenities = Amenities;
        obj.states = States;
        obj.cities = Cities;

        listPlaces(JSON.stringify(obj));
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

    listPlaces();
});

function listPlaces (amenities = '{}') {
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
}
