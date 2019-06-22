function makeDraggable(svg, horizontalDragEnabled = false, verticalDragEnabled = false, verticalMaxY, horizontalMaxX) {

	svg.addEventListener('mousedown', startDrag);
	svg.addEventListener('mousemove', drag);
	svg.addEventListener('mouseup', endDrag);
	svg.addEventListener('mouseleave', endDrag);
	svg.addEventListener('touchstart', startDrag);
	svg.addEventListener('touchmove', drag);
	svg.addEventListener('touchend', endDrag);
	svg.addEventListener('touchleave', endDrag);
	svg.addEventListener('touchcancel', endDrag);
	svg.event = new CustomEvent('dragged', {
		detail: svg,
		delX: 0,
		delY: 0
	});

	var selectedElement, offset;

	function getMousePosition(evt) {
		var CTM = svg.getScreenCTM();
		return {
			x: (evt.clientX - CTM.e) / CTM.a,
			y: (evt.clientY - CTM.f) / CTM.d
		};
	}

	function startDrag(evt) {
		if (evt.target.classList.contains('draggable')) {
			selectedElement = evt.target;
			offset = getMousePosition(evt);
			offset.x -= parseFloat(selectedElement.getAttributeNS(null, "cx"));
			offset.y -= parseFloat(selectedElement.getAttributeNS(null, "cy"));

			document.getElementById('baseSVG').classList.remove('enabled');
			document.getElementById('baseSVG').classList.add('disabled');

			svg.classList.remove('disabled');
			svg.classList.add('enabled');

			if(svg.id == 'P1')
			{
				document.getElementById('HC1L').classList.add('enabled');
				document.getElementById('HC1R').classList.add('enabled');

				document.getElementById('HC1L').classList.remove('disabled');
				document.getElementById('HC1R').classList.remove('disabled');
			}

			else if (svg.id == 'P2') {
				document.getElementById('HC2T').classList.add('enabled');
				document.getElementById('HC2B').classList.add('enabled');

				document.getElementById('HC2T').classList.remove('disabled');
				document.getElementById('HC2B').classList.remove('disabled');
			}

			else if (svg.id == 'P3') {
				document.getElementById('HC3L').classList.add('enabled');
				document.getElementById('HC3R').classList.add('enabled');

				document.getElementById('HC3L').classList.remove('disabled');
				document.getElementById('HC3R').classList.remove('disabled');
			}

			else if (svg.id == 'P4') {
				document.getElementById('HC4T').classList.add('enabled');
				document.getElementById('HC4B').classList.add('enabled');

				document.getElementById('HC4T').classList.remove('disabled');
				document.getElementById('HC4B').classList.remove('disabled');
			}


		}
	}

	function drag(evt) {
		if (selectedElement) {

			evt.preventDefault();
			var coord = getMousePosition(evt);

			var newX = coord.x - offset.x;
			var newY = coord.y - offset.y;

			if(horizontalDragEnabled && newX < horizontalMaxX && newX > 0 )
			{
				selectedElement.setAttributeNS(null, "cx", newX);
				svg.event.delX = offset.x;
				svg.dispatchEvent(svg.event);
			}

			if(verticalDragEnabled && newY < verticalMaxY && newY > 0)
			{
				selectedElement.setAttributeNS(null, "cy", newY);
				svg.event.delY = offset.y;
				svg.dispatchEvent(svg.event);
			}
		}
	}

	function endDrag(evt) {
		selectedElement = false;
		document.getElementById('baseSVG').classList.remove('disabled');
		document.getElementById('baseSVG').classList.add('enabled');

		svg.classList.remove('enabled');
		svg.classList.add('disabled');

		elements = document.getElementsByClassName('lineHighLight');
		for (var i = 0; i < elements.length; i++) {
			elements[i].classList.remove('enabled');
			elements[i].classList.add('disabled');
		}
	}
}