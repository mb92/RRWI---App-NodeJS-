Structure:

raspberry dirs ...

printrun -> ...
	- all files of printrun application. The node app use pronsole.py and all required libraries. This dir must be on this place.
	More about Printrun: 
		- http://www.pronterface.com/ 
		- https://github.com/kliment/Printrun

rrwi -> ...
	- apache - all files from the dir must me copied to your local raspberry apache /var/www/html/rrwi
	- apidoc - file with api description
	- tmp - temporary dir for sending files for printing. The dir is cleaning with start Debian always.
	- py - all python files for control power adapter
	- py/power_status.example.txt must by copied as power_status.txt !!!
	- src - all files of app
	- printerface.js - An free application that has inspirated to create RepRapWebInterface - https://github.com/w-A-L-L-e/printerface. This file is not use in rrwi.

After the update, check whether the files in the rrwi/apache directory have not disappeared. If so, you must manually copy them to the /var/www/html/rrwi directory.
