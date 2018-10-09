/**
 * XSPEEDIT
 *
 * Implémenter une application qui permettrait de maximiser le nombre d'articles par carton, en utilisant un langage pouvant être exécuté sur une JVM 1.7 minimum ou en node.js.
 * L'ordre des cartons et des articles n'a pas d'importance.
 * 
 * 
 * RESOLUTION
 * 
 * Le problème identifié est un bin packing
 * 
 * Plusieurs solutions sont possibles.
 * La solution proposée est une solution heuristique basée sur un algorithme de First Fit Decreasing
 */

// Capacité d'une boite
const box_capacity = 10;

// Chaine d'entrée
var supply_in = "163841689525773";

// Chaine de sortie contenant les boites
var pack = new Map(); 

// Capacité restante des boites 
var boxes = [];

// Pour appliquer l'algorithme FFD, il convient de formater la chaine pour l'exploiter et la trier par ordre décroissante
var articles = [];
for (var i = 0, len = supply_in.length; i < len; i += 1) {
    articles.push(+supply_in.charAt(i));
}
articles.sort();
articles.reverse();

// Initialisation de l'espace restant des boites
var boxes = [];
for(var i = 0; i < articles.length; i++) {
    boxes.push([10]);
}

// Mise en oeuvre First-Fit Decreasing
_.forEach(articles, function(a) {
    // Parcours des boites disponibles pour trouver la première satisfaisante
	for(var i = 0; i < boxes.length; i++) {
		if(boxes[i] - a >= 0) {
            // En plaçant l'article dans la boite, on modifie sa capacité restante
            boxes[i] -= a;
      // On ajoute l'article dans la boite satisfaisante et disponible
      if(pack.has(i)) {
        var box = [];
       	box.push(pack.get(i));
        box.push(a);
        pack.set(i,box);
      }
      // Sinon le place dans une nouvelle boite
      else {
      	pack.set(i,a);
      }
      break;
    }
  }
});

// Affichage de la solution
var supply_out = ""; 
for (let [k, v] of pack) {
  supply_out += v + "/";
}
console.log(supply_out.substring(0,supply_out.length - 1).replace( /,/g, "" ));