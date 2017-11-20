package louloucorp.roskate;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Set;
import java.util.UUID;

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.widget.SeekBar;
import android.widget.TextView;

public class MainActivity extends Activity {

    private SeekBar s = null;

    BluetoothSocket mmSocket;
    BluetoothDevice mmDevice = null;

    final byte delimiter = 33;
    int readBufferPosition = 0;

    //Envoie de l'information au raspberry pi (android = client ici). S'ils ne sont pas connectés, la fonction crée une socket et pousse le message à envoyer en argument dans la socket
    public void sendBtMsg(String msg2send){
        //UUID uuid = UUID.fromString("00001101-0000-1000-8000-00805f9b34fb"); //Standard SerialPortService ID
        //Universal Unique Identifier correspondant à celui que l'on trouve dans le script python sur la raspberry pi
        UUID uuid = UUID.fromString("94f39d29-7d6d-437d-973b-fba39e49d4ee"); //Standard SerialPortService ID
        try {

            mmSocket = mmDevice.createRfcommSocketToServiceRecord(uuid);
            if (!mmSocket.isConnected()){
                mmSocket.connect();
            }

            String msg = msg2send;
            //msg += "\n";
            OutputStream mmOutputStream = mmSocket.getOutputStream();
            mmOutputStream.write(msg.getBytes());

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final Handler handler = new Handler();

        //Le TextView affiche les messages envoyés par la raspberry (exemple vitesse effective du skate)
        final TextView myLabel = (TextView) findViewById(R.id.btResult);
        //La seekbar qui sert de jauge de vitesse
        final SeekBar s = (SeekBar) findViewById(R.id.seekBar);

        BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();

        //Le thread qui envoie et reçoit les données via le canal bluetooth RFCOMM.
        //Permet de laisser le GUI disponible pendant que l'application écoute et parle.
        final class workerThread implements Runnable {

            private String btMsg;

            public workerThread(String msg) {
                btMsg = msg;
            }

            public void run()
            {
                sendBtMsg(btMsg);
                while(!Thread.currentThread().isInterrupted())
                {
                    int bytesAvailable;
                    boolean workDone = false;

                    try {


                        //Une fois le message envoyé, création d'un input stream et création d'un buffer
                        final InputStream mmInputStream;
                        mmInputStream = mmSocket.getInputStream();
                        bytesAvailable = mmInputStream.available();
                        if(bytesAvailable > 0)
                        {

                            byte[] packetBytes = new byte[bytesAvailable];
                            Log.e("Roskate recv bt","bytes available");
                            byte[] readBuffer = new byte[1024];
                            mmInputStream.read(packetBytes);

                            for(int i=0;i<bytesAvailable;i++)
                            {
                                byte b = packetBytes[i];
                                if(b == delimiter)
                                {
                                    byte[] encodedBytes = new byte[readBufferPosition];
                                    System.arraycopy(readBuffer, 0, encodedBytes, 0, encodedBytes.length);
                                    final String data = new String(encodedBytes, "US-ASCII");
                                    readBufferPosition = 0;

                                    //data contient désormais le message complet
                                    handler.post(new Runnable()
                                    {
                                        //mise à jour du textview pour afficher le message
                                        public void run()
                                        {
                                            myLabel.setText(data);
                                        }
                                    });

                                    workDone = true;
                                    break;


                                }
                                else
                                {
                                    readBuffer[readBufferPosition++] = b;
                                }
                            }
                            //Fermeture de la connexion bluetooth et fin de l'écoute
                            if (workDone == true){
                                mmSocket.close();
                                break;
                            }

                        }
                    } catch (IOException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }

                }
            }
        };

        //Implémentation du comportement de la seekbar
        s.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {

            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                //Affiche la position
                //Si la position est < 50, on fait tourner les moteurs en sens inverse, en mettant un "-", car il n'y a pas de valeur négative sur une seekbar
                String speed = Integer.toString(progress-50);
                //Envoie de la donnée de la vitesse à la raspberry. Démarrage du thread
//                (new Thread(new workerThread(speed))).start(); //BUG
                //Pour comparer la commande envoyée avec la commande reçue en retour par le raspberry pi
                myLabel.setText(speed); //Remove this 
                System.out.println(speed);
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
            //Rien mais pourquoi pas quelque chose?
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                //Arrête le roskate si on lâche le portable (par exemple. Marche aussi pour une crampe au pouce) pour plus de sécurité
                s.setProgress(50);
                String speed = Integer.toString(0);

//                (new Thread(new workerThread(speed))).start(); //BUG
            }
        });

            //On regarde si le bluetooth est activé, sinon on propose de le faire
            if (!mBluetoothAdapter.isEnabled()) {
                Intent enableBluetooth = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                startActivityForResult(enableBluetooth, 0);
            }

            //On parcourt la liste des appareils connectés et on trouve le raspberry
            Set<BluetoothDevice> pairedDevices = mBluetoothAdapter.getBondedDevices();
            if (pairedDevices.size() > 0) {
                for (BluetoothDevice device : pairedDevices) {
                    //Si on le trouve, on le déclare comme appareil à utiliser
                    if (device.getName().equals("raspberrypi-0")) //Note, you will need to change this to match the name of your device
                    {
                        Log.e("Roskate", device.getName());
                        mmDevice = device;
                        break;
                    }
                }
            }
    }
}
