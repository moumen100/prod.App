//var app = angular.module('SupProd', []);

//Première étape on déclare l'application angularJs
//on choisi biblioApp étant le nom de ton application, le nom de la variable est celui dans la déclaration sont identiques
//Et tu rajoute le module de routage dans les paramètre (on appel ça injection de dépendence)
// Ici le module qu'on inject est ngRoute qui servira au routage

var biblioApp = angular.module('biblioApp', ['ngRoute']);

//Maintenant on vas créer les règles de routage, c'est grace à au module ngRoute qu'on peut créer ces règles de routage
//La syntax est simple : à gauche tu me le lien que tu veux metter sur tes pages html (balise <a>), à gauche tu met l'adresse exacte sur ton site Controlleur/Action'
//Le routeur AngularJs vas se charger router les adresse vers les bonne (Index vers Home/index ...etc)
//Le dernier paramètre c'est le nom du controlleur qui vas controller cette page'
/*migrationApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', { templateUrl: '/Home/Index', controller: 'homeCtrl' })
        .when('/Index', { templateUrl: '/Home/Index', controller: 'homeCtrl' })
        .when('/About', { templateUrl: '/Home/Index', controller: 'homeCtrl' })
        .when('/Contact', { templateUrl: '/Home/Contact', controller: 'homeCtrl' })
        .when('/Customers', { templateUrl: '/Home/Customers', controller: 'homeCtrl' })
        .when('/Suppliers', { templateUrl: '/Suppliers/Index', controller: 'suppliersCtrl' })
        .when('/Products', { templateUrl: '/Suppliers/Products', controller: 'suppliersCtrl' })
        .when('/Suppliers/Products', { templateUrl: '/Suppliers/Products', controller: 'suppliersCtrl' })
})

*/
//Maintenant on vas créer un controlleur pour la page Customers
//Il est préférable d'avoir un controlleur AngularJs pour chaque page, donc pour chaque Controlleur MVC'
//Note bien qu'on rajoute ce controleur à l'application AngularJs qu'on a créé avant donc biblioApp'

biblioApp.controller('suppliersCtrl', function ($scope, $rootScope, $http) {

    //Maintenant on déclare nos méthodes, on doit les rajouter à la variable de transmission $scope
    //$scope est l'équivalent de ViewBag ou ViewData dans ASP.Net MVC'
    //Elle permet d'accéder à des données ou des fonctions du controlleur depuis la page html

    
        $http.get("http://localhost:49162/Suppliers/GetProducts").then(function (response) {
            $scope.ProdList = response.data;
            //Maintenant lire cette liste depuis n'importe quelle page qui utilise le controlleur suppliersCtrl'
            //Dans notre cas c'est Suppliers/Index' et Suppliers/Products
        }, function errorCallBack(response) {
            //Cette fonction est appellé en cas d'erreur, le nom de la fonction errorCallBack n'est pas important'
            alert(response.data);
        });
        $scope.show_details = function (Id){
            alert(Id);
        }

        $scope.Remove = function (ProdId) {

            var req = {
                method: 'POST',
                url: 'http://localhost:49162/Suppliers/Products',

                data: {
                    ProductId: ProdId
                },
                cache: false
            }
            $http(req).then(function () {
                alert("votre produit a été rejeté avec sucess");
                location.reload(); 
            },
                function errorCallBack(response) {
                    //Cette fonction est appellé en cas d'erreur, le nom de la fonction errorCallBack n'est pas important'
                    alert("Imossible de supprimer le produit");
                }
            );

        }

        $scope.Edit = function (product) {

            var req = {
                method: 'POST',
                url: 'http://localhost:49162/Suppliers/GetNewProduct',

                data: { ProductId: product.Id, ProductName: product.ProductName, UnitPrice: product.UnitPrice, UnitPrice: product.UnitPrice, dispo: product.dispo },
                cache: false,
                headers: {
                    'Content-type': 'application/json'
                }
            };
            alert(product.Id + "hhhh" + product.ProductName)
            $http(req).then(function () {
                location.assign("http://localhost:49162/Suppliers/EditProduct")
            },
                function errorCallBack(response) {
                    alert("Imossible de modifier le produit");
                }
            );

        }
})

biblioApp.controller("AddProdCtrl", function ($scope, $http) {
    $scope.options = ["Kg", "Litre", "cl", "ml", "Piece", "Packet", "m", "l", "m2", "boite"];
    $scope.Send = function () {
        if ($scope.Pdispo) { dispo = true }
        else { dispo = false }
        
        var req = {
            method: 'POST',
            url: 'http://localhost:49162/Suppliers/AddProduct',

            data: {
                ProductName: $scope.Pname, UnitPrice: $scope.Pprix, Package: $scope.Punit + $scope.Punitname, IsDiscontinued: dispo
            },
            cache : false
        }

        $http(req).then(function () { alert("votre produit a été ajouté avec sucess") });
    }
        
        

    

});

biblioApp.controller("EditProdCtrl", function ($scope, $http) {
    $scope.options = ["Kg", "Litre", "cl", "ml", "Piece", "Packet", "m", "l", "m2"];

    $http.get("http://localhost:49162/Suppliers/GetNewProduct").then(function (response) {
        alert(response.data.ProductName)
        $scope.Product = response.data;
        $scope.Pname = $scope.Product.ProductName;
        $scope.Pprix = $scope.Product.UnitPrice;
        list = $scope.Product.Package.split(" ");
        $scope.Punit = list[0];
        $scope.Punitname = list[1];
        if ($scope.Product.dispo) { $scope.Pdispo = "Oui" }
        else { $scope.Pdispo = "Non"}

    }, function errorCallBack(response) {
        alert(response.data);
    });

    $scope.Send = function () {
        if ($scope.Pdispo) { dispo = true }
        else { dispo = false }

        var req = {
            method: 'POST',
            url: 'http://localhost:49162/Suppliers/EditProduct',

            data: {
                ProductName: $scope.Pname, UnitPrice: $scope.Pprix, Package: $scope.Punit + $scope.Punitname, IsDiscontinued: dispo
            },
            cache: false
        }

        $http(req).then(function () { alert("votre produit a été modifié avec sucess") });
    }





});


