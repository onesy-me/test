const path = require('path');
const fse = require('fs-extra');

// Add onesy-test entire build folder to @types so global types are automatically used by Typescript
fse.copy(process.cwd(), path.resolve('../../@types/onesy-test'));
