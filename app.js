$(document).ready(function() {

//set API URL to variable 
const URL_FOURSQUARE = 'https://api.foursquare.com/v2/venues/explore';

// Get city data from Foursquare API
function getDataFromFourSquareAPI (city, category, callback) {
    const parameters = {
        near: `${city}`,
        section: `${category}`,
        query: 'recommended',
        radius: 100,
        client_id: 'N4TONANM1I0FXAJRPD414MFYR0BYIMLAEKRCLNMEUAMRJ0VR',
        client_secret: 'ZEYA0Z2LOFLOZ321VQYJKVMHTN5BQFCBZ1SYIMFJQ4ZQ3LUC',
        v: 20180320,
        limit: 18,
        venuePhotos: 1,
    };  

    $.getJSON(URL_FOURSQUARE, parameters, callback);
    // https://api.foursquare.com/v2/venues/explore?near=Davis,CA&section=food&query=tacos&client_id=N4TONANM1I0FXAJRPD414MFYR0BYIMLAEKRCLNMEUAMRJ0VR&client_secret=ZEYA0Z2LOFLOZ321VQYJKVMHTN5BQFCBZ1SYIMFJQ4ZQ3LUC&v=20180320&limit=20&venuePhotos=1 
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
    <div class="col-4 ${hiddenElementNoPictures(result.venue)}">
        <div class="venue-card">
            <div class="venue-name">    
                <a href="${result.venue.url}">${result.venue.name}</a>
            </div>
            <a href="${result.venue.url}" target="_blank"><img class="venue-image" src="${getImageURL(result.venue)}"></a>
            <div class="venue-category">
                <img class="venue-category-logo" src="${result.venue.categories[0].icon.prefix}bg_32${result.venue.categories[0].icon.suffix}" alt="category logo">
                <p class="venue-category-name">${result.venue.categories[0].shortName}</p>
            </div>
            <div class="venue-address-container">
                <p class="venue-address-street">Address: ${result.venue.location.formattedAddress}</p>
                <p class="venue-address-street">${result.tips[0].text}</p>
        
            </div>
        </div>
    </div>`;
}

    // <p class="venue-address-city">City: ${result.venue.location.city}, ${result.venue.location.state}</p>
    //     <p class="venue-address-phone">Telephone: ${result.venue.contact.phone}</p>

function hiddenElementNoPictures (venue) {
    if (venue.photos.count === 0) {
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
  
//user text input based on which button you press
function submitCategoryButtons() {
    $('#searchForm .buttons button').on('click', function (e) {
        e.preventDefault();
        let inputTarget = $('#searchInput').val();
        let category = $(e.currentTarget).data('4sq-category');
        getDataFromFourSquareAPI(inputTarget, category, displayFourSquareData);
        searchWeather(query);
    });
}

submitCategoryButtons();

});