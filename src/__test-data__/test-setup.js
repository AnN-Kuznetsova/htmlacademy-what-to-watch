import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";

Enzyme.configure({
  adapter: new Adapter(),
});

const noop = () => {};
Object.defineProperty(window, `scrollTo`, {value: noop, writable: true});
Object.defineProperty(HTMLMediaElement.prototype, `play`, {value: noop, writable: true});
Object.defineProperty(HTMLMediaElement.prototype, `pause`, {value: noop, writable: true});
Object.defineProperty(HTMLMediaElement.prototype, `load`, {value: noop, writable: true});
