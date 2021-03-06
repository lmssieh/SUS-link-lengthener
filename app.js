const emotes = ["π", "π", "πΏ", "π", "π«"];
const seperator = "ΰΆ";
const ee = {
	0: "πππ",
	1: "πΏπ«π",
	2: "ππΏπΏ",
	3: "ππ«πΏ",
	4: "πππ",
	5: "ππ«π",
	6: "πππ",
	7: "π«ππ",
	8: "πππ",
	9: "πππ«",
};

window.onhashchange = () => window.location.reload();

const URL = location.href;

const codeFormEle = document.querySelector("#formCode");
const codeInputEle = document.querySelector("#codeLinkInput");
const codeResult = document.querySelector("#codeResult");

codeFormEle.addEventListener("submit", handleCode);

function handleCode(e) {
	e.preventDefault();
	const link = codeInputEle.value;
	codeResult.value = URL + "/#go/" + code(link);
}

if (URL.includes("#go")) {
	const SUS_URL = decodeURIComponent(URL.split("go/")[1]);
	const finalLink = decode(SUS_URL);

	document.querySelector("#redirectURL").href = finalLink;
	document.querySelector("#redirectURL").textContent = finalLink;

	document.querySelector("#redirectBtn").href = finalLink;

	document.querySelector("#redirect-area").classList.remove("hidden");

	setTimeout(() => (window.location.href = finalLink), 7000);
} else {
	document.querySelector("#main-page").classList.remove("hidden");
}

function code(link) {
	let linkCharCode = [];
	let result = [];
	Array.from(link).forEach((char) => linkCharCode.push(char.charCodeAt()));

	linkCharCode.forEach((c) => {
		const charArr = Array.from(c.toString());
		charArr.forEach((c) => result.push(ee[c] + seperator));
		result.push("π");
	});
	return result.join("");
}

function decode(code) {
	const arr = code.split(seperator);
	const keys = Object.keys(arr);
	let temp = [];
	let result = "";
	arr.forEach((item) => {
		let c = item;
		if (c.includes("π")) {
			const char = String.fromCharCode(temp.join(""));
			result += char;
			c = c.replace("π", "");
			temp = [];
		}
		const charCode = keys.find((key) => ee[key] === c);
		temp.push(charCode);
	});
	return result;
}

const copyToClipboard = (str) => {
	if (navigator && navigator.clipboard && navigator.clipboard.writeText)
		return navigator.clipboard.writeText(str);
	return Promise.reject("The Clipboard API is not available.");
};

document.querySelector("#copyText").addEventListener("click", () => {
	copyToClipboard(codeResult.value);
	document.querySelector("#copyText").textContent = "copied";
});
