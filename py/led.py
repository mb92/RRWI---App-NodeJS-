import RPi.GPIO as gpio
import time

try: 
	#set up pin 14 as an output
	gpio.setmode(gpio.BCM)
	gpio.setup(21, gpio.OUT)

	licznik = 0
	while licznik < 5:
    		#print licznik
    		licznik += 1
    		gpio.output(21, gpio.HIGH)
    		time.sleep(1)
    		gpio.output(21, gpio.LOW)
    		time.sleep(1)

	print 'ok'
except Exception:
	print 'fail'
