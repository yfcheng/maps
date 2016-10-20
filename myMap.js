var map_manager = {
    "map" : null,
    "map_items" : []
}

// 1. Define pokemon data format, create mock pokemon data
map_manager.map_items = [
    {
        "pokemon_id" : 12,
        "expire" : 1476941658,
        "longitude" : -122.1914097,
        "latitude" : 47.5827493
    }
]

function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AvA8vhciwa4t-y2DF7SFr9PUSvBJzAX9Ib6TdWqN9KlOzQCGjlUzaFaIWBumUVH4'
    });
    add_pokemon_layer();
}

function get_counter_down_time_from_expire_epoch(epoch) {
    var now_time = new Date().getTime() / 1000;
    var time_left = epoch / 1000 - now_time;     // unit: second
    var second = Math.floor(time_left % 60);
    var minute = Math.floor(time_left / 60);
    return minute + ":" + second;
}

// 2. Create pokemon image on map
function get_pokemon_layer_from_map_items(map_items) {
    var layer = new Microsoft.Maps.Layer();
    var pushpins = []
    for(var i in map_items) {
        var map_item = map_items[i];
        var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(map_item["latitude"], map_item["longitude"]), 
                                                 { icon: 'images/pushpin_images/pokemon/' + map_item['pokemon_id'] + '.png',
                                                   title: get_counter_down_time_from_expire_epoch(map_item['expire']) });
        pushpins.push(pushpin);
    }
    layer.add(pushpins);
    return layer;
}

function add_pokemon_layer() {
    var pokemon_layer =  get_pokemon_layer_from_map_items(map_manager.map_items);
    map_manager.map.layers.insert(pokemon_layer); 
}
// 3. Add pokemon count down refresh

function refresh_pokemon_layer() {
    // prepare new layer
    var pokemon_layer = get_pokemon_layer_from_map_items(map_manager.map_items);
    // remove old layer
    map_manager.map.layers.clear();
    // Add new layer
    map_manager.map.layers.insert(pokemon_layer);
}

// 4. Connect with REST API
function refresh_pokemon_data() {
    // Get boundary of current map view
    var bounds = map_manager.map.getBounds();
    
    // Request pokemons in current map view
    
    var apigClient = apigClientFactory.newClient();
    var params = {
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        west: bounds.getWest(),
        east: bounds.getEast(),
    };
    var body = {};
    var additionalParams = {};

    apigClient.mapPokemonsGET(params, body, additionalParams)
        .then(function(result){
            map_manager.map_items = result.data;
        }).catch( function(result){
            console.log(result)
        });
}

window.setInterval(refresh_pokemon_layer, 1000);
window.setInterval(refresh_pokemon_data, 1000);
