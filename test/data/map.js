module.exports = {
    "height":3,
    "layers":[
        {
            "data":[0,0,0,0,0,0,0,0,0],
            "height":3,
            "name":"test layer 1",
            "opacity":1,
            "type":"tilelayer",
            "visible":true,
            "width":3,
            "x":0,
            "y":0
        },
        {
            "data":[1,1,1,1,2,1,1,1,1],
            "height":3,
            "name":"test layer 2",
            "opacity":1,
            "type":"tilelayer",
            "visible":true,
            "width":3,
            "x":0,
            "y":0
        }
    ],
    "tileheight":8,
    "tilesets":[
        {
            "firstgid":1,
            "image":"tiles.png",
            "imageheight":8,
            "imagewidth":24,
            "margin":0,
            "spacing":0,
            "name":"test tileset",
            "tileheight":8,
            "tilewidth":8,
            "tiles": {
                "0": {
                    "objectgroup": {
                        "draworder": "index",
                        "height": 0,
                        "name": "",
                        "objects": [
                            {
                                "height": 0,
                                "id": 0,
                                "name": "",
                                "polygon": [
                                    {
                                        "x": 0,
                                        "y": 0
                                    },
                                    {
                                        "x": 8,
                                        "y": -8
                                    },
                                    {
                                        "x": 8,
                                        "y": 0
                                    }
                                ],
                                "properties": {},
                                "rotation": 0,
                                "type": "",
                                "visible": true,
                                "width": 0,
                                "x": 0,
                                "y": 8
                            }
                        ],
                        "opacity": 1,
                        "type": "objectgroup",
                        "visible": true,
                        "width": 0,
                        "x": 0,
                        "y": 0
                    }
                },
                "1": {
                    "objectgroup": {
                        "draworder": "index",
                        "height": 0,
                        "name": "",
                        "objects": [
                            {
                                "ellipse": true,
                                "height": 8,
                                "id": 0,
                                "name": "",
                                "properties": {},
                                "rotation": 0,
                                "type": "",
                                "visible": true,
                                "width": 8,
                                "x": 0,
                                "y": 0
                            }
                        ],
                        "opacity": 1,
                        "type": "objectgroup",
                        "visible": true,
                        "width": 0,
                        "x": 0,
                        "y": 0
                    }
                },
                "2": {
                    "objectgroup": {
                        "draworder": "index",
                        "height": 0,
                        "name": "",
                        "objects": [
                            {
                                "height": 8,
                                "id": 0,
                                "name": "",
                                "properties": {},
                                "rotation": 0,
                                "type": "",
                                "visible": true,
                                "width": 8,
                                "x": 0,
                                "y": 0
                            }
                        ],
                        "opacity": 1,
                        "type": "objectgroup",
                        "visible": true,
                        "width": 0,
                        "x": 0,
                        "y": 0
                    }
                }
            }
        }
    ],
    "tilewidth":8,
    "width":3
}