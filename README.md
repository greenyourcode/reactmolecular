# version 1.0
3 classes : MoleculeSet, Molecule et Atom

La classe MoleculeSet est la classe smart qui receptionne toute l'intelligence et gère les fontions de haut niveau (model) : 
- addMolecule
- rmMolecule
- ModifyMolecule
- rmAtom
- AddAtom

Les classes Molecule et Atom sont des classes dummy. Elles remontent les informations via des callback à la classe MoleculeSet

Visuellement, toutes les fonctions possibles du CRUD sont affichées sur la même page et gérés dans le même bloc et le même composant. 