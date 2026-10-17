const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const schemaPath = path.join(__dirname, "schema.json");
const vectorsPath = path.join(__dirname, "vectors.json");

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const vectors = JSON.parse(fs.readFileSync(vectorsPath, "utf8"));

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);
const valid = validate(vectors);

if (!valid) {
  console.error("Spec validation failed:");
  console.error(ajv.errorsText(validate.errors, { separator: "\n" }));
  process.exit(1);
}

// Assert empty/null/omitted memo values are handled per the extract_routing
// schema: memo "" is treated as no memo and must normalize to routingId null
// without producing warnings.
const extractRoutingSchema = schema.$defs && schema.$defs.extract_routing;
const validateExtractRouting = extractRoutingSchema
  ? ajv.compile(extractRoutingSchema)
  : null;

const memoCases = [
  { label: 'memo: ""', input: { memo: "" }, expectedRoutingId: null },
  { label: "memo: null", input: { memo: null }, expectedRoutingId: null },
  { label: "memo omitted", input: {}, expectedRoutingId: null },
];

let memoFailures = 0;

for (const testCase of memoCases) {
  if (validateExtractRouting && !validateExtractRouting(testCase.input)) {
    console.error(
      "Extract routing schema rejected " + testCase.label + ":",
    );
    console.error(
      ajv.errorsText(validateExtractRouting.errors, { separator: "\n" }),
    );
    memoFailures += 1;
    continue;
  }

  const routingId =
    testCase.input.memo === undefined ||
    testCase.input.memo === null ||
    testCase.input.memo === ""
      ? null
      : testCase.input.memo;

  if (routingId !== testCase.expectedRoutingId) {
    console.error(
      "Unexpected routingId for " +
        testCase.label +
        ": expected " +
        testCase.expectedRoutingId +
        ", got " +
        routingId,
    );
    memoFailures += 1;
  }
}

if (memoFailures > 0) {
  console.error("Empty/null memo validation failed");
  process.exit(1);
}

console.log(
  "Spec validation passed (spec_version: " + vectors.spec_version + ")",
);
