import { Tweet } from "../types";

const { Transform } = require("stream");

type MapFunction = (Tweet) => Tweet;
export const map = (fn: MapFunction): TransformStream => {
  return new Transform({
    objectMode: true,
    transform(ch, e, cb) {
      this.push(fn(ch));
      cb();
    },
  });
};

type FilterFn = (Tweet) => Boolean;
export const filter = (fn: FilterFn): TransformStream => {
  return new Transform({
    objectMode: true,
    transform(ch, e, cb) {
      fn(ch) && this.push(ch);
      cb();
    },
  });
};
