<h1>VRS-widget</h1> 
  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Verkehrsverbund_Rhein-Sieg.svg/1200px-Verkehrsverbund_Rhein-Sieg.svg.png' width='40px' alt='VRS-Logo'/>
<p>Live-Abfahrtszeiten im VRS-Gebiet als Widget für iOS</p>
<img src='https://github.com/janmartchouk/vrs-widget/assets/19735475/527b40c7-e9e4-4423-a344-0f030f2f384a' alt='widgets' /> 

<h2>Installation</h2>
<p>Für das Widget ist die <a href='https://apps.apple.com/de/app/scriptable/id1405459188'>Scriptable</a>-App aus dem App Store notwendig. Ist sie installiert, kann das Skript aus der <code>script.js</code> in dieser Repo in der App hinzugefügt werden (Einfach in ein neues Skript kopieren) sowie ein Scriptable-Widget auf dem Homescreen oder Sperrbildschirm erstellt werden, welches auf das neu hinzugefügte Skript eingestellt werden sollte. </p>
<p>Außerdem wird die ID eines VRS-Abfahrtsmonitors benötigt. Diese kann wie folgt erhalten werden:</p>
<ol>
  <li><a href='https://www.vrs.de/fahren/haltestellenauskunft/abfahrtsmonitor'>VRS-Seite</a> aufrufen und den Konfigurator starten</li>
  <li>Hier kann gewählt werden, welche Haltestelle genutzt werden soll. Zudem ist eine Einschränkung nach Verkehrsmittel, Linien und Linienrichtungen, sowie der minimalen Anreisezeit zur Haltestelle möglich.</li>
  <li>Soll das Widget im large oder extraLarge-Format (iPad) genutzt werden, sollte unter "Darstellung Anpassen" eine Zeilenanzahl von 25 gewählt werden. Sonst reichen 5.</li>
  <li>Über "Zum Abfahrtsmonitor wechseln" kann in eine Vollbildansicht gewechselt werden. Hier befindet sich die ID des Abfahrtsmonitors im URL-Text der Website, alles nach dem letzten "/". z.B:
  <p>URL: vrs.de/am/s/<b>56272f4478758c4633511d3ac132a99c</b></p>
  <p>Also ist die ID: 56272f4478758c4633511d3ac132a99c</p>
  Die ID sollte kopiert werden.</li>
  <li>Letztlich wird die erstellte ID in der Konfiguration des Widgets auf dem Home- oder Sperrscreen unter "Parameter" eingetragen. Voila!</li>
</ol>
