const fse = require('fs-extra');
const path = require('path');

// Add amaui-test entire build folder to @types so global types are automatically used by Typescript
fse.copy(process.cwd(), path.resolve('../../@types/amaui-test'));
