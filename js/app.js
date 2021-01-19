var app = angular.module('app', ['file', 'tag', "ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "app/search-content/search.html"
    })
    .when("/file/add", {
        templateUrl : "app/add-content/add.html"
    });
});

app.controller('appController', function($scope) {
    // create our temp files just so we can populate data. we would generally get this from
    // the database, but we would actually get specific files rather than all, based on the user's
    // search and other criterias, since if this list got huge, it would not be realistic to load
    // it all into a list for the UI to search through.
    $scope.files = [
        file = {
            name: 'xyz procedure.mp4',
            type: 'VIDEO',
            description: 'This is a video about xyz surgical procedure.',
            tags: [
                'Tag 1',
                'Tag 2',
                'Tag 3'
            ]
        },
        file = {
            name: 'left-arm.jpg',
            type: 'image',
            description: 'This is an image of what an arm looks like.',
            tags: [
                'Tag 4',
                'Tag 2',
                'Tag 6'
            ]
        },
        file = {
            name: 'right-arm.png',
            type: 'image',
            description: 'This is an image of what an arm looks like.',
            tags: [
                'Tag 4',
                'Tag 2',
                'Tag 6'
            ]
        },
        file = {
            name: 'leg.jpg',
            type: 'image',
            description: 'This is an image of what a leg looks like.',
            tags: [
                'Tag 4',
                'Tag 2',
                'Tag 6'
            ]
        }
    ];

    $scope.displayFiles = $scope.files;
    $scope.showInfo = false;

    //adds a file to the file array
    $scope.addFile = function(file) {
        $scope.files.push(file);
    };

    $scope.searchFiles = function() {
        if ($scope.searchBox) {
            //reset the list
            $scope.displayFiles = [];

            //split the text in the search bar by spaces
            let tags = $scope.searchBox?.split(' ');
            
            //distinct the tags so that we don't have to iterate and do business logic on duplicates
            tags = tags.filter((x, i, a) => a.indexOf(x) == i);

            //iterate through all the tags
            tags.forEach(tag => {
                //get a list of files for every file that contains the tag
                const files = $scope.files.filter(f => f.tags.some(t => t.replace(' ', '').toLowerCase().includes(tag.toLowerCase())));

                if ($scope.displayFiles.length === 0) {
                    $scope.displayFiles = files;
                } else {
                    //find intersection
                    $scope.displayFiles = $scope.displayFiles.filter(file => files.includes(file));
                }
            });
        } else {
            //if the user doesn't have anything in the search bar, then show everything
            $scope.displayFiles = $scope.files;
        }
    };

    $scope.searchBox = '';

    //removes the tag from a specific file
    $scope.removeTag = function(file, tag) { 
        if ($scope.files) {
            //find the index of the file within our array
            let fileIndex = $scope.files.indexOf(f => f.name === file.name);

            //find the index of the tag being removed from that file
            if (fileIndex > 0) {
                //make sure we have tags within this file to begin with in case its an empty array
                if ($scope.files[fileIndex].tags) {
                    let tagIndex = $scope.files[fileIndex].tags.indexOf(t => t.text === tag.text);
                    if (tagIndex > 0)
                        $scope.files[fileIndex].tags.splice(tagIndex, 1);
                }
            }
        }
    };

    $scope.removeFile = function(file) { 
        //i realize this is a problem if multiple files have the same name, but if i were to have taken my
        //time and done this faster, i would have used IDs instead of the file name
        let fileIndex = $scope.files.indexOf(f => f.name === file.name);
        if (fileIndex > 0)
            $scope.files.splice(fileIndex, 1);
    };
});