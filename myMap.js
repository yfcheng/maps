var map;
function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AvA8vhciwa4t-y2DF7SFr9PUSvBJzAX9Ib6TdWqN9KlOzQCGjlUzaFaIWBumUVH4'
    });
}
 
// 1. Define pokemon data format, create mock pokemon data
map_items = [
    {
        "pokemon_id" : 12,
        "expire" : 1234567,
        "longitude" : -122.1914097,
        "latitude" : 47.5827493
    }
]

// 2. Create pokemon image on map
function get_pokemon_layer_from_map_items(map_items) {
    var layer = new Microsoft.Maps.Layer();
    var pushpins = Microsoft.Maps.TestDataGenerator.getPushpins(10, map.getBounds());
    layer.add(pushpins);
    return layer;
}

var pokemon_layer =  get_pokemon_layer_from_map_items(map_items);
map.layers.insert(layer);   
// 3. Add pokemon count down refresh

// 4. Connect with REST API

