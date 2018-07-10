#!/bin/python
# Script based on the article from:
# http://elektroda.pl/rtvforum/topic3293959.html

import RPi.GPIO as gpio
import time


gpio.setmode(gpio.BCM)
gpio.setup(26, gpio.IN, pull_up_down = gpio.PUD_UP)

def Shutdown(channel):
    print("test")

    gpio.add_event_detect(26, gpio.FALLING, callback = Shutdown, bouncetime = 2000)

while 1:
    time.sleep(1)


