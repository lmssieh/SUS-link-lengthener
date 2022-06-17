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
  const link = codeInputEle.value;
  codeResult.value = location.host + "/#go/" + code(link);
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

document.querySelector("#copyText").addEventListener("click", () => {
  copyToClipboard(codeResult.value);
  document.querySelector("#copyText").textContent = "copied";
});
