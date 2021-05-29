import { configure } from "queryparams";
import Velocity from "velocity-animate";

const ROOT = document.getElementById("root");

const { params } = configure({
  amount: 16,
  interval: 1000,
  color: "gray",
  "background-color": "black",
});

const cast = (html: string) => {
  return new DOMParser().parseFromString(html, "text/html").body.firstChild;
};

const init = () => {
  ROOT.innerHTML = "";
  ROOT.style.backgroundColor = params["background-color"];

  const size = ROOT.offsetHeight / params.amount;

  const iterate = (i: number) => {
    const odd = i % 2 === 0;

    const style = {
      width: `${size}px`,
      height: `${size}px`,
      top: `${i * size}px`,
      "background-color": "red",
      "background-image": `radial-gradient(${size}px at 50% 50%, white 0%, ${params.color} 10%, ${params["background-color"]} 50%)`,
    };

    style[odd ? "left" : "right"] = 0;

    const styles = Object.entries(style)
      .map(([key, value]) => [key, value].join(":"))
      .join(";");

    const element = cast(`<div class="element" style="${styles}"></div>`);

    ROOT.appendChild(element);

    const props = odd
      ? { left: "100%", translateX: "-100%" }
      : { right: "100%", translateX: "100%" };

    Velocity(element, props, {
      loop: true,
      duration: (i + 1) * params.interval,
    });
  };

  [...new Array(params.amount)].map((_, i) => iterate(i));
};

init();

window.addEventListener("resize", init);
