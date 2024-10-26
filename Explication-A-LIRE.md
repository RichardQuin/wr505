Bonjour ! Tout fonctionne sauf pour les ajouts, car je rencontre une erreur SQL. 
Lorsque j'essaie d'ajouter, une erreur 1048 apparaît, indiquant que `created_at` ou `updated_at` ne peut pas être nul.
J'ai essayé de corriger cela de différentes manières, notamment en ajoutant `created_at` dans le formulaire. 
Les données sont bien envoyées, mais elles ne sont pas reconnues en SQL. 
J'ai aussi essayer de modifier le back mais rien à faire. plus pour modifier actor si sa marche pas c'est
les assert il faut regarder dans la console la plus part du temp c'est du a un trop longue bio.

De plus, il y a un petit bug : lorsque l'utilisateur n'est pas connecté, les pages se chargent indéfiniment.
Je vous souhaite une bonne soirée !