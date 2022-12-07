const emotes = ["𐐘", "𐑀", "𐐿", "𐐃", "𐐫"];
const seperator = "ඞ";
const ee = {
	0: "𐐘𐐘𐐘",
	1: "𐐿𐐫𐐘",
	2: "𐑀𐐿𐐿",
	3: "𐐘𐐫𐐿",
	4: "𐐘𐑀𐐃",
	5: "𐑀𐐫𐐘",
	6: "𐐃𐐃𐑀",
	7: "𐐫𐐃𐐘",
	8: "𐐃𐐃𐐃",
	9: "𐑀𐐘𐐫",
};

window.onhashchange = () => window.location.reload();

const URL = location.href;

const codeFormEle = document.querySelector("#formCode");
const codeInputEle = document.querySelector("#codeLinkInput");
const codeResult = document.querySelector("#codeResult");

codeFormEle.addEventListener("submit", handleCode);

function handleCode(e) {
	e.preventDefault();
	let link = codeInputEle.value;
	if (!link.startsWith("https://") && !link.startsWith("http://")) {
		link = "https://" + link;
	}
	codeResult.value = URL + "#go/" + code(link);
}

if (URL.includes("#go")) {
	const SUS_URL = decodeURIComponent(URL.split("go/")[1]);
	const finalLink = decode(SUS_URL);

	const redirectUrlEle = document.querySelector("#redirectURL");
	redirectUrlEle.href = finalLink;
	redirectUrlEle.textContent = finalLink;

	document.querySelector("#redirectBtn").href = finalLink;

	document.querySelector("#redirect-area").classList.remove("hidden");

	const redirectWaitTime = 6;
	const countdownTimerEle = document.querySelector("#countdownTimer");
	countdownTimerEle.textContent = redirectWaitTime;
	setInterval(() => {
		if (countdownTimerEle.textContent <= 0) return;
		countdownTimerEle.textContent = Number(countdownTimerEle.textContent) - 1;
	}, 1000);
	setTimeout(() => (window.location.href = finalLink), redirectWaitTime * 1000);
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
		result.push("𐐗");
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
		if (c.includes("𐐗")) {
			const char = String.fromCharCode(temp.join(""));
			result += char;
			c = c.replace("𐐗", "");
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

let timeout;
const copyTextBtn = document.querySelector("#copyText");
copyTextBtn.addEventListener("click", () => {
	copyToClipboard(codeResult.value);
	copyTextBtn.textContent = "copied";
  
  if(timeout) clearTimeout(timeout);

  timeout = setTimeout(() => {
    copyTextBtn.textContent = "click to copy";
  }, 1000)
});
