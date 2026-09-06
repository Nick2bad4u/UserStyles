const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const acorn = require("acorn");

function* syntaxNodes(node) {
    yield node;
    for (const value of Object.values(node)) {
        for (const child of [value].flat()) {
            if (
                child &&
                typeof child === "object" &&
                typeof child.type === "string"
            ) {
                yield* syntaxNodes(child);
            }
        }
    }
}

// Execute selected production declarations with explicit fakes, without starting
// the userscript, navigating a site, or reading browser/account state.
function loadDeclarations(file, names, globals = {}) {
    const source = fs.readFileSync(path.join(__dirname, "../..", file), "utf8");
    const ast = acorn.parse(source, {
        ecmaVersion: "latest",
        sourceType: "script",
    });
    const declarations = [...syntaxNodes(ast)].filter(
        (node) =>
            ["FunctionDeclaration", "ClassDeclaration"].includes(node.type) &&
            names.includes(node.id?.name)
    );
    if (declarations.length !== names.length) {
        throw new Error(
            `Missing or ambiguous declarations in ${file}: ${names.join(", ")}`
        );
    }
    const context = vm.createContext({ ...globals });
    vm.runInContext(
        `${declarations.map((node) => source.slice(node.start, node.end)).join("\n")}\nglobalThis.testExports = { ${names.join(", ")} };`,
        context
    );
    return context.testExports;
}

module.exports = { loadDeclarations };
