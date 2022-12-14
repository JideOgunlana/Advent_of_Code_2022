'use strict'

import {getLines} from "../utils/utils.js"

let sumEachElfCalory = (sumArr, numArr) => {
	let i = 0;
	let total = 0;
	class sums {
		constructor(index, value) {
			this.index = index;
			this.value = value;
		}
	}

	numArr.forEach((num, index) => {
		if (num != '')
			total += parseInt(num);
		if (num == '' || index == numArr.length - 1)
		{
			sumArr[i] = new sums(i + 1, total);
			total = 0;
			i++;
		}
	});
}

let getMaxCalory = (sumArr, max) => {
	let elfWithMostCalory;
	for (let i = 0; i < sumArr.length; i++)
	{
		if (max < sumArr[i].value)
			elfWithMostCalory = sumArr[i];
	}
	return elfWithMostCalory;
}

let getTop3Cals = (sumArr, top3, totalTopThree) => {
	let maxIndex;
	let max;

	for (let i = 1; i <= 3; i++)
	{
		max = 0;
		maxIndex = 0;
		for (let j = 0; j < sumArr.length; j++)
		{
			if (max < sumArr[j].value)
			{
				max = sumArr[j].value;
				maxIndex = j;
			}
		}
		totalTopThree += max;
		top3.push(sumArr.splice(maxIndex, 1));
	}
	return totalTopThree;
}

document.getElementById('inputfile').addEventListener('change', function() {
	let fr = new FileReader();
	let numArr = [];
	let sumArr = [];
	let top3 = [];
	let totalTopThree = 0;
	let max;
	let input = document.querySelector(".input");
	let output = document.querySelector(".output");
	fr.onload = function(){
		input.innerText = '';
		output.innerText = '';
		setTimeout(function() {
			numArr = getLines(fr);
			let p = document.createElement("P");
			input.append(p);
			for (let i = 0; i < numArr.length; i++)
			{
				p.innerText += numArr[i] + '\n';
				if (i > 20)
				{
					p.innerText += "...";
					break ;
				}
			}
			sumEachElfCalory(sumArr, numArr);
			max = getMaxCalory(sumArr, 0);
			let p1 = document.createElement("P");
			output.append(p1);
			p1.innerText = `Elf ${max.index} has the highest calory: ${max.value}`;

			totalTopThree = getTop3Cals(sumArr, top3, totalTopThree);
			let p2 = document.createElement("P");
			output.append(p2);
			p2.innerText = `Elves ${top3[0][0].index}, ${top3[1][0].index}, and ${top3[2][0].index} with their respective calories ${top3[0][0].value}, ${top3[1][0].value}, ${top3[2][0].value} have the highest calories.\nTotal weight of top 3 calories: ${totalTopThree}.`;
		}, 500);
	};
	if (this.files[0])
		fr.readAsText(this.files[0]);
});
