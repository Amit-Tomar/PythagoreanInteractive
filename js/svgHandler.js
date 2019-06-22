var svgObject, circle1, circle2, circle3, circle4, line1, line2, line3, line4, c1a, c1b, c2a, c2b, c3a, c3b, c4a, c4b,
	c12, c23, c34, c41, highlighter, cSquare, SPACE_BUFFER = 10, hc1l, hc1r, hc2t, hc2b, hc3l, hc3r, hc4t, hc4b;

var timerFunction = null;
var timeSpentInAnimation = 0;
var maxAllowedInAnimation = 1000;
var rotationAnimationAngle = 0;
var translationX = 0;
var translationY = 0;
var animationTickStep = 10;
var translateTickStepX = 0;
var translateTickStepY = 0;
var rotateTickStep = 0;

function getAngleDeg(ax, ay, bx, by) {
	var angleRad = Math.atan((ay - by) / (ax - bx));
	var angleDeg = angleRad * 180 / Math.PI;
	console.log(angleDeg)
	return (angleDeg);
}

function distanceBetweenCircles(circle1, circle2) {
	var sideLength = Math.sqrt(Math.pow(circle1.getAttributeNS(null, 'cx') - circle2.getAttributeNS(null, 'cx'), 2) +
		Math.pow(circle1.getAttributeNS(null, 'cy') - circle2.getAttributeNS(null, 'cy'), 2))
	return sideLength;
}

function startAnimation() {
	if (timerFunction == null) {
		timerFunction = setInterval(animate, animationTickStep);
		timeSpentInAnimation += animationTickStep;
	}
}

function stopAnimation() {
	if (timerFunction != null) {
		cSquare.setAttributeNS(null, 'opacity', 1)
		clearInterval(timerFunction);
		timerFunction = null;
		timeSpentInAnimation = 0;
		rotationAnimationAngle = 0;
		translationX = 0;
		translationY = 0;

		setTimeout(function () {
				highlighter.setAttributeNS(null, 'width', 0);
				cSquare.setAttributeNS(null, 'opacity', 0)
			},
			1000);
	}
}

function animate() {

	rotationAnimationAngle -= rotateTickStep;
	translationX += translateTickStepX
	translationY += translateTickStepY

	if (timeSpentInAnimation > maxAllowedInAnimation || rotationAnimationAngle < 0) {
		stopAnimation()
		return
	}

	highlighter.setAttributeNS(null, 'transform', 'translate(' + translationX + ',' + translationY + ') rotate( ' + (
		rotationAnimationAngle).toString() + ' ' + circle3.getAttributeNS(null, 'cx') + ' 0 )');

	timeSpentInAnimation += animationTickStep;
}

function runAnimation(params) {
	highlighter.setAttributeNS(null, 'x', circle3.getAttributeNS(null, 'cx'))
	highlighter.setAttributeNS(null, 'y', circle3.getAttributeNS(null, 'cy'))

	var sideLength = distanceBetweenCircles(circle1, circle2)
	highlighter.setAttributeNS(null, 'width', sideLength)
	highlighter.setAttributeNS(null, 'height', sideLength)

	var angle = getAngleDeg(circle1.getAttributeNS(null, 'cx'), circle1.getAttributeNS(null,
		'cy'), circle2.getAttributeNS(null, 'cx'), circle2.getAttributeNS(null, 'cy'))

	rotationAnimationAngle = angle;

	highlighter.setAttributeNS(null, 'transform', 'rotate( ' + (angle).toString() + ' ' + circle3.getAttributeNS(null,
		'cx') + ' 0 )')

	translateTickStepX = (350 - circle3.getAttributeNS(null, 'cx')) * animationTickStep / maxAllowedInAnimation
	translateTickStepY = (30) * animationTickStep / maxAllowedInAnimation
	rotateTickStep = angle * animationTickStep / maxAllowedInAnimation

	startAnimation()
}

function updateLineHighlights() {

	hc1l.setAttributeNS(null, 'x2', circle1.getAttributeNS(null, 'cx'))
	hc1r.setAttributeNS(null, 'x1', circle1.getAttributeNS(null, 'cx'))

	hc2t.setAttributeNS(null, 'y2', circle2.getAttributeNS(null, 'cy'))
	hc2b.setAttributeNS(null, 'y1', circle2.getAttributeNS(null, 'cy'))

	hc3l.setAttributeNS(null, 'x2', circle3.getAttributeNS(null, 'cx'))
	hc3r.setAttributeNS(null, 'x1', circle3.getAttributeNS(null, 'cx'))

	hc4t.setAttributeNS(null, 'y2', circle4.getAttributeNS(null, 'cy'))
	hc4b.setAttributeNS(null, 'y1', circle4.getAttributeNS(null, 'cy'))

}

function updateLinesOnCircleMovement() {

	line1.setAttributeNS(null, 'x1', circle1.getAttributeNS(null, 'cx'))
	line1.setAttributeNS(null, 'y2', circle2.getAttributeNS(null, 'cy'))

	line2.setAttributeNS(null, 'y1', circle2.getAttributeNS(null, 'cy'))
	line2.setAttributeNS(null, 'x2', circle3.getAttributeNS(null, 'cx'))

	line3.setAttributeNS(null, 'x1', circle3.getAttributeNS(null, 'cx'))
	line3.setAttributeNS(null, 'y2', circle4.getAttributeNS(null, 'cy'))

	line4.setAttributeNS(null, 'y1', circle4.getAttributeNS(null, 'cy'))
	line4.setAttributeNS(null, 'x2', circle1.getAttributeNS(null, 'cx'))
}

function updateLabelPositions() {
	c3a.setAttributeNS(null, 'x', circle3.getAttributeNS(null, 'cx') / 2.0)
	c3b.setAttributeNS(null, 'x', circle3.getAttributeNS(null, 'cx') / 2 + (boundingBox1.getAttributeNS(null,
		'width') / 2))

	c2b.setAttributeNS(null, 'y', circle2.getAttributeNS(null, 'cy') / 2.0)
	c2a.setAttributeNS(null, 'y', circle2.getAttributeNS(null, 'cy') / 2 + (boundingBox1.getAttributeNS(null,
		'height') / 2))

	c1b.setAttributeNS(null, 'x', circle1.getAttributeNS(null, 'cx') / 2.0)
	c1a.setAttributeNS(null, 'x', circle1.getAttributeNS(null, 'cx') / 2 + (boundingBox1.getAttributeNS(null,
		'width') / 2))

	c4a.setAttributeNS(null, 'y', circle4.getAttributeNS(null, 'cy') / 2.0)
	c4b.setAttributeNS(null, 'y', circle4.getAttributeNS(null, 'cy') / 2 + (boundingBox1.getAttributeNS(null,
		'width') / 2))

	c12.setAttributeNS(null, 'x', (parseFloat(circle1.getAttributeNS(null, 'cx')) + parseFloat(circle2.getAttributeNS(
		null, 'cx'))) / 2.0)
	c12.setAttributeNS(null, 'y', (parseFloat(circle1.getAttributeNS(null, 'cy')) + parseFloat(circle2.getAttributeNS(
		null, 'cy'))) / 2.0)

	c12.setAttributeNS(null, 'x', (parseFloat(circle1.getAttributeNS(null, 'cx')) +
		parseFloat(circle2.getAttributeNS(null, 'cx'))) / 2.0 + SPACE_BUFFER)
	c12.setAttributeNS(null, 'y', (parseFloat(circle1.getAttributeNS(null, 'cy')) +
		parseFloat(circle2.getAttributeNS(null, 'cy'))) / 2.0 - SPACE_BUFFER)

	c23.setAttributeNS(null, 'x', (parseFloat(circle2.getAttributeNS(null, 'cx')) +
		parseFloat(circle3.getAttributeNS(null, 'cx'))) / 2.0 + SPACE_BUFFER)
	c23.setAttributeNS(null, 'y', (parseFloat(circle2.getAttributeNS(null, 'cy')) +
		parseFloat(circle3.getAttributeNS(null, 'cy'))) / 2.0 + SPACE_BUFFER)

	c34.setAttributeNS(null, 'x', (parseFloat(circle3.getAttributeNS(null, 'cx')) +
		parseFloat(circle4.getAttributeNS(null, 'cx'))) / 2.0 - SPACE_BUFFER)
	c34.setAttributeNS(null, 'y', (parseFloat(circle3.getAttributeNS(null, 'cy')) +
		parseFloat(circle4.getAttributeNS(null, 'cy'))) / 2.0 + SPACE_BUFFER)

	c41.setAttributeNS(null, 'x', (parseFloat(circle4.getAttributeNS(null, 'cx')) +
		parseFloat(circle1.getAttributeNS(null, 'cx'))) / 2.0 - SPACE_BUFFER)
	c41.setAttributeNS(null, 'y', (parseFloat(circle4.getAttributeNS(null, 'cy')) +
		parseFloat(circle1.getAttributeNS(null, 'cy'))) / 2.0 - SPACE_BUFFER)

}

window.addEventListener("load", function () {

	svgObject = document;
	circle1 = svgObject.getElementById('P1');
	circle2 = svgObject.getElementById('P2');
	circle3 = svgObject.getElementById('P3');
	circle4 = svgObject.getElementById('P4');

	line1 = svgObject.getElementById('L1');
	line2 = svgObject.getElementById('L2');
	line3 = svgObject.getElementById('L3');
	line4 = svgObject.getElementById('L4');

	c1a = svgObject.getElementById('c1a');
	c1b = svgObject.getElementById('c1b');
	c2a = svgObject.getElementById('c2a');
	c2b = svgObject.getElementById('c2b');
	c3a = svgObject.getElementById('c3a');
	c3b = svgObject.getElementById('c3b');
	c4a = svgObject.getElementById('c4a');
	c4b = svgObject.getElementById('c4b');

	c12 = svgObject.getElementById('c12');
	c23 = svgObject.getElementById('c23');
	c34 = svgObject.getElementById('c34');
	c41 = svgObject.getElementById('c41');
	cSquare = svgObject.getElementById('cSquare');

	hc1l = svgObject.getElementById('HC1L');
	hc1r = svgObject.getElementById('HC1R');

	hc2t = svgObject.getElementById('HC2T');
	hc2b = svgObject.getElementById('HC2B');

	hc3l = svgObject.getElementById('HC3L');
	hc3r = svgObject.getElementById('HC3R');

	hc4t = svgObject.getElementById('HC4T');
	hc4b = svgObject.getElementById('HC4B');

	highlighter = svgObject.getElementById('highlighter');

	boundingBox1 = svgObject.getElementById('B1');

	makeDraggable(circle1, horizontalDragEnabled = true, verticalDragEnabled = false, boundingBox1
		.getAttributeNS(null, 'height'), boundingBox1.getAttributeNS(null, 'width'))

	circle1.addEventListener("dragged", function (event) {

		circle2.setAttributeNS(null, 'cy', circle1.getAttributeNS(null, 'cx'))
		circle3.setAttributeNS(null, 'cx', boundingBox1.getAttributeNS(null, 'width') - circle1
			.getAttributeNS(null, 'cx'))
		circle4.setAttributeNS(null, 'cy', boundingBox1.getAttributeNS(null, 'height') - circle1
			.getAttributeNS(null, 'cx'))

		updateLinesOnCircleMovement()
		updateLabelPositions()
		updateLineHighlights()
	})

	circle2.addEventListener("dragged", function (event) {

		circle3.setAttributeNS(null, 'cx', boundingBox1.getAttributeNS(null, 'width') - circle2
			.getAttributeNS(null, 'cy'))
		circle4.setAttributeNS(null, 'cy', boundingBox1.getAttributeNS(null, 'height') - circle2
			.getAttributeNS(null, 'cy'))
		circle1.setAttributeNS(null, 'cx', circle2.getAttributeNS(null, 'cy'))

		updateLinesOnCircleMovement()
		updateLabelPositions()
		updateLineHighlights()
	})

	circle3.addEventListener("dragged", function (event) {

		circle4.setAttributeNS(null, 'cy', circle3.getAttributeNS(null, 'cx'))
		circle1.setAttributeNS(null, 'cx', boundingBox1.getAttributeNS(null, 'width') - circle3
			.getAttributeNS(null, 'cx'))
		circle2.setAttributeNS(null, 'cy', boundingBox1.getAttributeNS(null, 'height') - circle3
			.getAttributeNS(null, 'cx'))

		updateLinesOnCircleMovement()
		updateLabelPositions()
		updateLineHighlights()
	})

	circle4.addEventListener("dragged", function (event) {

		circle1.setAttributeNS(null, 'cx', boundingBox1.getAttributeNS(null, 'height') - circle4
			.getAttributeNS(null, 'cy'))
		circle2.setAttributeNS(null, 'cy', boundingBox1.getAttributeNS(null, 'height') - circle4
			.getAttributeNS(null, 'cy'))
		circle3.setAttributeNS(null, 'cx', circle4.getAttributeNS(null, 'cy'))

		updateLinesOnCircleMovement()
		updateLabelPositions()
		updateLineHighlights()
	})

	makeDraggable(circle2, horizontalDragEnabled = false, verticalDragEnabled = true, boundingBox1
		.getAttributeNS(null, 'height'), boundingBox1.getAttributeNS(null, 'width'))
	makeDraggable(circle3, horizontalDragEnabled = true, verticalDragEnabled = false, boundingBox1
		.getAttributeNS(null, 'height'), boundingBox1.getAttributeNS(null, 'width'))
	makeDraggable(circle4, horizontalDragEnabled = false, verticalDragEnabled = true, boundingBox1
		.getAttributeNS(null, 'height'), boundingBox1.getAttributeNS(null, 'width'))
});