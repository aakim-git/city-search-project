$(document).ready(function() {

//set API URL to variable 
const URL_FOURSQUARE = 'https://api.foursquare.com/v2/venues/explore';

// Get city data from Foursquare API
function getDataFromFourSquareAPI (city, category, callback) {
    const parameters = {
        near: `${city}`,
        section: `${category}`,
        query: 'recommended',
        radius: 150,
        client_id: 'N4TONANM1I0FXAJRPD414MFYR0BYIMLAEKRCLNMEUAMRJ0VR',
        client_secret: 'ZEYA0Z2LOFLOZ321VQYJKVMHTN5BQFCBZ1SYIMFJQ4ZQ3LUC',
        v: 20180320,
        limit: 30,
        venuePhotos: 1,
    };  
    $.getJSON(URL_FOURSQUARE, parameters, callback);
}


//handle the JSON data from FourSquare/display results
function displayFourSquareData(data) {
    let results = data.response.groups[0].items.map(city => renderResult(city));
    console.log(results);
    $('.results').prop('hidden', false).html(results);
}


// render the results, HTML
function renderResult (result) {
    return `
    <div class="col-4 ${hiddenElement(result.venue.photos.count)}">
        <div class="venue-card">
            <div class="venue-name">    
                <a href="${result.venue.url}">${result.venue.name}</a>
            </div>
            <a href="${result.venue.url}" target="_blank"><img class="venue-image" src="${getImageURL(result.venue)}"></a>
            <div class="venue-info">
                <div class="two-columns1">
                    <div class="venue-category">
                        <img class="venue-category-logo" src="${result.venue.categories[0].icon.prefix}bg_32${result.venue.categories[0].icon.suffix}" alt="category logo">
                        <p class="venue-category-name">${result.venue.categories[0].shortName}</p>
                    </div>
                    <div class="venue-address-container">
                        <p class="venue-address-street ${hiddenElement(result.venue.location.formattedAddress[0])}">${result.venue.location.formattedAddress[0]}</p>
                        <p class="venue-address-street ${hiddenElement(result.venue.location.formattedAddress)}">${result.venue.location.formattedAddress[1]}</p>
                        <p class="venue-address-phone ${hiddenElement(result.venue.contact.formattedPhone)}">${result.venue.contact.formattedPhone}</p>
                    </div>
                </div>
                <div class="two-columns2">
                    <p class="venue-rating">Rating:</p>
                    <p class="rating ${hiddenElement(result.venue.rating)}">${result.venue.rating}</p>
                </div>
            </div>
        </div>
    </div>`;
}

// hide elements with no photos, ratings, etc.
function hiddenElement (argument) {
    if (argument === 0 || argument === undefined) {
        return 'hidden-element';
    } else {
        return "";
    };
}


//get image URL
function getImageURL (venue) {
    if (venue.photos.count === 1) {
        let photoObj = venue.photos.groups[0].items[0];
        let prefix = photoObj.prefix;
        let suffix = photoObj.suffix;
        return prefix + "250x250" + suffix;
    } else {
        return 'none';
    };
}
  
//category input based on which button you press
function submitCategoryButtons() {
    $('#searchForm .buttons button').on('click', function (e) {
        e.preventDefault();
        let inputTarget = $('#searchInput').val();
        if (inputTarget === "") {
            alert ('Please enter a city name');
        }
        let category = $(e.currentTarget).data('4sq-category');
        getDataFromFourSquareAPI(inputTarget, category, displayFourSquareData);
    });
}

//function call 
submitCategoryButtons();
});