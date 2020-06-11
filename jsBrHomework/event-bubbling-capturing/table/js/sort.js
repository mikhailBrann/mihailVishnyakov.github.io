'use strict';

function handleTableClick(event) {
	let activeElem = event.target;

	if(activeElem.classList.contains('prop__name')) {

		let sortDir = 1;
		if(activeElem.dataset.dir && activeElem.dataset.dir == 1) {
			sortDir = -1;
			activeElem.dataset.dir = sortDir;
		} else {
			sortDir = 1;
			activeElem.dataset.dir = sortDir;
		}
		
		table.dataset.sortBy = activeElem.dataset.propName;
		sortTable(activeElem.dataset.propName, sortDir);
	} 
  
}
