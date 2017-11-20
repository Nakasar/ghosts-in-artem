Roskate
=======

Le projet Roskate consiste en la réalisation d’une application android en communication bluetooth avec une partie électronique gérée par une raspberry pi.

L’application que nous avons réalisée (le projet android studio Roskate est attachée en zip) est constituée d’une partie communication en bluetooth. On y trouve la partie pairing permettant de trouver la raspberry à laquelle se connecter, la fonction sendBtMsg qui envoie un string, crée une socket etc… ainsi que la classe workerThread permettand de créer un thread d’écoute et d’envoie de message.

La seconde partie de l’application concerne la seekbar et le textview permettant à l’application d’afficher la valeur effective de la vitesse du skate grâce à un capteur situé sur le skate.  
On y définie les comportements de la seekbar. Par exemple le positionnement au milieu de sorte que le skate s’arrête lorsqu’on arrêter d’envoyer des données à la raspberry avec la fonction onStopTrackingTouch. La fonction OnProgressChanged permet d’envoyer la vitesse souhaitée par bluetooth.

Le script python roskate.py est situé sur la raspberry pi. Il s’agit d’un serveur qui reçoit les messages provenant de l’application android sous forme de string et contenant la vitesse souhaitée. Le rôle de ce script sera ensuite de communiquer avec un module de contrôle moteur (edp…) avec la bibliothèque GPIO afin de faire tourner un moteur électrique entraînant une roue arrière (grâce à une courroie). Le script envoie également à chaque instant la vitesse effective du skate (grâce à un éventuel capteur) à l’application qui l’affichera grâce au textView.
