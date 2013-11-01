var gebruikers = [
    {
        "id": 1,
        "naam": "Pascal Janssen",
        "gebruikersnaam": "pascal",
        "todos": [
            {
                "id": 1,
                "titel": "Koffie",
                "created": "31-10-2013",
                "priority" : "high",
                "description" : ""
            },
            {
                "id": 2,
                "titel": "Lunch",
                "created": "21-10-2013",
                "priority" : "low",
                "description" : "bla bla bals tijd voor lunch"
            },
            {
                "id": 3,
                "titel": "Gebruikers lijst maken",
                "created": "30-10-2013",
                "priority" : "medium",
                "description" : ""
            },
            {
                "id": 4,
                "titel": "Bier drinken",
                "created": "24-10-2013",
                "priority" : "low",
                "description" : ""
            }
        ]
    },
    {
        "id": 2,
        "naam": "Jeroen Dadema",
        "gebruikersnaam": "jeroen",
        "todos": [
            {
                "id": 1,
                "titel": "Bouwen van app",
                "created": "31-10-2013"
            },
            {
                "id": 2,
                "titel": "Mail checken",
                "created": "24-10-2013"
            }
        ]
    }
];

module.exports.gebruikers = gebruikers;
