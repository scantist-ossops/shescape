/**
 * @overview Contains integration tests for the testing utilities provided with
 * Shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary } from "../_.js";

import { Shescape } from "shescape";
import {
  injectionStrings,
  Shescape as Stubscape,
  Throwscape,
} from "shescape/testing";

test("injection strings", (t) => {
  t.true(Array.isArray(injectionStrings));
  t.true(injectionStrings.length > 0);

  for (const injectionString of injectionStrings) {
    t.is(typeof injectionString, "string");
    t.true(injectionString.length > 0);
  }
});

testProp(
  "Stubscape#escape (stubscape =~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, stubResult, errored, stubErrored;

    let shescape;
    try {
      shescape = new Shescape(options);
    } catch (_) {
      return t.pass();
    }

    const stubscape = new Stubscape(options);

    try {
      result = shescape.escape(arg);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.escape(arg);
    } catch (_) {
      stubErrored = true;
    }

    t.is(errored, stubErrored);
    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "Stubscape#escapeAll (stubscape =~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let result, stubResult, errored, stubErrored;

    let shescape;
    try {
      shescape = new Shescape(options);
    } catch (_) {
      return t.pass();
    }

    const stubscape = new Stubscape(options);

    try {
      result = shescape.escapeAll(args);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.escapeAll(args);
    } catch (_) {
      stubErrored = true;
    }

    t.is(errored, stubErrored);
    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "Stubscape#quote, with shell (stubscape =~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, stubResult, errored, stubErrored;

    let shescape;
    try {
      shescape = new Shescape(options);
    } catch (_) {
      return t.pass();
    }

    const stubscape = new Stubscape(options);

    try {
      result = shescape.quote(arg);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.quote(arg);
    } catch (_) {
      stubErrored = true;
    }

    t.is(errored, stubErrored);
    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "Stubscape#quoteAll, with shell (stubscape =~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let result, stubResult, errored, stubErrored;

    let shescape;
    try {
      shescape = new Shescape(options);
    } catch (_) {
      return t.pass();
    }

    const stubscape = new Stubscape(options);

    try {
      result = shescape.quoteAll(args);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.quoteAll(args);
    } catch (_) {
      stubErrored = true;
    }

    t.is(errored, stubErrored);
    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "Throwscape#constructor",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    t.throws(() => new Throwscape(options), {
      instanceOf: Error,
      message: "Can't be instantiated",
    });
  },
);
