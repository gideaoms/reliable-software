export type Left<T> = {
  _tag: "Left";
  value: T;
};

export type Right<T> = {
  _tag: "Right";
  value: T;
};

export type Result<L, R> = Left<L> | Right<R>;

export function left<L>(value: L): Left<L> {
  return { _tag: "Left", value };
}

export function right<R>(value: R): Right<R> {
  return { _tag: "Right", value };
}

export function isLeft<L, R = never>(value: Result<L, R>): value is Left<L> {
  return value._tag === "Left";
}

export function isRight<R, L = never>(value: Result<L, R>): value is Right<R> {
  return value._tag === "Right";
}

export function match<L, R, U>(
  matchable: Result<L, R>,
  handler: {
    Left: (value: Left<L>["value"]) => U;
    Right: (value: Right<R>["value"]) => U;
  }
) {
  if (isLeft(matchable)) {
    return handler["Left"](matchable.value);
  }
  if (isRight(matchable)) {
    return handler["Right"](matchable.value);
  }
  const _exhaustive: never = matchable;
  throw new Error(`${matchable} is not known`);
}
