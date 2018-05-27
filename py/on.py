import RPi.GPIO as gpio
import time


gpio.setmode(gpio.BCM)
gpio.setup(18, gpio.OUT)
gpio.setup(23, gpio.OUT)

#pin for led control
gpio.output(23, gpio.HIGH)

#pin for switch transistor
gpio.output(18, gpio.HIGH)

print 'Power ON'
