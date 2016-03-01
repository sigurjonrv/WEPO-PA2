ChatServer!
===========

Þetta verkefni er Forritunnar verkefni(PA2) í vefforritun2(WEPO).

Unnið af:

* Sigurjón Rúnar Vikarsson sigurjonv12@ru.is
* Jóhann Gíslasson johanng13@ru.is

Nauðsynleg tól fyrir keyrslu:

* NodeJS  http://nodejs.org/
* Grunt http://gruntjs.com/
* Bower http://bower.io/
* python https://www.python.org/
* chrome(við mælum með) https://www.google.is/chrome/browser/desktop/

Setja upp í fyrsta skipti:

1.Opna skel, fara inn í "client" möppuna og keyra:
	* npm install
	* bower install
	* grunt

Keyra ChatServer:
1. opna nýja skel(sem er með node, t.d. "git bash"), og fara inn í sever möppuna og keyra:
	~/$ node chatserver.js
2. opna nýja skel (sem er með python), og fara inn í  client möppuna og keyra:
	~/$ python -m SimpleHTTPServer {portnúmer}  <- portið sem þú vilt keyra á t.d. 5555.
3. Opna vafra(helst chrome), og slá inn slóðina http://localhost:{portnúmer}/#/login t.d. http://localhost:5555/#/login
