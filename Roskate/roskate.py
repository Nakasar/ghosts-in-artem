#http://blog.davidvassallo.me/2014/05/11/android-linux-raspberry-pi-bluetooth-communication/

#Consignes préalables
#pairing raspberry pi to android phone:
#sudo apt-get install bluez python-bluez
#sudo hciconfig hci0 piscan [make your device discover-able]
#sudo hciconfig hci0 name 'Device Name' [change your device name to somethig else]
#En faire un script

#Il s'agit d'une version modifiée d'un serveur rfcomm

import os
import glob
import time
import RPi.GPIO as GPIO
from bluetooth import *

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.OUT)

base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'
	
#while True:
#	print(read_temp())	
#	time.sleep(1)


server_sock=BluetoothSocket( RFCOMM )
server_sock.bind(("",PORT_ANY))
server_sock.listen(1)

port = server_sock.getsockname()[1]

#Même Universal Unique Identifier
uuid = "94f39d29-7d6d-437d-973b-fba39e49d4ee"

advertise_service( server_sock, "RoskatePiServer",
                   service_id = uuid,
                   service_classes = [ uuid, SERIAL_PORT_CLASS ],
                   profiles = [ SERIAL_PORT_PROFILE ], 
#                   protocols = [ OBEX_UUID ] 
                    )
while True:          
	print ("Waiting for connection on RFCOMM channel %d" % port)

	client_sock, client_info = server_sock.accept()
	print ("Accepted connection from ", client_info)

	#Modifications du code initial a partir d'ici
	try:
	        data = client_sock.recv(1024)
        	#if len(data) == 0: break
	        print "received [%s]" % data

		#On envoie des strings a la raspberry 
		#A modifier, ajout d'un regulateur de vitesse etc...
		#Si les 7 premiers termes de data sont EnRoute alors on peut avancer		
		if len(data) != 0:
			GPIO.output(17,True) #Envoie des donnees a l'ESC. Pour l'instant on envoie True
			#Envoie la vitesse a l'appli
			#Pour l'instant on envoie ok
			data = 'ok'
		else:
			#Mettre la vitesse a 0 par securite
			GPIO.output(17,False)
			data = 'stop'
	        client_sock.send(data) #Envoie du message à l'application
		print "sending [%s]" % data 

	except IOError:
		pass

	except KeyboardInterrupt:

		print "disconnected"

		client_sock.close()
		server_sock.close()
		print "all done"

		break
