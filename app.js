$(document).ready(function() {

//set API URLs to variables 
URL_FOURSQUARE = 'https://api.foursquare.com/v2/venues/explore';
// URL_FOURSQUARE2 = 'https://api.foursquare.com/v2/venues/categories';
URL_METAWEATHER = 'https://www.metaweather.com/api/location/(woeid)/';


// Get city data from Foursquare API
function getDataFromFourSquareAPI (city, category, callback) {
    const parameters = {
        near: `${city}`,
        section: `${category}`,
        query: 'recommended',
        radius: 30,
        client_id: 'N4TONANM1I0FXAJRPD414MFYR0BYIMLAEKRCLNMEUAMRJ0VR',
        client_secret: 'ZEYA0Z2LOFLOZ321VQYJKVMHTN5BQFCBZ1SYIMFJQ4ZQ3LUC',
        v: 20180320,
        limit: 20,
        venuePhotos: 1
    };  

    $.getJSON(URL_FOURSQUARE, parameters, callback);
    // https://api.foursquare.com/v2/venues/explore?near=Davis,CA&section=food&query=tacos&client_id=N4TONANM1I0FXAJRPD414MFYR0BYIMLAEKRCLNMEUAMRJ0VR&client_secret=ZEYA0Z2LOFLOZ321VQYJKVMHTN5BQFCBZ1SYIMFJQ4ZQ3LUC&v=20180320&limit=20&venuePhotos=1    // $.ajax(settings, callback);
}


//handle the JSON data from FourSquare. Set it to variable "results"
function displayFourSquareData(data) {
    let results = data.response.groups[0].items.map(city => renderResult(city));
    console.log(results);
    $('.results').html(results);
}


// render the results to HTML
function renderResult (result) {
    return `
    <div class="container-results">
        <div class="venue-name">
            <a href="${result.venue.url}">${result.venue.name}</a>
            <img class="venue-image" src="${getImageURL(result.venue)}">
            <img class="venue-category-logo" src="${result.venue.categories[0].icon.prefix}bg_32${result.venue.categories[0].icon.suffix}" alt="category logo">
            <p class="venue-category-name">${result.venue.categories[0].shortName}</p>
        </div>
    </div>`;
}


//get image URL
function getImageURL (venue) {
    if (venue.photos.count > 0) {
        let photoObj = venue.photos.groups[0].items[0];
        let prefix = photoObj.prefix;
        let suffix = photoObj.suffix;
        let imageSize = (photoObj.width+'x'+photoObj.height);
        return prefix + imageSize + suffix;
    } else {
        return 'none';
    };
}
  
//user text input based on which button you press
function submitCategoryButtons() {
    $('#searchForm .buttons button').on('click', function (ev) {
        ev.preventDefault();
        let inputTarget = $('#searchInput').val();
        let category = $(ev.currentTarget).data('4sq-category');
        getDataFromFourSquareAPI(inputTarget, category, displayFourSquareData);
    });
}



submitCategoryButtons();

});