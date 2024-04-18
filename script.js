let base_url = "https://www.vrs.de/index.php?eID=tx_vrsinfo_departuremonitor&i="; // obtained through devtools > network on Abfahrtsmonitor
let key = args.widgetParameter ? args.widgetParameter : "d17096e57822b2c6f3a98e28b14c4ee8"; //default key for Köln Hbf
if (!key) throw new Error("No key set!");

// color scheme -- i would like to do some transparency, but the documented passing of an alpha value to Color() doesnt seem to work?
const bg1 = Color.dynamic(new Color('FFF'), new Color('222'));
const bg2 = Color.dynamic(new Color('ededed'), new Color('000'));
const color = Color.dynamic(new Color('000'), new Color('FFF'));
const colorLive = Color.green(); // color for live times

let data = '';
data = await new Request(base_url + key).loadJSON();
data = data.events

// determine widget size and call render() accordingly
// this widget should be compatible with all ios widget sizes
switch (config.widgetFamily) {
    case undefined:
    case "accessoryCircular":
        render(amount = 3, showTitle = false, showLine = false, showDest = false);
        break;
    case "accessoryRectangular":
        render(amount = 4, showTitle = false, showLine = true, showDest = true);
        break;
    case "accessoryInline":
        render(amount = 2, showTitle = false, showLine = true, showDest = true);
        break;
    case "small":
        render(amount = 5, showTitle = true, showLine = true, showDest = true);
        break;
    case "large":
    case "extraLarge":
        render(amount = 15);
        break;
    case "medium":
    default:
        render()
}

// renders the widget
// amount: number of departures to show
// showTitle: show the title of the station
// showLine: show the line number
// showDest: show the destination

function render(amount = 5, showTitle = true, showLine = true, showDest = true) {

    data = data.slice(0, amount);

    const widget = new ListWidget();
    const gradient = new LinearGradient();

    gradient.locations = [0, 1];
    gradient.colors = [bg1, bg2];
    widget.backgroundGradient = gradient;
    widget.refreshAfterDate = new Date(Date.now() + 1000 * 30);
    widget.setPadding(75, 20, 70, 20);

    if (showTitle) { // spacer - station name - spacer <-- puts the station name in the middle
        let stack = widget.addStack();
        stack.addSpacer();
        let title = stack.addText(data[0].stopPoint.name.split('(Gleis')[0].split('Gleis')[0]); // try doing some cleanup of the station names
        stack.addSpacer();
        title.font = Font.semiboldRoundedSystemFont(18);
        widget.addSpacer(7);
    }

    if (config.widgetFamily == 'accessoryInline') { // widget is top line on lock screen
        let times = []
        for (const event of data) {
            times.push(`${ event.departure.estimate ? event.departure.estimate : event.departure.timetable } ${ event.line.number }`);
        }
        widget.addText(times.join(" │ ")); // time linenum | time linenum | time linenum ...
		widget.presentAccessoryInline();
        return;
    }

    // for everything except top line on lockscreen
    for (const event of data) {

        let time = event.departure.estimate ? event.departure.estimate : event.departure.timetable; // some trains have no live data
        if (config.widgetFamily == "accessoryCircular") time = time.split(":")[1]; // circular lockscreen widget should only show minutes due to size constraints, another option would be lowering the font size

        let line = event.line.number;
        line = line.replace(" (RRX)", "");
        let dest = event.line.direction;
        dest = ["accessoryRectangular", "small"].includes(config.widgetFamily) ? dest.slice(0, 3) : dest.slice(0, 25); // small, lockscreen rect widget have limited space, we only show the first three letters of the destination

        let stack = widget.addStack();

        let monofont = ["accessoryCircular", "accessoryRectangular"].includes(config.widgetFamily) ? Font.semiboldMonospacedSystemFont(12) :  Font.regularMonospacedSystemFont(15);
        let boldMonofont = ["accessoryCircular", "accessoryRectangular"].includes(config.widgetFamily) ? Font.blackMonospacedSystemFont(12) : Font.semiboldMonospacedSystemFont(15);

        let timeText = stack.addText(time);
        timeText.font = boldMonofont; // circular lockscreen widget should have a bolder, smaller font to fit inside the circle and still be legible
        timeText.textColor = event.departure.estimate ? colorLive : color;

        if (showLine) {
            stack.addSpacer(5)
            let lineText = stack.addText(line);
            lineText.font = monofont;
            lineText.textColor = Color.gray();
        }

        if (showDest) {
            config.runsInAccessoryWidget ? stack.addSpacer(5) : stack.addSpacer(); // push dest to the right except on lockscreen
            let destText = stack.addText(dest);
            destText.font = monofont;
        }
    }

    widget.addSpacer();
    Script.setWidget(widget);
    Script.complete();

}
